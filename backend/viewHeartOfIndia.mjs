import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const tourSchema = new mongoose.Schema({
  title: String,
  itinerary: [mongoose.Schema.Types.Mixed]
}, { strict: false });

const Tour = mongoose.models.Tour || mongoose.model('Tour', tourSchema);

async function view() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error('MONGO_URI not found in .env');
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
    
    // Find the tour shown in the screenshot
    const tour = await Tour.findOne({ title: { $regex: /Heart of India/i } });
    
    if (tour) {
      console.log('--- Current Data in Database ---');
      console.log('ID:', tour._id);
      console.log('Title:', tour.title);
      console.log('Itinerary Details:');
      tour.itinerary.forEach(day => {
        console.log(`Day ${day.day}: ${day.title} (${day.location})`);
        console.log(`  Image: ${day.image}`);
      });
    } else {
      console.log('Tour not found in database.');
    }
    
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err.message);
  }
}

view();
