const fs = require('fs');
const path = require('path');

const scriptDir = path.resolve(__dirname, '../assets/scripts');

const files = fs.readdirSync(scriptDir);

for (const file of files) {
  if (!file.endsWith('.mjs') && !file.endsWith('.js')) continue;
  const p = path.join(scriptDir, file);
  let content = fs.readFileSync(p, 'utf8');
  let original = content;

  // Replace Soren Weil with Priyanshu Shukla
  content = content.replace(/Soren Weil/g, 'Priyanshu Shukla');
  // Replace Soren with Priyanshu in text props
  content = content.replace(/I'm Soren/g, "I'm Priyanshu");
  content = content.replace(/with Soren/g, 'with Priyanshu');
  content = content.replace(/Soren is/g, 'Priyanshu is');
  content = content.replace(/Soren stands/g, 'Priyanshu stands');
  content = content.replace(/Soren brings/g, 'Priyanshu brings');
  content = content.replace(/Soren has/g, 'Priyanshu has');

  // Replace email & phone
  content = content.replace(/hello@soren\.com/g, 'godfathersid3@gmail.com');
  content = content.replace(/\(\+20\)\s*115\s*123-4567/g, '+91 9068839558');
  content = content.replace(/tel:\(\+20\)\s*115\s*123-4567/g, 'tel:+919068839558');

  // Replace social handles
  content = content.replace(/@soren\.weil/g, '@priyanshu.shukla');
  content = content.replace(/@its-soren/g, '@priyanshushukla');
  content = content.replace(/@weil\.soren/g, '@priyanshushukla');

  // Also replace remote script imports within the mjs files with relative ./ so they load other local scripts
  content = content.replace(/https:\/\/framerusercontent\.com\/sites\/48EiW83Fk1ILEWzxTLUdop\//g, './');

  if (content !== original) {
    fs.writeFileSync(p, content, 'utf8');
    console.log(`Patched script -> ${file}`);
  }
}

console.log('\nAll local Framer scripts successfully patched!');
