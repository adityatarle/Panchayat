'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

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
            <div className="flex items-center space-x-3">
              <span className="hidden md:inline">स्क्रीन रीडर एक्सेस</span>
              <button className="text-xs hover:underline">A-</button>
              <button className="text-xs hover:underline">A</button>
              <button className="text-xs hover:underline">A+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg border-b-4 border-saffron">
        <div className="container mx-auto px-4">
          {/* Government Identity Section */}
          <div className="py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Government Emblem */}
                <div className="w-16 h-16 bg-govBlue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🏛️</span>
                </div>
                
                {/* Government Title */}
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-govBlue-800">
                    ग्राम पंचायत डिजिटल सेवा केंद्र
                  </h1>
                  <p className="text-sm text-black">
                    Gram Panchayat Digital Service Center
                  </p>
                  <p className="text-xs text-black">
                    महाराष्ट्र सरकार | Government of Maharashtra
                  </p>
                </div>
              </div>

              {/* National Emblem & Digital India */}
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-india-flag rounded-full mx-auto mb-1"></div>
                  <p className="text-xs text-black">सत्यमेव जयते</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-csc-orange rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">DI</span>
                  </div>
                  <p className="text-xs text-black">Digital India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation & Language Selector */}
          <div className="py-3">
            <div className="flex items-center justify-between">
              {/* Navigation Menu */}
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

              {/* Language Selector & Search */}
              <div className="flex items-center space-x-4">
                {/* Search Box */}
                <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <input 
                    type="text" 
                    placeholder={language === 'hi' ? 'खोजें...' : language === 'mr' ? 'शोधा...' : 'Search...'}
                    className="bg-transparent text-sm outline-none w-32"
                  />
                  <button className="text-black">🔍</button>
                </div>

                {/* Language Selector */}
                <div className="flex items-center bg-govBlue-50 rounded-full p-1">
                  <button
                    onClick={() => changeLanguage('hi')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      language === 'hi' 
                        ? 'bg-csc-orange text-white' 
                        : 'text-govBlue-700 hover:bg-govBlue-100'
                    }`}
                  >
                    हिं
                  </button>
                  <button
                    onClick={() => changeLanguage('mr')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      language === 'mr' 
                        ? 'bg-csc-orange text-white' 
                        : 'text-govBlue-700 hover:bg-govBlue-100'
                    }`}
                  >
                    मर
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      language === 'en' 
                        ? 'bg-csc-orange text-white' 
                        : 'text-govBlue-700 hover:bg-govBlue-100'
                    }`}
                  >
                    EN
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 text-govBlue-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-govBlue-50 border-t">
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-3">
                {navigationItems.map((item, index) => (
                  <Link 
                    key={index}
                    href={item.href} 
                    className="block text-govBlue-700 hover:text-csc-orange font-medium py-2 border-b border-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label[language]}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Services Quick Access Bar */}
      <div className="bg-govBlue-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-6 text-sm overflow-x-auto">
            <span className="whitespace-nowrap">त्वरित सेवाएं:</span>
            <Link href="/birth-certificate" className="whitespace-nowrap hover:text-saffron transition-colors">जन्म प्रमाणपत्र</Link>
            <Link href="/marriage-certificate" className="whitespace-nowrap hover:text-saffron transition-colors">विवाह प्रमाणपत्र</Link>
            <Link href="/income-certificate" className="whitespace-nowrap hover:text-saffron transition-colors">आय प्रमाणपत्र</Link>
            <Link href="/caste-certificate" className="whitespace-nowrap hover:text-saffron transition-colors">जाति प्रमाणपत्र</Link>
            <Link href="/track-application" className="whitespace-nowrap hover:text-saffron transition-colors">आवेदन ट्रैक करें</Link>
          </div>
        </div>
      </div>
    </>
  );
}