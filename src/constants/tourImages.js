const slugify = (text) => {
  if (!text) return '';
  return text.toString().toLowerCase()
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
  'heart-of-india': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Western_Group_of_Temples_Khajuraho.jpg/800px-Western_Group_of_Temples_Khajuraho.jpg',
  'heart-of-india-day-1': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Western_Group_of_Temples_Khajuraho.jpg/800px-Western_Group_of_Temples_Khajuraho.jpg',
  'heart-of-india-day-2': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Gwalior_Fort_front.jpg/800px-Gwalior_Fort_front.jpg',
  'heart-of-india-day-3': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/East_Gateway_-_Stupa_1_-_Sanchi_Hill_2013-02-21_4398.JPG/800px-East_Gateway_-_Stupa_1_-_Sanchi_Hill_2013-02-21_4398.JPG',
  'heart-of-india-day-4': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Chaturbhuj_Temple%2C_Orchha.jpg/800px-Chaturbhuj_Temple%2C_Orchha.jpg',
  'heart-of-india-day-5': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Upper_Lake%2C_Bhopal%2C_M.P.jpg/800px-Upper_Lake%2C_Bhopal%2C_M.P.jpg',
  'heart-of-india-day-6': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Pachmarhi_valley_Madhya_Pradesh_INDIA.jpg/800px-Pachmarhi_valley_Madhya_Pradesh_INDIA.jpg',
  'heart-of-india-day-7': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Khajuraho_Airport_2022-11-19_6.jpg/800px-Khajuraho_Airport_2022-11-19_6.jpg'
};

export const getTourImage = (destination) => {
  if (!destination) return null;
  const slug = slugify(destination);
  return tourImages[slug] || null;
};
