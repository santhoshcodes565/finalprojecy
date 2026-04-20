const p21_p25 = [
  {
    id: 'p21',
    title: '7 Days Sikkim & Darjeeling Bliss',
    duration: '7 Days / 6 Nights',
    states: 'Sikkim & West Bengal',
    price: 36000,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Kanchenjunga_from_Tiger_Hill.jpg/960px-Kanchenjunga_from_Tiger_Hill.jpg',
    description: 'An exploration of the Eastern Himalayas. Delve into the syncretic architecture of Vajrayana Buddhist monasteries and study the colonial railway engineering that successfully mastered the steep 1-in-20 gradients of the Darjeeling hills.',
    highlights: ['Tiger Hill Sunrise', 'Darjeeling Himalayan Railway', 'Rumtek Monastery', 'Tsomgo Lake'],
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Ascent from the Plains', location: 'Darjeeling', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Darjeeling_Town_View.jpg/960px-Darjeeling_Town_View.jpg', desc: 'Arrive at Bagdogra. Ascend the steep, precarious Hill Cart Road up the Lesser Himalayas to the colonial town of Darjeeling, analyzing the terraced urban planning essential for slope stabilization.' },
      { day: 2, dateString: 'Day 2', title: 'Engineering and Altitude', location: 'Darjeeling', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Darjeeling_Himalayan_Railway_Steam_Train.jpg/960px-Darjeeling_Himalayan_Railway_Steam_Train.jpg', desc: 'Pre-dawn visit to Tiger Hill to view Kangchenjunga. Later, study the Darjeeling Himalayan Railway (Toy Train), specifically its ingenious zig-zag reverses and multi-loop systems designed in 1881 to overcome the massive altitude gain.' },
      { day: 3, dateString: 'Day 3', title: 'Across the River Teesta', location: 'Gangtok', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Teesta_River_Valley.jpg/960px-Teesta_River_Valley.jpg', desc: 'Descend to the turbulent Teesta river, serving as the biological and political boundary, and cross into Sikkim. Ascend heavily forested ridges to arrive at Gangtok.' },
      { day: 4, dateString: 'Day 4', title: 'Vajrayana Architecture', location: 'Gangtok', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Rumtek_Monastery_Sikkim.jpg/960px-Rumtek_Monastery_Sikkim.jpg', desc: 'Tour the sprawling Rumtek Monastery, the seat of the Karmapa in exile. Analyze its classic Tibetan design, featuring elaborate mandalas, heavily timbered roofs, and the massive central courtyard designed for Cham dances.' },
      { day: 5, dateString: 'Day 5', title: 'High Altitude Glacial Lakes', location: 'Gangtok', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tsomgo_Lake_Sikkim.jpg/960px-Tsomgo_Lake_Sikkim.jpg', desc: 'Attempt the steep climb to Tsomgo Lake at 12,400 feet. Investigate the delicate tundra-like ecology, permafrost conditions, and evidence of historical glacial carving in this deep valley.' },
      { day: 6, dateString: 'Day 6', title: 'Socio-Culture of the Hills', location: 'Kalimpong', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Pine_View_Nursery_Kalimpong.jpg/960px-Pine_View_Nursery_Kalimpong.jpg', desc: 'Drive to the mid-altitude ridge of Kalimpong, historically a major trading post on the Silk Route to Tibet. Examine traditional Lepcha woodcraft and visit sprawling cactus botanical nurseries.' },
      { day: 7, dateString: 'Day 7', title: 'Descent to the Duars', location: 'Bagdogra', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Bagdogra_Airport_Terminal.jpg/960px-Bagdogra_Airport_Terminal.jpg', desc: 'A long continuous descent navigating massive landslide zones, returning to the flat riverplains (Duars) of Bagdogra for departure.' }
    ]
  },
  {
    id: 'p22',
    title: '7 Days Meghalaya & Assam Wonders',
    duration: '7 Days / 6 Nights',
    states: 'Meghalaya & Assam',
    price: 37500,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Living_Root_Bridge_Mawlynnong.jpg/960px-Living_Root_Bridge_Mawlynnong.jpg',
    description: 'A study of extreme rainfall geography and indigenous bio-engineering. Traverse the wettest place on Earth, observing how the Khasi tribes organically grow suspension bridges, followed by surveying the massive alluvial floodplain of the Brahmaputra.',
    highlights: ['Living Root Bridges', 'Cherrapunji Waterfalls', 'Kaziranga National Park', 'Brahmaputra River'],
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'Arrival at the Floodplains', location: 'Guwahati', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Kamakhya_Temple_Guwahati.jpg/960px-Kamakhya_Temple_Guwahati.jpg', desc: 'Arrive in Guwahati. Observe the sheer volume of the Brahmaputra River. Visit the Kamakhya Temple, an ancient Shakti Peetha exhibiting the unique Nilachal type of hemispherical dome architecture.' },
      { day: 2, dateString: 'Day 2', title: 'Ascent to the Plateau', location: 'Shillong', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Umiam_Lake_Meghalaya.jpg/960px-Umiam_Lake_Meghalaya.jpg', desc: 'Drive up to the deeply dissected Shillong Plateau. Stop to study the Umiam Lake, an artificial reservoir created by damming the Umiam river, primarily for hydroelectric power generation.' },
      { day: 3, dateString: 'Day 3', title: 'The Wettest Place on Earth', location: 'Cherrapunji', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Nohkalikai_Falls_Cherrapunji.jpg/960px-Nohkalikai_Falls_Cherrapunji.jpg', desc: 'Travel to Cherrapunji. Analyze the topography that funnels monsoon clouds to drop record rainfall. View the 1,115-foot high Nohkalikai Falls, studying the severe laterization process of the soil due to heavy rain.' },
      { day: 4, dateString: 'Day 4', title: 'Bio-Engineering', location: 'Cherrapunji', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Living_Root_Bridge_Mawlynnong.jpg/960px-Living_Root_Bridge_Mawlynnong.jpg', desc: 'Trek deep into the valleys. Study the Living Root Bridges—an incredible example of indigenous bioengineering where the roots of Ficus elastica trees are manually guided across rivers over decades to form self-renewing, living infrastructure.' },
      { day: 5, dateString: 'Day 5', title: 'Descent into the Valley', location: 'Kaziranga', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Kaziranga_National_Park_Rhinoceros.jpg/960px-Kaziranga_National_Park_Rhinoceros.jpg', desc: 'Leave the Meghalaya plateau and drive down onto the massive floodplains of Assam, arriving at Kaziranga National Park. Observe the sprawling elephant grass and marshland ecology.' },
      { day: 6, dateString: 'Day 6', title: 'Alluvial Biodiversity', location: 'Kaziranga', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/One_Horned_Rhino_Kaziranga.jpg/960px-One_Horned_Rhino_Kaziranga.jpg', desc: 'Early morning safari. Study how the annual flooding of the Brahmaputra constantly deposits silt and maintains this unique highly-fertile ecosystem, supporting the world’s largest population of One-Horned Rhinoceros.' },
      { day: 7, dateString: 'Day 7', title: 'Departure Operations', location: 'Guwahati', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Lokpriya_Gopinath_Bordoloi_International_Airport.jpg/960px-Lokpriya_Gopinath_Bordoloi_International_Airport.jpg', desc: 'Final drive traversing the southern banks of the Brahmaputra river back to Guwahati Airport for departure.' }
    ]
  },
  {
    id: 'p23',
    title: '7 Days Gujarat Cultural Safari',
    duration: '7 Days / 6 Nights',
    states: 'Gujarat',
    price: 35000,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Rann_of_Kutch_White_Desert.jpg/960px-Rann_of_Kutch_White_Desert.jpg',
    description: 'An analysis of extreme geological phenomena and highly specialized stone architecture. Witness the vast seasonal salt marshes of Kutch, the subterranean stepwell engineering of the Solanki dynasty, and the dry deciduous habitat of Asiatic Lions.',
    highlights: ['Rann of Kutch', 'Gir National Park', 'Somnath Temple', 'Rani Ki Vav'],
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'The Sabarmati Basin', location: 'Ahmedabad', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sabarmati_Ashram.jpg/960px-Sabarmati_Ashram.jpg', desc: 'Arrive in Ahmedabad. Visit the Sabarmati Ashram, noting its sparse, functional architecture. Explore the UNESCO-listed old city, studying the intricately carved wooden brackets of the traditional "Pol" housing.' },
      { day: 2, dateString: 'Day 2', title: 'Subterranean Engineering', location: 'Ahmedabad', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Rani_ki_Vav_Patan.jpg/960px-Rani_ki_Vav_Patan.jpg', desc: 'Excursion to Patan. Study Rani Ki Vav, a massive 11th-century inverted temple built 90-feet underground to reach water tables in the arid climate, showcasing the zenith of Maru-Gurjara architectural style.' },
      { day: 3, dateString: 'Day 3', title: 'The Great Salt Desert', location: 'Bhuj', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Rann_of_Kutch_White_Desert.jpg/960px-Rann_of_Kutch_White_Desert.jpg', desc: 'Drive west into the Kutch district. Reach the Great Rann. Analyze this unique seasonal salt marsh, formed by tectonic shifts cutting it off from the sea, leaving behind vast, blinding white salt flats.' },
      { day: 4, dateString: 'Day 4', title: 'Circular Urban Planning', location: 'Bhuj', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bhunga_Huts_Kutch.jpg/960px-Bhunga_Huts_Kutch.jpg', desc: 'Study the traditional "Bhunga" huts of local tribal villages—circular mud structures structurally proven to withstand severe cyclonic winds and the intense seismic activity common to this fault line.' },
      { day: 5, dateString: 'Day 5', title: 'The Deciduous Forests', location: 'Gir', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Asiatic_Lion_Gir_National_Park.jpg/960px-Asiatic_Lion_Gir_National_Park.jpg', desc: 'A long drive south across the Kathiawar peninsula to Sasan Gir. This scrub-forest ecosystem represents the last remaining sanctuary in the world for the endangered Asiatic Lion.' },
      { day: 6, dateString: 'Day 6', title: 'Coastal Temple Architecture', location: 'Somnath', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Somnath_Temple_Gujarat.jpg/960px-Somnath_Temple_Gujarat.jpg', desc: 'Travel to the extreme coastline. Visit the massive Somnath Temple, reconstructed in the Chalukya style directly on the shore of the Arabian Sea, engineered to endure massive coastal tides.' },
      { day: 7, dateString: 'Day 7', title: 'Return to the Center', location: 'Ahmedabad', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ahmedabad_Airport.jpg/960px-Ahmedabad_Airport.jpg', desc: 'Return journey driving across the arid agricultural plains back to Ahmedabad for departure.' }
    ]
  },
  {
    id: 'p24',
    title: '7 Days Madhya Pradesh Heart of India',
    duration: '7 Days / 6 Nights',
    states: 'Madhya Pradesh',
    price: 33000,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Kandariya_Mahadeva_Temple_Khajuraho.jpg/960px-Kandariya_Mahadeva_Temple_Khajuraho.jpg',
    description: 'An architectural timeline located at the geographical center of the subcontinent. Examine the colossal monolithic foundations of Gwalior Fort, the structural transition in early Islamic mausoleums, and the peak of Nagara-style temple design at Khajuraho.',
    highlights: ['Khajuraho Temples', 'Gwalior Fort', 'Orchha Cenotaphs', 'Panna National Park'],
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'The Gibraltar of India', location: 'Gwalior', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Gwalior_Fort_View.jpg/960px-Gwalior_Fort_View.jpg', desc: 'Arrive in Gwalior. Explore the massive Gwalior Fort built atop a 3-km long monolithic sandstone outcrop. Analyze the 15th-century Man Mandir Palace and its external tile mosaics.' },
      { day: 2, dateString: 'Day 2', title: 'The Bundela Architecture', location: 'Orchha', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Orchha_Chhatris_Betwa_River.jpg/960px-Orchha_Chhatris_Betwa_River.jpg', desc: 'Transfer to Orchha. Examine the Chhatris (cenotaphs) built along the Betwa River. These soaring, spire-like royal tombs perfectly demonstrate the fusion of Rajput and Mughal architectural aesthetics.' },
      { day: 3, dateString: 'Day 3', title: 'Palaces without Foundations', location: 'Orchha', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Jahangir_Mahal_Orchha.jpg/960px-Jahangir_Mahal_Orchha.jpg', desc: 'Visit the Jahangir Mahal, a massive three-storied square palace constructed with a central courtyard and over 100 hanging balconies, utilizing complex load-bearing vault techniques.' },
      { day: 4, dateString: 'Day 4', title: 'The Peak of Nagara Architecture', location: 'Khajuraho', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Kandariya_Mahadeva_Temple_Khajuraho.jpg/960px-Kandariya_Mahadeva_Temple_Khajuraho.jpg', desc: 'Drive across the Vindhya range to Khajuraho. Begin studying the Western Group of Temples, specifically the Kandariya Mahadeva Temple, representing the zenith of North Indian (Nagara) temple architecture with its ascending mountain-like profile (Shikhara).' },
      { day: 5, dateString: 'Day 5', title: 'Interlocking Stone Masonry', location: 'Khajuraho', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Khajuraho_Temple_Carvings.jpg/960px-Khajuraho_Temple_Carvings.jpg', desc: 'Deep dive into Chandela dynasty construction methods. The temples here were built entirely without mortar, using precisely carved interlocking sandstone blocks—an incredible feat of masonry.' },
      { day: 6, dateString: 'Day 6', title: 'The Ken River Ecosystem', location: 'Panna', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Tiger_in_Kanha_National_Park.jpg/960px-Tiger_in_Kanha_National_Park.jpg', desc: 'Explore Panna National Park. This prominent tiger reserve is crucial in studying tropical dry deciduous forest ecology and the hydrology of the Ken River basin which sustains it.' },
      { day: 7, dateString: 'Day 7', title: 'Departure', location: 'Khajuraho', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Khajuraho_Airport.jpg/960px-Khajuraho_Airport.jpg', desc: 'Morning visit to the Eastern and Southern group of temples. Transfer to Khajuraho Airport.' }
    ]
  },
  {
    id: 'p25',
    title: '7 Days Goa Historical Coastal Tour',
    duration: '7 Days / 6 Nights',
    states: 'Goa',
    price: 34000,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Basilica_of_Bom_Jesus_Goa.jpg/960px-Basilica_of_Bom_Jesus_Goa.jpg',
    description: 'Bypass the commercial beaches to study an intense collision of European baroque architecture within a tropical Indian environment. Analyze centuries of Portuguese urban planning, the engineering of massive laterite forts, and the robust spice farming ecology of the Western Ghats.',
    highlights: ['Old Goa Churches', 'Aguada Fortification', 'Spice Plantations', 'Fontainhas Heritage Walk'],
    itinerary: [
      { day: 1, dateString: 'Day 1', title: 'The Latin Quarter', location: 'Panjim', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Fontainhas_Latin_Quarter_Goa.jpg/960px-Fontainhas_Latin_Quarter_Goa.jpg', desc: 'Arrive at Dabolim Airport. Transfer to Panjim. Walk through Fontainhas, Asia\'s only authentic Latin Quarter, studying the narrow, winding streets and distinct Portuguese vernacular architecture with sloped roofs tailored for torrential monsoons.' },
      { day: 2, dateString: 'Day 2', title: 'Baroque in the Tropics', location: 'Old Goa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Basilica_of_Bom_Jesus_Goa.jpg/960px-Basilica_of_Bom_Jesus_Goa.jpg', desc: 'Investigate Velha Goa (Old Goa). Analyze the Basilica of Bom Jesus, India\'s best example of baroque architecture, and the enormous Se Cathedral, built physically to overpower native religious structures.' },
      { day: 3, dateString: 'Day 3', title: 'Naval Defense Mechanisms', location: 'North Goa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Aguada_Fort_Goa.jpg/960px-Aguada_Fort_Goa.jpg', desc: 'Study Fort Aguada, a massive 17th-century Portuguese fortification utilizing locally sourced laterite rock. Analyze its strategic placement at the Mandovi River estuary and its massive internal freshwater reservoir capacity.' },
      { day: 4, dateString: 'Day 4', title: 'Ecology of the Sahyadris', location: 'Ponda', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Spice_Plantation_Goa.jpg/960px-Spice_Plantation_Goa.jpg', desc: 'Travel inland away from the coast to the Ponda region. Immerse in a tropical spice plantation, understanding the organic intercropping techniques developed over centuries to cultivate pepper, vanilla, and nutmeg.' },
      { day: 5, dateString: 'Day 5', title: 'Syncretic Temples', location: 'Ponda', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Shri_Mangeshi_Temple_Goa.jpg/960px-Shri_Mangeshi_Temple_Goa.jpg', desc: 'Examine Goan temple architecture, such as the Shri Mangeshi Temple. Observe the unique synthesis: incorporating Christian-style domes, octagonal towers, and pilasters onto fundamentally Hindu structural forms.' },
      { day: 6, dateString: 'Day 6', title: 'South Goa Serenity', location: 'South Goa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Palolem_Beach_Goa.jpg/960px-Palolem_Beach_Goa.jpg', desc: 'Move to the deeper south coast. Study the relatively uninterrupted coastal geomorphology of sandy bays like Palolem, contrasting sharply with the heavily eroded rocky cliffs of the north.' },
      { day: 7, dateString: 'Day 7', title: 'Departure', location: 'Dabolim', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Goa_Airport_Terminal.jpg/960px-Goa_Airport_Terminal.jpg', desc: 'Morning visit to a local cashew feni distillery to understand traditional bio-fermentation. Depart via Goa Dabolim Airport.' }
    ]
  }
];

export default p21_p25;
