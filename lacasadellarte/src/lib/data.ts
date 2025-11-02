import type { Restaurant, LoyaltyProgram } from "@/types";

export const restaurants: Restaurant[] = [
  {
    id: "lumiere",
    name: "Lumière",
    slug: "lumiere",
    cuisine: "Contemporary Fine Dining",
    description:
      "An elegant fine-dining experience featuring seasonal ingredients, artistic plating, and curated wine pairings.",
    image: "/images/dining/lumiere.jpg",
    menuImages: [],
    ambiance: "Sophisticated, intimate, and art-inspired with warm lighting and curated playlists.",
    openingHours: "Daily 6:00 PM – 10:30 PM",
  },
  {
    id: "dipinta",
    name: "Dipinta",
    slug: "dipinta",
    cuisine: "Italian Classics, Reimagined",
    description:
      "Handmade pastas, wood-fired specialties, and regional classics presented with modern techniques.",
    image: "/images/dining/dipinta.jpg",
    menuImages: [],
    ambiance: "Warm and vibrant with rustic textures and gallery-style accents.",
    openingHours: "Tue–Sun 12:00 PM – 10:00 PM",
  },
  {
    id: "palette-360",
    name: "Palette 360°",
    slug: "palette-360",
    cuisine: "Global Buffet & Live Stations",
    description:
      "A rotating selection of global cuisines with live-cooking stations and an extensive dessert bar.",
    image: "/images/dining/palette-360.jpg",
    menuImages: [],
    ambiance: "Lively and family-friendly with contemporary design elements.",
    openingHours: "Breakfast 6:30–10:30 AM | Dinner 6:00–9:30 PM",
  },
  {
    id: "vetro",
    name: "Vetro Lounge",
    slug: "vetro",
    cuisine: "Signature Cocktails & Small Plates",
    description:
      "Craft cocktails, boutique spirits, and chef-crafted small plates in a stylish lounge setting.",
    image: "/images/dining/vetro.jpg",
    menuImages: [],
    ambiance: "Chic, modern, and social—perfect for pre-dinner and late-night conversations.",
    openingHours: "Daily 5:00 PM – 12:00 AM",
  },
  {
    id: "in-room",
    name: "In-Room Dining",
    slug: "in-room",
    cuisine: "Comfort Classics & Signature Dishes",
    description:
      "Enjoy a curated selection of comfort food and hotel signatures in the privacy of your room.",
    image: "/images/dining/in-room.jpg",
    menuImages: [],
    ambiance: "Private, personalized, and convenient.",
    openingHours: "24 Hours",
  },
];

export const loyaltyPrograms: LoyaltyProgram[] = [
  {
    tier: "silver",
    name: "Silver",
    description:
      "A warm welcome to member benefits including exclusive rates and priority support.",
    benefits: [
      "Member-only room rates",
      "Priority customer support",
      "Complimentary Wi‑Fi",
    ],
  },
  {
    tier: "gold",
    name: "Gold",
    description:
      "Enhanced perks for frequent guests including room upgrades and dining savings.",
    benefits: [
      "All Silver benefits",
      "Complimentary room upgrade (subject to availability)",
      "Late checkout (subject to availability)",
      "Dining discounts at select venues",
    ],
  },
  {
    tier: "diamond",
    name: "Diamond",
    description:
      "Our most elevated experience with premium upgrades and personalized services.",
    benefits: [ 
      "All Gold benefits",
      "Suite upgrade priority (subject to availability)",
      "Complimentary breakfast for two",
      "Welcome amenity on arrival",
    ],
  },
];
