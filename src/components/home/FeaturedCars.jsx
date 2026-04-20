import { Link } from 'react-router-dom';
import { Users, Fuel, Gauge } from 'lucide-react';

export default function FeaturedCars() {
  const cars = [
    { id: 1, name: 'Toyota Innova Crysta', type: 'SUV', seats: 7, fuel: 'Diesel', price: 2000, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg' },
    { id: 2, name: 'Suzuki Swift Dzire', type: 'Sedan', seats: 4, fuel: 'Diesel', price: 1200, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg' },
    { id: 3, name: 'Tempo Traveller', type: 'Van', seats: 12, fuel: 'Diesel', price: 3500, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg' },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Car Rentals</h2>
            <div className="w-24 h-1 bg-secondary rounded-full"></div>
          </div>
          <Link to="/car-rental" className="text-primary font-medium hover:text-blue-800 transition mt-4 md:mt-0 inline-block">
            View All Cars &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
              <img src={car.img} alt={car.name} loading="lazy" className="h-56 w-full object-contain bg-gray-50" />
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                  <span className="bg-blue-50 text-primary text-xs font-semibold px-2 py-1 rounded">{car.type}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 mb-6 text-sm text-gray-600">
                  <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-md">
                    <Users size={16} className="text-primary mb-1" />
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-md">
                    <Fuel size={16} className="text-primary mb-1" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-md">
                    <Gauge size={16} className="text-primary mb-1" />
                    <span>Auto/MT</span>
                  </div>
                </div>
                <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">₹{car.price}</span>
                    <span className="text-gray-500 text-sm">/day</span>
                  </div>
                  <Link to={`/car-rental/${car.id}`} className="bg-secondary text-gray-900 font-semibold px-5 py-2 rounded-md hover:bg-yellow-500 transition active:scale-95 shadow-sm">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
