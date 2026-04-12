import { Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    { name: 'Arun Kumar', role: 'Business Traveler', text: 'Booked an Innova for a 3-day family trip to Ooty. The driver was exceptionally polite and drove safely. Highly recommended!', rating: 5 },
    { name: 'Priya Sharma', role: 'Tourist', text: 'The Chennai to Tirupati package was perfectly organized. Darshan tickets and travel were handled smoothly. Thank you!', rating: 5 },
    { name: 'Rahul Dev', role: 'Local Resident', text: 'I always use Sri Lakshmi Travels for airport drops. They are punctual and cars are always clean.', rating: 4 },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-background p-8 rounded-xl border border-gray-100 shadow-sm relative">
              <div className="flex text-secondary mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < rev.rating ? 'currentColor' : 'none'} className={i < rev.rating ? 'text-secondary' : 'text-gray-300'} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6">"{rev.text}"</p>
              <div>
                <h4 className="font-bold text-gray-900">{rev.name}</h4>
                <span className="text-sm text-gray-500">{rev.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
