import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Shield, 
  Search, 
  MapPin, 
  Languages, 
  Award, 
  Clock, 
  HeartHandshake, 
  BadgeCheck,
  UserCheck,
  PhoneCall,
  MessageCircle,
  Filter,
  CheckCircle2,
  Users,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import api from '../api/axios';
import SafeImage from '../components/common/SafeImage';
import { DRIVER_IMAGES, DRIVER_BANNER } from '../constants/images';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, translateY: 30 },
  visible: { opacity: 1, translateY: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function HireDriver() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [experienceFilter, setExperienceFilter] = useState(0);
  const [priceRange, setPriceRange] = useState(2000);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await api.get('/drivers');
        // Add some mock cities and price for premium feel if missing
        const augmentedDrivers = (res.data.drivers || []).map((d, i) => ({
          ...d,
          city: d.city || ['Chennai', 'Madurai', 'Coimbatore', 'Ooty', 'Trichy'][i % 5],
          pricePerDay: d.pricePerDay || [600, 800, 1000, 1200, 1500][i % 5],
          image: d.image || DRIVER_IMAGES[i % DRIVER_IMAGES.length],
        }));
        setDrivers(augmentedDrivers);
      } catch (err) {
        console.error('Failed to fetch drivers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, []);

  // Filtered Drivers Logic
  const filteredDrivers = useMemo(() => {
    return drivers.filter(driver => {
      const matchesSearch = driver.name.toLowerCase().includes(search.toLowerCase()) || 
                           driver.bio.toLowerCase().includes(search.toLowerCase());
      const matchesCity = selectedCity === '' || driver.city === selectedCity;
      const matchesLanguage = selectedLanguage === '' || driver.languages?.some(l => l.toLowerCase().includes(selectedLanguage.toLowerCase()));
      const matchesExperience = driver.experience >= experienceFilter;
      const matchesPrice = driver.pricePerDay <= priceRange;
      const matchesAvailability = availabilityFilter === 'all' || (availabilityFilter === 'available' ? driver.isAvailable : !driver.isAvailable);
      
      return matchesSearch && matchesCity && matchesLanguage && matchesExperience && matchesPrice && matchesAvailability;
    });
  }, [drivers, search, selectedCity, selectedLanguage, experienceFilter, priceRange, availabilityFilter]);

  if (loading) {
    return (
      <div className="bg-brand-accent min-h-screen flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-brand-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-brand-secondary rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-brand-primary font-bold text-xl tracking-widest animate-pulse uppercase">Verifying Top Drivers...</p>
      </div>
    );
  }

  return (
    <div className="bg-brand-accent min-h-screen pt-16">
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Background Overlay Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={DRIVER_BANNER} 
            alt="Professional Driver Service" 
            className="w-full h-full object-cover animate-ken-burns scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/80 via-brand-primary/40 to-transparent"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.span 
              variants={fadeInUp}
              className="inline-block py-1.5 px-4 bg-brand-secondary/20 border border-brand-secondary/30 rounded-full text-brand-secondary text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm"
            >
              Certified Professionals
            </motion.span>
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-display font-extrabold text-white mb-6 leading-tight"
            >
              Your Safety is <br/> 
              Our <span className="text-brand-secondary italic decoration-brand-secondary underline underline-offset-8">Priority.</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-white/80 text-lg md:text-xl mb-10 max-w-xl leading-relaxed"
            >
              Hire trusted, verified and experienced drivers for safe travel across South India. Bilingual experts who know the roads like home.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-4">
              <button 
                onClick={() => document.getElementById('drivers-list').scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-secondary text-brand-primary font-bold px-8 py-4 rounded-xl shadow-2xl hover:bg-brand-secondary/90 hover:-translate-y-1 transition-all duration-300"
              >
                Book a Driver
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300">
                Contact Support
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. SEARCH + FILTER BAR */}
      <section className="relative -mt-16 z-20 px-4">
        <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400 mb-2 block ml-1">Search Driver</label>
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input 
                  type="text" 
                  placeholder="e.g. Murugan" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-neutral-100 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold text-brand-primary focus:ring-2 focus:ring-brand-secondary outline-none transition-all"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400 mb-2 block ml-1">Preferred City</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-neutral-100 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold text-brand-primary focus:ring-2 focus:ring-brand-secondary outline-none transition-all appearance-none"
                >
                  <option value="">All Cities</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Ooty">Ooty</option>
                  <option value="Trichy">Trichy</option>
                </select>
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400 mb-2 block ml-1">Language</label>
              <div className="relative">
                <Languages size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-neutral-100 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold text-brand-primary focus:ring-2 focus:ring-brand-secondary outline-none transition-all appearance-none"
                >
                  <option value="">Any Language</option>
                  <option value="Tamil">Tamil</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Kannada">Kannada</option>
                </select>
              </div>
            </div>

            {/* Exp Filter */}
            <div>
              <label className="text-[10px] uppercase tracking-widest font-extrabold text-neutral-400 mb-2 block ml-1">Min Experience: {experienceFilter}+ Yrs</label>
              <div className="pt-4 px-2">
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(parseInt(e.target.value))}
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-secondary"
                />
                <div className="flex justify-between text-[8px] font-bold text-neutral-400 mt-2 uppercase tracking-tighter">
                  <span>0 Yrs</span>
                  <span>15 Yrs</span>
                  <span>30+ Yrs</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-6">
             <div className="flex gap-4">
                <div className="flex items-center gap-3 bg-neutral-50 px-5 py-3 rounded-2xl border border-neutral-100">
                  <Filter size={14} className="text-brand-secondary" />
                  <span className="text-xs font-extrabold text-neutral-500 uppercase tracking-widest">Pricing: ₹{priceRange}/Day</span>
                  <input 
                    type="range" 
                    min="400" 
                    max="3000" 
                    step="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-24 h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-secondary"
                  />
                </div>
                <div className="flex items-center gap-3 bg-neutral-50 px-5 py-3 rounded-2xl border border-neutral-100">
                  <CheckCircle2 size={14} className="text-brand-secondary" />
                  <select 
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="bg-transparent text-xs font-extrabold text-neutral-500 uppercase tracking-widest border-none p-0 outline-none"
                  >
                    <option value="all">Availability: All</option>
                    <option value="available">Only Available</option>
                  </select>
                </div>
             </div>

             <div className="text-xs font-bold text-neutral-400 italic">
               Showing {filteredDrivers.length} verified drivers matching your criteria
             </div>
          </div>
        </div>
      </section>

      {/* 3. DRIVER GRID SECTION */}
      <section id="drivers-list" className="py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredDrivers.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-40"
              >
                <div className="inline-block p-10 bg-white rounded-full shadow-inner mb-6">
                   <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-300">
                     <Search size={32} />
                   </div>
                </div>
                <h2 className="text-2xl font-bold text-brand-primary mb-2">No matching drivers found</h2>
                <p className="text-neutral-500">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => {
                    setSearch('');
                    setSelectedCity('');
                    setSelectedLanguage('');
                    setExperienceFilter(0);
                    setPriceRange(2000);
                  }}
                  className="mt-8 text-brand-secondary font-bold underline underline-offset-4"
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14"
                layout
              >
                {filteredDrivers.map((driver) => (
                  <motion.div
                    key={driver._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group bg-white rounded-[2rem] shadow-xl hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 border border-neutral-100 flex flex-col md:flex-row overflow-hidden relative"
                  >
                    {/* LEFT SIDE: Image + Badges (Dark Theme Accent) */}
                    <div className="md:w-2/5 relative bg-brand-primary p-8 flex flex-col items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-luxury-pattern opacity-10 pointer-events-none"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                      
                      <div className="relative z-10 w-full max-w-[200px] aspect-[4/5] mb-6">
                        <SafeImage
                          src={driver.image}
                          alt={driver.name}
                          className="w-full h-full object-cover rounded-2xl shadow-2xl ring-4 ring-brand-secondary/30 group-hover:ring-brand-secondary transition-all duration-500"
                        />
                        <div className="absolute -bottom-4 -right-4 bg-brand-secondary text-brand-primary px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 shadow-lg shadow-brand-secondary/30 border-2 border-brand-primary">
                          <CheckCircle2 size={12} /> Verified
                        </div>
                      </div>

                      <div className="text-center z-10 w-full mt-2">
                        <div className="flex items-center justify-center gap-1 mb-3 bg-white/10 w-max mx-auto px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                           {[...Array(5)].map((_, i) => (
                             <Star 
                               key={i} 
                               size={14} 
                               className={`${i < Math.floor(driver.rating) ? 'text-brand-secondary fill-brand-secondary' : 'text-neutral-500'}`} 
                             />
                           ))}
                           <span className="ml-1 font-extrabold text-white text-xs">{driver.rating}</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/20 rounded-xl p-3 border border-white/5">
                           <div className="text-center flex-1">
                             <span className="text-[9px] font-extrabold text-brand-secondary uppercase tracking-widest block mb-0.5">Trips</span>
                             <span className="font-display font-bold text-lg text-white">{driver.trips}+</span>
                           </div>
                           <div className="w-px h-8 bg-white/10 mx-2"></div>
                           <div className="text-center flex-1">
                             <span className="text-[9px] font-extrabold text-brand-secondary uppercase tracking-widest block mb-0.5">Exp</span>
                             <span className="font-display font-bold text-lg text-white">{driver.experience}y</span>
                           </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SIDE: Info (Light Theme) */}
                    <div className="flex-1 p-8 md:p-10 space-y-6 relative bg-gradient-to-br from-white to-neutral-50">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h2 className="text-3xl font-display font-extrabold text-brand-primary mb-2">{driver.name}</h2>
                          <div className="inline-flex items-center gap-1.5 text-neutral-500 font-semibold text-sm">
                            <MapPin size={16} className="text-brand-secondary" /> {driver.city}
                          </div>
                        </div>
                        <div className="bg-brand-accent px-5 py-3 rounded-2xl border border-brand-primary/10 text-center shadow-inner">
                          <div className="text-2xl font-extrabold text-brand-primary">₹{driver.pricePerDay}</div>
                          <div className="text-[9px] font-extrabold text-brand-secondary uppercase tracking-[0.2em]">Per Day</div>
                        </div>
                      </div>

                      <div className="w-full h-px bg-gradient-to-r from-neutral-200 via-neutral-100 to-transparent"></div>

                      <div className="space-y-4">
                        <div>
                          <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest block mb-2 flex items-center gap-2">
                            <Languages size={12} className="text-brand-secondary" /> Languages Spoken
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {driver.languages?.map((lang, idx) => (
                              <span key={idx} className="bg-white px-4 py-1.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600 shadow-sm">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                           <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest block mb-2 flex items-center gap-2">
                            <BadgeCheck size={12} className="text-brand-secondary" /> Professional Bio
                          </span>
                          <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3 bg-white p-4 rounded-xl border border-neutral-100 shadow-sm italic relative">
                            <span className="absolute top-2 left-2 text-4xl text-neutral-100 font-serif leading-none">"</span>
                            <span className="relative z-10">{driver.bio}</span>
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 grid grid-cols-2 lg:grid-cols-3 gap-3">
                        <Link 
                          to={`/book/driver/${driver._id}`}
                          className="lg:col-span-2 flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20 transition-all group/btn"
                        >
                          Hire {driver.name.split(' ')[0]} Now
                          <motion.span className="group-hover/btn:translate-x-1 transition-transform">→</motion.span>
                        </Link>
                        <a 
                          href="https://wa.me/919876543210" 
                          target="_blank" 
                          className="flex items-center justify-center gap-2 py-4 rounded-xl bg-[#25D366]/10 text-[#25D366] font-bold text-sm hover:bg-[#25D366]/20 transition-all border border-[#25D366]/20"
                        >
                          <MessageCircle size={16} /> Chat
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. WHY CHOOSE OUR DRIVERS */}
      <section className="py-24 bg-brand-primary overflow-hidden relative">
        <div className="absolute inset-0 bg-luxury-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6">Why Choose Our Drivers</h2>
            <p className="text-brand-accent/60 max-w-xl mx-auto text-lg leading-relaxed font-medium mt-4">
              We sets the benchmark for road travel security and comfort in India.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {[
              { icon: <Shield size={32} />, title: "Verified Professionals", desc: "Every driver undergoes multiple levels of verification." },
              { icon: <BadgeCheck size={32} />, title: "Safe Travel", desc: "Proven track record with zero-accident policy training." },
              { icon: <UserCheck size={32} />, title: "Local Experts", desc: "Fluent in local languages and hidden gems knowledge." },
              { icon: <Briefcase size={32} />, title: "Transparent Pricing", desc: "No hidden charges. Pay what you see on the platform." },
              { icon: <PhoneCall size={32} />, title: "24/7 Support", desc: "Emergency assistance and live tracking always active." },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-brand-secondary mb-8 group-hover:scale-110 group-hover:bg-brand-secondary group-hover:text-brand-primary transition-all duration-500 shadow-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-white font-extrabold text-lg mb-4">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRUST SECTION (CAROUSEL) */}
      <section className="py-24 bg-brand-accent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                 <span className="text-brand-secondary font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Proven Trust</span>
                 <h2 className="text-4xl md:text-5xl font-display font-extrabold text-brand-primary leading-tight">What Our Travelers <span className="text-brand-secondary">Value.</span></h2>
              </div>
              <div className="flex gap-4">
                 <button className="swiper-prev-reviews w-14 h-14 rounded-full border border-neutral-200 text-neutral-400 flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-xl">
                   <Filter size={20} className="rotate-90" />
                 </button>
                 <button className="swiper-next-reviews w-14 h-14 rounded-full bg-brand-primary text-white flex items-center justify-center hover:brightness-110 transition-all shadow-xl shadow-brand-primary/20">
                   <Filter size={20} className="-rotate-90" />
                 </button>
              </div>
           </div>

           <Swiper
             modules={[Autoplay, Pagination, Navigation]}
             spaceBetween={30}
             slidesPerView={1}
             breakpoints={{
               768: { slidesPerView: 2 },
               1024: { slidesPerView: 3 }
             }}
             loop={true}
             autoplay={{ delay: 4000, disableOnInteraction: false }}
             navigation={{
               prevEl: '.swiper-prev-reviews',
               nextEl: '.swiper-next-reviews',
             }}
             className="!pb-20"
           >
             {[
               { name: 'Arun Varma', role: 'Adventure Traveler', comment: 'Booked Murugan for our Ooty trip. His knowledge of the local hairpins and secret viewpoints made our honeymoon unforgettable. Highly recommend!', rating: 5 },
               { name: 'Sarah Joseph', role: 'Business Executive', comment: 'Punctuality is everything for me. My driver arrived 15 mins early for the airport pickup and was extremely professional throughout.', rating: 5 },
               { name: 'Karthik S', role: 'Family Group', comment: 'The safest driver I’ve ever hired. We had 2 small kids, and he ensured the drive from Chennai to Madurai was smooth and risk-free.', rating: 4.8 },
               { name: 'Megha Rao', role: 'Solo Traveler', comment: 'As a woman traveling solo, safety was my concern. Sri Lakshmi Travels provided a highly vetted driver who was respectful and helpful.', rating: 5 },
             ].map((review, idx) => (
               <SwiperSlide key={idx} className="h-auto">
                 <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl border border-neutral-100 flex flex-col h-full hover:-translate-y-2 transition-all duration-500">
                    <div className="flex gap-1 text-brand-secondary mb-8">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} size={16} fill={i < Math.floor(review.rating) ? "currentColor" : "none"} />
                       ))}
                    </div>
                    <p className="text-neutral-500 italic text-lg leading-relaxed flex-1 mb-8">"{review.comment}"</p>
                    <div className="flex items-center gap-4 pt-6 border-t border-neutral-100 mt-auto">
                       <div className="w-14 h-14 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary font-extrabold text-xl">
                          {review.name.charAt(0)}
                       </div>
                       <div>
                          <h4 className="font-extrabold text-brand-primary">{review.name}</h4>
                          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{review.role}</p>
                       </div>
                    </div>
                 </div>
               </SwiperSlide>
             ))}
           </Swiper>
        </div>
      </section>

      {/* 6. CALL TO ACTION FOOTER */}
      <section className="py-24 px-4 bg-brand-accent">
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="max-w-7xl mx-auto rounded-[3rem] bg-brand-primary p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12"
        >
           {/* Background Accents */}
           <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-secondary/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-light/10 rounded-full blur-[100px] pointer-events-none"></div>
           
           <div className="relative z-10 max-w-xl text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-6 leading-tight">Need a Trusted Driver <span className="text-brand-secondary">Today?</span></h2>
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                Connect with our team for emergency bookings, corporate bulk hiring, or long-term travel plans.
              </p>
           </div>

           <div className="relative z-10 flex flex-col sm:flex-row gap-6">
               <button 
                 onClick={() => document.getElementById('drivers-list').scrollIntoView({ behavior: 'smooth' })}
                 className="bg-brand-secondary text-brand-primary px-10 py-5 rounded-2xl font-extrabold text-lg shadow-2xl hover:-translate-y-1 transition-all shadow-brand-secondary/20 hover:scale-105 active:scale-95">
                 Book Now
               </button>
              <button className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-10 py-5 rounded-2xl font-extrabold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3 group">
                <PhoneCall size={24} className="text-brand-secondary group-hover:animate-bounce" /> Call Support
              </button>
           </div>
        </motion.div>
      </section>
    </div>
  );
}
