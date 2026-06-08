const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
});

async function updateSanity() {
  try {
    const doc = await client.getDocument('homePage');
    if (!doc) {
      console.log('homePage document not found!');
      return;
    }

    console.log('Fetched document. Looking for "Find inspiration"...');
    
    // We stringify the document to easily find where the text is
    let docString = JSON.stringify(doc);
    let changed = false;

    if (docString.includes('Find inspiration for your next event')) {
        docString = docString.replace(/Find inspiration for your next event/g, "Explore top venues across 175 countries and discover destinations, hotels, resorts, and meeting spaces from around the world. When you're ready, our team will help source the perfect venue for your event.");
        changed = true;
        console.log('Found and replaced: Find inspiration...');
    }

    if (docString.includes('we deliver the complete event experience')) {
        docString = docString.replace(/we deliver the complete event experience/g, "One partner for all services connected to your event");
        changed = true;
        console.log('Found and replaced: complete event experience (en)...');
    }
    
    if (docString.includes('vi levererar hela eventupplevelsen')) {
        docString = docString.replace(/vi levererar hela eventupplevelsen/g, "En partner för alla tjänster kopplade till ert event");
        changed = true;
        console.log('Found and replaced: complete event experience (sv)...');
    }

    if (docString.includes('36')) {
        docString = docString.replace(/\b36\b/g, "175");
        changed = true;
        console.log('Found and replaced: 36 -> 175');
    }

    if (docString.includes('Europe')) {
        docString = docString.replace(/\bEurope\b/g, "the globe");
        changed = true;
        console.log('Found and replaced: Europe -> the globe');
    }

    if (changed) {
        const updatedDoc = JSON.parse(docString);
        await client.createOrReplace(updatedDoc);
        console.log('Successfully updated Sanity CMS!');
    } else {
        console.log('No matches found in the Sanity document.');
    }
  } catch (err) {
    console.error('Error updating Sanity:', err);
  }
}

updateSanity();
