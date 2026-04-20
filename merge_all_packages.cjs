const fs = require('fs');
const path = require('path');
const vm = require('vm');

const { p1_p4 } = require('./tour_data_1.cjs');
const { p5_p8 } = require('./tour_data_2.cjs');
const { p9_p12 } = require('./tour_data_3.cjs');
const { p13_p17 } = require('./tour_data_4.cjs');
const { p18_p21 } = require('./tour_data_5.cjs');
const { p22_p25 } = require('./tour_data_6.cjs');

const allPackages = [ ...p1_p4, ...p5_p8, ...p9_p12, ...p13_p17, ...p18_p21, ...p22_p25 ];

// 1. Update mockData.js
const mockDataPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const content = fs.readFileSync(mockDataPath, 'utf8');

// Split at export const packages = 
const parts = content.split('export const packages =');
if (parts.length > 1) {
  const topHalf = parts[0];
  const updatedContent = topHalf + 'export const packages = ' + JSON.stringify(allPackages, null, 2) + ';\n';
  fs.writeFileSync(mockDataPath, updatedContent);
  console.log('✅ Updated src/data/mockData.js with ' + allPackages.length + ' packages');
}

// 2. Update seedData.js
const seedDataPath = path.join(__dirname, 'backend', 'seeds', 'seedData.js');
if (fs.existsSync(seedDataPath)) {
  let seedContent = fs.readFileSync(seedDataPath, 'utf8');
  
  // Find where const toursData = [...] is declared.
  // It's safer to just replace the whole array declaration using regex, but it might be large.
  // We'll look for `const toursData = [` and `];`
  const startIdx = seedContent.indexOf('const toursData = [');
  if (startIdx !== -1) {
    // Find the end of toursData assignment.
    // It's followed by `const seedDatabase = async () => {`
    const endIdx = seedContent.indexOf('// ────────────────────────────────────────────────────────', startIdx);
    
    if (endIdx !== -1) {
      // The new assignment
      const newToursData = 'const toursData = ' + JSON.stringify(allPackages, null, 2) + ';\n\n';
      
      seedContent = seedContent.substring(0, startIdx) + newToursData + seedContent.substring(endIdx);
      fs.writeFileSync(seedDataPath, seedContent);
      console.log('✅ Updated backend/seeds/seedData.js with ' + allPackages.length + ' packages');
    } else {
      console.log('❌ Could not find end of toursData in seedData.js');
    }
  } else {
    console.log('❌ Could not find const toursData in seedData.js');
  }
}
