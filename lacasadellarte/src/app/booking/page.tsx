'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Payment option state: 'now' (default) or 'counter'
  const [paymentOption, setPaymentOption] = useState<'now' | 'counter'>('now');
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get booking details from URL params
  const roomName = searchParams.get('roomName') || '';
  const roomType = searchParams.get('roomType') || '';
  const price = Number(searchParams.get('price')) || 0;
  const adults = Number(searchParams.get('adults')) || 2;
  const children = Number(searchParams.get('children')) || 0;
  const roomImage = searchParams.get('image') || '';
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
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    // Guest validations
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s\-()]{7,20}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    // Date validation
    if (isNaN(checkIn.getTime())) newErrors.checkIn = 'Invalid check-in date';
    if (isNaN(checkOut.getTime())) newErrors.checkOut = 'Invalid check-out date';
    if (!newErrors.checkIn && !newErrors.checkOut && checkOut <= checkIn) {
      newErrors.checkOut = 'Check-out must be after check-in';
    }

    // Payment validations only if paying now
    if (paymentOption === 'now') {
      const digitsOnly = formData.cardNumber.replace(/\s+/g, '');
      if (!digitsOnly) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{13,19}$/.test(digitsOnly)) {
        newErrors.cardNumber = 'Enter a valid card number (13-19 digits)';
      }
      if (!formData.cardHolder.trim()) newErrors.cardHolder = 'Cardholder name is required';
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Use MM/YY format';
      } else {
        // Basic expiry check (not expired)
        const [mm, yy] = formData.expiryDate.split('/');
        const expMonth = parseInt(mm, 10);
        const expYear = 2000 + parseInt(yy, 10);
        const now = new Date();
        const endOfMonth = new Date(expYear, expMonth, 0); // last day of expMonth
        if (endOfMonth < now) {
          newErrors.expiryDate = 'Card is expired';
        }
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      const firstKey = Object.keys(formErrors)[0];
      const el = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${firstKey}"]`);
      el?.focus();
      return;
    }

    // Generate booking reference
    const reference = `LCA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    try {
      // Send booking email via API
      const response = await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          specialRequests: formData.specialRequests,
          roomName,
          roomType,
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
          adults,
          children,
          nights,
          price,
          totalPrice,
          paymentOption,
          bookingReference: reference,
        }),
      });

      if (!response.ok) {
        console.error('Failed to send booking email, but continuing to confirmation');
      }
    } catch (error) {
      console.error('Error sending booking email:', error);
      // Continue to confirmation page even if email fails
    }

    // Build params for confirmation page (never include card data)
    const params = new URLSearchParams({
      ref: reference,
      roomName,
      roomType,
      price: String(price),
      adults: String(adults),
      children: String(children),
      nights: String(nights),
      total: String(totalPrice),
      payment: paymentOption,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    });
    if (roomImage) params.set('image', roomImage);
    if (checkIn) params.set('checkIn', checkIn.toISOString());
    if (checkOut) params.set('checkOut', checkOut.toISOString());
    router.push(`/booking/confirmation?${params.toString()}`);
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
                    {errors.firstName && <p className="text-xs text-red-600 mt-1" role="alert">{errors.firstName}</p>}
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
                    {errors.lastName && <p className="text-xs text-red-600 mt-1" role="alert">{errors.lastName}</p>}
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
                  {errors.email && <p className="text-xs text-red-600 mt-1" role="alert">{errors.email}</p>}
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
                    {errors.phone && <p className="text-xs text-red-600 mt-1" role="alert">{errors.phone}</p>}
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
                    {errors.country && <p className="text-xs text-red-600 mt-1" role="alert">{errors.country}</p>}
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

            {/* Payment Method Selector */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
                Payment Method
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentOption"
                    value="now"
                    checked={paymentOption === 'now'}
                    onChange={() => setPaymentOption('now')}
                    className="h-4 w-4 text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                  />
                  <span className="text-[var(--color-text)]">Pay Now</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentOption"
                    value="counter"
                    checked={paymentOption === 'counter'}
                    onChange={() => setPaymentOption('counter')}
                    className="h-4 w-4 text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                  />
                  <span className="text-[var(--color-text)]">Pay at Counter</span>
                </label>
              </div>
            </div>

            {/* Payment Details Section */}
            {paymentOption === 'now' && (
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
                      required={paymentOption === 'now'}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
                    />
                    {errors.cardNumber && <p className="text-xs text-red-600 mt-1" role="alert">{errors.cardNumber}</p>}
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
                      required={paymentOption === 'now'}
                      placeholder="Name as shown on card"
                      className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
                    />
                    {errors.cardHolder && <p className="text-xs text-red-600 mt-1" role="alert">{errors.cardHolder}</p>}
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
                        required={paymentOption === 'now'}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
                      />
                      {errors.expiryDate && <p className="text-xs text-red-600 mt-1" role="alert">{errors.expiryDate}</p>}
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
                        required={paymentOption === 'now'}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
                      />
                      {errors.cvv && <p className="text-xs text-red-600 mt-1" role="alert">{errors.cvv}</p>}
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
            )}

            {/* Date Errors (if any) */}
            {(errors.checkIn || errors.checkOut) && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
                <p className="font-medium">Please fix the date issue:</p>
                <ul className="list-disc ml-5 text-sm">
                  {errors.checkIn && <li>{errors.checkIn}</li>}
                  {errors.checkOut && <li>{errors.checkOut}</li>}
                </ul>
              </div>
            )}

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
              {roomImage && (
                <div className="mb-4">
                  <Image
                    src={roomImage}
                    alt={roomName || 'Selected room'}
                    width={420}
                    height={220}
                    className="w-full h-44 object-cover rounded-md"
                  />
                </div>
              )}

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
