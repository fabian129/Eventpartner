import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { createOrder, type PrintfulOrderItem, type PrintfulRecipient } from '@/lib/printful';

// Lazy-init — avoid crash at build time when env var is missing
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY not configured');
  return new Resend(key);
}

/** Escape user input for safe HTML interpolation (null-safe) */
function esc(str: unknown): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Target emails — where form submissions land (comma-separated)
const TO_EMAILS = (process.env.CONTACT_EMAIL || 'pontus@eventpartner.io,malin@eventpartner.io,joakim@eventpartner.io,bookings@eventpartner.io')
  .split(',')
  .map((e) => e.trim());

const FROM_EMAIL = 'EventPartner <noreply@eventpartner.io>';
const CUSTOMER_FROM = 'EventPartner <bookings@eventpartner.io>';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    if (type === 'event-inquiry') {
      return handleEventInquiry(body);
    } else if (type === 'detailed-inquiry') {
      return handleDetailedInquiry(body);
    } else if (type === 'career-application') {
      return handleCareerApplication(body);
    } else if (type === 'support-inquiry') {
      return handleSupportInquiry(body);
    } else if (type === 'vip-inquiry') {
      return handleVIPInquiry(body);
    } else if (type === 'vpp-quote') {
      return handleVPPQuote(body);
    } else if (type === 'merch-quote') {
      return handleMerchQuote(body);
    } else if (type === 'newsletter') {
      return handleNewsletter(body);
    } else if (type === 'popup-lead') {
      return handlePopupLead(body);
    }

    return NextResponse.json({ error: 'Invalid form type' }, { status: 400 });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/* ── Event Inquiry Form ── */
