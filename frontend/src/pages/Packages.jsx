import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import SafeImage from '../components/common/SafeImage';
import { getTourImage } from '../constants/tourImages';
import RatingModal from '../components/RatingModal';
import ReviewsWidget from '../components/ReviewsWidget';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratingTarget, setRatingTarget] = useState(null);

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
        setError(null);
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
        setError(err.message || 'Failed to load packages. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchTours();

    return () => observer.disconnect();
  }, []);

  const retryFetch = () => {
    setLoading(true);
    setError(null);
    api.get(`/tours?_t=${Date.now()}`)
      .then(res => setPackages(res.data.tours || []))
      .catch(err => setError(err.message || 'Failed to load packages.'))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="bg-brand-accent min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-brand-primary font-bold text-lg">Loading Handpicked Packages...</p>
          <p className="text-neutral-500 text-sm mt-1">This may take a moment on first load.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-brand-accent min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-extrabold text-brand-primary mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Unable to Load Packages</h2>
          <p className="text-neutral-500 mb-6">{error}</p>
          <button
            onClick={retryFetch}
            className="bg-brand-primary text-white px-8 py-3 rounded-xl font-bold hover:brightness-110 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-accent min-h-screen">
      {/* Hero Video Banner */}
      <section className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: '600px' }}>
        {/* Full-cover video */}
        <video
          src="/videos/bannervideoforpackeages.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Cinematic gradient overlay — strong on left for text, subtle on right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(10,46,26,0.88) 0%, rgba(10,46,26,0.60) 40%, rgba(10,46,26,0.15) 70%, transparent 100%), linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)',
          }}
        />

        {/* Left-side text overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
            <div className="max-w-xl">
              {/* Badge */}
              <span
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border mb-6"
                style={{
                  color: '#D4A017',
                  borderColor: 'rgba(212,160,23,0.4)',
                  background: 'rgba(212,160,23,0.10)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <span style={{ color: '#D4A017' }}>✦</span> Handpicked Itineraries
              </span>

              {/* Headline */}
              <h1
                className="font-extrabold text-white leading-tight mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                }}
              >
                Explore India<br />
                <span style={{ color: '#D4A017', fontStyle: 'italic' }}>With Purpose.</span>
              </h1>

              {/* Divider */}
              <div
                className="mb-5"
                style={{ width: '64px', height: '3px', background: 'linear-gradient(to right, #D4A017, transparent)', borderRadius: '999px' }}
              />

              {/* Subtext */}
              <p
                className="text-white/80 leading-relaxed mb-8"
                style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', maxWidth: '440px', textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
              >
                Expertly curated tours across Tamil Nadu &amp; Kerala. Every route is planned so you can focus entirely on making memories.
              </p>

              {/* Highlight pills */}
              <div className="flex flex-wrap gap-3 mb-10">
                {['🏖️ Beach Escapes', '⛰️ Hill Stations', '🛕 Pilgrimage Tours', '🌿 Nature Retreats'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3.5 py-1.5 rounded-full text-white"
                    style={{
                      background: 'rgba(255,255,255,0.10)',
                      border: '1px solid rgba(255,255,255,0.22)',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Scroll-down hint */}
              <div className="flex items-center gap-3">
                <div
                  className="flex flex-col items-center gap-1 animate-bounce"
                  style={{ color: '#D4A017' }}
                >
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>Scroll to explore</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#D4A017" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
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
                          Customize & Book
                        </Link>
                        <button
                          onClick={() => setRatingTarget({ id: pkg._id, type: 'tour' })}
                          className="flex items-center justify-center bg-white border border-brand-primary/10 text-brand-primary px-4 py-3.5 rounded-xl font-bold text-sm shadow-md hover:bg-neutral-50 transition-all"
                          title="Rate this Package"
                        >
                          ⭐ Rate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <RatingModal
        isOpen={!!ratingTarget}
        onClose={() => setRatingTarget(null)}
        serviceId={ratingTarget?.id}
        serviceType={ratingTarget?.type}
      />

      <section className="py-16 bg-white border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-brand-primary" style={{ fontFamily: "'Playfair Display', serif" }}>Traveler Stories</h2>
            <p className="text-neutral-500 mt-2">See what our guests say about our curated packages</p>
          </div>
          <ReviewsWidget serviceId="all" serviceType="tour" />
        </div>
      </section>

      {/* Custom Package CTA Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border mb-6 text-brand-primary border-brand-primary/20 bg-brand-accent/50">
            <span>✨</span> Build Your Dream Trip
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-primary mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Can't find what you're looking for?
          </h2>
          
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Let our travel experts craft a completely personalized itinerary based on your exact requirements, budget, and travel style.
          </p>

          <Link
            to="/custom-package"
            className="inline-flex items-center gap-3 bg-brand-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:brightness-110 hover:-translate-y-1 hover:shadow-brand-primary/30 transition-all active:scale-95"
          >
            Create Custom Package
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
