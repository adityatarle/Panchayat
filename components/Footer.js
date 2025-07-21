'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const footerTexts = {
    contactInfo: {
      hi: 'संपर्क जानकारी',
      mr: 'संपर्क माहिती',
      en: 'Contact Information'
    },
    office: {
      hi: 'ग्राम पंचायत कार्यालय',
      mr: 'ग्राम पंचायत कार्यालय',
      en: 'Gram Panchayat Office'
    },
    state: {
      hi: 'महाराष्ट्र',
      mr: 'महाराष्ट्र',
      en: 'Maharashtra'
    },
    phone: {
      hi: 'फोन: 1800-XXX-XXXX',
      mr: 'फोन: 1800-XXX-XXXX',
      en: 'Phone: 1800-XXX-XXXX'
    },
    quickLinks: {
      hi: 'त्वरित लिंक',
      mr: 'त्वरित दुवे',
      en: 'Quick Links'
    },
    privacyPolicy: {
      hi: 'गोपनीयता नीति',
      mr: 'गोपनीयता धोरण',
      en: 'Privacy Policy'
    },
    termsOfService: {
      hi: 'सेवा की शर्तें',
      mr: 'सेवा अटी',
      en: 'Terms of Service'
    },
    helpSupport: {
      hi: 'सहायता और समर्थन',
      mr: 'मदत आणि समर्थन',
      en: 'Help & Support'
    },
    govLinks: {
      hi: 'सरकारी लिंक',
      mr: 'सरकारी दुवे',
      en: 'Government Links'
    },
    copyright: {
      hi: '© 2024 ग्राम पंचायत पोर्टल, महाराष्ट्र। सभी अधिकार सुरक्षित।',
      mr: '© 2024 ग्राम पंचायत पोर्टल, महाराष्ट्र। सर्व हक्क राखीव।',
      en: '© 2024 Gram Panchayat Portal, Maharashtra. All rights reserved.'
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t(footerTexts.contactInfo)}</h3>
            <p className="text-sm text-gray-300">{t(footerTexts.office)}</p>
            <p className="text-sm text-gray-300">{t(footerTexts.state)}</p>
            <p className="text-sm text-gray-300">{t(footerTexts.phone)}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t(footerTexts.quickLinks)}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">{t(footerTexts.privacyPolicy)}</a></li>
              <li><a href="#" className="hover:text-white">{t(footerTexts.termsOfService)}</a></li>
              <li><a href="#" className="hover:text-white">{t(footerTexts.helpSupport)}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t(footerTexts.govLinks)}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white">India.gov.in</a></li>
              <li><a href="https://maharashtra.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white">Maharashtra.gov.in</a></li>
              <li><a href="https://digitalindia.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white">Digital India</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm text-gray-400">{t(footerTexts.copyright)}</p>
        </div>
      </div>
    </footer>
  );
}