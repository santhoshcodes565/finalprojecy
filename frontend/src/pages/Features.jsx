import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle, ShieldCheck, Clock, CreditCard, Headphones, Star, Wifi, Award } from 'lucide-react';

export default function Features() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.style.opacity = '1';
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      el.style.opacity = '0';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-brand-accent)] font-sans overflow-hidden">
      {/* SECTION 1 — PAGE HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/90 to-[var(--color-brand-primary)]/60 z-10"></div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg"
            alt="Features Hero"
            className="w-full h-full object-cover animate-ken-burns"
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-16 animate-on-scroll">
          <p className="text-[var(--color-brand-secondary)] mb-4 text-sm font-medium tracking-wider uppercase">
            <Link to="/" className="hover:text-white transition-colors">Home</Link> / Features
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-6">Why Choose Us</h1>
          <div className="w-24 h-0.5 bg-[var(--color-brand-secondary)] mx-auto mb-6"></div>
          <p className="text-[var(--color-brand-accent)] text-lg md:text-xl max-w-2xl mx-auto">
            Every journey with Sri Lakshmi Travels is crafted for your comfort, safety, and peace of mind.
          </p>
        </div>
      </section>

      {/* SECTION 2 — MAIN FEATURES GRID */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="font-display text-4xl text-[var(--color-brand-primary)] mb-4 inline-block relative">
              Our Premium Features
              <span className="absolute -bottom-2 left-1/4 right-1/4 h-0.5 bg-[var(--color-brand-secondary)]"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl shadow-lg border-b-4 border-[var(--color-brand-secondary)] p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 animate-on-scroll" style={{ animationDelay: '100ms' }}>
              <ShieldCheck className="w-12 h-12 text-[var(--color-brand-secondary)] mb-6" />
              <h3 className="font-display text-xl text-[var(--color-brand-primary)] font-bold mb-4">Verified & Licensed Drivers</h3>
              <p className="text-gray-600 leading-relaxed">
                All our drivers undergo thorough background checks, license verification, and professional training. Your safety is our top priority on every trip.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl shadow-lg border-b-4 border-[var(--color-brand-secondary)] p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 animate-on-scroll" style={{ animationDelay: '200ms' }}>
              <Clock className="w-12 h-12 text-[var(--color-brand-secondary)] mb-6" />
              <h3 className="font-display text-xl text-[var(--color-brand-primary)] font-bold mb-4">On-Time Guarantee</h3>
              <p className="text-gray-600 leading-relaxed">
                We respect your time. Our drivers arrive 15 minutes before pickup and follow optimized routes to ensure you reach on time, every time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl shadow-lg border-b-4 border-[var(--color-brand-secondary)] p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 animate-on-scroll" style={{ animationDelay: '300ms' }}>
              <CreditCard className="w-12 h-12 text-[var(--color-brand-secondary)] mb-6" />
              <h3 className="font-display text-xl text-[var(--color-brand-primary)] font-bold mb-4">Transparent Pricing</h3>
              <p className="text-gray-600 leading-relaxed">
                No hidden charges, no surprise fees. What you see is what you pay. Get detailed fare breakdowns before confirming your booking.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl shadow-lg border-b-4 border-[var(--color-brand-secondary)] p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 animate-on-scroll" style={{ animationDelay: '400ms' }}>
              <Headphones className="w-12 h-12 text-[var(--color-brand-secondary)] mb-6" />
              <h3 className="font-display text-xl text-[var(--color-brand-primary)] font-bold mb-4">24/7 Customer Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our support team is available round the clock via phone, WhatsApp, and email. We're always here when you need us.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-2xl shadow-lg border-b-4 border-[var(--color-brand-secondary)] p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 animate-on-scroll" style={{ animationDelay: '500ms' }}>
              <MapPin className="w-12 h-12 text-[var(--color-brand-secondary)] mb-6" />
              <h3 className="font-display text-xl text-[var(--color-brand-primary)] font-bold mb-4">Real-Time GPS Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Track your vehicle live during the journey. Share your trip with family for added peace of mind on every route.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-2xl shadow-lg border-b-4 border-[var(--color-brand-secondary)] p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 animate-on-scroll" style={{ animationDelay: '600ms' }}>
              <Star className="w-12 h-12 text-[var(--color-brand-secondary)] mb-6" />
              <h3 className="font-display text-xl text-[var(--color-brand-primary)] font-bold mb-4">Premium Vehicle Fleet</h3>
              <p className="text-gray-600 leading-relaxed">
                From budget sedans to luxury cars — all vehicles are less than 3 years old, fully serviced, and sanitized before every trip.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="bg-white rounded-2xl shadow-lg border-b-4 border-[var(--color-brand-secondary)] p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 animate-on-scroll" style={{ animationDelay: '700ms' }}>
              <Wifi className="w-12 h-12 text-[var(--color-brand-secondary)] mb-6" />
              <h3 className="font-display text-xl text-[var(--color-brand-primary)] font-bold mb-4">In-Car Amenities</h3>
              <p className="text-gray-600 leading-relaxed">
                Enjoy complimentary WiFi, charging ports, bottled water, and music system in all our vehicles for a comfortable journey.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="bg-white rounded-2xl shadow-lg border-b-4 border-[var(--color-brand-secondary)] p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 animate-on-scroll" style={{ animationDelay: '800ms' }}>
              <Award className="w-12 h-12 text-[var(--color-brand-secondary)] mb-6" />
              <h3 className="font-display text-xl text-[var(--color-brand-primary)] font-bold mb-4">30 Years of Trust</h3>
              <p className="text-gray-600 leading-relaxed">
                Established in 1995, Sri Lakshmi Travels has been the preferred travel partner for over 10,000 families across Tamil Nadu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS */}
      <section className="py-20 bg-[var(--color-brand-primary)] text-white px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="font-display text-4xl text-center mb-16 animate-on-scroll">Book in 3 Simple Steps</h2>
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 relative animate-on-scroll">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] border-t-2 border-dashed border-[var(--color-brand-secondary)]/50 -z-10"></div>
            
            {/* Step 1 */}
            <div className="flex-1 text-center group">
              <div className="w-24 h-24 mx-auto bg-[var(--color-brand-secondary)] rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(212,160,23,0.3)] group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display mb-4 text-[var(--color-brand-secondary)]">Choose Your Vehicle</h3>
              <p className="text-[var(--color-brand-accent)]/80 px-4">Browse our fleet and pick the perfect car for your trip — sedan, SUV, or tempo traveller.</p>
            </div>

            {/* Step 2 */}
            <div className="flex-1 text-center group">
              <div className="w-24 h-24 mx-auto bg-[var(--color-brand-secondary)] rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(212,160,23,0.3)] group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display mb-4 text-[var(--color-brand-secondary)]">Enter Trip Details</h3>
              <p className="text-[var(--color-brand-accent)]/80 px-4">Enter pickup location, destination, date, and number of passengers. Get instant price estimate.</p>
            </div>

            {/* Step 3 */}
            <div className="flex-1 text-center group">
              <div className="w-24 h-24 mx-auto bg-[var(--color-brand-secondary)] rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(212,160,23,0.3)] group-hover:scale-110 transition-transform">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-display mb-4 text-[var(--color-brand-secondary)]">Confirm & Relax</h3>
              <p className="text-[var(--color-brand-accent)]/80 px-4">Confirm your booking, receive driver details on WhatsApp, and enjoy your journey stress-free.</p>
            </div>
          </div>

          <div className="text-center mt-16 animate-on-scroll">
            <Link to="/" className="inline-block bg-[var(--color-brand-secondary)] text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-[0_4px_15px_rgba(212,160,23,0.3)] hover:bg-[#F59E0B] hover:-translate-y-1 transition-all">
              Book Your First Ride &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4 — COMPARISON TABLE */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto animate-on-scroll">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl text-[var(--color-brand-primary)] mb-4">Compare Our Vehicles</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-200">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[var(--color-brand-primary)] text-white">
                  <th className="p-5 font-semibold font-display text-lg">Feature</th>
                  <th className="p-5 font-semibold font-display text-lg text-center">Swift Dzire</th>
                  <th className="p-5 font-semibold font-display text-lg text-center bg-[var(--color-brand-secondary)]/20 relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-brand-secondary)] text-xs py-1 px-3 rounded-full text-white font-bold whitespace-nowrap shadow-md">Most Popular</span>
                    Toyota Innova
                  </th>
                  <th className="p-5 font-semibold font-display text-lg text-center">Tempo Traveller</th>
                  <th className="p-5 font-semibold font-display text-lg text-center">Luxury</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700">Seating Capacity</td>
                  <td className="p-4 text-center">4</td>
                  <td className="p-4 text-center font-semibold bg-yellow-50/30">7</td>
                  <td className="p-4 text-center">12–17</td>
                  <td className="p-4 text-center">4</td>
                </tr>
                <tr className="border-b border-gray-100 bg-[var(--color-brand-accent)]/50">
                  <td className="p-4 font-medium text-gray-700">AC</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center bg-yellow-50/30">✅</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700">Luggage Space</td>
                  <td className="p-4 text-center">Standard</td>
                  <td className="p-4 text-center font-semibold bg-yellow-50/30">Large</td>
                  <td className="p-4 text-center">Extra Large</td>
                  <td className="p-4 text-center">Premium</td>
                </tr>
                <tr className="border-b border-gray-100 bg-[var(--color-brand-accent)]/50">
                  <td className="p-4 font-medium text-gray-700">GPS Tracking</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center bg-yellow-50/30">✅</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700">WiFi</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center bg-yellow-50/30">❌</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">✅</td>
                </tr>
                <tr className="border-b border-gray-100 bg-[var(--color-brand-accent)]/50">
                  <td className="p-4 font-medium text-gray-700">Starting Price</td>
                  <td className="p-4 text-center">₹12/km</td>
                  <td className="p-4 text-center font-semibold bg-yellow-50/30">₹18/km</td>
                  <td className="p-4 text-center">₹25/km</td>
                  <td className="p-4 text-center">₹45/km</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-700">Best For</td>
                  <td className="p-4 text-center text-sm">City travel</td>
                  <td className="p-4 text-center text-sm font-semibold bg-yellow-50/30 text-[var(--color-brand-secondary)]">Family trips</td>
                  <td className="p-4 text-center text-sm">Group tours</td>
                  <td className="p-4 text-center text-sm">Corporate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 5 — SAFETY STANDARDS */}
      <section className="py-20 bg-[var(--color-brand-primary)] text-white px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll relative">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg" 
                alt="Safety Standards" 
                className="rounded-2xl shadow-2xl relative z-10 rotate-1 transition-transform hover:rotate-0 duration-500"
              />
              {/* Decorative block behind image */}
              <div className="absolute -inset-4 bg-[var(--color-brand-secondary)]/20 rounded-3xl -z-0 -rotate-2"></div>
            </div>

            <div className="animate-on-scroll" style={{ animationDelay: '200ms' }}>
              <h2 className="font-display text-4xl mb-8">Your Safety, Our Promise</h2>
              
              <ul className="space-y-6 mb-10">
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-white/10 p-1.5 rounded-full flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-[var(--color-brand-secondary)]" />
                  </div>
                  <p className="text-lg text-[var(--color-brand-accent)]/90">Regular vehicle servicing and inspection every 5,000 km</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-white/10 p-1.5 rounded-full flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-[var(--color-brand-secondary)]" />
                  </div>
                  <p className="text-lg text-[var(--color-brand-accent)]/90">Drivers trained in defensive driving and first aid</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-white/10 p-1.5 rounded-full flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-[var(--color-brand-secondary)]" />
                  </div>
                  <p className="text-lg text-[var(--color-brand-accent)]/90">Emergency SOS button integrated in our app</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-white/10 p-1.5 rounded-full flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-[var(--color-brand-secondary)]" />
                  </div>
                  <p className="text-lg text-[var(--color-brand-accent)]/90">All trips insured with comprehensive travel insurance</p>
                </li>
              </ul>

              <Link to="/about" className="inline-block border-2 border-[var(--color-brand-secondary)] text-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-secondary)] hover:text-[var(--color-brand-primary)] font-semibold text-lg px-8 py-3 rounded-xl transition-all">
                Learn More About Safety &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CERTIFICATIONS STRIP */}
      <section className="py-16 bg-[var(--color-brand-accent)] border-t border-[var(--color-brand-secondary)]/20 px-4">
        <div className="max-w-7xl mx-auto text-center animate-on-scroll">
          <h2 className="text-[var(--color-brand-primary)] font-display text-2xl mb-8 font-semibold">Trusted & Certified</h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <span className="flex items-center gap-2 bg-white px-6 py-3 rounded-full border-2 border-[var(--color-brand-secondary)]/30 shadow-md font-medium text-gray-800 hover:border-[var(--color-brand-secondary)] transition-colors">
              <span className="text-xl">🏆</span> ISO 9001:2015
            </span>
            <span className="flex items-center gap-2 bg-white px-6 py-3 rounded-full border-2 border-[var(--color-brand-secondary)]/30 shadow-md font-medium text-gray-800 hover:border-[var(--color-brand-secondary)] transition-colors">
              <span className="text-xl">🛡️</span> Tourism Dept. Approved
            </span>
            <span className="flex items-center gap-2 bg-white px-6 py-3 rounded-full border-2 border-[var(--color-brand-secondary)]/30 shadow-md font-medium text-gray-800 hover:border-[var(--color-brand-secondary)] transition-colors">
              <span className="text-xl">⭐</span> Google 4.9★
            </span>
            <span className="flex items-center gap-2 bg-white px-6 py-3 rounded-full border-2 border-[var(--color-brand-secondary)]/30 shadow-md font-medium text-gray-800 hover:border-[var(--color-brand-secondary)] transition-colors">
              <span className="text-xl">📋</span> Licensed Operators
            </span>
            <span className="flex items-center gap-2 bg-white px-6 py-3 rounded-full border-2 border-[var(--color-brand-secondary)]/30 shadow-md font-medium text-gray-800 hover:border-[var(--color-brand-secondary)] transition-colors">
              <span className="text-xl">💚</span> Eco-Friendly Fleet
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
