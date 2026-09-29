const fs = require('fs');

const css = fs.readFileSync('all_styles.css', 'utf8');

// Find rules containing grid or flex
const lines = css.split('}');
console.log('Total CSS rule blocks:', lines.length);

const interesting = [];
for (const rule of lines) {
  if (rule.includes('grid-template') || rule.includes('backdrop-filter') || rule.includes('border-radius: 32px') || rule.includes('border-radius: 24px')) {
    interesting.push(rule.trim());
  }
}

console.log('Interesting rules count:', interesting.length);
interesting.slice(0, 15).forEach((r, i) => console.log(`[${i}] ${r}\n`));
