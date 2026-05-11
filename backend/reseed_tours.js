require('dotenv').config();
const mongoose = require('mongoose');
const Tour = require('./models/Tour');
const { packages } = require('./temp_mock.js');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('MongoDB Connected');
  
  try {
    console.log('Clearing existing tours...');
    await Tour.deleteMany({});
    
    console.log('Inserting new packages...');
    // Transform mock packages to match the schema
    const toursToInsert = packages.map(p => ({
      title: p.title,
      duration: p.duration,
      states: p.states,
      price: p.price,
      image: p.image,
      bannerImage: p.bannerImage,
      description: p.description,
      highlights: p.highlights,
      itinerary: p.itinerary,
      isActive: true
    }));
    
    await Tour.insertMany(toursToInsert);
    console.log('Successfully inserted ' + toursToInsert.length + ' tours!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}).catch(err => {
  console.error('Connection error:', err);
  process.exit(1);
});
