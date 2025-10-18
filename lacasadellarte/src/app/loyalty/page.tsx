'use client';

import { useState } from 'react';
import { loyaltyPrograms } from '@/lib/data';
import { LoyaltyTier } from '@/types';

export default function LoyaltyPage() {
  const [expandedTier, setExpandedTier] = useState<LoyaltyTier | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [selectedTier, setSelectedTier] = useState<LoyaltyTier | null>(null);

  const handleSignIn = (tier: LoyaltyTier) => {
    setSelectedTier(tier);
    setShowSignIn(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-beige)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-beige-dark)] to-[var(--color-beige)] py-16">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Loyalty Program
          </h1>
          <p className="text-xl text-[var(--color-gray)] max-w-3xl leading-relaxed">
            Elevate your experience with exclusive benefits and rewards
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section bg-[var(--color-beige-light)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
              Coming Soon
            </h2>
            <p className="text-lg text-[var(--color-gray)] leading-relaxed mb-6">
              We&apos;re excited to launch our loyalty program that rewards our most valued guests.
              From exclusive member rates to personalized experiences, our tiered program is designed
              to make every stay even more extraordinary.
            </p>
            <p className="text-lg text-[var(--color-gray)] leading-relaxed">
              Join now to be among the first to enjoy these exceptional benefits when we officially launch.
            </p>
          </div>
        </div>
      </section>

      {/* Tier Dropdown Section */}
      <section className="section bg-[var(--color-beige)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
            Membership Tiers
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {loyaltyPrograms.map((program) => (
              <div
                key={program.tier}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* Tier Header */}
                <button
                  onClick={() => setExpandedTier(expandedTier === program.tier ? null : program.tier)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-[var(--color-beige-light)] transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      program.tier === 'silver' ? 'bg-gray-400' :
                      program.tier === 'gold' ? 'bg-[var(--color-gold)]' :
                      'bg-blue-600'
                    }`}>
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-[var(--color-text)]">
                        {program.name}
                      </h3>
                      <p className="text-sm text-[var(--color-gray)]">
                        Click to view benefits
                      </p>
                    </div>
                  </div>
                  <svg
                    className={`w-6 h-6 text-[var(--color-accent)] transition-transform ${
                      expandedTier === program.tier ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Tier Content */}
                {expandedTier === program.tier && (
                  <div className="px-6 py-6 border-t border-[var(--color-beige-dark)]">
                    <p className="text-[var(--color-gray)] mb-4">
                      {program.description}
                    </p>

                    <h4 className="font-semibold text-[var(--color-text)] mb-3">Benefits:</h4>
                    <ul className="space-y-2 mb-6">
                      {program.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-[var(--color-gray)]">
                          <svg className="w-5 h-5 mr-2 mt-0.5 text-[var(--color-accent)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleSignIn(program.tier)}
                      className="w-full bg-[var(--color-accent)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-gold)] transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign-in Modal */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
                Sign In
              </h3>
              <button
                onClick={() => setShowSignIn(false)}
                className="text-[var(--color-gray)] hover:text-[var(--color-text)]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Username or Hilton Honors #
                </label>
                <input
                  type="text"
                  placeholder="Enter username or member number"
                  className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)]"
                />
              </div>

              <a href="#" className="text-sm text-[var(--color-accent)] hover:text-[var(--color-gold)] block">
                Forgot your info?
              </a>

              <button
                type="submit"
                className="w-full bg-[var(--color-accent)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-gold)] transition-all duration-300"
              >
                Sign In
              </button>

              <div className="text-center text-sm text-[var(--color-gray)]">
                Not a Hilton Honors member?{' '}
                <a href="#" className="text-[var(--color-accent)] hover:text-[var(--color-gold)] font-medium">
                  Join Now
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
