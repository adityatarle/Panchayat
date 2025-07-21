'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { language, t } = useLanguage();

  const services = [
    {
      id: 'birth-certificate',
      title: {
        hi: 'जन्म प्रमाणपत्र',
        mr: 'जन्म प्रमाणपत्र',
        en: 'Birth Certificate'
      },
      description: {
        hi: 'नया जन्म प्रमाणपत्र के लिए आवेदन करें या मौजूदा प्रमाणपत्र डाउनलोड करें',
        mr: 'नवीन जन्म प्रमाणपत्रासाठी अर्ज करा किंवा विद्यमान प्रमाणपत्र डाउनलोड करा',
        en: 'Apply for new birth certificate or download existing certificate'
      },
      icon: '👶',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      route: '/birth-certificate'
    },
    {
      id: 'residence-certificate',
      title: {
        hi: 'निवास प्रमाणपत्र',
        mr: 'निवास प्रमाणपत्र',
        en: 'Residence Certificate'
      },
      description: {
        hi: 'निवास प्रमाणपत्र के लिए ऑनलाइन आवेदन करें',
        mr: 'निवास प्रमाणपत्रासाठी ऑनलाइन अर्ज करा',
        en: 'Apply online for residence certificate'
      },
      icon: '🏠',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      route: '/residence-certificate'
    },
    {
      id: 'water-tax',
      title: {
        hi: 'जल कर विभाग',
        mr: 'जल कर विभाग',
        en: 'Water Tax Department'
      },
      description: {
        hi: 'जल कर भुगतान, नया कनेक्शन, बिल देखें',
        mr: 'जल कर भरणा, नवीन कनेक्शन, बिल पहा',
        en: 'Water tax payment, new connection, view bills'
      },
      icon: '💧',
      bgColor: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      route: '/water-tax'
    },
    {
      id: 'house-tax',
      title: {
        hi: 'गृह कर विभाग',
        mr: 'गृह कर विभाग',
        en: 'House Tax Department'
      },
      description: {
        hi: 'संपत्ति कर भुगतान, मूल्यांकन, छूट के लिए आवेदन',
        mr: 'मालमत्ता कर भरणा, मूल्यांकन, सूट अर्ज',
        en: 'Property tax payment, assessment, exemption applications'
      },
      icon: '🏘️',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      route: '/house-tax'
    },
    {
      id: 'death-certificate',
      title: {
        hi: 'मृत्यु प्रमाणपत्र',
        mr: 'मृत्यू प्रमाणपत्र',
        en: 'Death Certificate'
      },
      description: {
        hi: 'मृत्यु प्रमाणपत्र के लिए आवेदन करें',
        mr: 'मृत्यू प्रमाणपत्रासाठी अर्ज करा',
        en: 'Apply for death certificate'
      },
      icon: '📋',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      route: '/death-certificate'
    },
    {
      id: 'income-certificate',
      title: {
        hi: 'आय प्रमाणपत्र',
        mr: 'उत्पन्न प्रमाणपत्र',
        en: 'Income Certificate'
      },
      description: {
        hi: 'आय प्रमाणपत्र के लिए ऑनलाइन आवेदन',
        mr: 'उत्पन्न प्रमाणपत्रासाठी ऑनलाइन अर्ज',
        en: 'Apply online for income certificate'
      },
      icon: '💰',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      route: '/income-certificate'
    },
    {
      id: 'caste-certificate',
      title: {
        hi: 'जाति प्रमाणपत्र',
        mr: 'जाती प्रमाणपत्र',
        en: 'Caste Certificate'
      },
      description: {
        hi: 'जाति प्रमाणपत्र के लिए आवेदन करें',
        mr: 'जाती प्रमाणपत्रासाठी अर्ज करा',
        en: 'Apply for caste certificate'
      },
      icon: '📜',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      route: '/caste-certificate'
    },
    {
      id: 'complaint',
      title: {
        hi: 'शिकायत दर्ज करें',
        mr: 'तक्रार नोंदवा',
        en: 'File Complaint'
      },
      description: {
        hi: 'अपनी शिकायत ऑनलाइन दर्ज करें',
        mr: 'तुमची तक्रार ऑनलाइन नोंदवा',
        en: 'File your complaint online'
      },
      icon: '📝',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      route: '/complaint'
    }
  ];

  const quickActions = [
    {
      title: {
        hi: 'ट्रैक एप्लिकेशन',
        mr: 'अर्ज ट्रॅक करा',
        en: 'Track Application'
      },
      icon: '🔍',
      route: '/track-application'
    },
    {
      title: {
        hi: 'डाउनलोड सर्टिफिकेट',
        mr: 'प्रमाणपत्र डाउनलोड',
        en: 'Download Certificate'
      },
      icon: '📥',
      route: '/download-certificate'
    },
    {
      title: {
        hi: 'शिकायत दर्ज करें',
        mr: 'तक्रार नोंदवा',
        en: 'File Complaint'
      },
      icon: '📝',
      route: '/complaint'
    },
    {
      title: {
        hi: 'सहायता',
        mr: 'मदत',
        en: 'Help & Support'
      },
      icon: '❓',
      route: '/help'
    }
  ];

  const homeTexts = {
    heroTitle: {
      hi: 'स्वागत है डिजिटल ग्राम पंचायत में',
      mr: 'डिजिटल ग्राम पंचायतमध्ये स्वागत आहे',
      en: 'Welcome to Digital Gram Panchayat'
    },
    heroSubtitle: {
      hi: 'सभी सरकारी सेवाएं अब आपकी उंगलियों पर',
      mr: 'सर्व सरकारी सेवा आता तुमच्या बोटांच्या टोकावर',
      en: 'All Government Services at Your Fingertips'
    },
    quickServicesTitle: {
      hi: 'त्वरित सेवाएं',
      mr: 'त्वरित सेवा',
      en: 'Quick Actions'
    },
    mainServicesTitle: {
      hi: 'मुख्य सेवाएं',
      mr: 'मुख्य सेवा',
      en: 'Main Services'
    },
    statisticsTitle: {
      hi: 'आंकड़े',
      mr: 'आकडेवारी',
      en: 'Statistics'
    },
    issuedCerts: {
      hi: 'जारी प्रमाणपत्र',
      mr: 'जारी प्रमाणपत्रे',
      en: 'Issued Certificates'
    },
    satisfactionRate: {
      hi: 'संतुष्टि दर',
      mr: 'समाधान दर',
      en: 'Satisfaction Rate'
    },
    avgProcessing: {
      hi: 'औसत प्रोसेसिंग',
      mr: 'सरासरी प्रक्रिया',
      en: 'Avg Processing'
    },
    registeredCitizens: {
      hi: 'पंजीकृत नागरिक',
      mr: 'नोंदणीकृत नागरिक',
      en: 'Registered Citizens'
    },
    importantNotice: {
      hi: 'महत्वपूर्ण सूचना',
      mr: 'महत्वाची सूचना',
      en: 'Important Notice'
    },
    needHelp: {
      hi: 'सहायता चाहिए?',
      mr: 'मदत हवी आहे?',
      en: 'Need Help?'
    },
    helpText: {
      hi: 'हमारी सहायता टीम यहाँ मदद के लिए उपलब्ध है',
      mr: 'आमची मदत टीम येथे मदतीसाठी उपलब्ध आहे',
      en: 'Our support team is here to help'
    },
    helpCenter: {
      hi: 'सहायता केंद्र',
      mr: 'मदत केंद्र',
      en: 'Help Center'
    },
    contactUs: {
      hi: 'संपर्क करें',
      mr: 'संपर्क करा',
      en: 'Contact Us'
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="bg-gradient-to-r from-orange-100 via-white to-green-100 rounded-lg p-8 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t(homeTexts.heroTitle)}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {t(homeTexts.heroSubtitle)}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">✨ {language === 'hi' ? 'तुरंत सेवा' : language === 'mr' ? 'तत्काळ सेवा' : 'Instant Service'}</span>
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">🔒 {language === 'hi' ? 'सुरक्षित' : language === 'mr' ? 'सुरक्षित' : 'Secure'}</span>
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">📱 {language === 'hi' ? 'मोबाइल फ्रेंडली' : language === 'mr' ? 'मोबाइल फ्रेंडली' : 'Mobile Friendly'}</span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t(homeTexts.quickServicesTitle)}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.route} className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center border border-gray-100 group-hover:border-primary-300">
                <div className="text-3xl mb-3">{action.icon}</div>
                <h4 className="font-medium text-gray-800 text-sm">{t(action.title)}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Services */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t(homeTexts.mainServicesTitle)}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link key={service.id} href={service.route} className="group">
              <div className={`${service.bgColor} p-6 rounded-lg hover:shadow-lg transition-all duration-200 group-hover:scale-105 border border-gray-100`}>
                <div className={`text-4xl ${service.iconColor} mb-4`}>{service.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2">{t(service.title)}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{t(service.description)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="mb-12">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t(homeTexts.statisticsTitle)}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">25,847</div>
              <div className="text-sm text-gray-600">{t(homeTexts.issuedCerts)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">98.5%</div>
              <div className="text-sm text-gray-600">{t(homeTexts.satisfactionRate)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{language === 'hi' ? '2.5 दिन' : language === 'mr' ? '2.5 दिवस' : '2.5 days'}</div>
              <div className="text-sm text-gray-600">{t(homeTexts.avgProcessing)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600 mb-2">15,692</div>
              <div className="text-sm text-gray-600">{t(homeTexts.registeredCitizens)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="mb-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center">
            📢 {t(homeTexts.importantNotice)}
          </h3>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li>• {language === 'hi' ? 'सभी आवेदन ऑनलाइन जमा करने से पहले आवश्यक दस्तावेज तैयार रखें' : language === 'mr' ? 'सर्व अर्ज ऑनलाइन सबमिट करण्यापूर्वी आवश्यक कागदपत्रे तयार ठेवा' : 'Keep all required documents ready before submitting online applications'}</li>
            <li>• {language === 'hi' ? 'आवेदन शुल्क डिजिटल भुगतान के माध्यम से स्वीकार किया जाता है' : language === 'mr' ? 'अर्ज शुल्क डिजिटल पेमेंटच्या माध्यमातून स्वीकारले जाते' : 'Application fees are accepted through digital payment methods'}</li>
          </ul>
        </div>
      </section>

      {/* Help Section */}
      <section className="text-center">
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-8">
          <h3 className="text-xl font-bold text-primary-800 mb-4">{t(homeTexts.needHelp)}</h3>
          <p className="text-primary-700 mb-6">
            {t(homeTexts.helpText)}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/help" className="btn-primary">
              {t(homeTexts.helpCenter)}
            </Link>
            <Link href="/contact" className="btn-secondary">
              {t(homeTexts.contactUs)}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
