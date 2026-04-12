import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Users, Eye } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const tabs = ['All', 'Car Rentals', 'Driver Bookings', 'Tour Packages'];

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-neutral-100 text-neutral-600',
};

const typeIcons = { car: '🚗', driver: '👨', package: '🎒' };

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings/mine');
        setBookings(res.data?.bookings || []);
      } catch {
        // If API not connected, show empty state
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Car Rentals') return b.type === 'car';
    if (activeTab === 'Driver Bookings') return b.type === 'driver';
    if (activeTab === 'Tour Packages') return b.type === 'package';
    return true;
  });

  const navigate = useNavigate();

  const cancelBooking = (type, id) => {
    navigate(`/booking/cancel/${id}`);
  };

  return (
    <div className="bg-brand-accent min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 animate-slide-up">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-brand-primary mb-2">My Bookings</h1>
          <p className="text-neutral-500 text-sm">Manage all your trips in one place</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab ? 'bg-brand-primary text-white shadow-md' : 'bg-white text-neutral-600 hover:bg-brand-accent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-5 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-neutral-200 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-neutral-200 rounded w-3/4" />
                    <div className="h-3 bg-neutral-200 rounded w-1/2" />
                    <div className="h-3 bg-neutral-200 rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bookings */}
        {!loading && filteredBookings.length > 0 && (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl bg-brand-accent flex items-center justify-center text-3xl">
                      {typeIcons[booking.type] || '📋'}
                    </div>
                    <span className="block text-center text-xs font-semibold text-neutral-500 mt-1 capitalize">{booking.type}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-brand-primary">{booking.title || booking.pickupLocation + ' → ' + booking.dropLocation}</h3>
                        <p className="text-xs text-neutral-400 mt-0.5">#{booking.bookingId || 'SLT-2025-' + booking._id?.slice(-4)?.toUpperCase()}</p>
                      </div>
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold capitalize self-start ${statusStyles[booking.status] || statusStyles.pending}`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-neutral-600">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {booking.travelDate || booking.pickupDate}</span>
                      <span className="flex items-center gap-1"><Users size={14} /> {booking.adults || 1} passenger(s)</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="px-4 py-2 border border-brand-primary text-brand-primary rounded-lg text-xs font-semibold hover:bg-brand-primary hover:text-white transition-all flex items-center gap-1">
                        <Eye size={14} /> View Details
                      </button>
                      {['pending', 'confirmed'].includes(booking.status) && (
                        <button
                          onClick={() => cancelBooking(booking.type, booking._id)}
                          className="px-4 py-2 border border-red-400 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-500 hover:text-white transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredBookings.length === 0 && (
          <div className="text-center py-20">
            <div className="text-7xl mb-6">🗺️</div>
            <h3 className="text-2xl font-extrabold text-brand-primary mb-2">No bookings yet</h3>
            <p className="text-neutral-500 text-sm mb-8">Start exploring our tours and packages!</p>
            <Link to="/packages" className="bg-brand-primary text-white px-8 py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-all">
              Browse Packages
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
