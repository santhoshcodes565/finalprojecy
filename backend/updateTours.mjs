import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { packages } from '../src/data/mockData.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const tourSchema = new mongoose.Schema({
  title: String,
  destination: String,
  duration: String,
  states: String,
  price: Number,
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
  }],
  seatsTotal: { type: Number, default: 50 },
  seatsBooked: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Try to use existing model, or define a new one if it hasn't been registered.
let Tour;
try {
  Tour = mongoose.model('Tour');
} catch {
  Tour = mongoose.model('Tour', tourSchema);
}

async function run() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/slt_travels';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    
    await Tour.deleteMany({});
    console.log('🗑️ Cleared existing tours in DB');
    
    const result = await Tour.insertMany(packages);
    console.log(`🗺️ Inserted ${result.length} tours into DB.`);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during update:', err);
    process.exit(1);
  }
}

run();
