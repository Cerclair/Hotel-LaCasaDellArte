import { restaurants } from '@/lib/data';
import Link from 'next/link';

export default function VetroPage() {
  const restaurant = restaurants.find(r => r.slug === 'vetro')!;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-beige)' }}>
      {/* Hero Image Section */}
      <section style={{ width: '100%', margin: 0, padding: 0, overflow: 'hidden' }}>
        <img
          src="/assets/dining&drinks/vetro/vetro.png"
          alt="Vetro"
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
          {restaurant.name}
        </h1>
        <p style={{
          fontSize: '20px',
          color: 'var(--color-accent)',
          fontWeight: '600'
        }}>
          {restaurant.cuisine}
        </p>
      </section>

      {/* About Section */}
      <section style={{
        background: 'var(--color-beige-light)',
        padding: '64px 16px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: 'var(--color-text)',
            textAlign: 'center',
            fontFamily: 'var(--font-display)'
          }}>
            About {restaurant.name}
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'var(--color-gray)',
            lineHeight: '1.6',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            {restaurant.description}
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text)'
          }}>
            <svg style={{ width: '24px', height: '24px', marginRight: '12px', color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span style={{ fontWeight: '600' }}>{restaurant.openingHours}</span>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section style={{
        background: 'var(--color-beige)',
        padding: '80px 0'
      }}>
        <div style={{ maxWidth: '65rem', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '3rem',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-display)'
          }}>
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
                {[1, 2, 3, 4, 5, 6, 7, 8].map((pageNum) => (
                  <img
                    key={pageNum}
                    src={`/assets/dining&drinks/vetro/vetromenu_${pageNum}.jpg`}
                    alt={`Vetro Menu Page ${pageNum}`}
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
      <section style={{
        background: 'var(--color-beige-light)',
        padding: '64px 16px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-display)'
          }}>
            Ambiance
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'var(--color-gray)',
            lineHeight: '1.6'
          }}>
            {restaurant.ambiance}
          </p>
        </div>
      </section>

      {/* Special Note */}
      <section style={{
        background: 'var(--color-beige-light)',
        padding: '48px 16px'
      }}>
        <div style={{ maxWidth: '768px', margin: '0 auto' }}>
          <div style={{
            background: 'white',
            padding: '32px',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <svg style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 16px',
              color: 'var(--color-gold)'
            }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <h3 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-display)'
            }}>
              Reservations Recommended
            </h3>
            <p style={{
              color: 'var(--color-gray)',
              marginBottom: '24px',
              fontSize: '16px'
            }}>
              To ensure the best dining experience, we recommend making reservations in advance.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="mailto:ladellaarte@gmail.com"
                style={{
                  display: 'inline-block',
                  background: 'var(--color-accent)',
                  color: 'white',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                Email Us
              </a>
              <a
                href="tel:+94718530994"
                style={{
                  display: 'inline-block',
                  background: 'white',
                  border: '2px solid var(--color-accent)',
                  color: 'var(--color-accent)',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                Call Us
              </a>
            </div>
            <div style={{ marginTop: '24px' }}>
              <Link
                href="/dining"
                style={{
                  color: 'var(--color-accent)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'color 0.3s',
                  fontSize: '14px'
                }}
              >
                <svg style={{ width: '16px', height: '16px', marginRight: '8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
