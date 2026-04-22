const { packages } = require('./src/data/mockData');

packages.forEach(pkg => {
  if (!pkg.image) {
    console.log(`Package missing image: ${pkg.id} - ${pkg.title}`);
  }
  pkg.itinerary.forEach(day => {
    if (!day.image) {
      console.log(`Day ${day.day} missing image in package: ${pkg.id} - ${pkg.title}`);
    } else if (day.image.includes('placeholder')) {
      console.log(`Day ${day.day} has placeholder image in package: ${pkg.id} - ${pkg.title}: ${day.image}`);
    }
  });
});
