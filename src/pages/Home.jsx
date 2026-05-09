import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import api from '../api/axios';
import { getTourImage } from '../constants/tourImages';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollParallax, setScrollParallax] = useState(0);
  const [cars, setCars] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsRes, toursRes] = await Promise.all([
          api.get('/cars'),
          api.get('/tours')
        ]);
        setCars(carsRes.data.cars || []);
        setPackages(toursRes.data.tours || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      setScrollParallax(window.scrollY * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    
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
          {/* Slide: Video Background 1 (Landscape Train) */}
          <SwiperSlide>
            <div className="relative w-full h-full overflow-hidden bg-black">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="/videos/hero1.mp4"
              ></video>
              <div className="absolute inset-0 bg-black/30 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10"></div>
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-16">
                  <div className="max-w-xl text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-brand-secondary text-[11px] uppercase tracking-[0.2em] font-bold">PREMIUM TRAVEL EXPERIENCE</span>
                    </div>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-white leading-[1] tracking-tight mb-0">Discover</h1>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-brand-secondary leading-[1] tracking-tight italic pr-1 mb-5">Heritage.</h1>
                    <p className="text-[17px] text-white/90 font-medium leading-relaxed max-w-sm mb-8 drop-shadow-md">
                      Embark on scenic journeys across India's most breathtaking landscapes with Sri Lakshmi Travels.
                    </p>
                    <div className="flex gap-4">
                      <Link to="/packages" className="bg-brand-secondary text-white font-semibold rounded-lg px-8 py-3.5 shadow-lg border border-[#a17520] hover:bg-[#a67a21] transition-all duration-300 inline-block drop-shadow-md">Our Packages</Link>
                      <Link to="/about" className="bg-white/10 backdrop-blur-md border border-white/40 text-white font-semibold rounded-lg px-8 py-3.5 hover:bg-white/20 transition-all duration-300 inline-block">Learn More</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide: Video Background 2 (Rotated Mountains) */}
          <SwiperSlide>
            <div className="relative w-full h-full overflow-hidden bg-black">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="absolute top-1/2 left-1/2 w-[100vh] h-[100vw] -translate-x-1/2 -translate-y-1/2 -rotate-90 object-cover pointer-events-none z-0"
                src="/videos/hero2.mp4"
              ></video>
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-10"></div>
              <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-20">
                  <span className="text-brand-secondary text-[13px] uppercase tracking-[0.4em] font-bold mb-6 block drop-shadow-lg">
                    ESTABLISHED 1995
                  </span>
                  <h1 className="text-[56px] lg:text-[84px] font-extrabold text-white leading-[1] tracking-tight mb-6 drop-shadow-2xl">
                    Majestic Mountain <br/> <span className="text-brand-secondary italic">Escapes.</span>
                  </h1>
                  <p className="text-[19px] text-white/95 font-medium leading-relaxed max-w-2xl mx-auto mb-10 drop-shadow-xl">
                    Experience the ultimate luxury in mountain travel. Professional drivers, premium fleet, and unforgettable memories.
                  </p>
                  <div className="flex gap-5 justify-center">
                    <Link to="/contact" className="bg-brand-secondary text-white font-bold rounded-xl px-10 py-4 shadow-2xl border border-[#a17520] hover:bg-[#a67a21] hover:-translate-y-1 transition-all duration-300">Start Planning</Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 1 - Taj Mahal */}
          <SwiperSlide>
            <div className="relative w-full h-full overflow-hidden">
              <div className="absolute inset-0 bg-black/20 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2560&auto=format&fit=crop" 
                alt="Taj Mahal Golden Triangle" 
                className="w-full h-full object-cover object-center animate-ken-burns" 
                style={{ transformOrigin: 'center right' }}
              />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-16">
                  <div className="max-w-xl text-left" style={{ transform: `translateY(${scrollParallax * -0.2}px)` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-brand-secondary text-[11px] uppercase tracking-[0.2em] font-bold">UNESCO WORLD HERITAGE</span>
                    </div>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-white leading-[1] tracking-tight mb-0">Eternal</h1>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-brand-secondary leading-[1] tracking-tight italic pr-1 mb-5">Love.</h1>
                    <p className="text-[17px] text-white/90 font-medium leading-relaxed max-w-sm mb-8 drop-shadow-md">
                      Witness the breathtaking beauty of the Taj Mahal and India's finest golden triangle heritage.
                    </p>
                    <div className="flex gap-4">
                      <Link to="/booking?type=package&packageId=69e067d146a9c2224844aeb2" className="bg-brand-secondary text-white font-semibold rounded-lg px-8 py-3.5 shadow-lg border border-[#a17520] hover:bg-[#a67a21] transition-all duration-300 inline-block drop-shadow-md">Agra Tours</Link>
                      <Link to="/packages" className="bg-white/10 backdrop-blur-md border border-white/40 text-white font-semibold rounded-lg px-8 py-3.5 hover:bg-white/20 transition-all duration-300 inline-block">View Packages</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          
          {/* Slide 2 - Kashmir */}
          <SwiperSlide>
            <div className="relative w-full h-full overflow-hidden">
              <div className="absolute inset-0 bg-black/20 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=2560&auto=format&fit=crop" 
                alt="Paradise Kashmir Valleys" 
                className="w-full h-full object-cover object-center animate-ken-burns" 
                style={{ transformOrigin: 'top center' }}
              />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-16">
                  <div className="max-w-xl text-left" style={{ transform: `translateY(${scrollParallax * -0.2}px)` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-brand-secondary text-[11px] uppercase tracking-[0.2em] font-bold">PARADISE ON EARTH</span>
                    </div>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-white leading-[1] tracking-tight mb-0">Majestic</h1>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-brand-secondary leading-[1] tracking-tight italic pr-1 mb-5">Valleys.</h1>
                    <p className="text-[17px] text-white/90 font-medium leading-relaxed max-w-sm mb-8 drop-shadow-md">
                      Experience the breathtaking snow-capped mountains and serene alpine lakes of Kashmir.
                    </p>
                    <div className="flex gap-4">
                      <Link to="/booking?type=package&packageId=69e067d146a9c2224844aec2" className="bg-brand-secondary text-white font-semibold rounded-lg px-8 py-3.5 shadow-lg border border-[#a17520] hover:bg-[#a67a21] transition-all duration-300 inline-block drop-shadow-md">Kashmir Tours</Link>
                      <Link to="/contact" className="bg-white/10 backdrop-blur-md border border-white/40 text-white font-semibold rounded-lg px-8 py-3.5 hover:bg-white/20 transition-all duration-300 inline-block">Contact Us</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 - Goa */}
          <SwiperSlide>
            <div className="relative w-full h-full overflow-hidden">
              <div className="absolute inset-0 bg-black/10 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2560&auto=format&fit=crop" 
                alt="Goa Beaches" 
                className="w-full h-full object-cover object-center animate-ken-burns" 
                style={{ transformOrigin: 'bottom center' }}
              />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-16">
                  <div className="max-w-xl text-left" style={{ transform: `translateY(${scrollParallax * -0.2}px)` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-brand-secondary text-[11px] uppercase tracking-[0.2em] font-bold">COASTAL ESCAPE</span>
                    </div>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-white leading-[1] tracking-tight mb-0">Pristine</h1>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-brand-secondary leading-[1] tracking-tight italic pr-1 mb-5">Beaches.</h1>
                    <p className="text-[17px] text-white/90 font-medium leading-relaxed max-w-sm mb-8 drop-shadow-md">
                      Relax on golden sands and explore the historical, vibrant colonial charm of Goa.
                    </p>
                    <div className="flex gap-4">
                      <Link to="/booking?type=package&packageId=69e067d146a9c2224844aefa" className="bg-brand-secondary text-white font-semibold rounded-lg px-8 py-3.5 shadow-lg border border-[#a17520] hover:bg-[#a67a21] transition-all duration-300 inline-block drop-shadow-md">Goa Tours</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 4 - Gujarat */}
          <SwiperSlide>
            <div className="relative w-full h-full overflow-hidden">
              <div className="absolute inset-0 bg-black/10 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2560&auto=format&fit=crop" 
                alt="Cultural Gujarat Heritage" 
                className="w-full h-full object-cover object-center animate-ken-burns" 
                style={{ transformOrigin: 'center left' }}
              />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-16">
                  <div className="max-w-xl text-left" style={{ transform: `translateY(${scrollParallax * -0.2}px)` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-brand-secondary text-[11px] uppercase tracking-[0.2em] font-bold">CULTURAL SAFARI</span>
                    </div>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-white leading-[1] tracking-tight mb-0">Vibrant</h1>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-brand-secondary leading-[1] tracking-tight italic pr-1 mb-5">Heritage.</h1>
                    <p className="text-[17px] text-white/90 font-medium leading-relaxed max-w-sm mb-8 drop-shadow-md">
                      Discover the legendary temples, vast salt deserts, and rich traditions of majestic Gujarat.
                    </p>
                    <div className="flex gap-4">
                      <Link to="/booking?type=package&packageId=69e067d146a9c2224844aeea" className="bg-brand-secondary text-white font-semibold rounded-lg px-8 py-3.5 shadow-lg border border-[#a17520] hover:bg-[#a67a21] transition-all duration-300 inline-block drop-shadow-md">Gujarat Tours</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

           {/* Slide 5 - Kerala */}
           <SwiperSlide>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-black/10 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-10"></div>
              <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=2000" alt="Kerala Hill Stations" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-16">
                  <div className="max-w-xl text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-brand-secondary text-[11px] uppercase tracking-[0.2em] font-bold">GOD'S OWN COUNTRY</span>
                    </div>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-white leading-[1] tracking-tight mb-0">Emerald</h1>
                    <h1 className="text-[56px] lg:text-[72px] font-extrabold text-brand-secondary leading-[1] tracking-tight italic pr-1 mb-5">Hills.</h1>
                    <p className="text-[17px] text-white/90 font-medium leading-relaxed max-w-sm mb-8 drop-shadow-md">
                      Journey through lush tea plantations and the misty, untouched hill stations of Kerala.
                    </p>
                    <div className="flex gap-4">
                      <Link to="/booking?type=package&packageId=69e067d146a9c2224844ae58" className="bg-brand-secondary text-white font-semibold rounded-lg px-8 py-3.5 shadow-lg border border-[#a17520] hover:bg-[#a67a21] transition-all duration-300 inline-block drop-shadow-md">Kerala Tours</Link>
                      <Link to="/packages" className="bg-white/10 backdrop-blur-md border border-white/40 text-white font-semibold rounded-lg px-8 py-3.5 hover:bg-white/20 transition-all duration-300 inline-block">Explore Packages</Link>
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

      {/* Section: 3D Professional Video Experience Spotlight */}
      <section className="relative h-[600px] lg:h-[80vh] overflow-hidden bg-black flex items-center justify-center">
        {/* Dynamic Video Loop  */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute top-1/2 left-1/2 w-[100vh] h-[100vw] -translate-x-1/2 -translate-y-1/2 -rotate-90 object-cover pointer-events-none z-0"
          src="/videos/hero3.mp4" 
        ></video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        {/* Centered Heading */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <span className="text-brand-secondary text-sm md:text-base uppercase tracking-[0.3em] font-bold mb-4 block">
            Premium Transportation
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-xl">
            Journey in Ultimate Luxury
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Experience reliable, comfortable, and professional travel across South India.
          </p>
          <Link to="/contact" className="inline-block bg-brand-secondary text-white font-bold rounded-lg px-8 py-4 shadow-xl border border-[#a17520] hover:bg-[#a67a21] hover:-translate-y-1 transition-all duration-300">
            Start Your Journey
          </Link>
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
          
          <div className="animate-on-scroll relative px-2 md:px-8">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
              }}
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              className="pb-16 pt-4"
            >
              {cars.map((car, idx) => (
                <SwiperSlide key={car._id}>
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-3 transition-all duration-500 cursor-pointer h-full flex flex-col border border-gray-100/50">
                    <div className="relative h-56 overflow-hidden rounded-t-2xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                      <span className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur text-brand-secondary border border-brand-secondary/30 px-3 py-1.5 text-[10px] font-extrabold uppercase rounded-lg shadow-lg z-20">
                        {car.category}
                      </span>
                    </div>
                    <div className="p-6 relative z-20 bg-white flex flex-col flex-1">
                      <div className="mb-3">
                        <h3 className="font-display text-2xl font-bold text-brand-primary leading-tight group-hover:text-brand-secondary transition-colors">{car.name}</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4 relative z-30" style={{perspective: '1000px'}}>
                        {car.features?.slice(0,4).map((feat, fidx) => (
                          <span key={fidx} className="group/feat cursor-default bg-gray-50 border border-gray-100 text-brand-primary px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-lg hover:z-40 transition-transform duration-300 hover:rotate-x-12 hover:-rotate-y-12 hover:scale-110 shadow-sm hover:shadow-xl hover:border-brand-secondary hover:bg-brand-secondary hover:text-white">
                            {feat}
                          </span>
                        ))}
                      </div>

                      <p className="text-gray-500 text-sm mb-5 pb-5 border-b border-gray-100 flex-1 line-clamp-3 leading-relaxed">
                        {car.desc}
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Starting At</p>
                          <p className="font-extrabold text-xl text-brand-primary flex items-baseline gap-1">
                            ₹{car.pricePerKm} <span className="text-xs text-gray-500 font-medium tracking-normal">/km</span>
                          </p>
                        </div>
                        <Link to={`/booking?type=car&carId=${car._id}`} className="bg-brand-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-brand-secondary hover:text-brand-dark transition-all duration-300 shadow-md text-sm hover:-translate-y-1">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Section: Why Choose Us */}
      <section className="py-24 relative overflow-hidden bg-brand-dark">
        {/* Deep luxury gradient and pattern background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-dark to-brand-primary opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-luxury-pattern z-0 opacity-50 mix-blend-overlay"></div>
        
        {/* Floating animated gold orbs for a premium glass feel */}
        <div className="absolute top-20 -left-20 w-72 h-72 bg-brand-secondary/20 rounded-full blur-[100px] animate-pulse-slow z-0"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-brand-light/30 rounded-full blur-[120px] animate-pulse-slow z-0" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="inline-block text-brand-secondary font-bold tracking-[0.2em] uppercase mb-4 text-sm">Our Excellence</span>
            <h2 className="font-display text-4xl md:text-5xl text-white font-extrabold mb-4 relative z-10 drop-shadow-lg">
              Why Sri Lakshmi Travels?
              <div className="mx-auto mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-brand-secondary to-transparent rounded-full"></div>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🛡️', title: 'Verified Drivers', desc: 'Background-checked, licensed professionals' },
              { icon: '⚡', title: 'Instant Booking', desc: 'Confirm in under 2 minutes' },
              { icon: '💰', title: 'Best Prices', desc: 'Price-match guarantee, no hidden fees' },
              { icon: '🕐', title: '24/7 Support', desc: 'Always available by call or WhatsApp' },
              { icon: '🗺️', title: 'GPS Tracked', desc: 'Real-time vehicle tracking for safety' },
              { icon: '✨', title: 'Clean Vehicles', desc: 'Sanitized before every trip' }
            ].map((feature, idx) => (
              <div key={idx} className="relative group animate-on-scroll" style={{ animationDelay: `${idx * 100}ms` }}>
                {/* Glow behind the card on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-secondary/0 via-brand-secondary/30 to-brand-secondary/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>
                
                {/* Actual glass card */}
                <div className="relative h-full bg-brand-dark/60 backdrop-blur-md border border-brand-secondary/20 rounded-2xl p-8 hover:border-brand-secondary/60 hover:-translate-y-2 transition-all duration-500 shadow-2xl overflow-hidden">
                  {/* Subtle corner light effect */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-secondary/10 rounded-full blur-xl group-hover:bg-brand-secondary/20 transition-colors"></div>
                  
                  <div className="flex items-start gap-5 relative z-10">
                    <div className="w-14 h-14 rounded-full bg-brand-primary ring-1 ring-brand-secondary/30 shadow-[0_0_15px_rgba(212,160,23,0.15)] flex items-center justify-center text-2xl group-hover:bg-gradient-to-br group-hover:from-brand-primary group-hover:to-brand-secondary/20 group-hover:ring-brand-secondary/80 group-hover:scale-110 transition-all duration-500 cursor-default">
                      <span className="relative z-10 drop-shadow-md">{feature.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl text-white font-bold mb-2 group-hover:text-brand-secondary transition-colors duration-300">{feature.title}</h3>
                      <p className="text-brand-accent/70 font-medium leading-relaxed group-hover:text-brand-accent/90 transition-colors">{feature.desc}</p>
                    </div>
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
          <div className="animate-on-scroll relative px-2 md:px-8">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="pb-16 pt-4"
            >
              {packages.slice(0, 8).map((pkg, idx) => (
                <SwiperSlide key={pkg._id}>
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
                    <div className="w-full h-56 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <img src={pkg.imageUrl || pkg.image || getTourImage(pkg.destination)} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                      <span className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur text-brand-secondary border border-brand-secondary/30 px-3 py-1.5 text-[10px] font-extrabold uppercase rounded-lg shadow-lg z-20">
                        {pkg.duration}
                      </span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between bg-white relative z-20">
                      <div>
                        <h3 className="font-display text-xl font-bold text-brand-primary mb-3 group-hover:text-brand-secondary transition-colors line-clamp-1">{pkg.title}</h3>
                        
                        <div className="flex flex-wrap gap-2 mb-4" style={{perspective: '1000px'}}>
                          {pkg.highlights.map((feat, fidx) => (
                            <span key={fidx} className="group/feat cursor-default bg-gray-50 border border-gray-100 text-brand-primary px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-lg hover:z-30 transition-transform duration-300 hover:rotate-x-12 hover:-rotate-y-12 hover:scale-110 shadow-sm hover:shadow-xl hover:border-brand-secondary hover:bg-brand-secondary hover:text-white">
                              {feat}
                            </span>
                          ))}
                        </div>
                        
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{pkg.description}</p>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5 block">Package Price</span>
                          <span className="font-extrabold text-xl text-brand-primary">₹{pkg.price.toLocaleString('en-IN')}</span>
                        </div>
                        <Link to={`/booking?type=package&packageId=${pkg._id}`} className="bg-brand-primary text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 text-sm hover:bg-brand-secondary hover:text-brand-dark shadow-md hover:-translate-y-1">Book Today</Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
