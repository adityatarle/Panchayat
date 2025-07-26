'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

// Self-contained Icon components
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
  const { language, changeLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { href: '/', label: { hi: 'होम', mr: 'होम', en: 'Home' } },
    { href: '/services', label: { hi: 'सेवाएं', mr: 'सेवा', en: 'Services' } },
    { href: '/track-application', label: { hi: 'आवेदन ट्रैक करें', mr: 'अर्ज ट्रॅक करा', en: 'Track Application' } },
    { href: '/download-certificate', label: { hi: 'प्रमाणपत्र डाउनलोड', mr: 'प्रमाणपत्र डाउनलोड', en: 'Download Certificate' } },
    { href: '/complaint', label: { hi: 'शिकायत', mr: 'तक्रार', en: 'Complaint' } },
  ];

  const quickAccessLinks = [
    { href: '/birth-certificate', label: { hi: 'जन्म प्रमाणपत्र', mr: 'जन्म प्रमाणपत्र', en: 'Birth Certificate' } },
    { href: '/marriage-certificate', label: { hi: 'विवाह प्रमाणपत्र', mr: 'विवाह प्रमाणपत्र', en: 'Marriage Certificate' } },
    { href: '/income-certificate', label: { hi: 'आय प्रमाणपत्र', mr: 'आय प्रमाणपत्र', en: 'Income Certificate' } },
    { href: '/caste-certificate', label: { hi: 'जाति प्रमाणपत्र', mr: 'जात प्रमाणपत्र', en: 'Caste Certificate' } },
    { href: '/track-application', label: { hi: 'आवेदन ट्रैक करें', mr: 'अर्ज ट्रॅक करा', en: 'Track Application' } },
  ];

  return (
    <>
      {/* Top Government Bar */}
      <div className="bg-govBlue-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs gap-2 sm:gap-4">
            <div className="flex items-center space-x-4">
              <span>🇮🇳 भारत सरकार | Government of India</span>
              <span className="hidden sm:inline">महाराष्ट्र राज्य | State of Maharashtra</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="hidden sm:inline">स्क्रीन रीडर एक्सेस</span>
              <button className="text-xs hover:underline p-1.5">A-</button>
              <button className="text-xs hover:underline p-1.5">A</button>
              <button className="text-xs hover:underline p-1.5">A+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg border-b-4 border-saffron sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Government Identity Section */}
          <div className="py-3 sm:py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-govBlue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-base sm:text-lg md:text-xl">🏛️</span>
                </div>
                <div>
                  <h1 className="text-base sm:text-lg md:text-xl font-bold text-govBlue-800 font-devanagari">
                    ग्राम पंचायत डिजिटल सेवा केंद्र
                  </h1>
                  <p className="text-xs sm:text-sm text-black font-sans">
                    Gram Panchayat Digital Service Center
                  </p>
                  <p className="text-[10px] sm:text-xs text-black font-devanagari">
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
            <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-3 sm:space-x-4 md:space-x-6 flex-wrap gap-y-2">
                {navigationItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-govBlue-700 hover:text-csc-orange font-medium text-sm md:text-base transition-colors duration-200 border-b-2 border-transparent hover:border-csc-orange py-1.5"
                  >
                    {item.label[language]}
                  </Link>
                ))}
              </nav>

              {/* Right side controls */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex items-center bg-gray-100 rounded-full px-2 sm:px-3 py-1 w-full max-w-[140px] sm:max-w-[180px] md:max-w-[220px]">
                  <input
                    type="text"
                    placeholder={language === 'hi' ? 'खोजें...' : language === 'mr' ? 'शोधा...' : 'Search...'}
                    className="bg-transparent text-xs sm:text-sm outline-none flex-1 truncate"
                  />
                  <button className="text-black p-1">🔍</button>
                </div>
                <div className="flex items-center bg-govBlue-50 rounded-full p-1">
                  <button
                    onClick={() => changeLanguage('hi')}
                    className={`px-2 sm:px-2.5 py-0.5 text-xs font-medium transition-all ${
                      language === 'hi' ? 'bg-csc-orange text-white' : 'text-govBlue-700 hover:bg-govBlue-100'
                    } rounded-full`}
                  >
                    हिं
                  </button>
                  <button
                    onClick={() => changeLanguage('mr')}
                    className={`px-2 sm:px-2.5 py-0.5 text-xs font-medium transition-all ${
                      language === 'mr' ? 'bg-csc-orange text-white' : 'text-govBlue-700 hover:bg-govBlue-100'
                    } rounded-full`}
                  >
                    मर
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`px-2 sm:px-2.5 py-0.5 text-xs font-medium transition-all ${
                      language === 'en' ? 'bg-csc-orange text-white' : 'text-govBlue-700 hover:bg-govBlue-100'
                    } rounded-full`}
                  >
                    EN
                  </button>
                </div>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2.5 sm:p-3 text-govBlue-700 rounded-full hover:bg-govBlue-100"
                  aria-label="Toggle Menu"
                >
                  {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <nav className="flex flex-col py-3 space-y-1.5 bg-white border-t border-gray-200">
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-govBlue-700 hover:text-csc-orange font-medium text-sm transition-colors duration-200 py-2 px-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label[language]}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Services Quick Access Bar */}
      <div className="bg-govBlue-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm py-1">
            <span className="font-semibold flex-shrink-0">
              {language === 'hi' ? 'त्वरित सेवाएं:' : language === 'mr' ? 'त्वरित सेवा:' : 'Quick Services:'}
            </span>
            {quickAccessLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex-shrink-0 bg-blue-500 text-white px-2 sm:px-2.5 py-1 rounded-md hover:bg-blue-400 transition-colors"
              >
                {link.label[language]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}