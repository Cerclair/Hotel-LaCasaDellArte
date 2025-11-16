import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, tierName } = body;

    // Validate required fields
    if (!name || !email || !phone || !tierName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Load hotel logo for email
    let logoBuffer: Buffer | null = null;
    const logoPaths = [
      join(process.cwd(), 'lacasadellarte', 'public', 'logo', 'logo-removebg.png'),
      join(process.cwd(), 'public', 'logo', 'logo-removebg.png'),
    ];
    for (const logoPath of logoPaths) {
      if (existsSync(logoPath)) {
        try {
          logoBuffer = readFileSync(logoPath);
          console.log('[Loyalty Email] Logo loaded from:', logoPath);
          break;
        } catch (err) {
          console.warn('[Loyalty Email] Failed to load logo from:', logoPath);
        }
      }
    }

    // Build attachments array
    const attachments = [];

    // Add hotel logo for CID embedding (must be base64 string with contentId)
    if (logoBuffer) {
      attachments.push({
        filename: 'logo.png',
        content: logoBuffer.toString('base64'),
        contentId: 'hotel-logo',
      });
    }

    // Send email to hotel
    // Note: In test mode, Resend only allows sending to the verified email (tharanabope30@gmail.com)
    // Once you verify a domain, you can send to any email address
    const { data, error } = await resend.emails.send({
      from: 'La Casa DellArte <onboarding@resend.dev>', // Use your verified domain in production
      to: ['tharanabope30@gmail.com'], // Resend test mode: can only send to your verified email
      replyTo: email, // Guest email will be in reply-to
      subject: `New Loyalty Program Member - ${tierName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">
            <style>
              body {
                font-family: Helvetica, Arial, sans-serif;
                font-size: 10px;
                color: #000000;
                background-color: #ffffff;
                margin: 0;
                padding: 40px;
                line-height: 1.4;
              }
              .container {
                max-width: 595px;
                margin: 0 auto;
                background-color: #ffffff;
              }
              .header {
                display: table;
                width: 100%;
                margin-bottom: 30px;
              }
              .header-left {
                display: table-cell;
                width: 50%;
                vertical-align: top;
              }
              .header-right {
                display: table-cell;
                width: 50%;
                text-align: right;
                vertical-align: top;
              }
              .header-left h1 {
                font-size: 20px;
                font-weight: bold;
                margin: 24px 0 10px 0;
                color: #000000;
              }
              .header-left p {
                margin: 4px 0;
                font-size: 10px;
                color: #000000;
              }
              .hotel-name {
                font-family: 'Great Vibes', cursive;
                font-size: 24px;
                font-weight: normal;
                font-style: normal;
                color: #D4AF37;
                margin: 24px 0 14px 0;
              }
              .header-right p {
                margin: 4px 0;
                font-size: 10px;
                color: #000000;
              }
              .section {
                margin-bottom: 20px;
              }
              .section-title {
                font-size: 14px;
                font-weight: bold;
                color: #000000;
                margin: 30px 0 12px 0;
              }
              .info-row {
                margin: 8px 0;
                font-size: 11px;
                color: #000000;
              }
              .tier-badge {
                display: inline-block;
                background-color: #D4AF37;
                color: white;
                padding: 10px 24px;
                border-radius: 20px;
                font-weight: bold;
                font-size: 14px;
                margin-top: 10px;
              }
              .action-note {
                background-color: #FAFAEF;
                padding: 15px;
                border-left: 4px solid #D4AF37;
                border-radius: 4px;
                margin-top: 20px;
              }
              .action-note p {
                margin: 0;
                color: #8B7355;
                font-style: italic;
                font-size: 12px;
              }
              .footer {
                margin-top: 60px;
                font-size: 9px;
                color: #828282;
                display: table;
                width: 100%;
              }
              .footer-content {
                display: table-cell;
                vertical-align: bottom;
                width: 60%;
              }
              .footer-logo {
                display: table-cell;
                vertical-align: bottom;
                width: 40%;
                text-align: right;
              }
              .footer p {
                margin: 4px 0;
              }
              .logo-image {
                max-width: 140px;
                max-height: 60px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <!-- Header -->
              <div class="header">
                <div class="header-left">
                  <h1>New Loyalty Member</h1>
                  <p>Generated: ${new Date().toLocaleString()}</p>
                  <p>Membership Request</p>
                </div>
                <div class="header-right">
                  <div class="hotel-name">La Casa Dell'Arte</div>
                  <p>Galle Road, Colombo 03, Sri Lanka</p>
                  <p>Tel: +94 718530994</p>
                  <p>Email: ladellaarte@gmail.com</p>
                </div>
              </div>

              <!-- Member Information -->
              <div class="section">
                <div class="section-title">Member Information</div>
                <div class="info-row"><strong>Full Name:</strong> ${name}</div>
                <div class="info-row"><strong>Email:</strong> ${email}</div>
                <div class="info-row"><strong>Phone:</strong> ${phone}</div>
              </div>

              <!-- Requested Tier -->
              <div class="section">
                <div class="section-title">Requested Membership Tier</div>
                <span class="tier-badge">${tierName}</span>
              </div>

              <!-- Action Required -->
              <div class="action-note">
                <p><strong>Action Required:</strong> Please process this membership request and contact the member at the provided email or phone number to complete the enrollment.</p>
              </div>

              <!-- Footer -->
              <div class="footer">
                <div class="footer-content">
                  <p>© ${new Date().getFullYear()} La Casa Dell'Arte</p>
                  <p>Galle Road, Colombo 03, Sri Lanka</p>
                  <p>Tel: +94 718530994 | Email: ladellaarte@gmail.com</p>
                  <p>Where Hospitality and Artistry Unite</p>
                </div>
                <div class="footer-logo">
                  ${logoBuffer ? '<img src="cid:hotel-logo" alt="La Casa Dell\'Arte" class="logo-image" />' : ''}
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
