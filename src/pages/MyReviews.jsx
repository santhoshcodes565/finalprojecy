import { useState, useEffect } from 'react';
import { Star, MessageSquare, Image as ImageIcon, Calendar, MapPin } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get('/reviews/my');
      setReviews(res.data.reviews || []);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(180deg, #E8F4F8 0%, #fff 100%)' }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#D4A017' }}>
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#1A3C5E', fontFamily: "'Playfair Display', serif" }}>
              My Reviews
            </h1>
            <p className="text-sm text-gray-500">{reviews.length} reviews written</p>
          </div>
        </div>

        {/* Reviews List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-3 border-gray-200 rounded-full" style={{ borderTopColor: '#1A3C5E' }} />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#FEF9EE' }}>
              <MessageSquare className="w-12 h-12" style={{ color: '#D4A017' }} />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No reviews yet</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              After completing a trip, you can share your experience and help other travelers!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold" style={{ color: '#1A3C5E' }}>
                        {review.serviceType === 'tour' ? 'Tour Package' : review.serviceType === 'car' ? 'Car Rental' : 'Driver Hire'}
                      </h3>
                      {review.isVerified && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">
                          ✓ Verified Traveler
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4"
                          fill={i < review.rating ? '#D4A017' : 'none'}
                          stroke={i < review.rating ? '#D4A017' : '#D1D5DB'}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {new Date(review.createdAt).toLocaleDateString('en-IN')}
                  </div>
                </div>

                {review.comment && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">"{review.comment}"</p>
                )}

                {review.photos && review.photos.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {review.photos.map((photo, i) => (
                      <img
                        key={i}
                        src={photo}
                        alt={`Review photo ${i + 1}`}
                        className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    review.isApproved
                      ? 'bg-green-50 text-green-600'
                      : 'bg-yellow-50 text-yellow-600'
                  }`}>
                    {review.isApproved ? 'Published' : 'Pending Approval'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
