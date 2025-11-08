import styles from './spa.module.css';
import Image from 'next/image';

export default function SpaPage() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Image src="/assets/spa/spa.png" alt="Spa" width={1920} height={1080} style={{ width: '100%', height: '60vh', minHeight: '400px', objectFit: 'cover', display: 'block' }} />
        <div className="bg-[var(--color-beige)] py-8 md:py-12 px-4 text-center">
          <h1 className={styles.heroTitle}>ZEN SPA</h1>
          
        </div>
      </section>

      {/* Description Section */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className="text-base md:text-lg text-[var(--color-gray)] leading-relaxed text-center mb-8">
            <p>
              Retreat into serenity at our signature spa — a haven where wellness and artistry unite. Indulge in rejuvenating massages, bespoke facials, and holistic therapies crafted to restore balance and calm. Here, every treatment is a gentle brushstroke of renewal, inviting you to unwind, recharge, and embrace the beauty of stillness.
            </p>
          
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="bg-[var(--color-beige)] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
            SPA Menu
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
                {[1, 2, 3].map((pageNum) => (
                  <Image
                    key={pageNum}
                    src={`/assets/spa/SPA Menu_${pageNum}.jpg`}
                    alt={`SPA Menu Page ${pageNum}`}
                    width={880}
                    height={1200}
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
    </div>
  );
}
