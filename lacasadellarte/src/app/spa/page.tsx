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
          <h1 className={styles.heroTitle}>ZEN Spa</h1>
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

      {/* Spa Menu Section */}
      <section className={`${styles.section} ${styles.sectionBeige}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Spa Menu</h2>
          <div className={styles.menuScrollContainer}>
            <div className={styles.menuWrapper}>
              {treatments.map((category) => (
                <div key={category.id} className={styles.menuCategory}>
                  <h3 className={styles.menuCategoryTitle}>{category.category}</h3>
                  <div className={styles.menuList}>
                    {category.services.map((service, index) => (
                      <div key={index} className={styles.menuItem}>
                        <div className={styles.menuText}>
                          <h4>{service.name}</h4>
                          <p>{service.description}</p>
                        </div>
                        <span className={styles.menuDuration}>{service.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
