import styles from './facilitiesPage.module.css';
import Image from 'next/image';

export default function FacilitiesPage() {
  const facilities = [
    {
      id: 'galleria',
      name: 'The Galleria',
      subtitle: 'Events & Celebrations',
      description:
        "An elegant event space designed for life's most memorable moments. The Galleria combines artistic grandeur with modern functionality, making it perfect for weddings, galas, corporate events, and private celebrations.",
      imageUrl: '/assets/event-halls.png',
      features: [
        'Capacity for up to 300 guests',
        'State-of-the-art audio-visual equipment',
        'Customizable lighting and décor',
        'Dedicated event planning team',
        'Catering services from our award-winning restaurants',
        'Gallery-style ambiance with rotating art displays',
      ],
      imagePosition: 'left',
    },
    {
      id: 'studio',
      name: 'The Studio',
      subtitle: 'Fitness & Wellness',
      description:
        'A modern fitness center where wellness meets inspiration. The Studio features top-of-the-line equipment, personal training services, and a motivating environment that encourages guests to maintain their fitness routines while away from home.',
      imageUrl: '/assets/gym.png',
      features: [
        'Cardio machines with entertainment systems',
        'Free weights and strength training equipment',
        'Yoga and stretching area',
        'Personal training sessions available',
        'Complimentary workout towels and water',
        '24/7 access for hotel guests',
      ],
      imagePosition: 'right',
    },
    {
      id: 'azure',
      name: 'Azure',
      subtitle: 'Outdoor Pool',
      description:
        'A serene outdoor oasis inspired by the colors of the sky and sea. Azure features a beautifully designed pool surrounded by artistic touches, comfortable loungers, and lush landscaping that creates a private retreat within the city.',
      imageUrl: '/assets/pool.png',
      features: [
        'Heated infinity pool',
        'Poolside bar service',
        'Private cabanas (reservation required)',
        'Sun loungers with umbrellas',
        'Towel service',
        'Open from 7:00 AM to 10:00 PM',
      ],
      imagePosition: 'left',
    },
  ];

  return (
    <div className={styles.facilitiesPage}>
      {/* Hero */}
      <section className={styles.facilitiesHero}>
        <h1>Other Facilities</h1>
        <p>Discover our world-class amenities designed to enhance your stay</p>
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
      <section className={styles.facilitiesCta}>
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
      </section>
    </div>
  );
}
