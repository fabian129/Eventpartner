import { NextResponse } from "next/server";
import { createOrder, type PrintfulRecipient, type PrintfulOrderItem } from "@/lib/printful";

/**
 * POST /api/printful/order
 *
 * Body: {
 *   recipient: { name, company?, address1, city, country_code, zip, phone?, email? },
 *   items: [{ catalog_variant_id, quantity, product_template_id? }],
 *   confirm?: boolean  (default: false — creates as draft)
 * }
 *
 * Returns created order with ID and status.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recipient, items, confirm = false } = body as {
      recipient: PrintfulRecipient;
      items: PrintfulOrderItem[];
      confirm?: boolean;
    };

    // Validate required fields
    if (!recipient?.name || !recipient?.address1 || !recipient?.city || !recipient?.country_code || !recipient?.zip) {
      return NextResponse.json(
        { error: "Missing required recipient fields: name, address1, city, country_code, zip" },
        { status: 400 }
      );
    }

    if (!items?.length) {
      return NextResponse.json(
        { error: "Order must contain at least one item" },
        { status: 400 }
      );
    }

    const order = await createOrder(recipient, items, {
      externalId: `EP-${Date.now()}`,
      confirm,
    });

    return NextResponse.json({ data: order });
  } catch (error: unknown) {
    console.error("Printful order error:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: String(error) },
      { status: 500 }
    );
  }
}
