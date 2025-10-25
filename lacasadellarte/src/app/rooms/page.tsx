'use client';

import { useState, useEffect } from 'react';
import { SmoothScrollHero } from '@/components/ui/modern-hero';

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
          className="fixed top-20 right-4 z-[100] bg-[var(--color-gold)] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[var(--color-accent)] transition-colors text-sm font-semibold"
        >
          Switch to Classic Hero
        </button>
        <SmoothScrollHero />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-beige)]">
      {/* Toggle Button */}
      <button
        onClick={() => setUseModernHero(true)}
        className="fixed top-20 right-4 z-50 bg-[var(--color-gold)] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[var(--color-accent)] transition-colors text-sm font-semibold"
      >
        Try Modern Hero
      </button>

      {/* Enhanced Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
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
          
          {/* Artistic Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('/rounded-plus-connected.svg')] opacity-5"></div>
        </div>

        {/* Hero Content */}
        <div className="relative w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center z-10">
          {/* Animated Tagline */}
          <div className="mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-[var(--color-gold)] text-sm md:text-base uppercase tracking-[0.3em] font-light">
              Experience Artistry in Every Detail
            </p>
          </div>

          {/* Main Heading */}
          <h1 
            className="text-5xl md:text-6xl lg:text-8xl font-bold mb-4 leading-tight tracking-wide text-white opacity-0 animate-fade-in" 
            style={{ 
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.05em',
              textShadow: '2px 2px 20px rgba(0,0,0,0.5)',
              animationDelay: '0.4s'
            }}
          >
            OUR ROOMS & SUITES
          </h1>

          {/* Subtitle */}
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--color-gold)] tracking-widest mb-8 opacity-0 animate-fade-in"
            style={{ 
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.15em',
              animationDelay: '0.6s'
            }}
          >
            La Casa Dell'Arte
          </h2>

          {/* Decorative Divider */}
          <div className="flex items-center gap-4 mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="w-16 h-[2px] bg-[var(--color-gold)]"></div>
            <svg className="w-6 h-6 text-[var(--color-gold)]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="w-16 h-[2px] bg-[var(--color-gold)]"></div>
          </div>

          {/* Description */}
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mb-10 leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
            Where every room is a masterpiece, blending luxury accommodation with artistic inspiration. 
            Discover your perfect sanctuary among our thoughtfully curated spaces.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s' }}>
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

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 animate-bounce-slow" style={{ animationDelay: '1.5s' }}>
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/70 text-xs uppercase tracking-widest">Scroll to Explore</span>
              <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 right-8 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[var(--color-gold)] w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
      </section>
    </div>
  );
}
