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
    <div className="min-h-screen bg-[var(--color-beige)]">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-[var(--color-beige-dark)] to-[var(--color-beige)] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            ZEN Spa
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-gray)] max-w-2xl mx-auto">
            A sanctuary of serenity where wellness meets artistry
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="section bg-[var(--color-beige-light)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-[var(--color-gray)] leading-relaxed mb-6">
              At ZEN Spa, we believe that wellness is an art form. Our expertly trained therapists combine traditional
              techniques with modern innovations to create personalized experiences that restore balance, rejuvenate
              the body, and calm the mind.
            </p>
            <p className="text-lg text-[var(--color-gray)] leading-relaxed">
              Every treatment is designed with intention, using premium, natural products and performed in serene
              spaces that reflect our artistic ethos. Allow yourself to unwind, refresh, and reconnect with your inner peace.
            </p>
          </div>
        </div>
      </section>

      {/* Spa Menu Section */}
      <section className="section bg-[var(--color-beige)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
            Spa Menu
          </h2>

          <div className="max-w-5xl mx-auto space-y-12">
            {treatments.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-[var(--color-text)] border-b-2 border-[var(--color-accent)] pb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  {category.category}
                </h3>
                <div className="space-y-6">
                  {category.services.map((service, index) => (
                    <div key={index} className="flex justify-between items-start pb-4 border-b border-[var(--color-beige-dark)] last:border-0">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                          {service.name}
                        </h4>
                        <p className="text-[var(--color-gray)] text-sm">
                          {service.description}
                        </p>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-[var(--color-accent)] font-semibold">
                          {service.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="section bg-[var(--color-beige-light)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
            Spa Amenities
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Sauna</h3>
              <p className="text-[var(--color-gray)] text-sm">Traditional dry sauna</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--color-gold)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Steam Room</h3>
              <p className="text-[var(--color-gray)] text-sm">Eucalyptus-infused steam</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Relaxation Lounge</h3>
              <p className="text-[var(--color-gray)] text-sm">Quiet zone with herbal teas</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--color-gold)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Premium Products</h3>
              <p className="text-[var(--color-gray)] text-sm">Organic, eco-friendly brands</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section bg-[var(--color-beige)]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
              Book Your Spa Experience
            </h3>
            <p className="text-[var(--color-gray)] mb-6">
              Advance reservations are recommended to ensure your preferred time and treatment.
              Contact our spa concierge to schedule your wellness journey.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center text-[var(--color-text)]">
                <svg className="w-5 h-5 mr-2 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Open Daily: 8:00 AM - 9:00 PM</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:ladellaarte@gmail.com"
                  className="inline-block bg-[var(--color-accent)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--color-gold)] transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  Email for Appointment
                </a>
                <a
                  href="tel:+94718530994"
                  className="inline-block bg-white border-2 border-[var(--color-accent)] text-[var(--color-accent)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  Call to Book
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
