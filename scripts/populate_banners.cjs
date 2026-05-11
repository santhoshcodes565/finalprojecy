const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'src', 'data', 'mockData.js'),
  path.join(__dirname, 'backend', 'seeds', 'seedData.js')
];

const bannerImages = [
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Improved regex to find package objects and add bannerImage
    // It looks for "image": "...", and adds "bannerImage": "...", after it
    let updated = false;
    content = content.replace(/"image":\s*"(https:[^"]+)"/g, (match, p1) => {
      const banner = bannerImages[Math.floor(Math.random() * bannerImages.length)];
      if (!match.includes('bannerImage')) {
        updated = true;
        return `${match},\n    "bannerImage": "${banner}"`;
      }
      return match;
    });

    // Also for seedData which might use single quotes or direct property assignment
    content = content.replace(/image:\s*'([^']+)'/g, (match, p1) => {
      const banner = bannerImages[Math.floor(Math.random() * bannerImages.length)];
      if (!content.includes('bannerImage') || true) { // check per context is hard with regex, but let's try
         // Actually, let's just use a simpler marker
      }
      return match;
    });

    if (updated) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated banners in ${file}`);
    }
  }
}
