import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MapPin, Calendar, Clock, Users, CreditCard, Check, ChevronRight } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const today = new Date().toISOString().split('T')[0];

const schema = yup.object({
  fullName: yup.string().min(3).required('Full name is required'),
  phone: yup.string().matches(/^[6-9]\d{9}$/, 'Valid Indian mobile required').required('Phone is required'),
  email: yup.string().email().required('Email is required'),
  altPhone: yup.string(),
  tripType: yup.string().required(),
  pickupLocation: yup.string().min(3).required('Pickup location is required'),
  dropLocation: yup.string().min(3).required('Drop location is required'),
  pickupDate: yup.string().required('Pickup date is required'),
  pickupTime: yup.string().required('Pickup time is required'),
  returnDate: yup.string().when('tripType', { is: 'round-trip', then: (s) => s.required('Return date required for round trip') }),
  carCategory: yup.string().required('Select a car category'),
  adults: yup.number().min(1).required(),
  children: yup.number().min(0),
  luggage: yup.number().min(0),
  idType: yup.string().required('Select an ID type'),
  idNumber: yup.string().min(5).required('ID number is required'),
  specialRequests: yup.string(),
});

const carCategories = [
  { id: 'sedan', emoji: '🚗', name: 'Sedan', seats: '4 seats' },
  { id: 'suv', emoji: '🚙', name: 'SUV', seats: '6-7 seats' },
  { id: 'innova', emoji: '🚐', name: 'Innova Crysta', seats: '7 seats' },
  { id: 'tempo', emoji: '🚌', name: 'Tempo Traveller', seats: '12-17 seats' },
  { id: 'minibus', emoji: '🚌', name: 'Mini Bus', seats: '20-25 seats' },
  { id: 'bus', emoji: '🚍', name: 'AC Bus', seats: '40-45 seats' },
];

const tripTypes = [
  { id: 'one-way', label: 'One Way' },
  { id: 'round-trip', label: 'Round Trip' },
  { id: 'multi-city', label: 'Multi City' },
];

