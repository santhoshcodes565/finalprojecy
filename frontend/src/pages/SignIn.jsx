import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const userData = await login(data.email, data.password);
      
      if (userData.role === 'admin') {
        toast.success("Admin Login Successful! Redirecting to Dashboard...");
        setTimeout(() => navigate('/admin/dashboard'), 1000);
      } else {
        toast.success("Welcome back! Redirecting...");
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (err) {
      const message = err.response?.data?.message || "Invalid credentials. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
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
          
          <p className="mt-16 text-[var(--color-brand-secondary)] text-sm uppercase tracking-widest font-semibold">
            Est. 1995 — Tamil Nadu, India
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 bg-[#FAFAF8] flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100">
           {/* Mobile Only Logo */}
           <div className="lg:hidden w-12 h-12 bg-[var(--color-brand-secondary)] mb-6 flex items-center justify-center font-bold text-white text-xl shadow-lg rounded mx-auto">SLT</div>
           
           <h1 className="font-display text-4xl text-[var(--color-brand-primary)] font-bold text-center mb-2">Welcome Back</h1>
           <p className="text-gray-500 text-center mb-8">Sign in to manage your bookings</p>

           <div className="flex items-center gap-4 mb-8">
             <div className="flex-1 h-px bg-gray-200"></div>
             <p className="text-sm font-medium text-gray-400">or continue with email</p>
             <div className="flex-1 h-px bg-gray-200"></div>
           </div>

           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
             <div>
               <div className="relative">
                 <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                 <input type="email" {...register('email')} placeholder="Email Address *" className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[var(--color-brand-secondary)]'} rounded-xl px-4 py-3.5 pl-12 focus:outline-none focus:ring-2 focus:border-transparent transition-all`} />
               </div>
               {errors.email && <p className="text-red-500 text-xs mt-1 pl-1">{errors.email.message}</p>}
             </div>
             
             <div>
               <div className="relative">
                 <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                 <input type={showPassword ? "text" : "password"} {...register('password')} placeholder="Password *" className={`w-full bg-gray-50 border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[var(--color-brand-secondary)]'} rounded-xl px-4 py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:border-transparent transition-all`} />
                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                 </button>
               </div>
               {errors.password && <p className="text-red-500 text-xs mt-1 pl-1">{errors.password.message}</p>}
             </div>

             <div className="flex items-center justify-between mt-4">
               <label className="flex items-center gap-2 cursor-pointer group">
                 <input type="checkbox" className="w-4 h-4 rounded text-[var(--color-brand-secondary)] border-gray-300 focus:ring-[var(--color-brand-secondary)] accent-[var(--color-brand-secondary)] cursor-pointer" />
                 <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember Me</span>
               </label>
               <Link to="#" className="text-sm font-semibold text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-primary)] transition-colors">Forgot Password?</Link>
             </div>

             <button type="submit" disabled={isSubmitting} className="w-full bg-[var(--color-brand-primary)] hover:bg-[#14532D] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 mt-6">
                {isSubmitting ? (
                   <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Signing in...</>
                ) : 'Sign In →'}
             </button>
           </form>

           <div className="mt-8 text-center text-sm font-medium">
             <span className="text-gray-500">Don't have an account? </span>
             <Link to="/signup" className="text-[var(--color-brand-secondary)] font-bold hover:underline">Sign Up</Link>
           </div>
        </div>
      </div>
    </div>
  );
}
