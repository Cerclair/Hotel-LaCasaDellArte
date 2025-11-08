"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { useRef } from "react";

export const SmoothScrollHero = () => {
  return (
    <div className="bg-zinc-950">
      <Nav />
      <Hero />
      <Schedule />
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-[var(--color-gold)]" />
        <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          La Casa Dell'Arte
        </span>
      </div>
      <button
        onClick={() => {
          document.getElementById("room-types")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="flex items-center gap-1 text-xs text-zinc-400 hover:text-[var(--color-gold)] transition-colors"
      >
        ROOM TYPES <ArrowRight className="h-3 w-3" />
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Luxury hotel room interior"
        start={-200}
        end={200}
        className="w-1/3 rounded-lg shadow-2xl"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Elegant hotel suite"
        start={200}
        end={-250}
        className="mx-auto w-2/3 rounded-lg shadow-2xl"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Premium hotel bedroom"
        start={-200}
        end={200}
        className="ml-auto w-1/3 rounded-lg shadow-2xl"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Deluxe hotel room"
        start={0}
        end={-500}
        className="ml-24 w-5/12 rounded-lg shadow-2xl"
      />
    </div>
  );
};

interface ParallaxImgProps {
  className: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}

const ParallaxImg = ({ className, alt, src, start, end }: ParallaxImgProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
  return (
    <section
      id="room-types"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-zinc-50"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Our Room Collection
      </motion.h1>
      <ScheduleItem 
        title="Standard Rooms" 
        date="From $200/night" 
        location="City View" 
      />
      <ScheduleItem 
        title="Deluxe Rooms" 
        date="From $350/night" 
        location="Garden View" 
      />
      <ScheduleItem 
        title="King Deluxe Suite" 
        date="From $500/night" 
        location="Premium View" 
      />
      <ScheduleItem 
        title="Executive Suite" 
        date="From $750/night" 
        location="Ocean View" 
      />
      <ScheduleItem 
        title="Presidential Suite" 
        date="From $1200/night" 
        location="Panoramic View" 
      />
      <ScheduleItem 
        title="Artist's Loft" 
        date="From $900/night" 
        location="Rooftop Access" 
      />
      <ScheduleItem 
        title="Gallery Suite" 
        date="From $850/night" 
        location="Private Art Collection" 
      />
    </section>
  );
};

interface ScheduleItemProps {
  title: string;
  date: string;
  location: string;
}

const ScheduleItem = ({ title, date, location }: ScheduleItemProps) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9 hover:border-[var(--color-gold)] transition-colors cursor-pointer group"
    >
      <div>
        <p className="mb-1.5 text-xl text-zinc-50 group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </p>
        <p className="text-sm uppercase text-zinc-500">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500">
        <p>{location}</p>
        <MapPin className="h-4 w-4" />
      </div>
    </motion.div>
  );
};
