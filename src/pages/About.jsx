import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
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
    <div className="min-h-screen bg-[var(--color-brand-accent)] font-sans">
      {/* SECTION 1 — HERO */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-primary)]/95 to-transparent z-10 w-2/3"></div>
          <div className="absolute inset-0 bg-[var(--color-brand-primary)]/40 z-10"></div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg"
            alt="About Hero"
            className="w-full h-full object-cover animate-ken-burns origin-center"
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto animate-on-scroll">
          <p className="text-[var(--color-brand-secondary)] mb-4 text-sm font-medium tracking-wider uppercase">
            <Link to="/" className="hover:text-white transition-colors">Home</Link> / About
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-white mb-6">Our Story</h1>
          <div className="w-24 h-0.5 bg-[var(--color-brand-secondary)] mx-auto mb-6"></div>
          <p className="text-[var(--color-brand-accent)] text-xl md:text-2xl max-w-2xl mx-auto font-light">
            30 years of journeys. Thousands of smiles. One mission.
          </p>
        </div>
      </section>

      {/* SECTION 2 — STORY SPLIT */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Image */}
            <div className="w-full lg:w-1/2 relative animate-on-scroll">
              <div className="absolute inset-0 bg-[var(--color-brand-secondary)] rounded-2xl transform translate-x-4 translate-y-4 opacity-20"></div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg" 
                alt="Tamil Nadu Journey" 
                className="relative rounded-2xl shadow-2xl w-full h-[600px] object-cover animate-float"
              />
            </div>
            
            {/* Right Content */}
            <div className="w-full lg:w-1/2 animate-on-scroll" style={{ animationDelay: '200ms' }}>
              <span className="inline-block bg-[var(--color-brand-secondary)]/10 text-[var(--color-brand-secondary)] font-semibold tracking-wider text-sm px-4 py-1.5 rounded-full uppercase mb-6 border border-[var(--color-brand-secondary)]/30">
                Est. 1995
              </span>
              <h2 className="font-display text-4xl lg:text-5xl text-[var(--color-brand-primary)] mb-8 leading-tight">
                From One Car to a Fleet of Trust
              </h2>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed mb-10">
                <p>
                  Sri Lakshmi Travels was born in 1995 in the heart of Tamil Nadu, with a single vehicle and an unwavering commitment to safe, comfortable travel. Our founder Mr. Lakshmi Narayanan started with a simple belief — that every traveller deserves respect, safety, and a smile.
                </p>
                <p>
                  Over three decades, we have grown into one of Tamil Nadu's most trusted car rental services, serving pilgrims to Tirupati and Rameswaram, corporate clients across Chennai, and families seeking memorable hill station holidays in Ooty and Kodaikanal.
                </p>
                <p>
                  Today, our fleet includes Swift Dzires, Toyota Innovas, Tempo Travellers, and luxury vehicles — all managed by a team of dedicated professionals who treat every journey as their own.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
                <div>
                  <div className="font-display text-3xl text-[var(--color-brand-secondary)] mb-1">30+</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Years</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-[var(--color-brand-secondary)] mb-1">50+</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Destinations</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-[var(--color-brand-secondary)] mb-1">200+</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Drivers</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-[var(--color-brand-secondary)] mb-1">10k+</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Trips</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — MISSION & VISION */}
      <section className="py-24 bg-[var(--color-brand-primary)] px-4 relative">
        {/* Subtle background grain */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-colors duration-300 animate-on-scroll">
              <div className="text-4xl mb-6">🎯</div>
              <h3 className="font-display text-3xl text-white mb-6">Our Mission</h3>
              <p className="text-[var(--color-brand-accent)]/90 text-lg leading-relaxed">
                "To provide safe, reliable, and comfortable transportation across Tamil Nadu, making every journey a memorable experience through professionalism, transparency, and genuine care for our customers."
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-colors duration-300 animate-on-scroll" style={{ animationDelay: '200ms' }}>
              <div className="text-4xl mb-6">👁️</div>
              <h3 className="font-display text-3xl text-white mb-6">Our Vision</h3>
              <p className="text-[var(--color-brand-accent)]/90 text-lg leading-relaxed">
                "To become South India's most trusted travel partner by 2030, expanding our fleet to 500+ vehicles while maintaining the same personal touch that has defined us since 1995."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — TIMELINE */}
      <section className="py-24 px-4 bg-[var(--color-brand-accent)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl text-center text-[var(--color-brand-primary)] mb-16 animate-on-scroll">Our Journey Through the Years</h2>
          
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[var(--color-brand-secondary)]/30 hidden md:block"></div>
            
            <div className="space-y-12 relative">
              {/* Event 1 */}
              <div className="flex flex-col md:flex-row items-center justify-between w-full animate-on-scroll">
                <div className="order-1 md:w-5/12 hidden md:block"></div>
                <div className="z-20 flex items-center order-1 bg-[var(--color-brand-secondary)] shadow-xl w-6 h-6 rounded-full absolute left-1/2 -translate-x-1/2 hidden md:block border-4 border-[var(--color-brand-accent)]"></div>
                <div className="order-1 w-full md:w-5/12 pr-0 md:pr-12 md:text-right mb-6 md:mb-0 relative">
                  <div className="md:hidden absolute w-4 h-4 bg-[var(--color-brand-secondary)] rounded-full left-0 top-6 -ml-[2px]"></div>
                  <div className="md:hidden absolute h-full w-0.5 bg-[var(--color-brand-secondary)]/30 left-2 top-8 -z-10"></div>
                  <div className="pl-8 md:pl-0">
                    <span className="inline-block bg-[var(--color-brand-secondary)] text-white px-3 py-1 rounded text-sm font-bold mb-3 shadow-sm">1995</span>
                    <h3 className="font-display text-2xl text-[var(--color-brand-primary)] font-bold mb-2">The Beginning</h3>
                    <p className="text-gray-600 leading-relaxed">Started with 1 Ambassador car in Madurai. First customer was a pilgrim to Rameswaram.</p>
                  </div>
                </div>
              </div>

              {/* Event 2 */}
              <div className="flex flex-col md:flex-row items-center justify-between w-full animate-on-scroll">
                <div className="order-1 w-full md:w-5/12 pl-0 md:pl-12 mb-6 md:mb-0 relative md:ml-auto">
                  <div className="md:hidden absolute w-4 h-4 bg-[var(--color-brand-secondary)] rounded-full left-0 top-6 -ml-[2px]"></div>
                  <div className="md:hidden absolute h-full w-0.5 bg-[var(--color-brand-secondary)]/30 left-2 top-8 -z-10"></div>
                  <div className="pl-8 md:pl-0">
                    <span className="inline-block bg-[var(--color-brand-secondary)] text-white px-3 py-1 rounded text-sm font-bold mb-3 shadow-sm">2000</span>
                    <h3 className="font-display text-2xl text-[var(--color-brand-primary)] font-bold mb-2">Growing the Fleet</h3>
                    <p className="text-gray-600 leading-relaxed">Expanded to 10 vehicles. Added Toyota Qualis for family trips across Tamil Nadu.</p>
                  </div>
                </div>
                <div className="z-20 flex items-center order-1 bg-[var(--color-brand-secondary)] shadow-xl w-6 h-6 rounded-full absolute left-1/2 -translate-x-1/2 hidden md:block border-4 border-[var(--color-brand-accent)]"></div>
                <div className="order-1 md:w-5/12 hidden md:block"></div>
              </div>

              {/* Event 3 */}
              <div className="flex flex-col md:flex-row items-center justify-between w-full animate-on-scroll">
                <div className="order-1 md:w-5/12 hidden md:block"></div>
                <div className="z-20 flex items-center order-1 bg-[var(--color-brand-secondary)] shadow-xl w-6 h-6 rounded-full absolute left-1/2 -translate-x-1/2 hidden md:block border-4 border-[var(--color-brand-accent)]"></div>
                <div className="order-1 w-full md:w-5/12 pr-0 md:pr-12 md:text-right mb-6 md:mb-0 relative">
                  <div className="md:hidden absolute w-4 h-4 bg-[var(--color-brand-secondary)] rounded-full left-0 top-6 -ml-[2px]"></div>
                  <div className="md:hidden absolute h-full w-0.5 bg-[var(--color-brand-secondary)]/30 left-2 top-8 -z-10"></div>
                  <div className="pl-8 md:pl-0">
                    <span className="inline-block bg-[var(--color-brand-secondary)] text-white px-3 py-1 rounded text-sm font-bold mb-3 shadow-sm">2008</span>
                    <h3 className="font-display text-2xl text-[var(--color-brand-primary)] font-bold mb-2">Digital Leap</h3>
                    <p className="text-gray-600 leading-relaxed">First website launched. Online inquiries became 40% of total bookings.</p>
                  </div>
                </div>
              </div>

               {/* Event 4 */}
               <div className="flex flex-col md:flex-row items-center justify-between w-full animate-on-scroll">
                <div className="order-1 w-full md:w-5/12 pl-0 md:pl-12 mb-6 md:mb-0 relative md:ml-auto">
                  <div className="md:hidden absolute w-4 h-4 bg-[var(--color-brand-secondary)] rounded-full left-0 top-6 -ml-[2px]"></div>
                  <div className="md:hidden absolute h-full w-0.5 bg-[var(--color-brand-secondary)]/30 left-2 top-8 -z-10"></div>
                  <div className="pl-8 md:pl-0">
                    <span className="inline-block bg-[var(--color-brand-secondary)] text-white px-3 py-1 rounded text-sm font-bold mb-3 shadow-sm">2015</span>
                    <h3 className="font-display text-2xl text-[var(--color-brand-primary)] font-bold mb-2">Corporate Partnerships</h3>
                    <p className="text-gray-600 leading-relaxed">Signed contracts with 5 major IT companies in Chennai for employee transportation.</p>
                  </div>
                </div>
                <div className="z-20 flex items-center order-1 bg-[var(--color-brand-secondary)] shadow-xl w-6 h-6 rounded-full absolute left-1/2 -translate-x-1/2 hidden md:block border-4 border-[var(--color-brand-accent)]"></div>
                <div className="order-1 md:w-5/12 hidden md:block"></div>
              </div>

              {/* Event 5 */}
              <div className="flex flex-col md:flex-row items-center justify-between w-full animate-on-scroll">
                <div className="order-1 md:w-5/12 hidden md:block"></div>
                <div className="z-20 flex items-center order-1 bg-[var(--color-brand-secondary)] shadow-xl w-6 h-6 rounded-full absolute left-1/2 -translate-x-1/2 hidden md:block border-4 border-[var(--color-brand-accent)]"></div>
                <div className="order-1 w-full md:w-5/12 pr-0 md:pr-12 md:text-right mb-6 md:mb-0 relative">
                  <div className="md:hidden absolute w-4 h-4 bg-[var(--color-brand-secondary)] rounded-full left-0 top-6 -ml-[2px]"></div>
                  <div className="md:hidden absolute h-full w-0.5 bg-[var(--color-brand-secondary)]/30 left-2 top-8 -z-10"></div>
                  <div className="pl-8 md:pl-0">
                    <span className="inline-block bg-[var(--color-brand-secondary)] text-white px-3 py-1 rounded text-sm font-bold mb-3 shadow-sm">2020</span>
                    <h3 className="font-display text-2xl text-[var(--color-brand-primary)] font-bold mb-2">Pandemic Resilience</h3>
                    <p className="text-gray-600 leading-relaxed">Pivoted to medical transportation and essential services. Never laid off a single driver.</p>
                  </div>
                </div>
              </div>

              {/* Event 6 */}
              <div className="flex flex-col md:flex-row items-center justify-between w-full animate-on-scroll">
                <div className="order-1 w-full md:w-5/12 pl-0 md:pl-12 mb-6 md:mb-0 relative md:ml-auto">
                  <div className="md:hidden absolute w-4 h-4 bg-[var(--color-brand-secondary)] rounded-full left-0 top-6 -ml-[2px]"></div>
                  <div className="md:hidden absolute h-full w-0.5 bg-[var(--color-brand-secondary)]/30 left-2 top-8 -z-10"></div>
                  <div className="pl-8 md:pl-0">
                    <span className="inline-block bg-[var(--color-brand-secondary)] text-white px-3 py-1 rounded text-sm font-bold mb-3 shadow-sm">2024</span>
                    <h3 className="font-display text-2xl text-[var(--color-brand-primary)] font-bold mb-2">Premium Fleet Launch</h3>
                    <p className="text-gray-600 leading-relaxed">Added luxury cars (Mercedes, BMW) for weddings and corporate events.</p>
                  </div>
                </div>
                <div className="z-20 flex items-center order-1 bg-[var(--color-brand-secondary)] shadow-xl w-6 h-6 rounded-full absolute left-1/2 -translate-x-1/2 hidden md:block border-4 border-[var(--color-brand-accent)]"></div>
                <div className="order-1 md:w-5/12 hidden md:block"></div>
              </div>

              {/* Event 7 */}
              <div className="flex flex-col md:flex-row items-center justify-between w-full animate-on-scroll">
                <div className="order-1 md:w-5/12 hidden md:block"></div>
                <div className="z-20 flex items-center order-1 bg-[var(--color-brand-secondary)] shadow-xl w-6 h-6 rounded-full absolute left-1/2 -translate-x-1/2 hidden md:block border-4 border-[var(--color-brand-accent)]"></div>
                <div className="order-1 w-full md:w-5/12 pr-0 md:pr-12 md:text-right relative">
                  <div className="md:hidden absolute w-4 h-4 bg-[var(--color-brand-secondary)] rounded-full left-0 top-6 -ml-[2px]"></div>
                  <div className="pl-8 md:pl-0">
                    <span className="inline-block bg-[var(--color-brand-secondary)] text-white px-3 py-1 rounded text-sm font-bold mb-3 shadow-sm">2025</span>
                    <h3 className="font-display text-2xl text-[var(--color-brand-primary)] font-bold mb-2">Digital Booking Platform</h3>
                    <p className="text-gray-600 leading-relaxed">Launched new website with real-time booking, GPS tracking, and WhatsApp integration.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — TEAM */}
      <section className="py-24 bg-[var(--color-brand-primary)] px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl text-center text-white mb-16 animate-on-scroll">The People Behind Your Journey</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Team 1 */}
            <div className="bg-white/5 backdrop-blur-sm border border-[var(--color-brand-secondary)]/20 rounded-3xl p-8 text-center group hover:border-[var(--color-brand-secondary)]/60 hover:-translate-y-2 transition-all duration-300 animate-on-scroll shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 ring-2 ring-[var(--color-brand-secondary)] p-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg" alt="Mr. Lakshmi Narayanan" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="font-display text-2xl text-white mb-2">Mr. Lakshmi Narayanan</h3>
              <p className="text-[var(--color-brand-secondary)] font-medium text-sm tracking-wide uppercase mb-4">Founder & Managing Director</p>
              <p className="text-[var(--color-brand-accent)]/70 leading-relaxed">30+ years in travel. Started with one car. Now oversees 200+ professionals.</p>
            </div>

            {/* Team 2 */}
            <div className="bg-white/5 backdrop-blur-sm border border-[var(--color-brand-secondary)]/20 rounded-3xl p-8 text-center group hover:border-[var(--color-brand-secondary)]/60 hover:-translate-y-2 transition-all duration-300 animate-on-scroll shadow-[0_4px_30px_rgba(0,0,0,0.1)]" style={{ animationDelay: '200ms' }}>
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 ring-2 ring-[var(--color-brand-secondary)] p-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg" alt="Mrs. Kavitha Narayanan" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="font-display text-2xl text-white mb-2">Mrs. Kavitha Narayanan</h3>
              <p className="text-[var(--color-brand-secondary)] font-medium text-sm tracking-wide uppercase mb-4">Operations Director</p>
              <p className="text-[var(--color-brand-accent)]/70 leading-relaxed">Manages fleet operations and customer experience across all routes.</p>
            </div>

            {/* Team 3 */}
            <div className="bg-white/5 backdrop-blur-sm border border-[var(--color-brand-secondary)]/20 rounded-3xl p-8 text-center group hover:border-[var(--color-brand-secondary)]/60 hover:-translate-y-2 transition-all duration-300 animate-on-scroll shadow-[0_4px_30px_rgba(0,0,0,0.1)]" style={{ animationDelay: '400ms' }}>
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 ring-2 ring-[var(--color-brand-secondary)] p-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg" alt="Mr. Santhosh Kumar" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="font-display text-2xl text-white mb-2">Mr. Santhosh Kumar</h3>
              <p className="text-[var(--color-brand-secondary)] font-medium text-sm tracking-wide uppercase mb-4">Head of Technology</p>
              <p className="text-[var(--color-brand-accent)]/70 leading-relaxed">Drives our digital transformation — booking systems, GPS, and customer apps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — AWARDS & RECOGNITION */}
      <section className="py-20 px-4 bg-[var(--color-brand-accent)]">
        <div className="max-w-7xl mx-auto text-center animate-on-scroll">
          <h2 className="font-display text-3xl text-[var(--color-brand-primary)] mb-12">Awards & Recognition</h2>
          
          <div className="flex overflow-x-auto pb-8 snap-x md:flex-wrap md:justify-center gap-6 hide-scrollbar">
            <div className="min-w-[280px] flex-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center snap-center hover:shadow-md transition-shadow">
              <span className="text-4xl mb-4">🏆</span>
              <p className="font-medium text-[var(--color-brand-primary)] text-center">Best Car Rental</p>
              <p className="text-sm text-gray-500 text-center mt-2">Tamil Nadu Tourism Awards 2022</p>
            </div>
            
            <div className="min-w-[280px] flex-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center snap-center hover:shadow-md transition-shadow">
              <span className="text-4xl mb-4">⭐</span>
              <p className="font-medium text-[var(--color-brand-primary)] text-center">4.9/5 Rating</p>
              <p className="text-sm text-gray-500 text-center mt-2">Google Reviews (500+)</p>
            </div>
            
            <div className="min-w-[280px] flex-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center snap-center hover:shadow-md transition-shadow">
              <span className="text-4xl mb-4">📋</span>
              <p className="font-medium text-[var(--color-brand-primary)] text-center">Certified Operator</p>
              <p className="text-sm text-gray-500 text-center mt-2">Tourism Dept. of Tamil Nadu</p>
            </div>
            
            <div className="min-w-[280px] flex-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center snap-center hover:shadow-md transition-shadow">
              <span className="text-4xl mb-4">🌿</span>
              <p className="font-medium text-[var(--color-brand-primary)] text-center">Eco-Friendly Fleet</p>
              <p className="text-sm text-gray-500 text-center mt-2">Green Travel Awards 2023</p>
            </div>
            
            <div className="min-w-[280px] flex-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center snap-center hover:shadow-md transition-shadow">
              <span className="text-4xl mb-4">💼</span>
              <p className="font-medium text-[var(--color-brand-primary)] text-center">Preferred Partner</p>
              <p className="text-sm text-gray-500 text-center mt-2">MakeMyTrip & Cleartrip</p>
            </div>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}} />
        </div>
      </section>

      {/* SECTION 7 — CTA BANNER */}
      <section className="py-24 bg-[var(--color-brand-primary)] px-4 relative overflow-hidden">
        {/* Subtle diagonal stripes CSS pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--color-brand-secondary) 25%, transparent 25%, transparent 75%, var(--color-brand-secondary) 75%, var(--color-brand-secondary)), repeating-linear-gradient(45deg, var(--color-brand-secondary) 25%, transparent 25%, transparent 75%, var(--color-brand-secondary) 75%, var(--color-brand-secondary))', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-on-scroll">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6">Ready to Travel with Us?</h2>
          <p className="text-[var(--color-brand-accent)]/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join 10,000+ happy travelers who trust Sri Lakshmi Travels for every journey.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/" className="w-full sm:w-auto bg-[var(--color-brand-secondary)] hover:bg-[#F59E0B] text-white font-semibold px-8 py-4 rounded-xl shadow-[0_4px_15px_rgba(212,160,23,0.3)] transition-all font-sans text-lg">
              Book Now &rarr;
            </Link>
            <Link to="/contact" className="w-full sm:w-auto border-2 border-[var(--color-brand-secondary)] text-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-secondary)]/10 font-semibold px-8 py-4 rounded-xl transition-all font-sans text-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
