/**
 * Download all Shopify product images to public/Images/products/
 * Run: node scripts/download-product-images.mjs
 */
import https from "https";
import fs from "fs";
import path from "path";

const DOMAIN = "eventpartner.myshopify.com";
const TOKEN = "e9b6156db24dbbcff90bf17212bcd6ab";
const API_URL = `https://${DOMAIN}/api/2026-04/graphql.json`;
const OUT_DIR = path.resolve("public/Images/products");

// Ensure output dir exists
fs.mkdirSync(OUT_DIR, { recursive: true });

async function fetchProducts() {
  const query = `{
    products(first: 50) {
      edges {
        node {
          handle
          title
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  return json.data.products.edges.map((e) => e.node);
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        https.get(res.headers.location, (res2) => {
          res2.pipe(file);
          file.on("finish", () => { file.close(); resolve(); });
        }).on("error", reject);
      } else {
        res.pipe(file);
        file.on("finish", () => { file.close(); resolve(); });
      }
    }).on("error", reject);
  });
}

async function main() {
  console.log("🛍️  Fetching products from Shopify...\n");
  const products = await fetchProducts();
  console.log(`Found ${products.length} products\n`);

  for (const product of products) {
    const images = product.images.edges.map((e) => e.node);
    console.log(`📦 ${product.title} (${product.handle}) — ${images.length} images`);

    for (let i = 0; i < images.length; i++) {
      const ext = "png";
      const filename = images.length === 1
        ? `${product.handle}.${ext}`
        : `${product.handle}-${i + 1}.${ext}`;
      const dest = path.join(OUT_DIR, filename);

      if (fs.existsSync(dest)) {
        console.log(`   ⏭️  ${filename} (exists)`);
        continue;
      }

      // Get best quality URL
      const url = images[i].url.split("?")[0]; // Remove query params for original
      console.log(`   ⬇️  ${filename}`);
      await downloadFile(url, dest);
    }
  }

  console.log("\n✅ Done! Images saved to public/Images/products/");
}

main().catch(console.error);
