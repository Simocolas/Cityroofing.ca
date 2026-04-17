import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, serviceType, address, message } = (await req.json()) as {
      name: string;
      phone: string;
      email: string;
      serviceType: string;
      address?: string;
      message?: string;
    };

    if (!name || !phone || !email || !serviceType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString('en-CA', {
      timeZone: 'America/Edmonton',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    const serviceLabels: Record<string, string> = {
      'roof-replacement': 'Roof Replacement',
      'roof-repair': 'Roof Repair',
      'siding': 'Siding',
      'commercial': 'Commercial Roofing',
      'other': 'Other',
    };

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
  <div style="border-left: 4px solid #C0392B; padding-left: 20px; margin-bottom: 32px;">
    <h1 style="font-size: 22px; font-weight: 800; margin: 0 0 4px;">New Estimate Request</h1>
    <p style="color: #666; font-size: 14px; margin: 0;">Submitted via calgarycityroofing.ca</p>
  </div>

  <table style="width: 100%; border-collapse: collapse;">
    <tr style="border-bottom: 1px solid #e5e5e5;">
      <td style="padding: 12px 0; font-weight: 700; font-size: 13px; color: #666; width: 140px; text-transform: uppercase; letter-spacing: 0.5px;">Name</td>
      <td style="padding: 12px 0; font-size: 16px;">${name}</td>
    </tr>
    <tr style="border-bottom: 1px solid #e5e5e5;">
      <td style="padding: 12px 0; font-weight: 700; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Phone</td>
      <td style="padding: 12px 0; font-size: 16px;"><a href="tel:${phone}" style="color: #C0392B; text-decoration: none;">${phone}</a></td>
    </tr>
    <tr style="border-bottom: 1px solid #e5e5e5;">
      <td style="padding: 12px 0; font-weight: 700; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
      <td style="padding: 12px 0; font-size: 16px;"><a href="mailto:${email}" style="color: #C0392B; text-decoration: none;">${email}</a></td>
    </tr>
    <tr style="border-bottom: 1px solid #e5e5e5;">
      <td style="padding: 12px 0; font-weight: 700; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Service</td>
      <td style="padding: 12px 0; font-size: 16px;">${serviceLabels[serviceType] ?? serviceType}</td>
    </tr>
    ${address ? `
    <tr style="border-bottom: 1px solid #e5e5e5;">
      <td style="padding: 12px 0; font-weight: 700; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Address</td>
      <td style="padding: 12px 0; font-size: 16px;">${address}</td>
    </tr>` : ''}
    ${message ? `
    <tr style="border-bottom: 1px solid #e5e5e5;">
      <td style="padding: 12px 0; font-weight: 700; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">Message</td>
      <td style="padding: 12px 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</td>
    </tr>` : ''}
    <tr>
      <td style="padding: 12px 0; font-weight: 700; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Submitted</td>
      <td style="padding: 12px 0; font-size: 14px; color: #666;">${timestamp} (Mountain Time)</td>
    </tr>
  </table>
</body>
</html>`;

    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'info@calgarycityroofing.com',
      subject: `New Estimate Request — ${name}`,
      html,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[contact]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
