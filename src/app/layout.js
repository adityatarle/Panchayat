// src/app/layout.js

import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header"; // Import the new responsive Header
import Footer from "@/components/Footer";

// Fonts remain the same
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  display: 'swap',
});

export const metadata = {
  title: "ग्राम पंचायत पोर्टल | Gram Panchayat Portal - Maharashtra",
  description: "डिजिटल ग्राम पंचायत सेवाएं - जन्म प्रमाणपत्र, निवास प्रमाणपत्र, जल कर, गृह कर | Digital Gram Panchayat Services - Birth Certificate, Residence Certificate, Water Tax, House Tax",
  keywords: "gram panchayat, maharashtra, birth certificate, residence certificate, water tax, house tax, ग्राम पंचायत",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi" className="scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏛️</text></svg>" />
      </head>
      <body
        className={`${inter.variable} ${notoSansDevanagari.variable} antialiased bg-gray-50 font-sans`}
      >
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            {/* The layout is now much cleaner */}
            <Header />
            <main className="flex-grow py-8"> {/* Added padding to the main content area */}
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}