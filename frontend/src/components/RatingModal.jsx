import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api/axios';

export default function RatingModal({ isOpen, onClose, serviceId, serviceType }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setLoading(true);
    try {
      await api.post('/reviews', {
        serviceId,
        serviceType,
        rating,
        comment,
      });
      toast.success('Review submitted successfully! It will appear after admin approval.');
      setRating(0);
      setComment('');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review. Please ensure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-primary/80 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-brand-accent/30">
          <h2 className="text-2xl font-display font-extrabold text-brand-primary">Rate your Experience</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-400 hover:bg-white hover:text-brand-primary transition-all shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex flex-col items-center mb-8">
            <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Select Rating</span>
            <div className="flex gap-2">
              {[...Array(5)].map((_, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      index <= (hover || rating) 
                        ? 'bg-brand-secondary text-brand-primary scale-110 shadow-lg shadow-brand-secondary/30' 
                        : 'bg-neutral-100 text-neutral-300 hover:bg-neutral-200'
                    }`}
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <Star className="w-6 h-6" fill={index <= (hover || rating) ? 'currentColor' : 'none'} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-bold text-neutral-600 block mb-2">Share your thoughts (Optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you loved about this service..."
              rows="4"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-secondary outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-brand-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
            ) : (
              'Submit Review'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
