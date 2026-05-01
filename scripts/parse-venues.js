const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const VENUES_DIR = path.join(__dirname, '..', 'venues');

// Swedish → English city name translations
const CITY_EN = {
  'Bryssel': 'Brussels', 'Bryssel/Zaventem': 'Brussels/Zaventem',
  'Prag': 'Prague', 'Köpenhamn': 'Copenhagen',
  'Aten': 'Athens', 'Lissabon': 'Lisbon',
  'Warszawa': 'Warsaw', 'Wien': 'Vienna',
  'Rom': 'Rome', 'Florens': 'Florence',
  'Venedig': 'Venice', 'Helsingfors': 'Helsinki',
  'Beograd': 'Belgrade', 'Bukarest': 'Bucharest',
  'München': 'Munich', 'Genève': 'Geneva',
  'Zürich': 'Zurich', 'Bern': 'Berne',
  'Göteborg': 'Gothenburg', 'Malmö': 'Malmö',
  'Gent': 'Ghent', 'Antwerpen': 'Antwerp',
};

const COUNTRY_META = {
  'Belgium': { code: 'be', nameSv: 'Belgien', slug: 'belgium' },
  'Bosnia and Herzegovina': { code: 'ba', nameSv: 'Bosnien och Hercegovina', slug: 'bosnia-herzegovina' },
  'Croatia': { code: 'hr', nameSv: 'Kroatien', slug: 'croatia' },
  'Czech Republic': { code: 'cz', nameSv: 'Tjeckien', slug: 'czech-republic' },
  'Estonia': { code: 'ee', nameSv: 'Estland', slug: 'estonia' },
  'France': { code: 'fr', nameSv: 'Frankrike', slug: 'france' },
  'Greece': { code: 'gr', nameSv: 'Grekland', slug: 'greece' },
  'Hungary': { code: 'hu', nameSv: 'Ungern', slug: 'hungary' },
  'Iceland': { code: 'is', nameSv: 'Island', slug: 'iceland' },
  'Ireland': { code: 'ie', nameSv: 'Irland', slug: 'ireland' },
  'Italy': { code: 'it', nameSv: 'Italien', slug: 'italy' },
  'Latvia': { code: 'lv', nameSv: 'Lettland', slug: 'latvia' },
  'Lithuania': { code: 'lt', nameSv: 'Litauen', slug: 'lithuania' },
  'Luxembourg': { code: 'lu', nameSv: 'Luxemburg', slug: 'luxembourg' },
  'Malta': { code: 'mt', nameSv: 'Malta', slug: 'malta' },
  'Montenegro': { code: 'me', nameSv: 'Montenegro', slug: 'montenegro' },
  'Netherlands': { code: 'nl', nameSv: 'Nederländerna', slug: 'netherlands' },
  'North Macedonia': { code: 'mk', nameSv: 'Nordmakedonien', slug: 'north-macedonia' },
  'Norway': { code: 'no', nameSv: 'Norge', slug: 'norway' },
  'Poland': { code: 'pl', nameSv: 'Polen', slug: 'poland' },
  'Portugal': { code: 'pt', nameSv: 'Portugal', slug: 'portugal' },
  'Romania': { code: 'ro', nameSv: 'Rumänien', slug: 'romania' },
  'Serbia': { code: 'rs', nameSv: 'Serbien', slug: 'serbia' },
  'Slovakia': { code: 'sk', nameSv: 'Slovakien', slug: 'slovakia' },
  'Slovenia': { code: 'si', nameSv: 'Slovenien', slug: 'slovenia' },
  'Spain': { code: 'es', nameSv: 'Spanien', slug: 'spain' },
  'Sweden': { code: 'se', nameSv: 'Sverige', slug: 'sweden' },
  'Switzerland': { code: 'ch', nameSv: 'Schweiz', slug: 'switzerland' },
  'United Kingdom': { code: 'gb', nameSv: 'Storbritannien', slug: 'uk' },
};

function translateCity(city) {
  return CITY_EN[city] || city;
}

function parseVenueText(text) {
  const venues = [];
  const entries = text.split(/\n\d+\.\s+/);
  
  for (const entry of entries) {
    if (!entry.trim()) continue;
    const lines = entry.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) continue;
    
    let name = lines[0].replace(/^\d+\.\s*/, '').trim();
    if (lines[1] === name) lines.splice(1, 1);
    
    let city = '';
    let capacity = '';
    let type = '';
    
    for (const line of lines) {
      const cityMatch = line.match(/Stad:\s*(.+)/i);
      if (cityMatch) city = translateCity(cityMatch[1].trim());
      
      const capMatch = line.match(/Kapacitet:\s*(.+)/i);
      if (capMatch) {
        capacity = capMatch[1].trim()
          .replace(/upp till\s*/i, '')
          .replace(/cirka\s*/i, '')
          .replace(/personer/i, '')
          .replace(/\s+/g, ' ')
          .trim();
      }
      
      const typeMatch = line.match(/[\d.]+\s*[•·]\s*(.+?)(?:\s*[•·]\s*|$)/);
      if (typeMatch) type = typeMatch[1].trim();
    }
    
    if (name && name.length > 2 && !name.startsWith('http')) {
      venues.push({
        name: name.substring(0, 80),
        city: city || 'Unknown',
        capacity: capacity || 'N/A',
        type: type || 'Event Venue',
      });
    }
  }
  
  return venues.slice(0, 10);
}

async function main() {
  const files = fs.readdirSync(VENUES_DIR).filter(f => f.endsWith('.docx'));
  const results = {};
  
  for (const file of files) {
    let countryName = file.replace('.docx', '').replace(' - kopia', '');
    const filePath = path.join(VENUES_DIR, file);
    const meta = COUNTRY_META[countryName];
    if (!meta) { console.error(`⚠️ No meta: ${countryName}`); continue; }
    
    try {
      const { value } = await mammoth.extractRawText({ path: filePath });
      const venues = parseVenueText(value);
      
      // Count images extracted for this country
      const imgDir = path.join(__dirname, '..', 'public', 'Images', 'venues', meta.slug);
      const imgCount = fs.existsSync(imgDir) ? fs.readdirSync(imgDir).length : 0;

      results[countryName] = {
        ...meta,
        name: countryName,
        venues: `${venues.length * 15}+`,
        topVenues: venues,
        imageCount: imgCount,
      };
      
      console.log(`✅ ${countryName}: ${venues.length} venues, ${imgCount} images`);
    } catch (err) {
      console.error(`❌ ${countryName}: ${err.message}`);
    }
  }
  
  // Save updated JSON
  const outputPath = path.join(__dirname, '..', 'venues', 'parsed-venues.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n📁 Saved to ${outputPath}`);
  console.log(`Total: ${Object.keys(results).length} countries`);
}

main();
