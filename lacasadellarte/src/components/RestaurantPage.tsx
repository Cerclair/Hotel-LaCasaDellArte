import { Restaurant } from '@/types';
import Link from 'next/link';

interface RestaurantPageProps {
  restaurant: Restaurant;
}

export default function RestaurantPage({ restaurant }: RestaurantPageProps) {
  return (
    <div className="min-h-screen bg-[var(--color-beige)]">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-[var(--color-beige-dark)] to-[var(--color-beige)] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            {restaurant.name}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-accent)] font-semibold">
            {restaurant.cuisine}
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="section bg-[var(--color-beige-light)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-[var(--color-text)] text-center" style={{ fontFamily: 'var(--font-display)' }}>
              About {restaurant.name}
            </h2>
            <p className="text-lg text-[var(--color-gray)] leading-relaxed text-center mb-8">
              {restaurant.description}
            </p>

            {restaurant.openingHours && (
              <div className="flex items-center justify-center text-[var(--color-text)] mb-6">
                <svg className="w-6 h-6 mr-3 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">{restaurant.openingHours}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="section bg-[var(--color-beige)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)] text-center" style={{ fontFamily: 'var(--font-display)' }}>
            Menu
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-[var(--color-beige-dark)] h-96 rounded-lg shadow-xl flex items-center justify-center">
              <p className="text-[var(--color-gray)] text-center px-8">
                [Menu Gallery - Scrollable Images]
              </p>
            </div>
            <p className="text-center text-[var(--color-gray)] mt-4 italic">
              Scroll through our curated menu selections
            </p>
          </div>
        </div>
      </section>

      {/* Ambiance Section */}
      <section className="section bg-[var(--color-beige-light)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-[var(--color-text)] text-center" style={{ fontFamily: 'var(--font-display)' }}>
              Ambiance
            </h2>
            <p className="text-lg text-[var(--color-gray)] leading-relaxed text-center">
              {restaurant.ambiance}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-[var(--color-beige)]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
              Make a Reservation
            </h3>
            <p className="text-[var(--color-gray)] mb-6">
              Contact our team to reserve your table and ensure an unforgettable dining experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:ladellaarte@gmail.com"
                className="inline-block bg-[var(--color-accent)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--color-gold)] transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Email Us
              </a>
              <a
                href="tel:+94718530994"
                className="inline-block bg-white border-2 border-[var(--color-accent)] text-[var(--color-accent)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Call Us
              </a>
            </div>
            <div className="mt-6">
              <Link
                href="/dining"
                className="text-[var(--color-accent)] hover:text-[var(--color-gold)] transition-colors inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Dining Options
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
