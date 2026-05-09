require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

// Models
const User = require('../models/User');
const Tour = require('../models/Tour');
const Car = require('../models/Car');
const Driver = require('../models/Driver');
const Review = require('../models/Review');

// ────────────────────────────────────────────────────────
// SEED DATA (migrated from src/data/mockData.js)
// ────────────────────────────────────────────────────────

const driversData = [
  { name: 'Ramesh Kumar', experience: 12, languages: ['Tamil', 'English', 'Hindi'], rating: 4.9, trips: 450, image: '/images/drivers/driver_1.png', bio: 'An expert in Southern routes with over a decade of safe driving.', phone: '9876543001', licenseNo: 'TN-DL-001' },
  { name: 'Murugan S.', experience: 15, languages: ['Tamil', 'Malayalam', 'English'], rating: 5.0, trips: 620, image: '/images/drivers/driver_2.png', bio: 'Specialist in hill station driving, particularly Ooty and Munnar.', phone: '9876543002', licenseNo: 'TN-DL-002' },
  { name: 'Rajesh Kannan', experience: 8, languages: ['Tamil', 'English'], rating: 4.8, trips: 310, image: '/images/drivers/driver_3.png', bio: 'Knowledgeable about heritage temples across Madurai, Thanjavur, and Rameshwaram.', phone: '9876543003', licenseNo: 'TN-DL-003' },
  { name: 'Dinesh V.', experience: 20, languages: ['Tamil', 'Telugu', 'English'], rating: 4.9, trips: 850, image: '/images/drivers/driver_4.png', bio: 'Most senior driver with an impeccable safety record.', phone: '9876543004', licenseNo: 'TN-DL-004' },
  { name: 'Selvam T.', experience: 5, languages: ['Tamil', 'English', 'Hindi'], rating: 4.7, trips: 180, image: '/images/drivers/driver_5.png', bio: 'Young, professional, and tech-savvy. Perfect for corporate clients.', phone: '9876543005', licenseNo: 'TN-DL-005' },
  { name: 'Anwar Basha', experience: 10, languages: ['Tamil', 'Hindi', 'Urdu'], rating: 4.9, trips: 400, image: '/images/drivers/driver_6.png', bio: 'Familiar with coastal routes to Pondicherry and Kanyakumari.', phone: '9876543006', licenseNo: 'TN-DL-006' },
  { name: 'Karuppasamy', experience: 18, languages: ['Tamil', 'Malayalam'], rating: 5.0, trips: 710, image: '/images/drivers/driver_7.png', bio: 'A legend on the Tamil Nadu tourist circuit.', phone: '9876543007', licenseNo: 'TN-DL-007' },
];

