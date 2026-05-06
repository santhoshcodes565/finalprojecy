import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  MapPin, Calendar, Clock, Users, CreditCard, Check, 
  ChevronRight, ChevronLeft, Car, User, Navigation, 
  Map as MapIcon, ShieldCheck, Wallet, Headphones, 
  Upload, Info, CheckCircle2, Star, Plus, Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cars } from '../data/mockData';
import SafeImage from '../components/common/SafeImage';
import toast from 'react-hot-toast';

// --- Form Validation Schemas ---

const selfDriveSchema = yup.object().shape({
  rentalType: yup.string().required(),
  deliveryMethod: yup.string().required(),
  hub: yup.string().when('deliveryMethod', {
    is: 'pickup',
    then: (s) => s.required('Please select a pickup hub')
  }),
  fullName: yup.string().min(3, 'Full Name must be at least 3 characters').required('Full Name is required'),
  phone: yup.string().matches(/^[6-9]\d{9}$/, 'Invalid Indian mobile number').required('Phone is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  address: yup.string().when('deliveryMethod', {
    is: 'delivery',
    then: (s) => s.required('Delivery address is required')
  }),
  landmark: yup.string(),
  city: yup.string().when('deliveryMethod', {
    is: 'delivery',
    then: (s) => s.required('City is required')
  }),
  pincode: yup.string().when('deliveryMethod', {
    is: 'delivery',
    then: (s) => s.matches(/^\d{6}$/, 'Enter a valid 6-digit pincode').required('Pincode is required')
  }),
  deliveryDistance: yup.number().typeError('Must be a number').when('deliveryMethod', {
    is: 'delivery',
    then: (s) => s.min(0, 'Distance cannot be negative').required('Distance is required for delivery calculation')
  }),
  pickupDate: yup.string().required('Date is required'),
  pickupTime: yup.string().required('Time is required'),
  returnDate: yup.string().required('Return date is required'),
  returnTime: yup.string().required('Return time is required'),
  license: yup.mixed().required('License upload is required'),
  idProof: yup.mixed().required('ID proof is required'),
  notes: yup.string(),
});

