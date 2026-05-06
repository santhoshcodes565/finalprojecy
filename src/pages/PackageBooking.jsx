import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Check, ChevronRight, Users, Minus, Plus } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

const schema = yup.object({
  fullName: yup.string().min(3).required('Full name is required'),
  email: yup.string().email().required('Email is required'),
  phone: yup.string().matches(/^[6-9]\d{9}$/, 'Valid Indian mobile required').required(),
  address: yup.string(),
  travelDate: yup.string().required('Travel date is required'),
  flexibleDates: yup.boolean(),
  alternateDate: yup.string(),
  hotelCategory: yup.string().required('Select hotel category'),
  roomType: yup.string().required('Select room type'),
  mealPlan: yup.string().required('Select meal plan'),
  transportMode: yup.string().required('Select transport'),
  pickupCity: yup.string().min(2).required('Pickup city required'),
  pickupAddress: yup.string(),
  customizationNeeded: yup.boolean(),
  customNotes: yup.string(),
  dietaryPreference: yup.array().of(yup.string()),
  specialOccasion: yup.string(),
  celebrationNote: yup.string(),
  medicalNeeds: yup.string(),
  budgetPerPerson: yup.number().nullable().transform((v, o) => o === '' ? null : v),
  paymentMode: yup.string(),
  idType: yup.string().required('Select ID type'),
  idNumber: yup.string().min(5).required('ID number required'),
});

const hotels = [
  { id: 'budget', emoji: '🏨', name: 'Budget (2★)', desc: 'Comfortable & affordable' },
  { id: 'standard', emoji: '🏩', name: 'Standard (3★)', desc: 'Popular choice' },
  { id: 'premium', emoji: '🏪', name: 'Premium (4★)', desc: 'Enhanced comfort' },
  { id: 'luxury', emoji: '🌟', name: 'Luxury (5★)', desc: 'Best-in-class' },
];

const roomTypes = ['Single', 'Double', 'Triple', 'Family Suite'];
const mealPlans = [
  { id: 'no-meals', emoji: '🍽️', name: 'No Meals' },
  { id: 'breakfast', emoji: '🥞', name: 'Breakfast Only' },
  { id: 'half-board', emoji: '🥗', name: 'Half Board (B+D)' },
  { id: 'full-board', emoji: '🍱', name: 'Full Board (B+L+D)' },
];
const transports = [
  { id: 'private-car', emoji: '🚌', name: 'Private AC Car' },
  { id: 'train-car', emoji: '🚂', name: 'Train + Car' },
  { id: 'flight-car', emoji: '✈️', name: 'Flight + Car' },
  { id: 'ac-bus', emoji: '🚌', name: 'AC Bus' },
];
const dietOptions = ['🌿 Vegetarian', '🍖 Non-Vegetarian', '🙏 Jain', '🌱 Vegan'];
const occasions = ['None', 'Birthday 🎂', 'Anniversary 💍', 'Honeymoon 💑', 'Family Reunion', 'Corporate Outing'];

