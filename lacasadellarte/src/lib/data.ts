import { Room, Restaurant, LoyaltyProgram } from '@/types';

// Room Data
export const rooms: Room[] = [
  {
    id: '1',
    name: 'Standard Room',
    type: 'standard',
    price: 400000,
    description: 'Elegant and comfortable rooms featuring artistic touches and modern amenities, perfect for a relaxing stay.',
    image: '/rooms/standard.jpg',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'Flat-screen TV',
      'Mini Bar',
      'In-room Safe',
      'Coffee/Tea Maker',
      'Daily Housekeeping',
      'Bathroom Amenities'
    ],
    maxGuests: {
      adults: 2,
      children: 1
    },
    size: '320 sq ft',
    bedType: 'Queen Bed',
    accessible: true
  },
  {
    id: '2',
    name: 'Deluxe Room',
    type: 'deluxe',
    price: 5000000,
    description: 'Spacious rooms with premium furnishings, enhanced artistic elements, and panoramic city views.',
    image: '/rooms/deluxe.jpg',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'Flat-screen TV',
      'Mini Bar',
      'In-room Safe',
      'Espresso Machine',
      'Luxury Bathrobes',
      'Premium Bathroom Amenities',
      'Work Desk',
      'City View',
      'Complimentary Breakfast'
    ],
    maxGuests: {
      adults: 2,
      children: 2
    },
    size: '450 sq ft',
    bedType: 'King Bed',
    accessible: true
  },
  {
    id: '3',
    name: 'King Deluxe Suite',
    type: 'suite',
    price: 7000000,
    description: 'Our finest accommodation featuring separate living areas, exclusive artworks, and unparalleled luxury amenities.',
    image: '/rooms/suite.jpg',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'Multiple Flat-screen TVs',
      'Full Bar',
      'In-room Safe',
      'Espresso Machine',
      'Luxury Bathrobes & Slippers',
      'Premium Spa Amenities',
      'Separate Living Area',
      'Dining Area',
      'Ocean View',
      'Butler Service',
      'Complimentary Breakfast',
      'Private Balcony',
      'Exclusive Art Pieces'
    ],
    maxGuests: {
      adults: 4,
      children: 2
    },
    size: '850 sq ft',
    bedType: 'King Bed + Sofa Bed',
    accessible: true
  }
];

// Restaurant Data
export const restaurants: Restaurant[] = [
  {
    id: 'palette-360',
    name: 'Palette 360',
    slug: 'palette-360',
    cuisine: 'International Buffet',
    description: 'A 360-degree culinary experience featuring flavors from around the world. Our international buffet celebrates diversity with an artistic presentation.',
    image: '/dining/palette-360.jpg',
    ambiance: 'Vibrant and eclectic, with colorful displays and open kitchen concepts that make dining an interactive experience.',
    openingHours: 'Breakfast: 6:30 AM - 10:30 AM | Lunch: 12:00 PM - 3:00 PM | Dinner: 6:00 PM - 10:30 PM'
  },
  {
    id: 'dipinta',
    name: 'Dipinta',
    slug: 'dipinta',
    cuisine: 'Italian Fine Dining',
    description: 'Meaning "painted" in Italian, Dipinta brings authentic Italian flavors with an artistic twist. Each dish is a masterpiece.',
    image: '/dining/dipinta.jpg',
    ambiance: 'Intimate and romantic, with warm lighting and Italian-inspired décor that transports you to the streets of Rome.',
    openingHours: 'Dinner: 6:00 PM - 11:00 PM'
  },
  {
    id: 'lumiere',
    name: 'Lumière',
    slug: 'lumiere',
    cuisine: 'French Fine Dining',
    description: 'Named after "light" in French, Lumière illuminates the art of French cuisine with exceptional flavors and presentation.',
    image: '/dining/lumiere.jpg',
    ambiance: 'Sophisticated and elegant, featuring crystal chandeliers and refined table settings perfect for special occasions.',
    openingHours: 'Dinner: 7:00 PM - 11:00 PM (Reservations Required)'
  },
  {
    id: 'vetro',
    name: 'Vetro',
    slug: 'vetro',
    cuisine: 'Bar & Lounge',
    description: 'Italian for "glass," Vetro is a modern bar and lounge where cocktails are crafted like glass art, inspired by Chihuly.',
    image: '/dining/vetro.jpg',
    ambiance: 'Chic and contemporary with glass art installations, mood lighting, and a vibrant atmosphere perfect for evening relaxation.',
    openingHours: 'Daily: 4:00 PM - 1:00 AM'
  },
  {
    id: 'in-room',
    name: 'In-Room Dining',
    slug: 'in-room',
    cuisine: 'Personalized Service',
    description: 'Enjoy our curated menu selections in the comfort and privacy of your room, available 24/7.',
    image: '/dining/in-room.jpg',
    ambiance: 'Experience fine dining in the privacy of your own space, with impeccable service and artistic presentation.',
    openingHours: '24 Hours'
  }
];

// Loyalty Program Data
export const loyaltyPrograms: LoyaltyProgram[] = [
  {
    tier: 'silver',
    name: 'Silver Member',
    description: 'Begin your artistic journey with exclusive benefits designed for frequent guests.',
    benefits: [
      'Earn points on every stay',
      'Member-only room rates',
      'Late check-out (subject to availability)',
      'Welcome amenity',
      'Digital check-in/out',
      'Free Wi-Fi'
    ]
  },
  {
    tier: 'gold',
    name: 'Gold Member',
    description: 'Elevate your experience with enhanced privileges and personalized service.',
    benefits: [
      'All Silver benefits',
      'Complimentary room upgrade (subject to availability)',
      'Guaranteed late check-out until 2:00 PM',
      'Bonus points on all stays',
      'Complimentary breakfast for two',
      'Access to Atelier gallery events',
      'Priority reservations at restaurants',
      'Welcome gift upon arrival'
    ]
  },
  {
    tier: 'diamond',
    name: 'Diamond Member',
    description: 'Our highest tier of recognition, offering unparalleled luxury and exclusive experiences.',
    benefits: [
      'All Gold benefits',
      'Guaranteed suite upgrade (subject to availability)',
      'Complimentary spa treatment',
      '48-hour reservation guarantee',
      'Executive lounge access',
      'Personalized concierge service',
      'Exclusive art workshops',
      'Double points on all stays',
      'Annual complimentary night',
      'Private art collection tours',
      'Birthday surprise',
      'Dedicated Diamond Member hotline'
    ]
  }
];