export default function CarBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { tripType: 'one-way', adults: 1, children: 0, luggage: 0, idType: '' },
  });

  const tripType = watch('tripType');
  const carCategory = watch('carCategory');
  const formData = watch();

  const goToStep2 = async () => {
    const valid = await trigger(['fullName', 'phone', 'email', 'tripType', 'pickupLocation', 'dropLocation', 'pickupDate', 'pickupTime', 'carCategory']);
    if (tripType === 'round-trip') {
      const rtValid = await trigger('returnDate');
      if (!rtValid) return;
    }
    if (valid) setStep(2);
  };

  const onSubmit = async (data) => {
    navigate('/payment/advance', {
      state: {
        bookingData: { ...data, carId: id },
        endpoint: '/bookings/car',
        successMessage: '🎉 Car booking confirmed! Our team will call within 30 minutes.',
        serviceType: 'car'
      }
    });
  };

  return (
    <div className="bg-brand-accent min-h-screen py-12 pt-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="animate-slide-up">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8 gap-0">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-green-500 text-white' : step === 1 ? 'bg-brand-primary text-white' : 'bg-neutral-200 text-neutral-500'}`}>
                {step >= 2 ? <Check size={18} /> : '1'}
              </div>
              <span className="text-sm font-semibold text-neutral-700 hidden sm:inline">Trip Details</span>
            </div>
            <div className="w-16 h-0.5 bg-neutral-200 mx-2"><div className={`h-full transition-all ${step >= 2 ? 'bg-green-500 w-full' : 'w-0'}`} /></div>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step === 2 ? 'bg-brand-primary text-white' : 'bg-neutral-200 text-neutral-500'}`}>
                2
              </div>
              <span className="text-sm font-semibold text-neutral-700 hidden sm:inline">Confirm Booking</span>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-extrabold text-brand-primary mb-6">Trip Details</h2>

                  {/* Personal Info */}
                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">Full Name *</label>
                      <input {...register('fullName')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Your full name" />
                      {errors.fullName && <p className="text-error text-xs mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">Mobile Number *</label>
                      <input {...register('phone')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="9876543210" />
                      {errors.phone && <p className="text-error text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">Email *</label>
                      <input {...register('email')} type="email" className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="you@email.com" />
                      {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">Alternate Phone</label>
                      <input {...register('altPhone')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Optional" />
                    </div>
                  </div>

                  {/* Trip Type */}
                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Trip Type</h3>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {tripTypes.map((t) => (
                      <button key={t.id} type="button" onClick={() => setValue('tripType', t.id)}
                        className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all text-center ${tripType === t.id ? 'border-brand-primary bg-brand-accent text-brand-primary' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'}`}
                      >{t.label}</button>
                    ))}
                  </div>

                  {/* Locations & Dates */}
                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Locations & Dates</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1 flex items-center gap-1"><MapPin size={14} /> Pickup Location *</label>
                      <input {...register('pickupLocation')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="City or address" />
                      {errors.pickupLocation && <p className="text-error text-xs mt-1">{errors.pickupLocation.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1 flex items-center gap-1"><MapPin size={14} /> Drop Location *</label>
                      <input {...register('dropLocation')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="City or address" />
                      {errors.dropLocation && <p className="text-error text-xs mt-1">{errors.dropLocation.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1 flex items-center gap-1"><Calendar size={14} /> Pickup Date *</label>
                      <input {...register('pickupDate')} type="date" min={today} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                      {errors.pickupDate && <p className="text-error text-xs mt-1">{errors.pickupDate.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1 flex items-center gap-1"><Clock size={14} /> Pickup Time *</label>
                      <input {...register('pickupTime')} type="time" className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                      {errors.pickupTime && <p className="text-error text-xs mt-1">{errors.pickupTime.message}</p>}
                    </div>
                    {tripType === 'round-trip' && (
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-neutral-700 mb-1 flex items-center gap-1"><Calendar size={14} /> Return Date *</label>
                        <input {...register('returnDate')} type="date" min={today} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                        {errors.returnDate && <p className="text-error text-xs mt-1">{errors.returnDate.message}</p>}
                      </div>
                    )}
                  </div>

                  {/* Car Category */}
                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Car Category</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    {carCategories.map((c) => (
                      <button key={c.id} type="button" onClick={() => setValue('carCategory', c.id)}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${carCategory === c.id ? 'border-brand-primary bg-brand-accent scale-[1.02] shadow-md' : 'border-neutral-200 hover:border-neutral-300'}`}
                      >
                        <div className="text-2xl mb-1">{c.emoji}</div>
                        <div className="text-sm font-bold text-neutral-800">{c.name}</div>
                        <div className="text-xs text-neutral-500">{c.seats}</div>
                      </button>
                    ))}
                  </div>
                  {errors.carCategory && <p className="text-error text-xs -mt-6 mb-4">{errors.carCategory.message}</p>}

                  <button type="button" onClick={goToStep2} className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2">
                    Next: Confirm Booking <ChevronRight size={18} />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-2xl font-extrabold text-brand-primary mb-6">Confirm Booking</h2>

                  {/* Passengers */}
                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Passengers</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1 flex items-center gap-1"><Users size={14} /> Adults *</label>
                      <input {...register('adults')} type="number" min="1" max="50" className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1 flex items-center gap-1"><Users size={14} /> Children (below 12)</label>
                      <input {...register('children')} type="number" min="0" className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">Large Luggage</label>
                      <input {...register('luggage')} type="number" min="0" className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                    </div>
                  </div>

                  {/* ID Proof */}
                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">ID Proof</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">ID Type *</label>
                      <select {...register('idType')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none bg-white">
                        <option value="">Select ID type</option>
                        <option value="aadhaar">Aadhaar Card</option>
                        <option value="voter">Voter ID</option>
                        <option value="passport">Passport</option>
                        <option value="driving">Driving License</option>
                        <option value="pan">PAN Card</option>
                      </select>
                      {errors.idType && <p className="text-error text-xs mt-1">{errors.idType.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">ID Number *</label>
                      <input {...register('idNumber')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Enter ID number" />
                      {errors.idNumber && <p className="text-error text-xs mt-1">{errors.idNumber.message}</p>}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Special Requests</h3>
                  <textarea {...register('specialRequests')} rows={3} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none mb-6" placeholder="Child seat, wheelchair access, preferred stop points, any special needs..." />

                  {/* Summary */}
                  <div className="bg-brand-accent rounded-2xl p-5 mb-6">
                    <h4 className="text-sm font-bold text-brand-primary mb-3">Booking Summary</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-neutral-500">Pickup</span><span className="font-semibold text-neutral-800">{formData.pickupLocation}</span>
                      <span className="text-neutral-500">Drop</span><span className="font-semibold text-neutral-800">{formData.dropLocation}</span>
                      <span className="text-neutral-500">Date</span><span className="font-semibold text-neutral-800">{formData.pickupDate}</span>
                      <span className="text-neutral-500">Car</span><span className="font-semibold text-neutral-800 capitalize">{formData.carCategory}</span>
                      <span className="text-neutral-500">Passengers</span><span className="font-semibold text-neutral-800">{formData.adults} adults, {formData.children || 0} children</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 border-2 border-brand-primary text-brand-primary py-3.5 rounded-xl font-bold text-sm hover:bg-brand-primary hover:text-white transition-all">
                      ← Back
                    </button>
                    <button type="submit" disabled={submitting} className="flex-[2] bg-brand-primary text-white py-3.5 rounded-xl font-bold text-sm hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                      {submitting && <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                      Confirm Booking
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
