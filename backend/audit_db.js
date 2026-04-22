const mongoose = require('mongoose');
require('dotenv').config();
const Tour = require('./models/Tour');
const connectDB = require('./config/db');

const auditDatabaseTours = async () => {
  await connectDB();
  
  try {
    const tours = await Tour.find({});
    console.log(`Auditing ${tours.length} tours from database...`);
    
    tours.forEach(tour => {
      if (!tour.image) {
        console.log(`❌ Tour missing main image: ${tour._id} - ${tour.title}`);
      }
      
      if (!tour.itinerary || tour.itinerary.length === 0) {
        console.log(`⚠️ Tour has no itinerary: ${tour._id} - ${tour.title}`);
      } else {
        tour.itinerary.forEach(day => {
          if (!day.image) {
            console.log(`❌ Day ${day.day} missing image in tour: ${tour._id} - ${tour.title}`);
          } else if (day.image.includes('placeholder') || day.image.includes('images.unsplash.com/photo-1548013146')) {
             console.log(`⚠️ Day ${day.day} has placeholder/generic image in tour: ${tour._id} - ${tour.title}: ${day.image}`);
          }
        });
      }
    });
    
  } catch (err) {
    console.error('❌ Error auditing database:', err.message);
  } finally {
    mongoose.connection.close();
  }
};

auditDatabaseTours();
