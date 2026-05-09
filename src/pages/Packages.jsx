import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import SafeImage from '../components/common/SafeImage';
import { getTourImage } from '../constants/tourImages';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // scroll logic if needed
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal-up');
          entry.target.style.opacity = '1';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });

    const fetchTours = async () => {
      try {
        const res = await api.get(`/tours?_t=${Date.now()}`);
        console.log('Fetched tours:', res.data);
        setPackages(res.data.tours || []);
        // Re-run observer after data is loaded and DOM updated
        setTimeout(() => {
          document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
          });
        }, 100);
      } catch (err) {
        console.error('Failed to fetch tours:', err);
        // Force an error message to display if there's a network issue
        alert('API Error: ' + err.message); 
      } finally {
        setLoading(false);
      }
    };
    fetchTours();

    return () => observer.disconnect();
  }, []);

  if (loading) {
    return (
      <div className="bg-brand-accent min-h-screen flex items-center justify-center">
        <div className="text-brand-primary font-bold animate-pulse text-xl">Loading Handpicked Packages...</div>
      </div>
    );
  }

  return (
    <div className="bg-brand-accent min-h-screen">
      {/* Hero Banner */}
      <section className="bg-brand-primary pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-secondary bg-brand-secondary/10 px-4 py-1.5 rounded-full border border-brand-secondary/30 mb-4">
            Handpicked Itineraries
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">
            Explore With <span className="text-brand-secondary italic">Purpose.</span>
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto leading-relaxed">
            Expertly curated tours across Tamil Nadu and Kerala. We have planned the perfect routes so you can focus entirely on making memories.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {packages.length === 0 ? (
            <div className="text-center py-20 text-brand-primary/60 text-xl font-bold">
              Stay tuned! New curated packages are coming soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {packages.map((pkg, idx) => (
                <div
                  key={pkg._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-[0_20px_50px_rgba(10,46,26,0.12)] hover:-translate-y-2 transition-all duration-500 group flex flex-col animate-on-scroll"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <SafeImage
                      src={pkg.imageUrl || pkg.image || getTourImage(pkg.title) || getTourImage(pkg.destination) || getTourImage(pkg.states)}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute top-4 left-4 bg-brand-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-3.5 py-1.5 rounded-lg shadow-lg uppercase tracking-widest z-20 border border-white/10">
                      {pkg.duration}
                    </div>
                    <div className="absolute top-4 right-4 bg-brand-secondary text-brand-dark text-[10px] font-bold px-3.5 py-1.5 rounded-lg shadow-lg uppercase tracking-widest z-20 border border-brand-secondary/30">
                      {pkg.states}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow relative">
                    <div className="absolute top-0 right-8 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-secondary group-hover:scale-110 transition-transform duration-500 border border-neutral-50 z-20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                    </div>

                    <h2 className="text-2xl font-extrabold text-brand-primary mb-3 group-hover:text-brand-secondary transition-colors duration-300 animate-on-scroll" style={{ animationDelay: '100ms' }}>{pkg.title}</h2>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-6 flex-grow animate-on-scroll" style={{ animationDelay: '200ms' }}>{pkg.description}</p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-8 animate-on-scroll" style={{ animationDelay: '300ms' }}>
                      {(pkg.highlights || []).map((hlt) => (
                        <span key={hlt} className="bg-brand-accent text-brand-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-brand-primary/5 hover:border-brand-secondary/30 hover:bg-brand-secondary/10 transition-colors cursor-default">
                          {hlt}
                        </span>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-neutral-100 pt-6 mt-auto">
                      <div className="text-center sm:text-left">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">
                          Starting Price
                        </span>
                        <span className="text-3xl font-extrabold text-brand-primary">
                          ₹{pkg.price?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-3 w-full sm:w-auto">
                        <Link
                          to={`/tour/${pkg._id}`}
                          className="flex-1 sm:flex-none text-center bg-brand-accent text-brand-primary px-6 py-3.5 rounded-xl font-bold text-sm shadow-md hover:filter hover:brightness-95 transition-all border border-brand-primary/5"
                        >
                          Details
                        </Link>
                        <Link
                          to={`/book/package/${pkg._id}`}
                          className="flex-1 sm:flex-none text-center bg-brand-secondary text-brand-dark px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:brightness-110 hover:-translate-y-1 hover:shadow-brand-secondary/20 transition-all active:scale-95"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
