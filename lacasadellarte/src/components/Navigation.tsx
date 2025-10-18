'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDiningOpen, setIsDiningOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDining = () => setIsDiningOpen(!isDiningOpen);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-beige-dark)] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Name */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="text-2xl font-bold text-[var(--color-text)]">
              La Casa Dell&apos;Arte
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium transition-colors"
            >
              Home
            </Link>

            <Link
              href="/rooms"
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium transition-colors"
            >
              Rooms
            </Link>

            {/* Dining Dropdown */}
            <div className="relative group">
              <button
                className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium transition-colors flex items-center space-x-1"
                onMouseEnter={() => setIsDiningOpen(true)}
                onMouseLeave={() => setIsDiningOpen(false)}
              >
                <span>Dining</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-200 ${
                  isDiningOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setIsDiningOpen(true)}
                onMouseLeave={() => setIsDiningOpen(false)}
              >
                <Link
                  href="/dining"
                  className="block px-4 py-3 text-[var(--color-text)] hover:bg-[var(--color-beige-light)] transition-colors"
                >
                  All Dining Options
                </Link>
                <Link
                  href="/dining/palette-360"
                  className="block px-4 py-3 text-[var(--color-text)] hover:bg-[var(--color-beige-light)] transition-colors"
                >
                  Palette 360
                </Link>
                <Link
                  href="/dining/dipinta"
                  className="block px-4 py-3 text-[var(--color-text)] hover:bg-[var(--color-beige-light)] transition-colors"
                >
                  Dipinta
                </Link>
                <Link
                  href="/dining/lumiere"
                  className="block px-4 py-3 text-[var(--color-text)] hover:bg-[var(--color-beige-light)] transition-colors"
                >
                  Lumière
                </Link>
                <Link
                  href="/dining/vetro"
                  className="block px-4 py-3 text-[var(--color-text)] hover:bg-[var(--color-beige-light)] transition-colors"
                >
                  Vetro
                </Link>
                <Link
                  href="/dining/in-room"
                  className="block px-4 py-3 text-[var(--color-text)] hover:bg-[var(--color-beige-light)] transition-colors"
                >
                  In-Room Dining
                </Link>
              </div>
            </div>

            <Link
              href="/atelier"
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium transition-colors"
            >
              Atelier
            </Link>

            <Link
              href="/spa"
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium transition-colors"
            >
              SPA
            </Link>

            <Link
              href="/facilities"
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium transition-colors"
            >
              Facilities
            </Link>

            <Link
              href="/loyalty"
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium transition-colors"
            >
              Loyalty
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[var(--color-text)] p-2"
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
          <div className="lg:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/rooms"
              className="block px-4 py-2 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Rooms
            </Link>

            {/* Mobile Dining Dropdown */}
            <div>
              <button
                className="w-full text-left px-4 py-2 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded transition-colors flex items-center justify-between"
                onClick={toggleDining}
              >
                <span>Dining</span>
                <svg className={`w-4 h-4 transition-transform ${isDiningOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDiningOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link
                    href="/dining"
                    className="block px-4 py-2 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Dining Options
                  </Link>
                  <Link
                    href="/dining/palette-360"
                    className="block px-4 py-2 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Palette 360
                  </Link>
                  <Link
                    href="/dining/dipinta"
                    className="block px-4 py-2 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dipinta
                  </Link>
                  <Link
                    href="/dining/lumiere"
                    className="block px-4 py-2 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Lumière
                  </Link>
                  <Link
                    href="/dining/vetro"
                    className="block px-4 py-2 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Vetro
                  </Link>
                  <Link
                    href="/dining/in-room"
                    className="block px-4 py-2 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    In-Room Dining
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/atelier"
              className="block px-4 py-2 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Atelier
            </Link>

            <Link
              href="/spa"
              className="block px-4 py-2 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              SPA
            </Link>

            <Link
              href="/facilities"
              className="block px-4 py-2 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Facilities
            </Link>

            <Link
              href="/loyalty"
              className="block px-4 py-2 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Loyalty
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
