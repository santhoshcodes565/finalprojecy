import React from 'react';
import { MapPin, Compass, Calendar, Camera } from 'lucide-react';
import { ITINERARY_IMAGES } from '../../constants/images';
import { getPlaceImage } from '../../constants/placeImages';
import SafeImage from '../common/SafeImage';

export default function SimpleItinerary({ itinerary }) {
  if (!itinerary || itinerary.length === 0) return null;

  return (
    <div className="flex flex-col gap-12 w-full pb-20 relative">
      {/* Vertical Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-secondary/40 via-brand-secondary/10 to-transparent hidden lg:block" />

      {itinerary.map((day, index) => {
        const isEven = index % 2 === 1;
        
        return (
          <div 
            key={day.day || index} 
            className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center w-full relative group`}
          >
            {/* Timeline Dot (Desktop) */}
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-secondary border-4 border-brand-accent z-20 hidden lg:block group-hover:scale-125 transition-transform duration-300" />
            
            {/* Image Section */}
            <div className={`w-full lg:w-1/2 ${isEven ? 'lg:order-2' : ''}`}>
              <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl aspect-[16/10] bg-neutral-100">
                <SafeImage 
                  src={day.image || ITINERARY_IMAGES[index] || getPlaceImage(day.location) || `https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=800&auto=format&fit=crop`} 
                  alt={day.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 left-6">
                  <div className="flex items-center gap-2 bg-brand-secondary text-brand-dark px-4 py-2 rounded-full font-black text-xs tracking-widest shadow-lg">
                    <Compass className="w-3.5 h-3.5" />
                    DAY {day.day || index+1}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className={`w-full lg:w-1/2 flex flex-col ${isEven ? 'lg:text-right lg:items-end' : 'lg:text-left lg:items-start'}`}>
              <div className="flex items-center gap-3 mb-4 text-brand-secondary">
                <MapPin size={18} className="shrink-0" />
                <span className="font-bold text-sm tracking-[0.2em] uppercase">{day.location || 'Exploring Destination'}</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black text-brand-primary mb-5 leading-tight font-display italic">
                {day.title}
              </h3>
              
              <div className={`w-12 h-1 bg-brand-secondary/30 rounded-full mb-6 ${isEven ? 'lg:ml-auto' : ''}`} />
              
              <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-xl">
                {day.desc || 'Continue your majestic journey through the most beautiful landscapes of India with our premium hospitality.'}
              </p>
              
              <div className={`flex gap-4 mt-8 ${isEven ? 'lg:justify-end' : ''}`}>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> Duration: Full Day
                </span>
                <span className="text-neutral-200">|</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold flex items-center gap-1.5">
                  <Camera className="w-3 h-3" /> Attractions: Included
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
