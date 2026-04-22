const mongoose = require('mongoose');
require('dotenv').config();
const Tour = require('./models/Tour');
const connectDB = require('./config/db');

const fixGujaratTour = async () => {
  await connectDB();
  
  const tourId = '69e51f84fe1c60a6891597f2';
  
  const updates = {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Asiatic_Lions_in_Gir_National_Park.jpg/1280px-Asiatic_Lions_in_Gir_National_Park.jpg',
    itinerary: [
      {
        day: 1,
        dateString: 'Day 1',
        title: 'Ahmedabad Heritage',
        location: 'Ahmedabad',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Sabarmati_Riverfront-Ahmedabad.jpg/1280px-Sabarmati_Riverfront-Ahmedabad.jpg',
        desc: 'Arrive in Ahmedabad. Visit Sabarmati Ashram and the stunning Adalaj Stepwell.'
      },
      {
        day: 2,
        dateString: 'Day 2',
        title: 'Statue of Unity',
        location: 'Kevadia',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Statue_of_Unity_view_from_Sardar_Sarovar_Dam.jpg/1280px-Statue_of_Unity_view_from_Sardar_Sarovar_Dam.jpg',
        desc: "Full day trip to the Statue of Unity, the world's tallest statue, standing at 182 meters."
      },
      {
        day: 3,
        dateString: 'Day 3',
        title: 'Gir Forest Safari',
        location: 'Gir',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Majestic_Asiatic_Lions_in_Gir_Forest_National_Park.jpg/1280px-Majestic_Asiatic_Lions_in_Gir_Forest_National_Park.jpg',
        desc: 'Journey to Sasan Gir. Afternoon jeep safari to spot the Asiatic Lion in its only natural habitat.'
      },
      {
        day: 4,
        dateString: 'Day 4',
        title: 'Somnath Temple',
        location: 'Somnath',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Somnath_temple_Gujarat_India.jpg/1280px-Somnath_temple_Gujarat_India.jpg',
        desc: 'Visit the sacred Somnath Temple, one of the 12 Jyotirlinga shrines located on the coast.'
      },
      {
        day: 5,
        dateString: 'Day 5',
        title: "Lord Krishna's Dwarka",
        location: 'Dwarka',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Dwarkadhish_Temple_Dwarka_Gujarat_India.jpg/1280px-Dwarkadhish_Temple_Dwarka_Gujarat_India.jpg',
        desc: 'Drive to Dwarka. Visit the Dwarkadhish Temple (Jagat Mandir) and the sacred Gomti Ghat.'
      },
      {
        day: 6,
        dateString: 'Day 6',
        title: 'White Rann of Kutch',
        location: 'Bhuj',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Rann_of_Kutch_Gujarat.jpg/1280px-The_Great_Rann_of_Kutch_Gujarat.jpg',
        desc: 'Drive to Bhuj and visit the surreal white salt desert of Rann of Kutch at sunset.'
      },
      {
        day: 7,
        dateString: 'Day 7',
        title: 'Departure',
        location: 'Ahmedabad',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sardar_Vallabhbhai_Patel_International_Airport%2C_Ahmedabad%2C_India.jpg/1280px-Sardar_Vallabhbhai_Patel_International_Airport%2C_Ahmedabad%2C_India.jpg',
        desc: 'Long drive back to Ahmedabad for your return flight.'
      }
    ]
  };

  try {
    const tour = await Tour.findByIdAndUpdate(tourId, updates, { new: true });
    if (tour) {
      console.log('✅ Success: Gujarat Cultural Safari images updated in database!');
    } else {
      console.log('❌ Error: Tour not found with ID:', tourId);
    }
  } catch (err) {
    console.error('❌ Error updating database:', err.message);
  } finally {
    mongoose.connection.close();
  }
};

fixGujaratTour();