const carsData = [
  { name: 'Hyundai Creta', category: 'Compact SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 14, minKmPerDay: 250, driverBata: 400, image: '/images/cars/hyundai creta.jpeg', features: ['Panoramic Sunroof', 'Ventilated Seats', 'Premium Interior', 'Touchscreen Infotainment'], desc: 'The perfect compact SUV for smooth city drives and comfortable highway cruising.', isAvailable: true },
  { name: 'Kia Seltos', category: 'Compact SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 14, minKmPerDay: 250, driverBata: 400, image: '/images/cars/kia seltos.jpeg', features: ['Bose Premium Sound', 'Heads-up Display', 'Air Purifier', 'Sporty Design'], desc: 'A stylish and tech-loaded SUV that offers a premium travel experience on any journey.', isAvailable: true },
  { name: 'Mahindra Scorpio-N', category: 'Premium SUV', seats: 7, fuel: 'Diesel / Petrol', transmission: 'Manual / Automatic', pricePerKm: 18, minKmPerDay: 250, driverBata: 500, image: '/images/cars/mahindra scorpio-n.jpeg', features: ['Commanding Seating', 'Sunroof', 'Tough Build', 'Spacious Third Row'], desc: 'The Big Daddy of SUVs. Exceptional presence, space, and comfort for large groups.', isAvailable: true },
  { name: 'Mahindra Thar', category: 'Adventure SUV', seats: 4, fuel: 'Diesel', transmission: 'Manual / Automatic', pricePerKm: 20, minKmPerDay: 200, driverBata: 500, image: '/images/cars/mahindra thar.jpeg', features: ['4x4 Off-Roading Capability', 'Open Top Option', 'High Ground Clearance'], desc: 'For the thrill-seekers. Best suited for adventurous trips up the steep hills or off-roading.', isAvailable: true },
  { name: 'Tata Nexon', category: 'Compact SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 12, minKmPerDay: 250, driverBata: 350, image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1000&auto=format&fit=crop', features: ['5-Star NCAP Rating', 'Harman Audio', 'High Ground Clearance'], desc: 'A safe, dynamic and comfortable 5-seater for families seeking both economy and style.', isAvailable: true },
  { name: 'Mahindra XUV 3XO', category: 'Compact SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 13, minKmPerDay: 250, driverBata: 400, image: '/images/cars/mahindra xuv 3xo.jpeg', features: ['Level 2 ADAS', 'Panoramic Sunroof', 'Premium Audio'], desc: 'Setting new benchmarks in the compact SUV segment with premium features and performance.', isAvailable: true },
  { name: 'Maruti Suzuki Brezza', category: 'Compact SUV', seats: 5, fuel: 'Petrol / CNG', transmission: 'Manual / Automatic', pricePerKm: 12, minKmPerDay: 250, driverBata: 350, image: '/images/cars/maruti suzuki brezza.jpeg', features: ['HUD Display', '360 Camera', 'High Fuel Efficiency'], desc: "India's most loved compact SUV, featuring bold looks and unmatched reliability.", isAvailable: true },
  { name: 'Honda City', category: 'Premium Sedan', seats: 5, fuel: 'Petrol / Hybrid', transmission: 'Manual / CVT', pricePerKm: 15, minKmPerDay: 250, driverBata: 400, image: '/images/cars/honda city.jpeg', features: ['ADAS Safety', 'Spacious Cabin', 'Refined i-VTEC Engine'], desc: 'A sophisticated sedan offering unparalleled comfort, legroom, and a very smooth, quiet ride.', isAvailable: true },
  { name: 'Hyundai Verna', category: 'Premium Sedan', seats: 5, fuel: 'Petrol / Turbo', transmission: 'Manual / Automatic', pricePerKm: 15, minKmPerDay: 250, driverBata: 400, image: '/images/cars/hyundai verna.jpeg', features: ['Futuristic Design', 'Ventilated Seats', 'Advanced Tech'], desc: 'A futuristic premium sedan that stands out with its bold design and luxury-class interiors.', isAvailable: true },
  { name: 'Swift Dzire', category: 'Sedan', seats: 4, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 12, minKmPerDay: 250, driverBata: 350, image: '/images/cars/maruti suzuki swift.jpeg', features: ['AC', 'Luggage Space', 'Music System'], desc: 'The most popular choice for small families and solo travellers offering great mileage and comfort.', isAvailable: true },
  { name: 'Toyota Innova', category: 'Premium SUV', seats: 7, fuel: 'Diesel', transmission: 'Manual', pricePerKm: 18, minKmPerDay: 300, driverBata: 450, image: '/images/cars/toyota innova.jpeg', features: ['AC', 'Spacious Interiors', 'GPS', 'Extra Luggage Space'], desc: 'The ultimate family favourite SUV for outstation trips, unmatched spaciousness and reliability.', isAvailable: true },
  { name: 'Tempo Traveller', category: 'Mini Van', seats: 12, fuel: 'Diesel', transmission: 'Manual', pricePerKm: 25, minKmPerDay: 300, driverBata: 600, image: '/images/cars/tempo traveller.jpeg', features: ['AC', 'Pushback Seats', 'Ample Legroom', 'TV & Audio System'], desc: 'Perfect for group travel, corporate outings, and large family vacations with utmost comfort.', isAvailable: true },
  { name: 'Luxury Cars', category: 'Business Class', seats: 4, fuel: 'Petrol / Diesel', transmission: 'Automatic', pricePerKm: 45, minKmPerDay: 250, driverBata: 800, image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop', features: ['Leather Interiors', 'Champagne Chiller', 'WiFi', 'Premium Ride'], desc: 'Uncompromising luxury for VIP arrivals, weddings, and premium corporate travel.', isAvailable: true },
  { name: 'Sri Lakshmi Travels Premium Omnibus', category: 'Luxury Bus', seats: 40, fuel: 'Diesel', transmission: 'Automatic', pricePerKm: 65, minKmPerDay: 300, driverBata: 1000, image: '/images/cars/busimage.png', features: ['Emergency Exits', 'Air Suspension', 'Recliner Seats', 'Modern Safety Tools', 'Wi-Fi'], desc: 'Top-of-the-line Sri Lakshmi Travels multi-axle bus ensuring maximum safety and smooth journey.', isAvailable: true },
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

const toursData = [
  {
    "id": "p1",
    "title": "7 Days Magical Kerala",
    "duration": "7 Days / 6 Nights",
    "states": "Kerala",
    "price": 24500,
    "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
    "description": "Experience God's Own Country in its purest form. From the ancient colonial streets of Kochi to the emerald-green tea estates of Munnar, immerse yourself in historic spice trade routes and serene backwaters.",
    "highlights": [
      "Houseboat Stay",
      "Tea Plantations",
      "Spice Tour",
      "Kathakali Show"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Welcome to Kochi",
        "location": "Kochi",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in Kochi, the Queen of the Arabian Sea. Afternoon walk through Fort Kochi observing the iconic Chinese Fishing Nets."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Drive through Spice Hills",
        "location": "Munnar",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive to Munnar, scaling the Western Ghats through mist-filled cardamom and pepper plantations."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Tea Estate Immersion",
        "location": "Munnar",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Trek through the emerald tea gardens. Visit the Tea Museum to learn about CTC and Orthodox processes."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Periyar Wildlife Sanctuary",
        "location": "Thekkady",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Navigate to the evergreen forests of Periyar. Enjoy a boat safari observing wild elephants by the lake."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Venice of the East",
        "location": "Alleppey",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Board a traditional Kettuvallam (houseboat). Cruise the tranquil backwaters as the sun sets over the paddy fields."
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Andhakaranazhi Beach",
        "location": "Mararikulam",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Relax at the pristine Marari beach. Watch local fishermen bring in their evening catch in traditional canoes."
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Departure from Kochi",
        "location": "Kochi",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Morning Shikara ride through narrow canals. Transfer to Cochin International Airport for departure."
      }
    ]
  },
  {
    "id": "p2",
    "title": "14 Days Grand Southern Heritage",
    "duration": "14 Days / 13 Nights",
    "states": "Tamil Nadu & Kerala",
    "price": 52000,
    "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
    "description": "An epic journey revealing the magnificent architectural heritage of Tamil Nadu—tall Dravidian gopurams—and the lush, laid-back topography of Kerala.",
    "highlights": [
      "Meenakshi Temple",
      "Brihadeeswarar Temple",
      "Kanyakumari Sunset",
      "Kerala Backwaters"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Gateway to the South",
        "location": "Chennai",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in Chennai, the city of temples and beaches. Explore the vibrant Marina Beach at sunset."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Rock-Cut Wonders",
        "location": "Mahabalipuram",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Examine the Pallava dynasty's monoliths—the Five Rathas and the Shore Temple overlooking the Bay of Bengal."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "The French Riviera",
        "location": "Pondicherry",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Wander through the Ville Blanche (White Town) with its distinct French colonial architecture and mustard-yellow villas."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Chola Architecture",
        "location": "Thanjavur",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Study the majestic Brihadeeswarar Temple, a UNESCO site built entirely from granite by the Great Cholas."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Chettinad Heritage",
        "location": "Chettinad",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Explore the palatial mansions of Chettinad, famous for their Burmese teak, Italian marble, and Belgian glass craftsmanship."
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Ancient Temple City",
        "location": "Madurai",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Witness the intricate stone carvings and the thousand-pillar hall of the Meenakshi Amman Temple."
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Crossing the Ocean",
        "location": "Rameshwaram",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive across the Pamban Bridge to the sacred island of Rameshwaram. Visit the long corridors of the main temple."
      },
      {
        "day": 8,
        "dateString": "Day 8",
        "title": "The Tip of India",
        "location": "Kanyakumari",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Stand at the confluence of three seas. Take a ferry to the Vivekananda Rock Memorial."
      },
      {
        "day": 9,
        "dateString": "Day 9",
        "title": "Serene Coastline",
        "location": "Kovalam",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Journey into Kerala to Kovalam. Relax on the crescent-shaped Lighthouse Beach with its shallow waters."
      },
      {
        "day": 10,
        "dateString": "Day 10",
        "title": "Capital of Culture",
        "location": "Trivandrum",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Explore the Napier Museum and the Sree Chitra Art Gallery showcasing traditional Kerala mural art."
      },
      {
        "day": 11,
        "dateString": "Day 11",
        "title": "Aquatic Labyrinth",
        "location": "Alleppey",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive to the backwaters. Experience the unique lifestyle of people living on islands below sea level."
      },
      {
        "day": 12,
        "dateString": "Day 12",
        "title": "Wildlife & Tea",
        "location": "Thekkady",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Ascend to the spice hills of Thekkady. Take a guided tour through pepper and cardamom plantations."
      },
      {
        "day": 13,
        "dateString": "Day 13",
        "title": "Historical Port",
        "location": "Kochi",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in Kochi. Visit the Jewish Synagogue and the Mattancherry Dutch Palace."
      },
      {
        "day": 14,
        "dateString": "Day 14",
        "title": "Grand Finale",
        "location": "Kochi",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Final morning souvenir shopping. Transfer to Kochi International Airport for your journey home."
      }
    ]
  },
  {
    "id": "p3",
    "title": "3 Days Munnar Weekend Escape",
    "duration": "3 Days / 2 Nights",
    "states": "Kerala",
    "price": 12500,
    "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
    "description": "A quick yet deeply refreshing getaway to the misty, tea-carpeted hills of Munnar. Learn about the British colonial legacy and the Anamalai hills.",
    "highlights": [
      "Tea Gardens",
      "Echo Point",
      "Mattupetty Dam"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Ascent to the Blue Mountains",
        "location": "Munnar",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Ascend the Nilgiri biosphere to Ooty. Learn about the UNESCO-listed Nilgiri Mountain Railway."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Tea and Lake Topography",
        "location": "Munnar",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Visit the Tata Tea Museum. Later, study the gravity dam architecture of Mattupetty."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Botanical Heritage",
        "location": "Kochi",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Enjoy a final stroll through the tea gardens before the scenic descent back to the airport."
      }
    ]
  },
  {
    "id": "p4",
    "title": "5 Days Backwater & Beach Bliss",
    "duration": "5 Days / 4 Nights",
    "states": "Kerala",
    "price": 19000,
    "image": "https://images.unsplash.com/photo-1593693175869-79a83441589c?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
    "description": "Explore the hydrology, ornithology, and serene aesthetics of the Vembanad Lake system and the Arabian Sea coastline.",
    "highlights": [
      "Houseboat",
      "Kumarakom Bird Sanctuary",
      "Marari Beach"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Lake City Arrival",
        "location": "Kumarakom",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in Kochi, drive to Kumarakom. Check into a heritage resort on the banks of Vembanad Lake."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Bird Sanctuary Trek",
        "location": "Kumarakom",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Morning ecological tour of the Kumarakom Bird Sanctuary. Spot migratory birds from across the globe."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Houseboat Navigation",
        "location": "Alleppey",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Board your private houseboat for an overnight cruise through the intricate labyrinth of backwaters."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Andhakaranazhi Beach",
        "location": "Mararikulam",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Disembark and drive to Marari beach. This coastline offers a unique perspective on tropical geography."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Arabian Sea Departure",
        "location": "Kochi",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Morning at leisure. Afternoon transfer to Kochi International Airport for your flight back home."
      }
    ]
  },
  {
    "id": "p5",
    "title": "4 Days Temple City Tour",
    "duration": "4 Days / 3 Nights",
    "states": "Tamil Nadu",
    "price": 15000,
    "image": "https://images.unsplash.com/photo-1588698511634-80cf2a4d9435?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
    "description": "A highly concentrated study of monumental Dravidian religious architecture. Travel back to the Pandyan and Chola eras, analyzing city plans designed as concentric rectangles around massive central sanctums.",
    "highlights": [
      "Meenakshi Temple",
      "Srirangam Temple",
      "Rock Fort"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Pandyan Architecture",
        "location": "Madurai",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in Madurai. Evening visit to the magnificent Meenakshi Amman Temple to study its incredible painted gopurams."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Royal Pillars",
        "location": "Madurai",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Explore the Thirumalai Nayakkar Mahal, studying its immense circular pillars and vaulted roof architecture."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "The Seven Enclosures",
        "location": "Trichy",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive to Trichy. Visit Srirangam, the largest functioning Hindu temple in the world with seven concentric enclosures."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Granite Monoliths",
        "location": "Trichy",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Ascend the Rock Fort temple. Experience a panoramic view of the Kaveri Delta. Transfer to airport."
      }
    ]
  },
  {
    "id": "p6",
    "title": "6 Days Ooty & Kodaikanal",
    "duration": "6 Days / 5 Nights",
    "states": "Tamil Nadu",
    "price": 26000,
    "image": "https://images.unsplash.com/photo-1627448833912-7043329007cb?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
    "description": "Analyze the geographical and cultural nuances between the Nilgiri Hills (Ooty) and the Palani Hills (Kodaikanal). Traverse high-altitude grasslands, valleys, and colonial-era botanical engineering.",
    "highlights": [
      "Nilgiri Mountain Railway",
      "Botanical Gardens",
      "Kodaikanal Lake"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Ascent to the Nilgiris",
        "location": "Ooty",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Ascend the Nilgiri biosphere to Ooty. Learn about the UNESCO-listed Nilgiri Mountain Railway."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Colonial Horticulture",
        "location": "Ooty",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Study high-altitude horticulture at the Government Botanical Gardens, established in 1848."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Inter-Range Drive",
        "location": "Kodaikanal",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "A long inter-range drive from the Nilgiris to the Palani Hills, observing distinct changes in vegetation."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Pillar Rocks & Caves",
        "location": "Kodaikanal",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Examine the sheer vertical cliffs of Pillar Rocks and the deep crevices of the pine-scented Guna Caves."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Star-Shaped Lake",
        "location": "Kodaikanal",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Cycle around the artificial, star-shaped Kodaikanal Lake, engineered in 1863 as a summer retreat."
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Descent to the Plains",
        "location": "Madurai",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Descend through 17 hairpin bends back to the warm plains of Madurai for your departure."
      }
    ]
  },
  {
    "id": "p7",
    "title": "4 Days Rameshwaram Pilgrimage",
    "duration": "4 Days / 3 Nights",
    "states": "Tamil Nadu",
    "price": 18000,
    "image": "https://images.unsplash.com/photo-1624641982705-021021bc69ba?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
    "description": "A study of extreme geographical points and monumental faith. Journey to the tip of the Indian peninsula and the Pamban Island.",
    "highlights": [
      "Pamban Bridge",
      "Dhanushkodi",
      "Kanyakumari Sunset"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "The Pamban Bridge",
        "location": "Rameshwaram",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive to Rameshwaram across the stunning Pamban Ocean Bridge, an engineering marvel connecting the mainland to the island."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Sacred Wells & Ghost Town",
        "location": "Rameshwaram",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Holy bath at the 22 consecrated wells. Afternoon visit to Dhanushkodi, the ghost town destroyed in the 1964 cyclone."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Coastal Confluence",
        "location": "Kanyakumari",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive to the southernmost tip. Witness the sunset over the Arabian Sea, the Bay of Bengal, and the Indian Ocean."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Grand Palace Departure",
        "location": "Trivandrum",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Observe the Kanyakumari sunrise. Drive to Trivandrum, visiting the Padmanabhapuram Palace before airport drop."
      }
    ]
  },
  {
    "id": "p8",
    "title": "5 Days Wayanad Wilderness",
    "duration": "5 Days / 4 Nights",
    "states": "Kerala",
    "price": 21000,
    "image": "https://images.unsplash.com/photo-1589146914589-9fc6bbf200b3?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
    "description": "Immerse yourself in the dense jungles, cascading waterfalls, and spice plantations of Northern Kerala.",
    "highlights": [
      "Edakkal Caves",
      "Soochipara Falls",
      "Chembra Peak"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Into the High Ranges",
        "location": "Wayanad",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Ascend the Western Ghats to Wayanad. Check into a plantation resort surrounded by coffee and spices."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Neolithic Carvings",
        "location": "Wayanad",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Trek to the Edakkal Caves to observe Neolithic petroglyphs. Later, enjoy boating on Pookode Lake."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Thundering Waterfalls",
        "location": "Wayanad",
        "image": "https://images.unsplash.com/photo-1605553950269-026048d08cb5?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Visit the three-tiered Soochipara Waterfalls. Afternoon wildlife safari in the Muthanga range."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Tea Garden Panorama",
        "location": "Wayanad",
        "image": "https://images.unsplash.com/photo-1600100395420-474c0e7b28af?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Explore the rolling tea estates of Meppadi. Visit the Banasura Sagar Dam, India's largest earth dam."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Tropical Forest Departure",
        "location": "Calicut",
        "image": "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Morning organic spice shopping. Drive back down the Ghats for your departure from Calicut."
      }
    ]
  },
  {
    "id": "p9",
    "title": "3 Days Pondicherry Retreat",
    "duration": "3 Days / 2 Nights",
    "states": "Pondicherry",
    "price": 13500,
    "image": "https://images.unsplash.com/photo-1621516087532-6b9c97b25203?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
    "description": "Experience a slice of France in India. Walk the cobblestone streets, chill at the cafes, and find peace in Auroville.",
    "highlights": [
      "Aurobindo Ashram",
      "Auroville",
      "Promenade Beach"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Coastal Heritage Drive",
        "location": "Pondicherry",
        "image": "https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive along the East Coast Road. Arrive in the French Quarter and walk along the Promenade beach."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Ville Blanche Culture",
        "location": "Pondicherry",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Visit Auroville's Matrimandir. Later, explore the mustard-yellow lanes and artisanal boutiques of White Town."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Bay of Bengal Departure",
        "location": "Chennai",
        "image": "https://images.unsplash.com/photo-1585089853926-d621589a80e4?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Morning boat ride to Paradise Beach. After lunch, begin the return journey to Chennai."
      }
    ]
  },
  {
    "id": "p10",
    "title": "4 Days Yercaud & Kolli Hills",
    "duration": "4 Days / 3 Nights",
    "states": "Tamil Nadu",
    "price": 15500,
    "image": "https://images.unsplash.com/photo-1592598375127-ec1642861a4c?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
    "description": "An offbeat mountainous adventure driving through the famous 70 hairpin bends of Kolli Hills and the peaceful lakes of Yercaud.",
    "highlights": [
      "70 Hairpin Bends",
      "Agaya Gangai Falls",
      "Yercaud Lake"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Hill Station Ascent",
        "location": "Yercaud",
        "image": "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Climb into the Shevaroy Hills. Enjoy an evening walk through the aromatic coffee plantations."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Shevaroy Viewpoints",
        "location": "Yercaud",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Visit Lady's Seat, the Rose Garden, and Kiliyur Falls, observing the unique local flora."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "70 Hairpin Bends",
        "location": "Kolli Hills",
        "image": "https://images.unsplash.com/photo-1531694611353-d9cc46f120c1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Traverse the legendary 70 hairpin bends to Kolli Hills. Experience raw, untouched mountain nature."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Sacred Waterfalls Departure",
        "location": "Salem",
        "image": "https://images.unsplash.com/photo-1586522334512-98aa0a442167?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Trek to Agaya Gangai water falls and visit the ancient Arapaleeswarar Temple before departure."
      }
    ]
  },
  {
    "id": "p11",
    "title": "7 Days Majestic Mysore & Coorg",
    "duration": "7 Days / 6 Nights",
    "states": "Karnataka",
    "price": 32000,
    "title": "5 Days Chikmagalur Coffee Trails",
    "duration": "5 Days / 4 Nights",
    "states": "Karnataka",
    "price": 22000,
    "image": "https://images.unsplash.com/photo-1602490807664-8df6322ad44a?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
    "description": "Discover the birthplace of Indian coffee. Trek through the misty Mullayanagiri peaks and explore the ancient Hoysala temple architecture.",
    "highlights": [
      "Mullayanagiri Peak",
      "Coffee Plantations",
      "Belur Temple"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Into the Coffee Hills",
        "location": "Chikmagalur",
        "image": "https://images.unsplash.com/photo-1596420542368-2a033f7b28af?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in the land where coffee was first grown in India. Check into a lush hill resort."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "The Highest Peak",
        "location": "Mullayanagiri",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Trek to Mullayanagiri, the highest peak in Karnataka. Witness the clouds drifting below you."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Sacred Baba Budangiri",
        "location": "Chikmagalur",
        "image": "https://images.unsplash.com/photo-1586522334512-98aa0a442167?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Visit the Dattatreya Peetha and the rolling grasslands of the Baba Budangiri range."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Hoysala Stone Poems",
        "location": "Belur",
        "image": "https://images.unsplash.com/photo-1610427845344-93825700778c?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Excursion to the 12th-century Chennakeshava Temple in Belur, a UNESCO heritage site of delicate stone carvings."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Departure",
        "location": "Bangalore",
        "image": "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Final morning coffee estate tour before the return drive to the plains of Bangalore."
      }
    ]
  },
  {
    "id": "p12",
    "title": "6 Days Trivandrum Coastal Vibe",
    "duration": "6 Days / 5 Nights",
    "states": "Kerala",
    "price": 24000,
    "image": "https://images.unsplash.com/photo-1589201584449-74e8a8e3d09e?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
    "description": "Experience the laid-back coastal charm of Kerala, from the historic temples of Trivandrum to the dramatic cliffs of Varkala.",
    "highlights": [
      "Padmanabhaswamy Temple",
      "Kovalam Beach",
      "Varkala Cliffs"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Historic Anantha Palace",
        "location": "Trivandrum",
        "image": "https://images.unsplash.com/photo-1605553950269-026048d08cb5?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in the city of Lord Anantha. Visit the Padmanabhaswamy Temple, the world's richest shrine."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Crescent Lighthouse Beach",
        "location": "Kovalam",
        "image": "https://images.unsplash.com/photo-1596766467380-4592ce5d3424?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive to Kovalam. Spend the day by the red lighthouse on the crescent-shaped beach."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Mist-Filled Ponmudi",
        "location": "Trivandrum",
        "image": "https://images.unsplash.com/photo-1593693397690-362cb9666cb3?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "A day trip through the Shola forests to Ponmudi hills. Experience the cool mist and winding roads."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "The Cliffs of Varkala",
        "location": "Varkala",
        "image": "https://images.unsplash.com/photo-1600100395420-474c0e7b28af?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Travel north to Varkala. Check into a resort on the unique Cenozoic cliffs overlooking the Arabian Sea."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Cliff Walk & Holy Springs",
        "location": "Varkala",
        "image": "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Walk the Varkala cliff. Visit the 2000-year-old Janardanaswamy Temple and the holy Papanasam springs."
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Departure",
        "location": "Trivandrum",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Morning checkout and easy drive to Trivandrum Airport."
      }
    ]
  },
  {
    "id": "p13",
    "title": "5 Days Historical Hampi",
    "duration": "5 Days / 4 Nights",
    "states": "Karnataka",
    "price": 17500,
    "image": "https://images.unsplash.com/photo-1600080645604-db80cb70e30d?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
    "description": "Travel back to the Vijayanagara Empire. Explore the Martian-like boulder landscapes and the intricate stone chariots and temple ruins of Hampi.",
    "highlights": [
      "Virupaksha Temple",
      "Stone Chariot",
      "Tungabhadra River"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "location": "Hampi",
        "image": "https://images.unsplash.com/photo-1602490807664-8df6322ad44a?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Explore the Queen's Bath, Lotus Mahal, and the Elephant Stables displaying Indo-Islamic architecture."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Vittala Temple",
        "location": "Hampi",
        "image": "https://images.unsplash.com/photo-1588698511634-80cf2a4d9435?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Witness the iconic Stone Chariot and the musical pillars of the Vittala Temple complex."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Departure",
        "location": "Hubli",
        "image": "https://images.unsplash.com/photo-1584281358892-0b7b3edb4aeb?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Morning coracle ride on the river. Transfer to Hubli airport for departure."
      }
    ]
  },
  {
    "id": "p14",
    "title": "6 Days Andaman Escape",
    "duration": "6 Days / 5 Nights",
    "states": "Andaman & Nicobar",
    "price": 35000,
    "image": "https://images.unsplash.com/photo-1605553950269-026048d08cb5?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
    "description": "Experience the ultimate tropical paradise with crystal-clear turquoise waters, white sandy beaches, and incredible coral reefs.",
    "highlights": [
      "Radhanagar Beach",
      "Cellular Jail",
      "Scuba Diving"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Port Blair Arrival",
        "location": "Port Blair",
        "image": "https://images.unsplash.com/photo-1610427320078-4172f3e536c4?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in Port Blair. Visit the historically significant Cellular Jail and witness the evening Light & Sound show."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Cruise to Havelock",
        "location": "Havelock Island",
        "image": "https://images.unsplash.com/photo-1590858547475-4dc2a9ab4ddb?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Board a luxury ferry to Havelock Island. Afternoon visit to the world-renowned Radhanagar Beach."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Elephant Beach",
        "location": "Havelock Island",
        "image": "https://images.unsplash.com/photo-1589201584449-74e8a8e3d09e?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Take a speed boat to Elephant beach. Go Sea Walking or Snorkeling among vibrant coral reefs."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Neil Island Transfer",
        "location": "Neil Island",
        "image": "https://images.unsplash.com/photo-1584281358892-0b7b3edb4aeb?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Ferry to Neil Island. Visit the natural rock bridge formation and pristine Laxmanpur Beach for sunset."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Return to Port Blair",
        "location": "Port Blair",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Morning at Bharatpur beach. Afternoon ferry back to the capital city of Port Blair."
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Departure",
        "location": "Port Blair",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Morning shopping for pearl and shell handicrafts. Transfer to Veer Savarkar Airport."
      }
    ]
  },
  {
    "id": "p15",
    "title": "4 Days Golden Amritsar",
    "duration": "4 Days / 3 Nights",
    "states": "Punjab",
    "price": 14000,
    "image": "https://images.unsplash.com/photo-1601058269781-a9f9479b1df0?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
    "description": "Experience the immense spiritual energy of the Golden Temple and the patriotic fervor at the Wagah Border in the heart of Punjab.",
    "highlights": [
      "Golden Temple",
      "Wagah Border",
      "Jallianwala Bagh"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Arrival in Amritsar",
        "location": "Amritsar",
        "image": "https://images.unsplash.com/photo-1629853928173-9fbda958d047?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in Amritsar. Evening visit to the illuminated Harmandir Sahib (Golden Temple) for the Palki Sahib ceremony."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "History and Patriotism",
        "location": "Amritsar",
        "image": "https://images.unsplash.com/photo-1601058269781-a9f9479b1df0?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Visit the historic Jallianwala Bagh. Afternoon drive to the Wagah Border for the dramatic retreat ceremony."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Cultural Punjab",
        "location": "Amritsar",
        "image": "https://images.unsplash.com/photo-1596420542368-2a033f7b28af?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Visit the Partition Museum. Enjoy authentic Punjabi cuisine at famous local dhabas."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Departure",
        "location": "Amritsar",
        "image": "https://images.unsplash.com/photo-1610427845344-93825700778c?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Morning Seva at the Golden Temple langar. Transfer to Sri Guru Ram Dass Jee International Airport."
      }
    ]
  },
  {
    "id": "p16",
    "title": "7 Days Golden Triangle Heritage",
    "duration": "7 Days / 6 Nights",
    "states": "Delhi, UP, Rajasthan",
    "price": 28500,
    "image": "https://images.unsplash.com/photo-1564507592227-0b0efa4824d1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
    "description": "Travel through the iconic Golden Triangle. Includes extensive architectural theory on the Taj Mahal, Amber Fort, and Qutub Minar. Unveil the layered history of the Mughals and Rajputs.",
    "highlights": [
      "Taj Mahal",
      "Amber Fort",
      "Qutub Minar",
      "City Palace"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Old Delhi History",
        "location": "New Delhi",
        "image": "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Explore the Red Fort and Jama Masjid. Navigate the chaotic but thrilling lanes of Chandni Chowk."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Imperial New Delhi",
        "location": "New Delhi",
        "image": "https://images.unsplash.com/photo-1585089853926-d621589a80e4?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive past India Gate and Parliament. Visit Humayun's Tomb and the towering Qutub Minar."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Drive to Agra",
        "location": "Agra",
        "image": "https://images.unsplash.com/photo-1564507592227-0b0efa4824d1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Journey to Agra. Visit the Agra Fort, studying its red sandstone defensive architecture."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "The Taj Mahal",
        "location": "Agra",
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Sunrise at the Taj Mahal, analyzing the immaculate Mughal optical illusions. Drive to Jaipur via Fatehpur Sikri."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "The Pink City",
        "location": "Jaipur",
        "image": "https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Ascend Amber Fort by jeep. Explore the City Palace and the honeycomb structure of Hawa Mahal."
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Astronomical Jaipur",
        "location": "Jaipur",
        "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Visit the Jantar Mantar (astronomical observatory). Evening shopping in local Johari bazaar."
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Return to Delhi",
        "location": "New Delhi",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive back to Delhi. Checkout and transfer to Indira Gandhi International Airport."
      }
    ]
  },
  {
    "id": "p17",
    "title": "7 Days Royal Rajasthan Odyssey",
    "duration": "7 Days / 6 Nights",
    "states": "Rajasthan",
    "price": 31000,
    "image": "https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
    "description": "Covers the engineering of Udaipur's lake cities, the massive Mehrangarh Fort in Jodhpur, and the golden desert culture of Jaisalmer.",
    "highlights": [
      "Mehrangarh Fort",
      "Lake Pichola",
      "Thar Desert Safari"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Venice of the East",
        "location": "Udaipur",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in Udaipur. Evening boat ride on Lake Pichola overlooking the Lake Palace."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Udaipur Palaces",
        "location": "Udaipur",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Visit the sprawling City Palace complex and the intricate carvings of Jagdish Temple."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Journey to Jodhpur",
        "location": "Jodhpur",
        "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive to the Blue City, Jodhpur. En route visit the stunning Ranakpur Jain Temple."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "The Mighty Mehrangarh",
        "location": "Jodhpur",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Explore Mehrangarh Fort, a sheer architectural masterpiece on a 125m high hill. Visit Jaswant Thada."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Desert Calling",
        "location": "Jaisalmer",
        "image": "https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive to Jaisalmer. Evening camel safari into the Thar Desert's Sam Sand Dunes for sunset."
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "The Golden Fort",
        "location": "Jaisalmer",
        "image": "https://images.unsplash.com/photo-1585089853926-d621589a80e4?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Tour the Jaisalmer Fort—a living fort built from golden sandstone, and the intricately carved Patwon Ki Haveli."
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Departure",
        "location": "Jodhpur",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive back to Jodhpur airport for onward journey."
      }
    ]
  },
  {
    "id": "p18",
    "title": "7 Days Kashmir Paradise",
    "duration": "7 Days / 6 Nights",
    "states": "Jammu & Kashmir",
    "price": 34000,
    "image": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
    "description": "Covers Dal Lake, Gulmarg, Pahalgam, and the history of pristine Mughal gardens. Known globally as Paradise on Earth.",
    "highlights": [
      "Shikara Ride",
      "Gulmarg Gondola",
      "Betaab Valley"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Srinagar Arrival",
        "location": "Srinagar",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in Srinagar. Transfer to a premium houseboat on Dal Lake. Enjoy a relaxing evening Shikara ride."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Mughal Gardens",
        "location": "Srinagar",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Visit the historically rich Nishat Bagh and Shalimar Bagh, structured meticulously by Mughal emperors."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Meadow of Flowers",
        "location": "Gulmarg",
        "image": "https://images.unsplash.com/photo-1602490807664-8df6322ad44a?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive to Gulmarg. Experience the spectacular Gulmarg Gondola, one of the world's highest cable cars."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Valley of Shepherds",
        "location": "Pahalgam",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Travel to Pahalgam. Enjoy the scenic terrain alongside the Lidder river."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Exploring Pahalgam",
        "location": "Pahalgam",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Visit Aru Valley and Betaab Valley. Witness the lush green meadows surrounded by snow-capped peaks."
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Return to Srinagar",
        "location": "Srinagar",
        "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive back to Srinagar. Shop for authentic Kashmiri Pashminas and saffron in local markets."
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Departure",
        "location": "Srinagar",
        "image": "https://images.unsplash.com/photo-1585089853926-d621589a80e4?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Morning checkout. Transfer to Srinagar airport for departure."
      }
    ]
  },
  {
    "id": "p19",
    "title": "7 Days Himalayan Escapade",
    "duration": "7 Days / 6 Nights",
    "states": "Himachal Pradesh",
    "price": 27500,
    "image": "https://images.unsplash.com/photo-1629853928173-9fbda958d047?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
    "description": "Deep dive into colonial British architecture in Shimla and the rugged mountainous terrain of the Manali valleys.",
    "highlights": [
      "Shimla Ridge",
      "Rohtang Pass",
      "Solang Valley"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Chandigarh to Shimla",
        "location": "Shimla",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in Chandigarh, drive up to Shimla, India's former summer capital."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Shimla Architecture",
        "location": "Shimla",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Walk the Ridge, visit the neo-Gothic Christ Church, and the Viceregal Lodge."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Drive to Manali",
        "location": "Manali",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "A scenic, winding journey alongside the Beas River to reach Manali."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "High Altitude Pass",
        "location": "Manali",
        "image": "https://images.unsplash.com/photo-1629853928173-9fbda958d047?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Excursion to the breathtaking alpine terrain of Rohtang Pass or Solang Valley for snow activity."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Old Manali",
        "location": "Manali",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Visit the 16th century Hadimba Temple built in pagoda style amid deodar forests."
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Kullu Valley",
        "location": "Kullu",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive back via Kullu. Optional river rafting. Evening reach Chandigarh."
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Departure",
        "location": "Chandigarh",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Transfer to Chandigarh airport/station."
      }
    ]
  },
  {
    "id": "p20",
    "title": "7 Days Uttarakhand Spiritual",
    "duration": "7 Days / 6 Nights",
    "states": "Uttarakhand",
    "price": 24000,
    "image": "https://images.unsplash.com/photo-1585089853926-d621589a80e4?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
    "description": "Explanation of the Ganges' profound significance, yoga history, and the beautiful Himalayan foothills in Mussoorie.",
    "highlights": [
      "Ganga Aarti",
      "Yoga in Rishikesh",
      "Kempty Falls"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Haridwar Arrival",
        "location": "Haridwar",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in Haridwar, the gateway to the Gods. Witness the magnificent evening Ganga Aarti at Har Ki Pauri."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Rishikesh Asceticism",
        "location": "Rishikesh",
        "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive to Rishikesh. Explore the suspension bridges (Ram & Lakshman Jhula) and the Beatles Ashram."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Yoga & Rafting",
        "location": "Rishikesh",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Morning yoga overlooking the Ganges. Afternoon thrilling white water rafting experience."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Queen of the Hills",
        "location": "Mussoorie",
        "image": "https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive up the treacherous paths to Mussoorie. Enjoy the evening stroll on Mall Road."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Gun Hill & Waterfalls",
        "location": "Mussoorie",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Cable car ride to Gun Hill. Afternoon excursion to the cascading waters of Kempty Falls."
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Dehradun Excursion",
        "location": "Dehradun",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Descend to Dehradun. Visit the Tibetan Mindrolling Monastery and the Forest Research Institute."
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Departure",
        "location": "Dehradun",
        "image": "https://images.unsplash.com/photo-1564507592227-0b0efa4824d1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Morning checkout. Transfer to Dehradun (Jolly Grant) Airport."
      }
    ]
  },
  {
    "id": "p21",
    "title": "7 Days Sikkim & Darjeeling",
    "duration": "7 Days / 6 Nights",
    "states": "Sikkim & West Bengal",
    "price": 29500,
    "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
    "description": "Deeply explore Tibetan Buddhism, hilltop monasteries, and the architectural history of the Darjeeling Himalayan Railway.",
    "highlights": [
      "Tiger Hill Sunrise",
      "Nathu La Pass",
      "Rumtek Monastery"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Arrival in Bagdogra",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive from Bagdogra through winding roads covered with tea estates up to Darjeeling."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Tiger Hill Magic",
        "location": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Early morning drive to Tiger Hill for a spectacular sunrise over Mt. Kanchenjunga."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Drive to Gangtok",
        "location": "Gangtok",
        "image": "https://images.unsplash.com/photo-1564507592227-0b0efa4824d1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Travel into Sikkim to its capital Gangtok. Visit the Namgyal Institute of Tibetology."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Tsomgo Lake",
        "location": "Gangtok",
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Excursion to the oval-shaped, glacial Tsomgo Lake at 12,400 ft and Baba Mandir."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Monasteries & Mountains",
        "location": "Gangtok",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Explore Rumtek Monastery, showcasing authentic Tibetan Buddhist architecture."
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Kalimpong Retreat",
        "location": "Kalimpong",
        "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Descend to Kalimpong. Visit Deolo Hill and the pine-scented Durpin Monastery."
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Departure",
        "location": "Bagdogra",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Transfer back to Bagdogra airport for departure."
      }
    ]
  },
  {
    "id": "p22",
    "title": "7 Days Meghalaya Wonders",
    "duration": "7 Days / 6 Nights",
    "states": "Meghalaya & Assam",
    "price": 31000,
    "image": "https://images.unsplash.com/photo-1610427845344-93825700778c?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
    "description": "Theory on the Living Root Bridges (how they are grown by tribes in deep wet forests) and Kaziranga wildlife.",
    "highlights": [
      "Living Root Bridge",
      "Dawki River",
      "Kaziranga Rhino"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Guwahati to Shillong",
        "location": "Shillong",
        "image": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in Guwahati, drive up to Shillong, the Scotland of the East. Stop by Umiam Lake."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Wettest Place on Earth",
        "location": "Cherrapunji",
        "image": "https://images.unsplash.com/photo-1620619864275-d14fb57b2931?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive to Cherrapunji. Visit the dramatic Nohkalikai Falls plunging down a steep cliff."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Living Root Bridges",
        "location": "Cherrapunji",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Trek down to the Double Decker Living Root Bridge, a bio-engineering marvel grown over decades."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Crystal Clear Dawki",
        "location": "Dawki",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Visit Mawlynnong (Asia's cleanest village) and boat on the emerald-clear Umngot River in Dawki."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Descent to Assam",
        "location": "Kaziranga",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive down to the plains of Assam to Kaziranga National Park, a UNESCO World Heritage site."
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Kaziranga Safari",
        "location": "Kaziranga",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Early morning elephant safari and afternoon jeep safari to spot the one-horned rhinoceros."
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Departure",
        "location": "Guwahati",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Return to Guwahati. Visit the ancient Kamakhya Temple before airport drop."
      }
    ]
  },
  {
    "id": "p23",
    "title": "7 Days Gujarat Cultural Safari",
    "duration": "7 Days / 6 Nights",
    "states": "Gujarat",
    "price": 28000,
    "image": "https://images.unsplash.com/photo-1596765799797-2a1f81d4a034?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
    "description": "Intricate details on the expansive white Rann of Kutch ecology, Asiatic Lions in Gir, and Somnath Temple architecture.",
    "highlights": [
      "Rann of Kutch",
      "Gir Lions",
      "Somnath Temple"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Arrival in Ahmedabad",
        "location": "Ahmedabad",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in Ahmedabad. Visit the Sabarmati Ashram and the highly intricate Adalaj Stepwell."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "The White Desert",
        "location": "Kutch",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive to Bhuj and onwards to the Great Rann of Kutch. Experience the stark white salt desert."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Kutch Handicrafts",
        "location": "Kutch",
        "image": "https://images.unsplash.com/photo-1596766461944-93c6ae184dbf?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Explore artisan villages (Banni) producing traditional embroidery and Rogan art."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Somnath",
        "location": "Somnath",
        "image": "https://images.unsplash.com/photo-1650893321689-d9fcbef6f9df?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Travel down the coast. Visit the grand Somnath Temple, the first of the 12 Jyotirlingas."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Asiatic Lions",
        "location": "Gir",
        "image": "https://images.unsplash.com/photo-1593615304624-9b24cd51221f?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Drive to Sasan Gir. Afternoon jeep safari looking for the rare Asiatic Lion."
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Diu Island Escape",
        "location": "Diu",
        "image": "https://images.unsplash.com/photo-1589201584449-74e8a8e3d09e?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Cross into the Union Territory of Diu. Explore the Portuguese Fort and Nagoa Beach."
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Departure",
        "location": "Rajkot",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Transfer back to Rajkot or Ahmedabad airport."
      }
    ]
  },
  {
    "id": "p24",
    "title": "7 Days Heart of India",
    "duration": "7 Days / 6 Nights",
    "states": "Madhya Pradesh",
    "price": 27000,
    "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
    "description": "Deep dive into the Khajuraho temples' carvings, the stupas of Sanchi, and the impregnable Gwalior Fort.",
    "highlights": [
      "Khajuraho Temples",
      "Gwalior Fort",
      "Sanchi Stupa"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Khajuraho Arrival",
        "location": "Khajuraho",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in Khajuraho. Explore the incredible sandstone temples known for their architectural symbolism."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Gwalior Fort",
        "location": "Gwalior",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Explore the massive Gwalior Fort, featuring the stunning blue-tiled Man Singh Palace."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Sanchi Stupa",
        "location": "Sanchi",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Visit the Great Stupa at Sanchi, an outstanding specimen of Buddhist art and architecture dating back to Emperor Ashoka."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Orchha Heritage",
        "location": "Orchha",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Wander through the medieval cenotaphs and intricate palaces built by the Bundela Rajput chiefs along the Betwa river."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Bhopal Lake Walk",
        "location": "Bhopal",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Enjoy a serene walk around Upper Lake (Bhojtal), the oldest man-made lake in India."
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Pachmarhi Hills",
        "location": "Pachmarhi",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Ascend to Pachmarhi, the 'Queen of Satpura'. Discover picturesque waterfalls and verdant valleys."
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Departure",
        "location": "Khajuraho",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Transfer to the airport for your onward journey, carrying majestic memories."
      }
    ]
  },
  {
    "id": "p25",
    "title": "7 Days Goa Coastal Tour",
    "duration": "7 Days / 6 Nights",
    "states": "Goa",
    "price": 26000,
    "image": "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
    "description": "Extensive theory on Portuguese colonial architecture, old cathedrals, and spice farming. It goes far beyond the beaches.",
    "highlights": [
      "Old Goa Cathedrals",
      "Dudhsagar Falls",
      "Spice Plantations"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Arrival in Paradise",
        "location": "Goa",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Arrive in Goa. Check into a beachfront resort in South Goa for immediate relaxation."
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Portuguese Architecture",
        "location": "Old Goa",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Visit the UNESCO sites in Old Goa: Basilica of Bom Jesus and Se Cathedral, analyzing their Iberian designs."
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Spice Route",
        "location": "Ponda",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
        "desc": "Tour the spice plantations in Ponda. Learn how the Portuguese influenced Indian cuisine."
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "The Milky Waterfall",
        "location": "Dudhsagar",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
        "desc": "Jeep ride to the magnificent 4-tiered Dudhsagar Waterfalls deep in the Bhagwan Mahaveer Sanctuary."
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Move to North Goa",
        "location": "North Goa",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Shift base to North Goa. Explore Aguada Fort and witness the Arabian Sea."
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Culture and Coasts",
        "location": "Vagator",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
        "desc": "Visit the Chapora Fort ruins and relax at Vagator or Anjuna beaches."
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Departure",
        "location": "Dabolim",
        "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
        "desc": "Departure from Dabolim or Mopa airport."
      }
    ]
  }
];

