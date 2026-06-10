/**
 * Printful API Client
 *
 * Server-side helpers for Printful v2 API.
 * Used by API routes — never imported on the client.
 */

const PRINTFUL_API = "https://api.printful.com";

function headers(): Record<string, string> {
  const key = process.env.PRINTFUL_API_KEY;
  if (!key) throw new Error("PRINTFUL_API_KEY is not configured");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...(process.env.PRINTFUL_STORE_ID
      ? { "X-PF-Store-Id": process.env.PRINTFUL_STORE_ID }
      : {}),
  };
}

// ─── Types ──────────────────────────────────────────────────────

export interface PrintfulColor {
  name: string;
  hex: string;
}

export interface PrintfulVariant {
  id: number;
  product_id: number;
  name: string;
  size: string;
  color: string;
  color_code: string;
  image: string;
  price: string;
  in_stock: boolean;
}

export interface PrintfulProduct {
  id: number;
  type: string;
  name: string;
  brand: string | null;
  model: string;
  image: string;
  variant_count: number;
  is_discontinued: boolean;
  description: string;
  sizes: string[];
  colors: PrintfulColor[];
  techniques: { key: string; display_name: string; is_default: boolean }[];
}

export interface PrintfulShippingRate {
  id: string;
  name: string;
  rate: string;
  currency: string;
  min_delivery_days: number;
  max_delivery_days: number;
  min_delivery_date: string;
  max_delivery_date: string;
}

export interface PrintfulOrderItem {
  catalog_variant_id: number;
  quantity: number;
  /** Set when using a saved design template */
  product_template_id?: number;
}

export interface PrintfulRecipient {
  name: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state_code?: string;
  country_code: string;
  zip: string;
  phone?: string;
  email?: string;
}

// ─── Generic fetch helper with retry ────────────────────────────

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function printfulFetch<T>(
  path: string,
  options?: RequestInit,
  retries = 3
): Promise<T> {
  const url = `${PRINTFUL_API}${path}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(url, {
      ...options,
      headers: { ...headers(), ...options?.headers },
    });

    if (res.status === 429 && attempt < retries) {
      // Rate limited — wait and retry with exponential backoff
      const waitMs = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
      console.warn(`Printful rate limited on ${path}, retrying in ${waitMs}ms...`);
      await delay(waitMs);
      continue;
    }

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Printful API error (${res.status}): ${text}`);
    }

    return res.json();
  }

  throw new Error(`Printful API: max retries exceeded for ${path}`);
}

// ─── Catalog ────────────────────────────────────────────────────

/**
 * Fetch catalog products. Optionally filter by IDs.
 */
export async function getCatalogProducts(
  ids?: number[]
): Promise<PrintfulProduct[]> {
  const path = "/v2/catalog-products?limit=100";
  if (ids && ids.length > 0) {
    // Fetch sequentially with small delays to stay under rate limit
    const results: PrintfulProduct[] = [];
    for (const id of ids) {
      const r = await printfulFetch<{ data: PrintfulProduct }>(
        `/v2/catalog-products/${id}`
      );
      results.push(r.data);
      await delay(150);
    }
    return results;
  }

  const data = await printfulFetch<{
    data: PrintfulProduct[];
    paging: { total: number };
  }>(path);
  return data.data;
}

/**
 * Fetch a single catalog product with full details.
 */
export async function getCatalogProduct(
  productId: number
): Promise<PrintfulProduct> {
  const data = await printfulFetch<{ data: PrintfulProduct }>(
    `/v2/catalog-products/${productId}`
  );
  return data.data;
}

/**
 * Fetch all variants for a catalog product.
 */
export async function getCatalogVariants(
  productId: number
): Promise<PrintfulVariant[]> {
  const data = await printfulFetch<{ data: PrintfulVariant[] }>(
    `/v2/catalog-products/${productId}/catalog-variants`
  );
  return data.data;
}

/**
 * Fetch prices for a catalog product, grouped by variant.
 * Printful v2 returns: { data: { currency, variants: [{ id, techniques }], product: { placements } } }
 * Note: prices endpoint may only return a subset of variants (paginated).
 * We return whatever we get + a special __base entry with the first available price.
 */
