"use client"

import { useState } from "react"
import { Heart, Users, Wind } from "lucide-react"
import Image from "next/image"

interface HotelRoomCardProps {
  image: string
  roomType: string
  title: string
  description: string
  price: number
  currency?: string
  amenities?: string[]
  guests?: number
  size?: string
  onBook?: () => void
}

export default function HotelRoomCard({
  image,
  roomType,
  title,
  description,
  price,
  currency = "$",
  amenities = ["Air Conditioning", "Premium Bedding", "Marble Bathroom"],
  guests = 2,
  size = "45 m²",
  onBook,
}: HotelRoomCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="w-full max-w-md mx-auto h-full"
      style={{
        fontFamily: "'Geist', 'Geist Fallback', sans-serif",
      }}
    >
      {/* Card Container */}
      <div
        className="group bg-[var(--color-beige-light)] rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden bg-gray-100">
          {/* Optimized Image */}
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            className={`object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            priority={false}
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Room Type Badge */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 group-hover:shadow-lg group-hover:bg-white group-hover:scale-105">
            <p className="text-xs font-semibold tracking-widest uppercase transition-colors duration-300 group-hover:text-[var(--color-gold)]" style={{ color: "#1e3a8a" }}>
              {roomType}
            </p>
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2.5 rounded-full transition-all duration-300 hover:bg-white hover:scale-110"
            aria-label="Add to favorites"
          >
            <Heart
              size={20}
              className={`transition-all duration-300 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"
              }`}
            />
          </button>

          {/* Price Tag */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
            <p className="text-xs text-gray-500 font-medium">Per Night</p>
            <p className="text-2xl font-bold" style={{ color: "#D4AF37" }}>
              {currency}
              {price}
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-7 space-y-5 flex-1 flex flex-col">
          {/* Title */}
          <div>
            <h3
              className="text-2xl font-serif font-bold mb-2 transition-colors duration-300"
              style={{ color: "#D4AF37" }}
            >
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>

          {/* Amenities - flex-grow to push buttons to bottom */}
          <div className="space-y-2 pt-3 flex-grow">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 font-medium transition-all duration-300 hover:bg-[var(--color-gold)]/15 hover:text-[var(--color-text)] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Room Details */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Users size={18} className="text-gray-400" />
                <span className="text-sm font-medium">{guests} Guests</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Wind size={18} className="text-gray-400" />
                <span className="text-sm font-medium">{size}</span>
              </div>
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={onBook}
            className="w-full mt-6 py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            style={{
              backgroundColor: "#8B7355",
            }}
          >
            Book Now
          </button>

          {/* Secondary Link */}
          <button
            className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 border-2"
            style={{
              borderColor: "#1e3a8a",
              color: "#1e3a8a",
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
