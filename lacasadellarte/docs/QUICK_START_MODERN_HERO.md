# 🚀 Modern Hero - Quick Start Guide

## What Was Installed

✅ **Component**: `/src/components/ui/modern-hero.tsx`  
✅ **Dependencies**: `lenis`, `framer-motion`, `react-icons`  
✅ **Integration**: Rooms page with toggle feature  
✅ **Documentation**: Complete implementation guide

---

## 🎯 How to Use Right Now

### 1. **Start the Development Server**

```bash
npm run dev
```

### 2. **Navigate to Rooms Page**

```
http://localhost:3000/rooms
```

### 3. **Toggle Between Heroes**

- Look for the **"Try Modern Hero"** button in the top-right corner
- Click to switch between Classic and Modern hero versions
- Click **"Switch to Classic Hero"** to go back

---

## 🎨 What You'll See

### Modern Hero Features:

1. **Scroll to Expand**: Center image grows from small square to full screen
2. **Parallax Images**: 4 floating hotel room images that move at different speeds
3. **Smooth Animations**: GPU-accelerated scroll effects
4. **Room Collection**: Scrollable list of room types with pricing
5. **Interactive Navigation**: Click "ROOM TYPES" to jump to room list

---

## 🔧 Quick Customization

### Change Room Data:

Edit `/src/components/ui/modern-hero.tsx`, lines 184-221:

```tsx
<ScheduleItem
  title="Your Room Name"
  date="From $XXX/night"
  location="View Type"
/>
```

### Replace Images:

Lines 91-115 in `modern-hero.tsx`:

```tsx
<ParallaxImg
  src="YOUR_IMAGE_URL"
  alt="Your description"
  ...
/>
```

### Adjust Scroll Speed:

Line 46:

```tsx
const SECTION_HEIGHT = 1500; // Make higher = slower scroll
```

---

## 📱 Test Checklist

- [ ] Desktop view (scroll behavior)
- [ ] Mobile view (touch interactions)
- [ ] Toggle button works
- [ ] All images load
- [ ] Smooth scrolling
- [ ] Navigation links work
- [ ] Room list is visible

---

## 🎨 Brand Customization Applied

✅ Gold accents from La Casa Dell'Arte palette  
✅ Playfair Display font for luxury feel  
✅ Hotel-themed room images  
✅ Room types instead of launch schedule  
✅ Lucide icons (already in project)  
✅ Hover effects with hotel colors

---

## 🐛 Common Issues

**Images not showing?**

- Check Unsplash URLs are accessible
- Replace with local images in `/public/images/`

**Animations laggy?**

- Check browser dev tools for performance
- Reduce SECTION_HEIGHT value
- Use fewer parallax images

**Toggle button not visible?**

- Check z-index in browser inspector
- Adjust `top-20` to different value

---

## 📊 Which Hero Should You Use?

### Classic Hero (Original):

✅ Simpler, faster loading  
✅ Image carousel  
✅ Traditional hotel website feel  
✅ Mobile-friendly

### Modern Hero (New):

✅ Unique, memorable experience  
✅ Storytelling through scroll  
✅ Premium, luxury feel  
✅ Engaging interactions

**Recommendation**: Test both with real users and check analytics!

---

## 🔄 Next Actions

1. **Test it now**: Navigate to `/rooms` and click toggle
2. **Gather feedback**: Show to team/stakeholders
3. **Choose default**: Decide which hero to keep
4. **Add real images**: Replace Unsplash with hotel photos
5. **Optimize**: Run Lighthouse performance audit

---

## 💡 Pro Tips

- **Scroll slowly** to see all animation details
- **Try on phone** - touch scrolling feels different
- **Check each room item** - they're clickable
- **Note the nav** - sticky header with smooth scroll

---

## 📞 Need Help?

- Review full docs: `/docs/MODERN_HERO_INTEGRATION.md`
- Check component: `/src/components/ui/modern-hero.tsx`
- Original specs: `/docs/ROOMS_HERO_IMPLEMENTATIONS.md`

**Ready to experiment? Start the dev server and visit /rooms!** 🎨
