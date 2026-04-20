
const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const content = fs.readFileSync(mockDataPath, 'utf8');

// Use a simple regex to find all image URLs
const imgRegex = /"image":\s*"(https?:\/\/[^"]+)"/g;
let match;
const urlCounts = {};
const duplicates = [];

while ((match = imgRegex.exec(content)) !== null) {
  const url = match[1];
  urlCounts[url] = (urlCounts[url] || 0) + 1;
}

for (const [url, count] of Object.entries(urlCounts)) {
  if (count > 1) {
    duplicates.push({ url, count });
  }
}

if (duplicates.length > 0) {
  console.log('❌ Found duplicate image URLs:');
  duplicates.forEach(d => console.log(`${d.count}x: ${d.url}`));
} else {
  console.log('✅ No duplicate image URLs found in mockData.js!');
}