async function handleEventInquiry(data: Record<string, any>) {
  const { company, contact, email, phone, country, city, eventType, guests, date, budget, responseTime, message, locale } = data;

  // Validation
  if (!company || !contact || !email || !phone || !country || !guests) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  // Server-side guard: past dates are invalid (client request P12).
  const todayStr = new Date().toISOString().split('T')[0];
  if (typeof date === 'object' && date !== null) {
    if ((date.from && date.from < todayStr) || (date.to && date.to < todayStr)) {
      return NextResponse.json(
        { error: locale === 'sv' ? 'Datumet kan inte ligga bakåt i tiden.' : 'The date cannot be in the past.' },
        { status: 400 }
      );
    }
  }

  // The form sends { from, to, flexibility } — show the dates whenever present.
  const dateInfo = typeof date === 'object' && date !== null
    ? (date.from || date.to)
      ? `${date.from || '—'} → ${date.to || '—'}${date.flexibility && date.flexibility !== 'Exact' ? ` (${date.flexibility})` : ''}`
      : `${date.month || '—'} (${date.flexibility || 'not specified'})`
    : date || 'Not specified';

  const { error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: TO_EMAILS,
    replyTo: email,
    subject: `🎯 New Event Inquiry — ${esc(company)}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background: linear-gradient(135deg, #111 0%, #1a1a1a 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
          <h1 style="color: #6AD8D2; font-size: 20px; margin: 0 0 4px;">New Event Inquiry</h1>
          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;">Received via eventpartner.io</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666; width: 140px;">Company</td>
            <td style="padding: 12px 0; font-weight: 600;">${esc(company)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666;">Contact</td>
            <td style="padding: 12px 0;">${esc(contact)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666;">Email</td>
            <td style="padding: 12px 0;"><a href="mailto:${esc(email)}" style="color: #6AD8D2;">${esc(email)}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666;">Phone</td>
            <td style="padding: 12px 0;">${esc(phone)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666;">Country</td>
            <td style="padding: 12px 0;">${esc(country)}</td>
          </tr>
          ${city ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">City</td><td style="padding: 12px 0;">${esc(city)}</td></tr>` : ''}
          ${eventType ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Event Type</td><td style="padding: 12px 0;">${esc(eventType)}</td></tr>` : ''}
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666;">Guests</td>
            <td style="padding: 12px 0; font-weight: 600;">${esc(String(guests))}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666;">Date</td>
            <td style="padding: 12px 0;">${esc(dateInfo)}</td>
          </tr>
          ${budget ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Budget</td><td style="padding: 12px 0;">${esc(budget)}</td></tr>` : ''}
          ${responseTime ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Response Time</td><td style="padding: 12px 0;">${esc(responseTime)}</td></tr>` : ''}
        </table>

        ${message ? `
          <div style="margin-top: 24px; padding: 20px; background: #f8f9fa; border-radius: 12px;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Message</p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${esc(message)}</p>
          </div>
        ` : ''}

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px; margin: 0;">Reply directly to this email to respond to ${esc(contact)} at ${esc(email)}</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  // Customer autoresponse
  try {
    const sv = locale === 'sv';
    await getResend().emails.send({
      from: CUSTOMER_FROM,
      to: email,
      subject: sv ? 'Tack för din förfrågan — EventPartner' : 'Thank you for your inquiry — EventPartner',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #111 0%, #1a1a1a 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px; text-align: center;">
            <h1 style="color: #6AD8D2; font-size: 22px; margin: 0 0 6px;">${sv ? 'Tack för din förfrågan!' : 'Thank you for your inquiry!'}</h1>
            <p style="color: rgba(255,255,255,0.55); font-size: 13px; margin: 0;">EventPartner</p>
          </div>
          <p style="font-size: 15px; line-height: 1.7; color: #222;">${sv ? `Hej ${esc(contact)},` : `Hi ${esc(contact)},`}</p>
          <p style="font-size: 15px; line-height: 1.7; color: #222;">
            ${sv
              ? `Tack för att du hörde av dig till oss gällande ett event för <strong>${esc(company)}</strong>. Vi har tagit emot din förfrågan och vårt team har redan börjat titta på den.`
              : `Thank you for reaching out to us regarding an event for <strong>${esc(company)}</strong>. We have received your inquiry and our team is already looking into it.`}
          </p>
          <div style="margin: 24px 0; padding: 16px 18px; background: #ecfdf5; border: 1px solid #6AD8D2; border-radius: 12px;">
            <p style="margin: 0; font-size: 14px; color: #0f766e; line-height: 1.6;">
              ${sv
                ? '⏱️ Vi återkommer till dig så snart som möjligt med mer information.'
                : "⏱️ We'll get back to you as soon as possible with more information."}
            </p>
          </div>
          <p style="font-size: 14px; line-height: 1.7; color: #555;">
            ${sv ? 'Har du frågor under tiden? Svara bara på detta mejl.' : 'Questions in the meantime? Just reply to this email.'}
          </p>
          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">${sv ? 'Med vänliga hälsningar,' : 'Best regards,'}<br/>EventPartner · eventpartner.io</p>
          </div>
        </div>
      `,
    });
  } catch (e) {
    console.error('Customer confirmation email failed:', e);
  }

  return NextResponse.json({ success: true });
}

