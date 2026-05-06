import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function AnimatedCarItinerary({ itinerary }) {
  const containerRef = useRef(null);
  
  // Track scroll progress within this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  if (!itinerary || itinerary.length === 0) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto py-32 overflow-hidden" ref={containerRef}>
      
      {/* Premium Minimal Background */}
      <div className="absolute inset-0 bg-neutral-50" />

      {/* The Clean Minimalist Road Strip (Light Concrete) */}
      {/* Making the road #e5e5e5 so that mix-blend-mode: darken seamlessly hides the white image background */}
      <div className="absolute left-[40px] md:left-1/2 top-0 bottom-0 w-24 md:-translate-x-1/2 bg-[#e5e5e5] rounded-full shadow-[inset_0_5px_15px_rgba(0,0,0,0.05)] overflow-hidden hidden md:block">
         {/* Dashed Center Line */}
         <div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-full opacity-60"
              style={{ backgroundImage: 'linear-gradient(to bottom, #a1a1aa 50%, transparent 50%)', backgroundSize: '100% 60px' }} />
      </div>

      {/* The Mobile Road */}
      <div className="absolute left-8 w-12 top-0 bottom-0 bg-[#e5e5e5] rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden md:hidden">
         <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full opacity-50"
              style={{ backgroundImage: 'linear-gradient(to bottom, #a1a1aa 50%, transparent 50%)', backgroundSize: '100% 40px' }} />
      </div>

      {/* The REAL Photorealistic Car with Headlights moving via Scroll */}
      <div className="absolute left-[34px] md:left-1/2 top-20 bottom-20 z-30 pointer-events-none md:-translate-x-1/2 w-20 md:w-28">
        <motion.div
           className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center transform"
           style={{ 
             top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
           }}
        >
          <div className="relative w-full">
            
            {/* The Headlights (Behind the car visually, pointing down) */}
            <div className="absolute top-[80%] left-[10%] w-6 md:w-10 h-24 md:h-32 bg-gradient-to-b from-yellow-300 via-yellow-200/40 to-transparent blur-[5px] rounded-b-full transform rotate-[-8deg] origin-top pointer-events-none opacity-80" 
                 style={{ mixBlendMode: 'darken' }} />
            <div className="absolute top-[80%] right-[10%] w-6 md:w-10 h-24 md:h-32 bg-gradient-to-b from-yellow-300 via-yellow-200/40 to-transparent blur-[5px] rounded-b-full transform rotate-[8deg] origin-top pointer-events-none opacity-80" 
                 style={{ mixBlendMode: 'darken' }} />

            {/* The Real Photorealistic Mahindra Thar Image */}
            <img 
              src="/images/thar-real-top.png" 
              alt="Mahindra Thar Real View" 
              className="w-full h-auto object-contain transform rotate-180 relative z-10"
              style={{
                /* The MAGIC: Darken blend mode removes pure white backgrounds entirely! */
                mixBlendMode: 'darken',
                filter: 'contrast(1.15) brightness(0.95)'
              }}
            />

          </div>
        </motion.div>
      </div>

      <div className="relative z-20 flex flex-col gap-24 md:gap-32 min-h-[1000px]">
        {itinerary.map((day, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={day.day} 
              className={`flex flex-col md:flex-row items-center relative py-12 px-4 sm:px-8 md:px-0`}
            >
              
              {/* Day Details Card */}
              <div className={`w-full pl-20 md:pl-0 md:w-1/2 flex flex-col ${isEven ? 'md:pr-24 md:items-end md:text-right' : 'md:ml-auto md:pl-24 md:items-start md:text-left'}`}>
                
                {/* Milestone Node on Road */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`absolute ${isEven ? 'md:right-1/2 md:translate-x-1/2' : 'md:left-1/2 md:-translate-x-1/2'} left-8 -translate-x-1/2 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-neutral-900 border-4 border-yellow-400 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.5)] z-20 flex items-center justify-center`}
                >
                   <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-400 rounded-full" />
                </motion.div>

                {/* Glassmorphism Premium Card */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-neutral-100 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 w-full md:max-w-md relative overflow-hidden group"
                >
                  <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-1.5 h-full bg-gradient-to-b from-brand-secondary to-yellow-500`} />
                  
                  <span className="inline-flex items-center gap-2 text-brand-dark/50 text-[11px] font-black uppercase tracking-[0.3em] mb-6 border border-neutral-200 px-4 py-2 rounded-full">
                    Day {day.day}
                  </span>
                  
                  <h3 className="text-3xl font-black text-brand-dark mb-6 leading-tight tracking-tight">
                    {day.title}
                  </h3>
                  
                  <div className={`flex items-center gap-2 mb-8 bg-neutral-50/50 w-fit px-4 py-2.5 rounded-xl border border-neutral-100 ${isEven ? 'ml-auto' : 'mr-auto'}`}>
                    <MapPin size={18} className="text-brand-secondary" />
                    <span className="text-xs font-bold uppercase tracking-[0.1em] text-neutral-700">
                      {day.location}
                    </span>
                  </div>
                  
                  <p className="text-neutral-500 text-sm md:text-base leading-relaxed tracking-wide">
                    {day.desc}
                  </p>
                </motion.div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
