import { useParams, Link, useNavigate } from 'react-router-dom';
import { Users, Fuel, Settings, Snowflake, Star, ChevronLeft } from 'lucide-react';
import { cars } from '../data/mockData';
import SafeImage from '../components/common/SafeImage';

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-accent">
        <h1 className="text-3xl font-bold text-red-500">Car not found.</h1>
      </div>
    );
  }

  return (
    <div className="bg-brand-accent min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="bg-brand-primary pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <button onClick={() => navigate(-1)} className="text-white/70 hover:text-white flex items-center gap-1 text-sm font-medium">
            <ChevronLeft size={16} /> Back to Fleet
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 flex flex-col lg:flex-row gap-8">
        {/* Left: Image + Info */}
        <div className="w-full lg:w-[60%] space-y-6">
          {/* Main Image */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md">
            <div className="h-[360px] overflow-hidden">
              <SafeImage src={car.image} alt={car.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-extrabold text-brand-primary mb-3">Overview</h2>
            <p className="text-neutral-500 text-sm leading-relaxed">{car.desc}</p>

            {/* Specs Table */}
            <div className="mt-6 rounded-xl border border-neutral-100 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-neutral-50 bg-brand-accent/50"><th className="py-3 px-4 text-left text-neutral-700 font-semibold">Seats</th><td className="py-3 px-4 text-neutral-500">{car.seats} Passengers</td></tr>
                  <tr className="border-b border-neutral-50"><th className="py-3 px-4 text-left text-neutral-700 font-semibold">Fuel</th><td className="py-3 px-4 text-neutral-500">{car.fuel}</td></tr>
                  <tr className="border-b border-neutral-50 bg-brand-accent/50"><th className="py-3 px-4 text-left text-neutral-700 font-semibold">Transmission</th><td className="py-3 px-4 text-neutral-500">{car.transmission}</td></tr>
                  <tr><th className="py-3 px-4 text-left text-neutral-700 font-semibold">Min. KM/Day</th><td className="py-3 px-4 text-neutral-500">{car.minKmPerDay} km</td></tr>
                </tbody>
              </table>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mt-6">
              {['❄️ AC', '📡 GPS Navigation', '🎵 Bluetooth', '💧 Water Bottles', '🔌 USB Chargers', '🛡️ Fully Insured'].map((a) => (
                <span key={a} className="bg-brand-accent border border-neutral-100 px-3.5 py-2 rounded-lg text-sm font-semibold text-brand-dark">{a}</span>
              ))}
            </div>
          </div>

          {/* Review */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-extrabold text-brand-primary mb-4">Customer Reviews</h3>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-secondary flex items-center justify-center text-brand-dark font-bold text-sm">P</div>
              <div>
                <p className="font-bold text-sm text-brand-dark">Prakash M.</p>
                <div className="flex gap-0.5 my-1">{[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-brand-secondary fill-brand-secondary" />)}</div>
                <p className="text-neutral-500 text-sm">"Excellent condition car and very courteous driver. Made our trip to Ooty stress-free."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking Sidebar */}
        <div className="w-full lg:w-[40%]">
          <div className="bg-white rounded-2xl p-7 shadow-xl sticky top-24 border-t-4 border-brand-secondary">
            <h2 className="text-2xl font-extrabold text-brand-primary mb-1">{car.name}</h2>
            <div className="flex items-center gap-2 mb-6">
              <Star size={14} className="text-brand-secondary fill-brand-secondary" />
              <span className="text-sm font-bold text-brand-dark">5.0</span>
              <span className="text-xs text-neutral-400">(320 Reviews)</span>
            </div>

            <div className="flex items-baseline mb-6 border-b border-neutral-100 pb-6">
              <span className="text-4xl font-extrabold text-brand-primary">₹{car.pricePerKm}</span>
              <span className="text-neutral-500 ml-1 text-sm">/km</span>
              <div className="ml-auto text-right">
                <span className="block text-xs text-neutral-400">Min charge:</span>
                <span className="block text-sm font-bold text-brand-dark">₹{(car.pricePerKm * car.minKmPerDay).toLocaleString()} ({car.minKmPerDay}km)</span>
              </div>
            </div>

            <div className="flex bg-brand-accent rounded-xl p-1 mb-6">
              {['One Way', 'Round Trip', 'Multi-Day'].map((t, i) => (
                <button key={t} className={`flex-1 text-center py-2.5 text-xs font-bold rounded-lg transition-all ${i === 1 ? 'bg-white shadow text-brand-primary' : 'text-neutral-500 hover:text-brand-primary'}`}>{t}</button>
              ))}
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Pickup City" className="w-full px-4 py-3 bg-brand-accent border border-neutral-100 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
                <input type="text" placeholder="Drop City" className="w-full px-4 py-3 bg-brand-accent border border-neutral-100 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="datetime-local" className="w-full px-4 py-3 bg-brand-accent border border-neutral-100 rounded-xl text-sm text-neutral-500 focus:ring-2 focus:ring-brand-primary outline-none" />
                <input type="date" className="w-full px-4 py-3 bg-brand-accent border border-neutral-100 rounded-xl text-sm text-neutral-500 focus:ring-2 focus:ring-brand-primary outline-none" />
              </div>
            </div>

            <div className="bg-brand-accent p-5 rounded-xl border border-brand-primary/10 text-sm mb-6 space-y-2.5">
              <div className="flex justify-between"><span className="text-neutral-500">Est. Distance</span><span className="font-semibold text-brand-dark">{car.minKmPerDay} km</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Base Price</span><span className="font-semibold text-brand-dark">₹{(car.pricePerKm * car.minKmPerDay).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Driver Bata</span><span className="font-semibold text-brand-dark">₹{car.driverBata}/day</span></div>
              <div className="flex justify-between text-xs text-neutral-400"><span>Toll & Parking</span><span>Actuals</span></div>
              <div className="w-full h-px bg-brand-primary/10 my-2" />
              <div className="flex justify-between font-extrabold text-lg text-brand-primary"><span>Estimated Total</span><span>₹{(car.pricePerKm * car.minKmPerDay + car.driverBata).toLocaleString()}</span></div>
            </div>

            <button onClick={() => navigate('/booking?type=car&carId=' + car.id)} className="w-full bg-brand-primary text-white font-bold py-3.5 rounded-xl hover:brightness-110 transition-all mb-3 text-sm">
              Proceed to Book
            </button>
            <a href="tel:+919876543210" className="block w-full text-center border-2 border-neutral-200 text-neutral-600 font-semibold py-3.5 rounded-xl hover:border-brand-primary hover:text-brand-primary transition-all text-sm">
              📞 Call for Custom Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
