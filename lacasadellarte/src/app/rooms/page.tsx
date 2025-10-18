'use client';

import { useState } from 'react';
import { rooms } from '@/lib/data';
import RoomCard from '@/components/RoomCard';

export default function RoomsPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);

  const filteredRooms = selectedType === 'all'
    ? rooms
    : rooms.filter(room => room.type === selectedType);

  const checkInDate = checkIn ? new Date(checkIn) : undefined;
  const checkOutDate = checkOut ? new Date(checkOut) : undefined;

  return (
    <div className="min-h-screen bg-[var(--color-beige)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-beige-dark)] to-[var(--color-beige)] py-12">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Our Rooms
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-gray)] max-w-xl leading-relaxed">
              Discover your perfect sanctuary where art and comfort intertwine
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white shadow-md sticky top-20 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Room Type Filter */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Room Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
              >
                <option value="all">All Rooms</option>
                <option value="standard">Standard Rooms</option>
                <option value="deluxe">Deluxe Rooms</option>
                <option value="suite">King Deluxe Suites</option>
              </select>
            </div>

            {/* Check-in Date */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
              />
            </div>

            {/* Check-out Date */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
              />
            </div>

            {/* Adults */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Adults
              </label>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
              >
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Adult' : 'Adults'}
                  </option>
                ))}
              </select>
            </div>

            {/* Children */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Children
              </label>
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
              >
                {[0, 1, 2].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Child' : 'Children'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="section">
        <div className="container mx-auto px-4">
          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  checkIn={checkInDate}
                  checkOut={checkOutDate}
                  adults={adults}
                  children={children}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-[var(--color-gray)]">
                No rooms found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-[var(--color-beige-light)] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
              Room Amenities & Services
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Secure & Safe</h3>
                <p className="text-[var(--color-gray)] text-sm">
                  In-room safes and 24/7 security for your peace of mind
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--color-gold)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Flexible Booking</h3>
                <p className="text-[var(--color-gray)] text-sm">
                  Easy modifications and cancellation policies
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-[var(--color-gray)] text-sm">
                  Dedicated concierge service at your disposal
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
