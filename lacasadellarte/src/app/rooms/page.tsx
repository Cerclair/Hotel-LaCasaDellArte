'use client';

import { useState, useEffect } from 'react';
import { SmoothScrollHero } from '@/components/ui/modern-hero';
import { CarouselIndicators } from '@/components/ui/carousel-indicators';
import { HotelFilter } from '@/components/ui/hotel-filter';

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
      <section className="relative h-[90vh] flex items-center justify-center">
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
          {/* Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        {/* Hero Content with Blurred Background Box */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center z-[var(--z-base)]">
          {/* Blurred Backdrop Box */}
          <div className="backdrop-blur-lg bg-black/30 rounded-3xl px-12 sm:px-16 lg:px-24 shadow-2xl border border-white/2 w-full max-w-5xl">
            {/* Inner container with vertical padding */}
            <div className="py-20 sm:py-24 lg:py-28">
              <div className="flex flex-col items-center text-center gap-8">
                {/* Top Spacer - Creates breathing room at the top */}
                <div className="h-8 sm:h-10 lg:h-12"></div>
                
                {/* Animated Tagline */}
                <div className="opacity-0 animate-fade-in-delay-200">
                  <p className="text-[var(--color-gold)] text-sm md:text-base uppercase tracking-[0.3em] font-light">
                    Experience Artistry in Every Detail
                  </p>
                </div>

                {/* Main Heading */}
                <h1 
                  className="text-5xl md:text-6xl lg:text-8xl font-bold leading-tight tracking-wide text-white opacity-0 animate-fade-in-delay-400"
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
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--color-gold)] tracking-widest opacity-0 animate-fade-in-delay-600"
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
                <p className="text-white/95 text-lg md:text-xl max-w-3xl leading-relaxed opacity-0 animate-fade-in-delay-1000">
                  Where every room is a masterpiece, blending luxury accommodation with artistic inspiration. 
                  Discover your perfect sanctuary among our thoughtfully curated spaces.
                </p>

                {/* Spacer for extra gap before buttons */}
                <div className="h-6"></div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-delay-1200 mb-8">
                  <a
                    href="#rooms-showcase"
                    className="inline-block bg-[var(--color-gold)] text-white px-10 py-4 rounded-sm font-semibold hover:bg-[var(--color-gold)]/90 transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase tracking-wider text-sm"
                  >
                    Explore Our Rooms
                  </a>
                  <a
                    href="/booking"
                    className="inline-block bg-transparent border-2 border-white text-white px-10 py-4 rounded-sm font-semibold hover:bg-white hover:text-[var(--color-text)] transition-all duration-300 uppercase tracking-wider text-sm"
                  >
                    Book Now
                  </a>
                </div>
                {/* Top Spacer - Creates breathing room at the top */}
                <div className="h-8 sm:h-10 lg:h-12"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-bounce-slow-delay-1500 z-[var(--z-base)]">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/70 text-xs uppercase tracking-widest">Scroll to Explore</span>
            <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
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
      <section id="rooms-showcase" className="container mx-auto px-4 py-16">
        {/* Your room cards/showcase will go here */}
      </section>
    </div>
  );
}
