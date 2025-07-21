import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        <header className="bg-white shadow-sm border-b-4 border-orange-500">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">ग्राम पंचायत पोर्टल</h1>
                  <p className="text-sm text-gray-600">महाराष्ट्र सरकार | Government of Maharashtra</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">भाषा / Language:</span>
                <select className="border rounded px-2 py-1 text-sm">
                  <option value="hi">हिंदी</option>
                  <option value="mr">मराठी</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>
        </header>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">संपर्क जानकारी</h3>
                <p className="text-sm text-gray-300">ग्राम पंचायत कार्यालय</p>
                <p className="text-sm text-gray-300">महाराष्ट्र</p>
                <p className="text-sm text-gray-300">फोन: 1800-XXX-XXXX</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white">Help & Support</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Government Links</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="#" className="hover:text-white">India.gov.in</a></li>
                  <li><a href="#" className="hover:text-white">Maharashtra.gov.in</a></li>
                  <li><a href="#" className="hover:text-white">Digital India</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-4 text-center">
              <p className="text-sm text-gray-400">© 2024 Gram Panchayat Portal, Maharashtra. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
