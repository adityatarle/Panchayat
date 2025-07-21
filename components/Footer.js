'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();

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
    <footer className="bg-govBlue-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-govBlue-800 text-xl">🏛️</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">ग्राम पंचायत</h3>
                <p className="text-sm text-gray-300">Digital Service Center</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {language === 'hi' 
                ? 'महाराष्ट्र सरकार द्वारा संचालित डिजिटल सेवा केंद्र। सभी नागरिक सेवाएं अब ऑनलाइन उपलब्ध हैं।'
                : language === 'mr'
                ? 'महाराष्ट्र सरकारच्या डिजिटल सेवा केंद्राद्वारे सर्व नागरी सेवा ऑनलाइन उपलब्ध आहेत।'
                : 'Government of Maharashtra Digital Service Center providing all citizen services online.'
              }
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>हेल्पलाइन: 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✉️</span>
                <span>help@grampanchayat.gov.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⏰</span>
                <span>24x7 ऑनलाइन सेवा</span>
              </div>
            </div>
          </div>

          {/* Quick Services */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-saffron">
              {language === 'hi' ? 'त्वरित सेवाएं' : language === 'mr' ? 'त्वरित सेवा' : 'Quick Services'}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:underline transition-colors text-sm"
                  >
                    {link.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-saffron">
              {language === 'hi' ? 'महत्वपूर्ण लिंक' : language === 'mr' ? 'महत्त्वाचे दुवे' : 'Important Links'}
            </h4>
            <ul className="space-y-3">
              {importantLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:underline transition-colors text-sm"
                  >
                    {link.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Government Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-saffron">
              {language === 'hi' ? 'सरकारी पोर्टल' : language === 'mr' ? 'सरकारी पोर्टल' : 'Government Portals'}
            </h4>
            <ul className="space-y-3">
              {governmentLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white hover:underline transition-colors text-sm flex items-center space-x-1"
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
      <div className="bg-govBlue-900 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* Initiative Logos */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-csc-orange rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">DI</span>
                </div>
                <span className="text-sm font-medium">Digital India</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">CSC</span>
                </div>
                <span className="text-sm font-medium">Common Service Center</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-india-flag rounded-full"></div>
                <span className="text-sm font-medium">भारत सरकार</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <div className="text-center">
                <div className="font-bold text-white">847+</div>
                <div>आवेदन</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white">12+</div>
                <div>सेवाएं</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white">24x7</div>
                <div>उपलब्ध</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-navy py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 text-sm text-gray-300">
            
            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <span>© 2024 ग्राम पंचायत डिजिटल सेवा केंद्र</span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">महाराष्ट्र सरकार</span>
            </div>

            {/* Additional Info */}
            <div className="flex items-center space-x-4">
              <span>संस्करण: 2.0</span>
              <span>|</span>
              <span>
                {language === 'hi' 
                  ? 'अंतिम अपडेट: जनवरी 2024' 
                  : language === 'mr'
                  ? 'शेवटचे अपडेट: जानेवारी 2024'
                  : 'Last Updated: January 2024'
                }
              </span>
            </div>
          </div>
          
          {/* National Motto */}
          <div className="text-center mt-3 pt-3 border-t border-govBlue-700">
            <p className="text-saffron font-medium text-sm">
              सत्यमेव जयते | Truth Alone Triumphs
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}