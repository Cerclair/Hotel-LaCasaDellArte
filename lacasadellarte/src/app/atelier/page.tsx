import styles from './atelier.module.css';
import Image from 'next/image';

export default function AtelierPage() {
  const artworks = [
    { id: 1, title: 'Caffè a Montmartre', subtitle: 'Coffee in Montmartre',
      imageUrl:'/assets/atelier/coffee in montmartre.jpg'},
    { id: 2, title: 'Danza d\'Ombra', subtitle: 'Dance of Shadow', 
      imageUrl:'/assets/atelier/dance of shadow.jpg'},
    { id: 3, title: 'Il Valzer del Lampadario', subtitle: 'The Chandelier Waltz', 
      imageUrl:'/assets/atelier/the chandelier waltz.jpg'},
    { id: 4, title: 'L\'Eleganza della Notte', subtitle: 'The Elegance of the Night', 
      imageUrl:'/assets/atelier/the elegance of the night.jpg'},
    { id: 5, title: 'Notturno Veneziano', subtitle: 'Venetian Nocturne', 
      imageUrl:'/assets/atelier/venetian nocturne.jpg'},
    { id: 6, title: 'Passione di Siviglia', subtitle: 'Passion of Seville', 
      imageUrl:'/assets/atelier/passion of seville.jpg'},
    { id: 7, title: 'Serenità Nascosta', subtitle: 'Hidden Serenity', 
      imageUrl:'/assets/atelier/hidden serenity.jpg'},
    { id: 8, title: 'Tramonto sulla Laguna', subtitle: 'Sunset on the Lagoon', 
      imageUrl:'/assets/atelier/sunset on the lagoon.jpg'},
    { id: 9, title: 'Visione di Parigi', subtitle: 'Vision of Paris', 
      imageUrl:'/assets/atelier/vision of paris.jpg'},
  ];

  return (
    <div className={styles.page}>
      {/* Hero Section */}
    <section className={styles.heroSection}>
  {/* Full-width image */}
  <img 
    src="/assets/atelier/atelier.png" 
    alt="Art gallery" 
    className={styles.heroImage} 
    style={{ width: '100%', height: '60vh', minHeight: '400px', objectFit: 'cover', display: 'block' }}
  />

  {/* Text block below the image */}
  <div className="bg-[var(--color-beige)] py-8 md:py-12 px-4 text-center">
    <h1 className={styles.heroTitle}>Atelier - Art Gallery</h1>
    <p className={styles.heroText}>
      Where contemporary and classic art converge in a celebration of human creativity
    </p>
  </div>
</section>



      {/* Description Section */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={styles.textCenter}>
            <p className={styles.textGray}>
              The Atelier is more than a gallery—it&apos;s a living, breathing space where art becomes part of the experience.
              Our curated collection features works from both established and emerging artists, celebrating diverse styles,
              mediums, and perspectives.
            </p>
            <p className={styles.textGray}>
              As a guest of La Casa Dell&apos;Arte, you have free access to our gallery spaces. Immerse yourself in
              paintings, sculptures, digital art, and mixed media installations that change seasonally, ensuring
              each visit offers something new.
            </p>
            <div className={styles.badge}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Open Daily: 9:00 AM - 8:00 PM | Free Entry for Hotel Guests
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className={`${styles.section} ${styles.sectionBeige}`}>
        <div className={styles.container}>
          <h2 className={styles.galleryTitle}>Gallery</h2>
          <div className={styles.galleryGrid}>
            {artworks.map((art) => (
              <div key={art.id} className={styles.artCard}>
                <div className={styles.artImage}>
                  <Image
                    src={art.imageUrl}
                    alt={art.title}
                    width={400}
                    height={300}
                    className={styles.artworkImg}
                  />
                </div>
                <div className={styles.artContent}>
                  <h3 className={styles.artTitle}>{art.title}</h3>
                  <h3 className="text-xs text-[var(--color-gold)] font-light tracking-widest uppercase text-center">{art.subtitle}</h3>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {/* <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <h2 className={styles.expTitle}>The Artistic Experience</h2>
          <div className={styles.expGrid}> */}
            {/* Card 1 */}
            {/* <div className={styles.expCard}>
              <div className={`${styles.expIcon} ${styles.iconAccent}`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className={styles.expHeading}>Guided Tours</h3>
              <p className={styles.expText}>
                Join our curators for guided tours every weekend, where you&apos;ll learn about the artists,
                their techniques, and the stories behind each piece.
              </p>
            </div> */}

            {/* Card 2 */}
            {/* <div className={styles.expCard}>
              <div className={`${styles.expIcon} ${styles.iconGold}`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className={styles.expHeading}>Workshops</h3>
              <p className={styles.expText}>
                Participate in monthly art workshops led by featured artists. Diamond loyalty members
                enjoy exclusive access to these creative sessions.
              </p>
            </div> */}

            {/* Card 3 */}
            {/* <div className={styles.expCard}>
              <div className={`${styles.expIcon} ${styles.iconAccent}`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className={styles.expHeading}>Art Shop</h3>
              <p className={styles.expText}>
                Take a piece of your experience home. Select artworks and prints are available for
                purchase, with proceeds supporting emerging artists.
              </p>
            </div> */}

            {/* Card 4 */}
            {/* <div className={styles.expCard}>
              <div className={`${styles.expIcon} ${styles.iconGold}`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className={styles.expHeading}>Special Events</h3>
              <p className={styles.expText}>
                Experience artist talks, opening receptions, and exclusive preview events.
                Check with our concierge for the latest schedule.
              </p>
            </div> */}
          {/* </div>
        </div>
      </section> */}
    </div>
  );
}