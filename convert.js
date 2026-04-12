const fs = require('fs');
let html = fs.readFileSync('home.html', 'utf8');

// Convert HTML to JSX
html = html.replace(/class=/g, 'className=');
html = html.replace(/for=/g, 'htmlFor=');
html = html.replace(/<!--/g, '{/*');
html = html.replace(/-->/g, '*/}');
html = html.replace(/<img(.*?)>/g, (match) => match.endsWith('/>') ? match : match.slice(0, -1) + ' />');
html = html.replace(/<input(.*?)>/g, (match) => match.endsWith('/>') ? match : match.slice(0, -1) + ' />');
html = html.replace(/onclick=/g, 'onClick=');
html = html.replace(/style="font-variation-settings: 'FILL' 1;"/g, "style={{ fontVariationSettings: \"'FILL' 1\" }}");

// Extract Navbar
const navStart = html.indexOf('<nav');
const navEnd = html.indexOf('</nav>') + 6;
const navContent = html.substring(navStart, navEnd);

// Extract Footer
const footerStart = html.indexOf('<footer');
const footerEnd = html.indexOf('</footer>') + 9;
const footerContent = html.substring(footerStart, footerEnd);

// The rest goes to Home.jsx
const bodyStart = html.indexOf('</nav>') + 6;
const bodyEnd = html.indexOf('<footer');
let homeContent = html.substring(bodyStart, bodyEnd);

// Fix slider script inside Home content - convert to React state
const homeJsx = `import React, { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 8000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const changeSlide = (step) => {
    setCurrentSlide((prev) => {
      let next = prev + step;
      if (next >= totalSlides) next = 0;
      if (next < 0) next = totalSlides - 1;
      return next;
    });
  };

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <>
      ${homeContent}
    </>
  );
}`;

let finalHomeJsx = homeJsx.replace(/<div className="slide active" id="slide-1">/g, "<div className={`slide ${currentSlide === 0 ? 'active' : ''}`}>");
finalHomeJsx = finalHomeJsx.replace(/<div className="slide" id="slide-2">/g, "<div className={`slide ${currentSlide === 1 ? 'active' : ''}`}>");
finalHomeJsx = finalHomeJsx.replace(/<div className="slide" id="slide-3">/g, "<div className={`slide ${currentSlide === 2 ? 'active' : ''}`}>");
finalHomeJsx = finalHomeJsx.replace(/<div className="slide" id="slide-4">/g, "<div className={`slide ${currentSlide === 3 ? 'active' : ''}`}>");

// Fix buttons
finalHomeJsx = finalHomeJsx.replace(/onClick="changeSlide\(-1\)"/g, "onClick={() => changeSlide(-1)}");
finalHomeJsx = finalHomeJsx.replace(/onClick="changeSlide\(1\)"/g, "onClick={() => changeSlide(1)}");
// Replace dots
finalHomeJsx = finalHomeJsx.replace(/<div className="flex gap-2" id="slider-dots">.*?<\/div>/s, `{/* Slider Navigation Dots */}
          <div className="flex gap-2">
            {[0,1,2,3].map((idx) => (
              <span key={idx} className={\`dot w-3 h-3 rounded-full cursor-pointer \${currentSlide === idx ? 'active bg-primary' : 'bg-white/40'}\`} onClick={() => goToSlide(idx)}></span>
            ))}
          </div>`);

finalHomeJsx = finalHomeJsx.replace(/<br>/g, '<br/>');

const navJsx = `import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    ${navContent.replace(/href="#"/g, 'to="/"').replace(/<a /g, '<Link ').replace(/<\/a>/g, '</Link>')}
  );
}`;

const footerJsx = `import React from 'react';
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    ${footerContent.replace(/href="#"/g, 'to="/"').replace(/<a /g, '<Link ').replace(/<\/a>/g, '</Link>')}
  );
}`;

fs.writeFileSync('src/components/Navbar.jsx', navJsx);
fs.writeFileSync('src/components/Footer.jsx', footerJsx);
fs.writeFileSync('src/pages/Home.jsx', finalHomeJsx);
console.log('Conversion successful!');
