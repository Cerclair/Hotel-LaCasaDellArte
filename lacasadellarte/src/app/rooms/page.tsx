'use client';

import { useState, useEffect } from 'react';
import { SmoothScrollHero } from '@/components/ui/modern-hero';
import { CarouselIndicators } from '@/components/ui/carousel-indicators';
import { HotelFilter } from '@/components/ui/hotel-filter';
import HotelRoomCard from '@/components/room/hotel-room-card';

export default function RoomsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [useModernHero, setUseModernHero] = useState(false); // Toggle between hero versions

  // Background images for the hero slider (URL encoded for spaces)
  const heroImages = [
    '/IMG%20resources%20-%20Rooms/Rooms/King%20Delux%20Rooms/King%20Deluxe%20Suite%20Room%20no1.jpg',
    '/IMG%20resources%20-%20Rooms/Rooms/King%20Delux%20Rooms/King%20Deluxe%20Suite%20Room%20no2.jpg',
    '/IMG%20resources%20-%20Rooms/Rooms/King%20Delux%20Rooms/king%20deluxe%20suite.png',
  ];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // If modern hero is enabled, render it
  if (useModernHero) {
    return (
      <div className="relative">
        {/* Toggle Button */}
        <button
          onClick={() => setUseModernHero(false)}
          className="fixed top-20 right-4 z-[var(--z-modal)] bg-[var(--color-gold)] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[var(--color-accent)] transition-colors text-sm font-semibold"
        >
          Switch to Classic Hero
        </button>
        <SmoothScrollHero />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-beige)] pb-20">
      {/* Toggle Button */}
      <button
        onClick={() => setUseModernHero(true)}
        className="fixed top-20 right-4 z-[var(--z-controls)] bg-[var(--color-gold)] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[var(--color-accent)] transition-colors text-sm font-semibold"
      >
        Try Modern Hero
      </button>

  {/* Enhanced Hero Section */}
  <section className="relative min-h-[85vh] md:min-h-[92vh] lg:min-h-screen xl:min-h-[100svh] flex items-center justify-center">
        {/* Background Image Slider */}
        <div className="absolute inset-0 overflow-hidden">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
        </div>

        {/* Hero Content with Blurred Background Box */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center z-[var(--z-base)]">
          {/* Wrapper constrained to blurred box width for proper centering */}
          <div className="relative w-full max-w-[min(92vw,56rem)]">
            {/* Blurred Backdrop Box */}
            <div className="backdrop-blur-lg bg-black/30 rounded-none shadow-xl w-full px-4 sm:px-8 lg:px-12">
              {/* Inner container with vertical padding */}
              <div className="py-10 sm:py-12 md:py-14 lg:py-16">
                <div className="flex flex-col items-center text-center gap-6 md:gap-8">
                {/* Top Spacer - Creates breathing room at the top */}
                <div className="h-2 sm:h-4 md:h-6"></div>
                
                {/* Animated Tagline */}
                <div className="opacity-0 animate-fade-in-delay-200">
                  <p className="text-[var(--color-gold)] text-sm md:text-base uppercase tracking-[0.3em] font-light">
                    Experience Artistry in Every Detail
                  </p>
                </div>

                {/* Main Heading */}
                <h1 
                  className="font-semibold leading-tight tracking-wide text-white opacity-0 animate-fade-in-delay-400 text-[clamp(2rem,6.5vw,3.75rem)]"
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '0.05em',
                    textShadow: 'var(--shadow-text-hero)'
                  }}
                >
                  OUR ROOMS & SUITES
                </h1>

                {/* Subtitle */}
                <h2 
                  className="font-semibold text-[var(--color-gold)] tracking-widest opacity-0 animate-fade-in-delay-600 text-[clamp(1.25rem,4.5vw,2.5rem)]"
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '0.15em'
                  }}
                >
                  La Casa Dell'Arte
                </h2>

                {/* Decorative Divider */}
                <div className="flex items-center gap-4 opacity-0 animate-fade-in-delay-800">
                  <div className="w-16 h-[2px] bg-[var(--color-gold)]"></div>
                  <svg className="w-6 h-6 text-[var(--color-gold)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div className="w-16 h-[2px] bg-[var(--color-gold)]"></div>
                </div>

                {/* Description */}
                <p className="text-white/95 text-[clamp(1rem,2.8vw,1.25rem)] max-w-[min(85vw,48rem)] leading-relaxed opacity-0 animate-fade-in-delay-1000">
                  Where every room is a masterpiece, blending luxury accommodation with artistic inspiration. 
                  Discover your perfect sanctuary among our thoughtfully curated spaces.
                </p>

                {/* Spacer for extra gap before buttons */}
                <div className="h-4"></div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-delay-1200 mb-6">
                  <a
                    href="#rooms-showcase"
                    className="inline-block bg-[var(--color-gold)] text-white px-8 py-3 sm:px-10 sm:py-4 rounded-sm font-semibold hover:bg-[var(--color-gold)]/90 transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase tracking-wider text-sm"
                  >
                    Explore Our Rooms
                  </a>
                  <a
                    href="/booking"
                    className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 sm:px-10 sm:py-4 rounded-sm font-semibold hover:bg-white hover:text-[var(--color-text)] transition-all duration-300 uppercase tracking-wider text-sm"
                  >
                    Book Now
                  </a>
                </div>
                {/* Scroll Indicator - centered at bottom inside blurred box */}
                <div className="flex flex-col items-center gap-2 opacity-0 animate-bounce-slow-delay-1500">
                  <span className="text-white/70 text-xs uppercase tracking-widest">Scroll to Explore</span>
                  <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                {/* Bottom Spacer */}
                {/* <div className="h-6 md:h-8 lg:h-10"></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 right-8 z-[var(--z-indicators)]">
          <CarouselIndicators
            slideCount={heroImages.length}
            currentSlide={currentSlide}
            onSlideChange={setCurrentSlide}
          />
        </div>
      </section>

      {/* Hotel Room Filter Section */}
      <section id="rooms-filter" className="relative mt-12 z-20">
        <HotelFilter />
      </section>

      {/* Rooms Showcase Section */}
      <section id="rooms-showcase" className="container mx-auto px-4 mt-16 md:mt-24 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[var(--color-text)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Our Room Collection
          </h2>
          <p className="text-lg text-[var(--color-gray)] max-w-2xl mx-auto">
            Each room is thoughtfully designed to provide the perfect blend of comfort, elegance, and artistic inspiration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Standard Room */}
          <HotelRoomCard
            image="/IMG resources - Rooms/Rooms/Standard Rooms/standard room.png"
            roomType="Standard Room"
            title="Standard Rooms"
            description="A haven of tranquility designed for effortless comfort and serene simplicity."
            price={400000}
            currency="LKR "
            amenities={["Free WiFi", "Room Service", "Air Conditioning", "Premium Bedding"]}
            guests={3}
            size="Adults: 2, Children: 1"
            onBook={() => window.location.href = '/booking'}
          />

          {/* Deluxe Room */}
          <HotelRoomCard
            image="/IMG resources - Rooms/Rooms/Delux Rooms/deluxe room.png"
            roomType="Deluxe Room"
            title="Deluxe Rooms"
            description="Step into elevated luxury with spacious, stylish rooms infused with art-inspired décor."
            price={500000}
            currency="LKR "
            amenities={["Free WiFi", "Room Service", "Mini Bar", "City View"]}
            guests={4}
            size="Adults: 2, Children: 2"
            onBook={() => window.location.href = '/booking'}
          />

          {/* King Deluxe Suite */}
          <HotelRoomCard
            image="/IMG resources - Rooms/Rooms/King Delux Rooms/king deluxe suite.png"
            roomType="King Deluxe Suite"
            title="King Deluxe Suites"
            description="The pinnacle of our collection embodying grandeur and grace with generous living spaces."
            price={700000}
            currency="LKR "
            amenities={["Free WiFi", "Room Service", "Kitchenette", "Ocean View"]}
            guests={6}
            size="Adults: 4, Children: 2"
            onBook={() => window.location.href = '/booking'}
          />
        </div>
      </section>
    </div>
  );
}
