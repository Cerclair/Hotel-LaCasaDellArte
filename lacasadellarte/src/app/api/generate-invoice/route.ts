import { NextResponse } from 'next/server';
import { generateInvoicePDFBuffer } from '@/lib/invoice-pdfkit';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('[Invoice API] Received request for invoice:', body.reference);

    // Validate required fields
    if (!body.reference || !body.firstName || !body.lastName || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate PDF using PDFKit
    const pdfBuffer = await generateInvoicePDFBuffer(body);

    // Return PDF as downloadable file
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Invoice-${body.reference}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('[Invoice API] Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate invoice PDF' },
      { status: 500 }
    );
  }
}
