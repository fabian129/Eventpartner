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
 * Printful v2 returns: { data: { variants: [{ id, techniques: [{ technique_key, price }] }] } }
 */
export async function getCatalogPrices(
  productId: number
): Promise<Record<number, { price: string; currency: string }>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await printfulFetch<any>(
    `/v2/catalog-products/${productId}/prices`
  );

  const priceMap: Record<number, { price: string; currency: string }> = {};

  // Printful v2 returns different shapes — handle all known ones
  // Shape A: { data: { variants: [...] } }
  // Shape B: { data: [...] }  (array of variants directly)
  // Shape C: { result: [...] }  (legacy v1 shape)
  let variants: { id: number; techniques?: { price: string; discounted_price?: string }[] }[] = [];

  if (raw.data?.variants && Array.isArray(raw.data.variants)) {
    variants = raw.data.variants;
  } else if (Array.isArray(raw.data)) {
    variants = raw.data;
  } else if (raw.result && Array.isArray(raw.result)) {
    variants = raw.result;
  }

  if (variants.length === 0) {
    console.warn(
      `[Printful] No price variants found for product ${productId}. Response keys: ${JSON.stringify(Object.keys(raw))}, data keys: ${raw.data ? JSON.stringify(Object.keys(raw.data)).slice(0, 200) : "null"}`
    );
  }

  for (const variant of variants) {
    if (variant.techniques && variant.techniques.length > 0) {
      const tech = variant.techniques[0];
      priceMap[variant.id] = {
        price: tech.discounted_price || tech.price,
        currency: "USD",
      };
    }
  }

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
