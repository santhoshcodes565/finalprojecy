require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Car = require('./models/Car');
const Tour = require('./models/Tour');

const cars = [
  { name: 'Hyundai Creta', category: 'Compact SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 14, minKmPerDay: 250, driverBata: 400, image: '/images/cars/hyundai creta.jpeg', features: ['Panoramic Sunroof', 'Ventilated Seats', 'Premium Interior', 'Touchscreen Infotainment'], desc: 'The perfect compact SUV for smooth city drives and comfortable highway cruising.', isAvailable: true },
  { name: 'Kia Seltos', category: 'Compact SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 14, minKmPerDay: 250, driverBata: 400, image: '/images/cars/kia seltos.jpeg', features: ['Bose Premium Sound', 'Heads-up Display', 'Air Purifier', 'Sporty Design'], desc: 'A stylish and tech-loaded SUV that offers a premium travel experience on any journey.', isAvailable: true },
  { name: 'Mahindra Scorpio-N', category: 'Premium SUV', seats: 7, fuel: 'Diesel / Petrol', transmission: 'Manual / Automatic', pricePerKm: 18, minKmPerDay: 250, driverBata: 500, image: '/images/cars/mahindra scorpio-n.jpeg', features: ['Commanding Seating', 'Sunroof', 'Tough Build', 'Spacious Third Row'], desc: 'The Big Daddy of SUVs. Exceptional presence, space, and comfort for large groups.', isAvailable: true },
  { name: 'Mahindra Thar', category: 'Adventure SUV', seats: 4, fuel: 'Diesel', transmission: 'Manual / Automatic', pricePerKm: 20, minKmPerDay: 200, driverBata: 500, image: '/images/cars/mahindra thar.jpeg', features: ['4x4 Off-Roading', 'Open Top Option', 'High Ground Clearance'], desc: 'For the thrill-seekers. Best suited for adventurous trips up the steep hills or off-roading.', isAvailable: true },
  { name: 'Tata Nexon', category: 'Compact SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 12, minKmPerDay: 250, driverBata: 350, image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1000&auto=format&fit=crop', features: ['5-Star NCAP Rating', 'Harman Audio', 'High Ground Clearance'], desc: 'A safe, dynamic and comfortable 5-seater for families seeking both economy and style.', isAvailable: true },
  { name: 'Mahindra XUV 3XO', category: 'Compact SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 13, minKmPerDay: 250, driverBata: 400, image: '/images/cars/mahindra xuv 3xo.jpeg', features: ['Level 2 ADAS', 'Panoramic Sunroof', 'Premium Audio'], desc: 'Setting new benchmarks in the compact SUV segment with premium features and performance.', isAvailable: true },
  { name: 'Maruti Suzuki Brezza', category: 'Compact SUV', seats: 5, fuel: 'Petrol / CNG', transmission: 'Manual / Automatic', pricePerKm: 12, minKmPerDay: 250, driverBata: 350, image: '/images/cars/maruti suzuki brezza.jpeg', features: ['HUD Display', '360 Camera', 'High Fuel Efficiency'], desc: "India's most loved compact SUV, featuring bold looks and unmatched reliability.", isAvailable: true },
  { name: 'Honda City', category: 'Premium Sedan', seats: 5, fuel: 'Petrol / Hybrid', transmission: 'Manual / CVT', pricePerKm: 15, minKmPerDay: 250, driverBata: 400, image: '/images/cars/honda city.jpeg', features: ['ADAS Safety', 'Spacious Cabin', 'Refined i-VTEC Engine'], desc: 'A sophisticated sedan offering unparalleled comfort, legroom, and a very smooth, quiet ride.', isAvailable: true },
  { name: 'Hyundai Verna', category: 'Premium Sedan', seats: 5, fuel: 'Petrol / Turbo', transmission: 'Manual / Automatic', pricePerKm: 15, minKmPerDay: 250, driverBata: 400, image: '/images/cars/hyundai verna.jpeg', features: ['Futuristic Design', 'Ventilated Seats', 'Advanced Tech'], desc: 'A futuristic premium sedan that stands out with its bold design and luxury-class interiors.', isAvailable: true },
  { name: 'Swift Dzire', category: 'Sedan', seats: 4, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 12, minKmPerDay: 250, driverBata: 350, image: '/images/cars/maruti suzuki swift.jpeg', features: ['AC', 'Luggage Space', 'Music System'], desc: 'The most popular choice for small families and solo travellers offering great mileage and comfort.', isAvailable: true },
  { name: 'Toyota Innova', category: 'Premium SUV', seats: 7, fuel: 'Diesel', transmission: 'Manual', pricePerKm: 18, minKmPerDay: 300, driverBata: 450, image: '/images/cars/toyota innova.jpeg', features: ['AC', 'Spacious Interiors', 'GPS', 'Extra Luggage Space'], desc: 'The ultimate family favourite SUV for outstation trips, unmatched spaciousness and reliability.', isAvailable: true },
  { name: 'Tempo Traveller', category: 'Mini Van', seats: 12, fuel: 'Diesel', transmission: 'Manual', pricePerKm: 25, minKmPerDay: 300, driverBata: 600, image: '/images/cars/tempo traveller.jpeg', features: ['AC', 'Pushback Seats', 'Ample Legroom', 'TV & Audio System'], desc: 'Perfect for group travel, corporate outings, and large family vacations with utmost comfort.', isAvailable: true },
  { name: 'Luxury Cars', category: 'Business Class', seats: 4, fuel: 'Petrol / Diesel', transmission: 'Automatic', pricePerKm: 45, minKmPerDay: 250, driverBata: 800, image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop', features: ['Leather Interiors', 'Champagne Chiller', 'WiFi', 'Premium Ride'], desc: 'Uncompromising luxury for VIP arrivals, weddings, and premium corporate travel.', isAvailable: true },
  { name: 'Sri Lakshmi Travels Premium Omnibus', category: 'Luxury Bus', seats: 40, fuel: 'Diesel', transmission: 'Automatic', pricePerKm: 65, minKmPerDay: 300, driverBata: 1000, image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c359?q=80&w=1000&auto=format&fit=crop', features: ['Emergency Exits', 'Air Suspension', 'Recliner Seats', 'Modern Safety Tools', 'Wi-Fi'], desc: 'Top-of-the-line Sri Lakshmi Travels multi-axle bus ensuring maximum safety and smooth journey.', isAvailable: true },
  { name: 'Mahindra XUV700', category: 'Premium SUV', seats: 7, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 18, minKmPerDay: 250, driverBata: 450, image: '/images/cars/mahindra xuv700.jpeg', features: ['Panoramic Sunroof', 'Level 2 ADAS', 'Premium Sound'], desc: 'The most advanced tech-loaded SUV suited for family long drives.', isAvailable: true },
  { name: 'Tata Safari', category: 'Premium SUV', seats: 7, fuel: 'Diesel', transmission: 'Manual / Automatic', pricePerKm: 18, minKmPerDay: 250, driverBata: 450, image: '/images/cars/tata safari.jpeg', features: ['Panoramic Sunroof', 'Captain Seats', 'JBL Audio'], desc: 'The iconic spacious SUV reborn with modern luxury and tough build quality.', isAvailable: true },
  { name: 'Toyota Fortuner', category: 'Premium SUV', seats: 7, fuel: 'Diesel / Petrol', transmission: 'Manual / Automatic', pricePerKm: 22, minKmPerDay: 300, driverBata: 500, image: '/images/cars/toyota fortuner.jpeg', features: ['4x4 Option', 'Massive Road Presence', 'Reliability'], desc: 'The ultimate reliable and rugged VIP SUV that conquers every terrain effortlessly.', isAvailable: true },
  { name: 'Maruti Suzuki Ertiga', category: 'MUV', seats: 7, fuel: 'Petrol / CNG', transmission: 'Manual / Automatic', pricePerKm: 13, minKmPerDay: 250, driverBata: 350, image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1000&auto=format&fit=crop', features: ['Spacious Cabin', 'High Fuel Efficiency', 'Smart Hybrid'], desc: 'The most affordable and practical 7-seater family carrier for long and short trips.', isAvailable: true },
  { name: 'Kia Carens', category: 'MUV', seats: 7, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 15, minKmPerDay: 250, driverBata: 400, image: '/images/cars/kia carens.jpeg', features: ['Ventilated Seats', 'Bose Audio', '6 Airbags'], desc: 'A premium family mover offering top-notch safety features and ride comfort.', isAvailable: true },
  { name: 'Tata Harrier', category: 'Premium SUV', seats: 5, fuel: 'Diesel', transmission: 'Manual / Automatic', pricePerKm: 17, minKmPerDay: 250, driverBata: 400, image: '/images/cars/tata harrier.jpeg', features: ['Land Rover Pedigree', 'Panoramic Sunroof', 'Bold Stance'], desc: 'A striking 5-seater SUV combining bold design with thrilling performance.', isAvailable: true },
  { name: 'MG Hector', category: 'Premium SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 16, minKmPerDay: 250, driverBata: 400, image: '/images/cars/mg hector.jpeg', features: ['14-inch Touchscreen', 'Connected Tech', 'Panoramic Sunroof'], desc: 'The Internet-connected SUV offering massive cabin space and intelligent features.', isAvailable: true },
  { name: 'Maruti Suzuki Jimny', category: 'Adventure SUV', seats: 4, fuel: 'Petrol', transmission: 'Manual / Automatic', pricePerKm: 18, minKmPerDay: 250, driverBata: 450, image: '/images/cars/maruti suzuki jimny.jpeg', features: ['4x4 Off-Roading', 'Compact Size', 'All-Grip Pro'], desc: 'The iconic lifestyle 4x4 off-roader, built to tackle the toughest Indian terrains.', isAvailable: true },
  { name: 'Mahindra Bolero Neo', category: 'Rugged SUV', seats: 7, fuel: 'Diesel', transmission: 'Manual', pricePerKm: 14, minKmPerDay: 250, driverBata: 400, image: '/images/cars/mahindra bolero neo.jpeg', features: ['Tough Body', 'Micro HybridTech', 'MLD Option'], desc: 'A tough, reliable classic Indian mover perfect for rural side trips and hill stations.', isAvailable: true },
  { name: 'Hyundai Alcazar', category: 'Premium SUV', seats: 7, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 17, minKmPerDay: 250, driverBata: 450, image: '/images/cars/hyundai alcazar.jpeg', features: ['Captain Seats', 'Air Purifier', 'Premium Bose Audio'], desc: 'Luxurious 3-row comfort based on the Creta, built perfectly for family outstation trips.', isAvailable: true },
  { name: 'Maruti Suzuki Swift', category: 'Hatchback', seats: 5, fuel: 'Petrol / CNG', transmission: 'Manual / Automatic', pricePerKm: 11, minKmPerDay: 250, driverBata: 350, image: '/images/cars/maruti suzuki swift.jpeg', features: ['High Mileage', 'Z-Series Engine', 'Modern Safety'], desc: 'The most loved hatchback in India, now with better safety and more efficiency.', isAvailable: true },
  { name: 'Tata Punch', category: 'Micro SUV', seats: 5, fuel: 'Petrol / CNG', transmission: 'Manual / Automatic', pricePerKm: 12, minKmPerDay: 250, driverBata: 350, image: '/images/cars/tata punch.jpeg', features: ['5-Star NCAP', 'Tough Build', 'High Ground Clearance'], desc: "India's safe and rugged micro SUV, perfect for both city and village roads.", isAvailable: true },
  { name: 'Skoda Slavia', category: 'Premium Sedan', seats: 5, fuel: 'Petrol', transmission: 'Manual / Automatic', pricePerKm: 16, minKmPerDay: 250, driverBata: 400, image: '/images/cars/skoda slavia.jpeg', features: ['TSI Performance', 'Crystalline Design', 'European Safety'], desc: 'A beautiful European sedan offering powerful performance and elegant design.', isAvailable: true },
  { name: 'Volkswagen Virtus', category: 'Premium Sedan', seats: 5, fuel: 'Petrol', transmission: 'Manual / Automatic', pricePerKm: 16, minKmPerDay: 250, driverBata: 400, image: '/images/cars/volkswagen virtus.jpeg', features: ['GTI Pedigree', 'German Engineering', 'Digital Cockpit'], desc: 'The longest and widest sedan in its class, offering a true enthusiast driving experience.', isAvailable: true },
  { name: 'Maruti Suzuki Fronx', category: 'Compact SUV', seats: 5, fuel: 'Petrol / CNG', transmission: 'Manual / Automatic', pricePerKm: 12, minKmPerDay: 250, driverBata: 350, image: '/images/cars/maruti suzuki fronx.jpeg', features: ['Coupe Design', 'Smart Hybrid', '360 Camera'], desc: 'A stylish crossover offering a unique blend of SUV stance and coupe design.', isAvailable: true },
  { name: 'Hyundai Venue', category: 'Compact SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 13, minKmPerDay: 250, driverBata: 350, image: '/images/cars/hyundai venue.jpeg', features: ['Electric Sunroof', 'Connected Tech', 'Air Purifier'], desc: 'The smart urban SUV with advanced tech and bold styling for modern families.', isAvailable: true }
];

const tours = [
  { title: '7 Days Magical Kerala', duration: '7 Days / 6 Nights', states: 'Kerala', price: 24500, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop', description: "Experience God's Own Country in its purest form. From Kochi to Munnar, Thekkady, and the serene backwaters of Alleppey.", highlights: ['Houseboat Stay', 'Tea Plantations', 'Spice Tour', 'Kathakali Show'], isActive: true },
  { title: '14 Days Grand Southern Heritage', duration: '14 Days / 13 Nights', states: 'Tamil Nadu & Kerala', price: 52000, image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1000&auto=format&fit=crop', description: 'An epic cross-state journey revealing magnificent architectural heritage of Tamil Nadu and the lush nature of Kerala.', highlights: ['Meenakshi Temple', 'Brihadeeswarar Temple', 'Kanyakumari Sunset', 'Kerala Backwaters'], isActive: true },
  { title: '3 Days Munnar Weekend Escape', duration: '3 Days / 2 Nights', states: 'Kerala', price: 12500, image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop', description: 'A quick refreshing getaway to the misty hills of Munnar. Perfect for weekend travelers looking to unwind.', highlights: ['Tea Gardens', 'Echo Point', 'Mattupetty Dam'], isActive: true },
  { title: '5 Days Backwater & Beach Bliss', duration: '5 Days / 4 Nights', states: 'Kerala', price: 19000, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop', description: 'Experience the world-renowned backwaters of Kumarakom and the golden sands of Marari beach.', highlights: ['Houseboat', 'Kumarakom Bird Sanctuary', 'Marari Beach'], isActive: true },
  { title: '4 Days Temple City Tour', duration: '4 Days / 3 Nights', states: 'Tamil Nadu', price: 15000, image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1000&auto=format&fit=crop', description: 'Immerse yourself in the spiritual heart of Tamil Nadu. Explore millennia-old Dravidian architecture.', highlights: ['Meenakshi Temple', 'Srirangam Temple', 'Cultural Walk'], isActive: true },
  { title: '6 Days Ooty & Kodaikanal', duration: '6 Days / 5 Nights', states: 'Tamil Nadu', price: 26000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1000&auto=format&fit=crop', description: "The ultimate dual-hillstation experience. The Queen of Hill Stations meets the Princess of Hill Stations.", highlights: ['Nilgiri Mountain Railway', 'Botanical Gardens', 'Kodaikanal Lake'], isActive: true },
  { title: '4 Days Rameshwaram Pilgrimage', duration: '4 Days / 3 Nights', states: 'Tamil Nadu', price: 18000, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0be2?q=80&w=1000&auto=format&fit=crop', description: 'A deeply spiritual journey spanning from Madurai to Rameshwaram and Kanyakumari.', highlights: ['Pamban Bridge', 'Dhanushkodi', 'Kanyakumari Sunset'], isActive: true },
  { title: '5 Days Wayanad Wilderness', duration: '5 Days / 4 Nights', states: 'Kerala', price: 21000, image: 'https://images.unsplash.com/photo-1503376710362-8a50462292f7?q=80&w=1000&auto=format&fit=crop', description: 'Immerse yourself in the dense jungles, cascading waterfalls, and spice plantations of Northern Kerala.', highlights: ['Edakkal Caves', 'Soochipara Falls', 'Chembra Peak'], isActive: true },
  { title: '3 Days Pondicherry Retreat', duration: '3 Days / 2 Nights', states: 'Pondicherry', price: 13500, image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1000&auto=format&fit=crop', description: 'Experience a slice of France in India. Walk the cobblestone streets and find peace in Auroville.', highlights: ['Aurobindo Ashram', 'Auroville', 'Promenade Beach'], isActive: true },
  { title: '4 Days Yercaud & Kolli Hills', duration: '4 Days / 3 Nights', states: 'Tamil Nadu', price: 15500, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop', description: 'An offbeat mountainous adventure through the famous 70 hairpin bends of Kolli Hills and peaceful Yercaud.', highlights: ['70 Hairpin Bends', 'Agaya Gangai Falls', 'Yercaud Lake'], isActive: true },
  { title: '7 Days Majestic Mysore & Coorg', duration: '7 Days / 6 Nights', states: 'Karnataka', price: 32000, image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1000&auto=format&fit=crop', description: "Wander through the opulent Palaces of Mysore and retreat into the Scotland of India — Coorg.", highlights: ['Mysore Palace', 'Abbey Falls', 'Dubare Camp'], isActive: true },
  { title: '6 Days Trivandrum Coastal Vibe', duration: '6 Days / 5 Nights', states: 'Kerala', price: 24000, image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1000&auto=format&fit=crop', description: 'A blend of deep spirituality and bohemian coastal vibes on the magnificent red cliffs of Arabia Sea.', highlights: ['Padmanabhaswamy Temple', 'Varkala Cliff'], isActive: true },
  { title: 'Chennai → Tirupati Darshan', duration: '2 Days / 1 Night', states: 'Tamil Nadu & Andhra Pradesh', price: 4999, image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop', description: 'A seamless, perfectly organized spiritual journey from Chennai to Tirumala for divine darshan.', highlights: ['Special Darshan Tickets', 'Hotel Stay', 'Guided Tour'], isActive: true },
  { title: 'Ooty Hill Station Tour (Short)', duration: '3 Days / 2 Nights', states: 'Tamil Nadu', price: 6999, image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c359?q=80&w=1000&auto=format&fit=crop', description: 'A brief yet refreshing escape to Ooty with visits to the Botanical Garden, Ooty Lake, and tea estates.', highlights: ['Botanical Garden', 'Boat House', 'Tea Estates'], isActive: true },
  { title: 'Rameswaram Pilgrimage (Short)', duration: '2 Days / 1 Night', states: 'Tamil Nadu', price: 3499, image: 'https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?q=80&w=1000&auto=format&fit=crop', description: 'A focused spiritual retreat centering on Agni Teertham and the glorious Ramanathaswamy Temple.', highlights: ['Agni Teertham', 'Ramanathaswamy Temple', 'Pamban Bridge'], isActive: true },
];

async function seed() {
  try {
    await connectDB();
    console.log('✅ DB Connected. Starting seed...');

    // Delete existing seeded cars (keep admin-uploaded ones by checking for very short names or missing data)
    const existingCars = await Car.find({});
    console.log(`Found ${existingCars.length} existing cars.`);

    // Update existing cars and add new ones
    let updatedCount = 0;
    let addedCount = 0;

    for (const carData of cars) {
      const existingCar = existingCars.find(c => c.name.toLowerCase() === carData.name.toLowerCase());
      if (existingCar) {
        await Car.findByIdAndUpdate(existingCar._id, carData);
        updatedCount++;
      } else {
        await Car.create(carData);
        addedCount++;
      }
    }
    console.log(`✅ Seed complete: ${addedCount} cars added, ${updatedCount} cars updated.`);

    // Same for tours
    const Tour = require('./models/Tour');
    const existingTours = await Tour.find({});
    console.log(`Found ${existingTours.length} existing tours.`);
    const existingTourTitles = existingTours.map(t => t.title.toLowerCase());
    const toursToAdd = tours.filter(t => !existingTourTitles.includes(t.title.toLowerCase()));

    if (toursToAdd.length > 0) {
      await Tour.insertMany(toursToAdd);
      console.log(`✅ Added ${toursToAdd.length} new tours.`);
    } else {
      console.log('ℹ️  All tours already exist. Skipping tour seed.');
    }

    const totalCars = await Car.countDocuments({ isAvailable: true });
    const totalTours = await Tour.countDocuments({ isActive: true });
    console.log(`\n🎉 Seed complete! Active cars: ${totalCars}, Active tours: ${totalTours}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
