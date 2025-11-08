import styles from './spa.module.css';

export default function SpaPage() {
  const treatments = [
    {
      id: 1,
      category: 'Signature Massages',
      services: [
        { name: 'Artistic Touch Massage', duration: '60 min', description: 'Full body relaxation inspired by flowing brushstrokes' },
        { name: 'Deep Tissue Sculpture', duration: '90 min', description: 'Intensive therapy targeting muscle tension' },
        { name: 'Hot Stone Symphony', duration: '75 min', description: 'Heated stones for deep relaxation and balance' },
      ]
    },
    {
      id: 2,
      category: 'Facial Treatments',
      services: [
        { name: 'Radiant Canvas Facial', duration: '60 min', description: 'Revitalizing treatment for glowing skin' },
        { name: 'Anti-Aging Masterpiece', duration: '75 min', description: 'Advanced facial targeting fine lines and wrinkles' },
        { name: 'Gentleman&apos;s Refresh', duration: '45 min', description: 'Tailored facial for men&apos;s skincare needs' },
      ]
    },
    {
      id: 3,
      category: 'Body Treatments',
      services: [
        { name: 'Aromatherapy Journey', duration: '90 min', description: 'Full body scrub and massage with essential oils' },
        { name: 'Detox Wrap', duration: '60 min', description: 'Purifying body wrap with mineral-rich ingredients' },
        { name: 'Couples Retreat', duration: '120 min', description: 'Side-by-side massage and spa experience' },
      ]
    },
  ];


  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <img src="/assets/spa/spa.png" alt="Spa" className={styles.heroImage} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>ZEN SPA</h1>
          <p className={styles.heroSubtitle}>
            A sanctuary of serenity where wellness meets artistry
          </p>
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
                  <img
                    key={pageNum}
                    src={`/assets/spa/SPA Menu_${pageNum}.jpg`}
                    alt={`SPA Menu Page ${pageNum}`}
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
