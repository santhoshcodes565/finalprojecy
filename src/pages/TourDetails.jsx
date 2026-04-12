import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { packages } from '../data/mockData';
import SafeImage from '../components/common/SafeImage';

export default function TourDetails() {
  const { id } = useParams();
  const pkg = packages.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-accent">
        <h1 className="text-3xl font-bold text-red-500">Package not found.</h1>
      </div>
    );
  }

  return (
    <div className="bg-brand-accent pb-24">
      {/* Hero Header */}
      <div className="relative h-[65vh] w-full flex items-end pb-16 justify-center">
        <SafeImage src={pkg.image} alt={pkg.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
        <div className="relative z-10 max-w-7xl w-full px-6 sm:px-8 flex flex-col items-center text-center">
          <span className="bg-brand-secondary text-brand-dark px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-5">
            {pkg.duration}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-5">
            {pkg.title}
          </h1>
          <p className="text-white/80 max-w-2xl text-sm md:text-base leading-relaxed">
            {pkg.description}
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-brand-primary text-white py-6 relative z-20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 border-r border-white/20 last:border-0">
              <p className="text-xs font-medium text-white/50 uppercase tracking-widest mb-1">Destinations</p>
              <p className="text-lg font-bold">{pkg.itinerary.length} Places</p>
            </div>
            <div className="p-4 border-r border-white/20 last:border-0">
              <p className="text-xs font-medium text-white/50 uppercase tracking-widest mb-1">Region</p>
              <p className="text-lg font-bold">{pkg.states}</p>
            </div>
            <div className="p-4 border-r border-white/20 last:border-0">
              <p className="text-xs font-medium text-white/50 uppercase tracking-widest mb-1">Starting Price</p>
              <p className="text-lg font-bold">₹{pkg.price.toLocaleString()}/pp</p>
            </div>
            <div className="p-4 flex items-center justify-center">
              <Link to={`/booking?type=package&packageId=${pkg.id}`} className="bg-brand-secondary text-brand-dark w-full py-3 rounded-xl font-bold text-sm shadow-lg hover:brightness-110 transition-all text-center block">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-brand-primary">Trip Breakdown</h2>
          <p className="text-neutral-500 mt-2 text-sm">A detailed account of your majestic journey</p>
        </div>

        <div className="space-y-8">
          {pkg.itinerary.map((day) => (
            <div key={day.day} className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-2xl border border-neutral-100 shadow-md hover:shadow-lg transition-all">
              <div className="md:w-1/3 flex-shrink-0 relative overflow-hidden rounded-xl aspect-video md:aspect-auto">
                <SafeImage src={day.image} alt={day.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-bold uppercase text-brand-primary tracking-widest">
                  {day.dateString}
                </div>
              </div>
              <div className="md:w-2/3 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-brand-secondary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 bg-brand-accent px-3 py-1 rounded-full">
                    {day.location}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-brand-primary mb-2">{day.title}</h3>
                <p className="text-neutral-500 leading-relaxed text-sm">{day.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
