const fs = require('fs');
const path = require('path');

const replacements = [
  { search: /Rabbi Association-cairo\.jpg/gi, replace: 'rabbi-context/image copy 4.png' },
  { search: /Rabbi Association/gi, replace: 'Rabbi Association' },
  { search: /Rabbi Association/gi, replace: 'Rabbi Association' },
  { search: /Rabbi Association/gi, replace: 'Rabbi Association' },
  { search: /Rabbi Association/gi, replace: 'Rabbi Association' },
  { search: /Educational/gi, replace: 'Educational' },
  { search: /Christianity/gi, replace: 'Christianity' },
  { search: /Christian/gi, replace: 'Christian' },
  { search: /Bible/gi, replace: 'Bible' },
  { search: /Scripture/gi, replace: 'Scripture' },
  { search: /Christ/gi, replace: 'Christ' },
  { search: /God/gi, replace: 'God' },
  { search: /alazhargraduates\.in/gi, replace: 'rabbi.co.in' },
  { search: /bg-\[\#01140e\]/g, replace: 'bg-[#0a192f]' },
  { search: /bg-\[\#011c13\]/g, replace: 'bg-[#0a192f]' },
  { search: /from-\[\#011c13\]/g, replace: 'from-[#0a192f]' },
  { search: /via-\[\#011c13\]/g, replace: 'via-[#0a192f]' },
  { search: /to-\[\#011c13\]/g, replace: 'to-[#0a192f]' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'public') continue;
    
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (filePath.endsWith('.js') || filePath.endsWith('.jsx') || filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.css')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      for (const { search, replace } of replacements) {
        content = content.replace(search, replace);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname));
console.log('Bulk replacement complete.');
