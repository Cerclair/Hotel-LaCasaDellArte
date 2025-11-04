'use client';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  if (!isOpen) return null;

  const sections = [
    {
      title: '1. Reservations and Payments',
      content: [
        'All reservations are subject to availability and confirmation by La Casa Dell\'Arte.',
        'Full payment is required at the time of booking unless otherwise stated.',
        'We accept major credit cards, debit cards, and bank transfers.',
        'Prices are quoted in Sri Lankan Rupees (LKR) and are inclusive of applicable taxes unless otherwise specified.',
        'Room rates may vary based on season, availability, and promotional offers.'
      ]
    },
    {
      title: '2. Check-in and Check-out',
      content: [
        'Standard check-in time is 3:00 PM.',
        'Standard check-out time is 12:00 PM (noon).',
        'Early check-in and late check-out are subject to availability and may incur additional charges.',
        'Valid government-issued photo identification is required at check-in.',
        'Credit card imprint or cash deposit may be required for incidentals.'
      ]
    },
    {
      title: '3. Cancellation and No-Show Policy',
      content: [
        'Free cancellation is available up to 48 hours before the scheduled check-in date.',
        'Cancellations made within 48 hours of check-in will incur a charge equivalent to one night\'s room rate.',
        'No-show reservations will be charged the full amount of the reservation.',
        'Special promotional rates may have different cancellation policies as specified at the time of booking.',
        'Refunds will be processed within 7-10 business days to the original payment method.'
      ]
    },
    {
      title: '4. Room Policies',
      content: [
        'Maximum occupancy limits must be observed for safety and comfort.',
        'Smoking is prohibited in all rooms and indoor areas. Designated smoking areas are available.',
        'Pets are not permitted unless prior arrangements have been made with management.',
        'Guests are responsible for any damage to hotel property during their stay.',
        'La Casa Dell\'Arte reserves the right to relocate guests to comparable accommodations if necessary.'
      ]
    },
    {
      title: '5. Conduct and Guest Responsibility',
      content: [
        'Guests are expected to conduct themselves in a respectful manner at all times.',
        'Illegal activities, violence, or harassment will not be tolerated and may result in immediate eviction without refund.',
        'Excessive noise or disturbance to other guests may result in additional charges or removal.',
        'Children must be supervised by adults at all times, especially in pool and spa areas.',
        'Guests are responsible for their personal belongings. The hotel is not liable for lost or stolen items.'
      ]
    },
    {
      title: '6. Liability',
      content: [
        'La Casa Dell\'Arte is not liable for personal injury, illness, or loss of property unless directly caused by hotel negligence.',
        'Use of hotel facilities (gym, pool, spa) is at the guest\'s own risk.',
        'The hotel is not responsible for items left behind after check-out.',
        'We recommend guests obtain travel insurance to cover cancellations, medical emergencies, and personal belongings.',
        'Maximum liability is limited to the total amount paid for the reservation.'
      ]
    },
    {
      title: '7. Use of Facilities',
      content: [
        'Pool and gym facilities are for registered guests only.',
        'Children under 16 must be accompanied by an adult in fitness and spa areas.',
        'Appropriate attire is required in all public areas.',
        'Food and beverages from outside sources are not permitted in restaurant areas.',
        'The Atelier gallery is open to guests free of charge during posted hours.'
      ]
    },
    {
      title: '8. Website and Online Services',
      content: [
        'Information on our website is subject to change without notice.',
        'We strive for accuracy but do not guarantee that all information is error-free.',
        'Online booking confirmations are subject to verification and availability.',
        'Website images are for illustrative purposes and actual rooms may vary.',
        'Technical issues with online booking do not constitute a confirmed reservation.'
      ]
    },
    {
      title: '9. Privacy and Data Protection',
      content: [
        'Personal information collected during booking is handled in accordance with our Privacy Policy.',
        'We use secure payment processing systems to protect financial information.',
        'Guest data may be used for marketing purposes unless opt-out is requested.',
        'We do not sell or share personal information with third parties except as required by law.',
        'Guests have the right to request access to or deletion of their personal data.'
      ]
    },
    {
      title: '10. Amendments to Terms',
      content: [
        'La Casa Dell\'Arte reserves the right to modify these terms and conditions at any time.',
        'Changes will be posted on our website and become effective immediately upon posting.',
        'Reservations made before changes take effect will be governed by the terms in place at the time of booking.',
        'Continued use of our services after changes constitutes acceptance of modified terms.'
      ]
    },
    {
      title: '11. Governing Law',
      content: [
        'These terms and conditions are governed by the laws of Sri Lanka.',
        'Any disputes shall be subject to the exclusive jurisdiction of the courts of Colombo, Sri Lanka.',
        'If any provision is found to be invalid, the remaining provisions shall remain in full effect.',
        'Waiver of any breach does not constitute waiver of subsequent breaches.'
      ]
    },
    {
      title: '12. Contact Us',
      content: [
        'For questions about these terms and conditions, please contact us:',
        'Email: ladellaarte@gmail.com',
        'Phone: +94 718 530 994',
        'Address: Galle Road, Colombo 03, Sri Lanka'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#E8E4D8] border-b border-[var(--color-accent)]/15 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
            Terms and Conditions
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--color-gray)] hover:text-[var(--color-text)] transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mb-6">
            <p className="text-[var(--color-gray)] mb-4">
              <strong>Last Updated:</strong> October 18, 2025
            </p>
            <p className="text-[var(--color-gray)] leading-relaxed">
              Welcome to La Casa Dell&apos;Arte. By making a reservation or using our services, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold mb-3 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start text-[var(--color-gray)] text-sm">
                      <svg className="w-4 h-4 mr-2 mt-0.5 text-[var(--color-accent)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Acceptance */}
          <div className="mt-8 pt-6 border-t-2 border-[var(--color-beige-dark)]">
            <h3 className="text-xl font-bold mb-3 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
              Acceptance of Terms
            </h3>
            <p className="text-[var(--color-gray)] leading-relaxed mb-4 text-sm">
              By booking a room or using any of our services, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions, as well as our Privacy Policy.
            </p>
            <p className="text-[var(--color-gray)] leading-relaxed text-sm">
              If you do not agree with any part of these terms, please do not make a reservation or use our services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
