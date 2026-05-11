import { useState } from 'react';
import { Star, Quote, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    city: 'Chennai',
    rating: 5,
    comment: 'The Innova was spotless and the driver Mr. Rajan was incredibly professional. Our Tirupati trip was seamless from start to finish. Will definitely book again!',
    service: 'Tirupati Darshan Package',
    avatar: 'RK',
    color: '#1A3C5E',
  },
  {
    id: 2,
    name: 'Priya Subramanian',
    city: 'Coimbatore',
    rating: 5,
    comment: 'Booked a Tempo Traveller for our family trip to Ooty. Excellent service, spacious vehicle, and the driver knew all the best spots. Highly recommended for family trips!',
    service: 'Ooty Family Tour',
    avatar: 'PS',
    color: '#166534',
  },
  {
    id: 3,
    name: 'Mohammed Farhan',
    city: 'Madurai',
    rating: 5,
    comment: 'Used their luxury car service for a corporate event. The driver was punctual, well-dressed, and the car was premium quality. Perfect for business clients.',
    service: 'Corporate Car Rental',
    avatar: 'MF',
    color: '#7C3AED',
  },
  {
    id: 4,
    name: 'Lakshmi Narayan',
    city: 'Salem',
    rating: 5,
    comment: 'We are a family of 8 and booked the Tempo Traveller for Rameswaram pilgrimage. The vehicle was comfortable, AC was perfect, and driver was very patient at all temple stops.',
    service: 'Rameswaram Pilgrimage',
    avatar: 'LN',
    color: '#B8860B',
  },
  {
    id: 5,
    name: 'Anitha Srinivasan',
    city: 'Trichy',
    rating: 4,
    comment: 'Great service for our Kodaikanal honeymoon trip. The Swift Dzire was clean and fuel-efficient. Only minor delay in pickup but overall very satisfied.',
    service: 'Kodaikanal Honeymoon',
    avatar: 'AS',
    color: '#DC2626',
  },
  {
    id: 6,
    name: 'Suresh Babu',
    city: 'Chennai',
    rating: 5,
    comment: 'We use Sri Lakshmi Travels for all our company\'s employee transport needs. Consistent quality, reliable drivers, and transparent billing. Excellent partner for 3 years now.',
    service: 'Corporate Monthly Contract',
    avatar: 'SB',
    color: '#0A2E1A',
  },
  {
    id: 7,
    name: 'Deepa Krishnan',
    city: 'Madurai',
    rating: 5,
    comment: 'Booked the airport transfer from Madurai airport. Driver was waiting with a name board, helped with luggage, and the car was spotless. Very professional service.',
    service: 'Airport Transfer',
    avatar: 'DK',
    color: '#EA580C',
  },
  {
    id: 8,
    name: 'Venkatesh Iyer',
    city: 'Bangalore',
    rating: 5,
    comment: 'Traveled from Bangalore to Madurai for a wedding. The Innova was brand new, driver was courteous, and they even arranged return trip seamlessly. 30 years of trust shows!',
    service: 'Bangalore-Madurai Trip',
    avatar: 'VI',
    color: '#2563EB',
  },
];

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 4;
  const totalPages = Math.ceil(TESTIMONIALS.length / perPage);
  const displayed = TESTIMONIALS.slice(currentPage * perPage, (currentPage + 1) * perPage);

  const stats = {
    total: TESTIMONIALS.length * 60, // simulate 480+ reviews
    average: 4.9,
    fiveStar: 92,
  };

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="relative py-20 overflow-hidden" style={{ background: '#0A2E1A' }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=85)' }}
        />
        <div className="relative z-10 text-center px-4">
          <p className="text-sm font-medium mb-2" style={{ color: '#D4A017' }}>Home / Testimonials</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Our Travelers Say
          </h1>
          <div className="w-20 h-0.5 mx-auto mb-4" style={{ background: '#D4A017' }} />
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Real stories from real travelers. 30 years of trust, one journey at a time.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="py-10 px-4" style={{ background: '#14532D' }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {[
            { num: `${stats.total}+`, label: 'Happy Travelers' },
            { num: stats.average, label: 'Average Rating', isStar: true },
            { num: `${stats.fiveStar}%`, label: '5-Star Reviews' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl md:text-4xl font-bold" style={{ color: '#D4A017', fontFamily: "'Playfair Display', serif" }}>
                  {stat.num}
                </span>
                {stat.isStar && <Star className="w-6 h-6" fill="#D4A017" stroke="#D4A017" />}
              </div>
              <p className="text-gray-300 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="py-16 px-4" style={{ background: '#FEF9EE' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayed.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 relative"
              >
                {/* Quote Icon */}
                <Quote className="w-8 h-8 absolute top-5 right-5 opacity-10" style={{ color: '#D4A017' }} />

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      fill={i < t.rating ? '#D4A017' : 'none'}
                      stroke={i < t.rating ? '#D4A017' : '#D1D5DB'}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.comment}"</p>

                {/* Service Badge */}
                <span className="inline-block text-xs px-3 py-1 rounded-full mb-4 font-medium" style={{ background: '#E8F4F8', color: '#1A3C5E' }}>
                  {t.service}
                </span>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#1A3C5E' }}>{t.name}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {t.city}
                    </p>
                  </div>
                  <span className="ml-auto text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">
                    ✓ Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className="w-9 h-9 rounded-full text-sm font-semibold transition-all"
                  style={i === currentPage ? { background: '#1A3C5E', color: 'white' } : { color: '#6B7280' }}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage === totalPages - 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-4" style={{ background: '#0A2E1A' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Join Our Happy Travelers
          </h2>
          <p className="text-gray-300 mb-8">Book your journey today and experience the Sri Lakshmi difference.</p>
          <button
            onClick={() => window.location.href = '/packages'}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:opacity-90 shadow-lg"
            style={{ background: '#D4A017', color: '#0F2233' }}
          >
            Book Your Trip <Star className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
