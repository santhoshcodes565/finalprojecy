import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import existing data
import { packages, drivers, cars } from './src/data/mockData.js';

const imgList = {
  beach: [
    "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1610444391219-c9676644fcf6?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605333116814-c1f016fbf0e8?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582509172338-7fd56aa4e0f4?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588661642845-6ee65646f881?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1615829631627-7756e18af26d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=800&auto=format&fit=crop"
  ],
  hills: [
    "https://images.unsplash.com/photo-1516483638261-f40af5edaf4a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589308119099-281ce1d67af6?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586227740560-8cf2732c1531?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609100862024-bcbc2b8eb3f3?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1626017006859-0021c33ea981?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563714191632-411a7f0525d6?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523376510344-0c5a2c41d1aa?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560032959-fbba1e5926ec?q=80&w=800&auto=format&fit=crop"
  ],
  waterfall: [
    "https://images.unsplash.com/photo-1616147614275-c9676644fcf6?q=80&w=800&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1621217030588-333e21876402?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549643441-352c80336ae9?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?q=80&w=800&auto=format&fit=crop"
  ],
  temple: [
    "https://images.unsplash.com/photo-1558452919-0f2c0ce64add?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1629851614136-e0f31c7db1a1?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622306915011-8dbfeebd2816?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565507563539-75a74ab21dcd?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518381832049-74d3fb067dc8?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1579483321946-814cdeb234f9?q=80&w=800&auto=format&fit=crop"
  ],
  boat: [
    "https://images.unsplash.com/photo-1589417234676-eef13a69a23e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598465063853-eafb1d9f8bc2?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574218828608-25fc2fdb2fd3?q=80&w=800&auto=format&fit=crop"
  ],
  city: [
    "https://images.unsplash.com/photo-1595155986866-9ab43f07a7a1?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512343879784-a957863116fb?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580231908422-9dfaeaa8cbbf?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543884394-bb9e00fb30ae?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605333116814-c1f016fbf0e8?q=80&w=800&auto=format&fit=crop"
  ],
  palace: [
    "https://images.unsplash.com/photo-1584883196901-b5fe7c91350a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560953683-af6cf659ddee?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600600007887-ed314e3009bc?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620836511394-149b09ed95cc?q=80&w=800&auto=format&fit=crop"
  ],
  safari: [
    "https://images.unsplash.com/photo-1559648585-6bf0138d6fb2?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1575825488188-75704f0c4391?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571217743324-4f5de05fcbca?q=80&w=800&auto=format&fit=crop"
  ],
  generic: [
    "https://images.unsplash.com/photo-1590740925927-466d03d3ce39?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1557342894-3d0cf3b91a82?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582509172338-7fd56aa4e0f4?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1597405295759-b1fa1e7e7210?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590306161726-0e1ce8effcd4?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1510006733364-e1eac6874944?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605333116814-c1f016fbf0e8?q=80&w=800&auto=format&fit=crop"
  ]
};

const counters = {
  beach: 0, hills: 0, waterfall: 0, temple: 0, boat: 0, city: 0, palace: 0, safari: 0, generic: 0
};

function getImg(category) {
  let list = imgList[category] || imgList.generic;
  let idx = counters[category] % list.length;
  counters[category]++;
  return list[idx];
}

async function run() {
  console.log('Starting itinerary image update...');
  let updatedPackages = JSON.parse(JSON.stringify(packages));

  for (let pkg of updatedPackages) {
    if (pkg.itinerary && pkg.itinerary.length > 0) {
      for (let day of pkg.itinerary) {
        let cat = 'generic';
        const bl = (day.title + " " + day.location + " " + day.desc).toLowerCase();
        
        if (bl.match(/beach|kovalam|marari|sea|coast|goa|island|andaman|shore|ocean/)) cat = 'beach';
        else if (bl.match(/hill|munnar|wayanad|ooty|kodaikanal|valparai|tea|yercaud|darjeeling|sikkim|valley|mountain/)) cat = 'hills';
        else if (bl.match(/waterfall|dudhsagar|jog|falls|cascade/)) cat = 'waterfall';
        else if (bl.match(/temple|madurai|thanjavur|rameshwaram|kanyakumari|church|mosque|architecture|monument|gopuram|shrine|heritage/)) cat = 'temple';
        else if (bl.match(/boat|houseboat|backwater|alleppey|lake|kumarakom|river|cruise|ferry/)) cat = 'boat';
        else if (bl.match(/fort|palace|mysore|mahal|mansion|castle/)) cat = 'palace';
        else if (bl.match(/safari|wildlife|thekkady|park|sanctuary|tiger|forest|elephant|reserve/)) cat = 'safari';
        else if (bl.match(/city|arrival|departure|airport|chennai|kochi|bangalore|trivandrum|delhi|mumbai|urban|street/)) cat = 'city';

        day.image = getImg(cat);
      }
    }
  }

  // Rewrite mockData.js with updated packages
  const mockDataContent = `export const drivers = ${JSON.stringify(drivers, null, 2)};\n\nexport const cars = ${JSON.stringify(cars, null, 2)};\n\nexport const packages = ${JSON.stringify(updatedPackages, null, 2)};\n`;

  fs.writeFileSync(path.join(__dirname, 'src', 'data', 'mockData.js'), mockDataContent, 'utf8');
  console.log('Successfully updated src/data/mockData.js with distinct Unsplash images.');
}

run();
