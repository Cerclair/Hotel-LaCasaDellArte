import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Casa Dell'Arte - Luxury Art-Inspired Hotel",
  description: "Experience the perfect blend of hospitality and artistry at La Casa Dell'Arte, a luxury hotel in Colombo, Sri Lanka. Where every stay is a masterpiece.",
  keywords: "luxury hotel, art hotel, Colombo hotel, La Casa Dell'Arte, Sri Lanka accommodation, boutique hotel",
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/icon1.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/icon0.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-icon.png',
  },
  manifest: '/favicon/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="flex flex-col min-h-screen" style={{ fontFamily: 'var(--font-body)' }}>
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <AIAssistant />
      </body>
    </html>
  );
}
