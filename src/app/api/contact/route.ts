import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Lazy-init — avoid crash at build time when env var is missing
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY not configured');
  return new Resend(key);
}

/** Escape user input for safe HTML interpolation */
function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Target emails — where form submissions land (comma-separated)
const TO_EMAILS = (process.env.CONTACT_EMAIL || 'pontus@eventpartner.io,malin@eventpartner.io,joakim@eventpartner.io')
  .split(',')
  .map((e) => e.trim());

const FROM_EMAIL = 'EventPartner <noreply@eventpartner.io>';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    if (type === 'event-inquiry') {
      return handleEventInquiry(body);
    } else if (type === 'vpp-quote') {
      return handleVPPQuote(body);
    } else if (type === 'merch-quote') {
      return handleMerchQuote(body);
    } else if (type === 'newsletter') {
      return handleNewsletter(body);
    }

    return NextResponse.json({ error: 'Invalid form type' }, { status: 400 });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/* ── Event Inquiry Form ── */
async function handleEventInquiry(data: Record<string, any>) {
  const { company, contact, email, phone, country, city, eventType, guests, date, budget, responseTime, message } = data;

  // Validation
  if (!company || !contact || !email || !phone || !country || !guests) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const dateInfo = typeof date === 'object'
    ? date.mode === 'exact'
      ? `${date.from || '—'} → ${date.to || '—'}`
      : `${date.month || '—'} (${date.flexibility || 'not specified'})`
    : date || 'Not specified';

  const { error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: TO_EMAILS,
    replyTo: email,
    subject: `🎯 New Event Inquiry — ${company}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background: linear-gradient(135deg, #111 0%, #1a1a1a 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
          <h1 style="color: #6AD8D2; font-size: 20px; margin: 0 0 4px;">New Event Inquiry</h1>
          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;">Received via eventpartner.se</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666; width: 140px;">Company</td>
            <td style="padding: 12px 0; font-weight: 600;">${company}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666;">Contact</td>
            <td style="padding: 12px 0;">${contact}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666;">Email</td>
            <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #6AD8D2;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666;">Phone</td>
            <td style="padding: 12px 0;">${phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666;">Country</td>
            <td style="padding: 12px 0;">${country}</td>
          </tr>
          ${city ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">City</td><td style="padding: 12px 0;">${city}</td></tr>` : ''}
          ${eventType ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Event Type</td><td style="padding: 12px 0;">${eventType}</td></tr>` : ''}
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666;">Guests</td>
            <td style="padding: 12px 0; font-weight: 600;">${guests}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666;">Date</td>
            <td style="padding: 12px 0;">${dateInfo}</td>
          </tr>
          ${budget ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Budget</td><td style="padding: 12px 0;">${budget}</td></tr>` : ''}
          ${responseTime ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Response Time</td><td style="padding: 12px 0;">${responseTime}</td></tr>` : ''}
        </table>

        ${message ? `
          <div style="margin-top: 24px; padding: 20px; background: #f8f9fa; border-radius: 12px;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Message</p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
        ` : ''}

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px; margin: 0;">Reply directly to this email to respond to ${contact} at ${email}</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

/* ── VPP / Video Brochure Quote ── */
async function handleVPPQuote(data: Record<string, any>) {
  const { name, email, company, product, size, quantity, paper, finish, message } = data;

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: TO_EMAILS,
    replyTo: email,
    subject: `📦 Video Brochure Quote — ${company || name}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="background: linear-gradient(135deg, #111 0%, #1a1a1a 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
          <h1 style="color: #6AD8D2; font-size: 20px; margin: 0 0 4px;">Video Brochure Quote Request</h1>
          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;">Received via eventpartner.se/shop</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666; width: 140px;">Name</td>
            <td style="padding: 12px 0; font-weight: 600;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666;">Email</td>
            <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #6AD8D2;">${email}</a></td>
          </tr>
          ${company ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Company</td><td style="padding: 12px 0;">${company}</td></tr>` : ''}
          ${product ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Product</td><td style="padding: 12px 0; font-weight: 600;">${product}</td></tr>` : ''}
          ${size ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Size</td><td style="padding: 12px 0;">${size}</td></tr>` : ''}
          ${quantity ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Quantity</td><td style="padding: 12px 0;">${quantity}</td></tr>` : ''}
          ${paper ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Paper Type</td><td style="padding: 12px 0;">${paper}</td></tr>` : ''}
          ${finish ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666;">Finish</td><td style="padding: 12px 0;">${finish}</td></tr>` : ''}
        </table>

        ${message ? `
          <div style="margin-top: 24px; padding: 20px; background: #f8f9fa; border-radius: 12px;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Additional Details</p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
        ` : ''}
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

/* ── Merch / Printful Quote Request ── */
async function handleMerchQuote(data: Record<string, any>) {
  const { name, email, company, phone, message, items, totalQuantity, totalPrice, currency } = data;

  if (!name || !email || !items?.length) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

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
          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;">Received via eventpartner.se/shop</p>
        </div>

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

  return NextResponse.json({ success: true });
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
