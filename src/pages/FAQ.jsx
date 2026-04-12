import { useState } from 'react';
import { ChevronDown, Search, HelpCircle, Phone, MessageCircle } from 'lucide-react';

const FAQ_DATA = [
  {
    category: 'Booking',
    items: [
      { q: 'How do I book a car?', a: 'You can book online through our website, call us at +91 98765 43210, or WhatsApp us. We confirm your booking within 30 minutes.' },
      { q: 'Can I cancel or modify my booking?', a: 'Yes, free cancellation up to 24 hours before pickup. Modifications are accepted anytime before the trip starts. For same-day cancellations, a nominal fee may apply.' },
      { q: 'How far in advance should I book?', a: 'We recommend booking at least 24-48 hours in advance. For peak seasons (holidays, festivals), book at least 1 week in advance for the best availability.' },
      { q: 'Can I book a one-way trip?', a: 'Yes! We offer both one-way and round-trip options. One-way pricing is calculated based on the distance and vehicle type.' },
    ]
  },
  {
    category: 'Vehicles & Drivers',
    items: [
      { q: 'What types of vehicles do you offer?', a: 'We offer Swift Dzire (4 seater), Toyota Innova (7 seater), Tempo Traveller (12-17 seater), and Luxury cars (Mercedes/BMW). All vehicles are AC, GPS tracked, and less than 3 years old.' },
      { q: 'Are your drivers verified?', a: 'All drivers are background-verified, hold valid commercial licenses, and are trained in defensive driving and customer service. They undergo regular medical checkups.' },
      { q: 'Can I request a specific driver?', a: 'Yes! If you\'ve traveled with us before and prefer a specific driver, mention this during booking and we\'ll try our best to accommodate your request.' },
      { q: 'Do drivers speak English?', a: 'Yes, most of our drivers speak basic English along with Tamil and Hindi. For corporate/luxury bookings, we assign drivers with good English proficiency.' },
    ]
  },
  {
    category: 'Payment',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept UPI (GPay, PhonePe, Paytm), Credit/Debit cards, Net Banking, and Cash. For online bookings, we use Razorpay secure payment gateway.' },
      { q: 'Is advance payment required?', a: 'For online bookings, you can choose to pay 30% advance or full amount. The remaining balance can be paid to the driver in cash or UPI after the trip.' },
      { q: 'What is your refund policy?', a: 'Cancellations made 24+ hours before: Full refund. 12-24 hours: 50% refund. Less than 12 hours: No refund. Refunds are processed within 5-7 business days.' },
    ]
  },
  {
    category: 'Trips & Routes',
    items: [
      { q: 'Do you provide outstation trips?', a: 'Yes! We cover all major destinations across Tamil Nadu and neighboring states. Popular routes include Chennai–Tirupati, Chennai–Ooty, Madurai–Rameswaram, and more.' },
      { q: 'Do you offer airport transfers?', a: 'Yes! We provide airport pickup and drop for Chennai, Coimbatore, Madurai, and Trichy airports at fixed rates. Track your driver in real-time.' },
      { q: 'What about night driving?', a: 'Our drivers are comfortable with night driving. However, for safety, we recommend starting early morning trips. Night charges (10 PM - 6 AM) may apply as per RTO norms.' },
      { q: 'Can I take the car to another state?', a: 'Yes, interstate travel is permitted with advance notice. Additional permits may be required, which we arrange at no extra cost.' },
    ]
  },
  {
    category: 'Safety',
    items: [
      { q: 'How do you ensure passenger safety?', a: 'All vehicles have GPS tracking, first-aid kits, fire extinguishers, and are fully insured. Vehicles are sanitized before every trip. You can share your live location with family.' },
      { q: 'What happens in case of a breakdown?', a: 'We provide 24/7 roadside assistance. In case of a breakdown, a replacement vehicle will be arranged within 2 hours at no extra cost.' },
      { q: 'Is there travel insurance?', a: 'Yes, all trips booked through Sri Lakshmi Travels include comprehensive travel insurance for passengers at no additional cost.' },
    ]
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const toggle = (key) => setOpenIndex(openIndex === key ? null : key);

  const allItems = FAQ_DATA.flatMap((cat, ci) =>
    cat.items.map((item, ii) => ({ ...item, category: cat.category, key: `${ci}-${ii}` }))
  );

  const filteredItems = allItems.filter(item => {
    const matchSearch = !searchTerm ||
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden flex items-center justify-center" style={{ background: '#0A2E1A' }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=85)' }}
        />
        <div className="relative z-10 text-center px-4">
          <p className="text-sm font-medium mb-2" style={{ color: '#D4A017' }}>Home / FAQ</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Frequently Asked Questions
          </h1>
          <div className="w-20 h-0.5 mx-auto mb-4" style={{ background: '#D4A017' }} />
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Find answers to common questions about our services, bookings, and policies.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
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
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
            style={activeCategory === 'all'
              ? { background: '#0A2E1A', color: '#D4A017' }
              : { background: 'white', color: '#374151', border: '1px solid #E5E7EB' }
            }
          >
            All
          </button>
          {FAQ_DATA.map(cat => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={activeCategory === cat.category
                ? { background: '#0A2E1A', color: '#D4A017' }
                : { background: 'white', color: '#374151', border: '1px solid #E5E7EB' }
              }
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="py-16 px-4" style={{ background: '#FEF9EE' }}>
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400">No results found. Try a different search term.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.key}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
              >
                <button
                  onClick={() => toggle(item.key)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-sm pr-4" style={{ color: '#1A3C5E' }}>{item.q}</span>
                  <ChevronDown
                    className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
                    style={{ color: '#D4A017', transform: openIndex === item.key ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openIndex === item.key ? '300px' : '0' }}
                >
                  <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                    {item.a}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Still Have Questions CTA */}
      <div className="py-16 px-4" style={{ background: '#0A2E1A' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Still have questions?
          </h2>
          <p className="text-gray-300 mb-8">Can't find what you're looking for? Our team is always ready to help.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-90"
              style={{ background: '#D4A017', color: '#0F2233' }}
            >
              <Phone className="w-4 h-4" /> Call Us Now
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all border-2 text-white hover:bg-white/10"
              style={{ borderColor: '#D4A017' }}
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
