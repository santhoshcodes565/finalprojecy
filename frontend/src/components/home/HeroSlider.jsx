import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../../constants/images';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative h-screen overflow-hidden bg-brand-dark"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
    >
      {/* Background Image with Ken Burns */}
      <div className="absolute inset-0">
        <img
          key={currentSlide}
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
          onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg'; }}
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/50 to-transparent" />

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark/60 to-transparent" />

      {/* Slide Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-32 lg:pb-40">
        <div className="max-w-2xl" key={currentSlide}>
          {/* Eyebrow */}
          <span className="animate-slide-up inline-block text-xs font-semibold tracking-widest uppercase text-brand-secondary mb-4">
            {slide.eyebrow}
          </span>

          {/* Title */}
          <h1 className="animate-slide-up animation-delay-200 text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-1">
            {slide.title}
          </h1>

          {/* Italic Gold */}
          <h1 className="animate-slide-up animation-delay-400 text-3xl sm:text-4xl md:text-6xl font-extrabold italic text-shimmer leading-tight tracking-tight mb-4">
            {slide.italic}
          </h1>

          {/* Description */}
          <p className="animate-slide-up animation-delay-600 text-white/80 text-sm sm:text-base max-w-lg mt-4 leading-relaxed">
            {slide.desc}
          </p>

          {/* Buttons */}
          <div className="animate-slide-up animation-delay-600 flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              to="/packages"
              className="bg-brand-secondary text-brand-dark px-8 py-4 rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-brand-secondary/30 text-center btn-premium"
            >
              {slide.cta}
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-white hover:text-brand-dark transition-all text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Floating 3D Badge (desktop only) */}
      <div className="hidden lg:flex absolute top-32 right-12 xl:right-20 animate-float-slow">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-5 text-center">
          <div className="text-4xl font-extrabold text-brand-secondary">30+</div>
          <div className="text-white/90 text-xs font-semibold mt-1 tracking-wide">Years of Trust</div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-32 lg:bottom-40 right-6 lg:right-12 flex gap-3 z-20">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`rounded-full transition-all duration-300 ${
              currentSlide === idx
                ? 'w-8 h-2.5 bg-brand-secondary'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
