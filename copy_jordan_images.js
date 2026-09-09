const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\anton\\.gemini\\antigravity\\brain\\e74edd82-1d15-4b22-8644-bb59bc50c6fe\\.user_uploaded';
const destDir = 'C:\\Users\\anton\\.gemini\\antigravity\\scratch\\g-store\\img';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = [
  'media_1788980963486.jpg',
  'media_1788980963501.jpg',
  'media_1788980963515.jpg',
  'media_1788980963604.jpg'
];

files.forEach(f => {
  const src = path.join(srcDir, f);
  const dest = path.join(destDir, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Copied:', f);
  } else {
    console.log('Not found:', src);
  }
});