const withDriverSchema = yup.object().shape({
  rentalType: yup.string().required(),
  fullName: yup.string().min(3, 'Full Name must be at least 3 characters').required('Full Name is required'),
  phone: yup.string().matches(/^[6-9]\d{9}$/, 'Invalid Indian mobile number').required('Phone is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  pickupLocation: yup.string().required('Pickup location is required'),
  dropLocation: yup.string().required('Drop location is required'),
  tripDate: yup.string().required('Trip date is required'),
  tripTime: yup.string().required('Trip time is required'),
  passengers: yup.number().min(1).required(),
  tripType: yup.string().required('Trip type is required'),
  driverLanguage: yup.string().required('Driver language is required'),
  specialRequest: yup.string(),
});

// --- Constants ---

const HUBS = [
  { id: 'nagapattinam', name: 'Nagapattinam Office', address: '123 Beach Road, Nagapattinam, Tamil Nadu' },
  { id: 'chennai', name: 'Chennai Office', address: '45 Airport Hub, Meenambakkam, Chennai' }
];

const TRIP_TYPES = [
  { id: 'one-way', label: 'One Way' },
  { id: 'round-trip', label: 'Round Trip' },
  { id: 'full-day', label: 'Full Day Rental' },
  { id: 'multi-day', label: 'Multi Day Tour' }
];

const LANGUAGES = ['Tamil', 'English', 'Hindi'];

const EXTRAS = [
  { id: 'childSeat', label: 'Child Seat', price: 250 },
  { id: 'fastag', label: 'FASTag Preloaded', price: 500 },
  { id: 'phoneHolder', label: 'Phone Holder', price: 50 }
];

const TRUST_BADGES = [
  { icon: <CheckCircle2 className="text-green-500" />, label: 'Instant Confirmation' },
  { icon: <ShieldCheck className="text-blue-500" />, label: 'Safe & Clean Cars' },
  { icon: <User className="text-purple-500" />, label: 'Verified Drivers' },
  { icon: <Headphones className="text-orange-500" />, label: '24/7 Support' },
  { icon: <Star className="text-brand-secondary fill-brand-secondary" />, label: 'Best Price Guarantee' }
];

export default function CarBooking() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState(1);
  const [rentalType, setRentalType] = useState(null); // 'self' or 'driver'
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    // 1. Try to find in mock data first (for IDs like 'c1', 'c2')
    const localCar = cars.find(c => c.id === id);
    if (localCar) {
      setCar(localCar);
      setLoading(false);
      return;
    }
    
    // 2. Fetch from API (for MongoDB ObjectIDs)
    const fetchCar = async () => {
      try {
        const { default: api } = await import('../api/axios');
        const res = await api.get(`/cars/${id}`);
        if (res.data && res.data.car) {
          setCar(res.data.car);
        } else {
          toast.error('Car not found in server');
          navigate('/car-rental');
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load car details');
        navigate('/car-rental');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="bg-[#FDFDFD] min-h-screen pt-28 flex items-center justify-center">
        <div className="text-brand-primary font-bold animate-pulse text-xl">Loading Booking Details...</div>
      </div>
    );
  }

  if (!car) return null;

  // --- Step Content Components ---

  const CarHeader = () => (
    <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl mb-8 flex flex-col md:flex-row items-center gap-6">
      <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shadow-inner bg-brand-accent">
        <SafeImage src={car.image} alt={car.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
          <h1 className="text-2xl font-bold text-brand-primary">{car.name}</h1>
          <span className="bg-brand-secondary/20 text-brand-secondary text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-brand-secondary/30">Premium</span>
        </div>
        <p className="text-neutral-500 text-sm mb-3">Safe, Fast and Easy Booking in Minutes</p>
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-accent rounded-full text-xs font-semibold text-brand-primary border border-brand-primary/5">
            <Users size={12} /> {car.seats} Seats
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-accent rounded-full text-xs font-semibold text-brand-primary border border-brand-primary/5">
            <Navigation size={12} /> {car.fuel}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-accent rounded-full text-xs font-semibold text-brand-primary border border-brand-primary/5">
            <Check size={12} /> AC
          </div>
        </div>
      </div>
      <div className="text-center md:text-right">
        <p className="text-xs text-neutral-400 uppercase tracking-tighter">Starting from</p>
        <p className="text-3xl font-black text-brand-primary">₹{car.pricePerKm}<span className="text-sm font-normal text-neutral-400">/km</span></p>
      </div>
    </div>
  );

  const StepIndicator = ({ current, total }) => (
    <div className="mb-10 px-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-brand-primary/60 uppercase tracking-widest">Step {current} of {total}</span>
        <span className="text-xs font-black text-brand-secondary italic uppercase">{Math.round((current / total) * 100)}% Complete</span>
      </div>
      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
        <motion.div 
          className="h-full bg-gradient-to-r from-brand-primary to-brand-mid"
          initial={{ width: 0 }}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.8, ease: "circOut" }}
        />
      </div>
    </div>
  );

  // --- Main Booking Logic ---

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate processing
    await new Promise(r => setTimeout(r, 2000));
    
    const baseData = { ...formData, ...data };
    let finalData = {};

    if (rentalType === 'self') {
      finalData = {
        ...baseData,
        carId: id,
        carCategory: car.category || 'Standard',
        tripType: 'round-trip',
        adults: car.seats || 4, // Default capacity
        pickupLocation: baseData.deliveryMethod === 'delivery' ? `${baseData.address}, ${baseData.city}` : HUBS.find(h => h.id === baseData.hub)?.name || 'Hub',
        dropLocation: baseData.deliveryMethod === 'delivery' ? `${baseData.address}, ${baseData.city}` : HUBS.find(h => h.id === baseData.hub)?.name || 'Hub',
        totalAmount: 4500, // Simplified total for demo
      };
    } else {
      finalData = {
        ...baseData,
        carId: id,
        carCategory: car.category || 'Standard',
        tripType: baseData.tripType || 'one-way',
        pickupDate: baseData.tripDate,
        pickupTime: baseData.tripTime,
        adults: baseData.passengers,
        totalAmount: 4500,
      };
    }
    
    navigate('/payment/advance', {
      state: {
        bookingData: finalData,
        endpoint: '/bookings/car',
        successMessage: '🎉 Luxury car booking confirmed! Our executive will contact you shortly.',
        serviceType: 'car'
      }
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-28 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Breadcrumb / Title */}
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-black text-brand-primary mb-2 tracking-tight"
          >
            Book Your Perfect Ride
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-1 bg-brand-secondary mx-auto mb-4 rounded-full"
          />
        </div>

        <CarHeader />

        <AnimatePresence mode="wait">
          {/* STEP 1: Rental Type */}
          {step === 1 && (
            <motion.div key="step1" variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-brand-primary mb-2">How would you like to drive?</h3>
                <p className="text-neutral-500">Select your preferred rental style to continue</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                <button 
                  onClick={() => { setRentalType('self'); setStep(2); }}
                  className="group relative bg-white border-2 border-neutral-100 hover:border-brand-secondary p-8 rounded-[2rem] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-left"
                >
                  <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <Navigation className="text-brand-primary" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-brand-primary mb-2">Self Drive</h4>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-4">Total freedom to drive the car yourself. Take control of your journey.</p>
                  <div className="flex items-center text-brand-secondary font-bold text-sm">
                    Select Mode <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-3 h-3 bg-brand-secondary rounded-full animate-pulse" />
                  </div>
                </button>

                <button 
                  onClick={() => { setRentalType('driver'); setStep(2); }}
                  className="group relative bg-white border-2 border-neutral-100 hover:border-brand-secondary p-8 rounded-[2rem] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-left"
                >
                  <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <User className="text-brand-primary" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-brand-primary mb-2">Car With Driver</h4>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-4">Sit back and relax while our professional, verified driver takes you safely.</p>
                  <div className="flex items-center text-brand-secondary font-bold text-sm">
                    Select Mode <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-3 h-3 bg-brand-secondary rounded-full animate-pulse" />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* SELF DRIVE FLOW */}
          {rentalType === 'self' && step > 1 && (
            <SelfDriveFlow 
              step={step} 
              setStep={setStep} 
              handleNext={handleNext} 
              handleBack={handleBack} 
              handleFinalSubmit={handleFinalSubmit}
              isSubmitting={isSubmitting}
              fadeIn={fadeIn}
              StepIndicator={StepIndicator}
              formData={formData}
            />
          )}

          {/* CAR WITH DRIVER FLOW */}
          {rentalType === 'driver' && step > 1 && (
            <CarWithDriverFlow 
              step={step} 
              handleBack={handleBack} 
              handleFinalSubmit={handleFinalSubmit}
              isSubmitting={isSubmitting}
              fadeIn={fadeIn}
              StepIndicator={StepIndicator}
              car={car}
            />
          )}
        </AnimatePresence>

        {/* Bottom Trust Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-10 border-t border-neutral-100"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {TRUST_BADGES.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-default">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-neutral-50">
                  {badge.icon}
                </div>
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-tighter">{badge.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// --- Self Drive Flow Components ---

function SelfDriveFlow({ step, setStep, handleNext, handleBack, handleFinalSubmit, isSubmitting, fadeIn, StepIndicator, formData }) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(selfDriveSchema),
    defaultValues: { rentalType: 'self', deliveryMethod: 'delivery', ...formData }
  });

  const deliveryMethod = watch('deliveryMethod');
  const selectedHub = watch('hub');

  // Step 2: Delivery Method
  if (step === 2) {
    return (
      <motion.div key="self-step2" variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="max-w-2xl mx-auto">
        <StepIndicator current={2} total={7} />
        <h3 className="text-2xl font-bold text-brand-primary mb-6 text-center">How would you like the car?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button 
            type="button"
            onClick={() => setValue('deliveryMethod', 'delivery')}
            className={`p-6 rounded-2xl border-2 text-left transition-all relative ${deliveryMethod === 'delivery' ? 'border-brand-secondary bg-brand-accent/30 shadow-lg' : 'border-neutral-100 bg-white hover:border-neutral-200'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <MapPin className="text-brand-primary" size={20} />
              </div>
              <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-md uppercase">Recommended</span>
            </div>
            <h4 className="font-bold text-brand-primary mb-1">Home Delivery</h4>
            <p className="text-neutral-500 text-xs">We bring the car to your doorstep</p>
            {deliveryMethod === 'delivery' && <div className="absolute top-4 right-4"><CheckCircle2 className="text-brand-secondary" size={20} /></div>}
          </button>

          <button 
            type="button"
            onClick={() => setValue('deliveryMethod', 'pickup')}
            className={`p-6 rounded-2xl border-2 text-left transition-all relative ${deliveryMethod === 'pickup' ? 'border-brand-secondary bg-brand-accent/30 shadow-lg' : 'border-neutral-100 bg-white hover:border-neutral-200'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <MapIcon className="text-brand-primary" size={20} />
              </div>
            </div>
            <h4 className="font-bold text-brand-primary mb-1">Pickup From Office</h4>
            <p className="text-neutral-500 text-xs">Pick up from our nearest city hub</p>
            {deliveryMethod === 'pickup' && <div className="absolute top-4 right-4"><CheckCircle2 className="text-brand-secondary" size={20} /></div>}
          </button>
        </div>

        {deliveryMethod === 'pickup' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 mb-8">
            <p className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-2">Select Pickup Hub</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HUBS.map(hub => (
                <div 
                  key={hub.id}
                  onClick={() => setValue('hub', hub.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedHub === hub.id ? 'border-brand-primary bg-white shadow-md' : 'border-neutral-100 bg-neutral-50/50 hover:border-neutral-200'}`}
                >
                  <p className="font-bold text-sm text-brand-primary mb-1">{hub.name}</p>
                  <p className="text-[10px] text-neutral-500 leading-tight">{hub.address}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex gap-4">
          <button onClick={handleBack} className="flex-1 py-4 px-6 border-2 border-neutral-100 text-neutral-500 font-bold rounded-2xl hover:bg-neutral-50 transition-all flex items-center justify-center gap-2">
            <ChevronLeft size={20} /> Back
          </button>
          <button onClick={() => setStep(3)} className="flex-[2] py-4 px-6 bg-brand-primary text-white font-bold rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2">
            Continue <ChevronRight size={20} />
          </button>
        </div>
      </motion.div>
    );
  }

  // Step 3: Customer Details
  if (step === 3) {
    return (
      <form onSubmit={handleSubmit(handleNext)} className="max-w-2xl mx-auto">
        <StepIndicator current={3} total={7} />
        <h3 className="text-2xl font-bold text-brand-primary mb-6 text-center">Customer Details</h3>
        
        <div className="bg-white border-2 border-neutral-100 rounded-3xl p-8 mb-8 space-y-6">
          <div className="group">
            <label className="block text-xs font-bold text-neutral-400 uppercase mb-2 group-focus-within:text-brand-primary transition-colors">Full Name</label>
            <input 
              {...register('fullName')}
              className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none transition-all"
              placeholder="John Doe"
            />
            {errors.fullName && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.fullName.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-2 group-focus-within:text-brand-primary transition-colors">Mobile Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold text-sm">+91</span>
                <input 
                  {...register('phone')}
                  className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl pl-12 pr-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none transition-all"
                  placeholder="9876543210"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.phone.message}</p>}
            </div>
            <div className="group">
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-2 group-focus-within:text-brand-primary transition-colors">Email Address</label>
              <input 
                {...register('email')}
                className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none transition-all"
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.email.message}</p>}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button type="button" onClick={handleBack} className="flex-1 py-4 px-6 border-2 border-neutral-100 text-neutral-500 font-bold rounded-2xl hover:bg-neutral-50 transition-all flex items-center justify-center gap-2">
            <ChevronLeft size={20} /> Back
          </button>
          <button type="submit" className="flex-[2] py-4 px-6 bg-brand-primary text-white font-bold rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2">
            Continue <ChevronRight size={20} />
          </button>
        </div>
      </form>
    );
  }

  // Step 4: Address/Logistics
  if (step === 4) {
    return (
      <form onSubmit={handleSubmit(handleNext)} className="max-w-2xl mx-auto">
        <StepIndicator current={4} total={7} />
        <h3 className="text-2xl font-bold text-brand-primary mb-6 text-center">Logistics & Timing</h3>
        
        {deliveryMethod === 'delivery' && (
          <div className="bg-white border-2 border-neutral-100 rounded-3xl p-8 mb-8 space-y-6">
             <div className="group">
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-2 group-focus-within:text-brand-primary transition-colors">Full Address</label>
              <textarea 
                {...register('address')}
                rows={2}
                className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none transition-all resize-none"
                placeholder="House No, Street, Locality"
              />
              {errors.address && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">City</label>
                <input {...register('city')} className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none tracking-tight" />
                {errors.city && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.city.message}</p>}
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Pincode</label>
                <input {...register('pincode')} className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none tracking-widest" />
                {errors.pincode && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.pincode.message}</p>}
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Landmark</label>
                <input {...register('landmark')} className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none" />
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Distance from Hub (KM)</label>
                <input type="number" {...register('deliveryDistance')} className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none tracking-tight" placeholder="e.g. 15" />
                {errors.deliveryDistance && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.deliveryDistance.message}</p>}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white border-2 border-neutral-100 rounded-3xl p-8 mb-8 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest bg-brand-accent w-fit px-2 py-0.5 rounded">Pickup Details</p>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-neutral-400 mb-1">DATE</label>
                    <input type="date" {...register('pickupDate')} className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm outline-none" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-neutral-400 mb-1">TIME</label>
                    <input type="time" {...register('pickupTime')} className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm outline-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-50 w-fit px-2 py-0.5 rounded">Return Details</p>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-neutral-400 mb-1">DATE</label>
                    <input type="date" {...register('returnDate')} className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm outline-none" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-neutral-400 mb-1">TIME</label>
                    <input type="time" {...register('returnTime')} className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm outline-none" />
                  </div>
                </div>
              </div>
           </div>
        </div>

        <div className="flex gap-4">
          <button type="button" onClick={handleBack} className="flex-1 py-4 px-6 border-2 border-neutral-100 text-neutral-500 font-bold rounded-2xl hover:bg-neutral-50 transition-all flex items-center justify-center gap-2">
            <ChevronLeft size={20} /> Back
          </button>
          <button type="submit" className="flex-[2] py-4 px-6 bg-brand-primary text-white font-bold rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2">
            Continue <ChevronRight size={20} />
          </button>
        </div>
      </form>
    );
  }

  // Step 5: Document Upload
  if (step === 5) {
    return (
      <form onSubmit={handleSubmit(handleNext)} className="max-w-2xl mx-auto">
        <StepIndicator current={5} total={7} />
        <h3 className="text-2xl font-bold text-brand-primary mb-6 text-center">Verify Identity</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           <div className="bg-white border-2 border-dashed border-neutral-200 rounded-3xl p-8 text-center hover:border-brand-secondary transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-accent transition-colors">
                <Upload className="text-neutral-400 group-hover:text-brand-secondary" />
              </div>
              <h4 className="font-bold text-brand-primary mb-1">Driving License</h4>
              <p className="text-xs text-neutral-400 mb-4 tracking-tighter">JPEG, PNG or PDF upto 5MB</p>
              <input 
                type="file" 
                id="license" 
                className="hidden" 
                onChange={(e) => setValue('license', e.target.files[0])}
              />
              <label htmlFor="license" className="block w-full py-2 bg-neutral-100 rounded-lg text-[10px] font-black uppercase tracking-widest text-neutral-700 cursor-pointer">Choose File</label>
              {watch('license') && <div className="mt-2 text-[10px] text-green-500 font-bold">✓ {watch('license').name}</div>}
           </div>

           <div className="bg-white border-2 border-dashed border-neutral-200 rounded-3xl p-8 text-center hover:border-brand-secondary transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-accent transition-colors">
                <ShieldCheck className="text-neutral-400 group-hover:text-brand-secondary" />
              </div>
              <h4 className="font-bold text-brand-primary mb-1">Aadhaar / ID Proof</h4>
              <p className="text-xs text-neutral-400 mb-4 tracking-tighter">National ID for identification</p>
              <input 
                type="file" 
                id="idProof" 
                className="hidden" 
                onChange={(e) => setValue('idProof', e.target.files[0])}
              />
              <label htmlFor="idProof" className="block w-full py-2 bg-neutral-100 rounded-lg text-[10px] font-black uppercase tracking-widest text-neutral-700 cursor-pointer">Choose File</label>
              {watch('idProof') && <div className="mt-2 text-[10px] text-green-500 font-bold">✓ {watch('idProof').name}</div>}
           </div>
        </div>

        <div className="flex gap-4">
          <button type="button" onClick={handleBack} className="flex-1 py-4 px-6 border-2 border-neutral-100 text-neutral-500 font-bold rounded-2xl hover:bg-neutral-50 transition-all flex items-center justify-center gap-2">
            <ChevronLeft size={20} /> Back
          </button>
          <button type="submit" className="flex-[2] py-4 px-6 bg-brand-primary text-white font-bold rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2">
            Continue <ChevronRight size={20} />
          </button>
        </div>
      </form>
    );
  }

  // Step 6: Charges Summary
  if (step === 6) {
    const isDelivery = deliveryMethod === 'delivery';
    const distanceVal = Number(watch('deliveryDistance')) || 0;
    const deliveryCharge = isDelivery && distanceVal > 10 ? (distanceVal - 10) * 30 : 0;
    
    return (
      <div className="max-w-2xl mx-auto">
        <StepIndicator current={6} total={7} />
        <h3 className="text-2xl font-bold text-brand-primary mb-6 text-center">Estimated Charges</h3>

        <div className="bg-white border-2 border-neutral-100 rounded-[2rem] shadow-2xl overflow-hidden mb-8">
           <div className="bg-brand-primary p-6 text-white flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Booking Overview</p>
                <h4 className="text-lg font-bold">Self Drive Rental</h4>
              </div>
              <Wallet className="text-brand-secondary opacity-40" size={32} />
           </div>

           <div className="p-8 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-neutral-500">Rental Duration</span>
                <span className="text-sm font-black text-brand-primary">2 Days</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-neutral-50">
                <span className="text-sm font-bold text-neutral-500">Service Fee</span>
                <span className="text-sm font-black text-brand-primary">₹0.00</span>
              </div>
              
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-neutral-700">Delivery Type</span>
                  <span className="text-xs font-bold text-brand-primary uppercase bg-brand-accent px-2 py-0.5 rounded">{deliveryMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-neutral-700">Delivery Charge</span>
                    <Info size={14} className="text-neutral-300" />
                  </div>
                  <span className={`text-sm font-black ${deliveryCharge === 0 ? 'text-green-500' : 'text-brand-primary'}`}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400 italic">
                  * 0-10 KM Free. Beyond that ₹30 per KM applicable.
                </p>
              </div>

              <div className="pt-6 border-t border-brand-primary/5 mt-4">
                 <div className="flex justify-between items-center p-4 bg-brand-accent rounded-2xl">
                    <span className="text-base font-black text-brand-primary uppercase tracking-tighter">Payable at Hub</span>
                    <span className="text-2xl font-black text-brand-primary">₹{deliveryCharge}</span>
                 </div>
                 <p className="text-[10px] text-center text-neutral-400 mt-3 font-bold uppercase tracking-widest">Pricing excluding fuel and tolls</p>
              </div>
           </div>
        </div>

        <div className="flex gap-4">
          <button onClick={handleBack} className="flex-1 py-4 px-6 border-2 border-neutral-100 text-neutral-500 font-bold rounded-2xl hover:bg-neutral-50 transition-all flex items-center justify-center gap-2">
            <ChevronLeft size={20} /> Back
          </button>
          <button onClick={() => setStep(7)} className="flex-[2] py-4 px-6 bg-brand-primary text-white font-bold rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2">
            Review & Confirm <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // Step 7: Extras & Final
  if (step === 7) {
    return (
      <form onSubmit={handleSubmit(handleFinalSubmit)} className="max-w-2xl mx-auto">
        <StepIndicator current={7} total={7} />
        <h3 className="text-2xl font-bold text-brand-primary mb-6 text-center">Final Touches</h3>

        <div className="bg-white border-2 border-neutral-100 rounded-3xl p-8 mb-8 space-y-6">
           <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest text-center">Add Extras</p>
           <div className="grid grid-cols-1 gap-3">
              {EXTRAS.map(extra => (
                <label key={extra.id} className="flex items-center justify-between p-4 rounded-xl border-2 border-neutral-50 hover:bg-neutral-50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 accent-brand-secondary rounded-lg"
                      {...register(`extra_${extra.id}`)}
                    />
                    <div>
                      <p className="text-sm font-bold text-brand-primary">{extra.label}</p>
                      <p className="text-[10px] text-neutral-400">One-time charge</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-brand-secondary group-hover:scale-110 transition-transform">+₹{extra.price}</span>
                </label>
              ))}
           </div>

           <div className="pt-4 border-t border-neutral-50">
             <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Special Notes</label>
             <textarea 
               {...register('notes')}
               rows={3} 
               className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none transition-all resize-none"
               placeholder="Eg: Handover at arrival terminal Gate 2..."
             />
           </div>
        </div>

        <div className="flex gap-4">
          <button type="button" onClick={handleBack} className="flex-1 py-4 px-6 border-2 border-neutral-100 text-neutral-500 font-bold rounded-2xl hover:bg-neutral-50 transition-all flex items-center justify-center gap-2">
            <ChevronLeft size={20} /> Back
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-[2] py-4 px-6 bg-brand-primary text-white font-bold rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <CreditCard size={20} />
            )}
            Confirm Luxury Booking
          </button>
        </div>
      </form>
    );
  }

  return null;
}

// --- Car With Driver Flow Components ---

function CarWithDriverFlow({ step, handleBack, handleFinalSubmit, isSubmitting, fadeIn, StepIndicator, car }) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(withDriverSchema),
    defaultValues: { rentalType: 'driver', passengers: 1, driverLanguage: 'Tamil', tripType: 'round-trip' }
  });

  const tripType = watch('tripType');
  const driverLanguage = watch('driverLanguage');
  const passengers = watch('passengers');

  return (
    <form onSubmit={handleSubmit(handleFinalSubmit)} className="max-w-4xl mx-auto">
      <StepIndicator current={2} total={2} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Input Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border-2 border-neutral-100 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-brand-primary flex items-center gap-2">
              <Users className="text-brand-secondary" size={24} /> Passenger Information
            </h3>
            
            <div className="group">
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Full Name</label>
              <input {...register('fullName')} className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none transition-all" placeholder="Enter guest name" />
              {errors.fullName && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.fullName.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Mobile Number</label>
                <input {...register('phone')} className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none transition-all" placeholder="Contact number" />
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Email Address</label>
                <input {...register('email')} className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none transition-all" placeholder="For confirmation" />
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-neutral-100 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-brand-primary flex items-center gap-2">
              <MapPin className="text-brand-secondary" size={24} /> Trip Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Pickup Location</label>
                <input {...register('pickupLocation')} className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none transition-all" placeholder="Hotel, Airport, Port..." />
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Drop Location</label>
                <input {...register('dropLocation')} className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none transition-all" placeholder="Destination name" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="group">
                <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Trip Date</label>
                <input type="date" {...register('tripDate')} className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none" />
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Trip Time</label>
                <input type="time" {...register('tripTime')} className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none" />
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Passengers</label>
                <div className="flex items-center gap-2 h-[46px] bg-neutral-50 border-2 border-neutral-100 rounded-xl px-2">
                  <button type="button" onClick={() => setValue('passengers', Math.max(1, passengers - 1))} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm border border-neutral-100"><Minus size={12} /></button>
                  <span className="flex-1 text-center font-bold text-brand-primary">{passengers}</span>
                  <button type="button" onClick={() => setValue('passengers', Math.min(car.seats, passengers + 1))} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm border border-neutral-100"><Plus size={12} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Selectors & Summary */}
        <div className="space-y-6">
          <div className="bg-white border-2 border-neutral-100 rounded-3xl p-6">
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Trip Type</p>
            <div className="grid grid-cols-2 gap-2">
              {TRIP_TYPES.map(t => (
                <button 
                  key={t.id}
                  type="button"
                  onClick={() => setValue('tripType', t.id)}
                  className={`py-2 px-3 rounded-xl border-2 text-[10px] font-bold uppercase transition-all ${tripType === t.id ? 'border-brand-secondary bg-brand-accent/50 text-brand-primary' : 'border-neutral-50 bg-neutral-50/50 text-neutral-400 hover:border-neutral-200'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border-2 border-neutral-100 rounded-3xl p-6">
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Driver Language</p>
            <div className="flex gap-2">
              {LANGUAGES.map(lang => (
                <button 
                  key={lang}
                  type="button"
                  onClick={() => setValue('driverLanguage', lang)}
                  className={`flex-1 py-2 rounded-xl border-2 text-[10px] font-black transition-all ${driverLanguage === lang ? 'border-brand-primary bg-brand-primary text-white' : 'border-neutral-50 bg-neutral-50 text-neutral-400'}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-brand-primary rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10" />
            <h4 className="text-xl font-black mb-6 uppercase tracking-tighter">Ready for Ride?</h4>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 opacity-80">
                <div className="w-2 h-2 bg-brand-secondary rounded-full" />
                <span className="text-xs font-bold">Premium Air Conditioned</span>
              </div>
              <div className="flex items-center gap-3 opacity-80">
                <div className="w-2 h-2 bg-brand-secondary rounded-full" />
                <span className="text-xs font-bold">Verified Professional Driver</span>
              </div>
              <div className="flex items-center gap-3 opacity-80">
                <div className="w-2 h-2 bg-brand-secondary rounded-full" />
                <span className="text-xs font-bold">Airport Tax & Tolls Extra</span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-brand-secondary text-brand-primary font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
              ) : (
                <Check size={20} />
              )}
              Confirm Booking
            </button>
            
            <button type="button" onClick={handleBack} className="w-full text-[10px] font-black uppercase tracking-[0.2em] mt-6 opacity-40 hover:opacity-100 transition-opacity">
              Change Rental Mode
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white border-2 border-neutral-100 rounded-3xl p-8">
        <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Special Requests</label>
        <textarea 
          {...register('specialRequest')}
          rows={2} 
          className="w-full bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-secondary outline-none transition-all resize-none"
          placeholder="E.g. Child seat, luggage details, specific pickup point..."
        />
      </div>
    </form>
  );
}
