const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://smartcampus_db_user:eW08jmOoJXlSKWnp@ac-m53b91r-shard-00-00.fo3bibd.mongodb.net:27017,ac-m53b91r-shard-00-01.fo3bibd.mongodb.net:27017,ac-m53b91r-shard-00-02.fo3bibd.mongodb.net:27017/srilakshmitravels?ssl=true&replicaSet=atlas-bu31uh-shard-0&authSource=admin&retryWrites=true&w=majority';

// Define minimalist Tour schema for update
const tourSchema = new mongoose.Schema({}, { strict: false });
const Tour = mongoose.model('Tour', tourSchema);

const locationImageMap = {
  "Andaman": "https://images.unsplash.com/photo-1543381617-64010a300300?q=80&w=1000&auto=format&fit=crop",
  "Gujarat": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop",
  "Kashmir": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1000&auto=format&fit=crop",
  "Rajasthan": "https://images.unsplash.com/photo-1601058269720-37b51d5af346?q=80&w=1000&auto=format&fit=crop",
  "Uttarakhand": "https://images.unsplash.com/photo-1626714485841-61b4760ba228?q=80&w=1000&auto=format&fit=crop",
  "Golden Triangle": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop",
  "Goa": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop",
  "Northeast": "https://images.unsplash.com/photo-1589255476100-3ce70438ec67?q=80&w=1000&auto=format&fit=crop",
  "Ladakh": "https://images.unsplash.com/photo-1510006277684-25e1ea102c77?q=80&w=1000&auto=format&fit=crop",
  "Darjeeling": "https://images.unsplash.com/photo-1543884848-ee0ca322f2b3?q=80&w=1000&auto=format&fit=crop",
  "Meghalaya": "https://images.unsplash.com/photo-1558296767-15ef3cbbcaea?q=80&w=1000&auto=format&fit=crop",
  "Himachal": "https://images.unsplash.com/photo-1626714485841-61b4760ba228?q=80&w=1000&auto=format&fit=crop",
  "Kerala": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop",
  "Tamil Nadu": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000&auto=format&fit=crop"
};

// Fallback images
const bannerImages = [
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop", // travel mountain
  "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop", // travel sunset
  "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop"  // travel nature
];

async function updateImages() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB.");

    const tours = await Tour.find();
    console.log(`Found ${tours.length} tours.`);

    for (let tour of tours) {
      let changed = false;
      
      // Determine what location string to use for matching
      const titleLower = tour.get('title') ? tour.get('title').toLowerCase() : '';
      let matchedImage = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop"; // default
      
      for (const [loc, img] of Object.entries(locationImageMap)) {
        if (titleLower.includes(loc.toLowerCase())) {
          matchedImage = img;
          break;
        }
      }

      // 1. Update main image if it's wikimedia or undefined
      let image = tour.get('image');
      if (!image || image.includes('wikimedia.org')) {
        tour.set('image', matchedImage);
        changed = true;
      }

      // 2. Update banner image
      let bannerImage = tour.get('bannerImage');
      if (!bannerImage || bannerImage.includes('wikimedia.org')) {
        const randBanner = bannerImages[Math.floor(Math.random() * bannerImages.length)];
        tour.set('bannerImage', randBanner);
        changed = true;
      }

      // 3. Update itinerary images
      let itinerary = tour.get('itinerary');
      if (itinerary && Array.isArray(itinerary)) {
        for (let day of itinerary) {
          if (!day.image || day.image.includes('wikimedia.org')) {
            day.image = matchedImage;
            changed = true;
          }
        }
        if (changed) {
          tour.set('itinerary', itinerary);
          tour.markModified('itinerary');
        }
      }

      if (changed) {
        await tour.save();
        console.log(`Updated images for: ${tour.get('title') || tour._id}`);
      }
    }

    console.log("Finished updating tours.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

updateImages();
