import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MapPin, Compass } from 'lucide-react';

// Individual Card Component to handle isolated scroll computations
const DayCard = ({ day, index, totalLength, smoothProgress, isEven }) => {
  // Approximate progress point where the car will be aligned with this card.
  // For N items, they are roughly at fractions: 0/(N-1), 1/(N-1), etc.
  // We add a tiny buffer so 0 is slightly down the page.
  const P = Math.max(0, Math.min(1, index / (totalLength - 1)));

  // "Cards not yet visited are slightly dimmed (60%). Visited stay full brightness"
  const cardOpacity = useTransform(smoothProgress, [P - 0.1, P], [0.5, 1]);
  
  // "As the car drives past, that card glows, scales up (1.05), and pulses"
  const cardScale = useTransform(smoothProgress, [P - 0.1, P, P + 0.1], [1, 1.05, 1]);
  const haloOpacity = useTransform(smoothProgress, [P - 0.1, P, P + 0.1], [0, 1, 0]);

  return (
    <div className={`flex flex-col md:flex-row items-center relative py-12 px-4 sm:px-8 md:px-0 w-full`}>
      <div className={`w-full pl-20 md:pl-0 md:w-1/2 flex flex-col ${isEven ? 'md:pr-24 md:items-end md:text-right' : 'md:ml-auto md:pl-24 md:items-start md:text-left'}`}>
        
        {/* Node on road */}
        <motion.div 
          className={`absolute ${isEven ? 'md:right-1/2 md:translate-x-1/2' : 'md:left-1/2 md:-translate-x-1/2'} left-8 -translate-x-1/2 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-[#1e1e1e] border-4 border-[#D4A017] rounded-full shadow-[0_0_15px_#D4A017] z-20 flex items-center justify-center`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, delay: index * 0.1 + 0.3 }}
        >
          <motion.div 
            className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D4A017] rounded-full"
            style={{ opacity: cardOpacity }}
          />
        </motion.div>

        {/* Magazine Style Card Container */}
        <motion.div 
          className="relative w-full md:max-w-xl group"
          style={{ opacity: cardOpacity, scale: cardScale }}
          initial={{ opacity: 0, x: isEven ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: index * 0.15 }} // 150ms stagger
        >
          {/* Subtle Parallax Inner Halo & Shadow */}
          <motion.div 
            className="absolute -inset-4 rounded-[2rem] bg-gradient-radial from-[#D4A017]/60 to-transparent blur-2xl z-0 pointer-events-none"
            style={{ 
              opacity: haloOpacity,
              y: useTransform(smoothProgress, [0, 1], [-20, 20]) // subtle inner parallax relative to content
            }}
          />

          <div className="bg-[#FFFFFF] p-8 md:p-12 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-neutral-100 relative z-10 overflow-hidden w-full transition-shadow hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)]">
            
            {/* Soft inner glow trace */}
            <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-1.5 h-full bg-[#1A3C5E] z-20`} />

            {/* Premium Inset Image */}
            <div className={`relative -mt-8 -mx-8 md:-mx-12 md:-mt-12 mb-8 h-48 md:h-64 overflow-hidden rounded-t-[2rem] ${isEven ? 'mr-1.5' : 'ml-1.5'}`}>
              {day.image ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] to-transparent z-10 h-full" />
                  <img 
                    src={day.image} 
                    alt={day.title} 
                    className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                  />
                </>
              ) : (
                <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
              )}
              {/* Day Badge overlaying the image */}
              <div className={`absolute top-6 left-6 z-20 inline-flex items-center gap-2 bg-[#1A3C5E] text-white font-black uppercase text-xs md:text-sm tracking-[0.2em] px-5 py-2.5 rounded-full shadow-lg`}>
                <Compass size={16} className="text-[#D4A017]" /> Day {day.day}
              </div>
            </div>

            <div className="flex flex-col w-full relative z-10">
              {/* Massive Location/Title Name */}
              <h3 className="text-3xl md:text-4xl font-black text-[#1A3C5E] mb-5 leading-[1.1] tracking-tight">
                {day.title}
              </h3>
              
              {/* Activity/Location tag */}
              <div className={`flex items-center gap-2 mb-6 bg-[#D4A017]/10 text-[#D4A017] w-fit px-4 py-2 rounded-xl shadow-sm border border-[#D4A017]/20 font-bold mr-auto`}>
                <MapPin size={16} />
                <span className="text-xs uppercase tracking-[0.1em] mt-0.5">
                  {day.location}
                </span>
              </div>
              
              {/* Description body */}
              <p className="text-[#4B5563] text-sm md:text-base leading-relaxed font-medium">
                {day.desc}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default function RoadTimeline3D({ itinerary }) {
  const containerRef = useRef(null);
  
  // Track scroll progress within this entire list wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"] // Maps 0 at center-start to 1 at center-end
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 15,
    restDelta: 0.001
  });

  if (!itinerary || itinerary.length === 0) return null;

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto py-24 md:py-32 overflow-hidden" 
      ref={containerRef}
    >
      
      {/* Background purely clean */}
      <div className="absolute inset-0 bg-[#faf8f2]" />

      {/* The Central Ink Road */}
      <div className="absolute left-[40px] md:left-1/2 top-0 bottom-0 w-24 md:-translate-x-1/2 flex justify-center z-0 hidden md:flex" style={{ perspective: "1000px" }}>
        
        {/* Ink Draw Entrance */}
        <motion.div 
          className="absolute top-0 bottom-0 w-20 bg-[#1e1e1e] rounded-full shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] border border-white/5 overflow-hidden origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Bright White Dashes Parallaxing slightly */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 w-2 h-[200%] opacity-80"
            style={{ 
              backgroundImage: 'linear-gradient(to bottom, #FFFFFF 50%, transparent 50%)', 
              backgroundSize: '100% 120px',
              y: useTransform(smoothProgress, [0, 1], ["0%", "50%"])
            }} 
          />
        </motion.div>
      </div>

      {/* Mobile Road - simplified ink draw */}
      <div className="absolute left-8 w-12 top-0 bottom-0 flex justify-center md:hidden z-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 bottom-0 w-10 bg-[#1e1e1e] rounded-full shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] origin-top overflow-hidden"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <motion.div 
             className="absolute left-1/2 -translate-x-1/2 w-1.5 h-[200%] opacity-80"
             style={{ 
               backgroundImage: 'linear-gradient(to bottom, #FFFFFF 50%, transparent 50%)', 
               backgroundSize: '100% 80px',
               y: useTransform(smoothProgress, [0, 1], ["0%", "50%"])
             }} 
          />
        </motion.div>
      </div>

      {/* The Scroll-Linked Driving Car */}
      <div className="absolute left-[34px] md:left-1/2 top-10 bottom-10 z-30 pointer-events-none md:-translate-x-1/2 w-24 md:w-32">
        <motion.div
           className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center transform"
           style={{ top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
        >
          <div className="relative w-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)]">
            
            {/* Subtle Headlight Glows */}
            <div className="absolute top-[85%] left-[12%] w-6 md:w-10 h-32 md:h-48 bg-gradient-to-b from-[#D4A017] via-[#D4A017]/40 to-transparent blur-[8px] rounded-b-full transform rotate-[-8deg] origin-top opacity-60 mix-blend-multiply" />
            <div className="absolute top-[85%] right-[12%] w-6 md:w-10 h-32 md:h-48 bg-gradient-to-b from-[#D4A017] via-[#D4A017]/40 to-transparent blur-[8px] rounded-b-full transform rotate-[8deg] origin-top opacity-60 mix-blend-multiply" />

            {/* The Photorealistic Mahindra Thar */}
            <img 
              src="/images/thar-real-top.png" 
              alt="Car traversing timeline" 
              className="w-full h-auto object-contain transform rotate-180 relative z-10 filter contrast-125 brightness-95"
            />
          </div>
        </motion.div>
      </div>

      {/* Magazine Sequence Container */}
      <div className="relative z-20 flex flex-col gap-24 md:gap-32 min-h-[500px]">
        {itinerary.map((day, index) => (
          <DayCard 
            key={day.day} 
            day={day} 
            index={index} 
            totalLength={itinerary.length} 
            smoothProgress={smoothProgress} 
            isEven={index % 2 === 0} 
          />
        ))}
      </div>
    </div>
  );
}
