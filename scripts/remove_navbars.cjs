const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Note: AppRouter.jsx uses Layout which contains Navbar and Footer so they are globally provided.
  // Thus we strip them from the individual pages to prevent double-mounting.
  if (content.includes('<Navbar />') || content.includes('<Footer />')) {
    content = content.replace(/<Navbar[ ]*\/>/g, '');
    content = content.replace(/<Footer[ ]*\/>/g, '');
    content = content.replace(/import Navbar from '[.\/]*components\/Navbar';(\r?\n)?/g, '');
    content = content.replace(/import Footer from '[.\/]*components\/Footer';(\r?\n)?/g, '');
    fs.writeFileSync(filePath, content);
    console.log('Cleaned up duplicate nav/footers in: ' + file);
  }
}
