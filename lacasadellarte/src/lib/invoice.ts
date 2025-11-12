// Utility for generating a Booking Invoice PDF
// Uses dynamic import so it only runs client-side.
// Data contract (BookingInvoiceData): minimal fields extracted from confirmation page search params.

import type { UserOptions as AutoTableUserOptions } from 'jspdf-autotable';

export interface BookingInvoiceData {
  reference: string;
  firstName: string;
  lastName: string;
  email: string;
  roomName: string;
  roomType: string; // Already normalized for display if desired
  checkIn: Date | null;
  checkOut: Date | null;
  nights: number;
  adults: number;
  children: number;
  rate: number; // single night price
  total: number; // computed total
  paymentMethod: 'now' | 'counter';
  generatedAt?: Date; // optional override
}

// Format helpers kept isolated so they can be updated centrally.
const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', minimumFractionDigits: 0 }).format(value);

const formatDate = (date: Date | null) =>
  date ? date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : '—';

type JsPdfDoc = {
  setFont: (font: string, style?: string) => void;
  setFontSize: (size: number) => void;
  text: (text: string, x: number, y: number) => void;
  save: (filename: string) => void;
  splitTextToSize: (text: string, maxSize: number) => string[];
  setTextColor: (r: number | string, g?: number, b?: number) => void;
  addImage: (imageData: string | HTMLImageElement | HTMLCanvasElement | Uint8Array, format: string, x: number, y: number, width: number, height: number) => void;
  setDrawColor: (r: number, g?: number, b?: number) => void;
  setFillColor: (r: number, g?: number, b?: number) => void;
  roundedRect?: (x: number, y: number, w: number, h: number, rx: number, ry: number, style?: 'S' | 'F' | 'FD' | 'DF') => void;
  internal?: { pageSize?: { getWidth?: () => number; getHeight?: () => number } };
  lastAutoTable?: { finalY?: number };
  // Optional advanced graphics state in jsPDF v2+
  setGState?: (state: unknown) => void;
  GState?: new (options: unknown) => unknown;
  saveGraphicsState?: () => void;
  restoreGraphicsState?: () => void;
};
type AutoTableFn = (doc: JsPdfDoc, options: AutoTableUserOptions) => unknown;

