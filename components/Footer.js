'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();

  const quickLinks = [
    { href: '/birth-certificate', label: { hi: 'जन्म प्रमाणपत्र', mr: 'जन्म प्रमाणपत्र', en: 'Birth Certificate' } },
    { href: '/marriage-certificate', label: { hi: 'विवाह प्रमाणपत्र', mr: 'विवाह प्रमाणपत्र', en: 'Marriage Certificate' } },
    { href: '/income-certificate', label: { hi: 'आय प्रमाणपत्र', mr: 'आय प्रमाणपत्र', en: 'Income Certificate' } },
    { href: '/track-application', label: { hi: 'आवेदन ट्रैक करें', mr: 'अर्ज ट्रॅक करा', en: 'Track Application' } },
  ];

  const importantLinks = [
    { href: '/privacy-policy', label: { hi: 'गोपनीयता नीति', mr: 'गोपनीयता धोरण', en: 'Privacy Policy' } },
    { href: '/terms-conditions', label: { hi: 'नियम व शर्तें', mr: 'नियम व अटी', en: 'Terms & Conditions' } },
    { href: '/accessibility', label: { hi: 'पहुंच योग्यता', mr: 'प्रवेशयोग्यता', en: 'Accessibility' } },
    { href: '/help', label: { hi: 'सहायता', mr: 'मदत', en: 'Help' } },
  ];

  const governmentLinks = [
    { href: 'https://www.india.gov.in', label: { hi: 'भारत सरकार', mr: 'भारत सरकार', en: 'Government of India' } },
    { href: 'https://www.maharashtra.gov.in', label: { hi: 'महाराष्ट्र सरकार', mr: 'महाराष्ट्र सरकार', en: 'Government of Maharashtra' } },
    { href: 'https://digitalindia.gov.in', label: { hi: 'डिजिटल इंडिया', mr: 'डिजिटल इंडिया', en: 'Digital India' } },
    { href: 'https://www.mygov.in', label: { hi: 'माई गव', mr: 'माई गव्ह', en: 'MyGov' } },
  ];

  return (
    <footer className="bg-white text-black border-t-4 border-govBlue-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {/* Organization Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-govBlue-800 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-base sm:text-lg">🏛️</span>
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-black">ग्राम पंचायत</h3>
                <p className="text-xs sm:text-sm text-black">Digital Service Center</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-black leading-relaxed">
              {language === 'hi'
                ? 'महाराष्ट्र सरकार द्वारा संचालित डिजिटल सेवा केंद्र। सभी नागरिक सेवाएं अब ऑनलाइन उपलब्ध हैं।'
                : language === 'mr'
                ? 'महाराष्ट्र सरकारच्या डिजिटल सेवा केंद्राद्वारे सर्व नागरी सेवा ऑनलाइन उपलब्ध आहेत।'
                : 'Government of Maharashtra Digital Service Center providing all citizen services online.'}
            </p>
            {/* Contact Info */}
            <div className="space-y-1.5 text-xs sm:text-sm text-black">
              <div className="flex items-center gap-2">
                <span className="flex-shrink-0">📞</span>
                <span>हेल्पलाइन: 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex-shrink-0">✉️</span>
                <span>help@grampanchayat.gov.in</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex-shrink-0">⏰</span>
                <span>24x7 ऑनलाइन सेवा</span>
              </div>
            </div>
          </div>

          {/* Quick Services */}
          <div>
            <h4 className="font-bold text-sm sm:text-base mb-2 sm:mb-3 text-govBlue-800">
              {language === 'hi' ? 'त्वरित सेवाएं' : language === 'mr' ? 'त्वरित सेवा' : 'Quick Services'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-black text-xs sm:text-sm hover:text-govBlue-800 hover:underline transition-colors duration-200"
                  >
                    {link.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-bold text-sm sm:text-base mb-2 sm:mb-3 text-govBlue-800">
              {language === 'hi' ? 'महत्वपूर्ण लिंक' : language === 'mr' ? 'महत्त्वाचे दुवे' : 'Important Links'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {importantLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-black text-xs sm:text-sm hover:text-govBlue-800 hover:underline transition-colors duration-200"
                  >
                    {link.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Government Links */}
          <div>
            <h4 className="font-bold text-sm sm:text-base mb-2 sm:mb-3 text-govBlue-800">
              {language === 'hi' ? 'सरकारी पोर्टल' : language === 'mr' ? 'सरकारी पोर्टल' : 'Government Portals'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {governmentLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black text-xs sm:text-sm hover:text-govBlue-800 hover:underline transition-colors duration-200 flex items-center gap-1"
                  >
                    <span>{link.label[language]}</span>
                    <span className="text-xs">↗️</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Digital India Initiative */}
      <div className="bg-govBlue-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Initiative Logos */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-csc-orange rounded flex items-center justify-center">
                  <span className="text-white text-[10px] sm:text-xs font-bold">DI</span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-white">Digital India</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green rounded flex items-center justify-center">
                  <span className="text-white text-[10px] sm:text-xs font-bold">CSC</span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-white">Common Service Center</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-saffron to-green rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium text-white">भारत सरकार</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center sm:justify-end gap-2 sm:gap-3 text-white">
              <div className="text-center">
                <div className="font-bold text-xs sm:text-sm text-csc-orange">847+</div>
                <div className="text-[10px] sm:text-xs">आवेदन</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xs sm:text-sm text-csc-orange">12+</div>
                <div className="text-[10px] sm:text-xs">सेवाएं</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xs sm:text-sm text-csc-orange">24x7</div>
                <div className="text-[10px] sm:text-xs">उपलब्ध</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-100 py-2.5 sm:py-3 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-1.5 sm:gap-3 text-xs sm:text-sm text-black">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              <span>© 2024 ग्राम पंचायत डिजिटल सेवा केंद्र</span>
              <span className="hidden sm:inline">|</span>
              <span className="sm:inline">महाराष्ट्र सरकार</span>
            </div>

            {/* Additional Info */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span>संस्करण: 2.0</span>
              <span className="hidden sm:inline">|</span>
              <span>
                {language === 'hi'
                  ? 'अंतिम अपडेट: जनवरी 2024'
                  : language === 'mr'
                  ? 'शेवटचे अपडेट: जानेवारी 2024'
                  : 'Last Updated: January 2024'}
              </span>
            </div>
          </div>

          {/* National Motto */}
          <div className="text-center mt-2 sm:mt-2.5 pt-2 sm:pt-2.5 border-t border-gray-300">
            <p className="text-govBlue-800 font-medium text-xs sm:text-sm">
              सत्यमेव जयते | Truth Alone Triumphs
            </p>
            <p className="text-saffron font-bold text-[10px] sm:text-xs mt-0.5">
              🇮🇳 भारत सरकार | Government of India
            </p>
            <p className="text-black text-[10px] sm:text-xs">
              महाराष्ट्र राज्य | State of Maharashtra
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}