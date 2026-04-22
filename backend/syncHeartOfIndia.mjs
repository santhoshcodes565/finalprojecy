import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const tourSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  highlights: [String],
  itinerary: [{
    day: Number,
    dateString: String,
    title: String,
    location: String,
    image: String,
    desc: String,
  }]
}, { strict: false });

const Tour = mongoose.models.Tour || mongoose.model('Tour', tourSchema);

async function sync() {
  try {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const newItinerary = [
      {
        day: 1,
        dateString: "Day 1",
        title: "Enroute Khajuraho (Arrival)",
        location: "Khajuraho",
        image: "/images/tours/heart-of-india/day1.png",
        desc: "Arrive in Khajuraho. Transfer to your hotel and prepare for a journey through the artistic heart of India."
      },
      {
        day: 2,
        dateString: "Day 2",
        title: "Gwalior Fort",
        location: "Gwalior",
        image: "/images/tours/heart-of-india/day2.png",
        desc: "Visit the majestic Gwalior Fort, often called 'the pearl amongst fortresses in India', known for its blue-tiled palace."
      },
      {
        day: 3,
        dateString: "Day 3",
        title: "Sanchi Stupa",
        location: "Sanchi",
        image: "/images/tours/heart-of-india/day3.png",
        desc: "Explore the UNESCO World Heritage site of Sanchi Stupa, one of the oldest stone structures in India."
      },
      {
        day: 4,
        dateString: "Day 4",
        title: "Orchha Heritage",
        location: "Orchha",
        image: "/images/tours/heart-of-india/day4.png",
        desc: "Wander through the historic palaces and cenotaphs of Orchha, a medieval town frozen in time."
      },
      {
        day: 5,
        dateString: "Day 5",
        title: "Bhopal Lake Walk",
        location: "Bhopal",
        image: "/images/tours/heart-of-india/day5.png",
        desc: "Enjoy a peaceful evening walk by the Upper Lake (Bhojtal) in the City of Lakes, Bhopal."
      },
      {
        day: 6,
        dateString: "Day 6",
        title: "Pachmarhi Hills",
        location: "Pachmarhi",
        image: "/images/tours/heart-of-india/day6.png",
        desc: "Discover the 'Queen of Satpura', Pachmarhi, with its stunning viewpoints, waterfalls, and ancient caves."
      },
      {
        day: 7,
        dateString: "Day 7",
        title: "Departure",
        location: "Indore",
        image: "/images/tours/heart-of-india/day7.png",
        desc: "Morning drive to the airport for your onward journey, carrying memories of the Heart of India."
      }
    ];

    const result = await Tour.updateOne(
      { title: { $regex: /Heart of India/i } },
      { 
        $set: { 
          itinerary: newItinerary,
          image: "/images/tours/heart-of-india/banner.png",
          description: "A grand journey through the heart of Madhya Pradesh, covering majestic forts, ancient stupas, and scenic hill stations."
        } 
      }
    );

    if (result.matchedCount > 0) {
      console.log('✅ Successfully updated "7 Days Heart of India" tour in database.');
      if (result.modifiedCount === 0) {
        console.log('⚠️ Data was already up to date or no changes were made.');
      }
    } else {
      console.log('❌ "7 Days Heart of India" tour not found in database.');
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

sync();