export async function generateInvoicePDF(data: BookingInvoiceData) {
  // Dynamic imports (tree-shakable in Next.js, avoids SSR crash)
  const jsPdfModule = await import('jspdf');
  const autoTableModule = (await import('jspdf-autotable')) as unknown as { default?: AutoTableFn; autoTable?: AutoTableFn };
  const { jsPDF } = jsPdfModule;
  const autoTableFn: AutoTableFn | undefined = autoTableModule.default || autoTableModule.autoTable;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' }) as unknown as JsPdfDoc;
  const marginX = 40;
  let cursorY = 40;
  // HEADER (no logo). Left: Invoice info. Right: Hotel name and contact.
  const headerRightX = 400;
  // Hotel name on the right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text("La Casa Dell'Arte", headerRightX, cursorY + 24);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Galle Road, Colombo 03, Sri Lanka', headerRightX, cursorY + 40);
  doc.text('Tel: +94 718530994', headerRightX, cursorY + 54);
  doc.text('Email: ladellaarte@gmail.com', headerRightX, cursorY + 68);

  // Left side: Invoice title + generated + reference
  const title = 'Booking Invoice';
  const generatedAt = data.generatedAt || new Date();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(title, marginX, cursorY + 24);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Generated: ${generatedAt.toLocaleString()}`, marginX, cursorY + 40);
  doc.text(`Reference: ${data.reference}`, marginX, cursorY + 54);

  cursorY += 80;

  // Prepare for body content
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  // (Moved watermark drawing below, after content, to position in the clear space above footer.)

  // Section: Guest Details
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
    `Guests: ${data.adults} Adult${data.adults !== 1 ? 's' : ''}${data.children > 0 ? ', ' + data.children + ' Child' + (data.children !== 1 ? 'ren' : '') : ''}`,
    `Payment Method: ${data.paymentMethod === 'counter' ? 'Pay at Counter' : 'Paid Online'}`,
  ];
  guestLines.forEach(line => {
    doc.text(line, marginX, cursorY);
    cursorY += 14;
  });

  // Section: Booking Summary Table
  cursorY += 10;
  if (autoTableFn) {
    // Combine room name and type with smart de-duplication
    const roomLabel = (data.roomName || '').trim();
    const typeLabel = (data.roomType || '').trim();
    const normalize = (s: string) =>
      s
        .toLowerCase()
        .replace(/[\u2013\u2014-]/g, ' ') // dashes to space
        .replace(/\brooms?\b/g, '') // drop room/rooms word
        .replace(/\s+/g, ' ') // collapse spaces
        .trim();
    let roomTypeCombined = '—';
    if (roomLabel && typeLabel) {
      const nRoom = normalize(roomLabel);
      const nType = normalize(typeLabel);
      const similar = nRoom === nType || nRoom.includes(nType) || nType.includes(nRoom);
      if (similar) {
        // Prefer the roomLabel when they are effectively the same
        roomTypeCombined = roomLabel;
      } else {
        roomTypeCombined = `${roomLabel} — ${typeLabel}`;
      }
    } else {
      roomTypeCombined = roomLabel || typeLabel || '—';
    }

    autoTableFn(doc, {
      startY: cursorY,
      head: [[ 'Room Type', 'Check-in', 'Check-out', 'Nights', 'Rate', 'Total' ]],
      body: [[
        roomTypeCombined,
        formatDate(data.checkIn),
        formatDate(data.checkOut),
        String(data.nights || 1),
        formatPrice(data.rate || 0),
        formatPrice(data.total || 0),
      ]],
      styles: { font: 'helvetica', fontSize: 10 },
      headStyles: { fillColor: [139, 115, 85] }, // warm brown tone
      alternateRowStyles: { fillColor: [245, 241, 236] },
      margin: { left: marginX, right: marginX },
    } as AutoTableUserOptions);
  }

  // Access lastAutoTable safely (runtime property created by plugin)
  const lastAutoTable = doc.lastAutoTable;
  if (lastAutoTable && typeof lastAutoTable.finalY === 'number') {
    cursorY = lastAutoTable.finalY + 30;
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

  // Footer
  // Compute page metrics and the footer top Y
  const pageWidth = doc.internal?.pageSize?.getWidth?.() ?? 595;
  const pageHeight = doc.internal?.pageSize?.getHeight?.() ?? 842;
  const footerBottomMargin = 40; // add space from bottom of the page
  const pageFooterY = pageHeight - footerBottomMargin - 60; // place footer block above bottom

  // PAID WATERMARK (if paid online) — draw now to center within the gap between Notes and Footer
  if (data.paymentMethod === 'now') {
    try {
      const candidates = ['/logo/paid-stamp.png', '/assets/paid-stamp.png', '/paid-stamp.png'];
      let dataUrl: string | null = null;
      for (const url of candidates) {
        try {
          const resp = await fetch(url);
          if (resp.ok) {
            const blob = await resp.blob();
            dataUrl = await new Promise<string | null>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = () => resolve(null);
              reader.readAsDataURL(blob);
            });
          }
          if (dataUrl) break;
        } catch {
          // continue to next candidate
        }
      }

      if (dataUrl) {
        // Available vertical gap
        const gapTop = cursorY + 8;
        const gapBottom = pageFooterY - 10;
        const availableH = Math.max(0, gapBottom - gapTop);

        if (availableH > 30) {
          // Load to get intrinsic aspect ratio
          const dims = await new Promise<{ w: number; h: number } | null>((resolve) => {
            const img = new Image();
            img.onload = () => resolve({ w: img.naturalWidth || img.width, h: img.naturalHeight || img.height });
            img.onerror = () => resolve(null);
            img.src = dataUrl!;
          });

          // Target size: width up to 60% of page, height up to 80% of the gap
          const targetMaxW = Math.floor(pageWidth * 0.6);
          const targetMaxH = Math.floor(availableH * 0.8);
          let drawW = targetMaxW;
          let drawH = targetMaxH;
          if (dims && dims.w > 0 && dims.h > 0) {
            const scale = Math.min(targetMaxW / dims.w, targetMaxH / dims.h);
            drawW = Math.max(1, Math.round(dims.w * scale));
            drawH = Math.max(1, Math.round(dims.h * scale));
          }
          const x = (pageWidth - drawW) / 2;
          const y = gapTop + Math.max(0, Math.floor((availableH - drawH) / 2));

          // Lower the opacity if supported so content remains readable
          const anyDoc = doc as unknown as {
            setGState?: (state: unknown) => void;
            GState?: new (options: unknown) => unknown;
          };
          const restoreOpacity = () => {
            try {
              if (anyDoc.setGState && anyDoc.GState) {
                anyDoc.setGState(new anyDoc.GState({ opacity: 1 }));
              }
            } catch {
              /* noop */
            }
          };
          try {
            if (anyDoc.setGState && anyDoc.GState) {
              anyDoc.setGState(new anyDoc.GState({ opacity: 0.3 }));
            }
          } catch {
            // If not supported, continue without opacity control
          }

          doc.addImage(dataUrl, 'PNG', x, y, drawW, drawH);
          restoreOpacity();
        }
      } else {
        // Fallback: simple text watermark in the center of the gap
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
        }
      }
    } catch {
      // Safe fallback to text watermark
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
      }
    }
  }
  doc.setFontSize(9);
  doc.setTextColor(130);
  doc.text(`© ${new Date().getFullYear()} La Casa Dell'Arte`, marginX, pageFooterY);
  doc.text('Galle Road, Colombo 03, Sri Lanka', marginX, pageFooterY + 14);
  doc.text('Tel: +94 718530994 | Email: ladellaarte@gmail.com', marginX, pageFooterY + 28);
  doc.text('Generated electronically', marginX, pageFooterY + 42);

  // Footer logo on the right (PNG background-less logo) with preserved aspect ratio
  try {
    const maxLogoW = 140;
    const maxLogoH = 60;
    const resp = await fetch('/logo/logo-removebg.png');
    if (resp.ok) {
      const blob = await resp.blob();
      const dataUrl: string | null = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
      if (dataUrl) {
        // Measure intrinsic size to preserve aspect ratio
        const dims = await new Promise<{ w: number; h: number } | null>((resolve) => {
          const img = new Image();
          img.onload = () => resolve({ w: img.naturalWidth || img.width, h: img.naturalHeight || img.height });
          img.onerror = () => resolve(null);
          img.src = dataUrl;
        });
        let drawW = maxLogoW;
        let drawH = maxLogoH;
        if (dims && dims.w > 0 && dims.h > 0) {
          const scale = Math.min(maxLogoW / dims.w, maxLogoH / dims.h);
          drawW = Math.max(1, Math.round(dims.w * scale));
          drawH = Math.max(1, Math.round(dims.h * scale));
        }
        const x = pageWidth - marginX - drawW;
        const y = pageFooterY - Math.max(0, Math.round((drawH - maxLogoH) / 2)) - 6; // align with text block
        doc.addImage(dataUrl, 'PNG', x, y, drawW, drawH);
      }
    }
  } catch {
    // ignore if footer logo can't be loaded
  }

  // File name convention: LCA-<reference>.pdf
  const safeRef = data.reference.replace(/[^A-Z0-9_-]/gi, '_');
  doc.save(`Invoice-${safeRef}.pdf`);
}
