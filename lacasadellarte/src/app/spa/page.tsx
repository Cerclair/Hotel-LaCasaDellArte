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
          <div className={styles.description}>
            <p>
              At ZEN Spa, we believe that wellness is an art form. Our expertly trained therapists combine traditional
              techniques with modern innovations to create personalized experiences that restore balance, rejuvenate
              the body, and calm the mind.
            </p>
            <p>
              Every treatment is designed with intention, using premium, natural products and performed in serene
              spaces that reflect our artistic ethos. Allow yourself to unwind, refresh, and reconnect with your inner peace.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center text-[var(--color-text)] gap-2 md:gap-3" style={{ marginTop: '2rem' }}>
              <svg className="w-6 h-6 md:w-6 md:h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold text-sm md:text-base">Daily: 9:00 AM - 9:00 PM</span>
            </div>
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
