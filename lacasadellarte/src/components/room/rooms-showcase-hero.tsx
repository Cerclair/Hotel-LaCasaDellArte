"use client"

import Image from "next/image"

interface RoomsShowcaseHeroProps {
  image: string
  heading: string
  description: string
  imageAlt?: string
}

export default function RoomsShowcaseHero({
  image,
  heading,
  description,
  imageAlt = "Luxury hotel room",
}: RoomsShowcaseHeroProps) {
  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:min-h-[600px]">
        {/* Image Section */}
        <div className="relative h-96 lg:h-auto overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={imageAlt}
            fill
            className="object-cover w-full h-full"
            priority
          />
          {/* Subtle overlay gradient for elegance */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="flex items-center justify-center px-6 sm:px-8 lg:px-12 py-12 lg:py-0 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-md w-full">
            {/* Decorative line */}
            <div className="h-1 w-12 bg-gradient-to-r from-blue-900 to-blue-700 mb-6" />

            {/* Heading */}
            <h2
              className="text-4xl sm:text-5xl font-serif font-bold mb-6 leading-tight text-balance"
              style={{ color: "#1e3a8a" }}
            >
              {heading}
            </h2>

            {/* Description */}
            <p className="text-gray-700 text-lg leading-relaxed font-light mb-8">{description}</p>

            {/* CTA Button */}
            <button
              className="px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-serif font-semibold rounded-sm hover:from-blue-800 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{
                backgroundColor: "#1e3a8a",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#172554"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#1e3a8a"
              }}
            >
              Explore Rooms
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
