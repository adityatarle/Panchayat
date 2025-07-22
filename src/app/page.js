'use client';

import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';

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
      id: 'marriage-certificate',
      title: {
        hi: 'विवाह प्रमाणपत्र',
        mr: 'विवाह प्रमाणपत्र',
        en: 'Marriage Certificate'
      },
      description: {
        hi: 'विवाह प्रमाणपत्र के लिए आवेदन करें',
        mr: 'विवाह प्रमाणपत्रासाठी अर्ज करा',
        en: 'Apply for marriage certificate'
      },
      icon: '💍',
      bgColor: 'bg-pink-100',
      iconColor: 'text-pink-600',
      route: '/marriage-certificate'
    },
    {
      id: 'non-availability',
      title: {
        hi: 'अनुपलब्धता प्रमाणपत्र',
        mr: 'अनुपलब्धता प्रमाणपत्र',
        en: 'Non-Availability Certificate'
      },
      description: {
        hi: 'अनुपलब्ध दस्तावेज़ों के लिए प्रमाणपत्र',
        mr: 'अनुपलब्ध कागदपत्रांसाठी प्रमाणपत्र',
        en: 'Certificate for unavailable documents'
      },
      icon: '📄',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      route: '/non-availability-certificate'
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
    },
    {
      title: {
        hi: 'एडमिन लॉगिन',
        mr: 'एडमिन लॉगिन',
        en: 'Admin Login'
      },
      icon: '🔐',
      route: '/admin'
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
    <div className="bg-gray-50">
      {/* Government Hero Banner */}
      <section className="bg-gov-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-govBlue-900 opacity-95"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* National Emblem */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center mb-4">
                <span className="text-govBlue-800 text-3xl">🏛️</span>
              </div>
              <div className="text-saffron font-bold text-lg mb-2">भारत सरकार | Government of India</div>
              <div className="text-white text-sm">महाराष्ट्र राज्य | State of Maharashtra</div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {t(homeTexts.heroTitle)}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              {t(homeTexts.heroSubtitle)}
            </p>
            
            {/* Government Initiatives */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
                <span className="text-saffron">🇮🇳</span>
                <span className="text-sm font-medium">डिजिटल इंडिया</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
                <span className="text-green">✅</span>
                <span className="text-sm font-medium">24x7 ऑनलाइन सेवा</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
                <span className="text-saffron">🔒</span>
                <span className="text-sm font-medium">सुरक्षित एवं विश्वसनीय</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/track-application" className="bg-csc-orange hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                📱 आवेदन ट्रैक करें
              </Link>
              <Link href="/download-certificate" className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border border-white px-8 py-3 rounded-lg font-medium transition-colors">
                📄 प्रमाणपत्र डाउनलोड करें
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-gray-50"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-gray-50"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-gray-50"></path>
          </svg>
        </div>
      </section>

      {/* Government Notification Banner */}
      <div className="bg-saffron text-navy py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 text-sm font-medium">
            <span className="animate-pulse">📢</span>
            <span>नवीन सूचना:</span>
            <span>अब सभी प्रमाणपत्र 24 घंटे में जारी किए जाएंगे | All certificates will be issued within 24 hours</span>
            <span className="text-white bg-navy px-2 py-1 rounded text-xs">नया</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">

      {/* Quick Actions */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-black mb-6 text-center">{t(homeTexts.quickServicesTitle)}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.route} className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center border border-gray-100 group-hover:border-csc-orange">
                <div className="text-3xl mb-3">{action.icon}</div>
                <h4 className="font-medium text-black text-sm">{t(action.title)}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Services */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-black mb-6 text-center">{t(homeTexts.mainServicesTitle)}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link key={service.id} href={service.route} className="group">
              <div className="bg-white p-6 rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group-hover:border-csc-orange group-hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-govBlue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-csc-orange group-hover:text-white transition-colors">
                    <span className="text-xl">{service.icon}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {language === 'hi' ? 'सरकारी सेवा' : language === 'mr' ? 'सरकारी सेवा' : 'Gov Service'}
                  </div>
                </div>
                <h4 className="font-bold text-black mb-2 group-hover:text-csc-orange transition-colors">
                  {t(service.title)}
                </h4>
                <p className="text-xs text-black leading-relaxed mb-3">
                  {t(service.description)}
                </p>
                
                {/* Service Status */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green rounded-full"></span>
                    <span className="text-green">उपलब्ध</span>
                  </div>
                  <span className="text-csc-orange font-medium">
                    {language === 'hi' ? 'आवेदन करें →' : language === 'mr' ? 'अर्ज करा →' : 'Apply →'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="mb-12">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-black mb-6 text-center">{t(homeTexts.statisticsTitle)}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-csc-orange mb-2">25,847</div>
              <div className="text-sm text-black">{t(homeTexts.issuedCerts)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green mb-2">98.5%</div>
              <div className="text-sm text-black">{t(homeTexts.satisfactionRate)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{language === 'hi' ? '2.5 दिन' : language === 'mr' ? '2.5 दिवस' : '2.5 days'}</div>
              <div className="text-sm text-black">{t(homeTexts.avgProcessing)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600 mb-2">15,692</div>
              <div className="text-sm text-black">{t(homeTexts.registeredCitizens)}</div>
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
    </div>
  );
}
