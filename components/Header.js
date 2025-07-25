'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

// Self-contained Icon components for clarity and reusability
const HamburgerIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Header() {
  const { language, changeLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { href: '/', label: { hi: 'होम', mr: 'होम', en: 'Home' } },
    { href: '/services', label: { hi: 'सेवाएं', mr: 'सेवा', en: 'Services' } },
    { href: '/track-application', label: { hi: 'आवेदन ट्रैक करें', mr: 'अर्ज ट्रॅक करा', en: 'Track Application' } },
    { href: '/download-certificate', label: { hi: 'प्रमाणपत्र डाउनलोड', mr: 'प्रमाणपत्र डाउनलोड', en: 'Download Certificate' } },
    { href: '/complaint', label: { hi: 'शिकायत', mr: 'तक्रार', en: 'Complaint' } },
  ];

  return (
    <>
      {/* Top Government Bar */}
      <div className="bg-govBlue-800 text-white py-1">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center space-x-4">
              <span>🇮🇳 भारत सरकार | Government of India</span>
              <span className="hidden md:inline">महाराष्ट्र राज्य | State of Maharashtra</span>
            </div>
            <div className="hidden sm:flex items-center space-x-3">
              <span>स्क्रीन रीडर एक्सेस</span>
              <button className="text-xs hover:underline">A-</button>
              <button className="text-xs hover:underline">A</button>
              <button className="text-xs hover:underline">A+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg border-b-4 border-saffron sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Government Identity Section */}
          <div className="py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-govBlue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl sm:text-2xl">🏛️</span>
                </div>
                <div>
                  <h1 className="text-lg md:text-2xl font-bold text-govBlue-800 font-devanagari">
                    ग्राम पंचायत डिजिटल सेवा केंद्र
                  </h1>
                  <p className="text-sm text-black font-sans">
                    Gram Panchayat Digital Service Center
                  </p>
                  <p className="text-xs text-black font-devanagari">
                    महाराष्ट्र सरकार | Government of Maharashtra
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                 {/* Emblems can be added here */}
              </div>
            </div>
          </div>

          {/* Navigation & Language Selector */}
          <div className="py-2">
            <div className="flex items-center justify-between">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                {navigationItems.map((item, index) => (
                  <Link 
                    key={index}
                    href={item.href} 
                    className="text-govBlue-700 hover:text-csc-orange font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-csc-orange pb-1"
                  >
                    {item.label[language]}
                  </Link>
                ))}
              </nav>

              {/* Right side controls */}
              <div className="flex-1 lg:flex-none flex items-center justify-end space-x-2 sm:space-x-4">
                <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <input 
                    type="text" 
                    placeholder={language === 'hi' ? 'खोजें...' : language === 'mr' ? 'शोधा...' : 'Search...'}
                    className="bg-transparent text-sm outline-none w-24 sm:w-32"
                  />
                  <button className="text-black">🔍</button>
                </div>
                <div className="flex items-center bg-govBlue-50 rounded-full p-1">
                  <button onClick={() => changeLanguage('hi')} className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all ${language === 'hi' ? 'bg-csc-orange text-white' : 'text-govBlue-700 hover:bg-govBlue-100'}`}>हिं</button>
                  <button onClick={() => changeLanguage('mr')} className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all ${language === 'mr' ? 'bg-csc-orange text-white' : 'text-govBlue-700 hover:bg-govBlue-100'}`}>मर</button>
                  <button onClick={() => changeLanguage('en')} className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all ${language === 'en' ? 'bg-csc-orange text-white' : 'text-govBlue-700 hover:bg-govBlue-100'}`}>EN</button>
                </div>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 text-govBlue-700"
                  aria-label="Toggle Menu"
                >
                  {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- MOBILE NAVIGATION MENU --- */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden bg-govBlue-50 ${isMenuOpen ? 'max-h-96 border-t' : 'max-h-0'}`}>
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-1">
                {navigationItems.map((item, index) => (
                  <Link 
                    key={index}
                    href={item.href} 
                    className="block text-govBlue-700 hover:bg-govBlue-100 font-medium py-2 px-3 rounded-md"
                    onClick={() => setIsMenuOpen(false)} // Close menu on click
                  >
                    {item.label[language]}
                  </Link>
                ))}
              </nav>
              <div className="md:hidden mt-4">
                <div className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-1.5">
                    <input type="text" placeholder="Search..." className="bg-transparent text-sm outline-none w-full"/>
                    <button className="text-black">🔍</button>
                </div>
              </div>
            </div>
        </div>
      </header>

      {/* Services Quick Access Bar */}
      <div className="bg-govBlue-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 text-sm overflow-x-auto whitespace-nowrap">
            <span className="font-semibold flex-shrink-0">त्वरित सेवाएं:</span>
            <Link href="/birth-certificate" className="flex-shrink-0 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 transition-colors">जन्म प्रमाणपत्र</Link>
            <Link href="/marriage-certificate" className="flex-shrink-0 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 transition-colors">विवाह प्रमाणपत्र</Link>
            <Link href="/income-certificate" className="flex-shrink-0 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 transition-colors">आय प्रमाणपत्र</Link>
            <Link href="/caste-certificate" className="flex-shrink-0 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 transition-colors">जाति प्रमाणपत्र</Link>
            <Link href="/track-application" className="flex-shrink-0 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 transition-colors">आवेदन ट्रैक करें</Link>
          </div>
        </div>
      </div>
    </>
  );
}