const fs = require('fs');

const filesToFix = [
  'frontend/app/(volunteer-portal)/volunteer-portal/certificates/page.jsx',
  'frontend/app/(public)/membership/page.jsx',
  'frontend/app/(public)/reports/annual/page.jsx',
  'frontend/app/(public)/legal/page.jsx',
  'frontend/app/(public)/team/page.jsx',
  'frontend/app/(public)/news/page.jsx',
  'frontend/app/(public)/volunteer/page.jsx',
  'frontend/app/(public)/gallery/page.jsx',
  'frontend/app/(public)/80g-12a/page.jsx',
  'frontend/app/(public)/csr/page.jsx',
  'frontend/app/(member)/member/certificates/page.jsx'
];

filesToFix.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace text-accent-foreground with text-accent in cases where it's an icon or bg-accent/20
    content = content.replace(/text-accent-foreground/g, (match, offset, string) => {
      // Look back a few characters to see if it's following bg-accent (with space)
      // If it's a solid bg-accent, keep it text-accent-foreground
      const preceding = string.substring(Math.max(0, offset - 30), offset);
      if (preceding.includes('bg-accent ') || preceding.includes('bg-accent"')) {
        return 'text-accent-foreground';
      }
      return 'text-accent';
    });
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  }
});
