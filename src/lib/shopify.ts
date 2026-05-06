/**
 * Shopify Storefront API Client
 * 
 * Headless commerce integration using the Storefront API.
 * All product display and cart operations go through this client.
 */

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;

const STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2026-04/graphql.json`;

// ─── Types ──────────────────────────────────────────────────────
export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyPrice;
  compareAtPrice: ShopifyPrice | null;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  productType: string;
  tags: string[];
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  variants: ShopifyProductVariant[];
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
      featuredImage: ShopifyImage | null;
    };
    price: ShopifyPrice;
    selectedOptions: { name: string; value: string }[];
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyPrice;
    totalAmount: ShopifyPrice;
    totalTaxAmount: ShopifyPrice | null;
  };
  lines: ShopifyCartLine[];
}

// ─── GraphQL Client ─────────────────────────────────────────────
async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const res = await fetch(STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify API error (${res.status}): ${text}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

// ─── Fragments ──────────────────────────────────────────────────
const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    productType
    tags
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
  }
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
                handle
                featuredImage {
                  url
                  altText
                  width
                  height
                }
              }
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;

// ─── Queries ────────────────────────────────────────────────────
export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct & { images: { edges: { node: ShopifyImage }[] }; variants: { edges: { node: ShopifyProductVariant }[] } } }[] };
  }>({ query, variables: { first } });

  return data.products.edges.map((edge) => ({
    ...edge.node,
    images: edge.node.images.edges.map((e) => e.node),
    variants: edge.node.variants.edges.map((e) => e.node),
  }));
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        ...ProductFields
      }
    }
  `;

  const data = await shopifyFetch<{
    productByHandle: (ShopifyProduct & { images: { edges: { node: ShopifyImage }[] }; variants: { edges: { node: ShopifyProductVariant }[] } }) | null;
  }>({ query, variables: { handle } });

  if (!data.productByHandle) return null;

  return {
    ...data.productByHandle,
    images: data.productByHandle.images.edges.map((e) => e.node),
    variants: data.productByHandle.variants.edges.map((e) => e.node),
  };
}

// ─── Cart Mutations ─────────────────────────────────────────────
export async function createCart(): Promise<ShopifyCart> {
  const query = `
    ${CART_FRAGMENT}
    mutation CreateCart {
      cartCreate {
        cart {
          ...CartFields
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart & { lines: { edges: { node: ShopifyCartLine }[] } } };
  }>({ query });

  return {
    ...data.cartCreate.cart,
    lines: data.cartCreate.cart.lines.edges.map((e) => e.node),
  };
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1,
  attributes?: { key: string; value: string }[]
): Promise<ShopifyCart> {
  const query = `
    ${CART_FRAGMENT}
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }
  `;

  const lineInput: Record<string, unknown> = { merchandiseId: variantId, quantity };
  if (attributes && attributes.length > 0) {
    lineInput.attributes = attributes;
  }

  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart & { lines: { edges: { node: ShopifyCartLine }[] } } };
  }>({
    query,
    variables: {
      cartId,
      lines: [lineInput],
    },
  });

  return {
    ...data.cartLinesAdd.cart,
    lines: data.cartLinesAdd.cart.lines.edges.map((e) => e.node),
  };
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const query = `
    ${CART_FRAGMENT}
    mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart & { lines: { edges: { node: ShopifyCartLine }[] } } };
  }>({
    query,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
  });

  return {
    ...data.cartLinesUpdate.cart,
    lines: data.cartLinesUpdate.cart.lines.edges.map((e) => e.node),
  };
}

export async function removeFromCart(
  cartId: string,
  lineId: string
): Promise<ShopifyCart> {
  const query = `
    ${CART_FRAGMENT}
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart & { lines: { edges: { node: ShopifyCartLine }[] } } };
  }>({
    query,
    variables: {
      cartId,
      lineIds: [lineId],
    },
  });

  return {
    ...data.cartLinesRemove.cart,
    lines: data.cartLinesRemove.cart.lines.edges.map((e) => e.node),
  };
}

// ─── Helpers ────────────────────────────────────────────────────
export function formatPrice(price: ShopifyPrice): string {
  const amount = parseFloat(price.amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currencyCode,
  }).format(amount);
}
