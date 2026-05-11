import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '1'
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirect to car rental with search query
    const query = new URLSearchParams(searchParams).toString();
    navigate(`/car-rental?${query}`);
  };

  return (
    <div className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg" 
          alt="Tamil Nadu Temple Journey" 
          className="w-full h-full object-cover opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Explore Tamil Nadu<br className="hidden md:block"/> With Confidence
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto drop-shadow-md">
          Premium car rentals, expert drivers, and unforgettable tour packages since 1995.
        </p>

        {/* Search Bar Map Overlay */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-2xl max-w-5xl mx-auto">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            <div className="flex flex-col text-left">
              <label className="text-xs font-semibold text-gray-500 mb-1 flex items-center"><MapPin size={14} className="mr-1"/> From</label>
              <input type="text" placeholder="Pickup City..." className="w-full border-b-2 border-gray-200 focus:border-primary pb-2 text-gray-800 outline-none transition" required value={searchParams.from} onChange={e => setSearchParams({...searchParams, from: e.target.value})} />
            </div>

            <div className="flex flex-col text-left">
              <label className="text-xs font-semibold text-gray-500 mb-1 flex items-center"><MapPin size={14} className="mr-1"/> To</label>
              <input type="text" placeholder="Drop City..." className="w-full border-b-2 border-gray-200 focus:border-primary pb-2 text-gray-800 outline-none transition" required value={searchParams.to} onChange={e => setSearchParams({...searchParams, to: e.target.value})} />
            </div>

            <div className="flex flex-col text-left">
              <label className="text-xs font-semibold text-gray-500 mb-1 flex items-center"><Calendar size={14} className="mr-1"/> Date</label>
              <input type="date" className="w-full border-b-2 border-gray-200 focus:border-primary pb-2 text-gray-800 outline-none transition bg-transparent" required value={searchParams.date} onChange={e => setSearchParams({...searchParams, date: e.target.value})} />
            </div>

            <div className="flex flex-col text-left">
              <label className="text-xs font-semibold text-gray-500 mb-1 flex items-center"><Users size={14} className="mr-1"/> Passengers</label>
              <select className="w-full border-b-2 border-gray-200 focus:border-primary pb-2 text-gray-800 outline-none transition bg-transparent" value={searchParams.passengers} onChange={e => setSearchParams({...searchParams, passengers: e.target.value})}>
                <option value="1">1-2 People</option>
                <option value="3">3-4 People</option>
                <option value="5">5-7 People</option>
                <option value="8">8+ People</option>
              </select>
            </div>

            <div className="flex items-end">
              <button type="submit" className="w-full bg-primary text-white font-semibold flex items-center justify-center p-3 rounded-md hover:bg-blue-700 transition shadow-md active:scale-95 group">
                <Search size={20} className="mr-2 group-hover:scale-110 transition" />
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
