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
  lastAutoTable?: { finalY?: number };
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

  const title = 'Booking Invoice';
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(title, marginX, cursorY);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const generatedAt = data.generatedAt || new Date();
  cursorY += 18;
  doc.text(`Generated: ${generatedAt.toLocaleString()}`, marginX, cursorY);
  cursorY += 14;
  doc.text(`Reference: ${data.reference}`, marginX, cursorY);

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
    autoTableFn(doc, {
    startY: cursorY,
    head: [[ 'Room', 'Type', 'Check-in', 'Check-out', 'Nights', 'Rate', 'Total' ]],
    body: [[
      data.roomName || '—',
      data.roomType || '—',
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
    'For questions, contact support at info@lacasadellarte.example.'
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
  cursorY += 10;
  doc.setFontSize(9);
  doc.setTextColor(130);
  doc.text(`© ${new Date().getFullYear()} La Casa Dell'Arte – Generated electronically`, marginX, cursorY);

  // File name convention: LCA-<reference>.pdf
  const safeRef = data.reference.replace(/[^A-Z0-9_-]/gi, '_');
  doc.save(`Invoice-${safeRef}.pdf`);
}
