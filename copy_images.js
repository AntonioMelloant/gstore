const fs = require('fs');
const path = require('path');

const SRC = 'C:\\Users\\anton\\.gemini\\antigravity\\brain\\e74edd82-1d15-4b22-8644-bb59bc50c6fe';
const DST = 'C:\\Users\\anton\\.gemini\\antigravity\\scratch\\g-store\\img';

const files = [
  ['gstore_logo_1788729742242.png', 'logo.png'],
  ['product_nike_airmax_1788729752191.png', 'nike-airmax.png'],
  ['product_puma_suede_1788729762097.png', 'puma-suede.png'],
  ['product_lacoste_polo_1788729772378.png', 'lacoste-polo.png'],
  ['product_nike_tshirt_1788729783049.png', 'nike-tshirt.png'],
  ['product_puma_rsx_1788729793143.png', 'puma-rsx.png'],
];

if (!fs.existsSync(DST)) fs.mkdirSync(DST, { recursive: true });

for (const [src, dst] of files) {
  const srcPath = path.join(SRC, src);
  const dstPath = path.join(DST, dst);
  try {
    fs.copyFileSync(srcPath, dstPath);
    console.log(`OK: ${dst}`);
  } catch (e) {
    console.error(`FAIL: ${dst} - ${e.message}`);
  }
}
console.log('Done.');
