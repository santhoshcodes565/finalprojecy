import { Link } from 'react-router-dom';
import { Star, Shield, MapPin } from 'lucide-react';
import { drivers } from '../data/mockData';
import SafeImage from '../components/common/SafeImage';

export default function HireDriver() {
  return (
    <div className="bg-brand-accent min-h-screen">
      {/* Hero Banner */}
      <section className="bg-brand-primary pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-secondary bg-brand-secondary/10 px-4 py-1.5 rounded-full border border-brand-secondary/30 mb-4">
            Meet the Experts
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">
            Your Safety is our <span className="text-brand-secondary italic">Priority.</span>
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto leading-relaxed">
            A great trip is made by a great driver. Our highly vetted, bilingual professionals know South Indian roads like the back of their hands.
          </p>
        </div>
      </section>

      {/* Drivers Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drivers.map((driver) => (
              <div
                key={driver.id}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
              >
                {/* Verified Badge */}
                <div className="absolute top-6 right-6 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  <Shield size={12} /> Verified
                </div>

                {/* Profile */}
                <div className="flex items-center gap-5 mb-6">
                  <SafeImage
                    src={driver.image}
                    alt={driver.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-brand-accent shadow-md group-hover:border-brand-secondary transition-colors"
                  />
                  <div>
                    <h2 className="text-xl font-extrabold text-brand-primary mb-1">{driver.name}</h2>
                    <div className="flex items-center gap-1.5">
                      <Star size={14} className="text-brand-secondary fill-brand-secondary" />
                      <span className="font-bold text-brand-dark text-sm">{driver.rating}</span>
                      <span className="text-neutral-400 text-xs">({driver.trips} Trips)</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-neutral-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  "{driver.bio}"
                </p>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Experience</span>
                    <span className="font-bold text-brand-primary text-sm">{driver.experience} Years</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Fee/Day</span>
                    <span className="font-bold text-brand-primary text-sm">₹{driver.pricePerDay}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Languages</span>
                    <div className="flex gap-1.5">
                      {driver.languages.map((lang) => (
                        <span key={lang} className="bg-brand-accent px-2.5 py-1 rounded text-xs font-bold text-brand-primary">
                          {lang.substring(0, 2).toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to={`/booking?type=driver&driverId=${driver.id}`}
                  className="block w-full text-center border-2 border-brand-primary text-brand-primary font-bold py-3.5 rounded-xl hover:bg-brand-primary hover:text-white transition-all text-sm"
                >
                  Hire {driver.name.split(' ')[0]}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
