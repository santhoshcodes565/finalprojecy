import { Link } from 'react-router-dom';
import { PhoneCall } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready for Your Next Great Journey?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl">
          Book your ride today and experience the gold standard of travel in Tamil Nadu. We are ready to drive you safely.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/contact" className="bg-secondary text-gray-900 font-bold px-8 py-4 rounded-md hover:bg-yellow-500 transition shadow-lg active:scale-95">
            Contact Us Now
          </Link>
          <a href="tel:+919876543210" className="bg-white/10 border border-white/30 text-white font-bold px-8 py-4 rounded-md hover:bg-white/20 transition flex items-center justify-center active:scale-95">
            <PhoneCall size={20} className="mr-2" />
            +91 98765 43210
          </a>
        </div>
      </div>
    </section>
  );
}
