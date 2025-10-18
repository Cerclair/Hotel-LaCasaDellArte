export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Information We Collect',
      content: [
        '<strong>Personal Information:</strong> When you make a reservation or use our services, we collect information such as your name, email address, phone number, postal address, payment information, and identification documents.',
        '<strong>Booking Information:</strong> Details about your reservations, room preferences, special requests, and stay history.',
        '<strong>Automatic Information:</strong> We automatically collect certain information when you visit our website, including IP address, browser type, device information, and pages visited.',
        '<strong>Cookies and Tracking:</strong> We use cookies and similar technologies to enhance your browsing experience and analyze website traffic.',
        '<strong>Communication Records:</strong> Records of your correspondence with us via email, phone, or other channels.'
      ]
    },
    {
      title: '2. How We Use Your Information',
      content: [
        'Process and confirm your reservations and bookings.',
        'Provide hotel services and fulfill your requests.',
        'Communicate with you about your bookings, including confirmations and updates.',
        'Send promotional materials and special offers (with your consent).',
        'Improve our services, website, and customer experience.',
        'Comply with legal obligations and prevent fraud.',
        'Analyze trends and gather statistical information about our guests.'
      ]
    },
    {
      title: '3. Data Protection and Security',
      content: [
        'We implement industry-standard security measures to protect your personal information.',
        'Payment information is processed through secure, encrypted payment gateways.',
        'Access to personal data is restricted to authorized personnel only.',
        'We regularly review and update our security practices to ensure data protection.',
        'Despite our efforts, no data transmission over the internet can be guaranteed to be 100% secure.'
      ]
    },
    {
      title: '4. Sharing of Information',
      content: [
        '<strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our hotel and website (e.g., payment processors, IT support).',
        '<strong>Legal Requirements:</strong> We may disclose information when required by law, court order, or governmental request.',
        '<strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner.',
        '<strong>With Your Consent:</strong> We may share information with third parties when you have given us explicit permission to do so.',
        '<strong>We do NOT sell your personal information to third parties for marketing purposes.</strong>'
      ]
    },
    {
      title: '5. Cookies and Website Tracking',
      content: [
        '<strong>Essential Cookies:</strong> Necessary for the website to function properly.',
        '<strong>Analytics Cookies:</strong> Help us understand how visitors use our website.',
        '<strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track campaign effectiveness.',
        '<strong>Preference Cookies:</strong> Remember your settings and preferences.',
        'You can control cookie preferences through your browser settings. Note that disabling cookies may affect website functionality.'
      ]
    },
    {
      title: '6. Data Retention',
      content: [
        'We retain personal information for as long as necessary to fulfill the purposes outlined in this policy.',
        'Booking information is typically retained for 7 years for accounting and legal purposes.',
        'Marketing data is retained until you withdraw consent or request deletion.',
        'Inactive accounts may be deleted after a period of inactivity.',
        'Even after deletion requests, some information may be retained as required by law or for legitimate business purposes.'
      ]
    },
    {
      title: '7. Your Rights',
      content: [
        '<strong>Access:</strong> You have the right to request a copy of the personal data we hold about you.',
        '<strong>Correction:</strong> You can request correction of inaccurate or incomplete information.',
        '<strong>Deletion:</strong> You may request deletion of your personal data, subject to legal and contractual obligations.',
        '<strong>Objection:</strong> You can object to certain types of processing, including marketing communications.',
        '<strong>Data Portability:</strong> You can request your data in a structured, machine-readable format.',
        '<strong>Withdraw Consent:</strong> You can withdraw consent for data processing at any time where consent is the legal basis.',
        'To exercise these rights, please contact us using the information provided at the end of this policy.'
      ]
    },
    {
      title: '8. Updates to This Policy',
      content: [
        'We may update this Privacy Statement from time to time to reflect changes in our practices or legal requirements.',
        'The "Last Updated" date at the top of this page indicates when the policy was last revised.',
        'We encourage you to review this policy periodically.',
        'Continued use of our services after changes constitutes acceptance of the updated policy.',
        'Significant changes will be communicated via email or prominent notice on our website.'
      ]
    },
    {
      title: '9. Contact Us',
      content: [
        'If you have questions, concerns, or requests regarding this Privacy Statement or our data practices, please contact us:',
        '<strong>Email:</strong> ladellaarte@gmail.com',
        '<strong>Phone:</strong> +94 718 530 994',
        '<strong>Address:</strong> La Casa Dell\'Arte, Galle Road, Colombo 03, Sri Lanka',
        'We will respond to your inquiry within 30 days.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-beige)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-beige-dark)] to-[var(--color-beige)] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Privacy Statement
          </h1>
          <p className="text-xl text-center text-[var(--color-gray)] max-w-3xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="mb-8">
              <p className="text-[var(--color-gray)] mb-4">
                <strong>Last Updated:</strong> October 18, 2025
              </p>
              <p className="text-[var(--color-gray)] leading-relaxed">
                La Casa Dell&apos;Arte (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Statement explains how we collect, use, disclose, and safeguard your personal information when you visit our website, make a reservation, or use our services.
              </p>
            </div>

            {/* Privacy Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-bold mb-4 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start text-[var(--color-gray)]">
                        <svg className="w-5 h-5 mr-2 mt-0.5 text-[var(--color-accent)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Commitment */}
            <div className="mt-12 pt-8 border-t-2 border-[var(--color-beige-dark)]">
              <h2 className="text-2xl font-bold mb-4 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>
                Our Commitment to You
              </h2>
              <p className="text-[var(--color-gray)] leading-relaxed mb-4">
                At La Casa Dell&apos;Arte, we are dedicated to maintaining the trust and confidence of our guests. We handle your personal information responsibly and transparently, in accordance with applicable data protection laws and regulations.
              </p>
              <p className="text-[var(--color-gray)] leading-relaxed">
                By using our services, you consent to the collection and use of information as described in this Privacy Statement. If you have any questions or concerns, please don&apos;t hesitate to contact us.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
