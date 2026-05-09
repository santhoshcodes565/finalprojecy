const fs = require('fs');

const mockDataPath = 'src/data/mockData.js';
let content = fs.readFileSync(mockDataPath, 'utf8');

// Replace Unsplash featured links with loremflickr links
// Example: https://images.unsplash.com/featured/?Ooty,Lake,Boating&sig=3
// Becomes: https://loremflickr.com/800/600/Ooty,Lake,Boating?lock=3

const updatedContent = content.replace(/https:\/\/images\.unsplash\.com\/featured\/\?([^&]+)&sig=(\d+)/g, (match, keywords, sig) => {
  return `https://loremflickr.com/800/600/${keywords}?lock=${sig}`;
});

fs.writeFileSync(mockDataPath, updatedContent, 'utf8');
console.log('Successfully updated mockData.js with loremflickr URLs.');
