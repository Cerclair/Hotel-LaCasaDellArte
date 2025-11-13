import { Room, Restaurant, LoyaltyProgram } from '@/types';

// Room Data
export const rooms: Room[] = [
  {
    id: '1',
    name: 'Standard Room',
    type: 'standard',
  price: 50000,
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
  price: 80000,
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
  price: 100000,
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
    description: 'Embark on a global culinary journey at Palette 360, where vibrant flavours, live stations, and artful presentations come together in a symphony of taste. A celebration of world cuisine, crafted fresh and served with flair',
    image: '/assets/dining&drinks/palette360/palette-360.png',
    ambiance: 'Vibrant and eclectic, with colorful displays and open kitchen concepts that make dining an interactive experience.',
    openingHours: 'Breakfast: 6:30 AM - 10:30 AM | Lunch: 12:00 PM - 3:00 PM | Dinner: 6:00 PM - 10:30 PM'
  },
  {
    id: 'dipinta',
    name: 'Dipinta',
    slug: 'dipinta',
    cuisine: 'Italian Fine Dining',
    description: 'Experience the warmth of Italy at Dipinta, where handcrafted pastas, rustic flavours, and regional wines paint a picture of authentic Italian charm in every dish',
    image: '/assets/dining&drinks/dipinta/dipinta.png',
    ambiance: 'Intimate and romantic, with warm lighting and Italian-inspired décor that transports you to the streets of Rome.',
    openingHours: 'Dinner: 12:00 PM - 11:00 PM'
  },
  {
    id: 'lumiere',
    name: 'Lumière',
    slug: 'lumiere',
    cuisine: 'French Fine Dining',
    description: 'Savour the elegance of Lumière, where French artistry meets modern refinement. Each dish is a masterpiece, delicately plated and paired with exquisite wines',
    image: '/assets/dining&drinks/lumiere/lumiere.png',
    ambiance: 'Sophisticated and elegant, featuring crystal chandeliers and refined table settings perfect for special occasions.',
    openingHours: 'Dinner: 7:00 PM - 11:00 PM (Reservations Required)'
  },
  {
    id: 'vetro',
    name: 'Vetro',
    slug: 'vetro',
    cuisine: 'Bar & Lounge',
    description: 'Shimmering with style, Vetro invites you to sip signature cocktails, enjoy live music, and unwind in an ambiance where glass, light, and creativity glow in perfect harmony',
    image: '/assets/dining&drinks/vetro/vetro.png',
    ambiance: 'Chic and contemporary with glass art installations, mood lighting, and a vibrant atmosphere perfect for evening relaxation.',
    openingHours: 'Daily: 4:00 PM - 1:00 AM'
  },
  {
    id: 'in-room',
    name: 'In-Room Dining',
    slug: 'in-room',
    cuisine: 'Personalized Service',
    description: 'Indulge in the comfort of your private sanctuary with La Casa Dell’Arte’s in-room dining. From global favourites to signature creations, enjoy gourmet experiences delivered right to your door 24/7',
    image: '/assets/dining&drinks/lumiere/lumiere.png',
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
    introduction: 'Begin your artistic journey with La Casa DellArte\'s Silver membership, designed for guests who appreciate the finer things in life. As a Silver member, you\'ll enjoy exclusive privileges that enhance every stay, from the moment you arrive to the time you depart.\n\nExperience the convenience of seamless check-in, members-only rates, and special recognition that makes you feel truly valued. This is where your relationship with artful hospitality begins, setting the foundation for even greater rewards as you continue your journey with us.',
    benefits: [
      'Earn 5 points per dollar spent on all services',
      'Member-only room rates with up to 10% savings',
      'Late check-out until 2:00 PM (subject to availability)',
      'Welcome amenity upon arrival',
      'Complimentary Wi-Fi and digital check-in/out',
      '10% discount at all restaurants and bars'
    ],
    qualification: 'Join free with your first stay'
  },
  {
    tier: 'gold',
    name: 'Gold Member',
    description: 'Elevate your experience with enhanced privileges and personalized service.',
    introduction: 'Step into a world of elevated luxury with Gold membership, where personalized service and enhanced privileges transform each visit into something extraordinary. Gold members enjoy priority access, room upgrades, and exclusive experiences that reflect your loyalty and refined taste.\n\nFrom complimentary breakfast to private gallery events, every benefit is designed to enrich your stay with artistic touches and thoughtful gestures. Whether you\'re visiting for business or leisure, Gold membership ensures your comfort is our priority and your preferences are always remembered.\n\nAs a Gold member, you\'ll also unlock accelerated points earning, bringing you closer to exclusive rewards and unforgettable experiences that go beyond ordinary hospitality.',
    benefits: [
      'All Silver benefits included',
      'Earn 7 points per dollar (40% bonus earning rate)',
      'Complimentary room upgrade at check-in',
      'Guaranteed late check-out until 3:00 PM',
      'Complimentary breakfast for two daily',
      'Access to exclusive Atelier gallery events',
      '15% discount on spa treatments and dining',
      'Welcome gift with curated local artisan products'
    ],
    qualification: '10 stays or 15 nights within 12 months'
  },
  {
    tier: 'diamond',
    name: 'Diamond Member',
    description: 'Our highest tier of recognition, offering unparalleled luxury and exclusive experiences.',
    introduction: 'Welcome to the pinnacle of recognition at La Casa DellArte. Diamond membership represents our highest level of commitment to guests who have made us their home away from home. Here, luxury meets exclusivity with unparalleled privileges designed to exceed every expectation.\n\nAs a Diamond member, you\'ll experience guaranteed suite upgrades, personalized concierge service, and access to exclusive art workshops with renowned artists. Your stays are elevated with complimentary spa treatments, executive lounge access, and a dedicated hotline that ensures every request is handled with precision and care.\n\nBeyond the tangible benefits, Diamond membership is about creating lasting memories through unique experiences—from private art collection tours to annual complimentary nights. This is where loyalty is celebrated as an art form, and every visit becomes a masterpiece of personalized hospitality.',
    benefits: [
      'All Gold benefits included',
      'Earn 10 points per dollar (double earning rate)',
      'Guaranteed suite upgrade at check-in',
      'Complimentary 60-minute spa treatment per stay',
      'Executive lounge access with evening cocktails',
      'Exclusive art workshops and private gallery tours',
      'Annual complimentary night after 50,000 points',
      'Dedicated Diamond Member hotline',
      '20% discount on all services',
      'Complimentary airport transfer (one way per stay)',
      'Personalized concierge and birthday surprise'
    ],
    qualification: '25 stays or 40 nights within 12 months'
  }
];
