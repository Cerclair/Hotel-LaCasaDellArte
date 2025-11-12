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

  // Reset image readiness when switching rooms or reopening
  useEffect(() => {
    setImgReady(false);
    setMinScale(0.1);
  }, [room?.image, open]);

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
        <div ref={imageContainerRef} className="h-1/2 w-full bg-black relative">
          <TransformWrapper
            key={room.image}
            onInit={(ref) => { zoomRef.current = ref as unknown as ZoomApi; }}
            initialScale={1}
            minScale={minScale}
            maxScale={6}
            limitToBounds
            wheel={{ step: 0.15 }}
            doubleClick={{ disabled: false, step: 1.2 }}
            pinch={{ step: 5 }}
            panning={{ velocityDisabled: true }}
          >
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%', display: 'block' }}
            >
              {/* Transform the image element itself; let it use natural dimensions */}
              <img
                ref={imgRef}
                src={room.image}
                alt={room.title}
                className={`block select-none ${imgReady ? 'opacity-100' : 'opacity-0'}`}
                style={{ maxWidth: 'none', maxHeight: 'none' }}
                draggable={false}
                onLoad={() => {
                  const box = imageContainerRef.current?.getBoundingClientRect();
                  const img = imgRef.current;
                  const api = zoomRef.current;
                  if (!box || !img || !api) { setImgReady(true); return; }

                  const iw = img.naturalWidth || 1;
                  const ih = img.naturalHeight || 1;
                  const bw = box.width || 1;
                  const bh = box.height || 1;

                  // Compute scales
                  const containScale = Math.min(bw / iw, bh / ih);
                  const coverScale = Math.max(bw / iw, bh / ih);

                  // Center the image within the container for the chosen scale
                  const posX = (bw - iw * coverScale) / 2;
                  const posY = (bh - ih * coverScale) / 2;

                  // Set minScale so user can zoom out to see the whole image
                  setMinScale(containScale);

                  try {
                    // Apply transform instantly (no visible animation)
                    api.setTransform(posX, posY, coverScale, 0);
                  } catch {
                    // ignore
                  }

                  setImgReady(true);
                }}
              />
            </TransformComponent>
          </TransformWrapper>
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
