Responsive Hotel Carousel Component

Create a responsive hotel website carousel component that displays one slide at a time.
Each slide should showcase a hotel room with the following layout and features:

🎨 Layout Requirements
• Two-column layout:
• Left side: Full-height image of the room (about 60% width on desktop).
• Right side: A light beige background panel (about 40% width) containing:
• A heading (room type, e.g., “Standard Rooms, Deluxe Rooms, King Deluxe Rooms ”)
• A paragraph of descriptive text
• A primary button labeled “Explore The Rooms”.
• The component should have spacing (margin/padding) from all viewport edges so it doesn’t touch the screen borders.
• Add rounded corners and a subtle shadow for a premium look.
• Ensure text is center-aligned vertically in the right panel.

🧭 Responsiveness
• On mobile and tablet, stack the image on top of the text panel (vertical layout).
• On desktop, display them side by side.
• Ensure smooth resizing and maintain proper aspect ratio for images.

🧩 Carousel Features
• Include navigation arrows (← and →) at the bottom-right corner.
• Include slide indicators (pagination dots) below the carousel that show which slide is active.
• Add smooth slide transition animations when switching between slides.
• Slide change with manual navigation.

⚙️ Technical Details
• Use React + Tailwind CSS (or your preferred modern front-end stack).
• Organize the component like:

<Carousel>
  <Slide
    title="Standard Rooms"
    description="Explore our best price to comfortability rooms. Plan your dream vacation without breaking the bank "
    image="/IMG%20resources%20-%20Rooms/Rooms/Standard%20Rooms/standard%20room.png"
    buttonText="Explore The Rooms"
  />
  <Slide ... />
</Carousel>

    •	Add max-width constraint (e.g., max-w-7xl mx-auto) and px-8 py-16 padding to ensure spacing from top, bottom, left, and right edges.
    •	Use smooth transitions (transition-transform, ease-in-out, duration-500).

✨ Design Style
• Clean, modern, minimal, align with the luxury resort La Casa Dell'Arte style.
• Use a neutral beige background for the text section (#f3edea) and a gold accent color for buttons.
• Include accessible alt text for images.

IMG Resources:
Use the following paths for the card images,
Standard Room: "/IMG%20resources%20-%20Rooms/Rooms/public/IMG%20resources%20-%20Rooms/Rooms/Standard%20Rooms/standard%20room.png"
Deluxe Room: "/IMG%20resources%20-%20Rooms/Rooms/Delux%20Rooms/deluxe%20room.png"
King Deluxe Room: "public/IMG%20resources%20-%20Rooms/Rooms/King%20Delux%20Rooms/king%20deluxe%20suite.png"

📱 Bonus (optional)
• Add touch swipe support for mobile users.
• Add fade-in animation when the text panel content changes.

⸻
