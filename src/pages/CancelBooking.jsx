import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, ArrowLeft, Loader2, Info } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function CancelBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const cancellationReasons = [
    "Change in travel plans",
    "Found a cheaper alternative",
    "Health issues / Emergency",
    "Booked by mistake",
    "Other"
  ];

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await api.get(`/bookings/my-bookings`);
        // We find the specific booking among all my bookings since we might not have a get by id directly documented
        // Just merging results from all arrays
        const data = res.data.data;
        const allBookings = [
          ...(data.carBookings || []),
          ...(data.driverBookings || []),
          ...(data.packageBookings || [])
        ];
        
        const found = allBookings.find(b => b._id === id);
        if (!found) throw new Error('Booking not found');
        
        setBooking(found);
      } catch (err) {
        toast.error('Could not find booking details');
        navigate('/my-bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id, navigate]);

  const handleCancelSubmit = async (e) => {
    e.preventDefault();
    if (!reason) {
      toast.error('Please select a cancellation reason.');
      return;
    }

    setCancelling(true);
    try {
      const finalReason = reason === 'Other' ? otherReason : reason;
      
      // Determine endpoints based on the shape of the booking
      let endpoint = '';
      if (booking.carId || booking.carCategory) endpoint = `/bookings/car/${id}/status`;
      else if (booking.requestedDriverId || booking.driverType) endpoint = `/bookings/driver/${id}/status`;
      else if (booking.packageId || booking.hotelCategory) endpoint = `/bookings/package/${id}/status`;
      else throw new Error("Unknown booking type");

      // Attempting to use status update endpoint. Many times it expects { status: 'Cancelled' }
      // If user doesn't have permissions, we will catch it. 
      // If there is a dedicated cancel endpoint `/bookings/.../cancel`, we can use that instead.
      // Assuming changing status works like an admin for now, or the backend supports it.
      await api.patch(endpoint, { status: 'Cancelled', cancellationReason: finalReason });
      
      toast.success('Your booking has been cancelled successfully.');
      navigate('/my-bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel booking. Please contact support.');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-accent flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-accent py-12 pt-28">
      <div className="max-w-2xl mx-auto px-4">
        
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-brand-primary mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to My Bookings
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-red-100">
          <div className="bg-red-50 p-6 flex items-start gap-4 border-b border-red-100">
            <div className="bg-red-100 p-3 rounded-full text-red-500 mt-1">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-red-700">Cancel Booking Request</h1>
              <p className="text-sm text-red-600/80 mt-1">Are you sure you want to cancel this booking? This action is irreversible.</p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-8 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Booking Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-neutral-500">Booking ID</span>
                  <span className="font-bold text-neutral-800">#{id.slice(-6).toUpperCase()}</span>
                </div>
                <div>
                  <span className="block text-neutral-500">Service</span>
                  <span className="font-bold text-neutral-800 capitalize">
                   {booking.carCategory ? 'Rental Car' : booking.driverType ? 'Hire Driver' : 'Tour Package'}
                  </span>
                </div>
                {booking.pickupLocation && (
                  <div>
                    <span className="block text-neutral-500">Location</span>
                    <span className="font-bold text-neutral-800">{booking.pickupLocation}</span>
                  </div>
                )}
                {booking.fullName && (
                  <div>
                    <span className="block text-neutral-500">Name</span>
                    <span className="font-bold text-neutral-800">{booking.fullName}</span>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleCancelSubmit}>
              <label className="block text-sm font-bold text-neutral-700 mb-3">Please tell us why you are cancelling:</label>
              <div className="space-y-2 mb-6">
                {cancellationReasons.map((r, i) => (
                  <label key={i} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${reason === r ? 'border-brand-primary bg-brand-primary/5' : 'border-neutral-200 hover:bg-neutral-50'}`}>
                    <input 
                      type="radio" 
                      name="cancel_reason" 
                      value={r} 
                      onChange={(e) => setReason(e.target.value)}
                      className="accent-brand-primary w-4 h-4"
                    />
                    <span className="text-sm font-medium text-neutral-800">{r}</span>
                  </label>
                ))}
              </div>

              {reason === 'Other' && (
                <div className="animate-fade-in mb-6">
                  <textarea 
                    rows={3}
                    placeholder="Please specify your reason..."
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none"
                  />
                </div>
              )}

              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 text-sm mb-8 border border-blue-100">
                <Info size={20} className="shrink-0 mt-0.5" />
                <p><strong>Refund Policy:</strong> Advance payments will be processed for refunds within 5-7 business days depending on our cancellation policy terms.</p>
              </div>

              <div className="flex gap-4">
                <button type="button" onClick={() => navigate(-1)} className="flex-1 py-4 border-2 border-neutral-200 text-neutral-600 rounded-xl font-bold text-sm hover:border-neutral-300 hover:bg-neutral-50 transition-all">
                  Keep Booking
                </button>
                <button type="submit" disabled={cancelling} className="flex-[2] py-4 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  {cancelling && <Loader2 size={16} className="animate-spin" />}
                  Confirm Cancellation
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
