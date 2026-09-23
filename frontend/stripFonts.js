const fs = require('fs');
const path = require('path');

const DIRECTORIES = [
  path.join(__dirname, 'components'),
  path.join(__dirname, 'app')
];

let filesModified = 0;

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      content = content.replace(/style={{[^}]*fontFamily:[^}]*var\(--font-(cinzel|playfair)\)[^}]*}}/g, '');
      content = content.replace(/font-serif/g, ''); // strip font-serif class everywhere
      
      // Fix double spaces inside classNames caused by removal
      content = content.replace(/className="([^"]*)"/g, (match, p1) => {
        return `className="${p1.replace(/\s+/g, ' ').trim()}"`;
      });

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        filesModified++;
        console.log(`Modified: ${fullPath}`);
      }
    }
  }
}

DIRECTORIES.forEach(dir => walkDir(dir));
console.log(`Removed cinzel/playfair/serif references in ${filesModified} files.`);
