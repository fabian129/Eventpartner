import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Lazy-init — avoid crash at build time when env var is missing
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY not configured');
  return new Resend(key);
}

// Target emails — where form submissions land (comma-separated)
const TO_EMAILS = (process.env.CONTACT_EMAIL || 'info@eventpartner.io')
  .split(',')
  .map((e) => e.trim());

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    if (type === 'event-inquiry') {
      return handleEventInquiry(body);
    } else if (type === 'vpp-quote') {
      return handleVPPQuote(body);
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
    from: 'EventPartner <onboarding@resend.dev>',
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
    from: 'EventPartner <onboarding@resend.dev>',
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

/* ── Newsletter Signup ── */
async function handleNewsletter(data: Record<string, any>) {
  const { email } = data;

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  // Send confirmation/welcome email
  const { error } = await getResend().emails.send({
    from: 'EventPartner <onboarding@resend.dev>',
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
    from: 'EventPartner <onboarding@resend.dev>',
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
