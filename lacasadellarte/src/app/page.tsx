export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center bg-gradient-to-br from-[var(--color-beige)] to-[var(--color-beige-dark)]">
        <div className="absolute inset-0 bg-[url('/rounded-plus-connected.svg')] opacity-10"></div>
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Welcome to La Casa Dell&apos;Arte
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-[var(--color-gray)] max-w-3xl mb-8 leading-relaxed">
            Where hospitality and artistry unite in perfect harmony
          </p>
          <a
            href="/rooms"
            className="inline-block bg-[var(--color-accent)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--color-gold)] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Explore Our Rooms
          </a>
        </div>
      </section>

      {/* Main Description Section */}
      <section className="section bg-[var(--color-beige-light)] flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          <div className="max-w-4xl text-center">
            <h2 className="section-title" style={{ fontFamily: 'var(--font-display)' }}>
              A Living Gallery
            </h2>
            <p className="text-lg text-[var(--color-gray)] leading-relaxed mb-6">
              La Casa Dell&apos;Arte is more than a hotel—it&apos;s an experience where art isn&apos;t just admired, it&apos;s lived.
              Every corner of our establishment tells a story, every detail is crafted with intention, and every stay becomes a masterpiece.
            </p>
            <p className="text-lg text-[var(--color-gray)] leading-relaxed">
              Nestled in the heart of Colombo, we celebrate the fusion of luxury hospitality and artistic expression,
              creating an environment where guests can immerse themselves in beauty, comfort, and creativity.
            </p>
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="section bg-[var(--color-beige)] flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)' }}>
            Our Inspiration
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl w-full">
            <div className="space-y-6 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
                Chihuly Garden and Glass
              </h3>
              <p className="text-[var(--color-gray)] leading-relaxed">
                Drawing inspiration from the legendary Dale Chihuly&apos;s mastery of color, light, and form,
                La Casa Dell&apos;Arte embraces the philosophy that art transforms the ordinary into the extraordinary.
              </p>
              <p className="text-[var(--color-gray)] leading-relaxed">
                Just as Chihuly&apos;s glass sculptures dance with light and shadow, our spaces are designed to evoke emotion,
                spark creativity, and create unforgettable moments. We believe that every element—from architecture to
                amenities—should be a work of art in itself.
              </p>
            </div>
            <div className="bg-[var(--color-beige-dark)] h-96 rounded-lg shadow-xl flex items-center justify-center">
              <p className="text-[var(--color-gray)] text-center px-8">
                [Chihuly-Inspired Art Display]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="section bg-[var(--color-beige-light)] flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full">
            {/* Vision */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
                Our Vision
              </h3>
              <p className="text-[var(--color-gray)] leading-relaxed">
                To be recognized globally as the premier destination where art and hospitality converge,
                creating transformative experiences that inspire creativity and redefine luxury accommodation.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-[var(--color-gold)] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
                Our Mission
              </h3>
              <p className="text-[var(--color-gray)] leading-relaxed">
                To curate exceptional stays where every guest becomes part of our artistic narrative.
                We are dedicated to providing world-class service, celebrating local artistry,
                and creating a sanctuary where comfort meets creativity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-[var(--color-beige)] flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)' }}>
            Find Us
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full">
            {/* Contact Information */}
            <div className="space-y-8 text-center md:text-left">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[var(--color-text)]">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 justify-center md:justify-start">
                    <svg className="w-6 h-6 text-[var(--color-accent)] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="text-left">
                      <p className="font-medium text-[var(--color-text)]">Address</p>
                      <p className="text-[var(--color-gray)]">Galle Road, Colombo 03, Sri Lanka</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 justify-center md:justify-start">
                    <svg className="w-6 h-6 text-[var(--color-accent)] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div className="text-left">
                      <p className="font-medium text-[var(--color-text)]">Phone</p>
                      <p className="text-[var(--color-gray)]">+94 718 530 994</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 justify-center md:justify-start">
                    <svg className="w-6 h-6 text-[var(--color-accent)] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div className="text-left">
                      <p className="font-medium text-[var(--color-text)]">Email</p>
                      <a href="mailto:ladellaarte@gmail.com" className="text-[var(--color-gray)] hover:text-[var(--color-accent)] transition-colors">
                        ladellaarte@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-[var(--color-text)]">Check-in Time:</h4>
                <p className="text-[var(--color-gray)]">3:00 PM</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-[var(--color-text)]">Check-out Time:</h4>
                <p className="text-[var(--color-gray)]">12:00 PM</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-[var(--color-beige-dark)] h-96 rounded-lg shadow-xl flex items-center justify-center">
              <div className="text-center px-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-[var(--color-gray)] font-medium">
                  [Interactive Map Placeholder]
                </p>
                <p className="text-[var(--color-gray)] text-sm mt-2">
                  Galle Road, Colombo 03
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
