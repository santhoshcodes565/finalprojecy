import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, ShieldCheck, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import qrcodeImg from '../assets/qrcode.jpeg';

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
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [screenshotData, setScreenshotData] = useState(null);

  // If directly accessed without state, kick back
  useEffect(() => {
    if (!bookingData || !endpoint) {
      toast.error('Invalid booking session.');
      navigate('/');
    }
  }, [bookingData, endpoint, navigate]);

  if (!bookingData) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setScreenshotData(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!screenshotData) {
      toast.error('Please upload the payment screenshot to proceed.');
      return;
    }
    setIsProcessing(true);

    try {
      const payload = { ...bookingData, paymentScreenshot: screenshotData };
      await api.post(endpoint, payload);
      
      setIsProcessing(false);
      setIsSuccess(true);
      toast.success(successMessage || 'Payment Screenshot Uploaded! Awaiting Admin Confirmation.');
      
      setTimeout(() => {
        navigate('/my-bookings');
      }, 4000);
    } catch (err) {
      setIsProcessing(false);
      toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-brand-accent flex items-center justify-center relative">
        <FlowerConfetti />
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full animate-slide-up z-10 mx-4">
          <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-blue-100 animate-pulse">
            <ShieldCheck size={50} />
          </div>
          <h2 className="text-3xl font-extrabold text-brand-primary mb-3">Upload Complete!</h2>
          <p className="text-neutral-500 mb-6">Your payment screenshot has been sent securely. Awaiting admin confirmation.</p>
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-bold">
            <Loader2 size={16} className="animate-spin" /> Redirecting to your bookings...
          </div>
        </div>
      </div>
    );
  }

  const advanceAmount = serviceType === 'car' ? 500 : serviceType === 'driver' ? 300 : 2500;

  return (
    <div className="min-h-screen bg-brand-accent py-12 pt-28">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: Summary */}
        <div className="animate-fade-up text-center md:text-left">
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
            Please scan the QR code and pay the advance fee, then upload the screenshot to instantly secure your {serviceType || 'service'} reservation.
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

        {/* Right Side: UPI Payment & Upload Form */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-neutral-100">
            <h2 className="text-xl font-bold text-brand-primary mb-6 flex items-center justify-between">
              <span>UPI Payment</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M11.5 21l-8.5-8.5 8.5-8.5V21z"/><path d="M12.5 3l8.5 8.5-8.5 8.5V3z"/></svg>
            </h2>

            <form onSubmit={handlePayment} className="space-y-6">
              <div className="text-center bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                <div className="w-40 h-40 mx-auto mb-4 flex items-center justify-center border-2 border-brand-primary/20 bg-white rounded-2xl overflow-hidden p-2 shadow-sm">
                  <img src={qrcodeImg} alt="UPI QR Code" className="w-full h-full object-contain rounded-xl" />
                </div>
                <p className="text-sm font-semibold text-brand-primary">Scan & Pay ₹{advanceAmount}</p>
                <p className="text-xs text-neutral-500 mt-1">Using any UPI App (GPay, PhonePe, Paytm)</p>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest">
                  Upload Payment Screenshot <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    required 
                    onChange={handleFileChange}
                    className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 cursor-pointer outline-none border border-neutral-200 rounded-xl bg-neutral-50"
                  />
                </div>
                {screenshotData && (
                  <div className="mt-4 border border-brand-primary/20 rounded-xl overflow-hidden relative group">
                    <img src={screenshotData} alt="Preview" className="w-full h-32 object-cover object-top" />
                    <div className="absolute inset-0 bg-brand-primary/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-bold flex items-center gap-2"><CheckCircle size={14}/> File Attached</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-6 bg-brand-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_8px_20px_-10px_rgba(0,100,0,0.4)]"
              >
                {isProcessing ? (
                  <><Loader2 className="animate-spin" size={20} /> Processing & Uploading...</>
                ) : (
                  <>Submit Payment Details</>
                )}
              </button>
            </form>

            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold text-center mt-6">
              🔒 100% Secure Manual Verification
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
