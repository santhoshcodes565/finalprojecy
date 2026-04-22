export const slugify = (text) => {
  if (!text) return '';
  let processed = text.toString().toLowerCase()
    .replace(/^\d+\s+days?\s+/i, '') // Strip duration like "7 Days " or "14 Days "
    .trim();
    
  return processed
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

export const tourImages = {
  'madhya-pradesh-khajuraho': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Khajuraho-landscape.jpg/800px-Khajuraho-landscape.jpg',
  'rann-of-kutch-gujarat': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/White_Rann_of_Kutch.jpg/800px-White_Rann_of_Kutch.jpg',
  'living-root-bridge-meghalaya': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Living_root_bridge%2C_Meghalaya.jpg/800px-Living_root_bridge%2C_Meghalaya.jpg',
  'tiger-hill-kanchenjunga-sikkim': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Tiger_Hill.JPG/800px-Tiger_Hill.JPG',
  'virupaksha-temple-hampi-karnataka': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Hampi_virupaksha_temple.jpg/800px-Hampi_virupaksha_temple.jpg',
  'heart-of-india': '/images/tours/heart-of-india/banner.png',
  'heart-of-india-day-1': '/images/tours/heart-of-india/day1.png',
  'heart-of-india-day-2': '/images/tours/heart-of-india/day2.png',
  'heart-of-india-day-3': '/images/tours/heart-of-india/day3.png',
  'heart-of-india-day-4': '/images/tours/heart-of-india/day4.png',
  'heart-of-india-day-5': '/images/tours/heart-of-india/day5.png',
  'heart-of-india-day-6': '/images/tours/heart-of-india/day6.png',
  'heart-of-india-day-7': '/images/tours/heart-of-india/day7.png',
  
  // Gujarat Cultural Safari
  'gujarat-cultural-safari': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Asiatic_Lions_in_Gir_National_Park.jpg/1280px-Asiatic_Lions_in_Gir_National_Park.jpg',
  'gujarat-cultural-safari-day-1': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Sabarmati_Riverfront-Ahmedabad.jpg/1280px-Sabarmati_Riverfront-Ahmedabad.jpg',
  'gujarat-cultural-safari-day-2': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Statue_of_Unity_view_from_Sardar_Sarovar_Dam.jpg/1280px-Statue_of_Unity_view_from_Sardar_Sarovar_Dam.jpg',
  'gujarat-cultural-safari-day-3': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Majestic_Asiatic_Lions_in_Gir_Forest_National_Park.jpg/1280px-Majestic_Asiatic_Lions_in_Gir_Forest_National_Park.jpg',
  'gujarat-cultural-safari-day-4': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Somnath_temple_Gujarat_India.jpg/1280px-Somnath_temple_Gujarat_India.jpg',
  'gujarat-cultural-safari-day-5': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Dwarkadhish_Temple_Dwarka_Gujarat_India.jpg/1280px-Dwarkadhish_Temple_Dwarka_Gujarat_India.jpg',
  'gujarat-cultural-safari-day-6': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Rann_of_Kutch_Gujarat.jpg/1280px-The_Great_Rann_of_Kutch_Gujarat.jpg',
  'gujarat-cultural-safari-day-7': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sardar_Vallabhbhai_Patel_International_Airport%2C_Ahmedabad%2C_India.jpg/1280px-Sardar_Vallabhbhai_Patel_International_Airport%2C_Ahmedabad%2C_India.jpg'
};

export const getTourImage = (destination) => {
  if (!destination) return null;
  const slug = slugify(destination);
  return tourImages[slug] || null;
};
