import { NextResponse } from "next/server";

/**
 * POST /api/printful/nonce
 * Body: { externalProductId: string }
 * Generates a nonce token for the Printful Embedded Design Maker.
 */
export async function POST(req: Request) {
  const apiKey = process.env.PRINTFUL_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Printful API key not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const externalProductId = body.externalProductId || `ep-${Date.now()}`;

    const response = await fetch(
      "https://api.printful.com/embedded-designer/nonces",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          external_product_id: externalProductId,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Printful nonce error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to generate nonce", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    // Response shape: { result: { nonce: { nonce, expires_at, ... } } }
    const nonceData = data?.result?.nonce || data?.data?.nonce;
    const nonce = typeof nonceData === "string" ? nonceData : nonceData?.nonce;
    const expiresAt = nonceData?.expires_at;

    if (!nonce) {
      console.error("Printful nonce: unexpected response shape", JSON.stringify(data).slice(0, 500));
      return NextResponse.json(
        { error: "Unexpected nonce response", raw: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ nonce, expires_at: expiresAt });
  } catch (error) {
    console.error("Printful nonce error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
