const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'mockData.js');
let content = fs.readFileSync(filePath, 'utf8');

// Array of travel/car related seed words to give variety
const seeds = [
  'mountain', 'ocean', 'landscape', 'forest', 'valley', 'river',
  'city', 'architecture', 'temple', 'heritage', 'road', 'highway',
  'vehicle', 'car', 'transport', 'journey', 'travel', 'trip',
  'driver', 'person', 'portrait', 'professional', 'smile', 'guide'
];

let seedIndex = 0;

// Replace any unsplash URL with a unique seeded picsum URL
// We look for any URL starting with https://images.unsplash.com/photo-
content = content.replace(/https:\/\/images\.unsplash\.com\/photo-[^?"']+(?:\?[^"']*)?/g, () => {
  const seed = seeds[seedIndex % seeds.length] + Math.floor(Math.random() * 100);
  seedIndex++;
  return 'https://picsum.photos/seed/' + seed + '/800/600';
});

fs.writeFileSync(filePath, content);
console.log('Fixed all image URLs in mockData.js!');
