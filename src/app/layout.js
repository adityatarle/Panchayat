// File: src/app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext'; // Adjust path if needed
import Header from '@/components/Header'; // Adjust path if needed
import Footer from '@/components/Footer'; // Assuming you have a Footer component

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Gram Panchayat Digital Seva',
  description: 'Digital services for Gram Panchayat',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap everything inside the LanguageProvider */}
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          {/* <Footer /> */}
        </LanguageProvider>
      </body>
    </html>
  );
}