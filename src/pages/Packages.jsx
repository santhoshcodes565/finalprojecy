import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import SafeImage from '../components/common/SafeImage';
import { getTourImage } from '../constants/tourImages';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await api.get('/tours');
        setPackages(res.data.tours || []);
      } catch (err) {
        console.error('Failed to fetch tours:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
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
              {packages.map((pkg) => (
                <div
                  key={pkg._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <SafeImage
                      src={pkg.imageUrl || pkg.image || getTourImage(pkg.title) || getTourImage(pkg.destination) || getTourImage(pkg.states)}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-brand-primary text-white text-[10px] font-bold px-3.5 py-1.5 rounded-lg shadow-lg uppercase tracking-widest">
                      {pkg.duration}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brand-dark text-[10px] font-bold px-3.5 py-1.5 rounded-lg shadow-lg uppercase tracking-widest">
                      {pkg.states}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h2 className="text-2xl font-extrabold text-brand-primary mb-3">{pkg.title}</h2>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-6 flex-grow">{pkg.description}</p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(pkg.highlights || []).map((hlt) => (
                        <span key={hlt} className="bg-brand-accent text-brand-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
                          {hlt}
                        </span>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div className="flex justify-between items-end border-t border-neutral-100 pt-6 mt-auto">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">
                          Starting Price
                        </span>
                        <span className="text-3xl font-extrabold text-brand-primary">
                          ₹{pkg.price?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <Link
                          to={`/tour/${pkg._id}`}
                          className="bg-brand-accent text-brand-primary px-5 py-3.5 rounded-xl font-bold text-sm shadow-md hover:filter hover:brightness-95 transition-all"
                        >
                          View Details
                        </Link>
                        <Link
                          to={`/book/package/${pkg._id}`}
                          className="bg-brand-secondary text-brand-dark px-5 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:brightness-110 hover:-translate-y-0.5 transition-all"
                        >
                          Book Package
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
