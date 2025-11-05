import { restaurants } from '@/lib/data';
import RestaurantCard from '@/components/RestaurantCard';

export default function DiningPage() {
  return (
    <div className="min-h-screen bg-[var(--color-beige)]">
      {/* Hero Image Section */}
      <section style={{ width: '100%', margin: 0, padding: 0, overflow: 'hidden' }}>
        <img
          src="/assets/dining&drinks/dining.png"
          alt="Dining"
          style={{ width: '100%', height: '60vh', objectFit: 'cover', display: 'block' }}
        />
      </section>

      {/* Title Section */}
      <section style={{
        background: 'var(--color-beige)',
        padding: '48px 16px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: 'var(--color-text)',
          marginBottom: '16px',
          fontFamily: 'var(--font-display)'
        }}>
          Dining & Drinks
        </h1>
        <p style={{
          fontSize: '20px',
          color: 'var(--color-gray)',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          Embark on a culinary journey through our art-inspired dining experiences
        </p>
      </section>

      {/* Introduction Section */}
      <section className="section bg-[var(--color-beige-light)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-[var(--color-gray)] leading-relaxed mb-6">
              At La Casa Dell&apos;Arte, dining is an art form. Each of our restaurants and bars offers a unique
              culinary experience, where flavors, presentation, and ambiance come together to create unforgettable moments.
            </p>
            <p className="text-lg text-[var(--color-gray)] leading-relaxed">
              From international buffets to intimate fine dining, from vibrant lounges to personalized in-room service,
              we celebrate the diversity of global cuisine with an artistic touch.
            </p>
          </div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
            Our Dining Venues
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px',
            justifyContent: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} style={{
                width: '100%',
                maxWidth: '350px',
                minWidth: '280px'
              }}>
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Note */}
      {/* <section className="bg-[var(--color-beige-light)] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
            <svg className="w-12 h-12 mx-auto mb-4 text-[var(--color-gold)]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <h3 className="text-2xl font-bold mb-4 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
              Reservations Recommended
            </h3>
            <p className="text-[var(--color-gray)] mb-6">
              To ensure the best dining experience, we recommend making reservations in advance,
              especially for Lumière and Dipinta.
            </p>
            <a
              href="mailto:ladellaarte@gmail.com"
              className="inline-block bg-[var(--color-accent)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--color-gold)] transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Contact Us for Reservations
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
}
