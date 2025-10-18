export default function FacilitiesPage() {
  const facilities = [
    {
      id: 'galleria',
      name: 'The Galleria',
      subtitle: 'Events & Celebrations',
      description: 'An elegant event space designed for life\'s most memorable moments. The Galleria combines artistic grandeur with modern functionality, making it perfect for weddings, galas, corporate events, and private celebrations.',
      features: [
        'Capacity for up to 300 guests',
        'State-of-the-art audio-visual equipment',
        'Customizable lighting and décor',
        'Dedicated event planning team',
        'Catering services from our award-winning restaurants',
        'Gallery-style ambiance with rotating art displays'
      ],
      imagePosition: 'left'
    },
    {
      id: 'studio',
      name: 'The Studio',
      subtitle: 'Fitness & Wellness',
      description: 'A modern fitness center where wellness meets inspiration. The Studio features top-of-the-line equipment, personal training services, and a motivating environment that encourages guests to maintain their fitness routines while away from home.',
      features: [
        'Cardio machines with entertainment systems',
        'Free weights and strength training equipment',
        'Yoga and stretching area',
        'Personal training sessions available',
        'Complimentary workout towels and water',
        '24/7 access for hotel guests'
      ],
      imagePosition: 'right'
    },
    {
      id: 'azure',
      name: 'Azure',
      subtitle: 'Outdoor Pool',
      description: 'A serene outdoor oasis inspired by the colors of the sky and sea. Azure features a beautifully designed pool surrounded by artistic touches, comfortable loungers, and lush landscaping that creates a private retreat within the city.',
      features: [
        'Heated infinity pool',
        'Poolside bar service',
        'Private cabanas (reservation required)',
        'Sun loungers with umbrellas',
        'Towel service',
        'Open from 7:00 AM to 10:00 PM'
      ],
      imagePosition: 'left'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-beige)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-beige-dark)] to-[var(--color-beige)] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Other Facilities
          </h1>
          <p className="text-xl text-center text-[var(--color-gray)] max-w-3xl mx-auto">
            Discover our world-class amenities designed to enhance your stay
          </p>
        </div>
      </section>

      {/* Facilities Sections */}
      <div>
        {facilities.map((facility, index) => (
          <section
            key={facility.id}
            className={`section ${index % 2 === 0 ? 'bg-[var(--color-beige-light)]' : 'bg-[var(--color-beige)]'}`}
          >
            <div className="container mx-auto px-4">
              <div className={`grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto ${facility.imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
                {/* Image */}
                <div className={`${facility.imagePosition === 'right' ? 'md:order-2' : ''}`}>
                  <div className="bg-[var(--color-beige-dark)] h-96 rounded-lg shadow-xl flex items-center justify-center">
                    <p className="text-[var(--color-gray)] text-center px-8">
                      [{facility.name} Image]
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className={`${facility.imagePosition === 'right' ? 'md:order-1' : ''}`}>
                  <h2 className="text-3xl font-bold mb-2 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
                    {facility.name}
                  </h2>
                  <p className="text-xl text-[var(--color-accent)] font-semibold mb-4">
                    {facility.subtitle}
                  </p>
                  <p className="text-[var(--color-gray)] leading-relaxed mb-6">
                    {facility.description}
                  </p>

                  {/* Features List */}
                  <h3 className="font-semibold text-[var(--color-text)] mb-3">Features:</h3>
                  <ul className="space-y-2">
                    {facility.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-[var(--color-gray)]">
                        <svg className="w-5 h-5 mr-2 mt-0.5 text-[var(--color-accent)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Contact CTA */}
      <section className="section bg-[var(--color-beige-light)]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
              Need More Information?
            </h3>
            <p className="text-[var(--color-gray)] mb-6">
              Our concierge team is available to answer any questions about our facilities and help you make the most of your stay.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:ladellaarte@gmail.com"
                className="inline-block bg-[var(--color-accent)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--color-gold)] transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Contact Concierge
              </a>
              <a
                href="tel:+94718530994"
                className="inline-block bg-white border-2 border-[var(--color-accent)] text-[var(--color-accent)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
