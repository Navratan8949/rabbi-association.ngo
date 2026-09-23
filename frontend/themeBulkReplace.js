const fs = require('fs');
const path = require('path');

const DIRECTORIES = [
  path.join(__dirname, 'components'),
  path.join(__dirname, 'app')
];

// We want to replace Tailwind color classes that give an "Islamic" vibe.
const REPLACEMENTS = [
  // Emerald to Blue
  { regex: /text-emerald-(\d+)/g, replace: 'text-blue-$1' },
  { regex: /bg-emerald-(\d+)/g, replace: 'bg-blue-$1' },
  { regex: /border-emerald-(\d+)/g, replace: 'border-blue-$1' },
  { regex: /ring-emerald-(\d+)/g, replace: 'ring-blue-$1' },
  { regex: /from-emerald-(\d+)/g, replace: 'from-blue-$1' },
  { regex: /to-emerald-(\d+)/g, replace: 'to-blue-$1' },
  { regex: /via-emerald-(\d+)/g, replace: 'via-blue-$1' },
  { regex: /text-emerald/g, replace: 'text-navy' }, // exact match
  
  // Lime to Accent
  { regex: /text-lime-(\d+)/g, replace: 'text-accent' }, // Lime is usually accent
  { regex: /bg-lime-(\d+)/g, replace: 'bg-accent' },
  { regex: /border-lime-(\d+)/g, replace: 'border-accent' },
  { regex: /ring-lime-(\d+)/g, replace: 'ring-accent' },
  { regex: /from-lime-(\d+)/g, replace: 'from-accent' },
  { regex: /to-lime-(\d+)/g, replace: 'to-accent' },
  { regex: /via-lime-(\d+)/g, replace: 'via-accent' },
  { regex: /bg-lime\//g, replace: 'bg-accent/' },
  { regex: /text-lime\b/g, replace: 'text-accent' },
  { regex: /border-lime\//g, replace: 'border-accent/' },
  { regex: /ring-lime\//g, replace: 'ring-accent/' },
  { regex: /from-lime\//g, replace: 'from-accent/' },
  { regex: /to-lime\//g, replace: 'to-accent/' },
  { regex: /via-lime\//g, replace: 'via-accent/' },
  { regex: /bg-lime\b/g, replace: 'bg-accent' },
  { regex: /border-lime\b/g, replace: 'border-accent' },

  // Green to Blue or Navy
  { regex: /text-green-(\d+)/g, replace: 'text-blue-$1' },
  { regex: /bg-green-(\d+)/g, replace: 'bg-blue-$1' },
  { regex: /border-green-(\d+)/g, replace: 'border-blue-$1' },
  { regex: /ring-green-(\d+)/g, replace: 'ring-blue-$1' },
  { regex: /from-green-(\d+)/g, replace: 'from-blue-$1' },
  { regex: /to-green-(\d+)/g, replace: 'to-blue-$1' },
  { regex: /via-green-(\d+)/g, replace: 'via-blue-$1' },

  // Teal to Slate
  { regex: /text-teal-(\d+)/g, replace: 'text-slate-$1' },
  { regex: /bg-teal-(\d+)/g, replace: 'bg-slate-$1' },
  { regex: /border-teal-(\d+)/g, replace: 'border-slate-$1' },
  { regex: /ring-teal-(\d+)/g, replace: 'ring-slate-$1' },
  { regex: /from-teal-(\d+)/g, replace: 'from-slate-$1' },
  { regex: /to-teal-(\d+)/g, replace: 'to-slate-$1' },
  { regex: /via-teal-(\d+)/g, replace: 'via-slate-$1' }
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

      REPLACEMENTS.forEach(({ regex, replace }) => {
        content = content.replace(regex, replace);
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
console.log(`\nTheme overhaul complete. Modified ${filesModified} files.`);
