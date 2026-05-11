import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { packages as mockPackages } from '../data/mockData';

// New Components
import PackageHero from '../components/tours/PackageHero';
import DaySelector from '../components/tours/DaySelector';
import RibbonItinerary from '../components/tours/RibbonItinerary';
import PricingTable from '../components/tours/PricingTable';
import SidebarBookingForm from '../components/tours/SidebarBookingForm';
import ReviewsWidget from '../components/ReviewsWidget';

export default function TourDetails() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(0);

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

  const handleDayClick = (index) => {
    setActiveDay(index);
    const element = document.getElementById(`day-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-accent">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-brand-secondary border-t-brand-primary rounded-full animate-spin"></div>
          <p className="text-brand-primary font-display italic text-xl font-bold">Curating your luxury experience...</p>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-accent">
        <div className="text-center">
           <h1 className="text-4xl font-display italic font-black text-brand-primary mb-4">Package not found</h1>
           <p className="text-neutral-500 font-medium">The journey you're looking for seems to have moved.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-accent min-h-screen">
      {/* 1. Package Hero Section */}
      <PackageHero pkg={pkg} />

      {/* 2. Horizontal Day Selector (Sticky) */}
      <DaySelector 
        itinerary={pkg.itinerary} 
        activeDay={activeDay} 
        onDayClick={handleDayClick} 
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* 3. Main Content Column (Itinerary + Pricing) */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Overview Section */}
            <section className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-neutral-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent rounded-full -mr-32 -mt-32 opacity-50" />
               <h2 className="text-4xl font-display italic font-black text-brand-primary mb-8 relative z-10">Tour Overview</h2>
               <p className="text-neutral-600 text-xl leading-relaxed font-medium relative z-10">
                 {pkg.description || "Experience the perfect blend of luxury and tradition with our handpicked tour packages."}
               </p>
               
               <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-neutral-50 relative z-10">
                 {pkg.highlights?.map((highlight, idx) => (
                   <div key={idx} className="flex items-center gap-4">
                     <div className="w-2 h-2 rounded-full bg-brand-secondary" />
                     <span className="text-xs font-black uppercase tracking-widest text-brand-primary/70">{highlight}</span>
                   </div>
                 ))}
               </div>
            </section>

            {/* Itinerary Section */}
            <section id="itinerary">
              <RibbonItinerary itinerary={pkg.itinerary} />
            </section>

            {/* Pricing Section */}
            <section id="pricing">
              <h2 className="text-4xl font-display italic font-black text-brand-primary mb-10">Investment & Plans</h2>
              <PricingTable price={pkg.price} />
            </section>

            {/* Reviews Section */}
            <section id="reviews">
              <ReviewsWidget serviceId={pkg._id || pkg.id} serviceType="tour" />
            </section>

          </div>

          {/* 4. Sidebar Column (Booking Form + Info) */}
          <div className="lg:col-span-4">
            <div className="space-y-8">
              <SidebarBookingForm />
              
              {/* Trust Card */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-neutral-100 shadow-sm">
                <h4 className="text-brand-primary font-black uppercase text-xs tracking-widest mb-4">Why Choose Us?</h4>
                <ul className="space-y-4">
                  {[
                    "No Hidden Costs",
                    "24/7 Ground Support",
                    "Premium Sanitized Cabs",
                    "Local Expert Guides"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-neutral-500 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
