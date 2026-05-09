const puppeteer = require('puppeteer'); 
(async () => { 
  const browser = await puppeteer.launch(); 
  const page = await browser.newPage(); 
  await page.goto('https://unsplash.com/s/photos/indian-man-portrait'); 
  const images = await page.$$eval('img[srcset]', imgs => imgs.slice(0,10).map(img => img.src)); 
  console.log(JSON.stringify(images, null, 2)); 
  await browser.close(); 
})();
