import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      await api.post('/auth/forgot-password', { email: data.email });
      setSent(true);
      toast.success('Reset link sent! Check your email.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#FAFAF8' }}>

      {/* Left Panel — Branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center" style={{ background: '#0A2E1A' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85)',
            opacity: 0.2,
            animation: 'kenBurns 10s ease-in-out infinite alternate',
          }}
        />
        <style>{`
          @keyframes kenBurns { from { transform: scale(1); } to { transform: scale(1.06); } }
        `}</style>
        <div className="relative z-10 text-center px-12">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6" style={{ background: '#D4A017' }}>
            <span className="text-white font-extrabold text-xl">SLT</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Sri Lakshmi Travels
          </h2>
          <div className="w-12 h-0.5 mx-auto mb-4" style={{ background: '#D4A017' }} />
          <p className="text-gray-300 italic">30 Years of Trusted Journeys</p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 mb-8 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {!sent ? (
            <>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: '#E8F4F8' }}>
                <Mail className="w-8 h-8" style={{ color: '#1A3C5E' }} />
              </div>

              <h1 className="text-3xl font-bold mb-2" style={{ color: '#1A3C5E', fontFamily: "'Playfair Display', serif" }}>
                Forgot Password?
              </h1>
              <p className="text-gray-500 text-sm mb-8">
                No worries! Enter your email and we'll send you a reset link.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 transition-all"
                      style={{ '--tw-ring-color': '#D4A017' }}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
                      })}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ background: '#1A3C5E' }}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: '#D1FAE5' }}>
                <Mail className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A3C5E' }}>Check your email</h2>
              <p className="text-gray-500 text-sm mb-6">
                We've sent a password reset link to <strong>{getValues('email')}</strong>.
                Check your inbox (and spam folder).
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-sm font-medium hover:underline mr-4"
                style={{ color: '#D4A017' }}
              >
                Didn't receive it? Resend
              </button>
            </div>
          )}

          <p className="text-center text-sm text-gray-400 mt-8">
            Remember your password?{' '}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: '#D4A017' }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
