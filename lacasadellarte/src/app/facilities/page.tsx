import styles from './facilitiesPage.module.css';
import Image from 'next/image';

export default function FacilitiesPage() {
  const facilities = [
    {
      id: 'galleria',
      name: 'Event',
      subtitle: 'Events & Celebrations',
      description:
        "Transform your celebrations into timeless masterpieces at The Galleria. Designed with modern artistry and flexible layouts, these elegant halls are ideal for weddings, galas, and corporate events alike. From intimate gatherings to grand occasions, every detail is curated to reflect sophistication, creativity, and unforgettable moments.",
      imageUrl: '/assets/facilities/event halls.png',
      features: [
        'Capacity for up to 300 guests',
        'State-of-the-art audio-visual equipment',
        'Customizable lighting and décor',
        'Dedicated event planning team',
      ],
      imagePosition: 'left',
    },
    {
      id: 'studio',
      name: 'Gym',
      subtitle: 'Fitness & Wellness',
      description:
        'Stay active and inspired at The Studio, our fully equipped fitness centre designed for both movement and mindfulness. With state-of-the-art equipment, serene interiors, and panoramic views, it\'s a sanctuary where wellness meets creativity. Whether it\'s a morning cardio session or evening yoga, every workout here feels like a work of art.',
      imageUrl: '/assets/facilities/gym.png',
      features: [
        'Open daily from 9:00 AM to 9:00 PM',
        'Cardio machines with entertainment systems',
        'Free weights and strength training equipment',
        'Yoga and stretching area',
        'Personal training sessions available',
      ],
      imagePosition: 'right',
    },
    {
      id: 'azure',
      name: 'Pool',
      subtitle: 'Outdoor Pool',
      description:
        'Step into serenity at Azure, our shimmering outdoor pool. Framed by tranquil surroundings and soft, artistic touches, it’s the perfect retreat to unwind under the sun or cool off after a day of exploration. Enjoy refreshing beverages poolside or simply float your cares away in a setting that blends elegance and calm.',
      imageUrl: '/assets/facilities/pool.png',
      features: [
        'Heated infinity pool',
        'Poolside bar service',
        'Private cabanas (reservation required)',
        'Sun loungers with umbrellas',
      ],
      imagePosition: 'left',
    },
  ];

  return (
    <div className={styles.facilitiesPage}>
      {/* Hero */}
      <section className={styles.facilitiesHero}>
        <h1>Other Facilities</h1>
        {/*<p>Discover our world-class amenities designed to enhance your stay</p>*/}
      </section>

      {/* Facilities */}
      {facilities.map((facility, index) => (
        <section
          key={facility.id}
          className={`${styles.facilitySection} ${index % 2 !== 0 ? styles.alt : ''}`}
        >
          <div
            className={styles.facilityContent}
            style={{
              direction: facility.imagePosition === 'right' ? 'rtl' : 'ltr'
            }}
          >
            <div className={styles.facilityImage}>
              <Image
                src={facility.imageUrl}
                alt={facility.name}
                width={500}      
                height={300}      
                className={styles.image}
                
              />
            </div>
            <div className={styles.facilityText} style={{ direction: 'ltr' }}>
              <h2>{facility.name}</h2>
              <p className={styles.subtitle}>{facility.subtitle}</p>
              <p className={styles.description}>{facility.description}</p>

              <h3>Features:</h3>
              <ul>
                {facility.features.map((feature, i) => (
                  <li key={i}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width="20"
                      height="20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      {/* <section className={styles.facilitiesCta}>
        <div className={styles.facilitiesCtaBox}>
          <h3>Need More Information?</h3>
          <p>
            Our concierge team is available to answer any questions about our
            facilities and help you make the most of your stay.
          </p>
          <div className={styles.buttons}>
            <a href="mailto:ladellaarte@gmail.com">Contact Concierge</a>
            <a href="tel:+94718530994">Call Us</a>
          </div>
        </div>
      </section> */}
    </div>
  );
}
