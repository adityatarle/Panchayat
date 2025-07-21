'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState('hi');

  const services = [
    {
      id: 'birth-certificate',
      title: 'जन्म प्रमाणपत्र',
      titleEn: 'Birth Certificate',
      description: 'नया जन्म प्रमाणपत्र के लिए आवेदन करें या मौजूदा प्रमाणपत्र डाउनलोड करें',
      descriptionEn: 'Apply for new birth certificate or download existing certificate',
      icon: '👶',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      route: '/birth-certificate'
    },
    {
      id: 'residence-certificate',
      title: 'निवास प्रमाणपत्र',
      titleEn: 'Residence Certificate',
      description: 'निवास प्रमाणपत्र के लिए ऑनलाइन आवेदन करें',
      descriptionEn: 'Apply online for residence certificate',
      icon: '🏠',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      route: '/residence-certificate'
    },
    {
      id: 'water-tax',
      title: 'जल कर विभाग',
      titleEn: 'Water Tax Department',
      description: 'जल कर भुगतान, नया कनेक्शन, बिल देखें',
      descriptionEn: 'Water tax payment, new connection, view bills',
      icon: '💧',
      bgColor: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      route: '/water-tax'
    },
    {
      id: 'house-tax',
      title: 'गृह कर विभाग',
      titleEn: 'House Tax Department',
      description: 'संपत्ति कर भुगतान, मूल्यांकन, छूट के लिए आवेदन',
      descriptionEn: 'Property tax payment, assessment, exemption applications',
      icon: '🏘️',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      route: '/house-tax'
    },
    {
      id: 'death-certificate',
      title: 'मृत्यु प्रमाणपत्र',
      titleEn: 'Death Certificate',
      description: 'मृत्यु प्रमाणपत्र के लिए आवेदन करें',
      descriptionEn: 'Apply for death certificate',
      icon: '📋',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      route: '/death-certificate'
    },
    {
      id: 'income-certificate',
      title: 'आय प्रमाणपत्र',
      titleEn: 'Income Certificate',
      description: 'आय प्रमाणपत्र के लिए ऑनलाइन आवेदन',
      descriptionEn: 'Apply online for income certificate',
      icon: '💰',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      route: '/income-certificate'
    },
    {
      id: 'caste-certificate',
      title: 'जाति प्रमाणपत्र',
      titleEn: 'Caste Certificate',
      description: 'जाति प्रमाणपत्र के लिए आवेदन करें',
      descriptionEn: 'Apply for caste certificate',
      icon: '📜',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      route: '/caste-certificate'
    },
    {
      id: 'non-availability',
      title: 'अनुपलब्धता प्रमाणपत्र',
      titleEn: 'Non-Availability Certificate',
      description: 'अनुपलब्धता प्रमाणपत्र के लिए आवेदन',
      descriptionEn: 'Apply for non-availability certificate',
      icon: '📄',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      route: '/non-availability-certificate'
    }
  ];

  const quickActions = [
    {
      title: 'ट्रैक एप्लिकेशन',
      titleEn: 'Track Application',
      icon: '🔍',
      route: '/track-application'
    },
    {
      title: 'डाउनलोड सर्टिफिकेट',
      titleEn: 'Download Certificate',
      icon: '📥',
      route: '/download-certificate'
    },
    {
      title: 'शिकायत दर्ज करें',
      titleEn: 'File Complaint',
      icon: '📝',
      route: '/complaint'
    },
    {
      title: 'सहायता',
      titleEn: 'Help & Support',
      icon: '❓',
      route: '/help'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="bg-gradient-to-r from-orange-100 via-white to-green-100 rounded-lg p-8 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            स्वागत है डिजिटल ग्राम पंचायत में
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            सभी सरकारी सेवाएं अब आपकी उंगलियों पर | All Government Services at Your Fingertips
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">✨ तुरंत सेवा</span>
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">🔒 सुरक्षित</span>
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">📱 मोबाइल फ्रेंडली</span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">त्वरित सेवाएं | Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.route} className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center border border-gray-100 group-hover:border-primary-300">
                <div className="text-3xl mb-3">{action.icon}</div>
                <h4 className="font-medium text-gray-800 text-sm">{action.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{action.titleEn}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Services */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">मुख्य सेवाएं | Main Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link key={service.id} href={service.route} className="group">
              <div className={`${service.bgColor} p-6 rounded-lg hover:shadow-lg transition-all duration-200 group-hover:scale-105 border border-gray-100`}>
                <div className={`text-4xl ${service.iconColor} mb-4`}>{service.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2">{service.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{service.titleEn}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="mb-12">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">आंकड़े | Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">25,847</div>
              <div className="text-sm text-gray-600">जारी प्रमाणपत्र</div>
              <div className="text-xs text-gray-400">Issued Certificates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">98.5%</div>
              <div className="text-sm text-gray-600">संतुष्टि दर</div>
              <div className="text-xs text-gray-400">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">2.5 दिन</div>
              <div className="text-sm text-gray-600">औसत प्रोसेसिंग</div>
              <div className="text-xs text-gray-400">Avg Processing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600 mb-2">15,692</div>
              <div className="text-sm text-gray-600">पंजीकृत नागरिक</div>
              <div className="text-xs text-gray-400">Registered Citizens</div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="mb-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center">
            📢 महत्वपूर्ण सूचना | Important Notice
          </h3>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li>• सभी आवेदन ऑनलाइन जमा करने से पहले आवश्यक दस्तावेज तैयार रखें</li>
            <li>• Keep all required documents ready before submitting online applications</li>
            <li>• आवेदन शुल्क डिजिटल भुगतान के माध्यम से स्वीकार किया जाता है</li>
            <li>• Application fees are accepted through digital payment methods</li>
          </ul>
        </div>
      </section>

      {/* Help Section */}
      <section className="text-center">
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-8">
          <h3 className="text-xl font-bold text-primary-800 mb-4">सहायता चाहिए? | Need Help?</h3>
          <p className="text-primary-700 mb-6">
            हमारी सहायता टीम यहाँ मदद के लिए उपलब्ध है | Our support team is here to help
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/help" className="btn-primary">
              सहायता केंद्र | Help Center
            </Link>
            <Link href="/contact" className="btn-secondary">
              संपर्क करें | Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
