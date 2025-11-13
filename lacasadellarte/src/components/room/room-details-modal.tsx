/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { X } from "lucide-react";

export interface RoomDetailsData {
  image: string;
  roomType: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  amenities?: string[];
  guests?: number;
  size?: string; // can be a label like "Adults: 2, Children: 1"
  bedType?: string;
}

type ZoomApi = {
  setTransform: (
    x: number,
    y: number,
    scale: number,
    animationTime?: number,
    animationType?: string
  ) => void;
};

interface RoomDetailsModalProps {
  open: boolean;
  onClose: () => void;
  room?: RoomDetailsData | null;
}

export default function RoomDetailsModal({ open, onClose, room }: RoomDetailsModalProps) {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const zoomRef = useRef<ZoomApi | null>(null);
  const [imgReady, setImgReady] = useState(false);
  const [minScale, setMinScale] = useState(0.1);
  const recenterTimerRef = useRef<number | null>(null);
  const [intrinsic, setIntrinsic] = useState<{ w: number; h: number } | null>(null);
  const [boxSize, setBoxSize] = useState<{ w: number; h: number } | null>(null);
  const [initial, setInitial] = useState<{ x: number; y: number; scale: number } | null>(null);
  const [openNonce, setOpenNonce] = useState(0);

  // Reset image readiness when switching rooms or reopening
  useEffect(() => {
    setImgReady(false);
    setMinScale(0.1);
    // Clear any pending recenter timer when switching
    if (recenterTimerRef.current) {
      window.clearTimeout(recenterTimerRef.current);
      recenterTimerRef.current = null;
    }
    setIntrinsic(null);
    setBoxSize(null);
    setInitial(null);
    if (open) setOpenNonce((n) => n + 1);
  }, [room?.image, open]);

  // Observe container size (content box, not affected by CSS transforms)
  useEffect(() => {
    if (!imageContainerRef.current) return;
    const el = imageContainerRef.current;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        setBoxSize({ w: cr.width, h: cr.height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Preload image off-DOM to get intrinsic size before mounting the wrapper
  useEffect(() => {
    if (!open || !room?.image) return;
    let mounted = true;
    const i = new Image();
    i.src = room.image;
    i.onload = () => {
      if (!mounted) return;
      setIntrinsic({ w: i.naturalWidth || 1, h: i.naturalHeight || 1 });
      setImgReady(true);
    };
    return () => { mounted = false; };
  }, [room?.image, open]);

  // Ensure we have a non-zero container size quickly on open
  useEffect(() => {
    if (!open || !imageContainerRef.current) return;
    const el = imageContainerRef.current;
    const setNow = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w && h) setBoxSize({ w, h });
    };
    setNow();
    const raf = requestAnimationFrame(setNow);
    const t = window.setTimeout(setNow, 340);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [open]);

  // Compute the initial transform once both sizes are known
  useEffect(() => {
    if (!open || !intrinsic || !boxSize) return;
    const { w: iw, h: ih } = intrinsic;
    const { w: bw, h: bh } = boxSize;
    if (!iw || !ih || !bw || !bh) return;
    const contain = Math.min(bw / iw, bh / ih);
    const cover = Math.max(bw / iw, bh / ih);
    const overscan = 1.02;
    const scale = Math.min(cover * overscan, 6);
    const x = (bw - iw * scale) / 2;
    const y = (bh - ih * scale) / 2;
    setMinScale(contain);
    setInitial({ x, y, scale });
  }, [open, intrinsic, boxSize]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || !room) return null;

  const currency = room.currency ?? "LKR ";
  const priceFormatted = `${currency}${room.price.toLocaleString("en-US")}`;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Room details"
      onClick={(e) => {
        // close if clicking on the backdrop
        if (e.target === backdropRef.current) onClose();
      }}
    >
      {/* Modal Card */}
      <div
        className="relative w-[92vw] md:w-[78vw] lg:w-[70vw] h-[82vh] md:h-[78vh] bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 animate-[modalIn_260ms_ease-out]"
        style={{
          // Keyframe fallback for environments without the animate utility
          // defined in globals; but Tailwind handles our custom animation below.
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-full p-2 bg-white/90 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>

  {/* Upper: interactive image (50%). Force wrapper/content to fill the allocated area */}
  <div ref={imageContainerRef} className="h-1/2 w-full bg-[var(--color-beige)] relative">
          {initial ? (
            <TransformWrapper
              key={`${room.image}-${boxSize?.w || 0}x${boxSize?.h || 0}-${openNonce}`}
              onInit={(ref) => { zoomRef.current = ref as unknown as ZoomApi; }}
              initialScale={initial.scale}
              initialPositionX={initial.x}
              initialPositionY={initial.y}
              minScale={minScale}
              maxScale={6}
              limitToBounds
              wheel={{ step: 0.15 }}
              doubleClick={{ disabled: false, step: 1.2 }}
              pinch={{ step: 5 }}
              panning={{ velocityDisabled: true }}
            >
              <TransformComponent wrapperStyle={{ width: '100%', height: '100%', display: 'block' }}>
                <img
                  ref={imgRef}
                  src={room.image}
                  alt={room.title}
                  className={`block select-none ${imgReady ? 'opacity-100' : 'opacity-0'}`}
                  style={{ maxWidth: 'none', maxHeight: 'none' }}
                  draggable={false}
                />
              </TransformComponent>
            </TransformWrapper>
          ) : (
            // Fallback: show a non-interactive cover image so the area isn't blank
            imgReady ? (
              <img
                src={room.image}
                alt={room.title}
                className="w-full h-full object-cover opacity-100"
                draggable={false}
              />
            ) : null
          )}
        </div>

        {/* Lower: room info (50%) */}
        <div className="h-1/2 w-full overflow-y-auto p-5 md:p-7 lg:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500">{room.roomType}</p>
              <h3
                className="text-2xl md:text-3xl font-bold text-[var(--color-text)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {room.title}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Per Night</p>
              <p className="text-xl md:text-2xl font-bold text-[var(--color-gold)]">{priceFormatted}</p>
            </div>
          </div>

          <div className="mt-4 text-gray-700 leading-relaxed text-sm md:text-base">
            {room.description}
          </div>

          {/* Basic facts */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {room.size && (
              <div className="rounded-md bg-gray-50 p-3 border border-gray-200">
                <p className="text-gray-500 text-xs uppercase tracking-wider">Capacity</p>
                <p className="font-medium text-gray-800">{room.size}</p>
              </div>
            )}
            {typeof room.guests === "number" && (
              <div className="rounded-md bg-gray-50 p-3 border border-gray-200">
                <p className="text-gray-500 text-xs uppercase tracking-wider">Max Guests</p>
                <p className="font-medium text-gray-800">{room.guests}</p>
              </div>
            )}
            {room.bedType && (
              <div className="rounded-md bg-gray-50 p-3 border border-gray-200">
                <p className="text-gray-500 text-xs uppercase tracking-wider">Bed Type</p>
                <p className="font-medium text-gray-800">{room.bedType}</p>
              </div>
            )}
          </div>

          {/* Amenities */}
          {room.amenities && room.amenities.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 font-medium"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simple keyframes for open animation */}
      <style jsx>{`
        @keyframes modalIn {
          0% { opacity: 0; transform: translateY(12px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
