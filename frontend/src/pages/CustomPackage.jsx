import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Check, ChevronRight, Users, Minus, Plus, Sparkles, MapPin, Calendar, HeartHandshake } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

const schema = yup.object({
  fullName: yup.string().min(3).required('Full name is required'),
  email: yup.string().email().required('Email is required'),
  phone: yup.string().matches(/^[6-9]\d{9}$/, 'Valid Indian mobile required').required(),
  destinations: yup.string().required('Tell us where you want to go'),
  duration: yup.number().min(1, 'At least 1 day').required('Duration is required'),
  travelDate: yup.string().required('Travel date is required'),
  flexibleDates: yup.boolean(),
  budgetPerPerson: yup.number().nullable().transform((v, o) => o === '' ? null : v),
  customNotes: yup.string().required('Please share your requirements'),
});

export default function CustomPackage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [travellers, setTravellers] = useState({ adults: 2, children: 0 });

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { flexibleDates: false },
  });

  const formData = watch();

  const updateTraveller = (key, delta) => {
    setTravellers((prev) => {
      const val = Math.max(key === 'adults' ? 1 : 0, prev[key] + delta);
      return { ...prev, [key]: val };
    });
  };

  const Counter = ({ label, value, onDecrease, onIncrease }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm font-semibold text-neutral-700">{label}</span>
      <div className="flex items-center gap-3">
        <button type="button" onClick={onDecrease} className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition"><Minus size={14} /></button>
        <span className="w-8 text-center font-bold text-sm">{value}</span>
        <button type="button" onClick={onIncrease} className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition"><Plus size={14} /></button>
      </div>
    </div>
  );

  const onSubmit = async (data) => {
    // Map data to simulate the PackageBooking schema as best as possible
    // We use a dummy packageId 'custom' and map custom fields
    const finalData = { 
        packageId: 'custom', 
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        travelDate: data.travelDate,
        flexibleDates: data.flexibleDates,
        adults: travellers.adults,
        children: travellers.children,
        hotelCategory: 'standard', // default for schema
        roomType: 'double',        // default for schema
        mealPlan: 'breakfast',     // default for schema
        transportMode: 'private-car', // default for schema
        pickupCity: 'Custom',
        customizationNeeded: true,
        customNotes: `Destinations: ${data.destinations}\nDuration: ${data.duration} Days\nBudget: ${data.budgetPerPerson || 'Not specified'}\nDetails: ${data.customNotes}`
    };

    setSubmitting(true);
    try {
      await api.post('/bookings/package', finalData);
      toast.success('🎉 Custom request submitted! Our travel expert will contact you shortly.');
      navigate('/my-bookings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-accent min-h-screen py-12 pt-28">
      <div className="max-w-3xl mx-auto px-4">
        <div className="animate-slide-up">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary mb-4">
              <Sparkles size={32} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-primary mb-3">Build Your Custom Package</h1>
            <p className="text-neutral-500 max-w-lg mx-auto">
              Tell us your dream destinations, dates, and preferences. Our experts will craft a personalized itinerary just for you.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-neutral-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
               <HeartHandshake size={100} />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
              
              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <MapPin size={16} /> Where do you want to go?
              </h3>
              <div className="mb-6">
                <input {...register('destinations')} className="w-full px-4 py-3.5 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="E.g., Kerala backwaters, Ooty, Munnar..." />
                {errors.destinations && <p className="text-error text-xs mt-1">{errors.destinations.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">Duration (Days) *</label>
                  <input type="number" {...register('duration')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="e.g. 5" min="1" />
                  {errors.duration && <p className="text-error text-xs mt-1">{errors.duration.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">Budget Per Person (₹)</label>
                  <input type="number" {...register('budgetPerPerson')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Optional" />
                </div>
              </div>

              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Calendar size={16} /> Travel Dates & People
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">Preferred Start Date *</label>
                  <input {...register('travelDate')} type="date" min={tomorrow} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                  {errors.travelDate && <p className="text-error text-xs mt-1">{errors.travelDate.message}</p>}
                </div>
                <div className="flex items-end pb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" {...register('flexibleDates')} className="rounded text-brand-primary" />
                    <span className="text-sm text-neutral-700 font-medium">I am flexible with dates</span>
                  </label>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-2xl px-5 divide-y divide-neutral-200 mb-8 border border-neutral-100">
                <Counter label="Adults (12+ yrs)" value={travellers.adults} onDecrease={() => updateTraveller('adults', -1)} onIncrease={() => updateTraveller('adults', 1)} />
                <Counter label="Children (0-12 yrs)" value={travellers.children} onDecrease={() => updateTraveller('children', -1)} onIncrease={() => updateTraveller('children', 1)} />
              </div>

              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Your Contact Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <input {...register('fullName')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Full Name *" />
                  {errors.fullName && <p className="text-error text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <input {...register('phone')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Mobile Number *" />
                  {errors.phone && <p className="text-error text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="mb-8">
                <input {...register('email')} type="email" className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Email Address *" />
                {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
              </div>

              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Requirements & Ideas</h3>
              <div className="mb-8">
                <textarea {...register('customNotes')} rows={4} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Tell us about the kind of hotels you like, activities you want to do, or any special occasions..." />
                {errors.customNotes && <p className="text-error text-xs mt-1">{errors.customNotes.message}</p>}
              </div>

              <button type="submit" disabled={submitting} className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/20">
                {submitting && <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                Send Custom Request
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
