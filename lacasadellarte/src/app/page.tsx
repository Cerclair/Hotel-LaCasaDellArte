import Image from 'next/image';

export default function Home() {
  return (
    <div>
      {/* Hero Section with Background Image and Overlay Content */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "90vh",
          minHeight: "600px",
          margin: 0,
          padding: 0,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background Image */}
        <Image
          src="/assets/home/home.png"
          alt="La Casa Dell'Arte Background"
          fill
          priority
          style={{
            objectFit: "cover",
            zIndex: 1,
          }}
        />

        {/* Logo - Positioned at Top */}
        <Image
          src="/logo/logo-removebg-white.png"
          alt="La Casa Dell'Arte Logo"
          width={350}
          height={350}
          className="absolute top-[1px] left-1/2 -translate-x-1/2 z-[3] drop-shadow-lg"
          style={{
            width: "clamp(350px, 50vw, 350px)",
            height: "auto",
          }}
        />

        {/* Text Content - Centered */}
        <div
          className="relative z-[2] text-center text-white px-5 flex flex-col items-center justify-center"
          style={{
            paddingTop: "clamp(120px, 25vh, 200px)",
          }}
        >
          {/* Welcome Text */}
          <h1
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: "normal",
              fontStyle: "italic",
              fontFamily: "'Brittany Signature', cursive",
              margin: "0 0 10px 0",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
              letterSpacing: "0.05em",
              color: "white",
            }}
          >
            Welcome
          </h1>

          {/* "to" text */}
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              margin: "0 0 10px 0",
              textShadow: "1px 1px 4px rgba(0, 0, 0, 0.5)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 400,
              fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
              color: "white",
            }}
          >
            TO
          </p>

          {/* La casa Dell'Arte */}
          <h2
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontWeight: "normal",
              fontStyle: "italic",
              fontFamily: "'Brittany Signature', cursive",
              margin: "0 0 30px 0",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
              letterSpacing: "0.05em",
              color: "white",
            }}
          >
            La casa Dell&apos;Arte
          </h2>

          {/* Tagline */}
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.8vw, 1.3rem)",
              margin: 0,
              textShadow: "1px 1px 4px rgba(0, 0, 0, 0.5)",
              letterSpacing: "0.15em",
              fontWeight: 400,
              fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
              maxWidth: "800px",
              color: "white",
            }}
          >
            Where Hospitality Becomes an Art Form
          </p>
        </div>
      </section>

      {/* Main Description Section */}
      <section className="section bg-[var(--color-beige-light)] flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          <div className="max-w-4xl text-center">
            <h2
              className="section-title"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A Living Gallery
            </h2>
            <p className="text-lg text-[var(--color-gray)] leading-relaxed mb-6">
              La Casa Dell&apos;Arte is more than a hotel—it&apos;s an
              experience where art isn&apos;t just admired, it&apos;s lived.
              Every corner of our establishment tells a story, every detail is
              crafted with intention, and every stay becomes a masterpiece.
            </p>
            <p className="text-lg text-[var(--color-gray)] leading-relaxed">
              Nestled in the heart of Colombo, we celebrate the fusion of luxury
              hospitality and artistic expression, creating an environment where
              guests can immerse themselves in beauty, comfort, and creativity.
            </p>
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="section bg-[var(--color-beige)] flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          <h2
            className="section-title"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Inspiration
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl w-full">
            <div className="space-y-6 text-center md:text-left">
              <h3
                className="text-3xl md:text-4xl font-semibold text-[var(--color-text)]"
                style={{ fontFamily: "'Brittany Signature', cursive" }}
              >
                Chihuly Garden and Glass
              </h3>
              <p className="text-[var(--color-gray)] leading-relaxed">
                At La Casa Dell&apos;Arte, creativity blooms in every corner. A
                tribute to the brilliance of Chihuly Garden and Glass, where
                color, light, and form come alive in breathtaking harmony.
                Drawing inspiration from Dale Chihuly&apos;s iconic glass
                installations, our spaces capture the same spirit of wonder
                vibrant hues dancing through sunlight, sculptural forms that
                play with perspective, and an atmosphere that celebrates
                imagination without boundaries.
              </p>
              <p className="text-[var(--color-gray)] leading-relaxed">
                Much like Chihuly&apos;s masterpieces, La Casa Dell&apos;Arte
                transforms the ordinary into the extraordinary, inviting guests
                to see beauty in every reflection and elegance in every curve.
                Here, artistry isn&apos;t just admired, it&apos;s lived,
                breathed, and experienced
              </p>
            </div>
            <div className="h-96 rounded-lg shadow-xl overflow-hidden relative">
              <Image
                src="/assets/home/inspiration.jpg"
                alt="Chihuly Garden and Glass Inspired Art Display"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="section bg-[var(--color-beige-light)] flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          <h2
            className="section-title"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Philosophy
          </h2>
          <div className="grid md:grid-cols-2 gap-12 md:gap-12 gap-y-16 max-w-6xl w-full mt-8">
            {/* Vision */}
            <div
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg relative"
              style={{ transform: "translateY(0)" }}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mb-6 absolute -top-7 md:-top-8 left-6 md:left-8 shadow-xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </div>
              <h3
                className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-text)] mt-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our Vision
              </h3>
              <p className="text-[var(--color-gray)] leading-relaxed">
                To redefine hospitality as a living form of art where every
                space, service, and experience inspires creativity, connection,
                and a deeper appreciation for beauty in all its forms. At La
                Casa Dell&apos;Arte, we envision a sanctuary where guests
                don&apos;t just stay they feel, reflect, and discover. Our
                vision is to become a global icon of artistic hospitality,
                blending culture, comfort, and craftsmanship into unforgettable
                moments.
              </p>
            </div>

            {/* Mission */}
            <div
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg relative"
              style={{ transform: "translateY(0)" }}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[var(--color-gold)] rounded-full flex items-center justify-center mb-6 absolute -top-7 md:-top-8 left-6 md:left-8 shadow-xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z" />
                </svg>
              </div>
              <h3
                className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-text)] mt-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our Mission
              </h3>
              <p className="text-[var(--color-gray)] leading-relaxed">
                To create meaningful experiences that celebrate the harmony
                between art and life. Through thoughtfully designed spaces,
                curated artworks, and personalized service, we aim to awaken
                curiosity, nurture inspiration, and offer each guest a journey
                that transcends the ordinary. Guided by a passion for creativity
                and a commitment to excellence, La Casa Dell&apos;Arte
                transforms every stay into a masterpiece one brushstroke, one
                detail, and one heartfelt gesture at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-[var(--color-beige)] flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          <h2
            className="section-title"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Find Us
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full">
            {/* Contact Information */}
            <div className="space-y-8 text-center md:text-left">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[var(--color-text)]">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 justify-center md:justify-start">
                    <svg
                      className="hidden md:block w-6 h-6 text-[var(--color-accent)] mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div className="text-center md:text-left">
                      <p className="font-medium text-[var(--color-text)]">
                        Address
                      </p>
                      <p className="text-[var(--color-gray)]">
                        Galle Road, Colombo 03, Sri Lanka
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 justify-center md:justify-start">
                    <svg
                      className="hidden md:block w-6 h-6 text-[var(--color-accent)] mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div className="text-center md:text-left">
                      <p className="font-medium text-[var(--color-text)]">
                        Phone
                      </p>
                      <p className="text-[var(--color-gray)]">
                        +94 718 530 994
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 justify-center md:justify-start">
                    <svg
                      className="hidden md:block w-6 h-6 text-[var(--color-accent)] mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div className="text-center md:text-left">
                      <p className="font-medium text-[var(--color-text)]">
                        Email
                      </p>
                      <a
                        href="mailto:ladellaarte@gmail.com"
                        className="text-[var(--color-gray)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        ladellaarte@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-[var(--color-text)]">
                  Check-in Time:
                </h4>
                <p className="text-[var(--color-gray)]">3:00 PM</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-[var(--color-text)]">
                  Check-out Time:
                </h4>
                <p className="text-[var(--color-gray)]">12:00 PM</p>
              </div>
            </div>

            {/* Map */}
            <div className="h-96 rounded-lg shadow-xl overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?width=100%25&amp;height=650&amp;hl=en&amp;q=6.925472638003899,79.84610426437254+(La%20Casa%20DellArte)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="La Casa DellArte Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
