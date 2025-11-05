import { Restaurant } from '@/types';
import Link from 'next/link';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/dining/${restaurant.slug}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full">
        {/* Restaurant Image */}
        <div style={{ position: 'relative', height: '256px', overflow: 'hidden', background: 'var(--color-beige-dark)' }}>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Restaurant Details */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            {restaurant.name}
          </h3>

          <p className="text-[var(--color-accent)] font-semibold mb-3">
            {restaurant.cuisine}
          </p>

          <p className="text-[var(--color-gray)] leading-relaxed mb-4 line-clamp-3">
            {restaurant.description}
          </p>

          {restaurant.openingHours && (
            <div className="flex items-center text-sm text-[var(--color-gray)] mt-4 pt-4 border-t border-[var(--color-beige-dark)]">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="line-clamp-1">{restaurant.openingHours}</span>
            </div>
          )}

          <div className="mt-4">
            <span className="text-[var(--color-accent)] font-semibold hover:text-[var(--color-gold)] transition-colors inline-flex items-center">
              View Details
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
