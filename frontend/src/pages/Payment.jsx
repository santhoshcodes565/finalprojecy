import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, endpoint, serviceType } = location.state || {};

  // Strict State Machine: IDLE -> INITIATING -> READY -> PROCESSING -> SUCCESS | FAILED
  const [status, setStatus] = useState('IDLE');
  
  // Backend IDs
  const [paymentId, setPaymentId] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Display Amount (Fallback to 5000 if not passed)
  const amount = bookingData?.amount || 5000;

  useEffect(() => {
    if (!bookingData) {
      toast.error('Invalid payment session. Please restart booking.');
      navigate('/');
      return;
    }

    if (status === 'IDLE') {
      initiatePaymentSystem();
    }
    // eslint-disable-next-line
  }, []);

  const initiatePaymentSystem = async () => {
    setStatus('INITIATING');
    try {
      // 1. Create the actual booking to get a real DB bookingId
      const bookingRes = await api.post(endpoint || '/bookings/car', bookingData);
      const bookingId = bookingRes.data?.booking?._id;

      if (!bookingId) throw new Error('Failed to generate booking ID.');

      // 2. Initiate Payment Handshake
      const initRes = await api.post('/payments/initiate', {
        amount,
        bookingId,
        bookingType: serviceType || 'car'
      });

      setPaymentId(initRes.data.paymentId);
      setStatus('READY');
    } catch (err) {
      console.error(err);
      toast.error('Failed to connect to bank server.');
      setStatus('FAILED');
      setErrorMsg('Initialization failed. Please try again later.');
    }
  };

  // --- Input Formatters ---
  const handleCardChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted.substring(0, 19)); // 16 digits + 3 spaces
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setExpiry(val);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value.replace(/\D/g, '').substring(0, 3));
  };

  // --- Detection ---
  const getCardType = () => {
    if (cardNumber.startsWith('4')) return 'VISA';
    if (cardNumber.startsWith('5')) return 'MASTERCARD';
    return 'CARD';
  };

  // --- Submission ---
  const handlePay = async (e) => {
    e.preventDefault();

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      return toast.error('Please enter a valid 16-digit card number.');
    }
    if (expiry.length !== 5) {
      return toast.error('Please enter valid MM/YY expiry.');
    }
    if (cvv.length !== 3) {
      return toast.error('Please enter a 3-digit CVV.');
    }

    setStatus('PROCESSING');

    // Artificial network latency simulation (2.5s)
    setTimeout(async () => {
      try {
        const verifyRes = await api.post('/payments/verify', {
          paymentId,
          cardNumber: cardNumber.replace(/\s/g, ''),
          expiry,
          cvv
        });

        if (verifyRes.data.status === 'SUCCESS') {
          setTransactionId(verifyRes.data.transactionId);
          setStatus('SUCCESS');
          toast.success(verifyRes.data.message || 'Payment Successful!');
        } else {
          throw new Error('Unexpected response signature');
        }
      } catch (err) {
        setStatus('FAILED');
        setErrorMsg(err.response?.data?.message || 'Bank rejected the transaction.');
        toast.error('Payment Failed.');
      }
    }, 2500);
  };

  return (
    <div className="bg-warm-white min-h-screen pb-24 relative">
      
      {/* PROCESSING OVERLAY */}
      {status === 'PROCESSING' && (
        <div className="fixed inset-0 bg-charcoal/90 backdrop-blur-sm z-[100] flex flex-col items-center justify-center p-5 animate-fadeIn">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mb-6"></div>
          <h2 className="font-heading text-2xl font-bold text-white mb-2">Connecting to Bank...</h2>
          <p className="font-body text-gold-dark text-sm animate-pulse">Authenticating your request securely. Please do not refresh.</p>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {status === 'SUCCESS' && (
        <div className="fixed inset-0 bg-charcoal/90 backdrop-blur-sm z-[100] flex items-center justify-center p-5">
           <div className="absolute inset-x-0 top-[-20px] flex justify-center space-x-4 mix-blend-screen opacity-70">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`w-2 h-4 bg-gold animate-float`} style={{ animationDuration: `${2 + Math.random()}s`, animationDelay: `${Math.random()}s` }}></div>
              ))}
           </div>
           
           <div className="card-light p-10 max-w-[500px] w-full text-center relative overflow-hidden animate-fadeUp bg-white rounded-xl shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-green-100 border-2 border-green-500 text-green-600 mx-auto mb-6 flex items-center justify-center text-4xl font-bold shadow-[0_0_30px_rgba(34,197,94,0.3)]">✓</div>
              <h2 className="font-heading text-4xl font-bold text-gray-900 mb-2">Booking Confirmed! 🎉</h2>
              <p className="font-body font-bold text-brand-primary text-lg mb-2 tracking-wide">TXN ID: {transactionId}</p>
              <p className="font-body text-gray-500 mb-8 leading-relaxed">
                Thank you for choosing Sri Lakshmi Travels. We have sent the receipt to your email. 
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded text-sm transition" onClick={() => navigate('/my-bookings')}>View Bookings</button>
                <button className="flex-1 bg-brand-primary hover:brightness-110 text-white font-bold py-3 rounded text-sm transition shadow-lg" onClick={() => navigate('/')}>Back to Home</button>
              </div>
           </div>
        </div>
      )}

      {/* FAILED MODAL */}
      {status === 'FAILED' && errorMsg && paymentId && (
         <div className="fixed inset-0 bg-charcoal/90 backdrop-blur-sm z-[100] flex items-center justify-center p-5">
            <div className="card-light p-10 max-w-[450px] w-full text-center relative bg-white rounded-xl shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-red-100 border-2 border-red-500 text-red-600 mx-auto mb-6 flex items-center justify-center text-4xl font-bold">✕</div>
              <h2 className="font-heading text-3xl font-bold text-gray-900 mb-2">Payment Failed</h2>
              <p className="font-body text-red-500 font-bold mb-6">{errorMsg}</p>
              
              <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-8 text-left">
                <p className="font-bold mb-2">Possible Reasons:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Invalid CVV entered</li>
                  <li>Card is expired</li>
                  <li>Declined by the issuing bank</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded font-bold" onClick={() => navigate(-1)}>Cancel</button>
                <button className="flex-[2] bg-brand-primary hover:brightness-110 text-white py-3 rounded font-bold" onClick={() => { setStatus('READY'); setCvv(''); }}>Retry Payment</button>
              </div>
            </div>
         </div>
      )}

      <div className="max-w-[1280px] mx-auto px-5 md:px-12 pt-[140px] flex flex-col lg:flex-row gap-10">
         
         <div className="w-full lg:w-[60%] flex flex-col">
            <div className="flex items-center gap-3 mb-8">
               <span className="text-3xl">🔒</span>
               <div>
                  <h1 className="font-heading text-[32px] font-bold text-charcoal leading-none">Secure Checkout</h1>
                  <span className="font-body text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded uppercase mt-1 inline-block">256-bit SSL Encrypted</span>
               </div>
            </div>

            <div className="card-light p-5 border-2 border-gold/30 mb-8 bg-brand-accent/50 flex justify-between items-center rounded-xl">
               <div>
                 <p className="font-heading font-bold text-lg text-charcoal capitalize">{serviceType} Service Booking</p>
                 <p className="font-body text-xs text-gray-500 mt-1">{bookingData?.pickupLocation || 'Local'} → {bookingData?.dropLocation || 'Destination'}</p>
               </div>
               <div className="text-right">
                 <p className="font-heading font-bold text-2xl text-brand-primary tracking-tight">₹{amount.toLocaleString()}</p>
               </div>
            </div>

            {/* FORM */}
            <form onSubmit={handlePay} className="space-y-6 card-light p-8 rounded-xl shadow-sm border border-gray-100 bg-white">
               
               {['IDLE', 'INITIATING'].includes(status) && (
                 <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                    <p className="font-bold text-brand-primary animate-pulse flex items-center gap-2">
                       <span className="w-4 h-4 rounded-full border-2 border-brand-primary border-t-transparent animate-spin inline-block"></span>
                       Initializing Secure Session...
                    </p>
                 </div>
               )}

               <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-100">
                 <h3 className="font-heading text-xl font-bold text-charcoal">Card Details</h3>
                 <div className="flex gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">VISA</span>
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">MASTERCARD</span>
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">
                    Card Number
                    <span className="text-brand-primary">{getCardType()}</span>
                 </label>
                 <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">💳</span>
                   <input 
                     type="text" 
                     required
                     maxLength={19}
                     value={cardNumber}
                     onChange={handleCardChange}
                     placeholder="0000 0000 0000 0000" 
                     className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none font-mono text-lg tracking-widest transition" 
                   />
                 </div>
               </div>

               <div className="flex gap-6">
                 <div className="flex-1">
                   <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date</label>
                   <input 
                     type="text" 
                     required
                     maxLength={5}
                     value={expiry}
                     onChange={handleExpiryChange}
                     placeholder="MM/YY" 
                     className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none text-center font-mono text-lg tracking-widest transition" 
                   />
                 </div>
                 <div className="flex-1">
                   <label className="block text-sm font-bold text-gray-700 mb-2">CVV</label>
                   <input 
                     type="password" 
                     required
                     maxLength={3}
                     value={cvv}
                     onChange={handleCvvChange}
                     placeholder="•••" 
                     className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none text-center font-mono text-lg tracking-widest transition" 
                   />
                 </div>
               </div>

               <div className="pt-4 mt-8 border-t border-gray-100">
                  <button 
                    type="submit" 
                    disabled={status !== 'READY'}
                    className={`w-full text-lg py-4 rounded font-bold transition flex justify-center items-center gap-2 ${status === 'READY' ? 'bg-brand-primary text-white hover:brightness-110 shadow-lg cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                    Click to Pay ₹{amount.toLocaleString()}
                  </button>
                  <p className="text-center font-body text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                    Bank Secure Verification
                  </p>
               </div>
            </form>
         </div>

         {/* Right col: ORDER SUMMARY */}
         <div className="w-full lg:w-[40%]">
            <div className="card-light p-8 sticky top-[100px] border-t-4 border-t-brand-primary shadow-xl bg-white rounded-b-xl">
               <h3 className="font-heading text-2xl font-bold text-charcoal mb-6">Simulation Settings</h3>
               
               <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
                  <p className="text-xs text-blue-800 font-bold mb-2 uppercase tracking-wide">Developer Rules</p>
                  <p className="text-sm text-blue-900 mb-1">Use <span className="font-mono bg-white px-1 border border-blue-200">4242 4242 ...</span> for Success.</p>
                  <p className="text-sm text-blue-900 mb-1">Use <span className="font-mono bg-white px-1 border border-blue-200">4000 0000 ... 2</span> for Failure.</p>
                  <p className="text-sm text-blue-900">Use CVV <span className="font-mono bg-white px-1 border border-blue-200">000</span> for Failure.</p>
               </div>

               <div className="flex flex-col space-y-4 font-body text-sm border-b border-gray-100 pb-6 mb-6">
                  <div className="flex justify-between">
                     <span className="text-gray-500">Service</span>
                     <span className="font-bold text-gray-800 capitalize">{serviceType || 'Unknown'} Booking</span>
                  </div>
                  {bookingData?.carCategory && (
                    <div className="flex justify-between">
                       <span className="text-gray-500">Vehicle Type</span>
                       <span className="font-bold text-gray-800 capitalize">{bookingData.carCategory}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                     <span className="text-gray-500">Payment ID</span>
                     <span className="font-bold text-gray-800">{paymentId ? paymentId.slice(-8).toUpperCase() : 'Generating...'}</span>
                  </div>
               </div>

               <div className="space-y-3 font-body text-sm mb-6">
                 <div className="flex justify-between text-gray-600"><span>Base Amount</span><span>₹{amount.toLocaleString()}</span></div>
                 <div className="flex justify-between font-bold text-lg text-gray-900 pt-4 border-t border-gray-100 mt-2">
                   <span>Total</span>
                   <span className="font-heading text-2xl text-brand-primary">₹{amount.toLocaleString()}</span>
                 </div>
               </div>
            </div>
         </div>
      </div>
      
    </div>
  );
};

export default Payment;
