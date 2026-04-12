import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollParallax, setScrollParallax] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      setScrollParallax(window.scrollY * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          entry.target.style.opacity = '1';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="font-sans bg-brand-accent text-brand-primary overflow-hidden">
      {/* Section: Navbar (moved to global layout) */}

      {/* MARQUEE */}
      <div className="w-full overflow-hidden bg-white border-b border-gray-100 py-2.5 relative z-40 shadow-sm">
        <div className="whitespace-nowrap flex animate-marquee text-[11px] font-bold uppercase tracking-[0.15em] text-[#6B7280]">
          <div className="flex items-center space-x-12 px-6">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#10B981]"></div> RAVI BOOKED OOTY PACKAGE</span>
            <span className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> 4.9 GOOGLE RATING</span>
            <span className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> SERVING VELLORE, CHENNAI, TRICHY</span>
            <span className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> ISO CERTIFIED 9001:2015</span>
            {/* Duplicated for smooth loop */}
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#10B981]"></div> RAVI BOOKED OOTY PACKAGE</span>
            <span className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> 4.9 GOOGLE RATING</span>
            <span className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> SERVING VELLORE, CHENNAI, TRICHY</span>
            <span className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> ISO CERTIFIED 9001:2015</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#10B981]"></div> RAVI BOOKED OOTY PACKAGE</span>
            <span className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> 4.9 GOOGLE RATING</span>
            <span className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> SERVING VELLORE, CHENNAI, TRICHY</span>
            <span className="flex items-center gap-2"><svg className="w-3.5 h-3.5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> ISO CERTIFIED 9001:2015</span>
          </div>
        </div>
      </div>
      {/* Section: Hero */}
      <section className="relative h-[calc(100vh-64px)] min-h-[600px] flex items-center overflow-hidden">
        <Swiper 
          modules={[Autoplay, Navigation, Pagination]} 
          slidesPerView={1} 
          loop={true} 
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          pagination={{
            el: '.swiper-pagination-custom',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '"></span>';
            },
          }}
          className="w-full h-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-black/10 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-10"></div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mysore_Palace_Morning.jpg/960px-Mysore_Palace_Morning.jpg" alt="Royal Heritage Palace" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-16">
                  <div className="max-w-xl text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-brand-secondary text-[11px] uppercase tracking-[0.2em] font-bold">ROYAL HERITAGE</span>
                    </div>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-white leading-[1] tracking-tight mb-0">Majestic</h1>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-brand-secondary leading-[1] tracking-tight italic pr-1 mb-5">History.</h1>
                    <p className="text-[17px] text-white/90 font-medium leading-relaxed max-w-sm mb-8 drop-shadow-md">
                      Explore the opulent palaces and rich royal history of the south.
                    </p>
                    <div className="flex gap-4">
                      <Link to="/packages" className="bg-brand-secondary text-white font-semibold rounded-lg px-8 py-3.5 shadow-lg border border-[#a17520] hover:bg-[#a67a21] transition-all duration-300 inline-block">Mysore Tours</Link>
                      <Link to="/contact" className="bg-white/10 backdrop-blur-md border border-white/40 text-white font-semibold rounded-lg px-8 py-3.5 hover:bg-white/20 transition-all duration-300 inline-block">Contact Us</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          
          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-black/10 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-10"></div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg" alt="Divine Journey Temple" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-16">
                  <div className="max-w-xl text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-brand-secondary text-[11px] uppercase tracking-[0.2em] font-bold">DIVINE JOURNEY</span>
                    </div>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-white leading-[1] tracking-tight mb-0">Sacred</h1>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-brand-secondary leading-[1] tracking-tight italic pr-1 mb-5">Temples.</h1>
                    <p className="text-[17px] text-white/90 font-medium leading-relaxed max-w-sm mb-8 drop-shadow-md">
                      Visit the ancient temples and spiritual destinations of Tamil Nadu.
                    </p>
                    <div className="flex gap-4">
                      <Link to="/packages" className="bg-brand-secondary text-white font-semibold rounded-lg px-8 py-3.5 shadow-lg border border-[#a17520] hover:bg-[#a67a21] transition-all duration-300 inline-block">Temple Tours</Link>
                      <Link to="/packages" className="bg-white/10 backdrop-blur-md border border-white/40 text-white font-semibold rounded-lg px-8 py-3.5 hover:bg-white/20 transition-all duration-300 inline-block">View Packages</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-black/10 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-10"></div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Varkala_beach_from_above.jpg/960px-Varkala_beach_from_above.jpg" alt="Coastal Escape Beach" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-16">
                  <div className="max-w-xl text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-brand-secondary text-[11px] uppercase tracking-[0.2em] font-bold">COASTAL ESCAPE</span>
                    </div>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-white leading-[1] tracking-tight mb-0">Pristine</h1>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-brand-secondary leading-[1] tracking-tight italic pr-1 mb-5">Beaches.</h1>
                    <p className="text-[17px] text-white/90 font-medium leading-relaxed max-w-sm mb-8 drop-shadow-md">
                      Experience the serene beaches and coastal beauty of South India.
                    </p>
                    <div className="flex gap-4">
                      <Link to="/packages" className="bg-brand-secondary text-white font-semibold rounded-lg px-8 py-3.5 shadow-lg border border-[#a17520] hover:bg-[#a67a21] transition-all duration-300 inline-block">Beach Tours</Link>
                      <Link to="/contact" className="bg-white/10 backdrop-blur-md border border-white/40 text-white font-semibold rounded-lg px-8 py-3.5 hover:bg-white/20 transition-all duration-300 inline-block">Contact Us</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Custom Navigation & Pagination */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex justify-center items-center gap-4">
            <button className="swiper-button-prev-custom w-10 h-10 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/20 hover:border-white transition-all backdrop-blur-sm cursor-pointer z-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <div className="swiper-pagination-custom flex items-center gap-2"></div>
            <button className="swiper-button-next-custom w-10 h-10 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/20 hover:border-white transition-all backdrop-blur-sm cursor-pointer z-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>
        </Swiper>
      </section>

      {/* Section: Stats Bar */}
      <section className="bg-brand-primary py-16 border-y border-brand-secondary/20 relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-brand-secondary/30">
            <div className="px-4 animate-on-scroll">
              <div className="font-display text-4xl lg:text-5xl text-brand-secondary font-bold mb-2">30+</div>
              <div className="text-white font-medium tracking-wide uppercase text-sm">Years Experience</div>
            </div>
            <div className="px-4 animate-on-scroll" style={{ animationDelay: '100ms' }}>
              <div className="font-display text-4xl lg:text-5xl text-brand-secondary font-bold mb-2">10k+</div>
              <div className="text-white font-medium tracking-wide uppercase text-sm">Happy Customers</div>
            </div>
            <div className="px-4 animate-on-scroll" style={{ animationDelay: '200ms' }}>
              <div className="font-display text-4xl lg:text-5xl text-brand-secondary font-bold mb-2">50+</div>
              <div className="text-white font-medium tracking-wide uppercase text-sm">Destinations Covered</div>
            </div>
            <div className="px-4 animate-on-scroll" style={{ animationDelay: '300ms' }}>
              <div className="font-display text-4xl lg:text-5xl text-brand-secondary font-bold mb-2">24/7</div>
              <div className="text-white font-medium tracking-wide uppercase text-sm">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Our Fleet */}
      <section className="py-24 bg-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="font-display text-4xl md:text-5xl text-brand-primary font-bold mb-4 inline-block relative">
              Our Fleet
              <div className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-brand-secondary"></div>
            </h2>
            <p className="text-gray-600 mt-6 text-lg">Every journey deserves the right vehicle</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'c10', name: "Swift Dzire", type: "Sedan", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Suzuki_Dzire_II_1.2_GLX_Hybrid_Arctic_White_Pearl.jpg/960px-Suzuki_Dzire_II_1.2_GLX_Hybrid_Arctic_White_Pearl.jpg", badge: "Most Popular", badgeColor: "bg-brand-secondary", features: "4 Seats · AC · Luggage · Music System", price: "Starting ₹12/km" },
              { id: 'c11', name: "Toyota Innova", type: "Premium SUV", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/2022_Toyota_Kijang_Innova_2.4_G_GUN142R_%2820220302%29.jpg/960px-2022_Toyota_Kijang_Innova_2.4_G_GUN142R_%2820220302%29.jpg", badge: "Family Favourite", badgeColor: "bg-[#166534]", features: "7 Seats · AC · Spacious · GPS", price: "Starting ₹18/km" },
              { id: 'c12', name: "Tempo Traveller", type: "Mini Van", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Jumper_Distribus_%28cropped%29.jpg/960px-Jumper_Distribus_%28cropped%29.jpg", badge: "Group Travel", badgeColor: "bg-brand-secondary", features: "12–17 Seats · AC · Pushback Seats", price: "Starting ₹25/km" },
              { id: 'c13', name: "Luxury Cars", type: "Business Class", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Mercedes-Benz_W223_IMG_6663.jpg/960px-Mercedes-Benz_W223_IMG_6663.jpg", badge: "Premium", badgeColor: "bg-[#926c04]", features: "4 Seats · Leather · Champagne · WiFi", price: "Starting ₹45/km" }
            ].map((car, idx) => (
              <div key={car.id} className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-on-scroll" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <span className={`absolute top-4 left-4 ${car.badgeColor} text-white px-3 py-1 text-xs font-bold uppercase rounded-full shadow-lg z-20`}>{car.badge}</span>
                </div>
                <div className="p-6 relative z-20 bg-white">
                  <div className="mb-2">
                    <h3 className="font-display text-xl font-bold text-brand-primary">{car.name}</h3>
                    <p className="text-brand-secondary text-sm font-semibold">{car.type}</p>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 pb-4 border-b border-gray-100">{car.features}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg text-brand-primary">{car.price}</p>
                    </div>
                    <Link to={`/booking?type=car&carId=${car.id}`} className="bg-brand-secondary text-white px-4 py-2 rounded-lg font-medium hover:bg-[#F59E0B] transition-colors shadow-md text-sm">Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Why Choose Us */}
      <section className="py-24 bg-brand-primary relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-4 inline-block relative">
              Why Sri Lakshmi Travels?
              <div className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-brand-secondary"></div>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🛡️', title: 'Verified Drivers', desc: 'Background-checked, licensed professionals' },
              { icon: '⚡', title: 'Instant Booking', desc: 'Confirm in under 2 minutes' },
              { icon: '💰', title: 'Best Prices', desc: 'Price-match guarantee, no hidden fees' },
              { icon: '🕐', title: '24/7 Support', desc: 'Always available by call or WhatsApp' },
              { icon: '🗺️', title: 'GPS Tracked', desc: 'Real-time vehicle tracking for safety' },
              { icon: '✨', title: 'Clean Vehicles', desc: 'Sanitized before every trip' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-brand-secondary/40 hover:shadow-[0_0_20px_rgba(212,160,23,0.15)] transition-all group animate-on-scroll" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-secondary/20 flex items-center justify-center text-2xl group-hover:bg-brand-secondary transition-colors"><span className="relative z-10 text-brand-secondary">{feature.icon}</span></div>
                  <div>
                    <h3 className="font-display text-xl text-white font-semibold mb-2">{feature.title}</h3>
                    <p className="text-brand-accent/80">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Popular Packages */}
      <section className="py-24 bg-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="font-display text-4xl md:text-5xl text-brand-primary font-bold mb-4">Popular Packages</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { id: 'p13', title: 'Chennai → Tirupati Darshan', duration: '2 Days', cab: 'Innova', price: '₹4,999/person', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg', highlights: 'Temple visit, Hotel stay, Breakfast included' },
              { id: 'p14', title: 'Ooty Hill Station Tour', duration: '3 Days', cab: 'Tempo Traveller', price: '₹6,999/person', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Ooty_lake.jpg/960px-Ooty_lake.jpg', highlights: 'Botanical Garden, Boat House, Tea Estates' },
              { id: 'p15', title: 'Rameswaram Pilgrimage', duration: '2 Days', cab: 'Swift Dzire', price: '₹3,499/person', img: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Rameswaram_montage_image.jpg', highlights: 'Agni Teertham, Ramanathaswamy Temple' }
            ].map((pkg, idx) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-shadow flex flex-col sm:flex-row lg:flex-col animate-on-scroll" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="sm:w-2/5 lg:w-full h-48 overflow-hidden relative">
                  <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:w-3/5 lg:w-full flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-brand-primary mb-3">{pkg.title}</h3>
                    <div className="flex gap-4 text-sm text-gray-600 mb-3 font-medium"><span>⏱️ {pkg.duration}</span><span>🚗 {pkg.cab}</span></div>
                    <p className="text-gray-500 text-sm mb-4">✅ {pkg.highlights}</p>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-xl text-brand-primary">{pkg.price}</span>
                    <Link to={`/booking?type=package&packageId=${pkg.id}`} className="bg-brand-secondary text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm">Book Package</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Testimonials */}
      <section className="py-24 bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="font-display text-4xl md:text-5xl font-bold">What Our Customers Say</h2>
          </div>
          <div className="animate-on-scroll">
            <Swiper modules={[Autoplay]} spaceBetween={30} slidesPerView={1} breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} className="px-4 pb-12">
              {[
                { name: 'Rajesh Kumar', city: 'Chennai', text: 'The Innova was spotless and driver was very professional. Best experience for our Tirupati trip!' },
                { name: 'Priya Subramanian', city: 'Coimbatore', text: 'Booked Tempo Traveller for family trip to Ooty. Excellent service, will book again!' },
                { name: 'Mohammed Farhan', city: 'Madurai', text: 'Luxury car for corporate event. Driver was punctual and the car was premium quality.' },
                { name: 'Saranya V', city: 'Trichy', text: 'Very seamless booking experience. No hidden charges.' }
              ].map((testi, idx) => (
                <SwiperSlide key={idx}>
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 h-full flex flex-col relative">
                    <div className="flex text-brand-secondary mb-4 mt-2"><Star fill="currentColor" stroke="none" className="w-5 h-5"/><Star fill="currentColor" stroke="none" className="w-5 h-5"/><Star fill="currentColor" stroke="none" className="w-5 h-5"/><Star fill="currentColor" stroke="none" className="w-5 h-5"/><Star fill="currentColor" stroke="none" className="w-5 h-5"/></div>
                    <p className="text-brand-accent italic mb-8 flex-1 leading-relaxed text-lg">"{testi.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-secondary/20 border border-brand-secondary/50 flex items-center justify-center font-bold text-brand-secondary">{testi.name.charAt(0)}</div>
                      <div><h4 className="font-semibold text-white">{testi.name}</h4><p className="text-sm text-gray-400">{testi.city}</p></div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Section: Footer (moved to global layout) */}
    </div>
  );
}
