import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../../contexts/LanguageContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ग्राम पंचायत पोर्टल | Gram Panchayat Portal - Maharashtra",
  description: "डिजिटल ग्राम पंचायत सेवाएं - जन्म प्रमाणपत्र, निवास प्रमाणपत्र, जल कर, गृह कर | Digital Gram Panchayat Services - Birth Certificate, Residence Certificate, Water Tax, House Tax",
  keywords: "gram panchayat, maharashtra, birth certificate, residence certificate, water tax, house tax, ग्राम पंचायत",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
