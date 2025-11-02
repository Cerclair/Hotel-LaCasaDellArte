// Room Types
export interface Room {
  id: string;
  name: string;
  type: 'standard' | 'deluxe' | 'suite';
  price: number;
  description: string;
  image: string;
  amenities: string[];
  maxGuests: {
    adults: number;
    children: number;
  };
  size: string;
  bedType: string;
  accessible: boolean;
}

// Restaurant Types
export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  cuisine: string;
  description: string;
  image: string;
  menuImages?: string[];
  ambiance: string;
  openingHours?: string;
}

// Booking Types
export interface BookingDetails {
  roomId: string;
  roomName: string;
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  guests: {
    adults: number;
    children: number;
  };
  nights: number;
  totalPrice: number;
}

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests?: string;
}

export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

// Loyalty Program Types
export type LoyaltyTier = 'silver' | 'gold' | 'diamond';

export interface LoyaltyProgram {
  tier: LoyaltyTier;
  name: string;
  description: string;
  introduction: string;
  benefits: string[];
  qualification: string;
}

// Facility Types
export interface Facility {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
}

// Gallery/Art Types
export interface Artwork {
  id: string;
  title: string;
  artist: string;
  image: string;
  description?: string;
  year?: string;
}

// Spa Service Types
export interface SpaService {
  id: string;
  name: string;
  category: 'massage' | 'facial' | 'body' | 'special';
  duration: string;
  price: number;
  description: string;
}