export default function PackageBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [travellers, setTravellers] = useState({ adults: 1, children: 0, infants: 0, seniors: 0 });
  const [childrenAges, setChildrenAges] = useState([]);
  const [dietSelections, setDietSelections] = useState([]);

  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { flexibleDates: false, customizationNeeded: false, hotelCategory: '', roomType: '', mealPlan: '', transportMode: '', specialOccasion: 'None', paymentMode: 'upi' },
  });

  const formData = watch();

  const updateTraveller = (key, delta) => {
    setTravellers((prev) => {
      const val = Math.max(key === 'adults' ? 1 : 0, prev[key] + delta);
      if (key === 'children') {
        const ages = delta > 0 ? [...childrenAges, 5] : childrenAges.slice(0, val);
        setChildrenAges(ages);
      }
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

  const goToStep = async (target) => {
    if (target === 2) {
      const valid = await trigger(['fullName', 'email', 'phone', 'travelDate']);
      if (valid) setStep(2);
    } else if (target === 3) {
      const valid = await trigger(['hotelCategory', 'roomType', 'mealPlan', 'transportMode', 'pickupCity']);
      if (valid) setStep(3);
    }
  };

  const onSubmit = async (data) => {
    // Map data to match Mongoose schema strictly
    const mappedRoomType = data.roomType.replace(' suite', '');
    const finalData = { 
        ...data, 
        packageId: id, 
        adults: travellers.adults,
        children: travellers.children,
        infants: travellers.infants,
        seniorCitizens: travellers.seniors,
        childrenAges, 
        dietaryPreference: dietSelections,
        roomType: mappedRoomType
    };

    navigate('/payment/advance', {
      state: {
        bookingData: finalData,
        endpoint: '/bookings/package',
        successMessage: '🎉 Package booked! Our travel expert will call you within 1 hour.',
        serviceType: 'package'
      }
    });
  };

  const steps = ['Travellers & Dates', 'Package Preferences', 'Special Needs & Confirm'];

  return (
    <div className="bg-brand-accent min-h-screen py-12 pt-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="animate-slide-up">
          {/* Stepper */}
          <div className="flex items-center justify-center mb-8 gap-0">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${i + 1 < step ? 'bg-green-500 text-white' : i + 1 === step ? 'bg-brand-primary text-white' : 'bg-neutral-200 text-neutral-500'}`}>
                    {i + 1 < step ? <Check size={16} /> : i + 1}
                  </div>
                  <span className="text-xs font-semibold text-neutral-600 hidden sm:inline">{s}</span>
                </div>
                {i < 2 && <div className="w-8 sm:w-12 h-0.5 bg-neutral-200 mx-1"><div className={`h-full ${i + 1 < step ? 'bg-green-500' : 'bg-transparent'} transition-all`} /></div>}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
            <form onSubmit={handleSubmit(onSubmit)}>

              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-extrabold text-brand-primary mb-6">Travellers & Dates</h2>
                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">Full Name *</label>
                      <input {...register('fullName')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                      {errors.fullName && <p className="text-error text-xs mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">Email *</label>
                      <input {...register('email')} type="email" className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                      {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">Mobile *</label>
                      <input {...register('phone')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                      {errors.phone && <p className="text-error text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">Alternate Contact</label>
                      <input className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Optional" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-neutral-700 mb-1">Full Address</label>
                    <textarea {...register('address')} rows={2} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="For travel documents" />
                  </div>

                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Travel Party</h3>
                  <div className="bg-neutral-50 rounded-2xl px-5 divide-y divide-neutral-200 mb-6">
                    <Counter label="Adults" value={travellers.adults} onDecrease={() => updateTraveller('adults', -1)} onIncrease={() => updateTraveller('adults', 1)} />
                    <Counter label="Children (below 12)" value={travellers.children} onDecrease={() => updateTraveller('children', -1)} onIncrease={() => updateTraveller('children', 1)} />
                    <Counter label="Infants (below 2)" value={travellers.infants} onDecrease={() => updateTraveller('infants', -1)} onIncrease={() => updateTraveller('infants', 1)} />
                    <Counter label="Senior Citizens (60+)" value={travellers.seniors} onDecrease={() => updateTraveller('seniors', -1)} onIncrease={() => updateTraveller('seniors', 1)} />
                  </div>
                  {travellers.children > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      {childrenAges.map((age, i) => (
                        <div key={i}>
                          <label className="block text-xs font-semibold text-neutral-500 mb-1">Child {i + 1} Age</label>
                          <input type="number" min={0} max={12} value={age} onChange={(e) => { const a = [...childrenAges]; a[i] = +e.target.value; setChildrenAges(a); }}
                            className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                        </div>
                      ))}
                    </div>
                  )}

                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Travel Dates</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">Preferred Start Date *</label>
                      <input {...register('travelDate')} type="date" min={tomorrow} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                      {errors.travelDate && <p className="text-error text-xs mt-1">{errors.travelDate.message}</p>}
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer py-3">
                        <input type="checkbox" {...register('flexibleDates')} className="rounded" />
                        <span className="text-sm text-neutral-700 font-medium">Flexible with dates?</span>
                      </label>
                    </div>
                  </div>
                  {formData.flexibleDates && (
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">Alternate Start Date</label>
                      <input {...register('alternateDate')} type="date" min={tomorrow} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                    </div>
                  )}

                  <button type="button" onClick={() => goToStep(2)} className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all">
                    Next: Package Preferences <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <h2 className="text-2xl font-extrabold text-brand-primary mb-6">Package Preferences</h2>

                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Hotel Preference</h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {hotels.map((h) => (
                      <button key={h.id} type="button" onClick={() => setValue('hotelCategory', h.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${formData.hotelCategory === h.id ? 'border-brand-primary bg-brand-accent' : 'border-neutral-200 hover:border-neutral-300'}`}
                      >
                        <div className="text-xl mb-1">{h.emoji}</div>
                        <div className="text-sm font-bold">{h.name}</div>
                        <div className="text-xs text-neutral-500">{h.desc}</div>
                      </button>
                    ))}
                  </div>
                  {errors.hotelCategory && <p className="text-error text-xs mb-4">{errors.hotelCategory.message}</p>}

                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Room Type</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {roomTypes.map((r) => (
                      <button key={r} type="button" onClick={() => setValue('roomType', r.toLowerCase())}
                        className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${formData.roomType === r.toLowerCase() ? 'bg-brand-primary text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
                      >{r}</button>
                    ))}
                  </div>

                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Meal Plan</h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {mealPlans.map((m) => (
                      <button key={m.id} type="button" onClick={() => setValue('mealPlan', m.id)}
                        className={`p-3 rounded-xl border-2 text-center text-sm font-semibold transition-all ${formData.mealPlan === m.id ? 'border-brand-primary bg-brand-accent text-brand-primary' : 'border-neutral-200 text-neutral-600'}`}
                      >{m.emoji} {m.name}</button>
                    ))}
                  </div>

                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Transport</h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {transports.map((t) => (
                      <button key={t.id} type="button" onClick={() => setValue('transportMode', t.id)}
                        className={`p-3 rounded-xl border-2 text-center text-sm font-semibold transition-all ${formData.transportMode === t.id ? 'border-brand-primary bg-brand-accent text-brand-primary' : 'border-neutral-200 text-neutral-600'}`}
                      >{t.emoji} {t.name}</button>
                    ))}
                  </div>

                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Pickup</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">Pickup City *</label>
                      <input {...register('pickupCity')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                      {errors.pickupCity && <p className="text-error text-xs mt-1">{errors.pickupCity.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">Pickup Address</label>
                      <input {...register('pickupAddress')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Landmark..." />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center gap-2 cursor-pointer mb-3">
                      <input type="checkbox" {...register('customizationNeeded')} className="rounded" />
                      <span className="text-sm text-neutral-700 font-medium">Need to customize this package?</span>
                    </label>
                    {formData.customizationNeeded && (
                      <textarea {...register('customNotes')} rows={3} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Extra days, different hotel, route changes..." />
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 border-2 border-brand-primary text-brand-primary py-3.5 rounded-xl font-bold text-sm hover:bg-brand-primary hover:text-white transition-all">← Back</button>
                    <button type="button" onClick={() => goToStep(3)} className="flex-[2] bg-brand-primary text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all">
                      Next: Confirm <ChevronRight size={18} />
                    </button>
                  </div>
                </>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <>
                  <h2 className="text-2xl font-extrabold text-brand-primary mb-6">Special Needs & Confirm</h2>

                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Dietary Preference</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {dietOptions.map((d) => (
                      <button key={d} type="button" onClick={() => setDietSelections((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d])}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${dietSelections.includes(d) ? 'bg-brand-primary text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
                      >{d}</button>
                    ))}
                  </div>

                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Special Occasion</h3>
                  <div className="mb-6">
                    <select {...register('specialOccasion')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none bg-white">
                      {occasions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                    {formData.specialOccasion && formData.specialOccasion !== 'None' && (
                      <input {...register('celebrationNote')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm mt-3 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Tell us more so we can arrange a surprise!" />
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Medical / Physical Needs</h3>
                  <textarea {...register('medicalNeeds')} rows={2} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none mb-6" placeholder="Special assistance, mobility issues, medication..." />

                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Budget</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1">Budget per person (₹)</label>
                      <input {...register('budgetPerPerson')} type="number" className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Optional" />
                      <p className="text-xs text-neutral-400 mt-1">Helps us suggest the best hotels</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">Payment Mode</label>
                      <div className="flex gap-2 flex-wrap">
                        {['upi', 'neft', 'cash'].map((p) => (
                          <label key={p} className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${formData.paymentMode === p ? 'bg-brand-primary text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                            <input type="radio" {...register('paymentMode')} value={p} className="sr-only" />
                            {p === 'upi' ? 'UPI' : p === 'neft' ? 'NEFT / Bank' : 'Cash'}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4 mt-6">ID Proof</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
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
                      <input {...register('idNumber')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="ID Number" />
                      {errors.idNumber && <p className="text-error text-xs mt-1">{errors.idNumber.message}</p>}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-brand-accent rounded-2xl p-5 mb-6">
                    <h4 className="text-sm font-bold text-brand-primary mb-3">Booking Summary</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-neutral-500">Travellers</span><span className="font-semibold">{travellers.adults} adults, {travellers.children} children</span>
                      <span className="text-neutral-500">Date</span><span className="font-semibold">{formData.travelDate || '-'}</span>
                      <span className="text-neutral-500">Hotel</span><span className="font-semibold capitalize">{formData.hotelCategory || '-'}</span>
                      <span className="text-neutral-500">Meal Plan</span><span className="font-semibold capitalize">{formData.mealPlan?.replace('-', ' ') || '-'}</span>
                      <span className="text-neutral-500">Transport</span><span className="font-semibold capitalize">{formData.transportMode?.replace('-', ' ') || '-'}</span>
                      <span className="text-neutral-500">Pickup</span><span className="font-semibold">{formData.pickupCity || '-'}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 border-2 border-brand-primary text-brand-primary py-3.5 rounded-xl font-bold text-sm hover:bg-brand-primary hover:text-white transition-all">← Back</button>
                    <button type="submit" disabled={submitting} className="flex-[2] bg-brand-primary text-white py-3.5 rounded-xl font-bold text-sm hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                      {submitting && <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                      Confirm Package Booking
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
