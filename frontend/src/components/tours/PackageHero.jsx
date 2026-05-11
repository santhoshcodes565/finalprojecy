import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SafeImage from '../common/SafeImage';

export default function PackageHero({ pkg }) {
  if (!pkg) return null;

  return (
    <div className="relative h-[60vh] min-h-[450px] w-full overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 animate-ken-burns">
        <SafeImage 
          src={pkg.bannerImage || pkg.image} 
          alt={pkg.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center text-white">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-8 text-sm font-medium animate-fade-in opacity-80">
          <Link to="/" className="hover:text-brand-secondary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/packages" className="hover:text-brand-secondary transition-colors">Packages</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-brand-secondary">{pkg.states || 'Tour'}</span>
        </div>

        {/* Title with Vertical Line Accent */}
        <div className="flex items-stretch gap-6 animate-fade-up">
          <div className="w-2 bg-brand-secondary rounded-full shadow-lg shadow-brand-secondary/20" />
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display italic font-black leading-tight drop-shadow-2xl">
              {pkg.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-xl md:text-2xl font-medium opacity-90">
               <span className="px-4 py-1 bg-brand-primary/80 backdrop-blur-md rounded-lg border border-white/10 shadow-xl">
                 {pkg.duration}
               </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Curve/Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-accent to-transparent" />
    </div>
  );
}
