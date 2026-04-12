import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, List, Phone, MessageCircle } from 'lucide-react';

export default function BookingConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (!booking) {
      navigate('/');
      return;
    }
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [booking, navigate]);

  if (!booking) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  const formatAmount = (amount) => {
    if (!amount) return '₹0';
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  };

  const bookingId = booking._id?.slice(-8)?.toUpperCase() || booking.bookingId || 'N/A';
  const serviceName = booking.carName || booking.packageName || booking.serviceName || 'Travel Service';
  const travelDate = booking.pickupDate || booking.travelDate;
  const passengers = booking.passengers || booking.adults || 1;
  const children = booking.children || 0;
  const totalAmount = booking.totalAmount || booking.totalPrice || booking.estimatedCost || 0;
  const paidAmount = booking.paidAmount || totalAmount;

  return (
    <div className="min-h-screen py-16 px-4" style={{ background: 'linear-gradient(135deg, #E8F4F8 0%, #f0f9ff 50%, #E8F4F8 100%)' }}>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: ['#D4A017', '#1A3C5E', '#10B981', '#3B82F6', '#F59E0B'][i % 5],
                animation: `confettiFall ${2 + Math.random() * 2}s ease-out ${Math.random() * 0.5}s forwards`,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes successPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-2xl mx-auto">

        {/* Success Header */}
        <div className="text-center mb-8" style={{ animation: 'fadeInUp 0.6s ease' }}>
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #D1FAE5, #A7F3D0)',
              animation: 'successPulse 2s ease-in-out infinite',
            }}
          >
            <CheckCircle className="w-12 h-12 text-green-600" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: '#1A3C5E', fontFamily: "'Playfair Display', serif" }}>
            Booking Confirmed!
          </h1>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            An SMS and email confirmation has been sent to your registered phone and email address.
          </p>
        </div>

        {/* Booking Card */}
        <div
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6 border border-gray-100"
          style={{ animation: 'fadeInUp 0.8s ease' }}
        >
          <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-100">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Booking ID</p>
              <p className="text-2xl font-extrabold" style={{ color: '#1A3C5E' }}>SLT-{bookingId}</p>
            </div>
            <span className="bg-yellow-50 text-yellow-700 text-sm font-semibold px-4 py-2 rounded-full border border-yellow-200">
              Pending Confirmation
            </span>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Service', value: serviceName },
              { label: 'Travel Date', value: formatDate(travelDate) },
              { label: 'Passengers', value: `${passengers} Adults${children > 0 ? ` + ${children} Children` : ''}` },
              { label: 'Total Amount', value: formatAmount(totalAmount), highlight: true },
              { label: 'Amount Paid', value: formatAmount(paidAmount), highlight: true },
            ].map(({ label, value, highlight }) => (
              <div key={label} className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">{label}</span>
                <span className={`font-semibold ${highlight ? 'text-lg' : ''}`} style={{ color: highlight ? '#1A3C5E' : '#374151' }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* What happens next */}
        <div
          className="rounded-2xl p-6 mb-6 border"
          style={{ background: '#f0f7ff', borderColor: '#1A3C5E20', animation: 'fadeInUp 1s ease' }}
        >
          <h3 className="font-bold text-lg mb-4" style={{ color: '#1A3C5E' }}>What happens next?</h3>
          <div className="space-y-3">
            {[
              'Our team will call you within 2 hours to confirm your booking.',
              'You will receive an SMS + email once your booking is confirmed.',
              'Driver details will be shared 24 hours before your travel date.',
              'You can track your booking status anytime in My Bookings.',
            ].map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span
                  className="w-6 h-6 text-white rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold"
                  style={{ background: '#1A3C5E' }}
                >
                  {i + 1}
                </span>
                <span className="text-gray-600 text-sm leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Contact */}
        <div
          className="rounded-2xl p-5 mb-6 flex items-center gap-4 border"
          style={{ background: '#FEF9EE', borderColor: '#D4A01730', animation: 'fadeInUp 1.1s ease' }}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#D4A017' }}>
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm" style={{ color: '#1A3C5E' }}>Need help?</p>
            <p className="text-gray-500 text-xs">Call us at +91 98765 43210 or WhatsApp anytime</p>
          </div>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-white" />
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3" style={{ animation: 'fadeInUp 1.2s ease' }}>
          <button
            onClick={() => navigate('/my-bookings')}
            className="flex-1 flex items-center justify-center gap-2 text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
            style={{ background: '#1A3C5E' }}
          >
            <List className="w-4 h-4" />
            View My Bookings
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 flex items-center justify-center gap-2 border-2 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition-all"
            style={{ borderColor: '#1A3C5E', color: '#1A3C5E' }}
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
