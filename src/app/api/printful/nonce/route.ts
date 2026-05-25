import { NextResponse } from "next/server";

/**
 * POST /api/printful/nonce
 * Generates a nonce token for the Printful Embedded Design Maker.
 * Must be called from the backend to keep the API key secure.
 */
export async function POST() {
  const apiKey = process.env.PRINTFUL_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Printful API key not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      "https://api.printful.com/embedded-designer/nonces",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
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
    // The response shape may vary — handle both v1 and v2 formats
    const nonce = data?.data?.nonce || data?.result?.nonce;
    const expiresAt = data?.data?.expires_at || data?.result?.expires_at;

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