/* ── VPP / Video Brochure Quote ── */
async function handleVPPQuote(data: Record<string, any>) {
  const { name, email, company, product, size, quantity, finish, message, address, country, locale } = data;

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: TO_EMAILS,
    replyTo: email,
    subject: `📦 Video Brochure Quote — ${esc(company || name)}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background: linear-gradient(135deg, #111 0%, #1a1a1a 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
          <h1 style="color: #6AD8D2; font-size: 20px; margin: 0 0 4px;">Video Brochure Quote Request</h1>
          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;">Received via eventpartner.io/shop</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666; width: 140px;">Name</td>
            <td style="padding: 12px 0; font-weight: 600;">${esc(name)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666;">Email</td>
            <td style="padding: 12px 0;"><a href="mailto:${esc(email)}" style="color: #6AD8D2;">${esc(email)}</a></td>
          </tr>
          ${company ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Company</td><td style="padding: 12px 0;">${esc(company)}</td></tr>` : ''}
          ${product ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Product</td><td style="padding: 12px 0; font-weight: 600;">${esc(product)}</td></tr>` : ''}
          ${size ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Size</td><td style="padding: 12px 0;">${esc(size)}</td></tr>` : ''}
          ${quantity ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Quantity</td><td style="padding: 12px 0;">${esc(String(quantity))}</td></tr>` : ''}
          ${finish ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Finish</td><td style="padding: 12px 0;">${esc(finish)}</td></tr>` : ''}
          ${address ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Address</td><td style="padding: 12px 0;">${esc(address)}</td></tr>` : ''}
          ${country ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Country</td><td style="padding: 12px 0;">${esc(country)}</td></tr>` : ''}
        </table>

        ${message ? `
          <div style="margin-top: 24px; padding: 20px; background: #f8f9fa; border-radius: 12px;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Additional Details</p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${esc(message)}</p>
          </div>
        ` : ''}
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  // Customer autoresponse
  try {
    const sv = locale === 'sv';
    await getResend().emails.send({
      from: CUSTOMER_FROM,
      to: email,
      subject: sv ? 'Tack för din beställning — EventPartner' : 'Thank you for your order — EventPartner',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #111 0%, #1a1a1a 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px; text-align: center;">
            <h1 style="color: #6AD8D2; font-size: 22px; margin: 0 0 6px;">${sv ? 'Tack för din förfrågan!' : 'Thank you for your inquiry!'}</h1>
            <p style="color: rgba(255,255,255,0.55); font-size: 13px; margin: 0;">EventPartner</p>
          </div>
          <p style="font-size: 15px; line-height: 1.7; color: #222;">${sv ? `Hej ${esc(name)},` : `Hi ${esc(name)},`}</p>
          <p style="font-size: 15px; line-height: 1.7; color: #222;">
            ${sv
              ? `Tack för din prisförfrågan gällande <strong>${esc(product)}</strong>. Vi har tagit emot din förfrågan och vårt team granskar den nu.`
              : `Thank you for your price inquiry regarding <strong>${esc(product)}</strong>. We have received your request and our team is currently reviewing it.`}
          </p>
          <div style="margin: 24px 0; padding: 16px 18px; background: #ecfdf5; border: 1px solid #6AD8D2; border-radius: 12px;">
            <p style="margin: 0; font-size: 14px; color: #0f766e; line-height: 1.6;">
              ${sv
                ? '⏱️ Vi återkommer till dig inom kort med en offert.'
                : "⏱️ We will get back to you shortly with a quote."}
            </p>
          </div>
          <p style="font-size: 14px; line-height: 1.7; color: #555;">
            ${sv ? 'Har du frågor under tiden? Svara bara på detta mejl.' : 'Questions in the meantime? Just reply to this email.'}
          </p>
          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">${sv ? 'Med vänliga hälsningar,' : 'Best regards,'}<br/>EventPartner · eventpartner.io</p>
          </div>
        </div>
      `,
    });
  } catch (e) {
    console.error('Customer confirmation email failed:', e);
  }

  return NextResponse.json({ success: true });
}

/* ── Merch / Printful Quote Request ── */
async function handleMerchQuote(data: Record<string, any>) {
  const { name, email, company, phone, message, items, totalQuantity, totalPrice, currency, locale } = data;

  if (!name || !email || !items?.length) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  // ── Create a Printful DRAFT order on the EP account ──
  // No payment is taken. The EP team finalises and confirms the order in Printful,
  // then sends the customer a quote/invoice. Degrades gracefully: if draft creation
  // fails we STILL send the quote email so the lead is never lost.
  const { address1, address2, city, zip, stateCode, countryCode } = data;

  const orderItems: PrintfulOrderItem[] = (items as any[]).flatMap((item) =>
    (item.sizes || [])
      .filter((s: any) => s.quantity > 0 && s.variantId)
      .map((s: any) => ({
        catalog_variant_id: s.variantId,
        quantity: s.quantity,
        ...(item.templateId ? { product_template_id: item.templateId } : {}),
      }))
  );

  let draftOrderId: number | null = null;
  let draftError: string | null = null;

  const hasShipping = Boolean(address1 && city && zip && countryCode);
  if (hasShipping && orderItems.length > 0) {
    try {
      const recipient: PrintfulRecipient = {
        name,
        company: company || undefined,
        address1,
        address2: address2 || undefined,
        city,
        state_code: stateCode || undefined,
        country_code: String(countryCode).toUpperCase(),
        zip,
        phone: phone || undefined,
        email,
      };
      const order = await createOrder(recipient, orderItems, {
        externalId: `EP-QUOTE-${Date.now()}`,
        confirm: false,
      });
      draftOrderId = order.id;
    } catch (err) {
      draftError = String(err);
      console.error('Printful draft creation failed:', err);
    }
  }

  const shipToLine = address1
    ? [address1, address2, [zip, city].filter(Boolean).join(' '), stateCode, countryCode]
        .filter(Boolean)
        .join(', ')
    : '';

  // Build product rows HTML
  const productRows = items.map((item: any) => {
    const sizeBreakdown = item.sizes
      .filter((s: any) => s.quantity > 0)
      .map((s: any) => `${s.size}: ${s.quantity}st`)
      .join(', ');
    
    const itemTotal = item.sizes.reduce((sum: number, s: any) => sum + s.quantity * s.price, 0);
    const itemQty = item.sizes.reduce((sum: number, s: any) => sum + s.quantity, 0);

    return `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 16px 12px;">
          <strong>${esc(item.productName || '')}</strong><br/>
          <span style="color: #888; font-size: 12px;">Color: ${esc(item.color || '')} · ${itemQty} items</span><br/>
          <span style="color: #666; font-size: 13px;">${esc(sizeBreakdown)}</span>
          ${item.templateId ? `<br/><span style="color: #6AD8D2; font-size: 12px;">Template ID: ${item.templateId}</span>` : ''}
        </td>
        <td style="padding: 16px 12px; text-align: right; font-weight: 600; white-space: nowrap;">
          ${new Intl.NumberFormat('sv-SE', { style: 'currency', currency: item.currency || 'USD', minimumFractionDigits: 0 }).format(itemTotal)}
        </td>
      </tr>
    `;
  }).join('');

  const formattedTotal = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 0,
  }).format(totalPrice || 0);

  const { error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: TO_EMAILS,
    replyTo: email,
    subject: `🛍️ Merch Quote Request — ${esc(company || name)} (${totalQuantity} items)`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background: linear-gradient(135deg, #111 0%, #1a1a1a 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
          <h1 style="color: #6AD8D2; font-size: 20px; margin: 0 0 4px;">Merch Quote Request</h1>
          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;">Received via eventpartner.io/shop</p>
        </div>

        ${draftOrderId ? `
          <div style="margin: 0 0 24px; padding: 14px 18px; background: #ecfdf5; border: 1px solid #6AD8D2; border-radius: 12px;">
            <p style="margin: 0; font-size: 13px; color: #0f766e; line-height: 1.5;">✅ Printful draft order <strong>#${draftOrderId}</strong> created on your account. Open <strong>Printful → Orders</strong> to review the design, complete shipping and place it, then send the customer a quote/invoice.</p>
          </div>
        ` : draftError ? `
          <div style="margin: 0 0 24px; padding: 14px 18px; background: #fef2f2; border: 1px solid #fca5a5; border-radius: 12px;">
            <p style="margin: 0; font-size: 13px; color: #b91c1c; line-height: 1.5;">⚠️ The Printful draft could not be created automatically — please create it manually from the details below. Reason: ${esc(draftError)}</p>
          </div>
        ` : ''}

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666; width: 120px;">Name</td>
            <td style="padding: 12px 0; font-weight: 600;">${esc(name)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666;">Email</td>
            <td style="padding: 12px 0;"><a href="mailto:${esc(email)}" style="color: #6AD8D2;">${esc(email)}</a></td>
          </tr>
          ${company ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Company</td><td style="padding: 12px 0;">${esc(company)}</td></tr>` : ''}
          ${phone ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Phone</td><td style="padding: 12px 0;">${esc(phone)}</td></tr>` : ''}
          ${shipToLine ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Ship to</td><td style="padding: 12px 0;">${esc(shipToLine)}</td></tr>` : ''}
        </table>

        <h2 style="font-size: 16px; color: #333; margin: 24px 0 12px;">Order Details</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; background: #f8f9fa; border-radius: 12px; overflow: hidden;">
          <thead>
            <tr style="background: #eee;">
              <th style="padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #666;">Product</th>
              <th style="padding: 12px; text-align: right; font-size: 12px; text-transform: uppercase; color: #666;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
          </tbody>
          <tfoot>
            <tr style="border-top: 2px solid #ddd;">
              <td style="padding: 16px 12px; font-weight: 700; font-size: 15px;">${totalQuantity} items total</td>
              <td style="padding: 16px 12px; text-align: right; font-weight: 700; font-size: 15px; color: #6AD8D2;">${formattedTotal}</td>
            </tr>
          </tfoot>
        </table>

        ${message ? `
          <div style="margin-top: 24px; padding: 20px; background: #f8f9fa; border-radius: 12px;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Message</p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${esc(message)}</p>
          </div>
        ` : ''}

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px; margin: 0;">Reply directly to this email to respond to ${esc(name)} at ${esc(email)}</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send quote request' }, { status: 500 });
  }

  // Customer thank-you / confirmation email (best-effort — never blocks the response)
  try {
    const sv = locale === 'sv';
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: sv ? 'Tack för din beställning — EventPartner' : 'Thank you for your order — EventPartner',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #111 0%, #1a1a1a 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px; text-align: center;">
            <h1 style="color: #6AD8D2; font-size: 22px; margin: 0 0 6px;">${sv ? 'Tack för din beställning!' : 'Thank you for your order!'}</h1>
            <p style="color: rgba(255,255,255,0.55); font-size: 13px; margin: 0;">EventPartner</p>
          </div>
          <p style="font-size: 15px; line-height: 1.7; color: #222;">${sv ? `Hej ${esc(name)},` : `Hi ${esc(name)},`}</p>
          <p style="font-size: 15px; line-height: 1.7; color: #222;">
            ${sv
              ? `Tack för din beställning hos EventPartner! Vi har tagit emot din förfrågan på <strong>${totalQuantity} ${totalQuantity === 1 ? 'artikel' : 'artiklar'}</strong> och vårt team granskar den nu.`
              : `Thank you for your order with EventPartner! We've received your request for <strong>${totalQuantity} ${totalQuantity === 1 ? 'item' : 'items'}</strong> and our team is reviewing it now.`}
          </p>
          <div style="margin: 24px 0; padding: 16px 18px; background: #ecfdf5; border: 1px solid #6AD8D2; border-radius: 12px;">
            <p style="margin: 0; font-size: 14px; color: #0f766e; line-height: 1.6;">
              ${sv
                ? '⏱️ Vi återkommer inom <strong>24 timmar</strong> med priser, bekräftelse och nästa steg.'
                : "⏱️ We'll get back to you within <strong>24 hours</strong> with pricing, confirmation and next steps."}
            </p>
          </div>
          <p style="font-size: 14px; line-height: 1.7; color: #555;">
            ${sv ? 'Har du frågor under tiden? Svara bara på detta mejl.' : 'Questions in the meantime? Just reply to this email.'}
          </p>
          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">${sv ? 'Med vänliga hälsningar,' : 'Best regards,'}<br/>EventPartner · eventpartner.io</p>
          </div>
        </div>
      `,
    });
  } catch (e) {
    console.error('Customer confirmation email failed:', e);
  }

  return NextResponse.json({ success: true, draftOrderId, draftError });
}

/* ── Newsletter Signup ── */
async function handleNewsletter(data: Record<string, any>) {
  const { email } = data;

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  // Send confirmation/welcome email
  const { error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: 'Welcome to EventPartner 🎉',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background: linear-gradient(135deg, #111 0%, #1a1a1a 100%); border-radius: 16px; padding: 32px; text-align: center;">
          <h1 style="color: #6AD8D2; font-size: 24px; margin: 0 0 8px;">Welcome! 🎉</h1>
          <p style="color: rgba(255,255,255,0.6); font-size: 15px; margin: 0;">You're now subscribed to EventPartner updates.</p>
        </div>
        <p style="color: #666; font-size: 14px; margin-top: 24px; line-height: 1.7;">
          Thank you for joining! You'll receive updates about new venues, event planning tips, and exclusive offers.
        </p>
      </div>
    `,
  });

  // Also notify the team
  await getResend().emails.send({
    from: FROM_EMAIL,
    to: TO_EMAILS,
    subject: `📬 New Newsletter Subscriber — ${email}`,
    html: `<p>New newsletter signup: <strong>${email}</strong></p>`,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

/* ── Detailed Event Inquiry (Customize Page) ── */
async function handleDetailedInquiry(data: Record<string, any>) {
  const {
    company, contact, email, phone, country, city,
    eventName, eventType, guests, startDate, endDate, budget,
    venueType, preferredLocation, requirements,
    cateringStyle, dietary,
    activities, activitiesDetails,
    singleRooms, doubleRooms,
    message, locale
  } = data;

  if (!company || !contact || !email || !phone || !country || !eventType || !guests || !startDate) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Server-side guard: past dates are invalid (client request P12).
  const todayIso = new Date().toISOString().split('T')[0];
  if ((startDate && startDate < todayIso) || (endDate && endDate < todayIso)) {
    return NextResponse.json(
      { error: locale === 'sv' ? 'Datumet kan inte ligga bakåt i tiden.' : 'The date cannot be in the past.' },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const activitiesStr = Array.isArray(activities) && activities.length > 0
    ? activities.map(a => esc(a)).join(', ')
    : 'None selected';

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <div style="background: linear-gradient(135deg, #111 0%, #1a1a1a 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
        <h1 style="color: #6AD8D2; font-size: 20px; margin: 0 0 4px;">Detailed Event Inquiry</h1>
        <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;">Received via eventpartner.io/customize</p>
      </div>

      <h2 style="font-size: 16px; color: #333; margin: 24px 0 12px; border-bottom: 2px solid #6AD8D2; padding-bottom: 6px;">Contact Information</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666; width: 150px;">Company</td><td style="padding: 10px 0; font-weight: 600;">${esc(company)}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666;">Contact Person</td><td style="padding: 10px 0; font-weight: 600;">${esc(contact)}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666;">Email</td><td style="padding: 10px 0;"><a href="mailto:${esc(email)}" style="color: #6AD8D2;">${esc(email)}</a></td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666;">Phone</td><td style="padding: 10px 0;">${esc(phone)}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666;">Country / City</td><td style="padding: 10px 0;">${esc(country)}${city ? ` / ${esc(city)}` : ''}</td></tr>
      </table>

      <h2 style="font-size: 16px; color: #333; margin: 24px 0 12px; border-bottom: 2px solid #6AD8D2; padding-bottom: 6px;">Event Details</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
        ${eventName ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666; width: 150px;">Event Name</td><td style="padding: 10px 0;">${esc(eventName)}</td></tr>` : ''}
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666; width: 150px;">Event Type</td><td style="padding: 10px 0;">${esc(eventType)}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666;">Guests</td><td style="padding: 10px 0; font-weight: 600;">${esc(String(guests))}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666;">Dates</td><td style="padding: 10px 0;">${esc(startDate)}${endDate ? ` → ${esc(endDate)}` : ''}</td></tr>
        ${budget ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666;">Budget</td><td style="padding: 10px 0;">${esc(budget)}</td></tr>` : ''}
        ${singleRooms ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666;">Single Rooms</td><td style="padding: 10px 0;">${esc(String(singleRooms))}</td></tr>` : ''}
        ${doubleRooms ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666;">Double Rooms</td><td style="padding: 10px 0;">${esc(String(doubleRooms))}</td></tr>` : ''}
      </table>

      <h2 style="font-size: 16px; color: #333; margin: 24px 0 12px; border-bottom: 2px solid #6AD8D2; padding-bottom: 6px;">Preferences & Requirements</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
        ${venueType ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666; width: 150px;">Venue Type</td><td style="padding: 10px 0;">${esc(venueType)}</td></tr>` : ''}
        ${preferredLocation ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666; width: 150px;">Preferred Location</td><td style="padding: 10px 0;">${esc(preferredLocation)}</td></tr>` : ''}
        ${requirements ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666; width: 150px;">Venue Requirements</td><td style="padding: 10px 0; white-space: pre-wrap;">${esc(requirements)}</td></tr>` : ''}
        ${cateringStyle ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666; width: 150px;">Catering Style</td><td style="padding: 10px 0;">${esc(cateringStyle)}</td></tr>` : ''}
        ${dietary ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666; width: 150px;">Dietary Prefs</td><td style="padding: 10px 0;">${esc(dietary)}</td></tr>` : ''}
      </table>

      <h2 style="font-size: 16px; color: #333; margin: 24px 0 12px; border-bottom: 2px solid #6AD8D2; padding-bottom: 6px;">Activities & Entertainment</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666; width: 150px;">Selected Activities</td><td style="padding: 10px 0;">${activitiesStr}</td></tr>
        ${activitiesDetails ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; color: #666;">Activity Details</td><td style="padding: 10px 0; white-space: pre-wrap;">${esc(activitiesDetails)}</td></tr>` : ''}
      </table>

      ${message ? `
        <div style="margin-top: 24px; padding: 20px; background: #f8f9fa; border-radius: 12px;">
          <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Anything Else?</p>
          <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${esc(message)}</p>
        </div>
      ` : ''}

      <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #999; font-size: 12px; margin: 0;">Reply directly to this email to respond to ${esc(contact)} at ${esc(email)}</p>
      </div>
    </div>
  `;

  const { error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: TO_EMAILS,
    replyTo: email,
    subject: `📋 Detailed Event Inquiry — ${esc(company)}`,
    html: htmlContent,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send detailed inquiry' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

/* ── Career Application ── */
async function handleCareerApplication(data: Record<string, any>) {
  const { name, email, phone, role, message, linkedIn } = data;

  if (!name || !email || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const linkVal = linkedIn || phone || '';
  const linkedInVal = linkVal
    ? linkVal.startsWith('http') || linkVal.includes('linkedin.com')
      ? `<a href="${esc(linkVal)}" style="color: #6AD8D2;">${esc(linkVal)}</a>`
      : esc(linkVal)
    : 'Not provided';

  const { error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: TO_EMAILS,
    replyTo: email,
    subject: `💼 Career Application: ${esc(role)} — ${esc(name)}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background: linear-gradient(135deg, #111 0%, #1a1a1a 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
          <h1 style="color: #6AD8D2; font-size: 20px; margin: 0 0 4px;">Career Application</h1>
          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;">Received via eventpartner.io/careers</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666; width: 140px;">Applicant Name</td><td style="padding: 12px 0; font-weight: 600;">${esc(name)}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Email</td><td style="padding: 12px 0;"><a href="mailto:${esc(email)}" style="color: #6AD8D2;">${esc(email)}</a></td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">LinkedIn</td><td style="padding: 12px 0;">${linkedInVal}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Role Applied For</td><td style="padding: 12px 0; font-weight: 600; color: #6AD8D2;">${esc(role)}</td></tr>
        </table>
        ${message ? `
          <div style="margin-top: 24px; padding: 20px; background: #f8f9fa; border-radius: 12px;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Cover Letter / Message</p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${esc(message)}</p>
          </div>
        ` : ''}
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send career application' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

/* ── Help Center Support Request ── */
async function handleSupportInquiry(data: Record<string, any>) {
  const { name, email, subject, message } = data;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: TO_EMAILS,
    replyTo: email,
    subject: `🛠️ Help Center Request: ${esc(subject)} — ${esc(name)}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background: linear-gradient(135deg, #111 0%, #1a1a1a 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
          <h1 style="color: #6AD8D2; font-size: 20px; margin: 0 0 4px;">Help Center Inquiry</h1>
          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;">Received via eventpartner.io/help</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666; width: 140px;">Name</td><td style="padding: 12px 0; font-weight: 600;">${esc(name)}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Email</td><td style="padding: 12px 0;"><a href="mailto:${esc(email)}" style="color: #6AD8D2;">${esc(email)}</a></td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Subject</td><td style="padding: 12px 0; font-weight: 600;">${esc(subject)}</td></tr>
        </table>
        <div style="margin-top: 24px; padding: 20px; background: #f8f9fa; border-radius: 12px;">
          <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Message</p>
          <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${esc(message)}</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send support inquiry' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

/* ── VIP Member Application ── */
async function handleVIPInquiry(data: Record<string, any>) {
  const { name, email, company, phone, message, locale } = data;

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: TO_EMAILS,
    replyTo: email,
    subject: `👑 VIP Member Application — ${esc(company || name)}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background: linear-gradient(135deg, #7851A9 0%, #111 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
          <h1 style="color: #fff; font-size: 20px; margin: 0 0 4px;">VIP Member Application</h1>
          <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 0;">Received via eventpartner.io/vip</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666; width: 140px;">Name</td><td style="padding: 12px 0; font-weight: 600;">${esc(name)}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Email</td><td style="padding: 12px 0;"><a href="mailto:${esc(email)}" style="color: #6AD8D2;">${esc(email)}</a></td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Company</td><td style="padding: 12px 0;">${esc(company || 'Not provided')}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Phone</td><td style="padding: 12px 0;">${esc(phone || 'Not provided')}</td></tr>
        </table>
        ${message ? `
          <div style="margin-top: 24px; padding: 20px; background: #f8f9fa; border-radius: 12px;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Message / Preferences</p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${esc(message)}</p>
          </div>
        ` : ''}
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send VIP application' }, { status: 500 });
  }

  // Customer autoresponse
  try {
    const sv = locale === 'sv';
    await getResend().emails.send({
      from: CUSTOMER_FROM,
      to: email,
      subject: sv ? 'Tack för din ansökan — EventPartner VIP' : 'Thank you for your application — EventPartner VIP',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #7851A9 0%, #111 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px; text-align: center;">
            <h1 style="color: #fff; font-size: 22px; margin: 0 0 6px;">${sv ? 'Tack för din ansökan!' : 'Thank you for your application!'}</h1>
            <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 0;">EventPartner VIP</p>
          </div>
          <p style="font-size: 15px; line-height: 1.7; color: #222;">${sv ? `Hej ${esc(name)},` : `Hi ${esc(name)},`}</p>
          <p style="font-size: 15px; line-height: 1.7; color: #222;">
            ${sv
              ? `Tack för din ansökan till EventPartner VIP. Vi har tagit emot din ansökan och vårt team granskar den nu.`
              : `Thank you for your application to EventPartner VIP. We have received your application and our team is currently reviewing it.`}
          </p>
          <div style="margin: 24px 0; padding: 16px 18px; background: #ecfdf5; border: 1px solid #7851A9; border-radius: 12px;">
            <p style="margin: 0; font-size: 14px; color: #7851A9; line-height: 1.6;">
              ${sv
                ? '⏱️ Vi återkommer till dig så snart som möjligt med besked om ditt medlemskap.'
                : "⏱️ We'll get back to you as soon as possible regarding your membership."}
            </p>
          </div>
          <p style="font-size: 14px; line-height: 1.7; color: #555;">
            ${sv ? 'Har du frågor under tiden? Svara bara på detta mejl.' : 'Questions in the meantime? Just reply to this email.'}
          </p>
          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">${sv ? 'Med vänliga hälsningar,' : 'Best regards,'}<br/>EventPartner VIP · eventpartner.io</p>
          </div>
        </div>
      `,
    });
  } catch (e) {
    console.error('Customer confirmation email failed:', e);
  }

  return NextResponse.json({ success: true });
}

/* ── Exit-Intent / Lead-Capture Popup ── */
async function handlePopupLead(data: Record<string, any>) {
  const { name, email, company, message, source } = data;

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const { error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: TO_EMAILS,
    replyTo: email,
    subject: `✨ New Lead — ${esc(company || name)}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background: linear-gradient(135deg, #111 0%, #1a1a1a 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
          <h1 style="color: #6AD8D2; font-size: 20px; margin: 0 0 4px;">New Lead</h1>
          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;">Captured via ${esc(source || 'eventpartner.io popup')}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666; width: 140px;">Name</td><td style="padding: 12px 0; font-weight: 600;">${esc(name)}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Email</td><td style="padding: 12px 0;"><a href="mailto:${esc(email)}" style="color: #6AD8D2;">${esc(email)}</a></td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Company</td><td style="padding: 12px 0;">${esc(company || 'Not provided')}</td></tr>
        </table>
        ${message ? `
          <div style="margin-top: 24px; padding: 20px; background: #f8f9fa; border-radius: 12px;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Message</p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${esc(message)}</p>
          </div>
        ` : ''}
        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px; margin: 0;">Reply directly to this email to respond to ${esc(name)} at ${esc(email)}</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send lead' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
