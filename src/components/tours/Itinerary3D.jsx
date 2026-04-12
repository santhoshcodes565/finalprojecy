import React from 'react';

export default function Itinerary3D({ itinerary }) {
  if (!itinerary || itinerary.length === 0) return null;

  return (
    <div className="w-full relative bg-[#0a0a0a] text-white py-20 pb-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-32">
          <span className="text-brand-secondary font-black text-[10px] uppercase tracking-[0.3em] block mb-3">
            Day by Day
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-white">
            YOUR JOURNEY
          </h2>
        </div>
        
        <div className="relative">
          {/* Vertical progress line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-white/10 md:-translate-x-1/2 rounded-full hidden md:block"></div>

          <div className="space-y-16 md:space-y-0">
            {itinerary.map((day, i) => {
              const isEven = i % 2 === 0;
              return (
                <div 
                  key={day.day} 
                  className="sticky flex flex-col md:flex-row items-center gap-8 md:gap-16 justify-center transition-all duration-700"
                  style={{ top: `${(i * 30) + 120}px`, zIndex: i }}
                >
                  
                  {/* Image Card */}
                  <div className={`w-full md:w-[45%] h-80 md:h-[50vh] rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 relative ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <img 
                      src={day.image} 
                      alt={day.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <span className="bg-brand-secondary text-brand-dark px-4 py-1.5 text-xs font-black uppercase tracking-widest rounded-lg shadow-xl">
                        {day.location}
                      </span>
                      <span className="text-white/50 font-black text-sm tracking-widest uppercase">
                        {day.dateString}
                      </span>
                    </div>
                  </div>

                  {/* Connecting Node for wide screens */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-brand-secondary rounded-full border-4 border-[#0a0a0a] z-10 shadow-[0_0_20px_rgba(201,151,58,0.5)] justify-center items-center">
                    <div className="w-2 h-2 bg-brand-dark rounded-full"></div>
                  </div>

                  {/* Text Details */}
                  <div className={`w-full md:w-[45%] bg-black/40 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl ${isEven ? 'md:order-2 text-left' : 'md:order-1 md:text-right flex flex-col md:items-end'}`}>
                    <h3 className="text-brand-primary text-xs font-black uppercase tracking-[0.4em] mb-4">
                      Day {day.day}
                    </h3>
                    <h4 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white drop-shadow-lg">
                      {day.title}
                    </h4>
                    <p className={`text-white/70 text-base md:text-lg leading-relaxed font-medium ${isEven ? 'pr-4' : 'pl-4'}`}>
                      {day.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
