const drivers = [
  {
    "id": "d1",
    "name": "Ramesh Kumar",
    "experience": 12,
    "languages": [
      "Tamil",
      "English",
      "Hindi"
    ],
    "rating": 4.9,
    "trips": 450,
    "pricePerDay": 800,
    "image": "/images/drivers/driver_1.png",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
    "bio": "An expert in Southern routes with over a decade of safe driving. Known for his polite nature and deep knowledge of local authentic restaurants in Kerala and Tamil Nadu."
  },
  {
    "id": "d2",
    "name": "Murugan S.",
    "experience": 15,
    "languages": [
      "Tamil",
      "Malayalam",
      "English"
    ],
    "rating": 5,
    "trips": 620,
    "pricePerDay": 900,
    "image": "/images/drivers/driver_2.png",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
    "bio": "Specialist in hill station driving, particularly Ooty and Munnar. Fluent in Malayalam, making him the perfect guide for your Kerala trips."
  },
  {
    "id": "d3",
    "name": "Rajesh Kannan",
    "experience": 8,
    "languages": [
      "Tamil",
      "English"
    ],
    "rating": 4.8,
    "trips": 310,
    "pricePerDay": 750,
    "image": "/images/drivers/driver_3.png",
    "bannerImage": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2000&auto=format&fit=crop",
    "bio": "Energetic and deeply knowledgeable about the heritage temples across Madurai, Thanjavur, and Rameshwaram. Highly praised by international tourists."
  },
  {
    "id": "d4",
    "name": "Dinesh V.",
    "experience": 20,
    "languages": [
      "Tamil",
      "Telugu",
      "English"
    ],
    "rating": 4.9,
    "trips": 850,
    "pricePerDay": 1000,
    "image": "/images/drivers/driver_4.png",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
    "bio": "Our most senior driver with an impeccable safety record. Dinesh is calm, composed, and brings a wealth of experience for long 14-day inter-state tours."
  },
  {
    "id": "d5",
    "name": "Selvam T.",
    "experience": 5,
    "languages": [
      "Tamil",
      "English",
      "Hindi"
    ],
    "rating": 4.7,
    "trips": 180,
    "pricePerDay": 700,
    "image": "/images/drivers/driver_5.png",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
    "bio": "Young, professional, and very tech-savvy. Selvam is perfect for corporate clients and modern families looking for a smooth, connected ride."
  },
  {
    "id": "d6",
    "name": "Anwar Basha",
    "experience": 10,
    "languages": [
      "Tamil",
      "Hindi",
      "Urdu"
    ],
    "rating": 4.9,
    "trips": 400,
    "pricePerDay": 850,
    "image": "/images/drivers/driver_6.png",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
    "bio": "Exceptional hospitality and very familiar with the coastal routes leading to Pondicherry and Kanyakumari."
  },
  {
    "id": "d7",
    "name": "Karuppasamy",
    "experience": 18,
    "languages": [
      "Tamil",
      "Malayalam"
    ],
    "rating": 5,
    "trips": 710,
    "pricePerDay": 950,
    "image": "/images/drivers/driver_7.png",
    "bannerImage": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
    "bio": "A legend on the Tamil Nadu tourist circuit. He knows every shortcut, every best viewpoint, and always ensures clients feel like family."
  }
];

