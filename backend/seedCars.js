require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Car = require('./models/Car');
const Tour = require('./models/Tour');

const cars = [
  { name: 'Hyundai Creta', category: 'Compact SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 14, minKmPerDay: 250, driverBata: 400, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/2022_Hyundai_Creta_1.6_Plus_%28Chile%29_front_view.jpg/960px-2022_Hyundai_Creta_1.6_Plus_%28Chile%29_front_view.jpg', features: ['Panoramic Sunroof', 'Ventilated Seats', 'Premium Interior', 'Touchscreen Infotainment'], desc: 'The perfect compact SUV for smooth city drives and comfortable highway cruising.', isAvailable: true },
  { name: 'Kia Seltos', category: 'Compact SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 14, minKmPerDay: 250, driverBata: 400, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Kia_Seltos_SP2_PE_Snow_White_Pearl_%2817%29_%28cropped%29.jpg/960px-Kia_Seltos_SP2_PE_Snow_White_Pearl_%2817%29_%28cropped%29.jpg', features: ['Bose Premium Sound', 'Heads-up Display', 'Air Purifier', 'Sporty Design'], desc: 'A stylish and tech-loaded SUV that offers a premium travel experience on any journey.', isAvailable: true },
  { name: 'Mahindra Scorpio-N', category: 'Premium SUV', seats: 7, fuel: 'Diesel / Petrol', transmission: 'Manual / Automatic', pricePerKm: 18, minKmPerDay: 250, driverBata: 500, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/2024_Mahindra_Scorpio_Z8L_front.jpg/960px-2024_Mahindra_Scorpio_Z8L_front.jpg', features: ['Commanding Seating', 'Sunroof', 'Tough Build', 'Spacious Third Row'], desc: 'The Big Daddy of SUVs. Exceptional presence, space, and comfort for large groups.', isAvailable: true },
  { name: 'Mahindra Thar', category: 'Adventure SUV', seats: 4, fuel: 'Diesel', transmission: 'Manual / Automatic', pricePerKm: 20, minKmPerDay: 200, driverBata: 500, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_02_%28cropped%29.jpg/960px-Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_02_%28cropped%29.jpg', features: ['4x4 Off-Roading', 'Open Top Option', 'High Ground Clearance'], desc: 'For the thrill-seekers. Best suited for adventurous trips up the steep hills or off-roading.', isAvailable: true },
  { name: 'Tata Nexon', category: 'Compact SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 12, minKmPerDay: 250, driverBata: 350, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tata_Nexon_Blue_Dual_Tone.jpg/960px-Tata_Nexon_Blue_Dual_Tone.jpg', features: ['5-Star NCAP Rating', 'Harman Audio', 'High Ground Clearance'], desc: 'A safe, dynamic and comfortable 5-seater for families seeking both economy and style.', isAvailable: true },
  { name: 'Mahindra XUV 3XO', category: 'Compact SUV', seats: 5, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 13, minKmPerDay: 250, driverBata: 400, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Mahindra_XUV300.jpg/960px-Mahindra_XUV300.jpg', features: ['Level 2 ADAS', 'Panoramic Sunroof', 'Premium Audio'], desc: 'Setting new benchmarks in the compact SUV segment with premium features and performance.', isAvailable: true },
  { name: 'Maruti Brezza', category: 'Compact SUV', seats: 5, fuel: 'Petrol / CNG', transmission: 'Manual / Automatic', pricePerKm: 12, minKmPerDay: 250, driverBata: 350, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/2024_Suzuki_Vitara_%284th_generation%29_DSC_6083.jpg/960px-2024_Suzuki_Vitara_%284th_generation%29_DSC_6083.jpg', features: ['HUD Display', '360 Camera', 'High Fuel Efficiency'], desc: "India's most loved compact SUV, featuring bold looks and unmatched reliability.", isAvailable: true },
  { name: 'Honda City', category: 'Premium Sedan', seats: 5, fuel: 'Petrol / Hybrid', transmission: 'Manual / CVT', pricePerKm: 15, minKmPerDay: 250, driverBata: 400, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/2022_Honda_City_ZX_i-VTEC_%28India%29_front_view_%28cropped%29.jpg/960px-2022_Honda_City_ZX_i-VTEC_%28India%29_front_view_%28cropped%29.jpg', features: ['ADAS Safety', 'Spacious Cabin', 'Refined i-VTEC Engine'], desc: 'A sophisticated sedan offering unparalleled comfort, legroom, and a very smooth, quiet ride.', isAvailable: true },
  { name: 'Hyundai Verna', category: 'Premium Sedan', seats: 5, fuel: 'Petrol / Turbo', transmission: 'Manual / Automatic', pricePerKm: 15, minKmPerDay: 250, driverBata: 400, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/2019_Hyundai_Accent_1.6L%2C_front_10.8.19.jpg/960px-2019_Hyundai_Accent_1.6L%2C_front_10.8.19.jpg', features: ['Futuristic Design', 'Ventilated Seats', 'Advanced Tech'], desc: 'A futuristic premium sedan that stands out with its bold design and luxury-class interiors.', isAvailable: true },
  { name: 'Swift Dzire', category: 'Sedan', seats: 4, fuel: 'Petrol / Diesel', transmission: 'Manual / Automatic', pricePerKm: 12, minKmPerDay: 250, driverBata: 350, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Suzuki_Dzire_II_1.2_GLX_Hybrid_Arctic_White_Pearl.jpg/960px-Suzuki_Dzire_II_1.2_GLX_Hybrid_Arctic_White_Pearl.jpg', features: ['AC', 'Luggage Space', 'Music System'], desc: 'The most popular choice for small families and solo travellers offering great mileage and comfort.', isAvailable: true },
  { name: 'Toyota Innova', category: 'Premium SUV', seats: 7, fuel: 'Diesel', transmission: 'Manual', pricePerKm: 18, minKmPerDay: 300, driverBata: 450, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/2022_Toyota_Kijang_Innova_2.4_G_GUN142R_%2820220302%29.jpg/960px-2022_Toyota_Kijang_Innova_2.4_G_GUN142R_%2820220302%29.jpg', features: ['AC', 'Spacious Interiors', 'GPS', 'Extra Luggage Space'], desc: 'The ultimate family favourite SUV for outstation trips, unmatched spaciousness and reliability.', isAvailable: true },
  { name: 'Tempo Traveller', category: 'Mini Van', seats: 12, fuel: 'Diesel', transmission: 'Manual', pricePerKm: 25, minKmPerDay: 300, driverBata: 600, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Jumper_Distribus_%28cropped%29.jpg/960px-Jumper_Distribus_%28cropped%29.jpg', features: ['AC', 'Pushback Seats', 'Ample Legroom', 'TV & Audio System'], desc: 'Perfect for group travel, corporate outings, and large family vacations with utmost comfort.', isAvailable: true },
  { name: 'Luxury Cars', category: 'Business Class', seats: 4, fuel: 'Petrol / Diesel', transmission: 'Automatic', pricePerKm: 45, minKmPerDay: 250, driverBata: 800, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Mercedes-Benz_W223_IMG_6663.jpg/960px-Mercedes-Benz_W223_IMG_6663.jpg', features: ['Leather Interiors', 'Champagne Chiller', 'WiFi', 'Premium Ride'], desc: 'Uncompromising luxury for VIP arrivals, weddings, and premium corporate travel.', isAvailable: true },
  { name: 'Sri Lakshmi Travels Premium Omnibus', category: 'Luxury Bus', seats: 40, fuel: 'Diesel', transmission: 'Automatic', pricePerKm: 65, minKmPerDay: 300, driverBata: 1000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Jumper_Distribus_%28cropped%29.jpg/960px-Jumper_Distribus_%28cropped%29.jpg', features: ['Emergency Exits', 'Air Suspension', 'Recliner Seats', 'Modern Safety Tools', 'Wi-Fi'], desc: 'Top-of-the-line Sri Lakshmi Travels multi-axle bus ensuring maximum safety and smooth journey.', isAvailable: true },
];

const tours = [
  { title: '7 Days Magical Kerala', duration: '7 Days / 6 Nights', states: 'Kerala', price: 24500, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Kochi_cityscapes-1.jpg/960px-Kochi_cityscapes-1.jpg', description: "Experience God's Own Country in its purest form. From Kochi to Munnar, Thekkady, and the serene backwaters of Alleppey.", highlights: ['Houseboat Stay', 'Tea Plantations', 'Spice Tour', 'Kathakali Show'], isActive: true },
  { title: '14 Days Grand Southern Heritage', duration: '14 Days / 13 Nights', states: 'Tamil Nadu & Kerala', price: 52000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg', description: 'An epic cross-state journey revealing magnificent architectural heritage of Tamil Nadu and the lush nature of Kerala.', highlights: ['Meenakshi Temple', 'Brihadeeswarar Temple', 'Kanyakumari Sunset', 'Kerala Backwaters'], isActive: true },
  { title: '3 Days Munnar Weekend Escape', duration: '3 Days / 2 Nights', states: 'Kerala', price: 12500, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/960px-Munnar_Overview.jpg', description: 'A quick refreshing getaway to the misty hills of Munnar. Perfect for weekend travelers looking to unwind.', highlights: ['Tea Gardens', 'Echo Point', 'Mattupetty Dam'], isActive: true },
  { title: '5 Days Backwater & Beach Bliss', duration: '5 Days / 4 Nights', states: 'Kerala', price: 19000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Alappuzha_Boat_Beauty_W.jpg/960px-Alappuzha_Boat_Beauty_W.jpg', description: 'Experience the world-renowned backwaters of Kumarakom and the golden sands of Marari beach.', highlights: ['Houseboat', 'Kumarakom Bird Sanctuary', 'Marari Beach'], isActive: true },
  { title: '4 Days Temple City Tour', duration: '4 Days / 3 Nights', states: 'Tamil Nadu', price: 15000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg', description: 'Immerse yourself in the spiritual heart of Tamil Nadu. Explore millennia-old Dravidian architecture.', highlights: ['Meenakshi Temple', 'Srirangam Temple', 'Cultural Walk'], isActive: true },
  { title: '6 Days Ooty & Kodaikanal', duration: '6 Days / 5 Nights', states: 'Tamil Nadu', price: 26000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Ooty_lake.jpg/960px-Ooty_lake.jpg', description: "The ultimate dual-hillstation experience. The Queen of Hill Stations meets the Princess of Hill Stations.", highlights: ['Nilgiri Mountain Railway', 'Botanical Gardens', 'Kodaikanal Lake'], isActive: true },
  { title: '4 Days Rameshwaram Pilgrimage', duration: '4 Days / 3 Nights', states: 'Tamil Nadu', price: 18000, image: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Rameswaram_montage_image.jpg', description: 'A deeply spiritual journey spanning from Madurai to Rameshwaram and Kanyakumari.', highlights: ['Pamban Bridge', 'Dhanushkodi', 'Kanyakumari Sunset'], isActive: true },
  { title: '5 Days Wayanad Wilderness', duration: '5 Days / 4 Nights', states: 'Kerala', price: 21000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Blue%2C_Green_%26_White.jpg/960px-Blue%2C_Green_%26_White.jpg', description: 'Immerse yourself in the dense jungles, cascading waterfalls, and spice plantations of Northern Kerala.', highlights: ['Edakkal Caves', 'Soochipara Falls', 'Chembra Peak'], isActive: true },
  { title: '3 Days Pondicherry Retreat', duration: '3 Days / 2 Nights', states: 'Pondicherry', price: 13500, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/White_Town_Pondicherry.jpg/960px-White_Town_Pondicherry.jpg', description: 'Experience a slice of France in India. Walk the cobblestone streets and find peace in Auroville.', highlights: ['Aurobindo Ashram', 'Auroville', 'Promenade Beach'], isActive: true },
  { title: '4 Days Yercaud & Kolli Hills', duration: '4 Days / 3 Nights', states: 'Tamil Nadu', price: 15500, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Yercaud_Lake.jpg/960px-Yercaud_Lake.jpg', description: 'An offbeat mountainous adventure through the famous 70 hairpin bends of Kolli Hills and peaceful Yercaud.', highlights: ['70 Hairpin Bends', 'Agaya Gangai Falls', 'Yercaud Lake'], isActive: true },
  { title: '7 Days Majestic Mysore & Coorg', duration: '7 Days / 6 Nights', states: 'Karnataka', price: 32000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mysore_Palace_Morning.jpg/960px-Mysore_Palace_Morning.jpg', description: "Wander through the opulent Palaces of Mysore and retreat into the Scotland of India — Coorg.", highlights: ['Mysore Palace', 'Abbey Falls', 'Dubare Camp'], isActive: true },
  { title: '6 Days Trivandrum Coastal Vibe', duration: '6 Days / 5 Nights', states: 'Kerala', price: 24000, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Varkala_beach_from_above.jpg/960px-Varkala_beach_from_above.jpg', description: 'A blend of deep spirituality and bohemian coastal vibes on the magnificent red cliffs of Arabia Sea.', highlights: ['Padmanabhaswamy Temple', 'Varkala Cliff'], isActive: true },
  { title: 'Chennai → Tirupati Darshan', duration: '2 Days / 1 Night', states: 'Tamil Nadu & Andhra Pradesh', price: 4999, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg', description: 'A seamless, perfectly organized spiritual journey from Chennai to Tirumala for divine darshan.', highlights: ['Special Darshan Tickets', 'Hotel Stay', 'Guided Tour'], isActive: true },
  { title: 'Ooty Hill Station Tour (Short)', duration: '3 Days / 2 Nights', states: 'Tamil Nadu', price: 6999, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Ooty_lake.jpg/960px-Ooty_lake.jpg', description: 'A brief yet refreshing escape to Ooty with visits to the Botanical Garden, Ooty Lake, and tea estates.', highlights: ['Botanical Garden', 'Boat House', 'Tea Estates'], isActive: true },
  { title: 'Rameswaram Pilgrimage (Short)', duration: '2 Days / 1 Night', states: 'Tamil Nadu', price: 3499, image: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Rameswaram_montage_image.jpg', description: 'A focused spiritual retreat centering on Agni Teertham and the glorious Ramanathaswamy Temple.', highlights: ['Agni Teertham', 'Ramanathaswamy Temple', 'Pamban Bridge'], isActive: true },
];

async function seed() {
  try {
    await connectDB();
    console.log('✅ DB Connected. Starting seed...');

    // Delete existing seeded cars (keep admin-uploaded ones by checking for very short names or missing data)
    const existingCars = await Car.find({});
    console.log(`Found ${existingCars.length} existing cars.`);

    // Only add cars that don't already exist (check by name)
    const existingNames = existingCars.map(c => c.name.toLowerCase());
    const carsToAdd = cars.filter(c => !existingNames.includes(c.name.toLowerCase()));
    
    if (carsToAdd.length > 0) {
      await Car.insertMany(carsToAdd);
      console.log(`✅ Added ${carsToAdd.length} new cars.`);
    } else {
      console.log('ℹ️  All cars already exist. Skipping car seed.');
    }

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
