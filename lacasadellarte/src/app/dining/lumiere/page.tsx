import { restaurants } from '@/lib/data';
import Link from 'next/link';

export default function LumierePage() {
  const restaurant = restaurants.find(r => r.slug === 'lumiere')!;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-beige)' }}>
      {/* Hero Image Section */}
      <section style={{ width: '100%', margin: 0, padding: 0, overflow: 'hidden' }}>
        <img
          src="/assets/dining&drinks/lumiere/lumiere.png"
          alt="Lumière"
          style={{ width: '100%', height: '60vh', minHeight: '400px', objectFit: 'cover', display: 'block' }}
        />
      </section>

      {/* Title Section */}
      <section className="bg-[var(--color-beige)] py-8 md:py-12 px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          {restaurant.name}
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-[var(--color-accent)] font-semibold">
          {restaurant.cuisine}
        </p>
      </section>

      {/* About Section */}
      <section className="bg-[var(--color-beige-light)] py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-[var(--color-text)] text-center" style={{ fontFamily: 'var(--font-display)' }}>
            About {restaurant.name}
          </h2>
          <p className="text-base md:text-lg text-[var(--color-gray)] leading-relaxed text-center mb-8">
            {restaurant.description}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center text-[var(--color-text)] gap-2 md:gap-3">
            <svg className="w-6 h-6 md:w-6 md:h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold text-sm md:text-base">{restaurant.openingHours}</span>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="bg-[var(--color-beige)] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
            Menu
          </h2>
          <div style={{
            maxHeight: '37rem',
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'thin',
            scrollbarColor: '#8B7355 #FAFAEF',
            borderRadius: '0.75rem',
            paddingRight: '0.5rem'
          }}>
            <div style={{
              maxWidth: '55rem',
              margin: '0 auto'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                alignItems: 'center'
              }}>
                {[1, 2, 3, 4, 5].map((pageNum) => (
                  <img
                    key={pageNum}
                    src={`/assets/dining&drinks/lumiere/lumiere menu_${pageNum}.jpg`}
                    alt={`Lumière Menu Page ${pageNum}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ambiance Section */}
      <section className="bg-[var(--color-beige-light)] py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
            Ambiance
          </h2>
          <p className="text-base md:text-lg text-[var(--color-gray)] leading-relaxed">
            {restaurant.ambiance}
          </p>
        </div>
      </section>

      {/* Special Note */}
      <section className="bg-[var(--color-beige-light)] py-8 md:py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center">
            <svg className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-[var(--color-gold)]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
              Reservations Recommended
            </h3>
            <p className="text-sm md:text-base text-[var(--color-gray)] mb-6">
              To ensure the best dining experience, we recommend making reservations in advance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:ladellaarte@gmail.com"
                className="inline-block bg-[var(--color-accent)] text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-[var(--color-gold)] transition-all duration-300 shadow-md"
              >
                Email Us
              </a>
              <a
                href="tel:+94718530994"
                className="inline-block bg-white border-2 border-[var(--color-accent)] text-[var(--color-accent)] px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-[var(--color-beige)] transition-all duration-300 shadow-md"
              >
                Call Us
              </a>
            </div>
            <div className="mt-6">
              <Link
                href="/dining"
                className="text-[var(--color-accent)] hover:text-[var(--color-gold)] inline-flex items-center transition-colors text-sm md:text-base"
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
