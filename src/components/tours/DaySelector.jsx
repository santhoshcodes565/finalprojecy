import React from 'react';
import { Calendar, MapPin, Camera, Utensils, Hotel, Car } from 'lucide-react';

const getDayIcon = (index) => {
  const icons = [Calendar, MapPin, Hotel, Camera, Utensils, Car];
  const Icon = icons[index % icons.length];
  return <Icon className="w-5 h-5" />;
};

export default function DaySelector({ itinerary, activeDay, onDayClick }) {
  if (!itinerary || itinerary.length === 0) return null;

  return (
    <div className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-xl border-y border-neutral-100 shadow-sm overflow-x-auto no-scrollbar py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
        {itinerary.map((day, index) => (
          <button
            key={index}
            onClick={() => onDayClick(index)}
            className={`flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 ${
              activeDay === index 
                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-105' 
                : 'bg-brand-accent text-neutral-500 hover:bg-neutral-100'
            }`}
          >
            <div className={`${activeDay === index ? 'text-brand-secondary' : 'text-neutral-400'}`}>
              {getDayIcon(index)}
            </div>
            <span className="font-black text-sm uppercase tracking-widest">
              Day {day.day || index + 1}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
