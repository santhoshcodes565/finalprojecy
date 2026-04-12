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
  { name: 'Ramesh Kumar', experience: 12, languages: ['Tamil', 'English', 'Hindi'], rating: 4.9, trips: 450, image: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Japanese_chauffeur.jpg', bio: 'An expert in Southern routes with over a decade of safe driving.', phone: '9876543001', licenseNo: 'TN-DL-001' },
  { name: 'Murugan S.', experience: 15, languages: ['Tamil', 'Malayalam', 'English'], rating: 5.0, trips: 620, image: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Japanese_chauffeur.jpg', bio: 'Specialist in hill station driving, particularly Ooty and Munnar.', phone: '9876543002', licenseNo: 'TN-DL-002' },
  { name: 'Rajesh Kannan', experience: 8, languages: ['Tamil', 'English'], rating: 4.8, trips: 310, image: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Japanese_chauffeur.jpg', bio: 'Knowledgeable about heritage temples across Madurai, Thanjavur, and Rameshwaram.', phone: '9876543003', licenseNo: 'TN-DL-003' },
  { name: 'Dinesh V.', experience: 20, languages: ['Tamil', 'Telugu', 'English'], rating: 4.9, trips: 850, image: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Japanese_chauffeur.jpg', bio: 'Most senior driver with an impeccable safety record.', phone: '9876543004', licenseNo: 'TN-DL-004' },
  { name: 'Selvam T.', experience: 5, languages: ['Tamil', 'English', 'Hindi'], rating: 4.7, trips: 180, image: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Japanese_chauffeur.jpg', bio: 'Young, professional, and tech-savvy. Perfect for corporate clients.', phone: '9876543005', licenseNo: 'TN-DL-005' },
  { name: 'Anwar Basha', experience: 10, languages: ['Tamil', 'Hindi', 'Urdu'], rating: 4.9, trips: 400, image: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Japanese_chauffeur.jpg', bio: 'Familiar with coastal routes to Pondicherry and Kanyakumari.', phone: '9876543006', licenseNo: 'TN-DL-006' },
  { name: 'Karuppasamy', experience: 18, languages: ['Tamil', 'Malayalam'], rating: 5.0, trips: 710, image: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Japanese_chauffeur.jpg', bio: 'A legend on the Tamil Nadu tourist circuit.', phone: '9876543007', licenseNo: 'TN-DL-007' },
];

const carsData = [
  { name: 'Hyundai Creta', category: 'Compact SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 14, minKmPerDay: 250, driverBata: 400, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/2022_Hyundai_Creta_1.6_Plus_%28Chile%29_front_view.jpg/960px-2022_Hyundai_Creta_1.6_Plus_%28Chile%29_front_view.jpg', features: ['Panoramic Sunroof', 'Ventilated Seats', 'Premium Interior', 'Touchscreen Infotainment'], desc: 'The perfect compact SUV for smooth city drives and comfortable highway cruising.' },
  { name: 'Kia Seltos', category: 'Compact SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 14, minKmPerDay: 250, driverBata: 400, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Kia_Seltos_SP2_PE_Snow_White_Pearl_%2817%29_%28cropped%29.jpg/960px-Kia_Seltos_SP2_PE_Snow_White_Pearl_%2817%29_%28cropped%29.jpg', features: ['Bose Premium Sound', 'Heads-up Display', 'Air Purifier', 'Sporty Design'], desc: 'A stylish and tech-loaded SUV that offers a premium travel experience.' },
  { name: 'Mahindra Scorpio-N', category: 'Premium SUV', seats: 7, fuel: 'Diesel / Petrol', transmission: 'Manual / Automatic', pricePerKm: 18, minKmPerDay: 250, driverBata: 500, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/2024_Mahindra_Scorpio_Z8L_front.jpg/960px-2024_Mahindra_Scorpio_Z8L_front.jpg', features: ['Commanding Seating', 'Sunroof', 'Tough Build', 'Spacious Third Row'], desc: 'The Big Daddy of SUVs. Exceptional presence, space, and comfort.' },
  { name: 'Tata Nexon', category: 'Compact SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 12, minKmPerDay: 250, driverBata: 350, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tata_Nexon_Blue_Dual_Tone.jpg/960px-Tata_Nexon_Blue_Dual_Tone.jpg', features: ['5-Star NCAP Rating', 'Harman Audio', 'High Ground Clearance'], desc: 'Safe, dynamic and comfortable for families seeking economy and style.' },
  { name: 'Honda City', category: 'Premium Sedan', seats: 5, fuel: 'Petrol / Hybrid', transmission: 'Manual / CVT', pricePerKm: 15, minKmPerDay: 250, driverBata: 400, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/2022_Honda_City_ZX_i-VTEC_%28India%29_front_view_%28cropped%29.jpg/960px-2022_Honda_City_ZX_i-VTEC_%28India%29_front_view_%28cropped%29.jpg', features: ['ADAS Safety', 'Spacious Cabin', 'Refined i-VTEC Engine'], desc: 'A sophisticated sedan offering unparalleled comfort and a smooth, quiet ride.' },
];

const toursData = [
  {
    title: '7 Days Magical Kerala', duration: '7 Days / 6 Nights', states: 'Kerala', price: 24500,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Kochi_cityscapes-1.jpg/960px-Kochi_cityscapes-1.jpg',
    description: "Experience God's Own Country in its purest form.",
    highlights: ['Houseboat Stay', 'Tea Plantations', 'Spice Tour', 'Kathakali Show'],
    seatsTotal: 40, seatsBooked: 12,
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Arrival in Kochi', location: 'Kochi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Kochi_cityscapes-1.jpg/960px-Kochi_cityscapes-1.jpg', desc: 'Pickup from Cochin Airport. Visit Fort Kochi, Chinese Fishing Nets.' },
      { day: 2, dateString: 'Day 2', title: 'Kochi to Munnar', location: 'Munnar', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/960px-Munnar_Overview.jpg', desc: 'Drive to Munnar. En route visit Cheeyappara Waterfalls.' },
      { day: 3, dateString: 'Day 3', title: 'Exploring Munnar', location: 'Munnar', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/960px-Munnar_Overview.jpg', desc: 'Full day: Mattupetty Dam, Echo Point, Eravikulam National Park.' },
      { day: 4, dateString: 'Day 4', title: 'Munnar to Thekkady', location: 'Thekkady', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Thekkady.jpg/960px-Thekkady.jpg', desc: 'Periyar Wildlife Sanctuary. Spice plantation tour.' },
      { day: 5, dateString: 'Day 5', title: 'Houseboat Experience', location: 'Alleppey', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Alappuzha_Boat_Beauty_W.jpg/960px-Alappuzha_Boat_Beauty_W.jpg', desc: 'Kerala Houseboat cruise. Overnight on houseboat.' },
      { day: 6, dateString: 'Day 6', title: 'Alleppey to Marari', location: 'Mararikulam', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Marari_Beach%2C_Kerala.jpg/960px-Marari_Beach%2C_Kerala.jpg', desc: 'Relaxing day by the Arabian Sea shores.' },
      { day: 7, dateString: 'Day 7', title: 'Departure', location: 'Kochi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Kochi_cityscapes-1.jpg/960px-Kochi_cityscapes-1.jpg', desc: 'Transfer back to Cochin Airport.' },
    ],
  },
  {
    title: '4 Days Temple City Tour', duration: '4 Days / 3 Nights', states: 'Tamil Nadu', price: 15000,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg',
    description: 'Immerse yourself in the spiritual heart of Tamil Nadu.',
    highlights: ['Meenakshi Temple', 'Srirangam Temple', 'Cultural Walk'],
    seatsTotal: 30, seatsBooked: 5,
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Arrival in Madurai', location: 'Madurai', desc: 'Check in. Evening visit to Meenakshi Amman Temple.' },
      { day: 2, dateString: 'Day 2', title: 'Madurai Palace & Culture', location: 'Madurai', desc: 'Thirumalai Nayakkar Mahal and Gandhi Museum.' },
      { day: 3, dateString: 'Day 3', title: 'Drive to Trichy', location: 'Trichy', desc: 'Srirangam Ranganathaswamy Temple and Rock Fort.' },
      { day: 4, dateString: 'Day 4', title: 'Departure', location: 'Trichy', desc: 'Transfer to Trichy Airport.' },
    ],
  },
  {
    title: '6 Days Ooty & Kodaikanal', duration: '6 Days / 5 Nights', states: 'Tamil Nadu', price: 26000,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Ooty_lake.jpg/960px-Ooty_lake.jpg',
    description: 'The ultimate dual-hillstation experience.',
    highlights: ['Nilgiri Mountain Railway', 'Botanical Gardens', 'Kodaikanal Lake'],
    seatsTotal: 35, seatsBooked: 8,
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Coimbatore to Ooty', location: 'Ooty', desc: 'Evening boat ride at Ooty Lake.' },
      { day: 2, dateString: 'Day 2', title: 'Queen of Hills', location: 'Ooty', desc: 'Doddabetta Peak, Botanical Garden, Rose Garden.' },
      { day: 3, dateString: 'Day 3', title: 'Ooty to Kodaikanal', location: 'Kodaikanal', desc: 'Scenic drive connecting the ranges.' },
      { day: 4, dateString: 'Day 4', title: 'Exploring Kodai', location: 'Kodaikanal', desc: "Coaker's Walk, Pillar Rocks, Pine Forest." },
      { day: 5, dateString: 'Day 5', title: 'Leisure Day', location: 'Kodaikanal', desc: 'Cycling around Kodai lake, Bryant Park.' },
      { day: 6, dateString: 'Day 6', title: 'Departure', location: 'Madurai', desc: 'Drive to Madurai Airport.' },
    ],
  },
  {
    title: '3 Days Munnar Weekend Escape', duration: '3 Days / 2 Nights', states: 'Kerala', price: 12500,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/960px-Munnar_Overview.jpg',
    description: 'A quick refreshing getaway to the misty hills of Munnar.',
    highlights: ['Tea Gardens', 'Echo Point', 'Mattupetty Dam'],
    seatsTotal: 50, seatsBooked: 20,
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Arrival & Drive to Munnar', location: 'Munnar', desc: 'Scenic drive from Kochi.' },
      { day: 2, dateString: 'Day 2', title: 'Munnar Local Sightseeing', location: 'Munnar', desc: 'Eravikulam, Tea Museum, Mattupetty Dam.' },
      { day: 3, dateString: 'Day 3', title: 'Departure', location: 'Kochi', desc: 'Drive back to Kochi.' },
    ],
  },
  {
    title: '4 Days Rameshwaram Pilgrimage', duration: '4 Days / 3 Nights', states: 'Tamil Nadu', price: 18000,
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Rameswaram_montage_image.jpg',
    description: 'A deeply spiritual journey to Rameshwaram and Kanyakumari.',
    highlights: ['Pamban Bridge', 'Dhanushkodi', 'Kanyakumari Sunset'],
    seatsTotal: 25, seatsBooked: 3,
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Madurai to Rameshwaram', location: 'Rameshwaram', desc: 'Drive across Pamban Bridge.' },
      { day: 2, dateString: 'Day 2', title: 'Temple & Dhanushkodi', location: 'Rameshwaram', desc: 'Holy bath at Ramanathaswamy Temple.' },
      { day: 3, dateString: 'Day 3', title: 'To Kanyakumari', location: 'Kanyakumari', desc: 'Southernmost tip. Sunset view.' },
      { day: 4, dateString: 'Day 4', title: 'Departure', location: 'Trivandrum', desc: 'Sunrise, Vivekananda Memorial, airport.' },
    ],
  },
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
