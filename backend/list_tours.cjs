const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://smartcampus_db_user:eW08jmOoJXlSKWnp@ac-m53b91r-shard-00-00.fo3bibd.mongodb.net:27017,ac-m53b91r-shard-00-01.fo3bibd.mongodb.net:27017,ac-m53b91r-shard-00-02.fo3bibd.mongodb.net:27017/srilakshmitravels?ssl=true&replicaSet=atlas-bu31uh-shard-0&authSource=admin&retryWrites=true&w=majority';

async function listTours() {
  try {
    await mongoose.connect(MONGO_URI);
    const tours = await mongoose.connection.db.collection('tours').find().toArray();
    console.log(`Found ${tours.length} tours`);
    tours.forEach(t => {
      console.log(`ID: ${t._id}, Title: ${t.title}, Price: ${t.price}, Image: ${t.image}, ImageURL: ${t.imageUrl}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

listTours();
