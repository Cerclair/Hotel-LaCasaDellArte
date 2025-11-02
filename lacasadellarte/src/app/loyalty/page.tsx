'use client';

import { useState } from 'react';
import { loyaltyPrograms } from '@/lib/data';
import { LoyaltyTier } from '@/types';

export default function LoyaltyPage() {
  const [expandedTier, setExpandedTier] = useState<LoyaltyTier | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [selectedTier, setSelectedTier] = useState<LoyaltyTier | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = (tier: LoyaltyTier) => {
    setSelectedTier(tier);
    setShowSignIn(true);
    setSubmitStatus('idle');
    setFormData({ name: '', email: '', phone: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate sending email to hotel
      // In production, this would be an API call to send the email
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Get the tier name
      const tierProgram = loyaltyPrograms.find(p => p.tier === selectedTier);
      const tierName = tierProgram?.name || '';

      // Simulate email content
      console.log('Sending membership request email to: ladellaarte@gmail.com');
      console.log('Customer Details:', formData);
      console.log('Requested Tier:', tierName);

      // For demo purposes, assume success
      setSubmitStatus('success');
      setIsSubmitting(false);

      // Close modal after 2 seconds
      setTimeout(() => {
        setShowSignIn(false);
        setSubmitStatus('idle');
        setFormData({ name: '', email: '', phone: '' });
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-beige)]">
      {/* Hero Section */}
      <section
        className="bg-gradient-to-br from-[var(--color-beige-dark)] to-[var(--color-beige)]"
        style={{ paddingTop: '64px', paddingBottom: '64px' }}
      >
        <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-center justify-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-display)', textAlign: 'center' }}
          >
            Loyalty Program
          </h1>
          <p
            className="text-xl text-[var(--color-gray)] max-w-3xl leading-relaxed"
            style={{ textAlign: 'center' }}
          >
            Where Every Stay Becomes a Masterpiece of Privilege
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section bg-[var(--color-beige-light)]" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-[var(--color-gray)] leading-relaxed mb-6">
              Welcome to the La Casa DellArte Loyalty Program, where your continued patronage is celebrated as art in motion. Our tiered membership program is designed to transform each visit into a more enriching experience, offering exclusive benefits that grow with your journey alongside us.
            </p>
            <p className="text-lg text-[var(--color-gray)] leading-relaxed mb-6">
              From priority reservations and room upgrades to personalized dining experiences and spa privileges, our loyalty program ensures that your devotion to artful hospitality is rewarded with the finest touches of luxury. Whether you&apos;re a frequent traveler or an occasional art enthusiast, every stay brings you closer to extraordinary rewards.
            </p>
            <p className="text-lg text-[var(--color-gray)] leading-relaxed mb-10">
              Join us in this celebration of loyalty, where your preferences are remembered, your comfort is prioritized, and every return feels like coming home to a gallery curated just for you.
            </p>

            {/* Key Benefits Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {/* Room Upgrade */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center mb-3 shadow-md transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[var(--color-text)]">Room Upgrades</p>
              </div>

              {/* Dining */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center mb-3 shadow-md transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[var(--color-text)]">Dining Benefits</p>
              </div>

              {/* Spa */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center mb-3 shadow-md transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[var(--color-text)]">Spa Privileges</p>
              </div>

              {/* Priority Access */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center mb-3 shadow-md transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[var(--color-text)]">Priority Access</p>
              </div>
            </div>

            {/* Join Now CTA Button */}
            <a
              href="#membership-tiers"
              className="inline-block bg-[var(--color-accent)] text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-[var(--color-gold)] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{ textDecoration: 'none' }}
            >
              Join Now
            </a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[var(--color-beige)]" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-3xl font-bold mb-12 text-[var(--color-text)]"
              style={{ fontFamily: 'var(--font-display)', textAlign: 'center' }}
            >
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Earn Points */}
              <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3 text-center" style={{ fontFamily: 'var(--font-display)' }}>
                  Earn Points
                </h3>
                <p className="text-[var(--color-gray)] text-center leading-relaxed">
                  Accumulate points with every stay, dining experience, spa visit, and eligible purchase at La Casa DellArte. The more you experience, the more you earn.
                </p>
              </div>

              {/* Redeem Rewards */}
              <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3 text-center" style={{ fontFamily: 'var(--font-display)' }}>
                  Redeem Rewards
                </h3>
                <p className="text-[var(--color-gray)] text-center leading-relaxed">
                  Transform your points into exclusive benefits including complimentary nights, room upgrades, dining credits, spa treatments, and unique art experiences.
                </p>
              </div>

              {/* Tier Progression */}
              <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3 text-center" style={{ fontFamily: 'var(--font-display)' }}>
                  Tier Progression
                </h3>
                <p className="text-[var(--color-gray)] text-center leading-relaxed">
                  Advance through Silver, Gold, and Diamond tiers based on your stays and spending. Each tier unlocks enhanced privileges and more exclusive rewards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tier Dropdown Section */}
      <section id="membership-tiers" className="bg-[var(--color-beige)]" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="w-full max-w-4xl mx-auto px-6">
          <h2
            className="text-3xl font-bold mb-12 text-[var(--color-text)]"
            style={{ fontFamily: 'var(--font-display)', textAlign: 'center' }}
          >
            Membership Tiers
          </h2>

          <div className="space-y-6">
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
                      'bg-[#8B7355]'
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
                    {/* Introduction */}
                    <div className="mb-6">
                      {/* <h4 className="font-bold text-[var(--color-text)] mb-3 text-lg">Introduction</h4> */}
                      <p className="text-[var(--color-gray)] leading-relaxed whitespace-pre-line">
                        {program.introduction}
                      </p>
                    </div>

                    {/* Key Benefits */}
                    <div className="mb-6">
                      <h4 className="font-bold text-[var(--color-text)] mb-3 text-lg">Key Benefits:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                        {program.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-[var(--color-gray)]">
                            <svg className="w-5 h-5 mr-2 mt-0.5 text-[var(--color-accent)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Qualification */}
                    <div className="mb-6">
                      <p className="text-[var(--color-gray)]">
                        <span className="font-bold text-[var(--color-text)]">Qualification: </span>
                        <span className="font-semibold">{program.qualification}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => handleSignIn(program.tier)}
                      className="w-full bg-[var(--color-accent)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-gold)] transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                      Become a Member Today
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Application Modal */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
                  Join Our Loyalty Program
                </h3>
                <p className="text-sm text-[var(--color-gray)] mt-1">
                  {loyaltyPrograms.find(p => p.tier === selectedTier)?.name}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowSignIn(false);
                  setSubmitStatus('idle');
                  setFormData({ name: '', email: '', phone: '' });
                }}
                className="text-[var(--color-gray)] hover:text-[var(--color-text)]"
                disabled={isSubmitting}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="w-full px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white text-[var(--color-text)] disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  submitStatus === 'success'
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : submitStatus === 'error'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-gold)]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Signed In Successfully
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Try Again
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
