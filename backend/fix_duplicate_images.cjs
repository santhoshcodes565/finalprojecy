const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Tour = require('./models/Tour');

async function fixDuplicateImages() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const tours = await Tour.find({});
    
    for (const tour of tours) {
      let updated = false;
      if (tour.itinerary && tour.itinerary.length > 0) {
        console.log(`Checking tour: ${tour.title}`);
        
        for (let i = 0; i < tour.itinerary.length; i++) {
          const day = tour.itinerary[i];
          
          // If the day image is missing or is the same as the main image, give it a unique one
          if (!day.image || day.image === tour.image) {
            const keywords = `${tour.states}, ${day.location}, ${day.title}, travel`.split(',').map(k => k.trim()).filter(Boolean).join(',');
            const randomId = Math.floor(Math.random() * 1000);
            day.image = `https://images.unsplash.com/photo-${randomId}?auto=format&fit=crop&w=800&q=80&sig=${randomId}&q=${encodeURIComponent(keywords)}`;
            // Fallback to a cleaner search-based URL if the photo ID logic is too random
            day.image = `https://images.unsplash.com/featured/?${encodeURIComponent(keywords)}&sig=${i}`;
            updated = true;
          }
        }
      }
      
      if (updated) {
        await Tour.findByIdAndUpdate(tour._id, { itinerary: tour.itinerary });
        console.log(`Updated images for: ${tour.title}`);
      }
    }

    console.log('Finished fixing duplicate images');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixDuplicateImages();
