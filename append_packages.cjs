const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'mockData.js');
const content = fs.readFileSync(filePath, 'utf8');

// Split the file at the packages export
const parts = content.split('export const packages =');
const topHalf = parts[0];

// Define the 10 new packages
const newPackages = [
  {
    id: 'p3',
    title: '3 Days Munnar Weekend Escape',
    duration: '3 Days / 2 Nights',
    states: 'Kerala',
    price: 12500,
    image: 'https://loremflickr.com/800/600/hills,tea?lock=301',
    description: 'A quick refreshing getaway to the misty hills of Munnar. Perfect for weekend travelers looking to unwind amidst endless tea estates.',
    highlights: ['Tea Gardens', 'Echo Point', 'Mattupetty Dam'],
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Arrival & Drive to Munnar', location: 'Munnar', image: 'https://loremflickr.com/800/600/mountain?lock=311', desc: 'Arrive in Kochi, scenic drive to Munnar enjoying waterfalls along the way.' },
      { day: 2, dateString: 'Day 2', title: 'Munnar Local Sightseeing', location: 'Munnar', image: 'https://loremflickr.com/800/600/forest?lock=312', desc: 'Visit Rajamalai (Eravikulam National Park), Tea Museum, and enjoy boating at Mattupetty Dam.' },
      { day: 3, dateString: 'Day 3', title: 'Departure', location: 'Kochi', image: 'https://loremflickr.com/800/600/airport?lock=313', desc: 'Morning walk in tea estates, drive back to Kochi for departure.' }
    ]
  },
  {
    id: 'p4',
    title: '5 Days Backwater & Beach Bliss',
    duration: '5 Days / 4 Nights',
    states: 'Kerala',
    price: 19000,
    image: 'https://loremflickr.com/800/600/beach,ocean?lock=401',
    description: 'Experience the world-renowned backwaters of Kumarakom and the golden sands of Marari beach in this relaxing coastal itinerary.',
    highlights: ['Houseboat', 'Kumarakom Bird Sanctuary', 'Marari Beach'],
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Welcome to Coastal Kerala', location: 'Kumarakom', image: 'https://loremflickr.com/800/600/resort?lock=411', desc: 'Arrive at Kochi, drive to Kumarakom. Check into a high-end backwater resort.' },
      { day: 2, dateString: 'Day 2', title: 'Kumarakom Nature Tour', location: 'Kumarakom', image: 'https://loremflickr.com/800/600/birds?lock=412', desc: 'Early morning bird watching. Afternoon village walk and sunset canoe cruise.' },
      { day: 3, dateString: 'Day 3', title: 'Houseboat Experience', location: 'Alleppey', image: 'https://loremflickr.com/800/600/river?lock=413', desc: 'Board traditional houseboat. Sail through Vembanad lake observing authentic village life.' },
      { day: 4, dateString: 'Day 4', title: 'Marari Beach Retreat', location: 'Mararikulam', image: 'https://loremflickr.com/800/600/sand?lock=414', desc: 'Check out of houseboat and drive to pristine Marari beach to soak in the sun.' },
      { day: 5, dateString: 'Day 5', title: 'Departure', location: 'Kochi', image: 'https://loremflickr.com/800/600/city?lock=415', desc: 'Transfer to Cochin Airport.' }
    ]
  },
  {
    id: 'p5',
    title: '4 Days Temple City Tour',
    duration: '4 Days / 3 Nights',
    states: 'Tamil Nadu',
    price: 15000,
    image: 'https://loremflickr.com/800/600/temple,india?lock=501',
    description: 'Immerse yourself in the spiritual heart of Tamil Nadu. Explore millennia-old Dravidian architecture in Madurai and Trichy.',
    highlights: ['Meenakshi Temple', 'Srirangam Temple', 'Cultural Walk'],
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Arrival in Madurai', location: 'Madurai', image: 'https://loremflickr.com/800/600/heritage?lock=511', desc: 'Check in at Madurai. Evening visit to the magnificent Meenakshi Amman Temple.' },
      { day: 2, dateString: 'Day 2', title: 'Madurai Palace & Culture', location: 'Madurai', image: 'https://loremflickr.com/800/600/palace?lock=512', desc: 'Morning visit to Thirumalai Nayakkar Mahal and Gandhi Museum. Local food tasting tour.' },
      { day: 3, dateString: 'Day 3', title: 'Drive to Trichy', location: 'Trichy', image: 'https://loremflickr.com/800/600/temple?lock=513', desc: 'Travel to Trichy. Visit the massive Srirangam Ranganathaswamy Temple and the iconic Rock Fort.' },
      { day: 4, dateString: 'Day 4', title: 'Departure', location: 'Trichy', image: 'https://loremflickr.com/800/600/road?lock=514', desc: 'Morning shopping for local handicrafts. Transfer to Trichy Airport.' }
    ]
  },
  {
    id: 'p6',
    title: '6 Days Ooty & Kodaikanal',
    duration: '6 Days / 5 Nights',
    states: 'Tamil Nadu',
    price: 26000,
    image: 'https://loremflickr.com/800/600/hillstation?lock=601',
    description: 'The ultimate dual-hillstation experience in Tamil Nadu. The Queen of Hill Stations (Ooty) meets the Princess of Hill Stations (Kodaikanal).',
    highlights: ['Nilgiri Mountain Railway', 'Botanical Gardens', 'Kodaikanal Lake'],
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Coimbatore to Ooty', location: 'Ooty', image: 'https://loremflickr.com/800/600/train?lock=611', desc: 'Arrive at Coimbatore, drive up the winding roads to Ooty. Evening boat ride at Ooty Lake.' },
      { day: 2, dateString: 'Day 2', title: 'Queen of Hills', location: 'Ooty', image: 'https://loremflickr.com/800/600/garden?lock=612', desc: 'Visit Doddabetta Peak, Government Botanical Garden, and Rose Garden.' },
      { day: 3, dateString: 'Day 3', title: 'Ooty to Kodaikanal', location: 'Kodaikanal', image: 'https://loremflickr.com/800/600/valley?lock=613', desc: 'A scenic drive connecting the two majestic ranges of Western Ghats.' },
      { day: 4, dateString: 'Day 4', title: 'Exploring Kodai', location: 'Kodaikanal', image: 'https://loremflickr.com/800/600/lake?lock=614', desc: 'Walk along Coakers Walk, visit Pillar Rocks, Guna Caves, and Pine Forest.' },
      { day: 5, dateString: 'Day 5', title: 'Leisure Day', location: 'Kodaikanal', image: 'https://loremflickr.com/800/600/nature?lock=615', desc: 'Enjoy cycling around Kodai lake, visit Bryant Park, and savor handmade chocolates.' },
      { day: 6, dateString: 'Day 6', title: 'Departure', location: 'Madurai', image: 'https://loremflickr.com/800/600/highway?lock=616', desc: 'Drive down to Madurai Airport for your onward journey.' }
    ]
  },
  {
    id: 'p7',
    title: '4 Days Rameshwaram Pilgrimage',
    duration: '4 Days / 3 Nights',
    states: 'Tamil Nadu',
    price: 18000,
    image: 'https://loremflickr.com/800/600/bridge,ocean?lock=701',
    description: 'A deeply spiritual and historically rich journey spanning from Madurai to the island tip of Rameshwaram and Kanyakumari.',
    highlights: ['Pamban Bridge', 'Dhanushkodi', 'Kanyakumari Sunset'],
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Madurai to Rameshwaram', location: 'Rameshwaram', image: 'https://loremflickr.com/800/600/bridge?lock=711', desc: 'Arrive in Madurai, drive to Rameshwaram across the stunning Pamban Ocean Bridge.' },
      { day: 2, dateString: 'Day 2', title: 'Rameshwaram Temple & Ghost Town', location: 'Rameshwaram', image: 'https://loremflickr.com/800/600/ruins?lock=712', desc: 'Early morning holy bath at 22 wells in Ramanathaswamy Temple. Afternoon visit to Dhanushkodi ghost town.' },
      { day: 3, dateString: 'Day 3', title: 'Rameshwaram to Kanyakumari', location: 'Kanyakumari', image: 'https://loremflickr.com/800/600/ocean?lock=713', desc: 'Drive to the southernmost tip of India. Watch a spectacular sunset where three seas meet.' },
      { day: 4, dateString: 'Day 4', title: 'Departure', location: 'Trivandrum', image: 'https://loremflickr.com/800/600/sunrise?lock=714', desc: 'Witness Kanyakumari sunrise, visit Vivekananda Memorial, and drive to Trivandrum Airport.' }
    ]
  },
  {
    id: 'p8',
    title: '5 Days Wayanad Wilderness',
    duration: '5 Days / 4 Nights',
    states: 'Kerala',
    price: 21000,
    image: 'https://loremflickr.com/800/600/forest,wildlife?lock=801',
    description: 'Immerse yourself in the dense jungles, cascading waterfalls, and spice plantations of Northern Kerala.',
    highlights: ['Edakkal Caves', 'Soochipara Falls', 'Chembra Peak'],
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Calicut to Wayanad', location: 'Wayanad', image: 'https://loremflickr.com/800/600/trees?lock=811', desc: 'Pickup from Calicut. Drive through the Thamarassery Churam (ghat road) with 9 hairpin bends into Wayanad.' },
      { day: 2, dateString: 'Day 2', title: 'Caves and Lakes', location: 'Wayanad', image: 'https://loremflickr.com/800/600/cave?lock=812', desc: 'Trek to the pre-historic Edakkal Caves, followed by boating in the pristine Pookode Lake.' },
      { day: 3, dateString: 'Day 3', title: 'Waterfalls and Wildlife', location: 'Wayanad', image: 'https://loremflickr.com/800/600/waterfall?lock=813', desc: 'Visit Soochipara Waterfalls and Muthanga Wildlife Sanctuary for an exciting jeep safari.' },
      { day: 4, dateString: 'Day 4', title: 'Chembra Peak / Banasura', location: 'Wayanad', image: 'https://loremflickr.com/800/600/dam?lock=814', desc: 'Visit Banasura Sagar Dam, the largest earth dam in India, or optional trek to the heart-shaped lake at Chembra.' },
      { day: 5, dateString: 'Day 5', title: 'Departure', location: 'Calicut', image: 'https://loremflickr.com/800/600/highway?lock=815', desc: 'Morning spice shopping. Drop-off at Calicut airport or railway station.' }
    ]
  },
  {
    id: 'p9',
    title: '3 Days Pondicherry Retreat',
    duration: '3 Days / 2 Nights',
    states: 'Pondicherry',
    price: 13500,
    image: 'https://loremflickr.com/800/600/architecture,street?lock=901',
    description: 'Experience a slice of France in India. Walk the cobblestone streets, chill at the cafes, and find peace in Auroville.',
    highlights: ['Aurobindo Ashram', 'Auroville', 'Promenade Beach'],
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Chennai to Pondicherry', location: 'Pondicherry', image: 'https://loremflickr.com/800/600/beach?lock=911', desc: 'Scenic ECR drive. Check into hotel. Evening walk along the Promenade beach overlooking the Bay of Bengal.' },
      { day: 2, dateString: 'Day 2', title: 'French Quarter & Auroville', location: 'Pondicherry', image: 'https://loremflickr.com/800/600/spiritual?lock=912', desc: 'Visit the experimental township of Auroville. Return to explore the vibrant Mustard-yellow French Quarter.' },
      { day: 3, dateString: 'Day 3', title: 'Departure', location: 'Chennai', image: 'https://loremflickr.com/800/600/car?lock=913', desc: 'Visit Paradise Beach via boat. Post lunch, transfer back to Chennai.' }
    ]
  },
  {
    id: 'p10',
    title: '4 Days Yercaud & Kolli Hills',
    duration: '4 Days / 3 Nights',
    states: 'Tamil Nadu',
    price: 15500,
    image: 'https://loremflickr.com/800/600/hills,road?lock=1001',
    description: 'An offbeat mountainous adventure driving through the famous 70 hairpin bends of Kolli Hills and the peaceful lakes of Yercaud.',
    highlights: ['70 Hairpin Bends', 'Agaya Gangai Falls', 'Yercaud Lake'],
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Arrival in Salem & Yercaud', location: 'Yercaud', image: 'https://loremflickr.com/800/600/lake?lock=1011', desc: 'Arrive at Salem, drive 30km uphill to Yercaud. Evening boating at Emerald Lake or walk by Anna Park.' },
      { day: 2, dateString: 'Day 2', title: 'Explore Yercaud', location: 'Yercaud', image: 'https://loremflickr.com/800/600/viewpoint?lock=1012', desc: 'Visit Lady Seat, Pagoda Point, and Kiliyur Falls. Visit the massive coffee plantations.' },
      { day: 3, dateString: 'Day 3', title: 'Thrilling Kolli Hills', location: 'Kolli Hills', image: 'https://loremflickr.com/800/600/windingroad?lock=1013', desc: 'Drive down to plains and up the thrilling 70 hairpin bends to Kolli Hills. Experience raw, untouched nature.' },
      { day: 4, dateString: 'Day 4', title: 'Agaya Gangai & Departure', location: 'Salem', image: 'https://loremflickr.com/800/600/waterfall?lock=1014', desc: 'Trek down 1000 steps to the stunning Agaya Gangai waterfalls. Drive back to Salem for departure.' }
    ]
  },
  {
    id: 'p11',
    title: '7 Days Majestic Mysore & Coorg',
    duration: '7 Days / 6 Nights',
    states: 'Karnataka',
    price: 32000,
    image: 'https://loremflickr.com/800/600/palace,india?lock=1101',
    description: 'Wander through the opulent Palaces of Mysore and retreat into the Scotland of India—Coorg—for world-class coffee and nature.',
    highlights: ['Mysore Palace', 'Abbey Falls', 'Dubare Camp'],
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Arrival in Bangalore & Mysore', location: 'Mysore', image: 'https://loremflickr.com/800/600/city?lock=1111', desc: 'Arrive in BLR. Transfer to Mysore. Visit the culturally rich Brindavan Gardens in the evening.' },
      { day: 2, dateString: 'Day 2', title: 'Mysore Royal Tour', location: 'Mysore', image: 'https://loremflickr.com/800/600/palace?lock=1112', desc: 'Full day exploring the magnificent Amba Vilas Palace, Chamundi Hill, and St. Philomena Church.' },
      { day: 3, dateString: 'Day 3', title: 'Mysore to Coorg', location: 'Coorg', image: 'https://loremflickr.com/800/600/hills?lock=1113', desc: 'Drive to Coorg (Madikeri). En route visit the Tibetan Golden Temple at Bylakuppe.' },
      { day: 4, dateString: 'Day 4', title: 'Coorg Nature Exploration', location: 'Coorg', image: 'https://loremflickr.com/800/600/waterfall?lock=1114', desc: 'Visit Abbey falls, Omkareshwara Temple, and Raja Seat for a spectacular sunset view over the rolling hills.' },
      { day: 5, dateString: 'Day 5', title: 'Elephants & Coffee', location: 'Coorg', image: 'https://loremflickr.com/800/600/elephant?lock=1115', desc: 'Spend the morning interacting with elephants at Dubare Camp. Afternoon coffee plantation walkway.' },
      { day: 6, dateString: 'Day 6', title: 'Talakaveri Excursion', location: 'Coorg', image: 'https://loremflickr.com/800/600/river?lock=1116', desc: 'Visit Talakaveri, the sacred origin of the River Kaveri, surrounded by mist-filled Brahmagiri hills.' },
      { day: 7, dateString: 'Day 7', title: 'Departure', location: 'Bangalore', image: 'https://loremflickr.com/800/600/airport?lock=1117', desc: 'Scenic morning drive back to Bangalore connecting flights/trains.' }
    ]
  },
  {
    id: 'p12',
    title: '6 Days Trivandrum Coastal Vibe',
    duration: '6 Days / 5 Nights',
    states: 'Kerala',
    price: 24000,
    image: 'https://loremflickr.com/800/600/cliff,ocean?lock=1201',
    description: 'A blend of deep spirituality and bohemian coastal vibes on the magnificent red cliffs overlooking the Arabian Sea.',
    highlights: ['Padmanabhaswamy Temple', 'Varkala Cliff'],
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Arrival in Trivandrum', location: 'Trivandrum', image: 'https://loremflickr.com/800/600/temple?lock=1211', desc: 'Arrive in the historic capital of Kerala. Check in. Visit the incredibly wealthy Padmanabhaswamy Temple.' },
      { day: 2, dateString: 'Day 2', title: 'Museums & Kovalam', location: 'Kovalam', image: 'https://loremflickr.com/800/600/museum?lock=1212', desc: 'Visit Napier Museum. By afternoon, drive to Kovalam and relax by the famous lighthouse beach.' },
      { day: 3, dateString: 'Day 3', title: 'Ponmudi Hill Trip', location: 'Trivandrum', image: 'https://loremflickr.com/800/600/mist?lock=1213', desc: 'A day trip to Ponmudi hills via 22 hairpin bends to experience the cool mist mere miles from the coast. Return to Trivandrum.' },
      { day: 4, dateString: 'Day 4', title: 'Drive to Varkala', location: 'Varkala', image: 'https://loremflickr.com/800/600/cliff?lock=1214', desc: 'Short 1.5 hr drive to Varkala. Check into a cliff resort. Enjoy the vibrant cafes along the cliff edge.' },
      { day: 5, dateString: 'Day 5', title: 'Varkala Vibes', location: 'Varkala', image: 'https://loremflickr.com/800/600/beach?lock=1215', desc: 'Walk down to Papanasam Beach. Take part in yoga, surfing, or simply relax at beautiful Odayam Beach.' },
      { day: 6, dateString: 'Day 6', title: 'Departure', location: 'Trivandrum', image: 'https://loremflickr.com/800/600/airport?lock=1216', desc: 'Morning checkout and easy drive to Trivandrum Airport.' }
    ]
  }
];

// Re-read and extract existing packages 1 and 2 directly using simple regex
// Wait, we can't reliably regex the inner object because of JSON constraints.
// Let's just manually define p1 and p2 here, and completely rewrite the packages export!
// But p1 and p2 have specific data. Let's just evaluate the existing mockData in VM context to get the raw JS array safely.

const vm = require('vm');
// Create a sandbox
const sandbox = { export: {} };
// Strip export keywords
const scriptCode = content.replace(/export const /g, 'const ');
// Run the script in VM to extract the 'packages' variable
vm.runInNewContext(scriptCode + '\nexport_packages = packages;', sandbox);

const originalPackages = sandbox.export_packages;
// Filter down to just p1 and p2
const p1p2 = originalPackages.filter(p => p.id === 'p1' || p.id === 'p2');

const finalPackages = p1p2.concat(newPackages);

// Rewrite the final mockData.js
const updatedContent = topHalf + 'export const packages = ' + JSON.stringify(finalPackages, null, 2) + ';\n';

fs.writeFileSync(filePath, updatedContent);
console.log('Appended 10 extra packages into mockData.js successfully!');
