import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import ReviewsWidget from '../components/ReviewsWidget';

const today = new Date().toISOString().split('T')[0];

const schema = yup.object({
  fullName: yup.string().min(3).required('Full name is required'),
  phone: yup.string().matches(/^[6-9]\d{9}$/, 'Valid Indian mobile required').required(),
  email: yup.string().email().required(),
  driverType: yup.string().required('Select a driver type'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
  workingHours: yup.string().required('Select working hours'),
  startCity: yup.string().min(2).required('Start city is required'),
  citiesToCover: yup.string(),
  estimatedKm: yup.number().min(0).nullable().transform((v, o) => o === '' ? null : v),
  hasOwnCar: yup.boolean(),
  needsRentalCar: yup.boolean(),
  nightDriving: yup.boolean(),
  hillRoute: yup.boolean(),
  specialInstructions: yup.string(),
  idType: yup.string().required('Select an ID type'),
  idNumber: yup.string().min(5).required('ID number is required'),
});

const driverTypes = [
  { id: 'local', emoji: '🧭', title: 'Local Expert', desc: 'Knows every shortcut in the city' },
  { id: 'tour-guide', emoji: '🏔️', title: 'Tour Guide Driver', desc: 'Bilingual, tourist spots knowledge' },
  { id: 'outstation', emoji: '🛣️', title: 'Outstation Driver', desc: 'Long-distance specialist' },
];

const languages = ['Tamil', 'Telugu', 'Hindi', 'English', 'Kannada', 'Malayalam'];

export default function DriverBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [selectedLangs, setSelectedLangs] = useState([]);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { driverType: '', workingHours: '8', hasOwnCar: false, needsRentalCar: false, nightDriving: false, hillRoute: false },
  });

  const driverType = watch('driverType');
  const hasOwnCar = watch('hasOwnCar');
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const formData = watch();

  const numberOfDays = useMemo(() => {
    if (startDate && endDate) {
      const diff = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 0;
    }
    return 0;
  }, [startDate, endDate]);

  const toggleLang = (lang) => {
    setSelectedLangs((prev) => prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]);
  };

  const onSubmit = async (data) => {
    navigate('/payment/advance', {
      state: {
        bookingData: { ...data, languages: selectedLangs, numberOfDays, requestedDriverId: id || 'any' },
        endpoint: '/bookings/driver',
        successMessage: '✅ Driver booked! We\'ll confirm driver details within 2 hours.',
        serviceType: 'driver'
      }
    });
  };

  const Toggle = ({ label, name, note }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <span className="text-sm font-semibold text-neutral-700">{label}</span>
        {note && <p className="text-xs text-brand-secondary mt-0.5">{note}</p>}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" {...register(name)} className="sr-only peer" />
        <div className="w-11 h-6 bg-neutral-200 peer-focus:ring-2 peer-focus:ring-brand-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary" />
      </label>
    </div>
  );

  return (
    <div className="bg-brand-accent min-h-screen py-12 pt-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="animate-slide-up bg-white rounded-3xl shadow-xl p-6 md:p-10">
          <h2 className="text-2xl font-extrabold text-brand-primary mb-6">Book a Driver</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Info */}
            <div>
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">Full Name *</label>
                  <input {...register('fullName')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Full name" />
                  {errors.fullName && <p className="text-error text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">Mobile *</label>
                  <input {...register('phone')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="9876543210" />
                  {errors.phone && <p className="text-error text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">Email *</label>
                  <input {...register('email')} type="email" className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="you@email.com" />
                  {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
            </div>

            {/* Driver Preference */}
            <div>
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Driver Preference</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {driverTypes.map((d) => (
                  <button key={d.id} type="button" onClick={() => setValue('driverType', d.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${driverType === d.id ? 'border-brand-primary bg-brand-accent' : 'border-neutral-200 hover:border-neutral-300'}`}
                  >
                    <div className="text-2xl mb-2">{d.emoji}</div>
                    <div className="text-sm font-bold text-neutral-800">{d.title}</div>
                    <div className="text-xs text-neutral-500 mt-1">{d.desc}</div>
                  </button>
                ))}
              </div>
              {errors.driverType && <p className="text-error text-xs">{errors.driverType.message}</p>}

              <label className="block text-sm font-semibold text-neutral-700 mb-2 mt-4">Language Preference</label>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button key={lang} type="button" onClick={() => toggleLang(lang)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${selectedLangs.includes(lang) ? 'bg-brand-primary text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
                  >{lang}</button>
                ))}
              </div>
            </div>

            {/* Trip Duration */}
            <div>
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Trip Duration</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1 flex items-center gap-1"><Calendar size={14} /> Start Date *</label>
                  <input {...register('startDate')} type="date" min={today} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                  {errors.startDate && <p className="text-error text-xs mt-1">{errors.startDate.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1 flex items-center gap-1"><Calendar size={14} /> End Date *</label>
                  <input {...register('endDate')} type="date" min={startDate || today} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                  {errors.endDate && <p className="text-error text-xs mt-1">{errors.endDate.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">Duration</label>
                  <div className="px-4 py-3 bg-brand-accent rounded-xl text-sm font-bold text-brand-primary">{numberOfDays} day{numberOfDays !== 1 ? 's' : ''}</div>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Daily Working Hours</label>
                <div className="flex gap-3">
                  {['8', '10', '12'].map((h) => (
                    <label key={h} className={`flex-1 text-center py-3 rounded-xl border-2 text-sm font-semibold cursor-pointer transition-all ${watch('workingHours') === h ? 'border-brand-primary bg-brand-accent text-brand-primary' : 'border-neutral-200 text-neutral-600'}`}>
                      <input type="radio" {...register('workingHours')} value={h} className="sr-only" />
                      {h} Hours
                    </label>
                  ))}
                </div>
                {watch('workingHours') === '12' && <p className="text-xs text-brand-secondary mt-2">* 12 hrs may attract overtime charges</p>}
              </div>
            </div>

            {/* Route Info */}
            <div>
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Route Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">Start City *</label>
                  <input {...register('startCity')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Starting city" />
                  {errors.startCity && <p className="text-error text-xs mt-1">{errors.startCity.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">Estimated KM</label>
                  <input {...register('estimatedKm')} type="number" className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Approximate" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-neutral-700 mb-1">Cities to Cover</label>
                <textarea {...register('citiesToCover')} rows={2} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="e.g. Ooty, Kodaikanal, Munnar" />
              </div>
            </div>

            {/* Vehicle & Requirements */}
            <div>
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Vehicle & Special Requirements</h3>
              <div className="bg-neutral-50 rounded-2xl px-5 divide-y divide-neutral-200">
                <Toggle label="I have my own car" name="hasOwnCar" />
                {!hasOwnCar && <Toggle label="I also need a rental car with the driver" name="needsRentalCar" />}
                <Toggle label="Night Driving Required" name="nightDriving" note="* Extra charges apply for night driving" />
                <Toggle label="Hill / Ghat Route" name="hillRoute" note="* Ghat-experienced driver will be assigned" />
              </div>
            </div>

            {/* ID Proof */}
            <div>
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">ID Proof</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <select {...register('idType')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none bg-white">
                    <option value="">Select ID type</option>
                    <option value="aadhaar">Aadhaar Card</option>
                    <option value="voter">Voter ID</option>
                    <option value="passport">Passport</option>
                    <option value="driving">Driving License</option>
                  </select>
                  {errors.idType && <p className="text-error text-xs mt-1">{errors.idType.message}</p>}
                </div>
                <div>
                  <input {...register('idNumber')} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="ID Number" />
                  {errors.idNumber && <p className="text-error text-xs mt-1">{errors.idNumber.message}</p>}
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1">Special Instructions</label>
              <textarea {...register('specialInstructions')} rows={3} className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Any special requirements..." />
            </div>

            {/* Summary */}
            <div className="bg-brand-accent rounded-2xl p-5">
              <h4 className="text-sm font-bold text-brand-primary mb-3">Booking Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-neutral-500">Duration</span><span className="font-semibold">{numberOfDays} day(s)</span>
                <span className="text-neutral-500">Driver Type</span><span className="font-semibold capitalize">{formData.driverType || '-'}</span>
                <span className="text-neutral-500">Daily Hours</span><span className="font-semibold">{formData.workingHours}h</span>
                <span className="text-neutral-500">Start City</span><span className="font-semibold">{formData.startCity || '-'}</span>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={submitting} className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-sm hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
              {submitting && <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
              Book Driver Now
            </button>
          </form>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-8">
          <ReviewsWidget serviceId={id || 'general'} serviceType="driver" />
        </div>
      </div>
    </div>
  );
}
