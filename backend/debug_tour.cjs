const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://smartcampus_db_user:eW08jmOoJXlSKWnp@ac-m53b91r-shard-00-00.fo3bibd.mongodb.net:27017,ac-m53b91r-shard-00-01.fo3bibd.mongodb.net:27017,ac-m53b91r-shard-00-02.fo3bibd.mongodb.net:27017/srilakshmitravels?ssl=true&replicaSet=atlas-bu31uh-shard-0&authSource=admin&retryWrites=true&w=majority';

async function checkTour() {
  try {
    await mongoose.connect(MONGO_URI);
    const id = '69e51f84fe1c60a689159802';
    // Access collection directly to avoid schema issues
    const tour = await mongoose.connection.db.collection('tours').findOne({ _id: new mongoose.Types.ObjectId(id) });
    
    if (tour) {
      console.log('Tour Title:', tour.title);
      console.log('Main Image:', tour.image);
      console.log('Banner Image:', tour.bannerImage);
      console.log('Itinerary Images:');
      tour.itinerary.forEach((day, index) => {
        console.log(`Day ${day.day || index + 1}: ${day.image}`);
      });
    } else {
      console.log('Tour not found');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

checkTour();
