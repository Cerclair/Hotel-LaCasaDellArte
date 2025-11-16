// Server-side invoice PDF generator using jsPDF with Node.js file system
// This EXACTLY replicates invoice.ts structure but uses fs instead of fetch/FileReader

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
  checkIn: string | Date | null;
  checkOut: string | Date | null;
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
  console.log('[Invoice Server] Starting PDF generation for:', data.reference);

  // Dynamic import jsPDF for Node.js
  const { jsPDF } = await import('jspdf');
  const autoTableModule = await import('jspdf-autotable');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const autoTableFn = (autoTableModule as any).default || (autoTableModule as any).autoTable;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = new jsPDF({ unit: 'pt', format: 'a4' }) as any;
  const marginX = 40;
  let cursorY = 40;
  const headerRightX = 400;

  // Page dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const footerBottomMargin = 40;
  const pageFooterY = pageHeight - footerBottomMargin - 60;

  console.log('[Invoice Server] Loading custom font...');

  // Try to load Brittany Signature font from file system
  let hasBrittanySignature = false;
  const fontPaths = [
    join(process.cwd(), 'lacasadellarte', 'public', 'fonts', 'BrittanySignature.ttf'),
    join(process.cwd(), 'public', 'fonts', 'BrittanySignature.ttf'),
    join(process.cwd(), 'lacasadellarte', 'public', 'assets', 'fonts', 'BrittanySignature.ttf'),
    join(process.cwd(), 'public', 'assets', 'fonts', 'BrittanySignature.ttf'),
  ];

  for (const fontPath of fontPaths) {
    if (existsSync(fontPath)) {
      try {
        const fontBuffer = readFileSync(fontPath);
        const fontBase64 = fontBuffer.toString('base64');

        if (doc.addFileToVFS && doc.addFont) {
          const vfsName = 'BrittanySignature.ttf';
          const fontName = 'Brittany Signature';
          doc.addFileToVFS(vfsName, fontBase64);
          doc.addFont(vfsName, fontName, 'normal');
          hasBrittanySignature = true;
          console.log('[Invoice Server] Custom font loaded from:', fontPath);
          break;
        }
      } catch (err) {
        console.warn('[Invoice Server] Failed to load font from:', fontPath, err);
      }
    }
  }

  if (!hasBrittanySignature) {
    console.log('[Invoice Server] Using fallback font (Times-Italic)');
  }

  // HEADER - Hotel name on the right
  if (hasBrittanySignature) {
    doc.setFont('Brittany Signature', 'normal');
  } else {
    doc.setFont('times', 'italic');
  }
  doc.setFontSize(22);
  doc.setTextColor(212, 175, 55); // Brand gold #D4AF37
  doc.text("La Casa Dell'Arte", headerRightX, cursorY + 24);

  // Reset and add contact details
  doc.setTextColor(0);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Galle Road, Colombo 03, Sri Lanka', headerRightX, cursorY + 52);
  doc.text('Tel: +94 718530994', headerRightX, cursorY + 66);
  doc.text('Email: ladellaarte@gmail.com', headerRightX, cursorY + 80);

  // Left side: Invoice title
  const generatedAt = data.generatedAt || new Date();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('Booking Invoice', marginX, cursorY + 24);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Generated: ${generatedAt.toLocaleString()}`, marginX, cursorY + 40);
  doc.text(`Reference: ${data.reference}`, marginX, cursorY + 54);

  cursorY += 80;

  // Guest Details Section
  cursorY += 30;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Guest Details', marginX, cursorY);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
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

  // Booking Summary Table
  cursorY += 10;
  if (autoTableFn) {
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

    autoTableFn(doc, {
      startY: cursorY,
      head: [['Room Type', 'Check-in', 'Check-out', 'Nights', 'Rate', 'Total']],
      body: [[
        roomTypeCombined,
        formatDate(data.checkIn),
        formatDate(data.checkOut),
        String(data.nights || 1),
        formatPrice(data.rate || 0),
        formatPrice(data.total || 0),
      ]],
      styles: { font: 'helvetica', fontSize: 10 },
      headStyles: { fillColor: [139, 115, 85] }, // warm brown #8B7355
      alternateRowStyles: { fillColor: [250, 250, 239] }, // beige #FAFAEF
      margin: { left: marginX, right: marginX },
    });
  }

  if (doc.lastAutoTable && typeof doc.lastAutoTable.finalY === 'number') {
    cursorY = doc.lastAutoTable.finalY + 30;
  }

  // Special Requests (if any)
  if (data.specialRequests && data.specialRequests.trim()) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Special Requests', marginX, cursorY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    cursorY += 16;
    const requestLines = doc.splitTextToSize(data.specialRequests, 515);
    requestLines.forEach((line: string) => {
      doc.text(line, marginX, cursorY);
      cursorY += 14;
    });
    cursorY += 10;
  }

  // Notes & Policies
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Notes', marginX, cursorY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  cursorY += 16;
  const notes = [
    'Please present this invoice and a valid ID at check-in.',
    'Free cancellation up to 48 hours before check-in unless otherwise stated.',
    'For questions, contact support at ladellaarte@gmail.com.'
  ];
  const lineHeight = 14;
  notes.forEach(note => {
    const split = doc.splitTextToSize(note, 515);
    split.forEach((sub: string) => {
      doc.text(sub, marginX, cursorY);
      cursorY += lineHeight;
    });
    cursorY += 4;
  });

  // PAID WATERMARK (if paid online) - using text only for fast generation
  if (data.paymentMethod === 'now') {
    console.log('[Invoice Server] Adding PAID watermark...');
    const gapTop = cursorY + 8;
    const gapBottom = pageFooterY - 10;
    const availableH = Math.max(0, gapBottom - gapTop);
    if (availableH > 30) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(140);
      doc.setFontSize(80);
      const yMid = gapTop + Math.floor(availableH / 2);
      doc.text('PAID', pageWidth / 2 - 40, yMid);
      doc.setTextColor(0);
      console.log('[Invoice Server] PAID watermark added (text)');
    }
  }

  // Footer
  doc.setFontSize(9);
  doc.setTextColor(130);
  doc.text(`© ${new Date().getFullYear()} La Casa Dell'Arte`, marginX, pageFooterY);
  doc.text('Galle Road, Colombo 03, Sri Lanka', marginX, pageFooterY + 14);
  doc.text('Tel: +94 718530994 | Email: ladellaarte@gmail.com', marginX, pageFooterY + 28);
  doc.text('Generated electronically', marginX, pageFooterY + 42);

  // Footer logo on the right with preserved aspect ratio
  console.log('[Invoice Server] Loading footer logo...');
  const logoPaths = [
    join(process.cwd(), 'lacasadellarte', 'public', 'logo', 'logo-removebg.png'),
    join(process.cwd(), 'public', 'logo', 'logo-removebg.png'),
  ];

  let logoAdded = false;
  for (const logoPath of logoPaths) {
    if (existsSync(logoPath)) {
      try {
        const maxLogoW = 140;
        const maxLogoH = 60;

        // Read logo file and convert to base64
        const logoBuffer = readFileSync(logoPath);
        const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

        // Use image-size package to get dimensions without loading canvas
        try {
          const sizeOf = (await import('image-size')).default;
          const dimensions = sizeOf(logoBuffer);

          if (dimensions.width && dimensions.height) {
            // Calculate aspect ratio
            const scale = Math.min(maxLogoW / dimensions.width, maxLogoH / dimensions.height);
            const drawW = Math.max(1, Math.round(dimensions.width * scale));
            const drawH = Math.max(1, Math.round(dimensions.height * scale));

            const x = pageWidth - marginX - drawW;
            const y = pageFooterY - Math.max(0, Math.round((drawH - maxLogoH) / 2)) - 6;
            doc.addImage(logoBase64, 'PNG', x, y, drawW, drawH);
            logoAdded = true;
            console.log('[Invoice Server] Footer logo added with dimensions from:', logoPath);
          }
        } catch {
          // Fallback: add image with fixed dimensions if image-size is not available
          const x = pageWidth - marginX - maxLogoW;
          const y = pageFooterY - 6;
          doc.addImage(logoBase64, 'PNG', x, y, maxLogoW, maxLogoH);
          logoAdded = true;
          console.log('[Invoice Server] Footer logo added (fallback) from:', logoPath);
        }
        break;
      } catch (err) {
        console.warn('[Invoice Server] Failed to load logo from:', logoPath, err);
      }
    }
  }

  if (!logoAdded) {
    console.log('[Invoice Server] No logo found, continuing without it');
  }

  // Return as Buffer
  console.log('[Invoice Server] Generating PDF output');
  const pdfOutput = doc.output('arraybuffer');
  console.log('[Invoice Server] PDF generated successfully, size:', pdfOutput.byteLength, 'bytes');
  return Buffer.from(pdfOutput);
}
