import { useState, useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const GALLERY_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80', title: 'Premium Fleet', category: 'fleet' },
  { id: 2, src: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80', title: 'Swift Dzire — City Comfort', category: 'fleet' },
  { id: 3, src: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80', title: 'Toyota Innova — Family Travel', category: 'fleet' },
  { id: 4, src: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80', title: 'Luxury Class Experience', category: 'fleet' },
  { id: 5, src: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80', title: 'Tirupati Temple Visit', category: 'pilgrimage' },
  { id: 6, src: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80', title: 'Rameswaram Temple', category: 'pilgrimage' },
  { id: 7, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', title: 'Ooty Hill Station', category: 'destinations' },
  { id: 8, src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80', title: 'Road Trip Adventures', category: 'destinations' },
  { id: 9, src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80', title: 'Beautiful Tamil Nadu', category: 'destinations' },
  { id: 10, src: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80', title: 'Professional Drivers', category: 'team' },
  { id: 11, src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', title: 'Safe Journey Guaranteed', category: 'team' },
  { id: 12, src: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80', title: 'Tempo Traveller — Group Tours', category: 'fleet' },
];

const CATEGORIES = [
  { key: 'all', label: 'All Photos' },
  { key: 'fleet', label: 'Our Fleet' },
  { key: 'destinations', label: 'Destinations' },
  { key: 'pilgrimage', label: 'Pilgrimage' },
  { key: 'team', label: 'Team' },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  const filtered = activeFilter === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeFilter);

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(prev => (prev - 1 + filtered.length) % filtered.length);
  const nextImage = () => setLightboxIndex(prev => (prev + 1) % filtered.length);

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=85)',
            animation: 'kenBurns 12s ease-in-out infinite alternate',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0A2E1A90, #0A2E1A60)' }} />
        <style>{`@keyframes kenBurns { from { transform: scale(1); } to { transform: scale(1.08); } }`}</style>
        <div className="relative z-10 text-center">
          <p className="text-sm font-medium mb-2" style={{ color: '#D4A017' }}>Home / Gallery</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Photo Gallery
          </h1>
          <div className="w-20 h-0.5 mx-auto mb-4" style={{ background: '#D4A017' }} />
          <p className="text-gray-200 text-lg max-w-xl mx-auto">
            A glimpse into our fleet, destinations, and the journeys we've crafted.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="py-8 px-4" style={{ background: '#FEF9EE' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
              style={activeFilter === cat.key
                ? { background: '#0A2E1A', color: '#D4A017' }
                : { background: 'white', color: '#374151', border: '1px solid #E5E7EB' }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="py-16 px-4" style={{ background: '#FEF9EE' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((img, idx) => (
              <div
                key={img.id}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
                onClick={() => openLightbox(idx)}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease ${idx * 0.08}s`,
                }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-sm">{img.title}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block" style={{ background: '#D4A01780', color: 'white' }}>
                      {CATEGORIES.find(c => c.key === img.category)?.label}
                    </span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
                  <Camera className="w-5 h-5 text-white drop-shadow" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-6 right-6 text-white hover:text-gray-300">
            <X className="w-8 h-8" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 md:left-8 text-white hover:text-gray-300">
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 md:right-8 text-white hover:text-gray-300">
            <ChevronRight className="w-10 h-10" />
          </button>
          <div className="max-w-4xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightboxIndex]?.src}
              alt={filtered[lightboxIndex]?.title}
              className="max-h-[75vh] object-contain rounded-lg"
            />
            <p className="text-center text-white mt-4 font-medium">
              {filtered[lightboxIndex]?.title}
              <span className="text-gray-400 ml-3 text-sm">{lightboxIndex + 1} / {filtered.length}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
