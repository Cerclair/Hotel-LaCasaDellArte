// PDFKit invoice generator - Server-side (Node.js)
// Replicates EXACT structure from invoice.ts with full image/font support
// Used for both email attachments and download button (via API)

import PDFDocument from 'pdfkit';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface BookingInvoiceData {
  reference: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  roomName: string;
  roomType: string;
  checkIn: Date | string | null;
  checkOut: Date | string | null;
  nights: number;
  adults: number;
  children: number;
  rate: number;
  total: number;
  paymentMethod: 'now' | 'counter';
  specialRequests?: string;
  generatedAt?: Date;
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', minimumFractionDigits: 0 }).format(value);

const formatDate = (dateInput: Date | string | null) => {
  if (!dateInput) return '—';
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
};

export async function generateInvoicePDFBuffer(data: BookingInvoiceData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      console.log('[PDFKit] Starting PDF generation for:', data.reference);

      const doc = new PDFDocument({ size: 'A4', margin: 40 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        console.log('[PDFKit] PDF generated successfully, size:', pdfBuffer.length, 'bytes');
        resolve(pdfBuffer);
      });
      doc.on('error', reject);

      const marginX = 40;
      const pageWidth = 595; // A4 width in points
      const pageHeight = 842; // A4 height in points
      let cursorY = 40;
      const headerRightX = 400;

      // Try to load custom Brittany Signature font
      let customFontLoaded = false;
      const fontPaths = [
        join(process.cwd(), 'lacasadellarte', 'public', 'fonts', 'BrittanySignature.ttf'),
        join(process.cwd(), 'public', 'fonts', 'BrittanySignature.ttf'),
        join(process.cwd(), 'lacasadellarte', 'public', 'assets', 'fonts', 'BrittanySignature.ttf'),
        join(process.cwd(), 'public', 'assets', 'fonts', 'BrittanySignature.ttf'),
      ];

      for (const fontPath of fontPaths) {
        if (existsSync(fontPath)) {
          try {
            doc.registerFont('BrittanySignature', fontPath);
            customFontLoaded = true;
            console.log('[PDFKit] Custom font loaded from:', fontPath);
            break;
          } catch (err) {
            console.warn('[PDFKit] Failed to load font from:', fontPath);
          }
        }
      }

      if (!customFontLoaded) {
        console.log('[PDFKit] Using fallback font (Times-Italic)');
      }

      // HEADER - Hotel name on the right
      doc.save();
      if (customFontLoaded) {
        doc.font('BrittanySignature').fontSize(22);
      } else {
        doc.font('Times-Italic').fontSize(22);
      }
      doc.fillColor('#D4AF37').text("La Casa Dell'Arte", headerRightX, cursorY + 24, { width: 155, align: 'left' });
      doc.restore();

      // Hotel contact details
      doc.font('Helvetica').fontSize(10).fillColor('#000000');
      doc.text('Galle Road, Colombo 03, Sri Lanka', headerRightX, cursorY + 52);
      doc.text('Tel: +94 718530994', headerRightX, cursorY + 66);
      doc.text('Email: ladellaarte@gmail.com', headerRightX, cursorY + 80);

      // Left side: Invoice title
      const generatedAt = data.generatedAt || new Date();
      doc.font('Helvetica-Bold').fontSize(20).fillColor('#000000');
      doc.text('Booking Invoice', marginX, cursorY + 24);
      doc.font('Helvetica').fontSize(10);
      doc.text(`Generated: ${generatedAt.toLocaleString()}`, marginX, cursorY + 40);
      doc.text(`Reference: ${data.reference}`, marginX, cursorY + 54);

      cursorY += 110;

      // Guest Details Section
      doc.fontSize(14).font('Helvetica-Bold');
      doc.text('Guest Details', marginX, cursorY);
      doc.fontSize(11).font('Helvetica');
      cursorY += 18;

      const guestLines = [
        `Name: ${(data.firstName + ' ' + data.lastName).trim() || '—'}`,
        `Email: ${data.email || '—'}`,
      ];
      if (data.phone) guestLines.push(`Phone: ${data.phone}`);
      if (data.country) guestLines.push(`Country: ${data.country}`);
      guestLines.push(`Guests: ${data.adults} Adult${data.adults !== 1 ? 's' : ''}${data.children > 0 ? ', ' + data.children + ' Child' + (data.children !== 1 ? 'ren' : '') : ''}`);
      guestLines.push(`Payment Method: ${data.paymentMethod === 'counter' ? 'Pay at Counter' : 'Paid Online'}`);

      guestLines.forEach(line => {
        doc.text(line, marginX, cursorY);
        cursorY += 14;
      });

      cursorY += 10;

      // Booking Summary Table
      doc.fontSize(14).font('Helvetica-Bold');
      doc.text('Booking Summary', marginX, cursorY);
      cursorY += 20;

      // Smart room type combination (exact same logic as invoice.ts)
      const roomLabel = (data.roomName || '').trim();
      const typeLabel = (data.roomType || '').trim();
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

      // Table header
      const tableTop = cursorY;
      const col1X = marginX;
      const col2X = 200;
      const col3X = 290;
      const col4X = 380;
      const col5X = 440;
      const col6X = 500;

      doc.rect(marginX, tableTop, pageWidth - 2 * marginX, 24).fillAndStroke('#8B7355', '#8B7355');
      doc.fontSize(10).font('Helvetica-Bold').fillColor('#FFFFFF');
      doc.text('Room Type', col1X + 5, tableTop + 8, { width: 145, continued: false });
      doc.text('Check-in', col2X, tableTop + 8, { width: 80 });
      doc.text('Check-out', col3X, tableTop + 8, { width: 80 });
      doc.text('Nights', col4X, tableTop + 8, { width: 50 });
      doc.text('Rate', col5X, tableTop + 8, { width: 50 });
      doc.text('Total', col6X, tableTop + 8, { width: 55, align: 'right' });

      // Table row
      const rowTop = tableTop + 25;
      doc.rect(marginX, rowTop, pageWidth - 2 * marginX, 24).fillAndStroke('#FAFAEF', '#8B7355');
      doc.fontSize(10).font('Helvetica').fillColor('#000000');
      doc.text(roomTypeCombined, col1X + 5, rowTop + 8, { width: 145 });
      doc.text(formatDate(data.checkIn), col2X, rowTop + 8, { width: 80 });
      doc.text(formatDate(data.checkOut), col3X, rowTop + 8, { width: 80 });
      doc.text(String(data.nights || 1), col4X, rowTop + 8, { width: 50 });
      doc.text(formatPrice(data.rate || 0), col5X, rowTop + 8, { width: 50 });
      doc.text(formatPrice(data.total || 0), col6X, rowTop + 8, { width: 55, align: 'right' });

      cursorY = rowTop + 40;

      // Special Requests
      if (data.specialRequests && data.specialRequests.trim()) {
        doc.fontSize(12).font('Helvetica-Bold');
        doc.text('Special Requests', marginX, cursorY);
        doc.fontSize(10).font('Helvetica');
        cursorY += 16;
        doc.text(data.specialRequests, marginX, cursorY, { width: 515 });
        cursorY = doc.y + 10;
      }

      // Notes & Policies
      doc.fontSize(12).font('Helvetica-Bold');
      doc.text('Notes', marginX, cursorY);
      doc.fontSize(10).font('Helvetica');
      cursorY += 16;
      const notes = [
        'Please present this invoice and a valid ID at check-in.',
        'Free cancellation up to 48 hours before check-in unless otherwise stated.',
        'For questions, contact support at ladellaarte@gmail.com.'
      ];
      notes.forEach(note => {
        doc.text(note, marginX, cursorY, { width: 515 });
        cursorY = doc.y + 4;
      });

      // Footer positioning
      const footerBottomMargin = 40;
      const pageFooterY = pageHeight - footerBottomMargin - 60;

      // PAID WATERMARK (if paid online)
      if (data.paymentMethod === 'now') {
        const imagePaths = [
          join(process.cwd(), 'lacasadellarte', 'public', 'logo', 'paid-stamp.png'),
          join(process.cwd(), 'public', 'logo', 'paid-stamp.png'),
          join(process.cwd(), 'lacasadellarte', 'public', 'assets', 'paid-stamp.png'),
          join(process.cwd(), 'public', 'assets', 'paid-stamp.png'),
        ];

        let imageAdded = false;
        for (const imgPath of imagePaths) {
          if (existsSync(imgPath)) {
            try {
              const gapTop = cursorY + 8;
              const gapBottom = pageFooterY - 10;
              const availableH = Math.max(0, gapBottom - gapTop);

              if (availableH > 30) {
                const targetMaxW = Math.floor(pageWidth * 0.6);
                const targetMaxH = Math.floor(availableH * 0.8);
                const x = (pageWidth - targetMaxW) / 2;
                const y = gapTop + Math.max(0, Math.floor((availableH - targetMaxH) / 2));
                doc.image(imgPath, x, y, { width: targetMaxW, height: targetMaxH, opacity: 0.3 });
                imageAdded = true;
                console.log('[PDFKit] PAID stamp image added');
                break;
              }
            } catch (err) {
              console.warn('[PDFKit] Failed to load PAID stamp:', err);
            }
          }
        }

        // Fallback to text watermark
        if (!imageAdded) {
          const gapTop = cursorY + 8;
          const gapBottom = pageFooterY - 10;
          const availableH = Math.max(0, gapBottom - gapTop);
          if (availableH > 30) {
            doc.fontSize(80).font('Helvetica-Bold').fillColor('#8C8C8C').opacity(0.3);
            const yMid = gapTop + Math.floor(availableH / 2);
            doc.text('PAID', pageWidth / 2 - 80, yMid);
            doc.opacity(1).fillColor('#000000');
            console.log('[PDFKit] PAID text watermark added');
          }
        }
      }

      // Footer
      doc.fontSize(9).fillColor('#828282');
      doc.text(`© ${new Date().getFullYear()} La Casa Dell'Arte`, marginX, pageFooterY);
      doc.text('Galle Road, Colombo 03, Sri Lanka', marginX, pageFooterY + 14);
      doc.text('Tel: +94 718530994 | Email: ladellaarte@gmail.com', marginX, pageFooterY + 28);
      doc.text('Generated electronically', marginX, pageFooterY + 42);

      // Footer logo
      const logoPaths = [
        join(process.cwd(), 'lacasadellarte', 'public', 'logo', 'logo-removebg.png'),
        join(process.cwd(), 'public', 'logo', 'logo-removebg.png'),
      ];

      for (const logoPath of logoPaths) {
        if (existsSync(logoPath)) {
          try {
            const maxLogoW = 140;
            const maxLogoH = 60;
            const x = pageWidth - marginX - maxLogoW;
            const y = pageFooterY - 6;
            doc.image(logoPath, x, y, { width: maxLogoW, height: maxLogoH });
            console.log('[PDFKit] Footer logo added');
            break;
          } catch (err) {
            console.warn('[PDFKit] Failed to load logo:', err);
          }
        }
      }

      doc.end();
    } catch (error) {
      console.error('[PDFKit] Generation error:', error);
      reject(error);
    }
  });
}
