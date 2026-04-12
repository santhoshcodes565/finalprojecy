import { ShieldCheck, CalendarCheck, Map, Clock } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    { icon: <ShieldCheck size={32} className="text-primary"/>, title: 'Safe & Secure', desc: 'All our vehicles are regularly sanitized and maintained for peak performance.' },
    { icon: <CalendarCheck size={32} className="text-primary"/>, title: 'Trusted Since 1995', desc: 'Decades of experience in the travel industry, ensuring the best service in Tamil Nadu.' },
    { icon: <Map size={32} className="text-primary"/>, title: 'Expert Local Drivers', desc: 'Our chauffeurs speak local languages and possess excellent route knowledge.' },
    { icon: <Clock size={32} className="text-primary"/>, title: '24/7 Support', desc: 'Customer assistance available round-the-clock to manage any travel hiccups.' },
  ];

  return (
    <section className="py-16 bg-gray-50 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Sri Lakshmi Travels?</h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition text-center border border-gray-100">
              <div className="w-16 h-16 bg-blue-50 flex items-center justify-center rounded-full mx-auto mb-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
