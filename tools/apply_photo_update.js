const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Update index.html
const indexPath = path.join(rootDir, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

indexHtml = indexHtml.replace(
  /https:\/\/framerusercontent\.com\/images\/WsnVxaSk0dKenAYdMT2G7bpCDAQ\.png\?scale-down-to=512&amp;width=800&amp;height=800 512w,\s*https:\/\/framerusercontent\.com\/images\/WsnVxaSk0dKenAYdMT2G7bpCDAQ\.png\?width=800&amp;height=800 800w/g,
  'assets/images/priyanshu_avatar.png'
);
indexHtml = indexHtml.replace(
  /https:\/\/framerusercontent\.com\/images\/WsnVxaSk0dKenAYdMT2G7bpCDAQ\.png\?width=800&amp;height=800/g,
  'assets/images/priyanshu_avatar.png'
);
indexHtml = indexHtml.replace(
  /https:\/\/framerusercontent\.com\/images\/WsnVxaSk0dKenAYdMT2G7bpCDAQ\.png/g,
  'assets/images/priyanshu_avatar.png'
);

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('Updated index.html avatar image');

// 2. Update about.html
const aboutPath = path.join(rootDir, 'about.html');
let aboutHtml = fs.readFileSync(aboutPath, 'utf8');

aboutHtml = aboutHtml.replace(
  /https:\/\/framerusercontent\.com\/images\/7esgEDTfqoCmh2yHxI65XfkMOCI\.jpg\?[^"]*/g,
  'assets/images/priyanshu_portrait.jpg'
);
aboutHtml = aboutHtml.replace(
  /https:\/\/framerusercontent\.com\/images\/7esgEDTfqoCmh2yHxI65XfkMOCI\.jpg/g,
  'assets/images/priyanshu_portrait.jpg'
);

fs.writeFileSync(aboutPath, aboutHtml, 'utf8');
console.log('Updated about.html portrait image');

// 3. Update Q3cqLj... script for index.html React hydration
const q3Script = path.join(rootDir, 'assets/scripts/Q3cqLjG9PPuI7ee4M1WhKNzsCD0K1AWnqjUzdyGC_zA.Bh0RFGmE.mjs');
let q3 = fs.readFileSync(q3Script, 'utf8');
q3 = q3.replace(/https:\/\/framerusercontent\.com\/images\/WsnVxaSk0dKenAYdMT2G7bpCDAQ\.png[^\`"]*/g, '/assets/images/priyanshu_avatar.png');
fs.writeFileSync(q3Script, q3, 'utf8');
console.log('Updated Q3cqLj script avatar reference');

// 4. Update Jcz0... script for about.html React hydration
const jczScript = path.join(rootDir, 'assets/scripts/Jcz0wpBi_k_Z09wrENY6YxiC4Sk3CuoJLHluo4eog1o.DR9wzOdw.mjs');
let jcz = fs.readFileSync(jczScript, 'utf8');
jcz = jcz.replace(/https:\/\/framerusercontent\.com\/images\/7esgEDTfqoCmh2yHxI65XfkMOCI\.jpg[^\`"]*/g, '/assets/images/priyanshu_portrait.jpg');
fs.writeFileSync(jczScript, jcz, 'utf8');
console.log('Updated Jcz0 script portrait reference');

console.log('\nAll photo references successfully updated to black & white user photo!');