export async function getCatalogPrices(
  productId: number
): Promise<Record<number, { price: string; currency: string }>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await printfulFetch<any>(
    `/v2/catalog-products/${productId}/prices`
  );

  const priceMap: Record<number, { price: string; currency: string }> = {};
  const currency = raw.data?.currency || "USD";

  // Extract variant prices
  let variants: { id: number; techniques?: { price: string; discounted_price?: string }[] }[] = [];

  if (raw.data?.variants && Array.isArray(raw.data.variants)) {
    variants = raw.data.variants;
  } else if (Array.isArray(raw.data)) {
    variants = raw.data;
  } else if (raw.result && Array.isArray(raw.result)) {
    variants = raw.result;
  }

  // Find the base price from first variant's first technique (DTG preferred)
  let basePrice = "0";
  for (const variant of variants) {
    if (variant.techniques && variant.techniques.length > 0) {
      // Prefer DTG (direct-to-garment) as the default technique
      const dtg = variant.techniques.find((t: any) => t.technique_key === "dtg");
      const tech = dtg || variant.techniques[0];
      const price = tech.discounted_price || tech.price;
      if (price && price !== "0" && price !== "0.00") {
        basePrice = price;
        break;
      }
    }
  }

  for (const variant of variants) {
    if (variant.techniques && variant.techniques.length > 0) {
      const dtg = variant.techniques.find((t: any) => t.technique_key === "dtg");
      const tech = dtg || variant.techniques[0];
      priceMap[variant.id] = {
        price: tech.discounted_price || tech.price,
        currency,
      };
    }
  }

  // Store base price under a magic key so the route can use it as fallback
  priceMap[-1] = { price: basePrice, currency };

  return priceMap;
}

// ─── Shipping ───────────────────────────────────────────────────

/**
 * Get shipping rates for a set of items to a destination.
 */
export async function getShippingRates(
  recipient: Pick<PrintfulRecipient, "country_code" | "state_code" | "city" | "zip">,
  items: { catalog_variant_id: number; quantity: number }[]
): Promise<PrintfulShippingRate[]> {
  const data = await printfulFetch<{ data: PrintfulShippingRate[] }>(
    "/v2/shipping-rates",
    {
      method: "POST",
      body: JSON.stringify({
        recipient,
        order_items: items.map((item) => ({
          source: "catalog",
          catalog_variant_id: item.catalog_variant_id,
          quantity: item.quantity,
        })),
      }),
    }
  );
  return data.data;
}

// ─── Orders ─────────────────────────────────────────────────────

/**
 * Estimate costs for an order (without creating it).
 */
export async function estimateOrderCosts(
  recipient: PrintfulRecipient,
  items: PrintfulOrderItem[]
): Promise<{
  costs: { subtotal: string; shipping: string; tax: string; total: string };
  retail_costs: { subtotal: string; shipping: string; tax: string; total: string };
}> {
  const data = await printfulFetch<{
    result: {
      costs: { subtotal: string; shipping: string; tax: string; total: string };
      retail_costs: { subtotal: string; shipping: string; tax: string; total: string };
    };
  }>("/orders/estimate-costs", {
    method: "POST",
    body: JSON.stringify({
      recipient,
      items: items.map((item) => ({
        variant_id: item.catalog_variant_id,
        quantity: item.quantity,
      })),
    }),
  });
  return data.result;
}

/**
 * Create an order on Printful.
 * Set confirm=true to auto-confirm (charges your account).
 */
export async function createOrder(
  recipient: PrintfulRecipient,
  items: PrintfulOrderItem[],
  options?: { externalId?: string; confirm?: boolean }
): Promise<{ id: number; status: string; external_id: string | null }> {
  const confirm = options?.confirm ?? false;
  const data = await printfulFetch<{
    data: { id: number; status: string; external_id: string | null };
  }>(`/v2/orders${confirm ? "?confirm=true" : ""}`, {
    method: "POST",
    body: JSON.stringify({
      external_id: options?.externalId || `EP-${Date.now()}`,
      recipient,
      order_items: items.map((item) => ({
        source: item.product_template_id ? "product_template" : "catalog",
        ...(item.product_template_id
          ? { product_template_id: item.product_template_id }
          : {}),
        catalog_variant_id: item.catalog_variant_id,
        quantity: item.quantity,
      })),
    }),
  });
  return data.data;
}

// ─── Store / sync products (v1 — not available in API v2) ───────
//
// Printful's published "store products" (the ones EventPartner designs in
// "My products" and clicks Publish on) live ONLY in the v1 API. The shop
// catalog is driven by these so Malin controls the product range from
// Printful — no code change needed to add/remove a product.

export interface StoreProductVariant {
  /** Catalog variant id — used by the EDM designer + as the order line. */
  id: number;
  /** Sync variant id — used to order the saved EP design as-is. */
  sync_variant_id: number;
  /** Underlying catalog product id. */
  product_id: number;
  name: string;
  size: string;
  color: string;
  color_code: string;
  image: string;
  /** Retail price set on the product in Printful. */
  price: string;
  currency: string;
  in_stock: boolean;
}

