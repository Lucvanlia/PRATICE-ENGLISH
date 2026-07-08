const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '..', 'scratch', 'scraped_units');
const outputFile = path.join(__dirname, '..', 'scratch', 'summary.json');

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.md'));

const summary = [];

function extractGrammarSummary(content, fileName) {
  const lines = content.split('\n');
  const formulas = [];
  const signals = [];
  const tips = [];
  
  let inTable = false;
  let inList = false;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Look for formula-like lines
    if (line.includes('S +') || line.includes('S+') || line.includes('Công thức:')) {
      formulas.push(line);
    }
    
    // Look for signal words or trigger keywords
    if (line.startsWith('•') || line.startsWith('-')) {
      const clean = line.replace(/^[•-]\s*/, '');
      if (clean.length < 50 && (clean.includes('every') || clean.includes('always') || clean.includes('now') || clean.includes('at the moment') || clean.includes('ago') || clean.includes('since') || clean.includes('for') || clean.includes('tomorrow'))) {
        signals.push(clean);
      }
    }
    
    // Look for tips or common traps
    if (line.includes('Lưu ý') || line.includes('Chú ý') || line.includes('không chia') || line.includes('tránh bẫy')) {
      tips.push(line);
    }
  }

  return {
    type: 'grammar',
    file: fileName,
    formulas: formulas.slice(0, 10),
    signals: [...new Set(signals)].slice(0, 10),
    tips: [...new Set(tips)].slice(0, 5)
  };
}

function extractListeningSummary(content, fileName) {
  const lines = content.split('\n');
  const strategies = [];
  const traps = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line.includes('Bẫy') || line.includes('bẫy') || line.includes('distractor') || line.includes('tránh')) {
      traps.push(line);
    }
    if (line.includes('Mẹo') || line.includes('mẹo') || line.includes('Chiến thuật') || line.includes('lưu ý')) {
      strategies.push(line);
    }
  }

  return {
    type: 'listening',
    file: fileName,
    strategies: [...new Set(strategies)].slice(0, 8),
    traps: [...new Set(traps)].slice(0, 5)
  };
}

for (const file of files) {
  const filePath = path.join(inputDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const title = content.split('\n')[0].replace(/^#\s*/, '').trim() || file;
  
  let data;
  if (file.includes('grammar')) {
    data = extractGrammarSummary(content, file);
  } else {
    data = extractListeningSummary(content, file);
  }
  
  summary.push({
    file,
    title,
    ...data
  });
}

fs.writeFileSync(outputFile, JSON.stringify(summary, null, 2), 'utf8');
console.log(`Saved summary of ${summary.length} files to ${outputFile}`);
