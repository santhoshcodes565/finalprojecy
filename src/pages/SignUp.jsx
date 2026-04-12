import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const schema = yup.object().shape({
  fullName: yup.string().min(3, 'Minimum 3 characters').required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  phone: yup.string().matches(/^[6-9]\d{9}$/, 'Must be a valid 10-digit Indian phone number').required('Required'),
  dob: yup.date().max(new Date(), 'Cannot be in future').nullable().transform((curr, orig) => orig === '' ? null : curr),
  password: yup.string()
    .min(8, 'Minimum 8 characters')
    .matches(/[A-Z]/, 'Must contain one uppercase letter')
    .matches(/[0-9]/, 'Must contain one number')
    .required('Required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  city: yup.string().required('Required'),
  terms: yup.boolean().oneOf([true], 'You must accept the terms').required(),
  whatsapp: yup.boolean()
});

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register: registerAuth } = useAuth();

  const { register, handleSubmit, trigger, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { whatsapp: true }
  });

  const passwordVal = watch('password', '');
  
  const getPasswordStrength = () => {
    if (!passwordVal) return { label: '', color: 'bg-gray-200' };
    let score = 0;
    if (passwordVal.length > 7) score++;
    if (/[A-Z]/.test(passwordVal)) score++;
    if (/[0-9]/.test(passwordVal)) score++;
    if (/[^A-Za-z0-9]/.test(passwordVal)) score++;
    
    if (score < 2) return { label: 'Weak', color: 'bg-red-500 w-1/3' };
    if (score < 4) return { label: 'Medium', color: 'bg-yellow-500 w-2/3' };
    return { label: 'Strong', color: 'bg-green-500 w-full' };
  };

  const strength = getPasswordStrength();

  const nextStep = async () => {
    const isStep1Valid = await trigger(['fullName', 'email', 'phone', 'dob']);
    if (isStep1Valid) {
      setStep(2);
    }
  };

  const onSubmit = async (data) => {
    try {
      await registerAuth(data.fullName, data.email, data.phone, data.password, data.dob, data.city, data.whatsapp);
      toast.success("Account created! Welcome to Sri Lakshmi Travels 🎉", { duration: 4000 });
      setStep(3);
    } catch (e) {
      toast.error(e.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex font-sans overflow-hidden">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 relative bg-[var(--color-brand-primary)] overflow-hidden items-center justify-center text-center p-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[var(--color-brand-primary)]/80 z-10"></div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg" alt="Travel Background" className="w-full h-full object-cover animate-ken-burns origin-center" />
        </div>
        
        <div className="relative z-20 flex flex-col items-center">
          <div className="w-16 h-16 bg-[var(--color-brand-secondary)] mb-6 flex items-center justify-center font-bold text-white text-2xl shadow-lg rounded">SLT</div>
          <h2 className="font-display text-4xl text-white mb-6">Sri Lakshmi Travels</h2>
          <div className="w-16 h-0.5 bg-[var(--color-brand-secondary)] mb-6"></div>
          <p className="text-[var(--color-brand-accent)] italic text-xl mb-12 font-light tracking-wide">30 Years of Trusted Journeys</p>
          
          <div className="flex flex-col gap-4 text-[var(--color-brand-accent)] text-lg font-medium">
            <div className="flex items-center gap-3"><span className="text-[var(--color-brand-secondary)] text-xl">✅</span> Verified Drivers</div>
            <div className="flex items-center gap-3"><span className="text-[var(--color-brand-secondary)] text-xl">✅</span> 24/7 Support</div>
            <div className="flex items-center gap-3"><span className="text-[var(--color-brand-secondary)] text-xl">✅</span> Best Prices</div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 bg-[#FAFAF8] flex items-center justify-center p-6 md:p-8 lg:p-12 relative">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 box-border border border-gray-100 overflow-hidden relative">
          
          {step < 3 && (
            <div className="mb-8">
              <div className="lg:hidden w-12 h-12 bg-[var(--color-brand-secondary)] mb-6 flex items-center justify-center font-bold text-white text-xl shadow-lg rounded mx-auto">SLT</div>
              <h1 className="font-display text-3xl md:text-4xl text-[var(--color-brand-primary)] font-bold text-center mb-2">Create Account</h1>
              <p className="text-gray-500 text-center mb-6 text-sm">Join thousands of happy travellers</p>
              
              {/* Progress Bar */}
              <div className="w-full h-1 bg-gray-100 rounded-full mb-8 relative">
                <div className={`absolute top-0 left-0 h-full bg-[var(--color-brand-secondary)] rounded-full transition-all duration-500 ease-out`} style={{ width: step === 1 ? '50%' : '100%' }}></div>
              </div>
            </div>
          )}

          {step === 3 ? (
             <div className="text-center py-12 animate-fade-up">
               <div className="text-6xl mb-6 animate-float">🎉</div>
               <h2 className="font-display text-3xl text-[var(--color-brand-primary)] font-bold mb-4">You're all set!</h2>
               <p className="text-gray-600 mb-8 px-4">Account verified successfully. Explore our fleet and book your first trip today.</p>
               <button onClick={() => navigate('/')} className="w-full bg-[var(--color-brand-secondary)] hover:bg-[#F59E0B] text-white font-bold py-4 rounded-xl shadow-lg transition-colors">
                  Explore Cars →
               </button>
             </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="relative min-h-[400px]">
              {/* Step 1 */}
              <div className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${step === 1 ? 'translate-x-0 opacity-100 relative' : '-translate-x-full opacity-0 pointer-events-none'}`}>
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block pl-1">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input type="text" {...register('fullName')} className={`w-full bg-gray-50 border ${errors.fullName ? 'border-red-500' : 'border-gray-200 focus:ring-[var(--color-brand-secondary)]'} rounded-xl px-4 py-3.5 pl-12 focus:outline-none focus:ring-2 focus:border-transparent transition-all`} />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-xs mt-1 pl-1">{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block pl-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input type="email" {...register('email')} className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200 focus:ring-[var(--color-brand-secondary)]'} rounded-xl px-4 py-3.5 pl-12 focus:outline-none focus:ring-2 focus:border-transparent transition-all`} />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1 pl-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block pl-1">Phone Number *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">+91</span>
                      <input type="tel" {...register('phone')} className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200 focus:ring-[var(--color-brand-secondary)]'} rounded-xl px-4 py-3.5 pl-14 focus:outline-none focus:ring-2 focus:border-transparent transition-all tracking-wide`} />
                      <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1 pl-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block pl-1">Date of Birth (Optional)</label>
                    <input type="date" {...register('dob')} className="w-full bg-gray-50 border border-gray-200 focus:ring-[var(--color-brand-secondary)] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:border-transparent transition-all text-gray-700" />
                    {errors.dob && <p className="text-red-500 text-xs mt-1 pl-1">{errors.dob.message}</p>}
                  </div>

                  <button type="button" onClick={nextStep} className="w-full bg-[var(--color-brand-secondary)] hover:bg-[#F59E0B] text-white font-bold py-4 rounded-xl transition-colors mt-8">
                    Next Step →
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${step === 2 ? 'translate-x-0 opacity-100 relative' : 'translate-x-full opacity-0 pointer-events-none'}`}>
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block pl-1">Create Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input type={showPassword ? "text" : "password"} {...register('password')} className={`w-full bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200 focus:ring-[var(--color-brand-secondary)]'} rounded-xl px-4 py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:border-transparent transition-all`} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1 pl-1">{errors.password.message}</p>}
                    
                    {/* Password Strength Widget */}
                    {passwordVal && (
                       <div className="mt-2 pl-1 pr-1">
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                            <div className={`h-full transition-all ${strength.color}`}></div>
                          </div>
                          <p className="text-right text-[10px] text-gray-400 mt-1 uppercase tracking-widest">{strength.label}</p>
                       </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block pl-1">Confirm Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input type={showConfirmPassword ? "text" : "password"} {...register('confirmPassword')} className={`w-full bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200 focus:ring-[var(--color-brand-secondary)]'} rounded-xl px-4 py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:border-transparent transition-all`} />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 pl-1">{errors.confirmPassword.message}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block pl-1">City *</label>
                    <select {...register('city')} className={`w-full bg-white border ${errors.city ? 'border-red-500' : 'border-gray-200 focus:ring-[var(--color-brand-secondary)]'} rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:border-transparent transition-all text-gray-700`}>
                      <option value="">Select City</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Trichy">Trichy</option>
                      <option value="Salem">Salem</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.city && <p className="text-red-500 text-xs mt-1 pl-1">{errors.city.message}</p>}
                  </div>

                  <div className="space-y-4 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input type="checkbox" {...register('terms')} className="w-5 h-5 mt-0.5 rounded text-[var(--color-brand-secondary)] border-gray-300 focus:ring-[var(--color-brand-secondary)] accent-[var(--color-brand-secondary)]" />
                      <span className="text-sm text-gray-600">I agree to the <Link to="#" className="text-[var(--color-brand-secondary)] hover:underline font-medium">Terms of Service</Link> and <Link to="#" className="text-[var(--color-brand-secondary)] hover:underline font-medium">Privacy Policy</Link></span>
                    </label>
                    {errors.terms && <p className="text-red-500 text-xs pl-8 -mt-3">{errors.terms.message}</p>}
                    
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input type="checkbox" {...register('whatsapp')} className="w-5 h-5 mt-0.5 rounded text-[var(--color-brand-secondary)] border-gray-300 focus:ring-[var(--color-brand-secondary)] accent-[var(--color-brand-secondary)]" />
                      <span className="text-sm text-gray-600">Receive booking updates on WhatsApp</span>
                    </label>
                  </div>

                  <div className="flex gap-4 mt-8">
                     <button type="button" onClick={() => setStep(1)} className="w-1/3 border border-gray-300 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors">← Back</button>
                     <button type="submit" disabled={isSubmitting} className="w-2/3 bg-[var(--color-brand-primary)] hover:bg-[#14532D] text-[var(--color-brand-secondary)] font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                      {isSubmitting ? <><div className="w-5 h-5 border-2 border-[var(--color-brand-secondary)] border-t-transparent rounded-full animate-spin"></div></> : 'Create Account →'}
                     </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {step < 3 && (
            <div className="mt-8 text-center text-sm font-medium">
              <span className="text-gray-500">Already have an account? </span>
              <Link to="/signin" className="text-[var(--color-brand-secondary)] font-bold hover:underline">Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
