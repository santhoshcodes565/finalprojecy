const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Tour = require('./models/Tour');

const GOA_IMAGES = [
  "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=80", // Architecture
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80", // Spices
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80", // Waterfall
  "https://images.unsplash.com/photo-1585089853926-d621589a80e4?auto=format&fit=crop&w=800&q=80", // Beach
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", // Coastal
  "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80", // Resort
  "https://images.unsplash.com/photo-1464093515883-ec948246accb?auto=format&fit=crop&w=800&q=80"  // Sunset
];

async function fixGoaSpecifically() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const tour = await Tour.findOne({ title: { $regex: /Goa/i } });
    
    if (tour && tour.itinerary) {
      console.log(`Fixing Goa Tour: ${tour.title}`);
      for (let i = 0; i < tour.itinerary.length; i++) {
        tour.itinerary[i].image = GOA_IMAGES[i % GOA_IMAGES.length];
      }
      await Tour.findByIdAndUpdate(tour._id, { itinerary: tour.itinerary });
      console.log('Update successful');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fixGoaSpecifically();
