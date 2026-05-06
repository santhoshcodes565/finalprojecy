import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Users, ShieldCheck, ArrowRight, Share2, Heart } from 'lucide-react';
import api from '../api/axios';
import { packages as mockPackages } from '../data/mockData';
import SafeImage from '../components/common/SafeImage';
import { getTourImage, slugify } from '../constants/tourImages';
import SimpleItinerary from '../components/tours/SimpleItinerary';

export default function TourDetails() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchTour = async () => {
      const localPkg = mockPackages.find((p) => p.id === id);
      if (localPkg) {
        setPkg(localPkg);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get(`/tours/${id}`);
        if (res.data && res.data.tour) setPkg(res.data.tour);
      } catch (err) {
        console.error('Failed to load package details', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEF9EE]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-brand-secondary border-t-brand-primary rounded-full animate-spin"></div>
          <p className="text-brand-primary font-display italic text-xl">Preparing your majestic journey...</p>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-accent">
        <h1 className="text-3xl font-bold text-red-500">Package not found.</h1>
      </div>
    );
  }

  return (
    <div className="bg-brand-accent min-h-screen font-sans">
      {/* Cinematic Hero Header */}
      <div className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <SafeImage 
          src={pkg.bannerImage || pkg.imageUrl || pkg.image || getTourImage(slugify(pkg.title || '')) || getTourImage(slugify(pkg.states || ''))} 
          alt={pkg.title} 
          className="absolute inset-0 w-full h-full object-cover scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/20 to-brand-accent" />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 max-w-7xl w-full px-6 sm:px-8 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 bg-brand-secondary/90 text-brand-dark px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-2xl animate-fade-in">
            <Clock className="w-4 h-4" />
            {pkg.duration}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 font-display italic shadow-text">
            {pkg.title}
          </h1>
          <div className="flex items-center gap-6 text-white/90 text-sm md:text-lg font-medium mb-12">
            <div className="flex items-center gap-2">
              <MapPin className="text-brand-secondary" />
              <span>{pkg.states || 'Incredible India'}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
            <div className="flex items-center gap-2">
              <Users className="text-brand-secondary" />
              <span>{pkg.seatsAvailable || 50} Seats Available</span>
            </div>
          </div>
          
          <div className="flex gap-4">
             <button className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full text-white hover:bg-white/20 transition-all">
               <Share2 className="w-5 h-5" />
             </button>
             <button className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full text-white hover:bg-white/20 transition-all">
               <Heart className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-24 relative z-30 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Overview Card */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-neutral-100">
              <h2 className="text-3xl font-display italic font-black text-brand-primary mb-6 flex items-center gap-4">
                The Experience
                <div className="flex-1 h-px bg-neutral-100" />
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed mb-10">
                {pkg.description || 'Embark on a specially curated journey through India\'s most breathtaking destinations. Our premium packages are designed to provide the perfect balance of luxury, culture, and adventure, ensuring every moment of your trip is truly majestic.'}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-neutral-50">
                {pkg.highlights?.slice(0,4).map((h, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Roadmap */}
            <div>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-display italic font-black text-brand-primary">Day-by-Day Journey</h2>
                <span className="text-xs font-bold text-brand-secondary bg-brand-secondary/10 px-4 py-2 rounded-full uppercase tracking-widest">
                  {pkg.itinerary?.length || 0} Total Chapters
                </span>
              </div>
              
              {pkg.itinerary && pkg.itinerary.length > 0 ? (
                <SimpleItinerary itinerary={pkg.itinerary} />
              ) : (
                <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-neutral-200">
                  <p className="text-neutral-400 font-medium italic">Our explorers are currently mapping this route for you...</p>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <div className="bg-brand-primary rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                {/* Decorative background circle */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-secondary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                
                <p className="text-brand-secondary font-black uppercase text-xs tracking-[0.3em] mb-4">Majestic Private Tour</p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-black font-serif italic text-white leading-none">
                    ₹{pkg.price ? pkg.price.toLocaleString() : 'N/A'}
                  </span>
                  <span className="text-brand-secondary font-bold text-sm">/ Per Journey</span>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center justify-between text-sm py-3 border-b border-white/10 text-white/70">
                    <span>GST (Included)</span>
                    <span className="text-white font-bold">5%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-3 border-b border-white/10 text-white/70">
                    <span>Flex Cancellation</span>
                    <span className="text-white font-bold">Free</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-3 text-white/70">
                    <span>Safety Standard</span>
                    <span className="text-white font-bold inline-flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-brand-secondary" /> Premium
                    </span>
                  </div>
                </div>

                <Link 
                  to={`/book/package/${pkg._id || pkg.id}`} 
                  className="w-full bg-brand-secondary text-brand-dark py-6 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gold-light transition-all shadow-xl active:scale-95"
                >
                  Reserve My Space <ArrowRight className="w-4 h-4" />
                </Link>
                
                <p className="text-center text-[10px] text-white/40 mt-6 uppercase tracking-widest font-bold">
                  Instant Confirmation • Secure Checkout
                </p>
              </div>

              {/* Support Card */}
              <div className="bg-white rounded-[2rem] p-8 border border-neutral-100 shadow-sm flex items-center gap-6 group hover:border-brand-secondary/30 transition-colors">
                <div className="w-16 h-16 rounded-2xl bg-brand-accent flex items-center justify-center text-brand-primary shrink-0 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-black text-brand-primary text-sm uppercase tracking-wider mb-1">Need Assistance?</h4>
                  <p className="text-neutral-500 text-xs">Our travel curators are 24/7 online for you.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
