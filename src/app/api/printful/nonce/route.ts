import { NextResponse } from "next/server";

export async function POST() {
  const apiKey = process.env.PRINTFUL_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Printful API key not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch("https://api.printful.com/embed/nonces", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scopes: ["creator"],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Printful nonce error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to generate nonce", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      nonce: data.result.nonce,
      expires_at: data.result.expires_at,
    });
  } catch (error) {
    console.error("Printful nonce error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
