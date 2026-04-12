import { useState, useEffect } from 'react';
import { Heart, Trash2, MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function MyWishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await api.get('/auth/me');
      const user = res.data.user;
      if (user.savedTours && user.savedTours.length > 0) {
        const toursRes = await api.get('/tours');
        const allTours = toursRes.data.tours || toursRes.data || [];
        const saved = allTours.filter(t => user.savedTours.includes(t._id));
        setWishlist(saved);
      }
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeTour = async (tourId) => {
    try {
      await api.patch(`/tours/${tourId}/unsave`);
      setWishlist(prev => prev.filter(t => t._id !== tourId));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(180deg, #E8F4F8 0%, #fff 100%)' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#1A3C5E' }}>
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#1A3C5E', fontFamily: "'Playfair Display', serif" }}>
              My Wishlist
            </h1>
            <p className="text-sm text-gray-500">{wishlist.length} saved tours</p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-3 border-gray-200 rounded-full" style={{ borderTopColor: '#1A3C5E' }} />
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#FEF9EE' }}>
              <Heart className="w-12 h-12" style={{ color: '#D4A017' }} />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">Browse our tour packages and save your favorites to plan your next adventure!</p>
            <button
              onClick={() => navigate('/packages')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90"
              style={{ background: '#1A3C5E' }}
            >
              Explore Packages
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((tour) => (
              <div
                key={tour._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.coverImage || tour.photos?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    onClick={() => removeTour(tour._id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-red-50 transition-colors shadow"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  {tour.category && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: '#D4A017' }}>
                      {tour.category}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#1A3C5E' }}>{tour.title}</h3>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {tour.destination}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {tour.duration} Days
                    </span>
                  </div>

                  {tour.ratings?.average > 0 && (
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5"
                          fill={i < Math.round(tour.ratings.average) ? '#D4A017' : 'none'}
                          stroke={i < Math.round(tour.ratings.average) ? '#D4A017' : '#D1D5DB'}
                        />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">({tour.ratings.count})</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div>
                      {tour.discountPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold" style={{ color: '#1A3C5E' }}>₹{tour.discountPrice.toLocaleString('en-IN')}</span>
                          <span className="text-sm text-gray-400 line-through">₹{tour.price.toLocaleString('en-IN')}</span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold" style={{ color: '#1A3C5E' }}>₹{tour.price?.toLocaleString('en-IN')}</span>
                      )}
                      <span className="text-xs text-gray-400">/person</span>
                    </div>
                    <button
                      onClick={() => navigate(`/tour/${tour._id}`)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ background: '#D4A017' }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
