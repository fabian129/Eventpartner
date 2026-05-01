/**
 * Extract images from venue .docx files using mammoth
 */
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const VENUES_DIR = path.join(__dirname, '..', 'venues');
const IMG_OUT = path.join(__dirname, '..', 'public', 'Images', 'venues');

async function extractFromFile(filePath, countrySlug) {
  const countryDir = path.join(IMG_OUT, countrySlug);
  if (!fs.existsSync(countryDir)) fs.mkdirSync(countryDir, { recursive: true });

  let imgIndex = 0;
  
  const options = {
    convertImage: mammoth.images.imgElement(async (image) => {
      imgIndex++;
      const ext = image.contentType === 'image/png' ? 'png' : 'jpg';
      const filename = `venue-${imgIndex}.${ext}`;
      const imgPath = path.join(countryDir, filename);
      
      const buffer = await image.read();
      fs.writeFileSync(imgPath, buffer);
      
      return { src: `/Images/venues/${countrySlug}/${filename}` };
    })
  };

  await mammoth.convertToHtml({ path: filePath }, options);
  return imgIndex;
}

// Country slug mapping
const SLUGS = {
  'Belgium': 'belgium',
  'Bosnia and Herzegovina': 'bosnia-herzegovina',
  'Croatia': 'croatia',
  'Czech Republic': 'czech-republic',
  'Estonia': 'estonia',
  'France': 'france',
  'Greece': 'greece',
  'Hungary': 'hungary',
  'Iceland': 'iceland',
  'Ireland': 'ireland',
  'Italy': 'italy',
  'Latvia': 'latvia',
  'Lithuania': 'lithuania',
  'Luxembourg': 'luxembourg',
  'Malta': 'malta',
  'Montenegro': 'montenegro',
  'Netherlands': 'netherlands',
  'North Macedonia': 'north-macedonia',
  'Norway': 'norway',
  'Poland': 'poland',
  'Portugal': 'portugal',
  'Romania': 'romania',
  'Serbia': 'serbia',
  'Slovakia': 'slovakia',
  'Slovenia': 'slovenia',
  'Spain': 'spain',
  'Sweden': 'sweden',
  'Switzerland': 'switzerland',
  'United Kingdom': 'uk',
};

async function main() {
  if (!fs.existsSync(IMG_OUT)) fs.mkdirSync(IMG_OUT, { recursive: true });
  
  const files = fs.readdirSync(VENUES_DIR).filter(f => f.endsWith('.docx'));
  let totalImages = 0;
  
  for (const file of files) {
    const countryName = file.replace('.docx', '').replace(' - kopia', '');
    const slug = SLUGS[countryName];
    if (!slug) { console.log(`⚠️ No slug for ${countryName}`); continue; }
    
    try {
      const count = await extractFromFile(path.join(VENUES_DIR, file), slug);
      totalImages += count;
      console.log(`✅ ${countryName}: ${count} images extracted`);
    } catch (err) {
      console.error(`❌ ${countryName}: ${err.message}`);
    }
  }
  
  console.log(`\n📸 Total: ${totalImages} images extracted to public/Images/venues/`);
}

main();