// ────────────────────────────────────────────────────────
// SEED FUNCTION
// ────────────────────────────────────────────────────────

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('🌱 Starting database seed...\n');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Tour.deleteMany({}),
      Car.deleteMany({}),
      Driver.deleteMany({}),
      Review.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data.');

    // Create Admin user
    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@slt.com',
      phone: '9876543210',
      password: 'admin123',
      role: 'admin',
      isVerified: true,
    });
    console.log(`👤 Admin created: ${adminUser.email} / admin123`);

    // Create Test user
    const testUser = await User.create({
      name: 'Nithya',
      email: 'user@test.com',
      phone: '9876543211',
      password: 'user123',
      role: 'user',
      isVerified: true,
    });
    console.log(`👤 Test user created: ${testUser.email} / user123`);

    // Insert Drivers
    const insertedDrivers = await Driver.insertMany(driversData);
    console.log(`🚗 ${insertedDrivers.length} drivers seeded.`);

    // Insert Cars
    const insertedCars = await Car.insertMany(carsData);
    console.log(`🏎️  ${insertedCars.length} cars seeded.`);

    // Insert Tours
    const insertedTours = await Tour.insertMany(toursData);
    console.log(`🗺️  ${insertedTours.length} tours seeded.`);

    // Insert sample reviews
    const sampleReviews = [
      { userId: testUser._id, serviceId: insertedTours[0]._id, serviceType: 'tour', rating: 5, comment: 'Amazing Kerala trip! Everything was perfectly arranged.', userName: 'Nithya', isApproved: true },
      { userId: testUser._id, serviceId: insertedTours[1]._id, serviceType: 'tour', rating: 4, comment: 'Beautiful temples. Driver was very knowledgeable.', userName: 'Nithya', isApproved: true },
      { userId: testUser._id, serviceId: insertedCars[0]._id, serviceType: 'car', rating: 5, comment: 'Creta was in excellent condition. Very comfortable ride.', userName: 'Nithya', isApproved: false },
    ];
    await Review.insertMany(sampleReviews);
    console.log(`⭐ ${sampleReviews.length} sample reviews seeded.`);

    console.log('\n✅ Database seeded successfully!');
    console.log('─────────────────────────────────');
    console.log('Admin Login: admin@slt.com / admin123');
    console.log('User Login:  user@test.com / user123');
    console.log('─────────────────────────────────\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
