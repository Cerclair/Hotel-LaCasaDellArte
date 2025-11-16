import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { generateInvoicePDFBuffer } from '@/lib/invoice-pdfkit';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      specialRequests,
      roomName,
      roomType,
      checkIn,
      checkOut,
      adults,
      children,
      nights,
      price,
      totalPrice,
      paymentOption,
      bookingReference,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !roomName || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format helpers
    const formatPrice = (value: number) =>
      new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 0,
      }).format(value);

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    };

    // Generate PDF invoice using PDFKit (same template as download button)
    let pdfBuffer: Buffer | null = null;
    try {
      console.log('[Email API] Starting PDF generation with PDFKit...');
      pdfBuffer = await generateInvoicePDFBuffer({
        reference: bookingReference,
        firstName,
        lastName,
        email,
        phone,
        country,
        roomName,
        roomType,
        checkIn,
        checkOut,
        nights,
        adults,
        children,
        rate: price,
        total: totalPrice,
        paymentMethod: paymentOption,
        specialRequests,
      });
      console.log('[Email API] PDF generated successfully with PDFKit');
    } catch (pdfError) {
      console.error('[Email API] PDF generation error:', pdfError);
      // Continue without PDF attachment if generation fails
    }

    // Load images for email HTML (CID embedding)
    let logoBuffer: Buffer | null = null;
    let paidStampBuffer: Buffer | null = null;

    // Try to load hotel logo
    const logoPaths = [
      join(process.cwd(), 'lacasadellarte', 'public', 'logo', 'logo-removebg.png'),
      join(process.cwd(), 'public', 'logo', 'logo-removebg.png'),
    ];
    for (const logoPath of logoPaths) {
      if (existsSync(logoPath)) {
        try {
          logoBuffer = readFileSync(logoPath);
          console.log('[Email API] Logo loaded from:', logoPath);
          break;
        } catch (err) {
          console.warn('[Email API] Failed to load logo from:', logoPath);
        }
      }
    }

    // Try to load PAID stamp (only if payment is online)
    if (paymentOption === 'now') {
      const paidStampPaths = [
        join(process.cwd(), 'lacasadellarte', 'public', 'logo', 'paid-stamp.png'),
        join(process.cwd(), 'public', 'logo', 'paid-stamp.png'),
      ];
      for (const stampPath of paidStampPaths) {
        if (existsSync(stampPath)) {
          try {
            paidStampBuffer = readFileSync(stampPath);
            console.log('[Email API] PAID stamp loaded from:', stampPath);
            break;
          } catch (err) {
            console.warn('[Email API] Failed to load PAID stamp from:', stampPath);
          }
        }
      }
    }

    // Smart room type combination (exact same logic as PDF)
    const roomLabel = (roomName || '').trim();
    const typeLabel = (roomType || '').trim();
    const normalize = (s: string) =>
      s
        .toLowerCase()
        .replace(/[\u2013\u2014-]/g, ' ')
        .replace(/\brooms?\b/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    let roomTypeCombined = '—';
    if (roomLabel && typeLabel) {
      const nRoom = normalize(roomLabel);
      const nType = normalize(typeLabel);
      const similar = nRoom === nType || nRoom.includes(nType) || nType.includes(nRoom);
      if (similar) {
        roomTypeCombined = roomLabel;
      } else {
        roomTypeCombined = `${roomLabel} — ${typeLabel}`;
      }
    } else {
      roomTypeCombined = roomLabel || typeLabel || '—';
    }

    // Invoice-style HTML email template (matches PDF layout exactly)
    const invoiceEmailHTML = `
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
            .invoice-container {
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
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            th {
              background-color: #8B7355;
              color: #ffffff;
              padding: 8px;
              text-align: left;
              font-size: 10px;
              font-weight: bold;
            }
            td {
              background-color: #FAFAEF;
              padding: 8px;
              border-top: 1px solid #8B7355;
              font-size: 10px;
              color: #000000;
            }
            td:last-child, th:last-child {
              text-align: right;
            }
            .watermark {
              text-align: center;
              font-size: 80px;
              font-weight: bold;
              color: rgba(140, 140, 140, 0.3);
              margin: 40px 0;
              padding: 20px 0;
            }
            .notes {
              margin-top: 20px;
            }
            .notes-title {
              font-size: 12px;
              font-weight: bold;
              color: #000000;
              margin-bottom: 10px;
            }
            .notes p {
              margin: 8px 0;
              font-size: 10px;
              color: #000000;
              line-height: 1.6;
            }
            .footer {
              margin-top: 60px;
              font-size: 9px;
              color: #828282;
            }
            .footer p {
              margin: 4px 0;
            }
            .logo-image {
              max-width: 140px;
              max-height: 60px;
              margin-top: 10px;
            }
            .paid-stamp-image {
              max-width: 60%;
              max-height: 200px;
              opacity: 0.3;
              display: block;
              margin: 40px auto;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <!-- Header -->
            <div class="header">
              <div class="header-left">
                <h1>Booking Invoice</h1>
                <p>Generated: ${new Date().toLocaleString()}</p>
                <p>Reference: ${bookingReference}</p>
              </div>
              <div class="header-right">
                <div class="hotel-name">La Casa Dell'Arte</div>
                <p>Galle Road, Colombo 03, Sri Lanka</p>
                <p>Tel: +94 718530994</p>
                <p>Email: ladellaarte@gmail.com</p>
                ${logoBuffer ? '<img src="cid:hotel-logo" alt="La Casa Dell\'Arte" class="logo-image" />' : ''}
              </div>
            </div>

            <!-- Guest Details -->
            <div class="section">
              <div class="section-title">Guest Details</div>
              <div class="info-row">Name: ${firstName} ${lastName}</div>
              <div class="info-row">Email: ${email}</div>
              ${phone ? `<div class="info-row">Phone: ${phone}</div>` : ''}
              ${country ? `<div class="info-row">Country: ${country}</div>` : ''}
              <div class="info-row">Guests: ${adults} Adult${adults !== 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children !== 1 ? 'ren' : ''}` : ''}</div>
              <div class="info-row">Payment Method: ${paymentOption === 'counter' ? 'Pay at Counter' : 'Paid Online'}</div>
            </div>

            <!-- Booking Summary -->
            <div class="section">
              <div class="section-title">Booking Summary</div>
              <table>
                <thead>
                  <tr>
                    <th>Room Type</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Nights</th>
                    <th>Rate</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${roomTypeCombined}</td>
                    <td>${formatDate(checkIn)}</td>
                    <td>${formatDate(checkOut)}</td>
                    <td>${nights}</td>
                    <td>${formatPrice(price)}</td>
                    <td>${formatPrice(totalPrice)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            ${specialRequests && specialRequests.trim() ? `
              <div class="section">
                <div class="section-title">Special Requests</div>
                <div class="info-row">${specialRequests}</div>
              </div>
            ` : ''}

            <!-- Notes -->
            <div class="notes">
              <div class="notes-title">Notes</div>
              <p>Please present this invoice and a valid ID at check-in.</p>
              <p>Free cancellation up to 48 hours before check-in unless otherwise stated.</p>
              <p>For questions, contact support at ladellaarte@gmail.com.</p>
            </div>

            ${paymentOption === 'now' ? (paidStampBuffer ? '<img src="cid:paid-stamp" alt="PAID" class="paid-stamp-image" />' : '<div class="watermark">PAID</div>') : ''}

            <!-- Footer -->
            <div class="footer">
              <p>© ${new Date().getFullYear()} La Casa Dell'Arte</p>
              <p>Galle Road, Colombo 03, Sri Lanka</p>
              <p>Tel: +94 718530994 | Email: ladellaarte@gmail.com</p>
              <p>Generated electronically</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Build attachments array with PDF, logo, and PAID stamp
    const attachments = [];

    // Add PDF invoice
    if (pdfBuffer) {
      attachments.push({
        filename: `Invoice-${bookingReference}.pdf`,
        content: pdfBuffer,
      });
    }

    // Add hotel logo for CID embedding
    if (logoBuffer) {
      attachments.push({
        filename: 'logo.png',
        content: logoBuffer,
        content_id: 'hotel-logo',
      });
    }

    // Add PAID stamp for CID embedding (only if paid online)
    if (paidStampBuffer && paymentOption === 'now') {
      attachments.push({
        filename: 'paid-stamp.png',
        content: paidStampBuffer,
        content_id: 'paid-stamp',
      });
    }

    // Send email to hotel with attachments
    const { data, error } = await resend.emails.send({
      from: 'La Casa DellArte <onboarding@resend.dev>',
      to: ['tharanabope30@gmail.com'], // Test mode
      replyTo: email,
      subject: `New Booking - ${bookingReference} - ${firstName} ${lastName}`,
      html: invoiceEmailHTML,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send confirmation email to guest with same attachments
    await resend.emails.send({
      from: 'La Casa DellArte <onboarding@resend.dev>',
      to: ['tharanabope30@gmail.com'], // Test mode
      subject: `Booking Confirmation - ${bookingReference}`,
      html: invoiceEmailHTML,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return NextResponse.json(
      { message: 'Emails sent successfully', data },
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
