/**
 * Extract venue images from .docx files (Pontus batch)
 * 
 * .docx files are ZIP archives with images in word/media/
 * This script:
 * 1. Reads each .docx from the source folder
 * 2. Extracts embedded images (jpg/png/jpeg)
 * 3. Saves them as venue-1.jpg, venue-2.jpg etc. per country
 * 4. Maps Swedish country names → English slugs
 * 5. Updates IMAGE_COUNTS in GlobeHero.tsx
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// ── Swedish → English slug mapping ──
const COUNTRY_MAP = {
  'Afghanistan': 'afghanistan',
  'Albanien': 'albania',
  'Algeriet': 'algeria',
  'Andorra': 'andorra',
  'Angola': 'angola',
  'Antigua och Barbuda': 'antigua-and-barbuda',
  'Argentina': 'argentina',
  'Armenien': 'armenia',
  'Aruba': 'aruba',
  'Australien': 'australia',
  'Azerbajdzjan': 'azerbaijan',
  'Bahamas': 'bahamas',
  'Bahrain': 'bahrain',
  'Bangladesh': 'bangladesh',
  'Barbados': 'barbados',
  'Belgium': 'belgium',
  'Belgien': 'belgium',
  'Belize': 'belize',
  'Benin': 'benin',
  'Bermuda': 'bermuda',
  'Bhutan': 'bhutan',
  'Bolivia': 'bolivia',
  'Bosnien-Hercegovina': 'bosnia-herzegovina',
  'Bosnien och Hercegovina': 'bosnia-herzegovina',
  'Botswana': 'botswana',
  'Brasilien': 'brazil',
  'Brazil': 'brazil',
  'Brunei': 'brunei',
  'Bulgarien': 'bulgaria',
  'Burkina Faso': 'burkina-faso',
  'Kambodja': 'cambodia',
  'Kamerun': 'cameroon',
  'Kanada': 'canada',
  'Canada': 'canada',
  'Kap Verde': 'cape-verde',
  'Caymanöarna': 'cayman-islands',
  'Centralafrikanska republiken': 'central-african-republic',
  'Tchad': 'chad',
  'Chile': 'chile',
  'Kina': 'china',
  'Colombia': 'colombia',
  'Kongo': 'congo',
  'Costa Rica': 'costa-rica',
  'Kroatien': 'croatia',
  'Croatia': 'croatia',
  'Tjeckien': 'czech-republic',
  'Czech Republic': 'czech-republic',
  'Danmark': 'denmark',
  'Denmark': 'denmark',
  'Djibouti': 'djibouti',
  'Dominica': 'dominica',
  'Dominikanska republiken': 'dominican-republic',
  'Ecuador': 'ecuador',
  'Egypten': 'egypt',
  'Egypt': 'egypt',
  'El Salvador': 'el-salvador',
  'Ekvatorialguinea': 'equatorial-guinea',
  'Eritrea': 'eritrea',
  'Estland': 'estonia',
  'Estonia': 'estonia',
  'Eswatini': 'eswatini',
  'Etiopien': 'ethiopia',
  'Fiji': 'fiji',
  'Finland': 'finland',
  'Frankrike': 'france',
  'France': 'france',
  'Gambia': 'gambia',
  'Georgien': 'georgia',
  'Tyskland': 'germany',
  'Germany': 'germany',
  'Ghana': 'ghana',
  'Gibraltar': 'gibraltar',
  'Grekland': 'greece',
  'Greece': 'greece',
  'Grenada': 'grenada',
  'Guatemala': 'guatemala',
  'Guinea': 'guinea',
  'Guinea-Bissau': 'guinea-bissau',
  'Honduras': 'honduras',
  'Hongkong': 'hong-kong',
  'Hong Kong': 'hong-kong',
  'Ungern': 'hungary',
  'Hungary': 'hungary',
  'Island': 'iceland',
  'Iceland': 'iceland',
  'Indien': 'india',
  'India': 'india',
  'Indonesien': 'indonesia',
  'Irland': 'ireland',
  'Ireland': 'ireland',
  'Israel': 'israel',
  'Italien': 'italy',
  'Italy': 'italy',
  'Jamaica': 'jamaica',
  'Japan': 'japan',
  'Jordanien': 'jordan',
  'Kazakstan': 'kazakhstan',
  'Kenya': 'kenya',
  'Kiribati': 'kiribati',
  'Kuwait': 'kuwait',
  'Kirgizistan': 'kyrgyzstan',
  'Laos': 'laos',
  'Lettland': 'latvia',
  'Latvia': 'latvia',
  'Libanon': 'lebanon',
  'Lesotho': 'lesotho',
  'Liberia': 'liberia',
  'Litauen': 'lithuania',
  'Lithuania': 'lithuania',
  'Luxemburg': 'luxembourg',
  'Luxembourg': 'luxembourg',
  'Macau': 'macau',
  'Madagaskar': 'madagascar',
  'Malawi': 'malawi',
  'Malaysia': 'malaysia',
  'Maldiverna': 'maldives',
  'Mali': 'mali',
  'Malta': 'malta',
  'Marshallöarna': 'marshall-islands',
  'Mauretanien': 'mauritania',
  'Mauritius': 'mauritius',
  'Mexiko': 'mexico',
  'Mexico': 'mexico',
  'Mikronesien': 'micronesia',
  'Moldavien': 'moldova',
  'Monaco': 'monaco',
  'Mongoliet': 'mongolia',
  'Montenegro': 'montenegro',
  'Marocko': 'morocco',
  'Moçambique': 'mozambique',
  'Mozambique': 'mozambique',
  'Myanmar': 'myanmar',
  'Namibia': 'namibia',
  'Nauru': 'nauru',
  'Nepal': 'nepal',
  'Nederländerna': 'netherlands',
  'Netherlands': 'netherlands',
  'Nya Zeeland': 'new-zealand',
  'New Zealand': 'new-zealand',
  'Nicaragua': 'nicaragua',
  'Niger': 'niger',
  'Nigeria': 'nigeria',
  'Nordmakedonien': 'north-macedonia',
  'North Macedonia': 'north-macedonia',
  'Norge': 'norway',
  'Norway': 'norway',
  'Oman': 'oman',
  'Pakistan': 'pakistan',
  'Palau': 'palau',
  'Panama': 'panama',
  'Paraguay': 'paraguay',
  'Peru': 'peru',
  'Filippinerna': 'philippines',
  'Polen': 'poland',
  'Poland': 'poland',
  'Portugal': 'portugal',
  'Puerto Rico': 'puerto-rico',
  'Qatar': 'qatar',
  'Rumänien': 'romania',
  'Romania': 'romania',
  'Rwanda': 'rwanda',
  'Saint Kitts och Nevis': 'saint-kitts-and-nevis',
  'Saint Lucia': 'saint-lucia',
  'Saint Vincent och Grenadinerna': 'saint-vincent-and-the-grenadines',
  'Samoa': 'samoa',
  'São Tomé och Príncipe': 'sao-tome-and-principe',
  'Saudiarabien': 'saudi-arabia',
  'Saudi Arabia': 'saudi-arabia',
  'Senegal': 'senegal',
  'Serbien': 'serbia',
  'Serbia': 'serbia',
  'Seychellerna': 'seychelles',
  'Sierra Leone': 'sierra-leone',
  'Singapore': 'singapore',
  'Slovakien': 'slovakia',
  'Slovakia': 'slovakia',
  'Slovenien': 'slovenia',
  'Slovenia': 'slovenia',
  'Somalia': 'somalia',
  'Sydafrika': 'south-africa',
  'South Africa': 'south-africa',
  'Sydkorea': 'south-korea',
  'South Korea': 'south-korea',
  'Sydsudan': 'south-sudan',
  'Spanien': 'spain',
  'Spain': 'spain',
  'Sri Lanka': 'sri-lanka',
  'Sudan': 'sudan',
  'Sverige': 'sweden',
  'Sweden': 'sweden',
  'Schweiz': 'switzerland',
  'Switzerland': 'switzerland',
  'Tanzania': 'tanzania',
  'Thailand': 'thailand',
  'Togo': 'togo',
  'Tonga': 'tonga',
  'Tunisien': 'tunisia',
  'Turkiet': 'turkey',
  'Turkey': 'turkey',
  'Tuvalu': 'tuvalu',
  'Uganda': 'uganda',
  'Storbritannien': 'uk',
  'UK': 'uk',
  'Ukraina': 'ukraine',
  'Förenade Arabemiraten': 'uae',
  'Uruguay': 'uruguay',
  'Uzbekistan': 'uzbekistan',
  'Vanuatu': 'vanuatu',
  'Vietnam': 'vietnam',
  'Zambia': 'zambia',
  'Zimbabwe': 'zimbabwe',
};

// ── Config ──
const DOCX_DIR = path.resolve('public/Images/venues/175 länder cvent - 5 anläggningar-20260510T131224Z-3-001/175 länder cvent - 5 anläggningar');
const OUTPUT_DIR = path.resolve('public/Images/venues');
const TEMP_DIR = path.resolve('public/Images/venues/_temp_extract');

// ── Helpers ──
function slugFromFilename(filename) {
  const name = path.basename(filename, '.docx').trim();
  // Direct match
  if (COUNTRY_MAP[name]) return COUNTRY_MAP[name];
  // Case-insensitive match
  const lower = name.toLowerCase();
  for (const [key, slug] of Object.entries(COUNTRY_MAP)) {
    if (key.toLowerCase() === lower) return slug;
  }
  // Fallback: slugify
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/[^a-z0-9-]/g, '');
}

async function extractImagesFromDocx(docxPath, outputFolder) {
  // Clean temp
  if (fs.existsSync(TEMP_DIR)) fs.rmSync(TEMP_DIR, { recursive: true });
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  try {
    // .docx is a ZIP but PowerShell requires .zip extension
    const tempZip = path.join(TEMP_DIR, '_temp.zip');
    fs.copyFileSync(docxPath, tempZip);
    execSync(`Expand-Archive -Path "${tempZip}" -DestinationPath "${TEMP_DIR}" -Force`, { shell: 'powershell.exe', stdio: 'pipe' });
    fs.unlinkSync(tempZip);
  } catch (e) {
    console.log(`  ⚠ Failed to unzip: ${path.basename(docxPath)}`);
    return 0;
  }

  const mediaDir = path.join(TEMP_DIR, 'word', 'media');
  if (!fs.existsSync(mediaDir)) {
    return 0;
  }

  const images = fs.readdirSync(mediaDir)
    .filter(f => /\.(jpg|jpeg|png|gif|bmp|tiff|webp)$/i.test(f))
    .sort();

  if (images.length === 0) return 0;

  // Create output folder
  fs.mkdirSync(outputFolder, { recursive: true });

  let count = 0;
  for (const img of images) {
    count++;
    const ext = path.extname(img).toLowerCase() === '.png' ? '.png' : '.jpg';
    const dest = path.join(outputFolder, `venue-${count}${ext === '.png' ? '.jpg' : '.jpg'}`);
    
    // Copy (or convert if needed)
    fs.copyFileSync(path.join(mediaDir, img), dest);
  }

  return count;
}

// ── Main ──
async function main() {
  console.log('🔍 Scanning docx files...');
  
  if (!fs.existsSync(DOCX_DIR)) {
    console.error(`❌ Source dir not found: ${DOCX_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(DOCX_DIR).filter(f => f.endsWith('.docx'));
  console.log(`📄 Found ${files.length} .docx files\n`);

  const results = {};
  let totalImages = 0;
  let successCount = 0;
  const unmapped = [];

  for (const file of files) {
    const slug = slugFromFilename(file);
    const docxPath = path.join(DOCX_DIR, file);
    const outDir = path.join(OUTPUT_DIR, slug);

    // Skip if already has images
    if (fs.existsSync(outDir) && fs.readdirSync(outDir).filter(f => f.startsWith('venue-')).length >= 5) {
      const existing = fs.readdirSync(outDir).filter(f => f.startsWith('venue-')).length;
      console.log(`⏭  ${slug} — already has ${existing} images, skipping`);
      results[slug] = existing;
      totalImages += existing;
      successCount++;
      continue;
    }

    const count = await extractImagesFromDocx(docxPath, outDir);
    
    if (count > 0) {
      console.log(`✅ ${slug} — extracted ${count} images (from "${file}")`);
      results[slug] = count;
      totalImages += count;
      successCount++;
    } else {
      console.log(`⚠️  ${slug} — no images found (from "${file}")`);
      unmapped.push({ file, slug });
    }
  }

  // Clean temp
  if (fs.existsSync(TEMP_DIR)) fs.rmSync(TEMP_DIR, { recursive: true });

  console.log(`\n${'═'.repeat(50)}`);
  console.log(`📊 Results: ${successCount}/${files.length} countries with images`);
  console.log(`🖼  Total images extracted: ${totalImages}`);
  
  if (unmapped.length > 0) {
    console.log(`\n⚠️  ${unmapped.length} files with no images:`);
    unmapped.forEach(u => console.log(`   - ${u.file} → ${u.slug}`));
  }

  // Output IMAGE_COUNTS for GlobeHero
  console.log(`\n📋 IMAGE_COUNTS for GlobeHero.tsx:`);
  console.log(`const IMAGE_COUNTS: Record<string, number> = {`);
  Object.entries(results).sort().forEach(([slug, count]) => {
    console.log(`  '${slug}': ${count},`);
  });
  console.log(`};`);
}

main().catch(console.error);
