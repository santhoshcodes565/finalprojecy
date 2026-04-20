import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We'll read the mockData file, extract the array via a basic require or parsing wrapper, but since mockData.js uses ES exports, we can import it dynamically.
import { packages, drivers, cars } from './src/data/mockData.js';

async function getWikiImage(query) {
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.thumbnail && data.thumbnail.source) {
      // Replace low-res thumb width (e.g. 320px) with larger width (800px)
      return data.thumbnail.source.replace(/\/\d+px-/, '/800px-');
    }
  } catch (e) {
    // Ignore error
  }
  return null;
}

async function run() {
  console.log('Starting image repair process...');
  let updatedPackages = JSON.parse(JSON.stringify(packages));

  for (let pkg of updatedPackages) {
    console.log(`Processing package: ${pkg.title}`);
    
    // Attempt to fix main package image
    const pkgImg = await getWikiImage(pkg.states) || await getWikiImage(pkg.destination) || await getWikiImage(pkg.title.split(' ').slice(2).join(' '));
    if (pkgImg) {
      pkg.image = pkgImg;
    }

    // Attempt to fix itinerary images
    if (pkg.itinerary && pkg.itinerary.length > 0) {
      for (let day of pkg.itinerary) {
        let dayImg = await getWikiImage(day.location) || await getWikiImage(day.title);
        if (dayImg) {
          day.image = dayImg;
        }
      }
    }
  }

  // Rewrite mockData.js with updated packages
  const mockDataContent = `export const drivers = ${JSON.stringify(drivers, null, 2)};\n\nexport const cars = ${JSON.stringify(cars, null, 2)};\n\nexport const packages = ${JSON.stringify(updatedPackages, null, 2)};\n`;

  fs.writeFileSync(path.join(__dirname, 'src', 'data', 'mockData.js'), mockDataContent, 'utf8');
  console.log('Successfully updated src/data/mockData.js with new images.');
}

run();
