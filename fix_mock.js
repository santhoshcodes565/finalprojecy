const fs = require('fs');

const imgMap = {
  'kochi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Kochi_cityscapes-1.jpg/960px-Kochi_cityscapes-1.jpg',
  'munnar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/960px-Munnar_Overview.jpg',
  'thekkady': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Thekkady.jpg/960px-Thekkady.jpg',
  'alleppey': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Alappuzha_Boat_Beauty_W.jpg/960px-Alappuzha_Boat_Beauty_W.jpg',
  'kumarakom': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Alappuzha_Boat_Beauty_W.jpg/960px-Alappuzha_Boat_Beauty_W.jpg',
  'mararikulam': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Marari_Beach%2C_Kerala.jpg/960px-Marari_Beach%2C_Kerala.jpg',
  'chennai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Marina_Beach%2C_Chennai.jpg/960px-Marina_Beach%2C_Chennai.jpg',
  'mahabalipuram': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Shore_Temple_-Mamallapuram_-Tamil_Nadu_-N-TN-C55.jpg/960px-Shore_Temple_-Mamallapuram_-Tamil_Nadu_-N-TN-C55.jpg',
  'pondicherry': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/White_Town_Pondicherry.jpg/960px-White_Town_Pondicherry.jpg',
  'thanjavur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Brihadisvara_Temple%2C_Thanjavur.jpg/960px-Brihadisvara_Temple%2C_Thanjavur.jpg',
  'madurai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg',
  'rameshwaram': 'https://upload.wikimedia.org/wikipedia/commons/5/54/Rameswaram_montage_image.jpg',
  'kanyakumari': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Vivekananda_Rock_Memorial%2C_Kanyakumari.jpg/960px-Vivekananda_Rock_Memorial%2C_Kanyakumari.jpg',
  'kovalam': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Kovalam_beach_trivandrum_kerala.jpg/960px-Kovalam_beach_trivandrum_kerala.jpg',
  'trivandrum': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Ananthapadmanabhaswamy_temple_pond_view.jpg/960px-Ananthapadmanabhaswamy_temple_pond_view.jpg',
  'varkala': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Varkala_beach_from_above.jpg/960px-Varkala_beach_from_above.jpg',
  'trichy': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Rock_fort%2C_Tiruchirappalli.jpg/960px-Rock_fort%2C_Tiruchirappalli.jpg',
  'ooty': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Ooty_lake.jpg/960px-Ooty_lake.jpg',
  'kodaikanal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Boating_in_Kodaikanal_Lake_with_Mist.jpg/960px-Boating_in_Kodaikanal_Lake_with_Mist.jpg',
  'wayanad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Blue%2C_Green_%26_White.jpg/960px-Blue%2C_Green_%26_White.jpg',
  'calicut': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Kozhikode_Beach_sunset.jpg/960px-Kozhikode_Beach_sunset.jpg',
  'yercaud': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Yercaud_Lake.jpg/960px-Yercaud_Lake.jpg',
  'kolli hills': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Agaya_Gangai_Falls.jpg/960px-Agaya_Gangai_Falls.jpg',
  'salem': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Mettur_Dam_View.jpg/960px-Mettur_Dam_View.jpg',
  'mysore': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mysore_Palace_Morning.jpg/960px-Mysore_Palace_Morning.jpg',
  'coorg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Abbey_Falls_Kodagu.jpg/960px-Abbey_Falls_Kodagu.jpg',
  'bangalore': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Vidhana_Soudha%2C_Bangalore.jpg/960px-Vidhana_Soudha%2C_Bangalore.jpg',
  'default': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/960px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg'
};

const pkgMap = {
  'p1': 'kochi',
  'p2': 'madurai',
  'p3': 'munnar',
  'p4': 'alleppey',
  'p5': 'madurai',
  'p6': 'ooty',
  'p7': 'rameshwaram',
  'p8': 'wayanad',
  'p9': 'pondicherry',
  'p10': 'yercaud',
  'p11': 'mysore',
  'p12': 'varkala'
};

const file = 'c:/Users/santh/OneDrive - ELCOT/nithyaprojectfinal/src/data/mockData.js';
let content = fs.readFileSync(file, 'utf8');

for (const id in pkgMap) {
  const loc = pkgMap[id];
  const url = imgMap[loc];
  const regex = new RegExp(`id:\\s*'${id}',([\\s\\S]*?image:\\s*')([^']+)(')`, 'g');
  content = content.replace(regex, (match, p1, p2, p3) => {
    return `id: '${id}',${p1}${url}${p3}`;
  });
}

const driverUrl = 'https://upload.wikimedia.org/wikipedia/commons/2/25/Japanese_chauffeur.jpg';
let lines = content.split('\n');
let inDrivers = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('export const drivers = [')) inDrivers = true;
  if (lines[i].includes('export const cars = [')) inDrivers = false;

  if (inDrivers && lines[i].includes('image:')) {
    lines[i] = lines[i].replace(/image:\s*'[^']+'/, `image: '${driverUrl}'`);
  }

  if (lines[i].includes('location:')) {
    const locMatch = lines[i].match(/location:\s*'([^']+)'/);
    if (locMatch) {
      let location = locMatch[1].toLowerCase().trim().replace(' airport', '');
      let mappedUrl = imgMap['default'];
      for (const k in imgMap) {
        if (location.includes(k) || k.includes(location)) {
          mappedUrl = imgMap[k];
          break;
        }
      }
      lines[i] = lines[i].replace(/image:\s*'[^']+'/, `image: '${mappedUrl}'`);
    }
  }
}

fs.writeFileSync(file, lines.join('\n'), 'utf8');
console.log('Fixed mockData with correct context locations!');
