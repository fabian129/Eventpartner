require('dotenv').config({ path: '.env.local' });
const API = 'https://api.printful.com';
const headers = {
  Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
  'Content-Type': 'application/json',
  'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID,
};

async function get(path) {
  const res = await fetch(API + path, { headers });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = text; }
  return { status: res.status, json };
}

(async () => {
  // Sync/store products live in the v1 API (not v2).
  const list = await get('/store/products?limit=20');
  console.log(`\n=== GET /store/products → ${list.status} ===`);
  console.log(JSON.stringify(list.json, null, 2));

  const products = list.json?.result || [];
  if (!products.length) {
    console.log('\n⚠  No published products yet — have Malin click "Publish" in Printful, then re-run.');
    return;
  }

  // Dump full detail (sync_product + sync_variants) for each published product.
  for (const p of products) {
    const detail = await get(`/store/products/${p.id}`);
    console.log(`\n=== GET /store/products/${p.id} (${p.name}) → ${detail.status} ===`);
    console.log(JSON.stringify(detail.json, null, 2));
  }
})();
