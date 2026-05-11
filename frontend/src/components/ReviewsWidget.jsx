import React, { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import api from '../api/axios';
import RatingModal from './RatingModal';

export default function ReviewsWidget({ serviceId, serviceType }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (serviceId && serviceType && !isModalOpen) {
      fetchReviews();
    }
  }, [serviceId, serviceType, isModalOpen]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/reviews/${serviceType}/${serviceId}`);
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-neutral-100 mt-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-display font-black text-brand-primary">Customer Reviews</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-brand-secondary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={reviews.length > 0 && i < 4 ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-sm font-bold text-neutral-500">
              {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
            </span>
          </div>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-secondary text-brand-primary font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-brand-secondary/90 transition-all hover:-translate-y-0.5"
        >
          Rate this Service
        </button>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center">
          <div className="animate-spin w-8 h-8 border-3 border-neutral-200 border-t-brand-primary rounded-full"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 bg-brand-accent/50 rounded-2xl">
          <MessageSquare className="w-12 h-12 text-brand-secondary mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-bold text-brand-primary mb-1">No Reviews Yet</h3>
          <p className="text-sm text-neutral-500">Be the first to rate this service!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="pb-6 border-b border-neutral-100 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center text-brand-primary font-bold">
                    {review.userName ? review.userName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-primary text-sm">{review.userName || 'Anonymous'}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                      {new Date(review.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
                <div className="flex text-brand-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>
              {review.comment && (
                <p className="text-sm text-neutral-600 leading-relaxed italic pl-14">
                  "{review.comment}"
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <RatingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceId={serviceId} 
        serviceType={serviceType} 
      />
    </div>
  );
}
