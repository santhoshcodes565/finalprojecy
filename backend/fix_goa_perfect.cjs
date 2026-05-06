const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Tour = require('./models/Tour');

const GOA_SPECIFIC_IDS = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", // Day 1: Beach Arrival
  "https://images.unsplash.com/photo-1512343879784-a957863116fb?auto=format&fit=crop&w=800&q=80", // Day 2: Portuguese Architecture
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80", // Day 3: Spice Route
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80", // Day 4: Waterfall
  "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80", // Day 5: North Goa
  "https://images.unsplash.com/photo-1518117648356-946761895a63?auto=format&fit=crop&w=800&q=80", // Day 6: Dolphins
  "https://images.unsplash.com/photo-1464093515883-ec948246accb?auto=format&fit=crop&w=800&q=80"  // Day 7: Sunset Departure
];

async function fixGoaPerfectly() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const tour = await Tour.findOne({ title: { $regex: /Goa/i } });
    
    if (tour && tour.itinerary) {
      console.log(`Fixing Goa Tour: ${tour.title}`);
      for (let i = 0; i < tour.itinerary.length; i++) {
        tour.itinerary[i].image = GOA_SPECIFIC_IDS[i % GOA_SPECIFIC_IDS.length];
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

fixGoaPerfectly();
