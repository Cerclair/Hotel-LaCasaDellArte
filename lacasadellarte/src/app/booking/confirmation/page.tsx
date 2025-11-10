'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function BookingConfirmationPage() {
  const params = useSearchParams();
  const ref = params.get('ref') || '';
  const roomName = params.get('roomName') || '';
  const roomType = params.get('roomType') || '';
  const image = params.get('image') || '';
  const firstName = params.get('firstName') || '';
  const lastName = params.get('lastName') || '';
  const email = params.get('email') || '';
  const payment = params.get('payment') || 'now';
  const adults = Number(params.get('adults') || '0');
  const children = Number(params.get('children') || '0');
  const price = Number(params.get('price') || '0');
  const nights = Number(params.get('nights') || '1');
  const total = Number(params.get('total') || '0');
  const checkIn = params.get('checkIn') ? new Date(params.get('checkIn') as string) : null;
  const checkOut = params.get('checkOut') ? new Date(params.get('checkOut') as string) : null;

  // Avoid duplicate wording like "Deluxe Room Room" – append "Room" only if not already present.
  const baseRoomType = roomType.trim();
  const displayRoomType = baseRoomType
    ? /\broom\b/i.test(baseRoomType) ? baseRoomType : `${baseRoomType} Room`
    : 'Room';

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', minimumFractionDigits: 0 }).format(value);

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen bg-[var(--color-beige)] py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1
                  className="text-3xl md:text-4xl font-bold text-[var(--color-text)]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Booking Confirmed
                </h1>
                <p className="text-[var(--color-gray)] mt-2">Thank you, {(firstName + ' ' + lastName).trim() || 'Guest'}! A confirmation has been sent to {email || 'your email'}.</p>
                <p className="text-sm text-[var(--color-text)] mt-1">
                  Reference: <span className="font-semibold">{ref}</span>
                </p>
              </div>
              <div className="text-right">
                <div className="inline-block px-3 py-1 rounded-full text-sm bg-[var(--color-beige-light)] text-[var(--color-text)]">
                  {payment === 'counter' ? 'Pay at Counter' : 'Paid Online'}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {image ? (
                <div className="md:col-span-1">
                  <Image
                    src={image}
                    alt={roomName || 'Room image'}
                    width={420}
                    height={220}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              ) : null}
              <div className={image ? 'md:col-span-2' : 'md:col-span-3'}>
                <h2 className="text-xl font-semibold text-[var(--color-text)]">{roomName}</h2>
                <p className="text-sm text-[var(--color-gray)]">{displayRoomType}</p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-between sm:justify-start sm:gap-3">
                    <span className="text-[var(--color-gray)]">Check-in</span>
                    <span className="font-medium text-[var(--color-text)]">{checkIn ? formatDate(checkIn) : '—'}</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start sm:gap-3">
                    <span className="text-[var(--color-gray)]">Check-out</span>
                    <span className="font-medium text-[var(--color-text)]">{checkOut ? formatDate(checkOut) : '—'}</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start sm:gap-3">
                    <span className="text-[var(--color-gray)]">Guests</span>
                    <span className="font-medium text-[var(--color-text)]">{adults} Adult{adults !== 1 ? 's' : ''}{children > 0 ? `, ${children} Child${children !== 1 ? 'ren' : ''}` : ''}</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start sm:gap-3">
                    <span className="text-[var(--color-gray)]">Nights</span>
                    <span className="font-medium text-[var(--color-text)]">{nights}</span>
                  </div>
                </div>

                <div className="mt-6 border-t border-[var(--color-beige-dark)] pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-gray)]">Rate</span>
                    <span className="text-[var(--color-text)]">{formatPrice(price)} x {nights}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-semibold text-[var(--color-text)]">Total</span>
                    <span className="text-2xl font-bold text-[var(--color-accent)]">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {payment === 'counter' && (
              <div className="mt-6 bg-[var(--color-beige-light)] border border-[var(--color-beige-dark)] rounded-md p-4 text-[var(--color-text)]">
                Please pay the total amount at the hotel counter during check-in. Your reservation is held under the reference above.
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="inline-block bg-[var(--color-accent)] text-white px-6 py-3 rounded-sm font-semibold hover:bg-[var(--color-gold)] transition-colors">
                Back to Home
              </Link>
              <Link href="/rooms" className="inline-block bg-white border border-[var(--color-beige-dark)] text-[var(--color-text)] px-6 py-3 rounded-sm font-semibold hover:bg-[var(--color-beige-light)] transition-colors">
                Explore More Rooms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
