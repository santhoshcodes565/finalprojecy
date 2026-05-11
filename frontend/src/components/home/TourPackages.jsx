import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';

export default function TourPackages() {
  const packages = [
    { id: 101, route: 'Chennai to Tirupati', duration: '2 Days / 1 Night', price: 6500, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg' },
    { id: 102, route: 'Southern Heritage', duration: '4 Days / 3 Nights', price: 14000, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Exclusive Tour Packages</h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="group relative rounded-xl overflow-hidden shadow-lg h-96">
              <img src={pkg.img} alt={pkg.route} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.route}</h3>
                <div className="flex items-center space-x-4 mb-4 text-gray-200 text-sm">
                  <span className="flex items-center"><Clock size={16} className="mr-1 text-secondary"/> {pkg.duration}</span>
                  <span className="flex items-center"><MapPin size={16} className="mr-1 text-secondary"/> South India</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-white bg-primary px-3 py-1 rounded-md">₹{pkg.price}</span>
                  <Link to={`/tour/${pkg.id}`} className="bg-white text-gray-900 px-4 py-2 font-semibold rounded-md hover:bg-gray-100 transition active:scale-95">
                    View Plan
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/packages" className="inline-block border-2 border-primary text-primary font-semibold px-8 py-3 rounded-md hover:bg-primary hover:text-white transition shadow-sm active:scale-95">
            Explore All Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
