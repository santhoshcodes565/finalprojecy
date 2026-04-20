import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function searchWikiImage(query) {
  try {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=filetype:bitmap+${encodeURIComponent(query)}+landscape&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&format=json`;
    const res = await fetch(searchUrl);
    const data = await res.json();
    if (data.query && data.query.pages) {
      const pageId = Object.keys(data.query.pages)[0];
      return data.query.pages[pageId].imageinfo[0].url;
    }
  } catch (error) {
    console.error("Search failed for", query);
  }
  return null;
}

// Fallbacks if search fails
const fallbackImages = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/960px-Taj_Mahal_%28Edited%29.jpeg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/960px-Munnar_Overview.jpg'
];

async function updateMockData() {
  const filePath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
  let content = fs.readFileSync(filePath, 'utf-8');

  // We only want to update package images safely
  // Import the packages statically by evaluating or we can do a regex replace
  // But wait, since it's hard to parse module.exports, let's just do a regex replace
  
  // Actually, importing is easier
  const { packages } = await import(filePath);
  
  let newPackagesText = "export const packages = [\n";
  
  for (let i = 0; i < packages.length; i++) {
    const pkg = packages[i];
    console.log(`Processing ${pkg.title}...`);
    
    // Find a good image
    let newImageUrl = await searchWikiImage(pkg.states + ' landscape');
    if (!newImageUrl) {
      newImageUrl = await searchWikiImage(pkg.destination || pkg.title.split(' ').slice(2).join(' '));
    }
    if (!newImageUrl) {
       newImageUrl = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    }
    
    pkg.image = newImageUrl;
    
    // We can stringify and format nicely
    newPackagesText += `  ${JSON.stringify(pkg)},\n`;
  }
  newPackagesText += "];";
  
  // Replace the packages array using regex
  const regex = /export const packages = \[[\s\S]*?\];(?=\n\n|\n$|$)/;
  
  if (regex.test(content)) {
    content = content.replace(regex, newPackagesText);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log("mockData.js updated successfully.");
  } else {
    console.error("Could not find the packages export in mockData.js");
  }
}

updateMockData();
