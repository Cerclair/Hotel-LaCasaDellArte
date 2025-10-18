export default function AtelierPage() {
  const artworks = [
    { id: 1, title: 'Chromatic Dreams', artist: 'Maria Santos' },
    { id: 2, title: 'Urban Symphony', artist: 'David Chen' },
    { id: 3, title: 'Liquid Light', artist: 'Sofia Andersson' },
    { id: 4, title: 'Abstract Harmony', artist: 'James Martinez' },
    { id: 5, title: 'Colors of Time', artist: 'Elena Petrova' },
    { id: 6, title: 'Geometric Poetry', artist: 'Michael O\'Brien' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-beige)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-beige-dark)] to-[var(--color-beige)] py-16">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Atelier - Art Gallery
          </h1>
          <p className="text-xl text-[var(--color-gray)] max-w-3xl leading-relaxed">
            Where contemporary and classic art converge in a celebration of human creativity
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="section bg-[var(--color-beige-light)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-[var(--color-gray)] leading-relaxed mb-6">
              The Atelier is more than a gallery—it&apos;s a living, breathing space where art becomes part of the experience.
              Our curated collection features works from both established and emerging artists, celebrating diverse styles,
              mediums, and perspectives.
            </p>
            <p className="text-lg text-[var(--color-gray)] leading-relaxed mb-6">
              As a guest of La Casa Dell&apos;Arte, you have free access to our gallery spaces. Immerse yourself in
              paintings, sculptures, digital art, and mixed media installations that change seasonally, ensuring
              each visit offers something new.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg font-semibold">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Open Daily: 9:00 AM - 8:00 PM | Free Entry for Hotel Guests
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section bg-[var(--color-beige)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
            Gallery
          </h2>

          {/* Artwork Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {artworks.map((artwork) => (
              <div key={artwork.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-80 bg-[var(--color-beige-dark)] flex items-center justify-center">
                  <p className="text-[var(--color-gray)] text-center px-4">
                    [{artwork.title}]
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    {artwork.title}
                  </h3>
                  <p className="text-[var(--color-accent)] font-medium">
                    by {artwork.artist}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section bg-[var(--color-beige-light)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
              The Artistic Experience
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-[var(--color-accent)] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--color-text)]">Guided Tours</h3>
                <p className="text-[var(--color-gray)]">
                  Join our curators for guided tours every weekend, where you&apos;ll learn about the artists,
                  their techniques, and the stories behind each piece.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-[var(--color-gold)] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--color-text)]">Workshops</h3>
                <p className="text-[var(--color-gray)]">
                  Participate in monthly art workshops led by featured artists. Diamond loyalty members
                  enjoy exclusive access to these creative sessions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-[var(--color-accent)] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--color-text)]">Art Shop</h3>
                <p className="text-[var(--color-gray)]">
                  Take a piece of your experience home. Select artworks and prints are available for
                  purchase, with proceeds supporting emerging artists.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-[var(--color-gold)] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--color-text)]">Special Events</h3>
                <p className="text-[var(--color-gray)]">
                  Experience artist talks, opening receptions, and exclusive preview events.
                  Check with our concierge for the latest schedule.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
