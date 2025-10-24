# Modern Hero Component Integration Guide

## La Casa Dell'Arte - Smooth Scroll Hero

---

## ✅ **Installation Complete**

### Dependencies Installed:

```json
{
  "lenis": "^1.x.x", // Smooth scrolling library
  "framer-motion": "^11.x.x", // Animation library
  "react-icons": "^5.x.x" // Icon library (though we used lucide-react instead)
}
```

### Files Created:

- ✅ `/src/components/ui/modern-hero.tsx` - Main component
- ✅ Updated `/src/app/rooms/page.tsx` - Integration with toggle

---

## 🎨 **Customizations for La Casa Dell'Arte**

### Visual Adaptations:

1. **Brand Colors**:

   - Gold accent (`var(--color-gold)`) for interactive elements
   - Maintained beige/dark color scheme
   - Hover states use hotel's color palette

2. **Typography**:

   - Applied Playfair Display font (`var(--font-display)`) for headings
   - Maintained luxury aesthetic consistency

3. **Content**:

   - **Navigation**: Changed to hotel logo with "Room Types" link
   - **Images**: Replaced space-themed images with luxury hotel room photos from Unsplash
   - **Schedule Section**: Converted to "Our Room Collection" with:
     - Room types (Standard, Deluxe, King Deluxe Suite, etc.)
     - Pricing information
     - View types (City View, Ocean View, etc.)

4. **Icons**:

   - Replaced `react-icons` with `lucide-react` (already in project)
   - Used: `Sparkles`, `ArrowRight`, `MapPin`

5. **Styling**:
   - Added rounded corners to parallax images
   - Enhanced shadow effects
   - Interactive hover states with gold accents
   - Smooth transitions matching hotel aesthetic

---

## 🚀 **How to Use**

### Toggle Between Hero Versions:

The rooms page now has **two hero implementations**:

1. **Classic Hero** (Original):

   - Image slider with 3 backgrounds
   - Gradient overlays
   - Staggered animations
   - CTAs and scroll indicator

2. **Modern Smooth Scroll Hero** (New):
   - Parallax scrolling effects
   - Dynamic clip-path animations
   - Multiple floating images
   - Room collection showcase

**Toggle Button**: Click the button in the top-right corner to switch between versions.

---

## 📐 **Component Structure**

```tsx
SmoothScrollHero
├── Nav (Fixed navigation)
├── Hero (Main parallax section)
│   ├── CenterImage (Main expanding image)
│   ├── ParallaxImages (4 floating images)
│   └── Gradient overlay
└── Schedule (Room types list)
```

### Key Features:

1. **Scroll-Based Animations**:

   - Center image expands from 25% to full screen
   - Parallax images move at different speeds
   - Smooth opacity transitions

2. **Performance**:

   - Uses `framer-motion` for GPU-accelerated animations
   - `useTransform` for efficient scroll-based calculations
   - Optimized for 60fps scrolling

3. **Responsive**:
   - Mobile-friendly layout
   - Adaptive image sizing
   - Touch-friendly interactions

---

## 🖼️ **Image Assets**

### Current Images (Unsplash):

All images are luxury hotel rooms with proper licensing:

1. **Center Image**: Luxury hotel lobby

   - URL: `photo-1582719478250-c89cae4dc85b`

2. **Parallax Images**:
   - Image 1: Modern hotel room (33% width, left)
   - Image 2: Elegant suite (66% width, center)
   - Image 3: Premium bedroom (33% width, right)
   - Image 4: Deluxe room (41% width, offset left)

### To Replace with Real Hotel Images:

```tsx
// In modern-hero.tsx, lines 70-75
backgroundImage: "url(/images/rooms/hero-main.jpg)",

// In ParallaxImages section, lines 91-115
<ParallaxImg
  src="/images/rooms/standard-room.jpg"
  alt="Standard Room"
  ...
/>
```

**Recommended Image Specs**:

- Format: WebP or JPEG
- Resolution: 1920x1080 minimum
- Aspect Ratio: 16:9
- File size: < 500KB (optimized)

---

