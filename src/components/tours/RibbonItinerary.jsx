import React from 'react';
import { Star, MapPin, CheckCircle2 } from 'lucide-react';
import SafeImage from '../common/SafeImage';

export default function RibbonItinerary({ itinerary }) {
  if (!itinerary || itinerary.length === 0) return null;

  return (
    <div className="space-y-24 pb-20">
      {itinerary.map((day, index) => (
        <div key={index} id={`day-${index}`} className="group scroll-mt-32">
          {/* Day Ribbon Header */}
          <div className="relative flex items-center mb-10 overflow-hidden rounded-3xl">
            <div className="absolute inset-y-0 left-0 w-4 bg-brand-secondary z-10" />
            <div className="bg-brand-primary text-white w-full py-6 px-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-brand-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-1">Chapter {index + 1}</span>
                  <h3 className="text-2xl md:text-3xl font-display italic font-black">
                    Day {day.day || index + 1}: {day.title}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-sm border border-white/10">
                <MapPin className="w-4 h-4 text-brand-secondary" />
                <span className="font-bold opacity-90">{day.location || 'Exploring'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Description & Activities */}
            <div className="space-y-8 order-2 lg:order-1">
              <p className="text-neutral-600 text-lg leading-relaxed first-letter:text-4xl first-letter:font-display first-letter:italic first-letter:text-brand-primary first-letter:mr-3 first-letter:float-left">
                {day.desc || 'Continue your majestic journey through the most beautiful landscapes of India with our premium hospitality.'}
              </p>

              {/* Star-Bulleted List (Vetri Style) */}
              <div className="bg-brand-accent/50 p-8 rounded-[2rem] border border-neutral-100">
                <h4 className="text-brand-primary font-black uppercase text-xs tracking-widest mb-6 flex items-center gap-3">
                  <Star className="w-4 h-4 text-brand-secondary fill-brand-secondary" />
                  Planned Activities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(day.activities || ['Morning Sightseeing', 'Lunch at Local Restaurant', 'Historical Walk', 'Evening Leisure']).map((act, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                      <span className="text-neutral-700 text-sm font-medium">{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions Checkmarks */}
              <div className="flex flex-wrap gap-4 pt-4">
                {['Breakfast', 'Hotel Stay', 'Private Cab'].map((inc, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-100 rounded-full shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image Gallery */}
            <div className="order-1 lg:order-2">
              <div className="relative group overflow-hidden rounded-[3rem] shadow-2xl aspect-[4/3] bg-neutral-100 ring-8 ring-white">
                <SafeImage 
                  src={day.image} 
                  alt={day.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Image Label Overlay */}
                <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500">
                   <p className="text-white font-display italic text-xl drop-shadow-lg">{day.location}</p>
                </div>
              </div>
              
              {/* Optional secondary small image for "Premium Look" */}
              <div className="flex gap-4 mt-6">
                <div className="w-2/3 h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                   <SafeImage src={day.image} className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="w-1/3 h-32 bg-brand-primary rounded-2xl flex flex-col items-center justify-center text-white text-center p-4">
                   <span className="text-brand-secondary font-black text-2xl">★</span>
                   <span className="text-[8px] font-black uppercase tracking-tighter">Premium Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
