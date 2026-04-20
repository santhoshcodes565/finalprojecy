import React from 'react';
import './VideoBackground.css';

const VideoBackground = ({ 
  src, 
  title, 
  subtitle, 
  className = "",
  rotated = true,
  children
}) => {
  return (
    <div className={`video-hero-container ${className}`}>
      {/* Container for the video to ensure correct scaling and rotation */}
      <div className="video-hero-wrapper">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className={rotated ? "video-hero-rotated" : "video-hero-normal"}
          src={src}
        ></video>
      </div>
      
      {/* Dark overlay to make text readable */}
      <div className="video-hero-overlay"></div>

      {/* Foreground Content */}
      <div className="video-hero-content">
        {subtitle && <h3 className="video-hero-subtitle">{subtitle}</h3>}
        {title && <h1 className="video-hero-title">{title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;
