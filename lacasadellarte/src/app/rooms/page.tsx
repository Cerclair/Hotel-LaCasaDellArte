'use client';

export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-beige)]">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-br from-[var(--color-beige-dark)] to-[var(--color-beige)] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center z-10">
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-wide text-[var(--color-text)]" 
            style={{ 
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.05em'
            }}
          >
            THE HOTEL
          </h1>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-accent)] tracking-widest"
            style={{ 
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.15em'
            }}
          >
            La Casa Dell'Arte
          </h2>
          <div className="mt-8 w-24 h-1 bg-[var(--color-gold)]"></div>
        </div>
      </section>

      {/* Room Cards Section - You can add your room display logic here */}
      <section className="container mx-auto px-4 py-16">
        {/* Add your room cards and filtering logic here */}
      </section>
    </div>
  );
}
