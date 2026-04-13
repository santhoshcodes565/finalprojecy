import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Fuel, Settings, Snowflake } from 'lucide-react';
import api from '../api/axios';
import SafeImage from '../components/common/SafeImage';

export default function CarRental() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await api.get('/cars');
        setCars(res.data.cars || []);
      } catch (err) {
        console.error('Failed to fetch cars:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="bg-brand-accent min-h-screen flex items-center justify-center">
        <div className="text-brand-primary font-bold animate-pulse text-xl">Loading Premium Fleet...</div>
      </div>
    );
  }

  return (
    <div className="bg-brand-accent min-h-screen">
      {/* Hero Banner */}
      <section className="bg-brand-primary pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-secondary bg-brand-secondary/10 px-4 py-1.5 rounded-full border border-brand-secondary/30 mb-4">
            Premium Fleet
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">
            Travel India in <span className="text-brand-secondary italic">Absolute Comfort.</span>
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto leading-relaxed">
            From zippy city sedans to rugged mountain 4x4s, our 100% verified Indian fleet is meticulously maintained. Every vehicle is deep-cleaned before your journey begins.
          </p>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cars.length === 0 ? (
            <div className="text-center py-20 text-brand-primary/60 text-xl font-bold">
              Currently, there are no cars available in our fleet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <div
                  key={car._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  {/* Image */}
                  <div className="h-52 overflow-hidden relative">
                    <SafeImage
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-brand-dark text-brand-secondary text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-md">
                      {car.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-extrabold text-brand-primary mb-2">{car.name}</h2>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-5 flex-grow">{car.desc}</p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5 border-t border-b border-neutral-100 py-4 text-sm text-neutral-600">
                      <div className="flex items-center gap-2">
                        <Users size={15} className="text-brand-secondary" /> {car.seats} Seats
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel size={15} className="text-brand-secondary" /> {car.fuel?.split(' / ')[0] || car.fuel}
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings size={15} className="text-brand-secondary" /> {car.transmission?.split(' / ')[0] || car.transmission}
                      </div>
                      <div className="flex items-center gap-2">
                        <Snowflake size={15} className="text-brand-secondary" /> AC
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {car.features?.map((feat) => (
                        <span key={feat} className="bg-brand-accent text-brand-primary border border-brand-primary/10 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div className="flex justify-between items-end mt-auto">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest block">Tariff</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-extrabold text-brand-primary">₹{car.pricePerKm}</span>
                          <span className="text-xs font-semibold text-neutral-500">/km</span>
                        </div>
                      </div>
                      <Link
                        to={`/booking?type=car&carId=${car._id}`}
                        className="bg-brand-primary text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md hover:bg-brand-secondary hover:text-brand-dark transition-all"
                      >
                        Book Now
                      </Link>
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
