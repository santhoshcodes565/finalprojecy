import { Link } from 'react-router-dom';
import { DESTINATION_IMAGES } from '../../constants/images';

export default function PopularDestinations() {
  const destinations = [
    { title: 'Chennai', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800' }, // Chennai Central
    { title: 'Madurai', img: DESTINATION_IMAGES.madurai },
    { title: 'Ooty', img: DESTINATION_IMAGES.ooty },
    { title: 'Kodaikanal', img: DESTINATION_IMAGES.kodaikanal },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, idx) => (
            <Link to="/packages" key={idx} className="group relative rounded-xl overflow-hidden shadow-md h-72 block">
              <img src={dest.img} alt={dest.title} loading="lazy" className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex items-end p-6">
                <h3 className="text-white text-xl font-bold group-hover:text-secondary transition">{dest.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
