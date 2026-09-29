const fs = require('fs');
const path = require('path');

const scriptDir = path.resolve(__dirname, '../assets/scripts');
fs.readdirSync(scriptDir).forEach(f => {
  const p = path.join(scriptDir, f);
  const content = fs.readFileSync(p, 'utf8');
  if (content.includes('Soren') || content.includes('soren.com')) {
    console.log(`\n=== File: ${f} ===`);
    const regex = /.{0,60}(Soren|soren\.com).{0,60}/gi;
    let m;
    while ((m = regex.exec(content)) !== null) {
      console.log('   MATCH:', m[0]);
    }
  }
});
