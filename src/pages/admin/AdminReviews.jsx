import React, { useState, useEffect } from 'react';
import { CheckCircle, Trash2, Star } from 'lucide-react';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('pending');

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const endpoint = tab === 'pending' ? '/reviews/admin/pending' : '/reviews/admin/all';
      const res = await api.get(endpoint);
      setReviews(res.data.reviews);
    } catch { toast.error('Failed to fetch reviews'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchReviews(); }, [tab]);

  const approveReview = async (id) => {
    try {
      await api.patch(`/reviews/${id}/approve`);
      toast.success('Review approved and published!');
      fetchReviews();
    } catch { toast.error('Failed to approve review'); }
  };

  const deleteReview = async (id) => {
    if (!confirm('Delete this review?')) return;
    try {
      await api.delete(`/reviews/${id}`);
      toast.success('Review deleted');
      fetchReviews();
    } catch { toast.error('Failed to delete review'); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reviews Moderator</h1>
        <p className="text-gray-500 mt-1">Approve or reject user reviews</p>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setTab('pending')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>Pending</button>
        <button onClick={() => setTab('all')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === 'all' ? 'bg-[var(--color-brand-primary)] text-white' : 'bg-gray-100 text-gray-600'}`}>All Reviews</button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-400">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="p-12 text-center text-gray-400">{tab === 'pending' ? 'No pending reviews 🎉' : 'No reviews yet.'}</div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r._id} className={`bg-white rounded-2xl shadow-sm border p-6 ${!r.isApproved ? 'border-orange-200' : 'border-gray-100'}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                    {r.userName?.charAt(0) || r.userId?.name?.charAt(0) || '?'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{r.userName || r.userId?.name || 'Unknown'}</p>
                    <p className="text-xs text-gray-500">{r.serviceType} • {new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < r.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">{r.comment}</p>
              <div className="flex items-center justify-between mt-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${r.isApproved ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {r.isApproved ? 'Published' : 'Pending Approval'}
                </span>
                <div className="flex gap-2">
                  {!r.isApproved && (
                    <button onClick={() => approveReview(r._id)} className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100"><CheckCircle className="w-3.5 h-3.5" /> Approve</button>
                  )}
                  <button onClick={() => deleteReview(r._id)} className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