export interface StoreProduct {
  /** Sync (store) product id. */
  id: number;
  name: string;
  /** EP design mockup thumbnail. */
  image: string;
  description: string;
  /** Catalog product id the design sits on (for the EDM designer). */
  catalog_product_id: number | null;
  variants: StoreProductVariant[];
  availableColors: PrintfulColor[];
  availableSizes: string[];
}

interface V1SyncListItem {
  id: number;
  name: string;
  thumbnail_url: string;
  variants: number;
  synced: number;
  is_ignored: boolean;
}

interface V1SyncVariant {
  id: number;
  variant_id: number; // catalog variant id
  retail_price: string | null;
  currency?: string;
  name: string;
  size?: string;
  color?: string;
  product?: { variant_id: number; product_id: number; image: string; name: string };
  files?: { type: string; preview_url?: string }[];
}

/**
 * Fetch EventPartner's published store products (v1 sync products), mapped to
 * the same shape the shop UI already consumes. Cross-references catalog
 * variants for clean size/colour/image data and keeps the EP mockup as the
 * card image.
 */
export async function getStoreSyncProducts(): Promise<StoreProduct[]> {
  const list = await printfulFetch<{ result: V1SyncListItem[] }>(
    "/store/products?limit=100"
  );
  const items = (list.result || []).filter((p) => !p.is_ignored);

  const products = await Promise.all(
    items.map(async (item): Promise<StoreProduct | null> => {
      try {
        const detail = await printfulFetch<{
          result: { sync_product: V1SyncListItem; sync_variants: V1SyncVariant[] };
        }>(`/store/products/${item.id}`);

        const syncVariants = detail.result?.sync_variants || [];
        const catalogProductId = syncVariants[0]?.product?.product_id ?? null;

        // Cross-reference catalog variants for clean size/colour/image.
        let catalogMap = new Map<number, PrintfulVariant>();
        if (catalogProductId) {
          try {
            const cv = await getCatalogVariants(catalogProductId);
            catalogMap = new Map(cv.map((v) => [v.id, v]));
          } catch {
            /* fall back to sync data below */
          }
        }

        const variants: StoreProductVariant[] = syncVariants
          .filter((sv) => sv.variant_id)
          .map((sv) => {
            const cat = catalogMap.get(sv.variant_id);
            // Prefer the generated mockup (garment WITH the EP design) over the
            // blank catalog photo. The mockup is the "preview"-type file.
            const previewFile =
              sv.files?.find((f) => f.type === "preview" && f.preview_url) ||
              sv.files?.find((f) => f.preview_url);
            return {
              id: sv.variant_id,
              sync_variant_id: sv.id,
              product_id: catalogProductId ?? 0,
              name: sv.name,
              size: sv.size || cat?.size || sv.name.split("/").pop()?.trim() || "",
              color: sv.color || cat?.color || "",
              color_code: cat?.color_code || "#0e0e0e",
              image: previewFile?.preview_url || cat?.image || sv.product?.image || "",
              price: sv.retail_price || cat?.price || "0",
              currency: sv.currency || "USD",
              in_stock: true,
            };
          });

        const colorMap = new Map<string, PrintfulColor>();
        for (const v of variants) {
          if (v.color && !colorMap.has(v.color)) {
            colorMap.set(v.color, { name: v.color, hex: v.color_code });
          }
        }
        const sizes = [...new Set(variants.map((v) => v.size).filter(Boolean))];

        return {
          id: item.id,
          name: item.name,
          // Prefer the product's primary thumbnail (the image Printful shows in
          // "My products" — a clean flat/ghost for standard garments). The list
          // endpoint's thumbnail can be null right after publish, so read the
          // detail endpoint's value first.
          image:
            detail.result?.sync_product?.thumbnail_url ||
            item.thumbnail_url ||
            variants[0]?.image ||
            "",
          description: "",
          catalog_product_id: catalogProductId,
          variants,
          availableColors: [...colorMap.values()],
          availableSizes: sizes,
        };
      } catch (e) {
        console.warn(`Failed to load sync product ${item.id}:`, e);
        return null;
      }
    })
  );

  return products.filter(
    (p): p is StoreProduct => p !== null && p.variants.length > 0
  );
}

// ─── Helpers ────────────────────────────────────────────────────

export function formatPrintfulPrice(
  amount: string | number,
  currency = "USD"
): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
}
