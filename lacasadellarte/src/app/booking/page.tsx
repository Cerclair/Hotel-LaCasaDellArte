'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function BookingContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    // Guest Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    specialRequests: '',
    // Payment Details
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  // Get booking details from URL params
  const roomName = searchParams.get('roomName') || '';
  const roomType = searchParams.get('roomType') || '';
  const price = Number(searchParams.get('price')) || 0;
  const adults = Number(searchParams.get('adults')) || 2;
  const children = Number(searchParams.get('children')) || 0;
  const checkIn = searchParams.get('checkIn') ? new Date(searchParams.get('checkIn')!) : new Date();
  const checkOut = searchParams.get('checkOut') ? new Date(searchParams.get('checkOut')!) : new Date();

  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) || 1;
  const totalPrice = price * nights;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to a backend
    alert('Booking submitted! This is a demo - no actual payment is processed.');
  };

  return (
    <div className="min-h-screen bg-[var(--color-beige)] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
          Complete Your Booking
        </h1>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Details Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
                Guest Details
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
                    placeholder="Any special requests or requirements..."
                  />
                </div>
              </form>
            </div>

            {/* Payment Details Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
                Payment Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleChange}
                    required
                    placeholder="Name as shown on card"
                    className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
                    />
                  </div>
                </div>

                <div className="bg-[var(--color-beige-light)] p-4 rounded-lg">
                  <p className="text-sm text-[var(--color-gray)]">
                    <strong>Note:</strong> This is a demo website. No actual payment will be processed.
                    Your card information is not stored or transmitted.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[var(--color-accent)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--color-gold)] transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              Complete Booking
            </button>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
                Booking Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold text-[var(--color-text)] mb-1">
                    {roomName}
                  </h3>
                  <p className="text-sm text-[var(--color-gray)] capitalize">
                    {roomType} Room
                  </p>
                </div>

                <div className="border-t border-[var(--color-beige-dark)] pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[var(--color-gray)]">Check-in:</span>
                    <span className="text-[var(--color-text)] font-medium">
                      {formatDate(checkIn)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[var(--color-gray)]">Check-out:</span>
                    <span className="text-[var(--color-text)] font-medium">
                      {formatDate(checkOut)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-gray)]">Guests:</span>
                    <span className="text-[var(--color-text)] font-medium">
                      {adults} Adult{adults !== 1 ? 's' : ''}, {children} Child{children !== 1 ? 'ren' : ''}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[var(--color-beige-dark)] pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[var(--color-gray)]">
                      {formatPrice(price)} x {nights} night{nights !== 1 ? 's' : ''}
                    </span>
                    <span className="text-[var(--color-text)] font-medium">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="border-t-2 border-[var(--color-accent)] pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[var(--color-text)]">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[var(--color-accent)]">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--color-beige-light)] p-4 rounded-lg">
                <h4 className="font-semibold text-[var(--color-text)] mb-2 text-sm">
                  Cancellation Policy
                </h4>
                <p className="text-xs text-[var(--color-gray)]">
                  Free cancellation up to 48 hours before check-in.
                  See our full terms and conditions for details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-beige)] flex items-center justify-center">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