const cars = [
  {
    "id": "c1",
    "name": "Hyundai Creta",
    "category": "Compact SUV",
    "seats": 5,
    "fuel": "Petrol / Diesel",
    "transmission": "Manual / Automatic",
    "pricePerKm": 14,
    "minKmPerDay": 250,
    "driverBata": 400,
    "image": "/images/cars/hyundai creta.jpeg",
    "features": [
      "Panoramic Sunroof",
      "Ventilated Seats",
      "Premium Interior",
      "Touchscreen Infotainment"
    ],
    "desc": "The perfect compact SUV for smooth city drives and comfortable highway cruising."
  },
  {
    "id": "c2",
    "name": "Kia Seltos",
    "category": "Compact SUV",
    "seats": 5,
    "fuel": "Petrol / Diesel",
    "transmission": "Manual / Automatic",
    "pricePerKm": 14,
    "minKmPerDay": 250,
    "driverBata": 400,
    "image": "/images/cars/kia seltos.jpeg",
    "features": [
      "Bose Premium Sound",
      "Heads-up Display",
      "Air Purifier",
      "Sporty Design"
    ],
    "desc": "A stylish and tech-loaded SUV that offers a premium travel experience on any journey."
  },
  {
    "id": "c3",
    "name": "Mahindra Scorpio-N",
    "category": "Premium SUV",
    "seats": 7,
    "fuel": "Diesel / Petrol",
    "transmission": "Manual / Automatic",
    "pricePerKm": 18,
    "minKmPerDay": 250,
    "driverBata": 500,
    "image": "/images/cars/mahindra scorpio-n.jpeg",
    "features": [
      "Commanding Seating",
      "Sunroof",
      "Tough Build",
      "Spacious Third Row"
    ],
    "desc": "The Big Daddy of SUVs. Exceptional presence, space, and comfort for large groups."
  },
  {
    "id": "c4",
    "name": "Mahindra Thar",
    "category": "Adventure SUV",
    "seats": 4,
    "fuel": "Diesel",
    "transmission": "Manual / Automatic",
    "pricePerKm": 20,
    "minKmPerDay": 200,
    "driverBata": 500,
    "image": "/images/cars/mahindra thar.jpeg",
    "features": [
      "4x4 Off-Roading Capability",
      "Open Top Option",
      "High Ground Clearance"
    ],
    "desc": "For the thrill-seekers. Best suited for adventurous trips up the steep hills or off-roading near Munnar."
  },
  {
    "id": "c5",
    "name": "Tata Nexon",
    "category": "Compact SUV",
    "seats": 5,
    "fuel": "Petrol / Diesel",
    "transmission": "Manual / Automatic",
    "pricePerKm": 12,
    "minKmPerDay": 250,
    "driverBata": 350,
    "image": "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
    "features": [
      "5-Star Global NCAP Rating",
      "Harman Audio",
      "High Ground Clearance"
    ],
    "desc": "A safe, dynamic and highly comfortable 5-seater for families seeking both economy and style."
  },
  {
    "id": "c6",
    "name": "Mahindra XUV 3XO",
    "category": "Compact SUV",
    "seats": 5,
    "fuel": "Petrol / Diesel",
    "transmission": "Manual / Automatic",
    "pricePerKm": 13,
    "minKmPerDay": 250,
    "driverBata": 400,
    "image": "/images/cars/mahindra xuv 3xo.jpeg",
    "features": [
      "Level 2 ADAS",
      "Panoramic Sunroof",
      "Premium Audio"
    ],
    "desc": "Setting new benchmarks in the compact SUV segment with premium features and thrilling performance."
  },
  {
    "id": "c7",
    "name": "Maruti Suzuki Brezza",
    "category": "Compact SUV",
    "seats": 5,
    "fuel": "Petrol / CNG",
    "transmission": "Manual / Automatic",
    "pricePerKm": 12,
    "minKmPerDay": 250,
    "driverBata": 350,
    "image": "/images/cars/maruti suzuki brezza.jpeg",
    "features": [
      "HUD Display",
      "360 Camera",
      "High Fuel Efficiency"
    ],
    "desc": "India's most loved compact SUV, featuring bold looks, high tech, and unmatched reliability."
  },
  {
    "id": "c8",
    "name": "Honda City",
    "category": "Premium Sedan",
    "seats": 5,
    "fuel": "Petrol / Hybrid",
    "transmission": "Manual / CVT",
    "pricePerKm": 15,
    "minKmPerDay": 250,
    "driverBata": 400,
    "image": "/images/cars/honda city.jpeg",
    "features": [
      "ADAS Safety",
      "Spacious Cabin",
      "Refined i-VTEC Engine"
    ],
    "desc": "A sophisticated sedan offering unparalleled comfort, legroom, and a very smooth, quiet ride."
  },
  {
    "id": "c9",
    "name": "Hyundai Verna",
    "category": "Premium Sedan",
    "seats": 5,
    "fuel": "Petrol / Turbo",
    "transmission": "Manual / Automatic",
    "pricePerKm": 15,
    "minKmPerDay": 250,
    "driverBata": 400,
    "image": "/images/cars/hyundai verna.jpeg",
    "features": [
      "Futuristic Design",
      "Ventilated Seats",
      "Advanced Tech"
    ],
    "desc": "A futuristic premium sedan that stands out with its bold design and luxury-class interiors."
  },
  {
    "id": "c10",
    "name": "Swift Dzire",
    "category": "Sedan",
    "seats": 4,
    "fuel": "Petrol / Diesel",
    "transmission": "Manual / Automatic",
    "pricePerKm": 12,
    "minKmPerDay": 250,
    "driverBata": 350,
    "image": "/images/cars/maruti suzuki swift.jpeg",
    "features": [
      "AC",
      "Luggage Space",
      "Music System"
    ],
    "desc": "The most popular choice for small families and solo travellers offering great mileage and comfort."
  },
  {
    "id": "c11",
    "name": "Toyota Innova",
    "category": "Premium SUV",
    "seats": 7,
    "fuel": "Diesel",
    "transmission": "Manual",
    "pricePerKm": 18,
    "minKmPerDay": 300,
    "driverBata": 450,
    "image": "/images/cars/toyota innova.jpeg",
    "features": [
      "AC",
      "Spacious Interiors",
      "GPS",
      "Extra Luggage Space"
    ],
    "desc": "The ultimate family favourite SUV for outstation trips, providing unmatched spaciousness and legendary reliability."
  },
  {
    "id": "c12",
    "name": "Tempo Traveller",
    "category": "Mini Van",
    "seats": 12,
    "fuel": "Diesel",
    "transmission": "Manual",
    "pricePerKm": 25,
    "minKmPerDay": 300,
    "driverBata": 600,
    "image": "/images/cars/tempo traveller.jpeg",
    "features": [
      "AC",
      "Pushback Seats",
      "Ample Legroom",
      "TV & Audio System"
    ],
    "desc": "Perfect for group travel, corporate outings, and large family vacations with utmost comfort."
  },
  {
    "id": "c13",
    "name": "Luxury Cars",
    "category": "Business Class",
    "seats": 4,
    "fuel": "Petrol / Diesel",
    "transmission": "Automatic",
    "pricePerKm": 45,
    "minKmPerDay": 250,
    "driverBata": 800,
    "image": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
    "features": [
      "Leather Interiors",
      "Champagne Chiller",
      "WiFi",
      "Premium Ride"
    ],
    "desc": "Uncompromising luxury for VIP arrivals, weddings, and premium corporate travel."
  },
  {
    "id": "c14",
    "name": "Sri Lakshmi Travels Premium Omnibus",
    "category": "Luxury Bus",
    "seats": 40,
    "fuel": "Diesel",
    "transmission": "Automatic",
    "pricePerKm": 65,
    "minKmPerDay": 300,
    "driverBata": 1000,
    "image": "https://images.unsplash.com/photo-1541899481282-d53bffe3c359?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
    "features": [
      "Emergency Exits",
      "Air Suspension",
      "Recliner Seats",
      "Modern Safety Tools",
      "Wi-Fi"
    ],
    "desc": "Top-of-the-line Sri Lakshmi Travels multi-axle sleeper bus ensuring maximum safety with dedicated emergency exits, premium air suspension comfort, and a smooth journey."
  },
  {
    "id": "c15",
    "name": "Mahindra XUV700",
    "category": "Premium SUV",
    "seats": 7,
    "fuel": "Petrol / Diesel",
    "transmission": "Manual / Automatic",
    "pricePerKm": 18,
    "minKmPerDay": 250,
    "driverBata": 450,
    "image": "/images/cars/mahindra xuv700.jpeg",
    "features": [
      "Panoramic Sunroof",
      "Level 2 ADAS",
      "Premium Sound"
    ],
    "desc": "The most advanced tech-loaded SUV suited for family long drives."
  },
  {
    "id": "c16",
    "name": "Tata Safari",
    "category": "Premium SUV",
    "seats": 7,
    "fuel": "Diesel",
    "transmission": "Manual / Automatic",
    "pricePerKm": 18,
    "minKmPerDay": 250,
    "driverBata": 450,
    "image": "/images/cars/tata safari.jpeg",
    "features": [
      "Panoramic Sunroof",
      "Captain Seats",
      "JBL Audio"
    ],
    "desc": "The iconic spacious SUV reborn with modern luxury and tough build quality."
  },
  {
    "id": "c17",
    "name": "Toyota Fortuner",
    "category": "Premium SUV",
    "seats": 7,
    "fuel": "Diesel / Petrol",
    "transmission": "Manual / Automatic",
    "pricePerKm": 22,
    "minKmPerDay": 300,
    "driverBata": 500,
    "image": "/images/cars/toyota fortuner.jpeg",
    "features": [
      "4x4 Option",
      "Massive Road Presence",
      "Reliability"
    ],
    "desc": "The ultimate reliable and rugged VIP SUV that conquers every terrain effortlessly."
  },
  {
    "id": "c18",
    "name": "Maruti Suzuki Ertiga",
    "category": "MUV",
    "seats": 7,
    "fuel": "Petrol / CNG",
    "transmission": "Manual / Automatic",
    "pricePerKm": 13,
    "minKmPerDay": 250,
    "driverBata": 350,
    "image": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1000&auto=format&fit=crop",
    "bannerImage": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2000&auto=format&fit=crop",
    "features": [
      "Spacious Cabin",
      "High Fuel Efficiency",
      "Smart Hybrid"
    ],
    "desc": "The most affordable and practical 7-seater family carrier for long and short trips."
  },
  {
    "id": "c19",
    "name": "Kia Carens",
    "category": "MUV",
    "seats": 7,
    "fuel": "Petrol / Diesel",
    "transmission": "Manual / Automatic",
    "pricePerKm": 15,
    "minKmPerDay": 250,
    "driverBata": 400,
    "image": "/images/cars/kia carens.jpeg",
    "features": [
      "Ventilated Seats",
      "Bose Audio",
      "6 Airbags"
    ],
    "desc": "A premium family mover offering top-notch safety features and ride comfort."
  },
  {
    "id": "c20",
    "name": "Tata Harrier",
    "category": "Premium SUV",
    "seats": 5,
    "fuel": "Diesel",
    "transmission": "Manual / Automatic",
    "pricePerKm": 17,
    "minKmPerDay": 250,
    "driverBata": 400,
    "image": "/images/cars/tata harrier.jpeg",
    "features": [
      "Land Rover Pedigree",
      "Panoramic Sunroof",
      "Bold Stance"
    ],
    "desc": "A striking 5-seater SUV combining bold design with thrilling performance."
  },
  {
    "id": "c21",
    "name": "MG Hector",
    "category": "Premium SUV",
    "seats": 5,
    "fuel": "Petrol / Diesel",
    "transmission": "Manual / Automatic",
    "pricePerKm": 16,
    "minKmPerDay": 250,
    "driverBata": 400,
    "image": "/images/cars/mg hector.jpeg",
    "features": [
      "14-inch Touchscreen",
      "Connected Tech",
      "Panoramic Sunroof"
    ],
    "desc": "The Internet-connected SUV offering massive cabin space and intelligent features."
  },
  {
    "id": "c22",
    "name": "Maruti Suzuki Jimny",
    "category": "Adventure SUV",
    "seats": 4,
    "fuel": "Petrol",
    "transmission": "Manual / Automatic",
    "pricePerKm": 18,
    "minKmPerDay": 250,
    "driverBata": 450,
    "image": "/images/cars/maruti suzuki jimny.jpeg",
    "features": [
      "4x4 Off-Roading",
      "Compact Size",
      "All-Grip Pro"
    ],
    "desc": "The iconic lifestyle 4x4 off-roader, built to tackle the toughest Indian terrains."
  },
  {
    "id": "c23",
    "name": "Mahindra Bolero Neo",
    "category": "Rugged SUV",
    "seats": 7,
    "fuel": "Diesel",
    "transmission": "Manual",
    "pricePerKm": 14,
    "minKmPerDay": 250,
    "driverBata": 400,
    "image": "/images/cars/mahindra bolero neo.jpeg",
    "features": [
      "Tough Body",
      "Micro HybridTech",
      "MLD Option"
    ],
    "desc": "A tough, reliable classic Indian mover perfect for rural side trips and hill stations."
  },
  {
    "id": "c24",
    "name": "Hyundai Alcazar",
    "category": "Premium SUV",
    "seats": 7,
    "fuel": "Petrol / Diesel",
    "transmission": "Manual / Automatic",
    "pricePerKm": 17,
    "minKmPerDay": 250,
    "driverBata": 450,
    "image": "/images/cars/hyundai alcazar.jpeg",
    "features": [
      "Captain Seats",
      "Air Purifier",
      "Premium Bose Audio"
    ],
    "desc": "Luxurious 3-row comfort based on the Creta, built perfectly for family outstation trips."
  },
  {
    "id": "c25",
    "name": "Maruti Suzuki Swift",
    "category": "Hatchback",
    "seats": 5,
    "fuel": "Petrol / CNG",
    "transmission": "Manual / Automatic",
    "pricePerKm": 11,
    "minKmPerDay": 250,
    "driverBata": 350,
    "image": "/images/cars/maruti suzuki swift.jpeg",
    "features": [
      "High Mileage",
      "Z-Series Engine",
      "Modern Safety"
    ],
    "desc": "The most loved hatchback in India, now with better safety and more efficiency."
  },
  {
    "id": "c26",
    "name": "Tata Punch",
    "category": "Micro SUV",
    "seats": 5,
    "fuel": "Petrol / CNG",
    "transmission": "Manual / Automatic",
    "pricePerKm": 12,
    "minKmPerDay": 250,
    "driverBata": 350,
    "image": "/images/cars/tata punch.jpeg",
    "features": [
      "5-Star NCAP",
      "Tough Build",
      "High Ground Clearance"
    ],
    "desc": "India's safe and rugged micro SUV, perfect for both city and village roads."
  },
  {
    "id": "c27",
    "name": "Skoda Slavia",
    "category": "Premium Sedan",
    "seats": 5,
    "fuel": "Petrol",
    "transmission": "Manual / Automatic",
    "pricePerKm": 16,
    "minKmPerDay": 250,
    "driverBata": 400,
    "image": "/images/cars/skoda slavia.jpeg",
    "features": [
      "TSI Performance",
      "Crystalline Design",
      "European Safety"
    ],
    "desc": "A beautiful European sedan offering powerful performance and elegant design."
  },
  {
    "id": "c28",
    "name": "Volkswagen Virtus",
    "category": "Premium Sedan",
    "seats": 5,
    "fuel": "Petrol",
    "transmission": "Manual / Automatic",
    "pricePerKm": 16,
    "minKmPerDay": 250,
    "driverBata": 400,
    "image": "/images/cars/volkswagen virtus.jpeg",
    "features": [
      "GTI Pedigree",
      "German Engineering",
      "Digital Cockpit"
    ],
    "desc": "The longest and widest sedan in its class, offering a true enthusiast driving experience."
  },
  {
    "id": "c29",
    "name": "Maruti Suzuki Fronx",
    "category": "Compact SUV",
    "seats": 5,
    "fuel": "Petrol / CNG",
    "transmission": "Manual / Automatic",
    "pricePerKm": 12,
    "minKmPerDay": 250,
    "driverBata": 350,
    "image": "/images/cars/maruti suzuki fronx.jpeg",
    "features": [
      "Coupe Design",
      "Smart Hybrid",
      "360 Camera"
    ],
    "desc": "A stylish crossover offering a unique blend of SUV stance and coupe design."
  },
  {
    "id": "c30",
    "name": "Hyundai Venue",
    "category": "Compact SUV",
    "seats": 5,
    "fuel": "Petrol / Diesel",
    "transmission": "Manual / Automatic",
    "pricePerKm": 13,
    "minKmPerDay": 250,
    "driverBata": 350,
    "image": "/images/cars/hyundai venue.jpeg",
    "features": [
      "Electric Sunroof",
      "Connected Tech",
      "Air Purifier"
    ],
    "desc": "The smart urban SUV with advanced tech and bold styling for modern families."
  }
];

