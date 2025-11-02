import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#E8E4D8] mt-auto border-t-2 border-[var(--color-accent)]/10">
      <div className="container mx-auto px-6 lg:px-8 pb-6" style={{ paddingTop: '15px' }}>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT SECTION - Logo, Brand Name & Social Icons */}
          <div className="lg:col-span-3 flex flex-col">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center gap-4 mb-4 hover:opacity-90 transition-all duration-300 group">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg ring-2 ring-[var(--color-accent)]/20 group-hover:ring-[var(--color-accent)]/40 transition-all">
                <Image
                  src="/logo/logo.png"
                  alt="La Casa Dell'Arte Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[var(--color-text)] tracking-tight whitespace-nowrap">
                  La Casa Dell&apos;Arte
                </span>
                <span className="text-xs text-[var(--color-accent)] font-light tracking-widest uppercase">
                  Artistic Hospitality
                </span>
              </div>
            </Link>

            {/* Social Media Icons - Only Facebook and Instagram */}
            <div className="flex gap-2">
              <a
                href="#"
                className="w-7 h-7 flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer"
                aria-label="Facebook"
              >
                <Image
                  src="/social-icons/facebook.svg"
                  alt="Facebook"
                  width={28}
                  height={28}
                  className="object-contain"
                  style={{ filter: 'brightness(0) saturate(100%) invert(44%) sepia(13%) saturate(854%) hue-rotate(353deg) brightness(95%) contrast(88%)' }}
                />
              </a>

              <a
                href="#"
                className="w-7 h-7 flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer"
                aria-label="Instagram"
              >
                <Image
                  src="/social-icons/insta.svg"
                  alt="Instagram"
                  width={28}
                  height={28}
                  className="object-contain"
                  style={{ filter: 'brightness(0) saturate(100%) invert(44%) sepia(13%) saturate(854%) hue-rotate(353deg) brightness(95%) contrast(88%)' }}
                />
              </a>
            </div>
          </div>

          {/* MIDDLE SECTION - 3 Column Navigation Links */}
          <div className="lg:col-span-6 flex items-start justify-center">
            <div className="grid grid-cols-3 gap-6 w-full">

              {/* Column 1 */}
              <div className="flex justify-center">
                <nav className="flex flex-col space-y-2">
                  <Link
                    href="/"
                    className="text-base font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-all duration-300 relative group"
                  >
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link
                    href="/rooms"
                    className="text-base font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-all duration-300 relative group"
                  >
                    Rooms
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link
                    href="/dining"
                    className="text-base font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-all duration-300 relative group"
                  >
                    Dining & Drinks
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </nav>
              </div>

              {/* Column 2 */}
              <div className="flex justify-center">
                <nav className="flex flex-col space-y-2">
                  <Link
                    href="/atelier"
                    className="text-base font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-all duration-300 relative group"
                  >
                    Atelier
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link
                    href="/spa"
                    className="text-base font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-all duration-300 relative group"
                  >
                    SPA
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </nav>
              </div>

              {/* Column 3 */}
              <div className="flex justify-center">
                <nav className="flex flex-col space-y-2">
                  <Link
                    href="/facilities"
                    className="text-base font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-all duration-300 relative group"
                  >
                    Facilities
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <Link
                    href="/loyalty"
                    className="text-base font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-all duration-300 relative group"
                  >
                    Loyalty
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </nav>
              </div>

            </div>
          </div>

          {/* RIGHT SECTION - Contact Information (Right Aligned) */}
          <div className="lg:col-span-3 flex items-start justify-end">
            <div className="space-y-2 text-right">
              {/* Phone */}
              <div className="flex items-center justify-end gap-2 text-[var(--color-text)]">
                <svg className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-base font-semibold">+94 718 530 994</span>
              </div>

              {/* Email */}
              <div className="flex items-center justify-end gap-2 text-[var(--color-text)]">
                <svg className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:ladellaarte@gmail.com"
                  className="text-base font-semibold hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  ladellaarte@gmail.com
                </a>
              </div>

              {/* Address */}
              <div className="flex items-center justify-end gap-2 text-[var(--color-text)]">
                <svg className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-base font-semibold whitespace-nowrap">Galle Road, Colombo 03, Sri Lanka</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR - Separator, Terms & Copyright */}
        <div className="border-t border-[var(--color-accent)]/20 mt-2 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">

            {/* Left - Terms & Privacy */}
            <div className="flex items-center gap-3 text-[var(--color-text)]" style={{ fontSize: '15px' }}>
              <Link
                href="/terms"
                className="font-medium hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                Terms & Conditions
              </Link>
              <span className="text-[var(--color-accent)]">|</span>
              <Link
                href="/privacy"
                className="font-medium hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                Privacy Statement
              </Link>
            </div>

            {/* Right - Copyright */}
            <div className="text-[var(--color-text)] font-medium" style={{ fontSize: '15px' }}>
              &copy; {new Date().getFullYear()} LaCasaDellArte. All rights reserved.
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
