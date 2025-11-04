'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDiningOpen, setIsDiningOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDining = () => setIsDiningOpen(!isDiningOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when at the top
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const diningOptions = [
    {
      name: 'Dining & Drinks Overview',
      href: '/dining',
    },
    {
      name: 'Palette 360',
      href: '/dining/palette-360',
    },
    {
      name: 'Dipinta',
      href: '/dining/dipinta',
    },
    {
      name: 'Lumière',
      href: '/dining/lumiere',
    },
    {
      name: 'Vetro',
      href: '/dining/vetro',
    },
    {
      name: 'In-Room Dining',
      href: '/dining/in-room',
    },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .nav-logo-ring {
          box-shadow: 0 0 0 2px #8B7355 !important;
          transition: all 0.3s ease !important;
        }
        .nav-logo-ring:hover {
          box-shadow: 0 0 0 2px #8B7355, 0 0 20px 4px rgba(212, 175, 55, 0.6) !important;
        }
      `}} />
      <nav className={`sticky top-0 z-50 bg-[#E8E4D8] shadow-md backdrop-blur-sm transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo and Brand Name */}
          <Link href="/" className="flex items-center gap-4 transition-all duration-300 group">
            <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg nav-logo-ring" style={{ borderRadius: '50%', width: '64px', height: '64px', minWidth: '64px', minHeight: '64px' }}>
              <Image
                src="/logo/logo.png"
                alt="La Casa Dell'Arte Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl lg:text-3xl font-bold text-[var(--color-text)] tracking-tight" style={{ fontFamily: "'Brittany Signature', cursive", fontSize: '1.8rem', lineHeight: '1.5' }}>
                La Casa Dell&apos;Arte
              </span>
              <span className="text-xs text-[var(--color-accent)] font-light tracking-widest uppercase">
                Artistic Hospitality
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            <Link
              href="/"
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium transition-all duration-300 relative group py-2"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              href="/rooms"
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium transition-all duration-300 relative group py-2"
            >
              Rooms
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Dining Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsDiningOpen(true)}
              onMouseLeave={() => setIsDiningOpen(false)}
            >
              <button
                className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium transition-all duration-300 flex items-center gap-2 py-2"
              >
                <span>Dining & Drinks</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isDiningOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Clean Dropdown Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-0 w-64 bg-[#E8E4D8] shadow-xl rounded-xl overflow-hidden transition-all duration-300 border border-[var(--color-accent)]/20 ${
                  isDiningOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                }`}
              >
                {/* Menu Items */}
                <div className="py-2 px-8">
                  {diningOptions.map((option) => (
                    <Link
                      key={option.href}
                      href={option.href}
                      className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium transition-colors duration-300 py-1.5 block text-center"
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/atelier"
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium transition-all duration-300 relative group py-2"
            >
              Atelier
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              href="/spa"
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium transition-all duration-300 relative group py-2"
            >
              SPA
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              href="/facilities"
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium transition-all duration-300 relative group py-2"
            >
              Facilities
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              href="/loyalty"
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium transition-all duration-300 relative group py-2"
            >
              Loyalty
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[var(--color-text)] p-2 hover:bg-[var(--color-beige)] rounded-lg transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 space-y-2 animate-fadeIn">
            <Link
              href="/"
              className="block px-4 py-3 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/rooms"
              className="block px-4 py-3 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Rooms
            </Link>

            {/* Mobile Dining Dropdown */}
            <div className="rounded-lg overflow-hidden bg-white/50">
              <button
                className="w-full text-left px-4 py-3 text-[var(--color-text)] hover:bg-[var(--color-beige)] transition-colors flex items-center justify-between font-medium"
                onClick={toggleDining}
              >
                <span>Dining & Drinks</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isDiningOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDiningOpen && (
                <div className="bg-[#F5F5DC]/30 py-2 space-y-1">
                  {diningOptions.map((option) => (
                    <Link
                      key={option.href}
                      href={option.href}
                      className="block px-6 py-3 text-[var(--color-text)] hover:bg-[#E8E4D8]/50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-sm font-semibold">{option.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/atelier"
              className="block px-4 py-3 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Atelier
            </Link>

            <Link
              href="/spa"
              className="block px-4 py-3 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              SPA
            </Link>

            <Link
              href="/facilities"
              className="block px-4 py-3 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Facilities
            </Link>

            <Link
              href="/loyalty"
              className="block px-4 py-3 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Loyalty
            </Link>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}
