'use client';

import { useLanguage } from '../contexts/LanguageContext';
import Link from 'next/link';

export default function Header() {
  const { language, changeLanguage, t } = useLanguage();

  const headerTexts = {
    title: {
      hi: 'ग्राम पंचायत पोर्टल',
      mr: 'ग्राम पंचायत पोर्टल',
      en: 'Gram Panchayat Portal'
    },
    subtitle: {
      hi: 'महाराष्ट्र सरकार',
      mr: 'महाराष्ट्र सरकार',
      en: 'Government of Maharashtra'
    },
    languageLabel: {
      hi: 'भाषा:',
      mr: 'भाषा:',
      en: 'Language:'
    }
  };

  const languageOptions = [
    { value: 'hi', label: 'हिंदी' },
    { value: 'mr', label: 'मराठी' },
    { value: 'en', label: 'English' }
  ];

  return (
    <header className="bg-white shadow-sm border-b-4 border-orange-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏛️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {t(headerTexts.title)}
              </h1>
              <p className="text-sm text-gray-600">
                {t(headerTexts.subtitle)}
              </p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 hidden sm:inline">
              {t(headerTexts.languageLabel)}
            </span>
            <select 
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}