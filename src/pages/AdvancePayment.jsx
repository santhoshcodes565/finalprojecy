import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, ShieldCheck, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

// Simple confetti animation component with flowers
const FlowerConfetti = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const emojis = ['🌸', '🌺', '🌹', '🌻', '🌼'];
    const newFlowers = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100,
      animationDuration: Math.random() * 2 + 3, // 3 to 5 seconds
      animationDelay: Math.random() * 1.5,
      size: Math.random() * 1.5 + 1 // 1rem to 2.5rem
    }));
    setFlowers(newFlowers);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {flowers.map((f) => (
        <div
          key={f.id}
          className="absolute top-[-10%] animate-fall"
          style={{
            left: `${f.left}%`,
            fontSize: `${f.size}rem`,
            animation: `fall ${f.animationDuration}s linear ${f.animationDelay}s forwards`
          }}
        >
          {f.emoji}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default function AdvancePayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, endpoint, successMessage, serviceType } = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // If directly accessed without state, kick back
  useEffect(() => {
    if (!bookingData || !endpoint) {
      toast.error('Invalid booking session.');
      navigate('/');
    }
  }, [bookingData, endpoint, navigate]);

  if (!bookingData) return null;

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // 1. Simulate payment network delay (Dummy Gateway)
    setTimeout(async () => {
      try {
        // 2. Actually book the service via the backend
        await api.post(endpoint, bookingData);
        
        // 3. Show Success Animation
        setIsProcessing(false);
        setIsSuccess(true);
        toast.success(successMessage || 'Advance payment successful & booking confirmed!');
        
        // 4. Redirect after animation
        setTimeout(() => {
          navigate('/my-bookings');
        }, 4000);
      } catch (err) {
        setIsProcessing(false);
        toast.error(err.response?.data?.message || 'Payment or booking failed. Please try again.');
      }
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-brand-accent flex items-center justify-center relative">
        <FlowerConfetti />
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full animate-slide-up z-10 mx-4">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100 animate-pulse">
            <CheckCircle size={50} />
          </div>
          <h2 className="text-3xl font-extrabold text-brand-primary mb-3">Booking Confirmed!</h2>
          <p className="text-neutral-500 mb-6">Your advance payment was successful. We have received your request.</p>
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-bold">
            <Loader2 size={16} className="animate-spin" /> Redirecting to your bookings...
          </div>
        </div>
      </div>
    );
  }

  // Determine advance price (dummy static or calculated)
  const advanceAmount = serviceType === 'car' ? 500 : serviceType === 'driver' ? 300 : 2500;

  return (
    <div className="min-h-screen bg-brand-accent py-12 pt-28">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: Summary */}
        <div className="animate-slide-up text-center md:text-left">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-brand-primary mb-6 transition-colors">
            <ArrowLeft size={16} /> Edit Booking
          </button>
          
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-4">
            <ShieldCheck size={14} /> Secure Checkout
          </span>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-4">
            Complete your <span className="text-brand-secondary italic">Advance Payment.</span>
          </h1>
          <p className="text-neutral-600 mb-8 max-w-sm">
            Please pay the advance tracking fee to instantly secure your {serviceType || 'service'} reservation.
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-100 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Sparkles size={80} />
            </div>
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Booking Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-neutral-100 pb-2 text-sm">
                <span className="text-neutral-500 font-medium">Service Type</span>
                <span className="text-brand-primary font-bold capitalize">{serviceType || 'Standard'}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-2 text-sm">
                <span className="text-neutral-500 font-medium">Name</span>
                <span className="text-brand-primary font-bold">{bookingData.fullName}</span>
              </div>
              {bookingData.pickupLocation && (
                <div className="flex justify-between border-b border-neutral-100 pb-2 text-sm">
                  <span className="text-neutral-500 font-medium">Pickup</span>
                  <span className="text-brand-primary font-bold">{bookingData.pickupLocation}</span>
                </div>
              )}
              {bookingData.travelDate && (
                <div className="flex justify-between border-b border-neutral-100 pb-2 text-sm">
                  <span className="text-neutral-500 font-medium">Date</span>
                  <span className="text-brand-primary font-bold">{bookingData.travelDate}</span>
                </div>
              )}
            </div>
            
            <div className="mt-6 p-4 bg-brand-primary/5 rounded-xl flex justify-between items-center border border-brand-primary/10">
              <span className="text-brand-primary font-extrabold">Advance Required</span>
              <span className="text-2xl font-extrabold text-brand-primary">₹{advanceAmount}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Dummy Gateway Form */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-neutral-100">
            <h2 className="text-xl font-bold text-brand-primary mb-6">Payment Options</h2>
            
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-brand-primary bg-brand-accent text-brand-primary shadow-sm' : 'border-neutral-100 text-neutral-400 hover:border-neutral-200'}`}
              >
                <CreditCard size={24} />
                <span className="text-xs font-bold uppercase tracking-wide">Credit / Debit</span>
              </button>
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'upi' ? 'border-brand-primary bg-brand-accent text-brand-primary shadow-sm' : 'border-neutral-100 text-neutral-400 hover:border-neutral-200'}`}
              >
                {/* SVG for UPI */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.5 21l-8.5-8.5 8.5-8.5V21z"/><path d="M12.5 3l8.5 8.5-8.5 8.5V3z"/></svg>
                <span className="text-xs font-bold uppercase tracking-wide">UPI APP</span>
              </button>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              {paymentMethod === 'card' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Card Number</label>
                    <input type="text" required placeholder="XXXX XXXX XXXX XXXX" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Valid Thru</label>
                      <input type="text" required placeholder="MM/YY" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">CVV</label>
                      <input type="password" required placeholder="***" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Name on Card</label>
                    <input type="text" required placeholder="JOHN DOE" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-48 h-48 bg-neutral-100 rounded-2xl mx-auto mb-4 flex items-center justify-center border border-neutral-200">
                    <span className="text-neutral-400 font-medium">Dummy QR Code</span>
                  </div>
                  <p className="text-sm text-neutral-500">Scan via Any UPI App or enter VPA</p>
                  <input type="text" placeholder="yourupi@bank" className="mt-4 w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none text-center" />
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-6 bg-brand-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_8px_20px_-10px_rgba(0,100,0,0.4)]"
              >
                {isProcessing ? (
                  <><Loader2 className="animate-spin" size={20} /> Processing Payment...</>
                ) : (
                  <>Pay ₹{advanceAmount} via {paymentMethod === 'card' ? 'Card' : 'UPI'}</>
                )}
              </button>
            </form>

            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold text-center mt-6">
              🔒 100% Encrypted Payment Simulation
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
