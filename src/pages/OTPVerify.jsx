import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OTPVerify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (isNaN(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    if (val && index < 5) inputRefs.current[index + 1].focus();
    if (val && index === 5) {
      // Auto submit or verify
      setTimeout(() => navigate('/'), 1000);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6).split('');
    const newOtp = [...otp];
    pastedData.forEach((char, i) => {
      if (!isNaN(char)) newOtp[i] = char;
    });
    setOtp(newOtp);
    if (pastedData.length === 6) {
      inputRefs.current[5].focus();
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center p-5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #C9A84C 10px, #C9A84C 11px)' }}></div>
      
      <div className="card-light max-w-[420px] w-full p-10 flex flex-col items-center text-center relative z-10">
         <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 border border-gold/30">
            <span className="text-3xl">🔒</span>
         </div>
         
         <h2 className="font-heading text-[36px] font-bold text-charcoal mb-2">Verify Your Phone</h2>
         <p className="font-body text-sm text-text-muted mb-8 px-4">
           Enter the 6-digit OTP sent to <span className="font-bold text-charcoal">+91 98765 43210</span>
         </p>

         <div className="flex gap-2 justify-between w-full mb-8">
            {otp.map((v, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={v}
                ref={el => inputRefs.current[i] = el}
                onChange={e => handleChange(e, i)}
                onKeyDown={e => handleKeyDown(e, i)}
                onPaste={handlePaste}
                className="w-[52px] h-[64px] border-2 border-[#E0D8CC] rounded-lg text-center font-heading text-[32px] font-bold text-charcoal focus:border-gold focus:ring-[3px] focus:ring-gold/20 outline-none transition-all p-0"
              />
            ))}
         </div>

         <div className="flex flex-col mb-8 items-center justify-center w-full">
            <p className="font-body text-sm text-text-muted mb-2">Didn't receive OTP?</p>
            <button 
              disabled={timer > 0} 
              onClick={() => setTimer(30)}
              className={`font-body text-sm font-bold ${timer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gold-dark hover:text-gold transition'}`}
            >
              {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
            </button>
         </div>

         <button className="btn-primary w-full text-base py-4" onClick={() => navigate('/')}>Verify OTP</button>
      </div>
    </div>
  );
};

export default OTPVerify;