## ⚙️ **Configuration Options**

### Adjust Scroll Speed:

```tsx
// Line 46 in modern-hero.tsx
const SECTION_HEIGHT = 1500; // Increase for slower scroll, decrease for faster
```

### Modify Parallax Speed:

```tsx
// In ParallaxImg component, adjust start/end values
<ParallaxImg
  start={-200}  // Negative = starts above
  end={200}     // Positive = ends below
  ...
/>
```

### Change Clip Animation:

```tsx
// Lines 63-64
const clip1 = useTransform(scrollY, [0, 1500], [25, 0]); // Start/end %
const clip2 = useTransform(scrollY, [0, 1500], [75, 100]); // Inverse
```

---

## 🎯 **Room Collection Data**

Currently hardcoded. To make dynamic:

```tsx
// Create data/rooms.ts
export const roomTypes = [
  {
    title: "Standard Rooms",
    price: "From $200/night",
    view: "City View",
    link: "/rooms/standard",
  },
  // ... more rooms
];

// In modern-hero.tsx
import { roomTypes } from "@/data/rooms";

{
  roomTypes.map((room) => (
    <ScheduleItem
      key={room.title}
      title={room.title}
      date={room.price}
      location={room.view}
    />
  ));
}
```

---

## 🔧 **Troubleshooting**

### Issue: Animations not smooth

**Solution**:

```tsx
// Add to globals.css
html {
  scroll-behavior: smooth;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Issue: Images not loading

**Solution**:

- Ensure images are in `/public/images/rooms/`
- Use absolute paths starting with `/`
- Check Next.js Image Optimization settings

### Issue: Framer Motion warnings

**Solution**:

```tsx
// Wrap with Suspense if needed
import { Suspense } from "react";

<Suspense fallback={<div>Loading...</div>}>
  <SmoothScrollHero />
</Suspense>;
```

---

## 🎨 **Design Recommendations**

### For La Casa Dell'Arte Brand:

1. **Add Art Gallery Section**:

   ```tsx
   // After Schedule section
   <ArtGallery />
   ```

2. **Integrate Room Booking**:

   - Add booking CTA in room collection
   - Link to booking page with pre-selected room type

3. **Add Testimonials**:

   - Parallax testimonial cards
   - Guest reviews between room types

4. **Room 360° Views**:
   - Replace static images with interactive 360° photos
   - Use `pannellum` or similar library

---

## 📊 **Performance Metrics**

Expected performance:

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

Optimization tips:

1. Use Next.js Image component for automatic optimization
2. Lazy load below-fold content
3. Implement progressive image loading
4. Minimize initial JavaScript bundle

---

## 🚦 **Next Steps**

1. ✅ **Test Both Heroes**: Use toggle button to compare
2. ⬜ **Choose Default**: Decide which hero best fits brand
3. ⬜ **Add Real Images**: Replace Unsplash with hotel photography
4. ⬜ **Optimize Performance**: Run Lighthouse audit
5. ⬜ **Add Analytics**: Track user interactions
6. ⬜ **Mobile Testing**: Verify on various devices
7. ⬜ **Accessibility Audit**: Ensure WCAG compliance

---

## 💡 **Experiment Ideas**

### Variation 1: Horizontal Scroll

```tsx
// Change to horizontal scrolling
const x = useTransform(scrollYProgress, [0, 1], [0, -1000]);
```

### Variation 2: Color Change on Scroll

```tsx
const backgroundColor = useTransform(
  scrollY,
  [0, 1500],
  ["#F5F5DC", "#2C2C2C"]
);
```

### Variation 3: Text Reveal

```tsx
const textOpacity = useTransform(scrollY, [0, 500], [0, 1]);
```

---

## 📞 **Support**

- **Component Location**: `/src/components/ui/modern-hero.tsx`
- **Implementation**: `/src/app/rooms/page.tsx`
- **Dependencies**: Check `package.json`

---

**Last Updated**: October 24, 2025  
**Version**: 1.0  
**Author**: Integrated for La Casa Dell'Arte  
**Status**: ✅ Ready for Testing
