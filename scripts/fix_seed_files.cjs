const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'src', 'data', 'mockData.js'),
  path.join(__dirname, 'backend', 'seeds', 'seedData.js'),
  path.join(__dirname, 'tour_data_5.cjs')
];

let replacedCount = 0;

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const prevLength = content.length;
    // Replace all wikimedia image URLs with a default high-quality travel image
    content = content.replace(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[^"']+/g, 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop');
    
    // Also replace broken or empty images, like image: "" if they exist
    // content = content.replace(/"image":\s*""/g, '"image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop"');
    
    if (content !== fs.readFileSync(file, 'utf8')) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
      replacedCount++;
    }
  }
}
console.log(`Updated ${replacedCount} files.`);
