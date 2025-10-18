# La Casa Dell'Arte - Luxury Art-Inspired Hotel Website

A sophisticated hotel website combining hospitality with artistic expression, inspired by Hilton Salwa Beach Resort and Chihuly Garden and Glass.

## 🚀 Live Development Server

The application is running at: **http://localhost:3000**

## ✨ Features

### Complete Pages Implemented

1. **Home Page** (`/`)
   - Hero section with welcome message
   - Living Gallery description
   - Inspiration from Chihuly Garden and Glass
   - Vision & Mission statements
   - Contact information with map placeholder

2. **Rooms Page** (`/rooms`)
   - 3 room types: Standard, Deluxe, King Deluxe Suites
   - Advanced filtering system (dates, guests, room type)
   - Room cards with amenities and pricing
   - Direct booking flow

3. **Dining Pages** (`/dining`)
   - Overview page with all restaurants
   - Individual pages for each venue:
     - **Palette 360** - International Buffet
     - **Dipinta** - Italian Dining
     - **Lumière** - French Fine Dining
     - **Vetro** - Bar & Lounge
     - **In-Room Dining**

4. **Atelier Gallery** (`/atelier`)
   - Art gallery showcase
   - Grid layout with artwork displays
   - Information about tours and workshops

5. **SPA - ZEN** (`/spa`)
   - Treatment categories (Massages, Facials, Body Treatments)
   - Spa amenities (Sauna, Steam Room, Relaxation Lounge)
   - Booking information

6. **Facilities** (`/facilities`)
   - **The Galleria** - Events & Celebrations
   - **The Studio** - Fitness Center
   - **Azure** - Outdoor Pool

7. **Loyalty Program** (`/loyalty`)
   - Three tiers: Silver, Gold, Diamond
   - Expandable tier details
   - Sign-in modal functionality

8. **Booking/Payment** (`/booking`)
   - Complete booking summary
   - Guest details form
   - Payment information (demo only)
   - Form validation

9. **Terms & Conditions** (`/terms`)
   - Comprehensive legal information
   - 12 detailed sections

10. **Privacy Statement** (`/privacy`)
    - GDPR-compliant privacy policy
    - Data protection information

### Components

- **Navigation** - Responsive navbar with dropdown menus
- **Footer** - Contact info and social media links
- **AI Assistant** - Floating chat widget with domain-specific responses
- **RoomCard** - Reusable room display component
- **RestaurantCard** - Dining venue cards
- **RestaurantPage** - Template for individual restaurants

## 🎨 Design Features

### Color Scheme
- Primary Background: Beige (#F5F5DC)
- Accent Color: Warm Brown (#8B7355)
- Gold Highlights: #D4AF37
- Text: Dark Gray (#2C2C2C)

### Typography
- Display Font: Playfair Display (headings)
- Body Font: Lato (content)

### Responsive Design
- Mobile-first approach
- Breakpoints: Mobile (320-767px), Tablet (768-1023px), Desktop (1024px+)
- Hamburger menu for mobile navigation

## 🛠️ Technology Stack

- **Framework:** Next.js 15.5.6 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Runtime:** React 19.1.0
- **Build Tool:** Turbopack

## 📁 Project Structure

```
lacasadellarte/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Home page
│   │   ├── layout.tsx               # Root layout
│   │   ├── globals.css              # Global styles
│   │   ├── rooms/page.tsx
│   │   ├── dining/
│   │   │   ├── page.tsx
│   │   │   ├── palette-360/page.tsx
│   │   │   ├── dipinta/page.tsx
│   │   │   ├── lumiere/page.tsx
│   │   │   ├── vetro/page.tsx
│   │   │   └── in-room/page.tsx
│   │   ├── atelier/page.tsx
│   │   ├── spa/page.tsx
│   │   ├── facilities/page.tsx
│   │   ├── loyalty/page.tsx
│   │   ├── booking/page.tsx
│   │   ├── terms/page.tsx
│   │   └── privacy/page.tsx
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── RoomCard.tsx
│   │   ├── RestaurantCard.tsx
│   │   ├── RestaurantPage.tsx
│   │   └── AIAssistant.tsx
│   ├── types/
│   │   └── index.ts                 # TypeScript types
│   └── lib/
│       └── data.ts                  # Static data (rooms, restaurants, loyalty)
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🌟 Key Features

### Booking System
- Date range selection
- Guest count (adults/children)
- Room type filtering
- Price calculation
- Booking summary with full details
- Guest information form
- Payment form (demo only - no actual processing)

### Navigation
- Sticky header
- Dropdown menus for dining options
- Mobile-responsive hamburger menu
- Smooth transitions

### AI Assistant
- Floating chat widget
- Domain-specific responses
- Quick action buttons
- Context-aware replies for:
  - Room inquiries
  - Dining options
  - Spa services
  - Contact information
  - Emergency assistance

### Responsive Features
- All pages fully responsive
- Mobile-optimized forms
- Touch-friendly interfaces
- Adaptive layouts

## 📋 Hotel Information

### Contact Details
- **Phone:** +94 718 530 994
- **Email:** ladellaarte@gmail.com
- **Address:** Galle Road, Colombo 03, Sri Lanka

### Check-in/Check-out
- **Check-in:** 3:00 PM
- **Check-out:** 12:00 PM

### Room Pricing
- Standard Rooms: LKR 400,000/night
- Deluxe Rooms: LKR 5,000,000/night
- King Deluxe Suites: LKR 7,000,000/night

## 🎯 Brand Voice & Messaging

- "Where hospitality and artistry unite"
- "A living gallery"
- "Every stay is a masterpiece"
- "Art isn't just admired — it's experienced"

## ⚠️ Demo Notes

This is a demonstration website. The following features are placeholders:

- **Social media links** - Icons only, no actual links
- **Map** - Placeholder image
- **Menu galleries** - Placeholder for scrollable images
- **Payment processing** - UI only, no actual payment gateway
- **AI Assistant** - Pre-programmed responses, not connected to AI service
- **Images** - All images are placeholder boxes

## 🚀 Getting Started

1. Navigate to the project directory:
   ```bash
   cd d:\Cerclair\Projects\lacasadellarte\lacasadellarte
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

## 🔐 Environment Variables

Currently, no environment variables are required for this demo project.

## 📱 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎨 Customization

### Changing Colors
Edit the CSS custom properties in `src/app/globals.css`:
```css
--color-beige: #F5F5DC;
--color-accent: #8B7355;
--color-gold: #D4AF37;
```

### Adding Images
Replace placeholder sections in components with Next.js Image components:
```tsx
import Image from 'next/image';

<Image
  src="/images/room.jpg"
  alt="Room"
  width={800}
  height={600}
/>
```

### Updating Content
Modify the data in `src/lib/data.ts` for:
- Room information
- Restaurant details
- Loyalty program benefits

## 📝 License

This is a demonstration project created for La Casa Dell'Arte.

## 👥 Credits

- **Inspired by:** Hilton Salwa Beach Resort
- **Art Inspiration:** Chihuly Garden and Glass
- **Framework:** Next.js by Vercel
- **Styling:** Tailwind CSS

---

**Last Updated:** October 18, 2025
**Version:** 1.0.0
**Status:** ✅ Complete & Ready for Development

For questions or support, contact: ladellaarte@gmail.com
