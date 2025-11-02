'use client';

import { Room } from '@/types';
import Link from 'next/link';

interface RoomCardProps {
  room: Room;
  checkIn?: Date;
  checkOut?: Date;
  adults?: number;
  children?: number;
}

export default function RoomCard({ room, checkIn, checkOut, adults = 2, children = 0 }: RoomCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const buildBookingUrl = () => {
    const params = new URLSearchParams({
      roomId: room.id,
      roomName: room.name,
      roomType: room.type,
      price: room.price.toString(),
      adults: adults.toString(),
      children: children.toString()
    });

    if (checkIn) params.append('checkIn', checkIn.toISOString());
    if (checkOut) params.append('checkOut', checkOut.toISOString());

    return `/booking?${params.toString()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Room Image */}
      <div className="relative h-64 bg-[var(--color-beige-dark)] flex items-center justify-center">
        <p className="text-[var(--color-gray)] text-center px-4">
          [{room.name} Image]
        </p>
      </div>

      {/* Room Details */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            {room.name}
          </h3>
          <p className="text-[var(--color-gray)] leading-relaxed">
            {room.description}
          </p>
        </div>

        {/* Room Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-[var(--color-gray)] font-medium">Size</p>
            <p className="text-[var(--color-text)]">{room.size}</p>
          </div>
          <div>
            <p className="text-[var(--color-gray)] font-medium">Bed Type</p>
            <p className="text-[var(--color-text)]">{room.bedType}</p>
          </div>
          <div>
            <p className="text-[var(--color-gray)] font-medium">Max Guests</p>
            <p className="text-[var(--color-text)]">
              {room.maxGuests.adults} Adults, {room.maxGuests.children} Children
            </p>
          </div>
          <div>
            <p className="text-[var(--color-gray)] font-medium">Accessible</p>
            <p className="text-[var(--color-text)]">{room.accessible ? 'Yes' : 'No'}</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <p className="text-[var(--color-gray)] font-semibold mb-2">Amenities:</p>
          <div className="flex flex-wrap gap-2">
            {room.amenities.slice(0, 6).map((amenity, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[var(--color-beige-light)] text-[var(--color-text)]"
              >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {amenity}
              </span>
            ))}
          </div>
          {room.amenities.length > 6 && (
            <p className="text-xs text-[var(--color-gray)] mt-2">
              +{room.amenities.length - 6} more amenities
            </p>
          )}
        </div>

        {/* Price and Book Button */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-beige-dark)]">
          <div>
            <p className="text-sm text-[var(--color-gray)]">Starting from</p>
            <p className="text-2xl font-bold text-[var(--color-text)]">
              {formatPrice(room.price)}
            </p>
            <p className="text-xs text-[var(--color-gray)]">per night</p>
          </div>
          <Link
            href={buildBookingUrl()}
            className="bg-[var(--color-accent)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-gold)] transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
