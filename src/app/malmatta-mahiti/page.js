'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MalmattaMahiti() {
  const { language, t } = useLanguage();

  const subModules = [
    {
      id: 'navin-naav-nondani',
      title: {
        hi: 'नवीन नाव नोंदणी',
        mr: 'नवीन नाव नोंदणी',
        en: 'New Name Registration'
      },
      description: {
        hi: 'नया नाम पंजीकरण के लिए आवेदन करें',
        mr: 'नवीन नाव नोंदणीसाठी अर्ज करा',
        en: 'Apply for new name registration'
      },
      icon: '📝',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      route: '/malmatta-mahiti/navin-naav-nondani'
    },
    {
      id: 'malmatta-mahiti-detail',
      title: {
        hi: 'मालमत्तेची माहिती',
        mr: 'मालमत्तेची माहिती',
        en: 'Property Information'
      },
      description: {
        hi: 'संपत्ति की विस्तृत जानकारी देखें',
        mr: 'मालमत्तेची तपशीलवार माहिती पहा',
        en: 'View detailed property information'
      },
      icon: '🏠',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      route: '/malmatta-mahiti/malmatta-mahiti-detail'
    },
    {
      id: 'malmatta-ferfer',
      title: {
        hi: 'मालमत्ता फेरफार',
        mr: 'मालमत्ता फेरफार',
        en: 'Property Transfer'
      },
      description: {
        hi: 'संपत्ति हस्तांतरण के लिए आवेदन',
        mr: 'मालमत्ता हस्तांतरणासाठी अर्ज',
        en: 'Apply for property transfer'
      },
      icon: '🔄',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      route: '/malmatta-mahiti/malmatta-ferfer'
    },
    {
      id: 'malmatta-akra-badalne',
      title: {
        hi: 'मालमत्ता अ.क्र बदलणे',
        mr: 'मालमत्ता अ.क्र बदलणे',
        en: 'Property Serial Number Change'
      },
      description: {
        hi: 'संपत्ति क्रमांक परिवर्तन के लिए आवेदन',
        mr: 'मालमत्ता क्रमांक बदलासाठी अर्ज',
        en: 'Apply for property serial number change'
      },
      icon: '🔢',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      route: '/malmatta-mahiti/malmatta-akra-badalne'
    },
    {
      id: 'milti-madhil-farak',
      title: {
        hi: 'मिळती मधील फरक शोधणे',
        mr: 'मिळती मधील फरक शोधणे',
        en: 'Find Differences in Revenue Records'
      },
      description: {
        hi: 'राजस्व रिकॉर्ड में अंतर खोजें',
        mr: 'महसूल नोंदीमधील फरक शोधा',
        en: 'Find discrepancies in revenue records'
      },
      icon: '🔍',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      route: '/malmatta-mahiti/milti-madhil-farak'
    },
    {
      id: 'kami-jada-patrak',
      title: {
        hi: 'कमी जादा पत्रक',
        mr: 'कमी जादा पत्रक',
        en: 'Deficit/Surplus Statement'
      },
      description: {
        hi: 'कमी/अधिक विवरण पत्रक तैयार करें',
        mr: 'कमी/जास्त तपशील पत्रक तयार करा',
        en: 'Prepare deficit/surplus statement'
      },
      icon: '📊',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      route: '/malmatta-mahiti/kami-jada-patrak'
    },
    {
      id: 'gp-sthawar-malmatta-nondani',
      title: {
        hi: 'ग्रा. प. स्थावर मालमत्ता नोंदणी',
        mr: 'ग्रा. प. स्थावर मालमत्ता नोंदणी',
        en: 'G.P. Immovable Property Registration'
      },
      description: {
        hi: 'ग्राम पंचायत अचल संपत्ति पंजीकरण',
        mr: 'ग्रामपंचायत स्थावर मालमत्ता नोंदणी',
        en: 'Gram Panchayat immovable property registration'
      },
      icon: '🏛️',
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      route: '/malmatta-mahiti/gp-sthawar-malmatta-nondani'
    },
    {
      id: 'gp-sthawar-malmatta-durusti',
      title: {
        hi: 'ग्रा. प. स्थावर मालमत्ता दुरुस्ती',
        mr: 'ग्रा. प. स्थावर मालमत्ता दुरुस्ती',
        en: 'G.P. Immovable Property Correction'
      },
      description: {
        hi: 'ग्राम पंचायत अचल संपत्ति सुधार',
        mr: 'ग्रामपंचायत स्थावर मालमत्ता दुरुस्ती',
        en: 'Gram Panchayat immovable property correction'
      },
      icon: '🔧',
      bgColor: 'bg-teal-100',
      iconColor: 'text-teal-600',
      route: '/malmatta-mahiti/gp-sthawar-malmatta-durusti'
    },
    {
      id: 'gp-sthawar-malmatta-vijebat',
      title: {
        hi: 'ग्रा. प. स्थावर मालमत्ता विजेबाट',
        mr: 'ग्रा. प. स्थावर मालमत्ता विजेबाट',
        en: 'G.P. Immovable Property Division'
      },
      description: {
        hi: 'ग्राम पंचायत अचल संपत्ति विभाजन',
        mr: 'ग्रामपंचायत स्थावर मालमत्ता विभाजन',
        en: 'Gram Panchayat immovable property division'
      },
      icon: '✂️',
      bgColor: 'bg-pink-100',
      iconColor: 'text-pink-600',
      route: '/malmatta-mahiti/gp-sthawar-malmatta-vijebat'
    },
    {
      id: 'raste-nondani',
      title: {
        hi: 'रस्ते नोंदणी',
        mr: 'रस्ते नोंदणी',
        en: 'Road Registration'
      },
      description: {
        hi: 'सड़क पंजीकरण के लिए आवेदन',
        mr: 'रस्ता नोंदणीसाठी अर्ज',
        en: 'Apply for road registration'
      },
      icon: '🛣️',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      route: '/malmatta-mahiti/raste-nondani'
    },
    {
      id: 'raste-durusti',
      title: {
        hi: 'रस्ते दुरुस्ती',
        mr: 'रस्ते दुरुस्ती',
        en: 'Road Correction'
      },
      description: {
        hi: 'सड़क सुधार के लिए आवेदन',
        mr: 'रस्ता दुरुस्तीसाठी अर्ज',
        en: 'Apply for road correction'
      },
      icon: '🔨',
      bgColor: 'bg-lime-100',
      iconColor: 'text-lime-600',
      route: '/malmatta-mahiti/raste-durusti'
    },
    {
      id: 'jamin-nandani',
      title: {
        hi: 'जमीन नांदणी',
        mr: 'जमीन नांदणी',
        en: 'Land Registration'
      },
      description: {
        hi: 'भूमि पंजीकरण के लिए आवेदन',
        mr: 'जमीन नोंदणीसाठी अर्ज',
        en: 'Apply for land registration'
      },
      icon: '🌾',
      bgColor: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      route: '/malmatta-mahiti/jamin-nandani'
    },
    {
      id: 'jamin-vilhevat',
      title: {
        hi: 'जमीन विल्हेवाट',
        mr: 'जमीन विल्हेवाट',
        en: 'Land Disposal'
      },
      description: {
        hi: 'भूमि निस्तारण के लिए आवेदन',
        mr: 'जमीन विल्हेवाटसाठी अर्ज',
        en: 'Apply for land disposal'
      },
      icon: '🏞️',
      bgColor: 'bg-amber-100',
      iconColor: 'text-amber-600',
      route: '/malmatta-mahiti/jamin-vilhevat'
    },
    {
      id: 'apangatva-nond',
      title: {
        hi: 'अपंगत्वाची नोंद',
        mr: 'अपंगत्वाची नोंद',
        en: 'Disability Record'
      },
      description: {
        hi: 'दिव्यांगता रिकॉर्ड के लिए आवेदन',
        mr: 'अपंगत्व नोंदीसाठी अर्ज',
        en: 'Apply for disability record'
      },
      icon: '♿',
      bgColor: 'bg-violet-100',
      iconColor: 'text-violet-600',
      route: '/malmatta-mahiti/apangatva-nond'
    },
    {
      id: 'malmatta-mahiti-pramanikaran',
      title: {
        hi: 'मालमत्ता माहिती प्रमाणिकरण',
        mr: 'मालमत्ता माहिती प्रमाणिकरण',
        en: 'Property Information Verification'
      },
      description: {
        hi: 'संपत्ति जानकारी सत्यापन सेवा',
        mr: 'मालमत्ता माहिती सत्यापन सेवा',
        en: 'Property information verification service'
      },
      icon: '✅',
      bgColor: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      route: '/malmatta-mahiti/malmatta-mahiti-pramanikaran'
    },
    {
      id: 'thok-angdan',
      title: {
        hi: 'ठोक अंगदान',
        mr: 'ठोक अंगदान',
        en: 'Organ Donation Registry'
      },
      description: {
        hi: 'अंगदान पंजीकरण के लिए आवेदन',
        mr: 'अंगदान नोंदणीसाठी अर्ज',
        en: 'Apply for organ donation registry'
      },
      icon: '❤️',
      bgColor: 'bg-rose-100',
      iconColor: 'text-rose-600',
      route: '/malmatta-mahiti/thok-angdan'
    },
    {
      id: 'sainya-dalat-nond',
      title: {
        hi: 'सैन्य दलात असलेल्या नोंदी',
        mr: 'सैन्य दलात असलेल्या नोंदी',
        en: 'Military Service Records'
      },
      description: {
        hi: 'सैन्य सेवा रिकॉर्ड के लिए आवेदन',
        mr: 'लष्करी सेवा नोंदीसाठी अर्ज',
        en: 'Apply for military service records'
      },
      icon: '🎖️',
      bgColor: 'bg-slate-100',
      iconColor: 'text-slate-600',
      route: '/malmatta-mahiti/sainya-dalat-nond'
    }
  ];

  const moduleTexts = {
    title: {
      hi: 'मालमत्ता माहिती सेवाएं',
      mr: 'मालमत्ता माहिती सेवा',
      en: 'Property Information Services'
    },
    subtitle: {
      hi: 'संपत्ति संबंधी सभी सेवाएं एक ही स्थान पर',
      mr: 'मालमत्ता संबंधित सर्व सेवा एकाच ठिकाणी',
      en: 'All property-related services in one place'
    },
    backHome: {
      hi: '← वापस होम पर जाएं',
      mr: '← परत होमवर जा',
      en: '← Back to Home'
    },
    description: {
      hi: 'महाराष्ट्र राज्य की डिजिटल सेवाएं - सभी मालमत्ता संबंधी सेवाओं के लिए आपका एक स्थान',
      mr: 'महाराष्ट्र राज्याच्या डिजिटल सेवा - सर्व मालमत्ता संबंधित सेवांसाठी तुमचे एक ठिकाण',
      en: 'Maharashtra State Digital Services - Your one-stop destination for all property-related services'
    },
    availableServices: {
      hi: 'उपलब्ध सेवाएं',
      mr: 'उपलब्ध सेवा',
      en: 'Available Services'
    },
    applyNow: {
      hi: 'आवेदन करें →',
      mr: 'अर्ज करा →',
      en: 'Apply Now →'
    },
    serviceAvailable: {
      hi: 'सेवा उपलब्ध',
      mr: 'सेवा उपलब्ध',
      en: 'Service Available'
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Government Header */}
      <section className="bg-gov-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-govBlue-900 opacity-95"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-white hover:text-blue-200 flex items-center">
              {t(moduleTexts.backHome)}
            </Link>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            {/* National Emblem */}
            <div className="mb-6">
              <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center mb-4">
                <span className="text-govBlue-800 text-2xl">🏛️</span>
              </div>
              <div className="text-saffron font-bold text-lg mb-2">भारत सरकार | Government of India</div>
              <div className="text-white text-sm">महाराष्ट्र राज्य | State of Maharashtra</div>
            </div>
            
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              {t(moduleTexts.title)}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6 leading-relaxed">
              {t(moduleTexts.subtitle)}
            </p>
            
            <p className="text-sm text-govBlue-600 max-w-2xl mx-auto">
              {t(moduleTexts.description)}
            </p>
          </div>
        </div>
        
        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-gray-50"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-gray-50"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-gray-50"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        
        {/* Services Grid */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-black mb-8 text-center">{t(moduleTexts.availableServices)}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subModules.map((service) => (
              <Link key={service.id} href={service.route} className="group">
                <div className="bg-white p-6 rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group-hover:border-csc-orange group-hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center mr-3 group-hover:bg-csc-orange group-hover:text-white transition-colors`}>
                      <span className="text-xl">{service.icon}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {language === 'hi' ? 'सरकारी सेवा' : language === 'mr' ? 'सरकारी सेवा' : 'Gov Service'}
                    </div>
                  </div>
                  <h4 className="font-bold text-black mb-2 group-hover:text-csc-orange transition-colors text-sm">
                    {t(service.title)}
                  </h4>
                  <p className="text-xs text-blue-600 leading-relaxed mb-3">
                    {t(service.description)}
                  </p>
                  
                  {/* Service Status */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-green rounded-full"></span>
                      <span className="text-green">{t(moduleTexts.serviceAvailable)}</span>
                    </div>
                    <span className="text-csc-orange font-medium">
                      {t(moduleTexts.applyNow)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Help Section */}
        <section className="text-center">
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-8">
            <h3 className="text-xl font-bold text-primary-800 mb-4">
              {language === 'hi' ? 'सहायता चाहिए?' : language === 'mr' ? 'मदत हवी आहे?' : 'Need Help?'}
            </h3>
            <p className="text-primary-700 mb-6">
              {language === 'hi' ? 'मालमत्ता संबंधी सेवाओं के लिए हमारी सहायता टीम उपलब्ध है' : 
               language === 'mr' ? 'मालमत्ता संबंधित सेवांसाठी आमची मदत टीम उपलब्ध आहे' : 
               'Our support team is available for property-related services'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/help" className="btn-primary">
                {language === 'hi' ? 'सहायता केंद्र' : language === 'mr' ? 'मदत केंद्र' : 'Help Center'}
              </Link>
              <Link href="/contact" className="btn-secondary">
                {language === 'hi' ? 'संपर्क करें' : language === 'mr' ? 'संपर्क करा' : 'Contact Us'}
              </Link>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
}