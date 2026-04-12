import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [success, setSuccess] = useState(false);
  const [method, setMethod] = useState('card');
  const navigate = useNavigate();

  const handlePay = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="bg-warm-white min-h-screen pb-24 relative">
      
      
      {/* SUCCESS MODAL */}
      {success && (
        <div className="fixed inset-0 bg-charcoal/90 backdrop-blur-sm z-[100] flex items-center justify-center p-5">
           {/* Confetti particles */}
           <div className="absolute inset-x-0 top-[-20px] flex justify-center space-x-4 mix-blend-screen opacity-70">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`w-2 h-4 bg-gold animate-float`} style={{ animationDuration: `${2 + Math.random()}s`, animationDelay: `${Math.random()}s` }}></div>
              ))}
           </div>
           
           <div className="card-light p-10 max-w-[500px] w-full text-center relative overflow-hidden animate-fadeUp">
              <div className="w-20 h-20 rounded-full bg-success/10 border-2 border-success text-success mx-auto mb-6 flex items-center justify-center text-4xl font-bold shadow-[0_0_30px_rgba(46,125,50,0.3)]">✓</div>
              <h2 className="font-heading text-4xl font-bold text-charcoal mb-2">Booking Confirmed! 🎉</h2>
              <p className="font-body font-bold text-gold-dark text-lg mb-6 tracking-wide">Booking ID: SLT-2025-78432</p>
              
              <p className="font-body text-text-muted mb-8 leading-relaxed">
                Thank you for choosing Sri Lakshmi Travels. We have sent the booking details to your email. 
                <br/><br/>
                Your driver will contact you 2 hours before the departure time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button className="flex-1 btn-secondary py-3 flex justify-center hover:bg-gold hover:text-charcoal" onClick={() => navigate('/my-bookings')}>View My Bookings</button>
                <button className="flex-1 btn-primary py-3 flex justify-center" onClick={() => navigate('/')}>Back to Home</button>
              </div>
           </div>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-5 md:px-12 pt-[140px] flex flex-col lg:flex-row gap-10">
         {/* Left col */}
         <div className="w-full lg:w-[60%] flex flex-col">
            <div className="flex items-center gap-3 mb-8">
               <span className="text-3xl">🔒</span>
               <div>
                  <h1 className="font-heading text-[32px] font-bold text-charcoal leading-none">Secure Payment</h1>
                  <span className="font-body text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded uppercase mt-1 inline-block">256-bit SSL Encrypted</span>
               </div>
            </div>

            <div className="card-light p-5 border-2 border-gold/30 mb-8 bg-gold/5 flex justify-between items-center">
               <div>
                 <p className="font-heading font-bold text-lg text-charcoal">Chennai → Ooty</p>
                 <p className="font-body text-xs text-text-muted mt-1">15 Mar 2025 • 4 Persons • Ref: SLT-2025-78432</p>
               </div>
               <div className="text-right">
                 <p className="font-heading font-bold text-2xl text-gold-dark tracking-tight">₹6,090</p>
               </div>
            </div>

            <div className="space-y-4 mb-8">
               <h3 className="font-heading text-xl font-bold text-charcoal mb-4">Payment Method</h3>

               {/* Credit Card */}
               <label className={`block card-light p-5 border-2 cursor-pointer transition-colors ${method === 'card' ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/50'}`}>
                  <div className="flex items-center gap-4">
                     <input type="radio" name="pay" checked={method === 'card'} onChange={() => setMethod('card')} className="w-5 h-5 text-gold focus:ring-gold" />
                     <div className="flex-1">
                        <p className="font-body font-bold text-charcoal text-base">Credit / Debit Card</p>
                        <p className="font-body text-xs text-text-muted mt-1">Visa, Mastercard, RuPay</p>
                     </div>
                     <span className="text-2xl">💳</span>
                  </div>
                  {method === 'card' && (
                    <div className="mt-4 pt-4 border-t border-gold/20 flex flex-col gap-4 animate-fadeIn">
                       <input type="text" placeholder="Card Number (0000 0000 0000 0000)" className="w-full text-sm font-monospace tracking-widest bg-white" />
                       <div className="flex gap-4">
                         <input type="text" placeholder="MM/YY" className="flex-1 text-sm bg-white" />
                         <input type="password" placeholder="CVV" className="flex-1 text-sm bg-white" />
                       </div>
                    </div>
                  )}
               </label>

               {/* UPI */}
               <label className={`block card-light p-5 border-2 cursor-pointer transition-colors ${method === 'upi' ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/50'}`}>
                  <div className="flex items-center gap-4">
                     <input type="radio" name="pay" checked={method === 'upi'} onChange={() => setMethod('upi')} className="w-5 h-5 text-gold focus:ring-gold" />
                     <div className="flex-1">
                        <p className="font-body font-bold text-charcoal text-base">UPI</p>
                        <p className="font-body text-xs text-text-muted mt-1">GPay, PhonePe, Paytm</p>
                     </div>
                     <span className="text-2xl">📱</span>
                  </div>
                  {method === 'upi' && (
                    <div className="mt-4 pt-4 border-t border-gold/20 animate-fadeIn">
                       <input type="text" placeholder="Enter UPI ID (e.g., yourname@upi)" className="w-full text-sm bg-white mb-4" />
                       <div className="text-center">
                          <p className="font-body text-xs text-text-muted mb-2 font-bold">— OR SCAN QR —</p>
                          <div className="w-[120px] h-[120px] border border-gray-300 mx-auto bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.1)_0px,rgba(0,0,0,0.1)_5px,transparent_5px,transparent_10px)] rounded flex items-center justify-center">
                            <span className="bg-white p-2 font-bold text-xs">QR Code</span>
                          </div>
                       </div>
                    </div>
                  )}
               </label>

               {/* Net Banking */}
               <label className={`block card-light p-5 border-2 cursor-pointer transition-colors ${method === 'net' ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/50'}`}>
                  <div className="flex items-center gap-4">
                     <input type="radio" name="pay" checked={method === 'net'} onChange={() => setMethod('net')} className="w-5 h-5 text-gold focus:ring-gold" />
                     <div className="flex-1">
                        <p className="font-body font-bold text-charcoal text-base">Net Banking</p>
                        <p className="font-body text-xs text-text-muted mt-1">All major Indian banks supported</p>
                     </div>
                     <span className="text-2xl">🏦</span>
                  </div>
                  {method === 'net' && (
                    <div className="mt-4 pt-4 border-t border-gold/20 animate-fadeIn text-center">
                       <select className="w-full bg-white text-sm mb-2"><option>Select Bank</option><option>SBI</option><option>HDFC</option><option>ICICI</option></select>
                    </div>
                  )}
               </label>

               {/* Pay at Pickup */}
               <label className={`block card-light p-5 border-2 cursor-pointer transition-colors ${method === 'cash' ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/50'}`}>
                  <div className="flex items-center gap-4">
                     <input type="radio" name="pay" checked={method === 'cash'} onChange={() => setMethod('cash')} className="w-5 h-5 text-gold focus:ring-gold" />
                     <div className="flex-1">
                        <p className="font-body font-bold text-charcoal text-base">Pay at Pickup</p>
                        <p className="font-body text-xs text-text-muted mt-1">Pay cash directly to your driver</p>
                     </div>
                     <span className="text-2xl">💵</span>
                  </div>
               </label>
            </div>

            <button className="btn-primary w-full text-xl py-5 rounded-lg shadow-gold-lg animate-pulseGlow mb-3" onClick={handlePay}>
              Pay ₹6,090 Securely
            </button>
            <p className="text-center font-body text-xs text-text-muted">By confirming, you agree to our <a href="#" className="underline hover:text-charcoal">cancellation policy</a>.</p>
         </div>

         {/* Right col */}
         <div className="w-full lg:w-[40%]">
            <div className="card-light p-8 sticky top-[100px] border-t-4 border-t-charcoal shadow-xl">
               <h3 className="font-heading text-2xl font-bold text-charcoal mb-6">Order Summary</h3>
               
               <div className="flex flex-col space-y-4 font-body text-sm border-b border-gray-100 pb-6 mb-6">
                  <div className="flex justify-between">
                     <span className="text-text-muted">Service</span>
                     <span className="font-bold text-charcoal text-right">Car Rental</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-text-muted">Vehicle</span>
                     <span className="font-bold text-charcoal text-right">Innova Crysta (7 Seats)</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-text-muted">Route</span>
                     <span className="font-bold text-charcoal text-right">Chennai → Ooty</span>
                  </div>
               </div>

               <div className="space-y-3 font-body text-sm mb-6">
                 <div className="flex justify-between text-text-primary"><span>Base Fare</span><span>₹5,500</span></div>
                 <div className="flex justify-between text-text-primary"><span>Driver Allowance</span><span>₹300</span></div>
                 <div className="flex justify-between text-text-primary"><span>GST (5%)</span><span>₹290</span></div>
                 <div className="flex justify-between font-bold text-lg text-charcoal pt-4 border-t border-gray-200 mt-2">
                   <span>Total</span>
                   <span className="font-heading text-2xl text-gold-dark">₹6,090</span>
                 </div>
               </div>

               <div className="bg-gray-50 border border-gray-200 p-4 rounded text-center">
                  <p className="font-body text-sm text-text-primary">Need Help?</p>
                  <p className="font-heading font-bold text-charcoal text-xl mt-1">Call +91 98765 43210</p>
               </div>
            </div>
         </div>
      </div>

      
    </div>
  );
};

export default Payment;
