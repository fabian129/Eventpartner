import { NextResponse } from "next/server";
import {
  getCatalogProducts,
  getCatalogVariants,
  getCatalogPrices,
  type PrintfulVariant,
} from "@/lib/printful";

/**
 * GET /api/printful/products
 * Query: ?ids=71,382,19  (optional — comma-separated catalog product IDs)
 *
 * Returns products with their variants and prices merged.
 * Uses in-memory cache to avoid hitting Printful's rate limit (120 req/min).
 */

// ─── In-memory cache (server-side only) ─────────────────────────
interface CachedData {
  data: unknown[];
  timestamp: number;
  key: string;
}

let cache: CachedData | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes — products rarely change

// Delay between API calls to stay well under 120 req/min
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get("ids");
    const ids = idsParam
      ? idsParam.split(",").map((id) => parseInt(id.trim(), 10))
      : undefined;

    // Check cache
    const cacheKey = ids ? [...ids].sort().join(",") : "all";
    if (cache && cache.key === cacheKey && cache.timestamp > Date.now() - CACHE_TTL) {
      return NextResponse.json({ data: cache.data, cached: true });
    }

    // Fetch products (already sequential with delays in lib/printful.ts)
    const products = await getCatalogProducts(ids);

    // Fetch variants + prices SEQUENTIALLY with generous delays
    const enriched = [];
    for (const product of products) {
      let variants: PrintfulVariant[] = [];
      let prices: Record<number, { price: string; currency: string }> = {};

      try {
        variants = await getCatalogVariants(product.id);
        await delay(300);
      } catch (err) {
        console.warn(`Failed to fetch variants for product ${product.id}:`, err);
      }

      try {
        prices = await getCatalogPrices(product.id);
        await delay(300);
      } catch (err) {
        console.warn(`Failed to fetch prices for product ${product.id}:`, err);
      }

      // Merge prices into variants
      const variantsWithPrices = variants.map((v) => ({
        ...v,
        price: prices[v.id]?.price || "0",
        currency: prices[v.id]?.currency || "USD",
      }));

      // Extract unique colors from variants
      const colorMap = new Map<string, { name: string; hex: string }>();
      for (const v of variants) {
        if (v.color && !colorMap.has(v.color)) {
          colorMap.set(v.color, { name: v.color, hex: v.color_code || "#000" });
        }
      }

      // Extract unique sizes
      const sizes = [...new Set(variants.map((v) => v.size).filter(Boolean))];

      enriched.push({
        ...product,
        variants: variantsWithPrices,
        availableColors: [...colorMap.values()],
        availableSizes: sizes,
      });
    }

    // Store in cache
    cache = { data: enriched, timestamp: Date.now(), key: cacheKey };

    return NextResponse.json({ data: enriched });
  } catch (error: unknown) {
    console.error("Printful products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", details: String(error) },
      { status: 500 }
    );
  }
}
