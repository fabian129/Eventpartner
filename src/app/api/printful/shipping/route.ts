import { NextResponse } from "next/server";
import { getShippingRates } from "@/lib/printful";

/**
 * POST /api/printful/shipping
 *
 * Body: {
 *   recipient: { country_code, state_code?, city, zip },
 *   items: [{ catalog_variant_id, quantity }]
 * }
 *
 * Returns available shipping options with rates and delivery times.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recipient, items } = body;

    if (!recipient?.country_code || !items?.length) {
      return NextResponse.json(
        { error: "Missing recipient.country_code or items" },
        { status: 400 }
      );
    }

    const rates = await getShippingRates(recipient, items);

    return NextResponse.json({ data: rates });
  } catch (error: unknown) {
    console.error("Printful shipping error:", error);
    return NextResponse.json(
      { error: "Failed to fetch shipping rates", details: String(error) },
      { status: 500 }
    );
  }
}