const packages = [
  {
    "id": "p1",
    "title": "Enchanting Ooty Getaway",
    "duration": "3 Days / 2 Nights",
    "states": "Tamil Nadu",
    "price": 5500,
    "image": "https://loremflickr.com/800/600/Ooty,Lake?lock=1",
    "bannerImage": "https://loremflickr.com/800/600/Ooty,Nilgiris?lock=2",
    "description": "Experience the Queen of Hill Stations with its lush green valleys, beautiful lakes, and the historic Nilgiri Mountain Railway.",
    "highlights": [
      "Botanical Garden",
      "Ooty Lake Boating",
      "Doddabetta Peak View",
      "Nilgiri Mountain Railway"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Arrival and Lake Visit",
        "location": "Ooty",
        "image": "https://loremflickr.com/800/600/Ooty,Lake,Boating?lock=3",
        "bannerImage": "https://loremflickr.com/800/600/Ooty,Landscape?lock=4",
        "desc": "Arrive in Ooty. Check-in to the hotel and visit the picturesque Ooty Lake for an evening boat ride.",
        "activities": [
          "Hotel Check-in",
          "Ooty Lake",
          "Local Market"
        ]
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Botanical Gardens & Peaks",
        "location": "Ooty",
        "image": "https://loremflickr.com/800/600/Botanical,Garden,Ooty?lock=5",
        "bannerImage": "https://loremflickr.com/800/600/Doddabetta,Peak?lock=6",
        "desc": "Visit the sprawling Government Botanical Gardens, followed by a trip to Doddabetta Peak for a panoramic view of the Nilgiris.",
        "activities": [
          "Botanical Garden",
          "Doddabetta Peak",
          "Tea Factory"
        ]
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Heritage Train & Departure",
        "location": "Ooty",
        "image": "https://loremflickr.com/800/600/Nilgiri,Mountain,Railway?lock=7",
        "bannerImage": "https://loremflickr.com/800/600/Ooty,Station?lock=8",
        "desc": "Enjoy a short ride on the heritage Nilgiri Mountain Railway before departing for your onward journey.",
        "activities": [
          "Toy Train Ride",
          "Departure"
        ]
      }
    ]
  },
  {
    "id": "p2",
    "title": "Kodaikanal Nature Retreat",
    "duration": "3 Days / 2 Nights",
    "states": "Tamil Nadu",
    "price": 6000,
    "image": "https://loremflickr.com/800/600/Kodaikanal,Lake?lock=11",
    "bannerImage": "https://loremflickr.com/800/600/Kodaikanal,Hills?lock=12",
    "description": "Escape to the Princess of Hill Stations. Wander through misty pine forests, view majestic pillar rocks, and cycle around the star-shaped Kodai lake.",
    "highlights": [
      "Kodai Lake Cycling",
      "Coaker's Walk",
      "Pillar Rocks",
      "Pine Forest"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Lake & Coaker's Walk",
        "location": "Kodaikanal",
        "image": "https://loremflickr.com/800/600/Kodaikanal,Lake,Cycling?lock=13",
        "bannerImage": "https://loremflickr.com/800/600/Coakers,Walk?lock=14",
        "desc": "Check-in at Kodaikanal. Spend the afternoon cycling around Kodai Lake and walking along the scenic Coaker's Walk.",
        "activities": [
          "Kodai Lake",
          "Coaker's Walk",
          "Bryant Park"
        ]
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Pillars & Pines",
        "location": "Kodaikanal",
        "image": "https://loremflickr.com/800/600/Pillar,Rocks,India?lock=15",
        "bannerImage": "https://loremflickr.com/800/600/Pine,Forest,Misty?lock=16",
        "desc": "Explore the majestic Pillar Rocks, the mystical Pine Forest, and the refreshing Silver Cascade Falls.",
        "activities": [
          "Pillar Rocks",
          "Pine Forest",
          "Silver Cascade Falls"
        ]
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Departure",
        "location": "Kodaikanal",
        "image": "https://loremflickr.com/800/600/Kodaikanal,Sunrise?lock=17",
        "bannerImage": "https://loremflickr.com/800/600/Kodaikanal,Valley?lock=18",
        "desc": "Watch a beautiful sunrise, enjoy a hearty breakfast, and depart with wonderful memories.",
        "activities": [
          "Sunrise View",
          "Departure"
        ]
      }
    ]
  },
  {
    "id": "p3",
    "title": "Coorg Coffee Country",
    "duration": "5 Days / 4 Nights",
    "states": "Karnataka",
    "price": 11500,
    "image": "https://loremflickr.com/800/600/Coorg,Coffee,Plantation?lock=21",
    "bannerImage": "https://loremflickr.com/800/600/Coorg,Hills?lock=22",
    "description": "Discover the Scotland of India. Immerse yourself in the aroma of fresh coffee, massive waterfalls, and a rich local Kodava culture.",
    "highlights": [
      "Abbey Falls",
      "Coffee Plantation Walk",
      "Raja's Seat Sunset",
      "Dubare Elephant Camp"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Arrival in Madikeri",
        "location": "Coorg",
        "image": "https://loremflickr.com/800/600/Madikeri,Town?lock=23",
        "bannerImage": "https://loremflickr.com/800/600/Coorg,Resort?lock=24",
        "desc": "Arrive in Madikeri, Coorg. Relax at your resort and enjoy a local Kodava dinner.",
        "activities": [
          "Hotel Check-in",
          "Leisure Time"
        ]
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Waterfalls & Sunsets",
        "location": "Coorg",
        "image": "https://loremflickr.com/800/600/Abbey,Falls,Coorg?lock=25",
        "bannerImage": "https://loremflickr.com/800/600/Rajas,Seat,Sunset?lock=26",
        "desc": "Visit the spectacular Abbey Falls. In the evening, witness a breathtaking sunset at Raja's Seat.",
        "activities": [
          "Abbey Falls",
          "Raja's Seat",
          "Madikeri Fort"
        ]
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Coffee & Culture",
        "location": "Coorg",
        "image": "https://loremflickr.com/800/600/Coffee,Estate,Coorg?lock=27",
        "bannerImage": "https://loremflickr.com/800/600/Spice,Plantation?lock=28",
        "desc": "Take a guided walk through a lush coffee and spice plantation. Learn about the coffee-making process.",
        "activities": [
          "Plantation Walk",
          "Coffee Tasting",
          "Omkareshwara Temple"
        ]
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Elephants & Monasteries",
        "location": "Coorg",
        "image": "https://loremflickr.com/800/600/Dubare,Elephant,Camp?lock=29",
        "bannerImage": "https://loremflickr.com/800/600/Golden,Temple,Kushalnagar?lock=30",
        "desc": "Interact with elephants at Dubare Elephant Camp, then visit the magnificent Namdroling Monastery (Golden Temple).",
        "activities": [
          "Dubare Camp",
          "Namdroling Monastery"
        ]
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Departure",
        "location": "Coorg",
        "image": "https://loremflickr.com/800/600/Coorg,Morning?lock=31",
        "bannerImage": "https://loremflickr.com/800/600/Western,Ghats?lock=32",
        "desc": "Check out and begin your return journey with a fresh packet of Coorg coffee.",
        "activities": [
          "Shopping",
          "Departure"
        ]
      }
    ]
  },
  {
    "id": "p4",
    "title": "Pondicherry Coastal Escape",
    "duration": "5 Days / 4 Nights",
    "states": "Puducherry",
    "price": 12500,
    "image": "https://loremflickr.com/800/600/Pondicherry,French,Colony?lock=41",
    "bannerImage": "https://loremflickr.com/800/600/Pondicherry,Beach?lock=42",
    "description": "A beautiful blend of traditional Indian culture and French architecture. Walk the promenade, visit Auroville, and enjoy pristine beaches.",
    "highlights": [
      "French Quarter Walk",
      "Auroville Ashram",
      "Promenade Beach",
      "Paradise Island"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Arrival & Promenade",
        "location": "Pondicherry",
        "image": "https://loremflickr.com/800/600/Promenade,Beach,Pondicherry?lock=43",
        "bannerImage": "https://loremflickr.com/800/600/Pondicherry,Cafe?lock=44",
        "desc": "Arrive in Pondicherry. Spend the evening strolling along the rocky Promenade Beach and exploring local cafes.",
        "activities": [
          "Promenade Beach",
          "Cafe Hopping"
        ]
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "The French Quarter",
        "location": "Pondicherry",
        "image": "https://loremflickr.com/800/600/White,Town,Pondicherry?lock=45",
        "bannerImage": "https://loremflickr.com/800/600/Heritage,Building?lock=46",
        "desc": "Take a heritage walk through the White Town. See mustard-yellow colonial structures, the Aurobindo Ashram, and historic churches.",
        "activities": [
          "Heritage Walk",
          "Aurobindo Ashram",
          "Basilica of the Sacred Heart"
        ]
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Auroville Experience",
        "location": "Auroville",
        "image": "https://loremflickr.com/800/600/Matrimandir,Auroville?lock=47",
        "bannerImage": "https://loremflickr.com/800/600/Auroville,Forest?lock=48",
        "desc": "Visit Auroville, the experimental universal township. Marvel at the golden Matrimandir and shop for local handicrafts.",
        "activities": [
          "Matrimandir Viewpoint",
          "Auroville Boutiques",
          "Organic Lunch"
        ]
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Paradise Beach",
        "location": "Pondicherry",
        "image": "https://loremflickr.com/800/600/Paradise,Beach,Pondicherry?lock=49",
        "bannerImage": "https://loremflickr.com/800/600/Boat,Ride,Backwaters?lock=50",
        "desc": "Take a short boat ride to Paradise Beach Island. Enjoy the golden sands and calm sea water.",
        "activities": [
          "Boat Ride",
          "Paradise Beach",
          "Water Sports"
        ]
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Departure",
        "location": "Pondicherry",
        "image": "https://loremflickr.com/800/600/Pondicherry,Sunrise?lock=51",
        "bannerImage": "https://loremflickr.com/800/600/Ocean,Sunrise?lock=52",
        "desc": "Enjoy a beautiful sunrise over the Bay of Bengal before departing.",
        "activities": [
          "Sunrise View",
          "Departure"
        ]
      }
    ]
  },
  {
    "id": "p5",
    "title": "Golden Triangle - Taj Mahal & Agra",
    "duration": "5 Days / 4 Nights",
    "states": "Delhi, Agra, Jaipur",
    "price": 14000,
    "image": "https://loremflickr.com/800/600/Taj,Mahal,Sunrise?lock=61",
    "bannerImage": "https://loremflickr.com/800/600/Agra,Fort?lock=62",
    "description": "Experience the grandeur of India's Golden Triangle. Witness the ultimate symbol of love, the Taj Mahal, and explore the historic forts of Agra and Jaipur.",
    "highlights": [
      "Taj Mahal Sunrise",
      "Agra Fort",
      "Fatehpur Sikri",
      "Amber Fort"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Arrival in Delhi",
        "location": "Delhi",
        "image": "https://loremflickr.com/800/600/India,Gate,Delhi?lock=63",
        "bannerImage": "https://loremflickr.com/800/600/Qutub,Minar?lock=64",
        "desc": "Arrive in Delhi. Explore the historical landmarks including India Gate, Qutub Minar, and the bustling streets of Chandni Chowk.",
        "activities": [
          "India Gate",
          "Qutub Minar",
          "Rickshaw Ride"
        ]
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Delhi to Agra",
        "location": "Agra",
        "image": "https://loremflickr.com/800/600/Agra,Fort,India?lock=65",
        "bannerImage": "https://loremflickr.com/800/600/Taj,Mahal,Sunset?lock=66",
        "desc": "Drive to Agra. Visit the massive red sandstone Agra Fort, a UNESCO World Heritage site, and watch the sunset over the Yamuna river.",
        "activities": [
          "Agra Fort",
          "Mehtab Bagh"
        ]
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Taj Mahal & Fatehpur Sikri",
        "location": "Agra / Jaipur",
        "image": "https://loremflickr.com/800/600/Taj,Mahal,Morning?lock=67",
        "bannerImage": "https://loremflickr.com/800/600/Fatehpur,Sikri?lock=68",
        "desc": "Early morning visit to the Taj Mahal at sunrise. Later, drive to Jaipur via the abandoned Mughal city of Fatehpur Sikri.",
        "activities": [
          "Taj Mahal Sunrise",
          "Fatehpur Sikri",
          "Drive to Jaipur"
        ]
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "The Pink City",
        "location": "Jaipur",
        "image": "https://loremflickr.com/800/600/Amber,Fort,Jaipur?lock=69",
        "bannerImage": "https://loremflickr.com/800/600/Hawa,Mahal?lock=70",
        "desc": "Explore Jaipur. Visit the magnificent Amber Fort, take photos at the Hawa Mahal, and explore the City Palace.",
        "activities": [
          "Amber Fort",
          "Hawa Mahal",
          "City Palace"
        ]
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Return to Delhi",
        "location": "Delhi",
        "image": "https://loremflickr.com/800/600/Delhi,Airport?lock=71",
        "bannerImage": "https://loremflickr.com/800/600/Highway,India?lock=72",
        "desc": "Drive back to Delhi for your onward flight, concluding your Golden Triangle tour.",
        "activities": [
          "Drive to Delhi",
          "Departure"
        ]
      }
    ]
  },
  {
    "id": "p6",
    "title": "Magical Kerala Backwaters",
    "duration": "7 Days / 6 Nights",
    "states": "Kerala",
    "price": 22000,
    "image": "https://loremflickr.com/800/600/Kerala,Houseboat?lock=81",
    "bannerImage": "https://loremflickr.com/800/600/Alleppey,Backwaters?lock=82",
    "description": "A relaxing journey through God's Own Country. Drift along emerald backwaters in a traditional houseboat and watch vibrant cultural performances.",
    "highlights": [
      "Alleppey Houseboat",
      "Kumarakom Bird Sanctuary",
      "Fort Kochi Heritage",
      "Kathakali Performance"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Welcome to Kochi",
        "location": "Kochi",
        "image": "https://loremflickr.com/800/600/Chinese,Fishing,Nets,Kochi?lock=83",
        "bannerImage": "https://loremflickr.com/800/600/Fort,Kochi,Street?lock=84",
        "desc": "Arrive in Kochi. Check in and explore the historic Fort Kochi area, famous for its Chinese Fishing Nets.",
        "activities": [
          "Fort Kochi Walk",
          "Chinese Fishing Nets"
        ]
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Culture and History",
        "location": "Kochi",
        "image": "https://loremflickr.com/800/600/Kathakali,Dancer?lock=85",
        "bannerImage": "https://loremflickr.com/800/600/Mattancherry,Palace?lock=86",
        "desc": "Visit the Jewish Synagogue and Mattancherry Palace. In the evening, watch a traditional Kathakali dance performance.",
        "activities": [
          "Jewish Synagogue",
          "Mattancherry Palace",
          "Kathakali Show"
        ]
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Drive to Kumarakom",
        "location": "Kumarakom",
        "image": "https://loremflickr.com/800/600/Kumarakom,Lake?lock=87",
        "bannerImage": "https://loremflickr.com/800/600/Vembanad,Lake?lock=88",
        "desc": "Drive to the serene village of Kumarakom on the banks of Vembanad Lake. Relax by the lakeside.",
        "activities": [
          "Lake View",
          "Ayurvedic Spa"
        ]
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Bird Sanctuary & Nature",
        "location": "Kumarakom",
        "image": "https://loremflickr.com/800/600/Kumarakom,Bird,Sanctuary?lock=89",
        "bannerImage": "https://loremflickr.com/800/600/Tropical,Birds?lock=90",
        "desc": "Early morning visit to the Kumarakom Bird Sanctuary. Spot migratory birds and enjoy the lush green surroundings.",
        "activities": [
          "Bird Watching",
          "Nature Walk"
        ]
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "The Houseboat Experience",
        "location": "Alleppey",
        "image": "https://loremflickr.com/800/600/Houseboat,Kerala,Interior?lock=91",
        "bannerImage": "https://loremflickr.com/800/600/Backwaters,Sunset?lock=92",
        "desc": "Board a traditional Kettuvallam (houseboat) in Alleppey. Cruise through the narrow canals and enjoy freshly prepared Kerala cuisine on board.",
        "activities": [
          "Houseboat Check-in",
          "Canal Cruise",
          "On-board Dining"
        ]
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Village Life along the Backwaters",
        "location": "Alleppey",
        "image": "https://loremflickr.com/800/600/Kerala,Village,Water?lock=93",
        "bannerImage": "https://loremflickr.com/800/600/Paddy,Fields,Kerala?lock=94",
        "desc": "Wake up on the houseboat. Continue cruising and observe the daily life of locals living along the backwaters and paddy fields.",
        "activities": [
          "Morning Cruise",
          "Village Walk"
        ]
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Departure",
        "location": "Kochi",
        "image": "https://loremflickr.com/800/600/Cochin,Airport?lock=95",
        "bannerImage": "https://loremflickr.com/800/600/Kerala,Road?lock=96",
        "desc": "Disembark from the houseboat and drive back to Kochi for your departure.",
        "activities": [
          "Disembarkation",
          "Airport Transfer"
        ]
      }
    ]
  },
  {
    "id": "p7",
    "title": "Munnar Tea Estates Explorer",
    "duration": "7 Days / 6 Nights",
    "states": "Kerala",
    "price": 19500,
    "image": "/images/tours/munnar-hill-station.png",
    "bannerImage": "/images/tours/munnar-hill-station.png",
    "description": "Dive deep into the rolling hills of Munnar, carpeted with lush green tea estates, majestic waterfalls, and rare wildlife.",
    "highlights": [
      "Eravikulam National Park",
      "Mattupetty Dam",
      "Tea Museum",
      "Echo Point"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Arrival in Kochi & Drive",
        "location": "Munnar",
        "image": "https://loremflickr.com/800/600/Waterfall,Kerala,Road?lock=103",
        "bannerImage": "https://loremflickr.com/800/600/Cheeyappara,Waterfalls?lock=104",
        "desc": "Arrive in Kochi and embark on a scenic drive to Munnar. En route, stop by the Cheeyappara and Valara waterfalls.",
        "activities": [
          "Scenic Drive",
          "Waterfall Visit"
        ]
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "The Tea Experience",
        "location": "Munnar",
        "image": "https://loremflickr.com/800/600/Tea,Leaves,Plucking?lock=105",
        "bannerImage": "https://loremflickr.com/800/600/Tata,Tea,Museum?lock=106",
        "desc": "Visit the Tata Tea Museum to learn the history of tea making. Walk through the lush green estates and enjoy a fresh cup of local tea.",
        "activities": [
          "Tea Museum",
          "Estate Walk",
          "Tea Tasting"
        ]
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "High Altitude Wildlife",
        "location": "Munnar",
        "image": "https://loremflickr.com/800/600/Nilgiri,Tahr?lock=107",
        "bannerImage": "https://loremflickr.com/800/600/Eravikulam,National,Park?lock=108",
        "desc": "Visit Eravikulam National Park, home to the endangered Nilgiri Tahr. Enjoy the breathtaking views from the hills.",
        "activities": [
          "Eravikulam Park",
          "Wildlife Spotting"
        ]
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Dams and Echoes",
        "location": "Munnar",
        "image": "https://loremflickr.com/800/600/Mattupetty,Dam?lock=109",
        "bannerImage": "https://loremflickr.com/800/600/Echo,Point,Munnar?lock=110",
        "desc": "Explore Mattupetty Dam, take a speedboat ride, and shout out your name at Echo Point to hear it reverberate across the lake.",
        "activities": [
          "Mattupetty Dam",
          "Speedboating",
          "Echo Point"
        ]
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Top Station Views",
        "location": "Munnar",
        "image": "https://loremflickr.com/800/600/Top,Station,Munnar?lock=111",
        "bannerImage": "https://loremflickr.com/800/600/Misty,Valley,View?lock=112",
        "desc": "Drive to Top Station, the highest point in Munnar, offering panoramic views of the neighboring state of Tamil Nadu.",
        "activities": [
          "Top Station Viewpoint",
          "Photography"
        ]
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Leisure in Nature",
        "location": "Munnar",
        "image": "https://loremflickr.com/800/600/Munnar,Resort?lock=113",
        "bannerImage": "https://loremflickr.com/800/600/Nature,Walk,Kerala?lock=114",
        "desc": "A day at leisure to relax at your resort, opt for an Ayurvedic massage, or take a peaceful nature walk.",
        "activities": [
          "Leisure",
          "Ayurvedic Massage",
          "Nature Walk"
        ]
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Departure",
        "location": "Kochi",
        "image": "https://loremflickr.com/800/600/Winding,Road,Kerala?lock=115",
        "bannerImage": "https://loremflickr.com/800/600/Kochi,Airport?lock=116",
        "desc": "Drive down the hills back to Kochi for your onward journey, carrying the sweet aroma of tea with you.",
        "activities": [
          "Drive to Kochi",
          "Departure"
        ]
      }
    ]
  },
  {
    "id": "p8",
    "title": "Spiritual Varanasi Journey",
    "duration": "7 Days / 6 Nights",
    "states": "Uttar Pradesh",
    "price": 18000,
    "image": "https://loremflickr.com/800/600/Varanasi,Ghats?lock=121",
    "bannerImage": "https://loremflickr.com/800/600/Ganges,River,Boat?lock=122",
    "description": "Embark on a profound spiritual journey to one of the world's oldest living cities. Experience the mesmerizing Ganga Aarti and ancient temples.",
    "highlights": [
      "Ganges Boat Ride",
      "Evening Ganga Aarti",
      "Kashi Vishwanath",
      "Sarnath Tour"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Arrival in the Holy City",
        "location": "Varanasi",
        "image": "https://loremflickr.com/800/600/Varanasi,Streets?lock=123",
        "bannerImage": "https://loremflickr.com/800/600/Ghats,India?lock=124",
        "desc": "Arrive in Varanasi. Check-in to your hotel and take an evening stroll through the ancient, narrow, and bustling alleys.",
        "activities": [
          "Hotel Check-in",
          "Alley Walk"
        ]
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Dawn on the Ganges",
        "location": "Varanasi",
        "image": "https://loremflickr.com/800/600/Sunrise,Boat,Varanasi?lock=125",
        "bannerImage": "https://loremflickr.com/800/600/Morning,Ghats?lock=126",
        "desc": "Experience a magical sunrise boat ride on the River Ganges, observing the morning rituals of pilgrims along the ghats.",
        "activities": [
          "Sunrise Boat Ride",
          "Ghat Observation"
        ]
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Temples and Faith",
        "location": "Varanasi",
        "image": "https://loremflickr.com/800/600/Kashi,Vishwanath,Temple?lock=127",
        "bannerImage": "https://loremflickr.com/800/600/Hindu,Temple,Gold?lock=128",
        "desc": "Visit the highly revered Kashi Vishwanath Temple, Sankat Mochan Temple, and the Bharat Mata Temple.",
        "activities": [
          "Kashi Vishwanath Darshan",
          "Temple Tour"
        ]
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "The Path of Buddha",
        "location": "Sarnath",
        "image": "https://loremflickr.com/800/600/Sarnath,Stupa?lock=129",
        "bannerImage": "https://loremflickr.com/800/600/Buddha,Statue,Sarnath?lock=130",
        "desc": "Take a short excursion to Sarnath, where Lord Buddha gave his first sermon. Visit the Dhamek Stupa and Sarnath Museum.",
        "activities": [
          "Sarnath Excursion",
          "Dhamek Stupa",
          "Museum Visit"
        ]
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Weavers of Banaras",
        "location": "Varanasi",
        "image": "https://loremflickr.com/800/600/Banarasi,Silk,Saree?lock=131",
        "bannerImage": "https://loremflickr.com/800/600/Weaver,Loom,India?lock=132",
        "desc": "Discover the rich textile heritage of Varanasi. Visit a weaver's village to see how the famous Banarasi silk sarees are made.",
        "activities": [
          "Weaver Village Tour",
          "Silk Shopping"
        ]
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "The Grand Aarti",
        "location": "Varanasi",
        "image": "https://loremflickr.com/800/600/Ganga,Aarti,Ceremony?lock=133",
        "bannerImage": "https://loremflickr.com/800/600/Fire,Ritual,Varanasi?lock=134",
        "desc": "A day at leisure. In the evening, witness the spectacular and deeply spiritual Ganga Aarti ceremony at Dashashwamedh Ghat.",
        "activities": [
          "Ganga Aarti Ceremony",
          "Spiritual Immersion"
        ]
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Departure",
        "location": "Varanasi",
        "image": "https://loremflickr.com/800/600/Varanasi,Railway,Station?lock=135",
        "bannerImage": "https://loremflickr.com/800/600/Varanasi,Airport?lock=136",
        "desc": "Conclude your spiritual journey and transfer to the airport or railway station for your onward travel.",
        "activities": [
          "Departure"
        ]
      }
    ]
  },
  {
    "id": "p9",
    "title": "Himalayan Adventure - Manali & Shimla",
    "duration": "10 Days / 9 Nights",
    "states": "Himachal Pradesh",
    "price": 35000,
    "image": "https://loremflickr.com/800/600/Manali,Snow,Mountains?lock=141",
    "bannerImage": "https://loremflickr.com/800/600/Shimla,Hills?lock=142",
    "description": "A thrilling escape to the towering peaks of the Himalayas. Experience snow, adventure sports, and colonial charm in Shimla and Manali.",
    "highlights": [
      "Rohtang Pass",
      "Solang Valley",
      "Shimla Mall Road",
      "Kufri"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Arrival in Shimla",
        "location": "Shimla",
        "image": "https://loremflickr.com/800/600/Shimla,Town?lock=143",
        "bannerImage": "https://loremflickr.com/800/600/Himalayan,Road?lock=144",
        "desc": "Arrive in Shimla, the erstwhile summer capital of British India. Check into your hotel and relax.",
        "activities": [
          "Hotel Check-in",
          "Leisure"
        ]
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Shimla & Kufri",
        "location": "Shimla / Kufri",
        "image": "https://loremflickr.com/800/600/Kufri,Snow?lock=145",
        "bannerImage": "https://loremflickr.com/800/600/Shimla,Ridge?lock=146",
        "desc": "Visit the high-altitude town of Kufri. Enjoy horse riding and snow activities (seasonal). Evening walk on Shimla's famous Mall Road and Ridge.",
        "activities": [
          "Kufri Excursion",
          "Mall Road",
          "The Ridge"
        ]
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Journey to Manali",
        "location": "Manali",
        "image": "https://loremflickr.com/800/600/Kullu,Valley?lock=147",
        "bannerImage": "https://loremflickr.com/800/600/Beas,River?lock=148",
        "desc": "Embark on a scenic full-day drive to Manali, passing through the beautiful Kullu Valley and alongside the Beas River.",
        "activities": [
          "Scenic Drive",
          "Kullu Valley"
        ]
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "Manali Local Sightseeing",
        "location": "Manali",
        "image": "https://loremflickr.com/800/600/Hadimba,Temple?lock=149",
        "bannerImage": "https://loremflickr.com/800/600/Old,Manali?lock=150",
        "desc": "Explore Manali. Visit the ancient Hadimba Temple surrounded by cedar forests, Vashisht Hot Springs, and the Tibetan Monastery.",
        "activities": [
          "Hadimba Temple",
          "Vashisht Springs",
          "Monastery Visit"
        ]
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Snow Point Adventure",
        "location": "Rohtang / Solang",
        "image": "https://loremflickr.com/800/600/Rohtang,Pass,Snow?lock=151",
        "bannerImage": "https://loremflickr.com/800/600/Solang,Valley,Paragliding?lock=152",
        "desc": "Head to Solang Valley or Rohtang Pass (subject to weather/permits). Enjoy thrilling activities like paragliding, zorbing, or skiing.",
        "activities": [
          "Snow Activities",
          "Paragliding",
          "Zorbing"
        ]
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Naggar Castle",
        "location": "Naggar",
        "image": "https://loremflickr.com/800/600/Naggar,Castle?lock=153",
        "bannerImage": "https://loremflickr.com/800/600/Himalayan,Architecture?lock=154",
        "desc": "Visit Naggar Castle, a historic wooden structure offering stunning views of the valley, and the Nicholas Roerich Art Gallery.",
        "activities": [
          "Naggar Castle",
          "Art Gallery"
        ]
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Manali to Chandigarh",
        "location": "Chandigarh",
        "image": "https://loremflickr.com/800/600/Chandigarh,Rock,Garden?lock=155",
        "bannerImage": "https://loremflickr.com/800/600/Sukhna,Lake?lock=156",
        "desc": "Drive from the mountains down to the planned city of Chandigarh. Check into the hotel and rest.",
        "activities": [
          "Drive to Chandigarh"
        ]
      },
      {
        "day": 8,
        "dateString": "Day 8",
        "title": "Chandigarh Sightseeing",
        "location": "Chandigarh",
        "image": "https://loremflickr.com/800/600/Rock,Garden,Sculpture?lock=157",
        "bannerImage": "https://loremflickr.com/800/600/Rose,Garden,Chandigarh?lock=158",
        "desc": "Visit the unique Rock Garden created from industrial waste, the expansive Rose Garden, and relax by Sukhna Lake.",
        "activities": [
          "Rock Garden",
          "Sukhna Lake",
          "Rose Garden"
        ]
      },
      {
        "day": 9,
        "dateString": "Day 9",
        "title": "Shopping and Leisure",
        "location": "Chandigarh",
        "image": "https://loremflickr.com/800/600/Chandigarh,Sector,17?lock=159",
        "bannerImage": "https://loremflickr.com/800/600/City,Evening,India?lock=160",
        "desc": "A relaxed day for local shopping in Sector 17 and enjoying the modern culinary scene of the city.",
        "activities": [
          "Shopping",
          "Leisure"
        ]
      },
      {
        "day": 10,
        "dateString": "Day 10",
        "title": "Departure",
        "location": "Chandigarh / Delhi",
        "image": "https://loremflickr.com/800/600/Flight,Departure?lock=161",
        "bannerImage": "https://loremflickr.com/800/600/Highway,Journey?lock=162",
        "desc": "Transfer to the airport or railway station for your journey back home, carrying memories of the high Himalayas.",
        "activities": [
          "Departure"
        ]
      }
    ]
  },
  {
    "id": "p10",
    "title": "Royal Rajasthan Odyssey",
    "duration": "10 Days / 9 Nights",
    "states": "Rajasthan",
    "price": 42000,
    "image": "https://loremflickr.com/800/600/Rajasthan,Fort?lock=171",
    "bannerImage": "https://loremflickr.com/800/600/Desert,Camel,Sunset?lock=172",
    "description": "Live like royalty. Traverse the land of Maharajas, exploring colossal forts, opulent palaces, and the golden dunes of the Thar desert.",
    "highlights": [
      "Amber Fort",
      "Mehrangarh Fort",
      "Jaisalmer Desert Safari",
      "Udaipur Lake Palace"
    ],
    "itinerary": [
      {
        "day": 1,
        "dateString": "Day 1",
        "title": "Welcome to the Pink City",
        "location": "Jaipur",
        "image": "https://loremflickr.com/800/600/Jaipur,City?lock=173",
        "bannerImage": "https://loremflickr.com/800/600/Hawa,Mahal,Jaipur?lock=174",
        "desc": "Arrive in Jaipur. Check into your heritage hotel. Evening visit to Chokhi Dhani for traditional Rajasthani food and culture.",
        "activities": [
          "Hotel Check-in",
          "Chokhi Dhani Village"
        ]
      },
      {
        "day": 2,
        "dateString": "Day 2",
        "title": "Forts and Palaces",
        "location": "Jaipur",
        "image": "https://loremflickr.com/800/600/Amber,Fort,Elephant?lock=175",
        "bannerImage": "https://loremflickr.com/800/600/Jal,Mahal,Jaipur?lock=176",
        "desc": "Visit the majestic Amber Fort. Later, explore the City Palace, Jantar Mantar observatory, and photograph the iconic Hawa Mahal.",
        "activities": [
          "Amber Fort",
          "City Palace",
          "Jantar Mantar"
        ]
      },
      {
        "day": 3,
        "dateString": "Day 3",
        "title": "Journey to the Blue City",
        "location": "Jodhpur",
        "image": "https://loremflickr.com/800/600/Jodhpur,Blue,Houses?lock=177",
        "bannerImage": "https://loremflickr.com/800/600/Mehrangarh,Fort,Jodhpur?lock=178",
        "desc": "Drive to Jodhpur. Check-in and explore the local spice markets and the vibrant clock tower area.",
        "activities": [
          "Drive to Jodhpur",
          "Clock Tower Market"
        ]
      },
      {
        "day": 4,
        "dateString": "Day 4",
        "title": "The Imposing Mehrangarh",
        "location": "Jodhpur",
        "image": "https://loremflickr.com/800/600/Mehrangarh,Fort,View?lock=179",
        "bannerImage": "https://loremflickr.com/800/600/Umaid,Bhawan,Palace?lock=180",
        "desc": "Explore the massive Mehrangarh Fort rising above the blue city, followed by a visit to the royal cenotaph Jaswant Thada.",
        "activities": [
          "Mehrangarh Fort",
          "Jaswant Thada",
          "Umaid Bhawan Palace"
        ]
      },
      {
        "day": 5,
        "dateString": "Day 5",
        "title": "Into the Golden Desert",
        "location": "Jaisalmer",
        "image": "https://loremflickr.com/800/600/Thar,Desert,Road?lock=181",
        "bannerImage": "https://loremflickr.com/800/600/Jaisalmer,Fort?lock=182",
        "desc": "Drive to Jaisalmer, the Golden City. Visit the living Jaisalmer Fort, where families have resided for centuries.",
        "activities": [
          "Drive to Jaisalmer",
          "Jaisalmer Fort"
        ]
      },
      {
        "day": 6,
        "dateString": "Day 6",
        "title": "Havelis and Sand Dunes",
        "location": "Jaisalmer",
        "image": "https://loremflickr.com/800/600/Patwon,Ki,Haveli?lock=183",
        "bannerImage": "https://loremflickr.com/800/600/Camel,Safari,Desert?lock=184",
        "desc": "Explore Patwon Ki Haveli. In the evening, head to the Sam Sand Dunes for a camel safari and a night at a desert camp.",
        "activities": [
          "Haveli Tour",
          "Camel Safari",
          "Desert Camp Stay"
        ]
      },
      {
        "day": 7,
        "dateString": "Day 7",
        "title": "Drive to Udaipur",
        "location": "Udaipur",
        "image": "https://loremflickr.com/800/600/Aravalli,Hills?lock=185",
        "bannerImage": "https://loremflickr.com/800/600/Ranakpur,Jain,Temple?lock=186",
        "desc": "Long drive south to Udaipur, the City of Lakes. En route, visit the breathtakingly carved Ranakpur Jain Temple.",
        "activities": [
          "Drive to Udaipur",
          "Ranakpur Temple"
        ]
      },
      {
        "day": 8,
        "dateString": "Day 8",
        "title": "The Venice of the East",
        "location": "Udaipur",
        "image": "https://loremflickr.com/800/600/Lake,Pichola,Udaipur?lock=187",
        "bannerImage": "https://loremflickr.com/800/600/City,Palace,Udaipur?lock=188",
        "desc": "Explore the massive City Palace complex overlooking Lake Pichola. Visit the Jagdish Temple and Saheliyon Ki Bari.",
        "activities": [
          "City Palace",
          "Jagdish Temple",
          "Saheliyon Ki Bari"
        ]
      },
      {
        "day": 9,
        "dateString": "Day 9",
        "title": "Lakeside Leisure",
        "location": "Udaipur",
        "image": "https://loremflickr.com/800/600/Udaipur,Boat,Ride?lock=189",
        "bannerImage": "https://loremflickr.com/800/600/Lake,Palace,Sunset?lock=190",
        "desc": "Enjoy a peaceful day. Take a sunset boat ride on Lake Pichola, offering stunning views of the Lake Palace and Jag Mandir.",
        "activities": [
          "Sunset Boat Ride",
          "Leisure",
          "Shopping"
        ]
      },
      {
        "day": 10,
        "dateString": "Day 10",
        "title": "Farewell to Rajasthan",
        "location": "Udaipur",
        "image": "https://loremflickr.com/800/600/Udaipur,Airport?lock=191",
        "bannerImage": "https://loremflickr.com/800/600/Rajasthan,Memories?lock=192",
        "desc": "Bid farewell to the royal land of Rajasthan as you transfer to the airport for your onward journey.",
        "activities": [
          "Departure"
        ]
      }
    ]
  }
];

module.exports = { drivers, cars, packages };