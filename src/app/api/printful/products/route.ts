import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
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
 * Uses filesystem cache (committed) and in-memory cache to avoid slow load times
 * and hitting Printful's rate limit (120 req/min).
 */

// ─── In-memory cache (server-side only) ─────────────────────────
interface CachedData {
  data: unknown[];
  timestamp: number;
  key: string;
}

let cache: CachedData | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get("ids");
    const revalidate = searchParams.get("revalidate") === "true";
    const ids = idsParam
      ? idsParam.split(",").map((id) => parseInt(id.trim(), 10))
      : undefined;

    // 1. Try to read from committed JSON cache to load instantly (if NOT revalidating)
    if (!revalidate) {
      try {
        const cachePath = path.join(process.cwd(), "src/data/printful-products-cache.json");
        const fileContent = await fs.readFile(cachePath, "utf-8");
        const parsed = JSON.parse(fileContent);

        if (parsed && parsed.data) {
          let results = parsed.data;
          if (ids && ids.length > 0) {
            results = parsed.data.filter((p: any) => ids.includes(p.id));
          }
          if (results.length > 0) {
            return NextResponse.json({ data: results, cached: true, source: "fs" });
          }
        }
      } catch (fsError) {
        console.warn("Printful FS cache miss, fetching live:", fsError);
      }
    }

    // 2. Check in-memory cache as fallback (if NOT revalidating)
    if (!revalidate) {
      const cacheKey = ids ? [...ids].sort().join(",") : "all";
      if (cache && cache.key === cacheKey && cache.timestamp > Date.now() - CACHE_TTL) {
        return NextResponse.json({ data: cache.data, cached: true, source: "memory" });
      }
    }

    // 3. Fallback to live API Fetch (Slow)
    // If revalidating, we always fetch all curated products to completely refresh the cache file.
    const curatedIds = [71, 12, 380, 57, 19, 77];
    const fetchIds = revalidate ? curatedIds : ids;
    const products = await getCatalogProducts(fetchIds);

    // Fetch variants + prices in PARALLEL (one batch of concurrent requests)
    const enriched = await Promise.all(
      products.map(async (product) => {
        let variants: PrintfulVariant[] = [];
        let prices: Record<number, { price: string; currency: string }> = {};

        // Fetch variants and prices concurrently for each product
        const [variantsResult, pricesResult] = await Promise.allSettled([
          getCatalogVariants(product.id),
          getCatalogPrices(product.id),
        ]);

        if (variantsResult.status === "fulfilled") variants = variantsResult.value;
        else console.warn(`Failed to fetch variants for product ${product.id}:`, variantsResult.reason);

        if (pricesResult.status === "fulfilled") prices = pricesResult.value;
        else console.warn(`Failed to fetch prices for product ${product.id}:`, pricesResult.reason);

        // Merge prices into variants — use base price as fallback
        const basePrice = prices[-1] || { price: "0", currency: "USD" };
        const variantsWithPrices = variants.map((v) => ({
          ...v,
          price: prices[v.id]?.price || basePrice.price,
          currency: prices[v.id]?.currency || basePrice.currency,
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

        return {
          ...product,
          variants: variantsWithPrices,
          availableColors: [...colorMap.values()],
          availableSizes: sizes,
        };
      })
    );

    // Write the complete dataset to filesystem cache if revalidating
    if (revalidate) {
      try {
        const cachePath = path.join(process.cwd(), "src/data/printful-products-cache.json");
        await fs.writeFile(cachePath, JSON.stringify({ data: enriched }, null, 2), "utf-8");
        console.log("Printful products cache file refreshed successfully.");
      } catch (writeError) {
        console.warn("Failed to write Printful products cache file:", writeError);
      }
    }

    // Update in-memory cache
    const cacheKey = fetchIds ? [...fetchIds].sort().join(",") : "all";
    cache = { data: enriched, timestamp: Date.now(), key: cacheKey };

    // If a subset was requested, filter it now
    let responseData = enriched;
    if (ids && ids.length > 0) {
      responseData = enriched.filter((p: any) => ids.includes(p.id));
    }

    return NextResponse.json({ data: responseData, revalidated: revalidate });
  } catch (error: unknown) {
    console.error("Printful products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", details: String(error) },
      { status: 500 }
    );
  }
}
