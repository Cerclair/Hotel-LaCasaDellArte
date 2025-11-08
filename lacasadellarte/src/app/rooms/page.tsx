'use client';

export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-beige)]">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] min-h-[400px] flex items-center justify-center bg-gradient-to-br from-[var(--color-beige-dark)] to-[var(--color-beige)] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center z-10">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-4 leading-tight tracking-wide text-[var(--color-text)]"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.05em'
            }}
          >
            THE BOUTIQUE HOTEL
          </h1>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--color-accent)] tracking-widest"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.15em'
            }}
          >
            OF WESTIN
          </h2>
          <div className="mt-6 md:mt-8 w-16 md:w-24 h-1 bg-[var(--color-gold)]"></div>
        </div>
      </section>

      {/* Room Cards Section - You can add your room display logic here */}
      <section className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Add your room cards and filtering logic here */}
      </section>
    </div>
  );
}
