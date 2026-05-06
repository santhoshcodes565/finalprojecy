const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Tour = require('./models/Tour');

async function fixDuplicateImagesAggressive() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const tours = await Tour.find({});
    
    for (const tour of tours) {
      if (!tour.itinerary) continue;
      
      console.log(`Processing: ${tour.title}`);
      for (let i = 0; i < tour.itinerary.length; i++) {
        const day = tour.itinerary[i];
        
        // Use the Day Title and Location as the ONLY keywords for maximum variety
        const keyword = `${day.title} ${day.location}`.trim();
        const sig = Math.random();
        day.image = `https://images.unsplash.com/featured/?${encodeURIComponent(keyword)}&sig=${sig}`;
        
        console.log(`  Day ${day.day}: ${day.title} -> ${day.image}`);
      }
      
      await Tour.findByIdAndUpdate(tour._id, { itinerary: tour.itinerary });
    }

    console.log('Finished aggressive update');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixDuplicateImagesAggressive();
