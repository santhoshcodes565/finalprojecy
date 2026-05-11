import React, { useEffect, useRef } from 'react';

export default function Banner3D() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20; // max rotation 20deg
      const y = (clientY / window.innerHeight - 0.5) * 20;

      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.05, 1.05, 1.05)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-brand-dark flex items-center justify-center">
      
      {/* 3D Container */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 w-full h-full transition-transform duration-200 ease-out origin-center"
      >
        {/* Layer 1: Background Mountain (Real Image) */}
        <div 
          className="absolute inset-[-5%] w-[110%] h-[110%] bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg')",
            transform: 'translateZ(-50px) scale(1.1)' 
          }}
        ></div>

        {/* Layer 2: Gradient 3D Animation Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent transform translate-z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/60 to-transparent transform translate-z-20"></div>
        
        {/* Layer 3: The Thar/SUV driving on the mountain (Real Image overlay, cropped via cover or position) */}
        <div 
          className="absolute bottom-10 right-10 md:bottom-20 md:right-32 w-64 h-64 md:w-96 md:h-96 bg-contain bg-no-repeat bg-bottom group"
          style={{ 
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg')",
            transform: 'translateZ(60px)',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
            borderRadius: '16px'
          }}
        >
          {/* Simulated climbing animation */}
          <div className="w-full h-full animate-[float_4s_ease-in-out_infinite] opacity-50 bg-brand-secondary/20 mix-blend-overlay"></div>
        </div>
      </div>

      {/* Floating Particles (Dust/Mist effect in 3D space) */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white blur-[2px] animate-pulse"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDuration: (Math.random() * 3 + 2) + 's',
              animationDelay: Math.random() * 2 + 's'
            }}
          ></div>
        ))}
      </div>

      {/* Hero Text Content (Translates in Z for deep 3D pop) */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col items-start pointer-events-none">
        <span className="inline-block text-brand-secondary font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full border border-brand-secondary/40 bg-brand-secondary/10 backdrop-blur-sm shadow-xl shadow-brand-secondary/10 animate-[fadeInUp_0.8s_ease-out_forwards]">
          Premium Travel Experience
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight tracking-tight max-w-4xl drop-shadow-2xl opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          Conquer the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-yellow-200">Mountains</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-brand-accent/90 max-w-2xl font-medium drop-shadow-lg opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
          Experience the thrill of exploring Tamil Nadu's peaks in our premium fleet of SUVs and Thars. Real journeys, driven by 30+ years of trust.
        </p>
        
        <div className="mt-10 flex flex-wrap gap-4 pointer-events-auto opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
          <button className="bg-brand-secondary text-brand-dark px-8 py-4 rounded-lg font-bold hover:brightness-110 shadow-lg shadow-brand-secondary/30 transition-all duration-300 hover:-translate-y-1">
            Book a Thar
          </button>
          <button className="bg-transparent text-white border-2 border-white/30 px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-brand-dark transition-all duration-300 backdrop-blur-sm">
            Explore Packages
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce text-white/50">
        <span className="text-xs font-semibold tracking-widest uppercase mb-2">Scroll</span>
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 16.5l-6-6h12l-6 6z"></path></svg>
      </div>
    </div>
  );
}
