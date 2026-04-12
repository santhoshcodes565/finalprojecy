import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Car, UserCheck, Map, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { cars, drivers, packages } from '../data/mockData';
import api from '../api/axios';

const tamilNaduDistricts = [
  'Ariyalur','Chengalpattu','Chennai','Coimbatore','Cuddalore','Dharmapuri',
  'Dindigul','Erode','Kallakurichi','Kanchipuram','Kanyakumari','Karur',
  'Krishnagiri','Madurai','Mayiladuthurai','Nagapattinam','Namakkal','Nilgiris',
  'Perambalur','Pudukkottai','Ramanathapuram','Ranipet','Salem','Sivaganga',
  'Tenkasi','Thanjavur','Theni','Thoothukudi','Tiruchirappalli','Tirunelveli',
  'Tirupathur','Tiruppur','Tiruvallur','Tiruvannamalai','Tiruvarur','Vellore',
  'Viluppuram','Virudhunagar'
];

const inputClass = 'w-full px-4 py-3 bg-brand-accent border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none';
const labelClass = 'text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1.5';

export default function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlType = searchParams.get('type');
  const urlCarId = searchParams.get('carId');
  const urlDriverId = searchParams.get('driverId');
  const urlPackageId = searchParams.get('packageId');
  const hasPreselection = urlType && (urlCarId || urlDriverId || urlPackageId);

  const [step, setStep] = useState(hasPreselection ? 2 : 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceType, setServiceType] = useState(urlType || 'car');
  const [selectedCarId, setSelectedCarId] = useState(urlCarId || cars[0]?.id || '');
  const [selectedDriverId, setSelectedDriverId] = useState(urlDriverId || drivers[0]?.id || '');
  const [selectedPackageId, setSelectedPackageId] = useState(urlPackageId || packages[0]?.id || '');
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', pickupDistrict: 'Chennai',
    pickupAddress: '', dropAddress: '', startDate: '', endDate: '',
    passengers: 2, specialRequests: ''
  });

  const handleChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const selectedCar = cars.find((c) => c.id === selectedCarId);
  const selectedDriver = drivers.find((d) => d.id === selectedDriverId);
  const selectedPackage = packages.find((p) => p.id === selectedPackageId);

  const handleBookingSubmit = async () => {
    try {
      setIsSubmitting(true);
      const payload = {
        fullName: formData.fullName || 'Guest',
        email: formData.email || 'guest@example.com',
        phone: formData.phone || '0000000000',
      };
      
      let endpoint = '';

      if (serviceType === 'car') {
        endpoint = '/bookings/car';
        payload.carId = selectedCarId;
        payload.tripType = 'round-trip';
        payload.pickupLocation = formData.pickupAddress || formData.pickupDistrict;
        payload.dropLocation = formData.dropAddress || 'TBD';
        payload.pickupDate = formData.startDate || new Date();
        payload.pickupTime = '09:00 AM';
        payload.returnDate = formData.endDate || new Date();
        payload.carCategory = selectedCar?.category || 'Standard';
        payload.adults = formData.passengers;
        payload.specialRequests = formData.specialRequests;
      } else if (serviceType === 'driver') {
        endpoint = '/bookings/driver';
        payload.requestedDriverId = selectedDriverId;
        payload.driverType = 'outstation';
        payload.startDate = formData.startDate || new Date();
        payload.endDate = formData.endDate || new Date();
        payload.workingHours = '12';
        payload.startCity = formData.pickupDistrict;
        payload.specialInstructions = formData.specialRequests;
      } else if (serviceType === 'package') {
        endpoint = '/bookings/package';
        payload.packageId = selectedPackageId;
        payload.travelDate = formData.startDate || new Date();
        payload.adults = formData.passengers;
        payload.hotelCategory = 'standard';
        payload.roomType = 'double';
        payload.mealPlan = 'breakfast';
        payload.transportMode = 'car';
        payload.pickupCity = formData.pickupDistrict;
        payload.customNotes = formData.specialRequests;
      }

      navigate('/payment/advance', {
        state: {
          bookingData: payload,
          endpoint: endpoint,
          successMessage: 'Request Received! Our team will verify and confirm shortly.',
          serviceType: serviceType
        }
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to submit booking. Please login to book.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedItemName = () => {
    if (serviceType === 'car') return selectedCar?.name || '';
    if (serviceType === 'driver') return selectedDriver?.name || '';
    if (serviceType === 'package') return selectedPackage?.title || '';
    return '';
  };

  const serviceOptions = [
    { key: 'car', icon: <Car size={28} />, label: 'Rental Car', desc: 'Self-drive or chauffeur driven options.' },
    { key: 'driver', icon: <UserCheck size={28} />, label: 'Hire Driver', desc: 'Professional bilingual chauffeurs.' },
    { key: 'package', icon: <Map size={28} />, label: 'Tour Package', desc: 'All-inclusive 3 to 14 day trips.' },
  ];

  return (
    <div className="bg-brand-accent pt-28 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 animate-slide-up">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-primary bg-brand-primary/10 px-4 py-1.5 rounded-full border border-brand-primary/20 mb-3">
            Secure Reservation
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-primary">
            Plan Your <span className="text-brand-secondary italic">Journey.</span>
          </h1>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-10 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-200 -z-10 -translate-y-1/2" />
          {(hasPreselection ? [2, 3] : [1, 2, 3]).map((s) => (
            <div key={s} className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= s ? 'bg-brand-primary text-white shadow-lg ring-4 ring-brand-primary/20' : 'bg-neutral-200 text-neutral-400'}`}>
              {s}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white p-6 md:p-10 rounded-2xl border border-neutral-100 shadow-xl">
          {/* STEP 1 */}
          {step === 1 && !hasPreselection && (
            <div>
              <h2 className="text-xl font-extrabold text-brand-primary mb-6">What do you want to book?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                {serviceOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setServiceType(opt.key)}
                    className={`p-5 rounded-xl border-2 text-left transition-all ${serviceType === opt.key ? 'border-brand-primary bg-brand-primary/5' : 'border-neutral-200 hover:border-brand-primary/40'}`}
                  >
                    <div className="text-brand-primary mb-3">{opt.icon}</div>
                    <h3 className="font-bold text-brand-primary text-sm mb-1">{opt.label}</h3>
                    <p className="text-xs text-neutral-500">{opt.desc}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-end">
                <button onClick={() => setStep(2)} className="bg-brand-primary text-white font-bold px-7 py-3 rounded-xl hover:bg-brand-secondary hover:text-brand-dark transition-all flex items-center gap-2 text-sm">
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              {hasPreselection && (
                <div className="bg-brand-accent border border-brand-primary/10 rounded-xl p-4 mb-8 flex items-center gap-4">
                  <div className="text-brand-primary">
                    {serviceType === 'car' ? <Car size={24} /> : serviceType === 'driver' ? <UserCheck size={24} /> : <Map size={24} />}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Selected {serviceType === 'car' ? 'Car' : serviceType === 'driver' ? 'Driver' : 'Package'}</p>
                    <p className="text-sm font-extrabold text-brand-primary">{getSelectedItemName()}</p>
                  </div>
                </div>
              )}

              <h2 className="text-xl font-extrabold text-brand-primary mb-6">Booking Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {!hasPreselection && serviceType === 'car' && (
                  <div className="md:col-span-2">
                    <label className={labelClass}>Select Car Model</label>
                    <select value={selectedCarId} onChange={(e) => setSelectedCarId(e.target.value)} className={inputClass}>
                      {cars.map((c) => <option key={c.id} value={c.id}>{c.name} — ₹{c.pricePerKm}/km</option>)}
                    </select>
                  </div>
                )}
                {!hasPreselection && serviceType === 'driver' && (
                  <div className="md:col-span-2">
                    <label className={labelClass}>Select Driver</label>
                    <select value={selectedDriverId} onChange={(e) => setSelectedDriverId(e.target.value)} className={inputClass}>
                      {drivers.map((d) => <option key={d.id} value={d.id}>{d.name} ({d.rating}★)</option>)}
                    </select>
                  </div>
                )}
                {!hasPreselection && serviceType === 'package' && (
                  <div className="md:col-span-2">
                    <label className={labelClass}>Select Package</label>
                    <select value={selectedPackageId} onChange={(e) => setSelectedPackageId(e.target.value)} className={inputClass}>
                      {packages.map((p) => <option key={p.id} value={p.id}>{p.title} — ₹{p.price.toLocaleString()}</option>)}
                    </select>
                  </div>
                )}

                <div><label className={labelClass}>Full Name</label><input type="text" placeholder="Your full name" value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Phone Number</label><input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Email Address</label><input type="email" placeholder="you@email.com" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Pickup District</label><select value={formData.pickupDistrict} onChange={(e) => handleChange('pickupDistrict', e.target.value)} className={inputClass}>{tamilNaduDistricts.map((d) => <option key={d}>{d}</option>)}</select></div>
                <div><label className={labelClass}>Pickup Address</label><input type="text" placeholder="e.g. Chennai Airport" value={formData.pickupAddress} onChange={(e) => handleChange('pickupAddress', e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Drop Address</label><input type="text" placeholder="e.g. Hotel Grand, Coimbatore" value={formData.dropAddress} onChange={(e) => handleChange('dropAddress', e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Start Date</label><input type="date" value={formData.startDate} onChange={(e) => handleChange('startDate', e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>End Date</label><input type="date" value={formData.endDate} onChange={(e) => handleChange('endDate', e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Passengers</label><input type="number" min="1" value={formData.passengers} onChange={(e) => handleChange('passengers', e.target.value)} className={inputClass} /></div>
                <div className="md:col-span-2"><label className={labelClass}>Special Requests</label><textarea rows="3" placeholder="Child seats, route preferences..." value={formData.specialRequests} onChange={(e) => handleChange('specialRequests', e.target.value)} className={inputClass + ' resize-none'} /></div>
              </div>

              <div className="flex justify-between">
                {!hasPreselection && (
                  <button onClick={() => setStep(1)} className="bg-neutral-100 text-neutral-600 font-bold px-7 py-3 rounded-xl hover:bg-neutral-200 transition-all flex items-center gap-2 text-sm">
                    <ArrowLeft size={16} /> Back
                  </button>
                )}
                <button onClick={handleBookingSubmit} disabled={isSubmitting} className="bg-brand-primary text-white font-bold px-7 py-3 rounded-xl hover:bg-brand-secondary hover:text-brand-dark transition-all flex items-center gap-2 ml-auto text-sm">
                  {isSubmitting ? 'Submitting...' : 'Review Booking'} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-2xl font-extrabold text-brand-primary mb-3">Request Received!</h2>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-md mx-auto mb-8">
                Thank you for choosing Sri Lakshmi Travels. Our team will contact you shortly to confirm availability and finalize payment.
              </p>

              <div className="bg-brand-accent p-6 rounded-xl max-w-md mx-auto text-left mb-8 border border-neutral-100 space-y-3">
                <div className="flex justify-between border-b border-neutral-100 pb-3 text-sm font-semibold"><span className="text-neutral-400">Booking Ref:</span><span className="text-brand-primary">#{`SLT-${Math.floor(100000 + Math.random() * 900000)}`}</span></div>
                <div className="flex justify-between border-b border-neutral-100 pb-3 text-sm font-semibold"><span className="text-neutral-400">Service:</span><span className="text-brand-dark">{serviceType === 'car' ? 'Rental Car' : serviceType === 'driver' ? 'Hire Driver' : 'Tour Package'}</span></div>
                <div className="flex justify-between border-b border-neutral-100 pb-3 text-sm font-semibold"><span className="text-neutral-400">Selection:</span><span className="text-brand-dark">{getSelectedItemName()}</span></div>
                {formData.fullName && <div className="flex justify-between border-b border-neutral-100 pb-3 text-sm font-semibold"><span className="text-neutral-400">Name:</span><span className="text-brand-dark">{formData.fullName}</span></div>}
                <div className="flex justify-between text-sm font-semibold"><span className="text-neutral-400">Status:</span><span className="text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">Pending Review</span></div>
              </div>

              <button onClick={() => setStep(hasPreselection ? 2 : 1)} className="bg-brand-secondary text-brand-dark font-bold px-7 py-3 rounded-xl hover:brightness-110 transition-all text-sm">
                Book Another Service
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
