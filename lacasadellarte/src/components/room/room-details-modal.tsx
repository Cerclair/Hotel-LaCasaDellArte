/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
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

interface RoomDetailsModalProps {
  open: boolean;
  onClose: () => void;
  room?: RoomDetailsData | null;
}

export default function RoomDetailsModal({ open, onClose, room }: RoomDetailsModalProps) {
  const backdropRef = useRef<HTMLDivElement | null>(null);

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
        <div className="h-1/2 w-full bg-black relative">
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={4}
            wheel={{ step: 0.15 }}
            doubleClick={{ disabled: false, step: 1.2 }}
            pinch={{ step: 5 }}
            panning={{ velocityDisabled: true }}
          >
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%', display: 'block' }}
              contentStyle={{ width: '100%', height: '100%', display: 'block' }}
            >
              {/* Use plain img to simplify transforms and ensure full coverage */}
              <img
                src={room.image}
                alt={room.title}
                className="w-full h-full object-cover select-none"
                draggable={false}
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
