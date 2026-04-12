import { useState } from 'react';
import { Calendar, User, ArrowRight, Clock, Tag, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Top 10 Pilgrimage Destinations in Tamil Nadu',
    excerpt: 'Explore the most sacred temples and spiritual destinations across Tamil Nadu — from Rameswaram to Madurai Meenakshi Temple.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
    category: 'Pilgrimage',
    author: 'Sri Lakshmi Travels',
    date: '2026-03-15',
    readTime: '8 min read',
  },
  {
    id: 2,
    title: 'Complete Guide to Ooty Hill Station Trip',
    excerpt: 'Plan your perfect Ooty vacation — best time to visit, top attractions, suggested itinerary, and travel tips from our experienced drivers.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    category: 'Travel Guide',
    author: 'Sri Lakshmi Travels',
    date: '2026-03-08',
    readTime: '10 min read',
  },
  {
    id: 3,
    title: 'How to Choose the Right Car for Your Trip',
    excerpt: 'Swift Dzire vs Innova vs Tempo Traveller — which vehicle is best for your group size, route, and budget? Our expert guide helps you decide.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    category: 'Tips',
    author: 'Sri Lakshmi Travels',
    date: '2026-02-28',
    readTime: '5 min read',
  },
  {
    id: 4,
    title: 'Chennai to Tirupati — Everything You Need to Know',
    excerpt: 'Distance, travel time, best routes, darshan booking tips, and what to carry — your complete Chennai to Tirupati travel guide.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    category: 'Route Guide',
    author: 'Sri Lakshmi Travels',
    date: '2026-02-15',
    readTime: '7 min read',
  },
  {
    id: 5,
    title: 'Road Trip Safety Tips for Tamil Nadu',
    excerpt: 'Essential safety tips for long-distance travel — from vehicle checks to emergency contacts. Travel safe with these expert recommendations.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    category: 'Safety',
    author: 'Sri Lakshmi Travels',
    date: '2026-02-01',
    readTime: '6 min read',
  },
  {
    id: 6,
    title: 'Wedding Car Rental — Make Your Big Day Special',
    excerpt: 'Premium and luxury cars for weddings and receptions. Decorated vehicles, professional chauffeurs, and red carpet service.',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    category: 'Services',
    author: 'Sri Lakshmi Travels',
    date: '2026-01-20',
    readTime: '4 min read',
  },
];

const CATEGORIES = ['All', 'Pilgrimage', 'Travel Guide', 'Tips', 'Route Guide', 'Safety', 'Services'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = BLOG_POSTS.filter(post => {
    const matchCat = activeCategory === 'All' || post.category === activeCategory;
    const matchSearch = !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="relative py-20 overflow-hidden" style={{ background: '#0A2E1A' }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=85)' }}
        />
        <div className="relative z-10 text-center px-4">
          <p className="text-sm font-medium mb-2" style={{ color: '#D4A017' }}>Home / Blog</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Travel Blog
          </h1>
          <div className="w-20 h-0.5 mx-auto mb-4" style={{ background: '#D4A017' }} />
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Travel tips, route guides, and stories from 30 years on the road.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 text-sm bg-white/95 shadow-xl focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': '#D4A017' }}
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="py-8 px-4" style={{ background: '#FEF9EE' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={activeCategory === cat
                ? { background: '#0A2E1A', color: '#D4A017' }
                : { background: 'white', color: '#374151', border: '1px solid #E5E7EB' }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="py-16 px-4" style={{ background: '#FEF9EE' }}>
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400">No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, idx) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ background: '#D4A017' }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:underline decoration-1 underline-offset-4" style={{ color: '#1A3C5E' }}>
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <User className="w-3 h-3" /> {post.author}
                      </span>
                      <span className="text-sm font-semibold flex items-center gap-1" style={{ color: '#D4A017' }}>
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
