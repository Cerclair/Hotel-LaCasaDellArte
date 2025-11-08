'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
// Tiny transparent PNG as a lightweight blurDataURL placeholder for the first hero slide
const HERO_BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/xcAAn8B9l2nC0QAAAAASUVORK5CYII=';
import { CarouselIndicators } from '@/components/ui/carousel-indicators';
import { HotelFilter } from '@/components/ui/hotel-filter';
import type { FilterState } from '@/components/ui/hotel-filter';
import HotelRoomCard from '@/components/room/hotel-room-card';
import {
  Car,
  Wifi,
  Bell,
  Sparkles,
  Umbrella,
  Utensils,
  Droplets,
  Sun,
  Dumbbell,
  Phone,
  Users as UsersIcon,
  Accessibility,
} from 'lucide-react';

export default function RoomsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    dateRange: { checkIn: null, checkOut: null },
    roomType: 'all',
    bedType: 'all',
    guests: { adults: 1, children: 0 },
  });

  type Room = {
    id: string;
    type: 'standard' | 'deluxe' | 'king-deluxe';
    bedType: 'queen' | 'king' | 'king-sofa';
    maxGuests: number;
    image: string;
    roomTypeLabel: string;
    title: string;
    description: string;
    price: number;
    amenities: string[];
    guestsLabel: string;
  };

  const roomsData: Room[] = [
    {
      id: 'standard',
      type: 'standard',
      bedType: 'queen',
      maxGuests: 3,
      image: '/assets/rooms/Standard%20Rooms/standard-room.png',
      roomTypeLabel: 'Standard Room',
      title: 'Standard Rooms',
      description: 'A haven of tranquility designed for effortless comfort and serene simplicity.',
      price: 400000,
      amenities: ['Free WiFi', 'Room Service', 'Air Conditioning', 'Premium Bedding'],
      guestsLabel: 'Adults: 2, Children: 1',
    },
    {
      id: 'deluxe',
      type: 'deluxe',
      bedType: 'king',
      maxGuests: 4,
      image: '/assets/rooms/Delux-Rooms/deluxe-room.png',
      roomTypeLabel: 'Deluxe Room',
      title: 'Deluxe Rooms',
      description: 'Step into elevated luxury with spacious, stylish rooms infused with art-inspired décor.',
      price: 500000,
      amenities: ['Free WiFi', 'Room Service', 'Mini Bar', 'City View'],
      guestsLabel: 'Adults: 2, Children: 2',
    },
    {
      id: 'king-deluxe',
      type: 'king-deluxe',
      bedType: 'king-sofa',
      maxGuests: 6,
      image: '/assets/rooms/King-Delux-Rooms/king-deluxe-suite.png',
      roomTypeLabel: 'King Deluxe Suite',
      title: 'King Deluxe Suites',
      description: 'The pinnacle of our collection embodying grandeur and grace with generous living spaces.',
      price: 700000,
      amenities: ['Free WiFi', 'Room Service', 'Kitchenette', 'Ocean View'],
      guestsLabel: 'Adults: 4, Children: 2',
    },
  ];

  const totalGuestsRequested = activeFilters.guests.adults + activeFilters.guests.children;
  const filteredRooms = roomsData.filter((room) => {
    const byType = activeFilters.roomType === 'all' || activeFilters.roomType === room.type;
    const byBed = activeFilters.bedType === 'all' || activeFilters.bedType === room.bedType;
    const byGuests = totalGuestsRequested <= room.maxGuests;
    return byType && byBed && byGuests;
  });

  // Background images for the hero slider (URL encoded for spaces)
  const heroImages = [
    '/assets/rooms/King-Delux-Rooms/King-Deluxe-Suite-Room-no1.jpg',
    '/assets/rooms/King-Delux-Rooms/King-Deluxe-Suite-Room-no2.jpg',
    '/assets/rooms/King-Delux-Rooms/king-deluxe-suite.png',
  ];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Removed unused isScrolled scroll listener (was not referenced in UI)


  return (
    <div className="min-h-screen bg-[var(--color-beige)] pb-20">

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
            >
              <Image
                src={img}
                alt="Luxury room showcase"
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
                placeholder={index === 0 ? 'blur' : 'empty'}
                blurDataURL={index === 0 ? HERO_BLUR_DATA_URL : undefined}
              />
            </div>
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
                  La Casa Dell&apos;Arte
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

                {/* Single Centered CTA Button */}
                <div className="flex justify-center opacity-0 animate-fade-in-delay-1200 mb-6">
                  <a
                    href="#rooms-showcase"
                    className="inline-block bg-[var(--color-gold)] text-white px-10 py-4 rounded-sm font-semibold hover:bg-[var(--color-gold)]/90 transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase tracking-wider text-sm"
                  >
                    Explore Our Rooms
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
        <HotelFilter onChange={setActiveFilters} />
      </section>

  {/* Rooms Showcase Section */}
  <section id="rooms-showcase" className="container mx-auto px-4 mt-12 py-16">
    {/* Separator between filter and room cards */}
    <div className="mt-8 mb-12 h-1 w-full bg-[var(--color-gold)] rounded-full" />
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[var(--color-text)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Our Room Collection
          </h2>
          <p className="text-lg text-[var(--color-gray)] max-w-2xl mx-auto">
            Each room is thoughtfully designed to provide the perfect blend of comfort, elegance, and artistic inspiration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <HotelRoomCard
                key={room.id}
                image={room.image}
                roomType={room.roomTypeLabel}
                title={room.title}
                description={room.description}
                price={room.price}
                currency="LKR "
                amenities={room.amenities}
                guests={room.maxGuests}
                size={room.guestsLabel}
                onBook={() => (window.location.href = '/booking')}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-[var(--color-gray)]">
              No rooms match your filters. Try adjusting your selections.
            </div>
          )}
        </div>

        {/* Separator between rooms and amenities */}
        <div className="mt-16 mb-12 h-1 w-full bg-[var(--color-gold)] rounded-full" />

        {/* Amenities Section */}
        <div className="text-center mb-10">
          <h3
            className="text-3xl font-bold text-[var(--color-text)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Amenities & Facilities
          </h3>
        </div>

        <div className="bg-[var(--color-beige-light)] rounded-xl shadow-md px-8 py-10">
        {(() => {
          const amenities: { label: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }[] = [
            { label: 'Free Parking', Icon: Car },
            { label: 'Free WiFi', Icon: Wifi },
            { label: 'Concierge', Icon: Bell },
            { label: 'Spa', Icon: Sparkles },
            { label: 'Beach', Icon: Umbrella },
            { label: 'On-site Restaurant', Icon: Utensils },
            { label: 'Indoor Pool', Icon: Droplets },
            { label: 'Outdoor Pool', Icon: Sun },
            { label: 'Fitness Center', Icon: Dumbbell },
            { label: 'Room Service', Icon: Phone },
            { label: 'Meeting Rooms', Icon: UsersIcon },
            { label: 'Wheelchair Access', Icon: Accessibility },
          ];
          return (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-12">
              {amenities.map(({ label, Icon }, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col items-center justify-center text-center p-2 rounded-lg transition-all duration-300 hover:bg-white/30 focus-within:bg-white/30 hover:shadow-md"
                >
                  <Icon
                    className="w-10 h-10 text-[var(--color-gold)] mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-focus-within:scale-110 group-focus-within:rotate-3"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-gold)] group-focus-within:text-[var(--color-gold)]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          );
        })()}
        </div>
      </section>
    </div>
  );
}
