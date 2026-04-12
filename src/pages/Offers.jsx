import { useState } from 'react';
import { Tag, Clock, ArrowRight, Percent, Gift, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OFFERS = [
  {
    id: 1,
    title: '20% OFF on First Booking',
    description: 'New to Sri Lakshmi Travels? Get flat 20% off on your first ride! Valid for all vehicle types.',
    code: 'FIRST20',
    discount: '20%',
    validTill: '2026-06-30',
    category: 'new-user',
    icon: Gift,
    gradient: 'linear-gradient(135deg, #0A2E1A, #166534)',
    badge: 'New User Offer',
  },
  {
    id: 2,
    title: 'Weekend Gateway — ₹500 OFF',
    description: 'Book any outstation trip for Saturday or Sunday and get ₹500 instant discount. Min booking ₹3,000.',
    code: 'WEEKEND500',
    discount: '₹500',
    validTill: '2026-05-31',
    category: 'trip',
    icon: Sparkles,
    gradient: 'linear-gradient(135deg, #1A3C5E, #2563EB)',
    badge: 'Weekend Special',
  },
  {
    id: 3,
    title: 'Family Package — Flat 15% OFF',
    description: 'Book an Innova or Tempo Traveller for family trips and enjoy 15% off. Perfect for pilgrimages and holidays.',
    code: 'FAMILY15',
    discount: '15%',
    validTill: '2026-07-31',
    category: 'trip',
    icon: Percent,
    gradient: 'linear-gradient(135deg, #92400E, #D4A017)',
    badge: 'Family Deal',
  },
  {
    id: 4,
    title: 'Tirupati Special — Starting ₹2,999',
    description: 'Complete Tirupati darshan package with AC Innova, hotel, and breakfast. Limited period offer!',
    code: 'TIRUPATI',
    discount: '₹2,999',
    validTill: '2026-05-15',
    category: 'package',
    icon: Tag,
    gradient: 'linear-gradient(135deg, #7C3AED, #A855F7)',
    badge: 'Pilgrimage Offer',
  },
  {
    id: 5,
    title: 'Corporate Flat Rate',
    description: 'Special corporate rates for IT companies. ₹10/km for Dzire, ₹15/km for Innova. Monthly billing available.',
    code: 'CORP2026',
    discount: 'Special Rate',
    validTill: '2026-12-31',
    category: 'corporate',
    icon: Tag,
    gradient: 'linear-gradient(135deg, #0F2233, #1A3C5E)',
    badge: 'Corporate',
  },
  {
    id: 6,
    title: 'Refer & Earn ₹300',
    description: 'Refer a friend to Sri Lakshmi Travels. When they complete their first trip, you both get ₹300 credit!',
    code: 'REFER300',
    discount: '₹300',
    validTill: '2026-12-31',
    category: 'referral',
    icon: Gift,
    gradient: 'linear-gradient(135deg, #065F46, #10B981)',
    badge: 'Referral Bonus',
  },
];

export default function Offers() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const daysLeft = (dateStr) => {
    const diff = new Date(dateStr).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="relative py-20 overflow-hidden flex items-center justify-center" style={{ background: '#0A2E1A' }}>
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                background: '#D4A017',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.2 + Math.random() * 0.3,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: '#D4A01720', border: '1px solid #D4A01740' }}>
            <Sparkles className="w-4 h-4" style={{ color: '#D4A017' }} />
            <span className="text-sm font-semibold" style={{ color: '#D4A017' }}>Limited Time Offers</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Exclusive Deals & Offers
          </h1>
          <div className="w-20 h-0.5 mx-auto mb-4" style={{ background: '#D4A017' }} />
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Save big on your next trip with our special deals. Use coupon codes at checkout!
          </p>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="py-16 px-4" style={{ background: '#FEF9EE' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFERS.map((offer, idx) => {
            const IconComp = offer.icon;
            const remaining = daysLeft(offer.validTill);

            return (
              <div
                key={offer.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Top Banner */}
                <div className="p-6 text-white relative overflow-hidden" style={{ background: offer.gradient }}>
                  <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 bg-white" />
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    {offer.badge}
                  </span>
                  <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
                  <div className="text-3xl font-extrabold mt-2 flex items-center gap-2">
                    {offer.discount}
                    <span className="text-sm font-normal opacity-80">OFF</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{offer.description}</p>

                  {/* Coupon Code */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 border-2 border-dashed rounded-lg px-3 py-2 text-center" style={{ borderColor: '#D4A017' }}>
                      <span className="font-mono font-bold text-sm tracking-wider" style={{ color: '#1A3C5E' }}>{offer.code}</span>
                    </div>
                    <button
                      onClick={() => copyCode(offer.code)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ background: copiedCode === offer.code ? '#10B981' : '#1A3C5E' }}
                    >
                      {copiedCode === offer.code ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {remaining > 0 ? `${remaining} days left` : 'Expired'}
                    </span>
                    <button
                      onClick={() => navigate('/packages')}
                      className="flex items-center gap-1 font-semibold hover:underline"
                      style={{ color: '#D4A017' }}
                    >
                      Book Now <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terms */}
      <div className="py-12 px-4" style={{ background: '#F3F4F6' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-semibold text-gray-700 mb-3">Terms & Conditions</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Offers are subject to availability and may change without prior notice. Coupon codes cannot be combined with other offers.
            Valid only for new bookings. Sri Lakshmi Travels reserves the right to modify or withdraw any offer at any time.
            For corporate rates, minimum 10 trips per month required.
          </p>
        </div>
      </div>
    </div>
  );
}
