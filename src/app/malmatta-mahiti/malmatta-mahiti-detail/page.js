'use client';

import { useState, useEffect } from 'react';

<<<<<<< HEAD
// --- Hardcoded Dropdown Options and Initial States (No changes needed here) ---
const VILLAGE_OPTIONS = ['शिरगाव', 'कोळगाव', 'पांडेगाव'];
const FINANCIAL_YEAR_OPTIONS = ['2023 - 2027', '2022 - 2026', '2021 - 2025'];
const STREET_OPTIONS = ['घर नंबर चेचडी वस्ती पर्यंत', 'मुख्य रस्ता', 'छत्रपती शिवाजी मार्ग', 'डॉ. आंबेडकर पथ'];
const PROPERTY_TYPES = [
  'अर्ध पक्के घरासाठी भिटीचे मातीचे घर', 'आर सी सी पद्धतीचे बांधकाम',
  'नवीन पक्के दगड विटांचे मातीचे घर', 'पक्की खुली जागा', 'नळ कनेक्शन',
  'नवीन नळ कनेक्शन', 'मोकळी जागा', 'पक्की खुली जागा (मालकी हक्क नसलेले)'
];
const FLOOR_OPTIONS = ['Ground Floor', 'पहिला मजला', 'दुसरा मजला', 'तिसरा मजला'];
const TAX_RATE_TYPES = [
    '१-मालमत्ता किंमत खाली', '२-वार्षिक भाड्याचे उत्पन्नावर कर पात्र',
    '३-वार्षिक भाड्याचे कर पात्र', '४-औद्योगिक प्रयोजन कर पात्र',
    '५-औद्योगिक प्रयोजन कर सवलत', '६-शैक्षणिक संस्था कर पात्र',
    '७-धार्मिक संस्था कर पात्र', '८-भाड्याने घेतलेल्या किंवा दिलेल्या भाड्याच्या जागेसाठी सेवाशुल्क (किंवा त्याचा भाग)',
    '९-USTCO नियंत्रण क्षेत्रात मालमत्ता असणाऱ्यांसाठी', '१०-भाड्याने घेतलेल्या जमिनीवरील औद्योगिक, हॉटेल, पर्यटन किंवा निवासी इमारती',
    '९९-संरक्षण क्षेत्रात काम करणाऱ्यांसाठी'
];
const DEPENDENT_TAX_OPTIONS = {
    'default': ['तळमजला दर प्रती चौ.मी.', 'पहिला मजला दर प्रती चौ.मी.'],
    '१-मालमत्ता किंमत खाली': ['किंमतीवर आधारित कर'],
    '२-वार्षिक भाड्याचे उत्पन्नावर कर पात्र': ['भाड्याच्या उत्पन्नावर आधारित कर'],
};

const initialMainData = {
    serialNo: '', period: '2023 - 2027', village: 'शिरगाव', financialYear: '',
    propertyNoFull: '1440', wardNo: '2', prabhagNo: '१',
    propertyNo: '1', street: 'घर नंबर चेचडी वस्ती पर्यंत', aadharNo: '',
    holderName: 'मालप्पा धाडू पाटकर', mobileNo: '0', holderNameEnglish: '', atticInfo: '', 
    waterSupplyType: 'निरंक', tapCount: '0', flatNo: '', meterSurveyNo: '', gatNo: '162', 
    toilet: 'आहे', notes: '21 | पक्की खुली इमारत जागा मालकाचे नावे यावर प्रत्यक्ष जागा ताब्यात आहे ती नोंद 300/1985 \n21 | पक्की खुली इमारत/जागा मालकाच्या नावे आहे. ती नोंद 300/1900',
    planTax: true, diwaliTax: false, diwanAgam: false, inDefenseArea: false, isMIDC: false, specialProperty: false
};

const initialDescription = {
    id: null, propertyType: 'अर्ध पक्के घरासाठी भिटीचे मातीचे घर', floor: 'Ground Floor',
    otherInfo: '', unit: 'sqft', length: '30', width: '48', area: '1440.00',
    usage: 'रहिवासी', authorization: 'authorized', constructionYear: '1995',
    landConstructionRate: '2023 - 2024', previousTaxSurcharge: '0', landRate: '1380',
    rebate: '-1', oldValue: '0', propertyTaxRateType: '', dependentTaxType: 'तळमजला दर प्रती चौ.मी.'
};

// Reusable component for consistent form fields
const FormField = ({ id, label, children }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        {children}
=======
export default function MalmattaMahitiDetail() {
  const { language, t } = useLanguage();
  
  // Property Holder Information State
  const [propertyHolderData, setPropertyHolderData] = useState({
    serialNo: '',
    period: '',
    villageName: '',
    propertyGroupEconomicCategory: '',
    propertyNo: '',
    wardNoGroupNo: '',
    propertyActivityNo: '',
    streetNameLaneNo: '',
    address: '',
    propertyHolderName: '',
    propertyHolderNameEnglish: '',
    aadharNo: '',
    mobileNo: '',
    waterSupply: '',
    permanentAccountNo: '',
    tapNumber: '',
    groupNoResidentNo: '',
    toilet: '',
    // Checkboxes
    planTax: false,
    diwaliTax: false,
    diwanAgam: false,
    workingInDefenseArea: false,
    midc: false,
    specialPropertyRegistration: false
  });

  // Property Description State
  const [propertyDescriptionData, setPropertyDescriptionData] = useState({
    propertyType: '',
    otherPropertyInfo: '',
    floor: '',
    areaForPerson: '',
    tank: '',
    width: '',
    area: '',
    usage: '',
    propertyAssessmentCategory: '',
    assessmentYear: '',
    landAssessmentRatePerSqM: '',
    landRate: '',
    rateTypeCategory: '',
    shopRatePerSqFt: '',
    shopRatePerSqM: '',
    taxAssessmentTypeSubdivision: ''
  });

  // Table Data State
  const [tableData, setTableData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handlePropertyHolderChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPropertyHolderData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePropertyDescriptionChange = (e) => {
    const { name, value } = e.target;
    setPropertyDescriptionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNew = () => {
    setPropertyDescriptionData({
      propertyType: '',
      otherPropertyInfo: '',
      floor: '',
      areaForPerson: '',
      tank: '',
      width: '',
      area: '',
      usage: '',
      propertyAssessmentCategory: '',
      assessmentYear: '',
      landAssessmentRatePerSqM: '',
      landRate: '',
      rateTypeCategory: '',
      shopRatePerSqFt: '',
      shopRatePerSqM: '',
      taxAssessmentTypeSubdivision: ''
    });
    setEditingIndex(-1);
  };

  const handleSave = () => {
    if (editingIndex === -1) {
      // Add new entry
      setTableData(prev => [...prev, { ...propertyDescriptionData, id: Date.now() }]);
    } else {
      // Update existing entry
      setTableData(prev => prev.map((item, index) => 
        index === editingIndex ? { ...propertyDescriptionData, id: item.id } : item
      ));
      setEditingIndex(-1);
    }
    handleNew(); // Clear form
  };

  const handleEdit = (index) => {
    const item = tableData[index];
    setPropertyDescriptionData(item);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm('या नोंदी काढून टाकायची आहे का?')) {
      setTableData(prev => prev.filter((_, i) => i !== index));
      if (editingIndex === index) {
        handleNew();
      }
    }
  };

  const handleCancel = () => {
    handleNew();
  };

  const handleExit = () => {
    if (window.confirm('तुम्हाला या पानावरून बाहेर पडायचे आहे का?')) {
      window.history.back();
    }
  };

  const pageTexts = {
    title: {
      hi: 'मालमत्ता माहिती',
      mr: 'मालमत्ता माहिती',
      en: 'Property Information'
    },
    subtitle: {
      hi: 'मालमत्ता धारकाची माहिती आणि मालमत्तेचे वर्णन',
      mr: 'मालमत्ता धारकाची माहिती आणि मालमत्तेचे वर्णन',
      en: 'Property Holder Information and Property Description'
    },
    backToModule: {
      hi: '← मालमत्ता सेवाओं में वापस जाएं',
      mr: '← मालमत्ता सेवांकडे परत जा',
      en: '← Back to Property Services'
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <Link href="/malmatta-mahiti" className="text-primary-600 hover:text-primary-700 flex items-center">
            {t(pageTexts.backToModule)}
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t(pageTexts.title)}</h1>
        <p className="text-gray-600">{t(pageTexts.subtitle)}</p>
      </div>

      <div className="space-y-8">
        {/* Property Holder Information Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2 text-blue-600">
            मालमत्ता धारकाची माहिती (Property Holder Information)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  अ.क्र. (Serial No.)
                </label>
                <input
                  type="text"
                  name="serialNo"
                  value={propertyHolderData.serialNo}
                  onChange={handlePropertyHolderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  कालावधी (Period)
                </label>
                <input
                  type="text"
                  name="period"
                  value={propertyHolderData.period}
                  onChange={handlePropertyHolderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  गावाचे नाव (Village Name)
                </label>
                <input
                  type="text"
                  name="villageName"
                  value={propertyHolderData.villageName}
                  onChange={handlePropertyHolderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मालमत्ता गट आर्थिक वर्ग (Property Group Economic Category)
                </label>
                <input
                  type="text"
                  name="propertyGroupEconomicCategory"
                  value={propertyHolderData.propertyGroupEconomicCategory}
                  onChange={handlePropertyHolderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मालमत्ता क्रमांक (Property No.)
                </label>
                <input
                  type="text"
                  name="propertyNo"
                  value={propertyHolderData.propertyNo}
                  onChange={handlePropertyHolderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  वार्ड नं. / गट नं. (Ward No. / Group No.)
                </label>
                <input
                  type="text"
                  name="wardNoGroupNo"
                  value={propertyHolderData.wardNoGroupNo}
                  onChange={handlePropertyHolderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Middle Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मालमत्ता उपक्रम क्र. (Property Activity No.)
                </label>
                <input
                  type="text"
                  name="propertyActivityNo"
                  value={propertyHolderData.propertyActivityNo}
                  onChange={handlePropertyHolderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  रस्त्याचे नाव / गल्ली क्र. (Street Name / Lane No.)
                </label>
                <input
                  type="text"
                  name="streetNameLaneNo"
                  value={propertyHolderData.streetNameLaneNo}
                  onChange={handlePropertyHolderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  पत्‍ता / पत्ता (Address)
                </label>
                <textarea
                  name="address"
                  value={propertyHolderData.address}
                  onChange={handlePropertyHolderChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मालमत्ता धारकाचे नाव (Property Holder's Name)
                </label>
                <input
                  type="text"
                  name="propertyHolderName"
                  value={propertyHolderData.propertyHolderName}
                  onChange={handlePropertyHolderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मालमत्ता धारकाचे नाव (ENGLISH)
                </label>
                <input
                  type="text"
                  name="propertyHolderNameEnglish"
                  value={propertyHolderData.propertyHolderNameEnglish}
                  onChange={handlePropertyHolderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  आधार क्रमांक (Aadhaar No.)
                </label>
                <input
                  type="text"
                  name="aadharNo"
                  value={propertyHolderData.aadharNo}
                  onChange={handlePropertyHolderChange}
                  pattern="[0-9]{12}"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मोबाइल क्रमांक (Mobile No.)
                </label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={propertyHolderData.mobileNo}
                  onChange={handlePropertyHolderChange}
                  pattern="[0-9]{10}"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  पाणीपुरवठा (Water Supply)
                </label>
                <select
                  name="waterSupply"
                  value={propertyHolderData.waterSupply}
                  onChange={handlePropertyHolderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">निवडा</option>
                  <option value="available">उपलब्ध</option>
                  <option value="not-available">उपलब्ध नाही</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  स्थायी खाते क्रमांक (Permanent Account Number)
                </label>
                <input
                  type="text"
                  name="permanentAccountNo"
                  value={propertyHolderData.permanentAccountNo}
                  onChange={handlePropertyHolderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  नळ क्रमांक (Tap Number)
                </label>
                <input
                  type="text"
                  name="tapNumber"
                  value={propertyHolderData.tapNumber}
                  onChange={handlePropertyHolderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  गट क्रमांक / रहिवासी क्र. (Group No. / Resident No.)
                </label>
                <input
                  type="text"
                  name="groupNoResidentNo"
                  value={propertyHolderData.groupNoResidentNo}
                  onChange={handlePropertyHolderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  शौचालय (Toilet)
                </label>
                <select
                  name="toilet"
                  value={propertyHolderData.toilet}
                  onChange={handlePropertyHolderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">निवडा</option>
                  <option value="available">उपलब्ध</option>
                  <option value="not-available">उपलब्ध नाही</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-4">
                <h4 className="font-medium text-gray-700">पर्याय (Options):</h4>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="planTax"
                    checked={propertyHolderData.planTax}
                    onChange={handlePropertyHolderChange}
                    className="mr-2"
                  />
                  <span className="text-sm">आराखडा कर (Plan Tax)</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="diwaliTax"
                    checked={propertyHolderData.diwaliTax}
                    onChange={handlePropertyHolderChange}
                    className="mr-2"
                  />
                  <span className="text-sm">दिवाळी कर (Diwali Tax)</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="diwanAgam"
                    checked={propertyHolderData.diwanAgam}
                    onChange={handlePropertyHolderChange}
                    className="mr-2"
                  />
                  <span className="text-sm">दिवाण/अगम (Diwan/Agam)</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="workingInDefenseArea"
                    checked={propertyHolderData.workingInDefenseArea}
                    onChange={handlePropertyHolderChange}
                    className="mr-2"
                  />
                  <span className="text-sm">संरक्षण क्षेत्रात काम करत असल्याचे</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="midc"
                    checked={propertyHolderData.midc}
                    onChange={handlePropertyHolderChange}
                    className="mr-2"
                  />
                  <span className="text-sm">महाराष्ट्र औद्योगिक विकास महामंडळ (MIDC)</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="specialPropertyRegistration"
                    checked={propertyHolderData.specialPropertyRegistration}
                    onChange={handlePropertyHolderChange}
                    className="mr-2"
                  />
                  <span className="text-sm">विशेष प्रकारची मालमत्ता असल्यास नोंदणी करावी</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Property Description Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2 text-green-600">
            मालमत्तेचे वर्णन (Property Description)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मि.प्रकार (Property Type)
                </label>
                <select
                  name="propertyType"
                  value={propertyDescriptionData.propertyType}
                  onChange={handlePropertyDescriptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">निवडा</option>
                  <option value="residential">निवासी</option>
                  <option value="commercial">व्यावसायिक</option>
                  <option value="industrial">औद्योगिक</option>
                  <option value="agricultural">कृषी</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मि. इतर माहिती (Other Property Info)
                </label>
                <input
                  type="text"
                  name="otherPropertyInfo"
                  value={propertyDescriptionData.otherPropertyInfo}
                  onChange={handlePropertyDescriptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मजला (Floor)
                </label>
                <input
                  type="text"
                  name="floor"
                  value={propertyDescriptionData.floor}
                  onChange={handlePropertyDescriptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  इसमासाठी क्षेत्रफळ (Area for person)
                </label>
                <input
                  type="number"
                  name="areaForPerson"
                  value={propertyDescriptionData.areaForPerson}
                  onChange={handlePropertyDescriptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  टाकी (Tank)
                </label>
                <input
                  type="text"
                  name="tank"
                  value={propertyDescriptionData.tank}
                  onChange={handlePropertyDescriptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  रूंदी (Width)
                </label>
                <input
                  type="number"
                  name="width"
                  value={propertyDescriptionData.width}
                  onChange={handlePropertyDescriptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  क्षेत्रफळ (Area)
                </label>
                <input
                  type="number"
                  name="area"
                  value={propertyDescriptionData.area}
                  onChange={handlePropertyDescriptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  वापर (Usage)
                </label>
                <select
                  name="usage"
                  value={propertyDescriptionData.usage}
                  onChange={handlePropertyDescriptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">निवडा</option>
                  <option value="self-occupied">स्वतःच्या वापरासाठी</option>
                  <option value="rented">भाड्याने दिले</option>
                  <option value="vacant">रिकामे</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मालमत्ता आकारणी प्रमाणे वर्ग (Property Assessment Category)
                </label>
                <input
                  type="text"
                  name="propertyAssessmentCategory"
                  value={propertyDescriptionData.propertyAssessmentCategory}
                  onChange={handlePropertyDescriptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मालमत्ता आकारणी वर्ष (Assessment Year)
                </label>
                <input
                  type="number"
                  name="assessmentYear"
                  value={propertyDescriptionData.assessmentYear}
                  onChange={handlePropertyDescriptionChange}
                  min="2000"
                  max="2030"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Third Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  जमिनीचा आकारणी दर प्रती चौ.मी. (Land Assessment Rate per sq.m.)
                </label>
                <input
                  type="number"
                  name="landAssessmentRatePerSqM"
                  value={propertyDescriptionData.landAssessmentRatePerSqM}
                  onChange={handlePropertyDescriptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  जमिनीचा दर (Land Rate)
                </label>
                <input
                  type="number"
                  name="landRate"
                  value={propertyDescriptionData.landRate}
                  onChange={handlePropertyDescriptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  दरप्रकार कर दर प्रकार (Rate Type)
                </label>
                <input
                  type="text"
                  name="rateTypeCategory"
                  value={propertyDescriptionData.rateTypeCategory}
                  onChange={handlePropertyDescriptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  गाळ्याचे दर प्रती चौ.फू. (Shop Rate per sq.ft.)
                </label>
                <input
                  type="number"
                  name="shopRatePerSqFt"
                  value={propertyDescriptionData.shopRatePerSqFt}
                  onChange={handlePropertyDescriptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  गाळ्याचे दर प्रती चौ.मी (Shop Rate per sq.m.)
                </label>
                <input
                  type="number"
                  name="shopRatePerSqM"
                  value={propertyDescriptionData.shopRatePerSqM}
                  onChange={handlePropertyDescriptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  टॅक्स आकारणी प्रकार / उपविभाग (Tax Type / Subdivision)
                </label>
                <input
                  type="text"
                  name="taxAssessmentTypeSubdivision"
                  value={propertyDescriptionData.taxAssessmentTypeSubdivision}
                  onChange={handlePropertyDescriptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={handleNew}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              नवीन (New)
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              साठवा (Save)
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            >
              रद्द करा (Cancel)
            </button>
            <button
              type="button"
              onClick={() => editingIndex !== -1 ? handleEdit(editingIndex) : null}
              disabled={editingIndex === -1}
              className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors disabled:bg-gray-300"
            >
              बदल (Edit)
            </button>
            <button
              type="button"
              onClick={() => editingIndex !== -1 ? handleDelete(editingIndex) : null}
              disabled={editingIndex === -1}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:bg-gray-300"
            >
              काढून टाका (Delete)
            </button>
            <button
              type="button"
              onClick={handleExit}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              बाहेर (Exit)
            </button>
          </div>
        </div>

        {/* Property Details Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">मालमत्ता तपशील यादी (Property Details List)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">मि. नं. (Sr. No.)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">मि. प्रकार (Property Type)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">मजला (Floor)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">लांबी (Length)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">रूंदी (Width)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">क्षेत्रफळ (Area)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">वापर (Usage)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">आकारणी वर्ष (Assessment Year)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">कर दर प्रकार (Tax Rate Type)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">मि. इतर माहिती (Other Info)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">सुटका (Rebate/Exemption)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">क्रिया (Actions)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                      अद्याप कोणतीही नोंद नाही (No records yet)
                    </td>
                  </tr>
                ) : (
                  tableData.map((item, index) => (
                    <tr key={item.id} className={editingIndex === index ? 'bg-yellow-50' : ''}>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{index + 1}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{item.propertyType}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{item.floor}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">-</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{item.width}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{item.area}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{item.usage}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{item.assessmentYear}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{item.rateTypeCategory}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{item.otherPropertyInfo}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">-</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                          >
                            संपादन
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                          >
                            हटवा
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
>>>>>>> f626caa6899b01da9955f535526881a0b7184d0b
    </div>
);

export default function ModernMalmattaForm() {
    // --- All state and logic hooks (useState, useEffect, handlers) remain unchanged ---
    const [mainData, setMainData] = useState(initialMainData);
    const [currentDescription, setCurrentDescription] = useState(initialDescription);
    const [descriptions, setDescriptions] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [dependentOptions, setDependentOptions] = useState(DEPENDENT_TAX_OPTIONS.default);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(() => {
        const { length, width } = currentDescription;
        if (length && width && !isNaN(length) && !isNaN(width)) {
            setCurrentDescription(prev => ({ ...prev, area: (parseFloat(length) * parseFloat(width)).toFixed(2) }));
        }
    }, [currentDescription.length, currentDescription.width]);

    useEffect(() => {
        const options = DEPENDENT_TAX_OPTIONS[currentDescription.propertyTaxRateType] || DEPENDENT_TAX_OPTIONS.default;
        setDependentOptions(options);
        setCurrentDescription(prev => ({...prev, dependentTaxType: options[0] || ''}));
    }, [currentDescription.propertyTaxRateType]);
    
    const handleMainChange = (e) => {
        const { name, value, type, checked } = e.target;
        setMainData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleDescriptionChange = (e) => {
        const { name, value } = e.target;
        setCurrentDescription(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveDescription = () => {
        if (!currentDescription.area || !currentDescription.usage) {
            alert('कृपया क्षेत्रफळ आणि वापर ही माहिती भरा.'); return;
        }
        if (editingId !== null) {
            setDescriptions(descriptions.map(d => d.id === editingId ? { ...currentDescription, id: editingId } : d));
        } else {
            setDescriptions([...descriptions, { ...currentDescription, id: Date.now() }]);
        }
        handleNewDescription();
    };
    
    const handleNewDescription = () => {
        setEditingId(null);
        setCurrentDescription(initialDescription);
    };

    const handleEditDescription = (id) => {
        const descToEdit = descriptions.find(d => d.id === id);
        if (descToEdit) { window.scrollTo(0, 300); setEditingId(id); setCurrentDescription(descToEdit); }
    };

    const handleDeleteDescription = (id) => {
        if (confirm('तुम्ही ही नोंदणी काढून टाकू इच्छिता?')) {
            setDescriptions(descriptions.filter(d => d.id !== id));
            if(id === editingId) handleNewDescription();
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (descriptions.length === 0) {
            alert('कृपया अर्ज जतन करण्यापूर्वी किमान एक मालमत्ता वर्णन जोडा.');
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/save-property', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mainData, descriptions })
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Server error');
            }
            alert(`अर्ज यशस्वीरित्या जतन झाला! तुमचा अर्ज क्रमांक आहे: ${result.applicationId}`);
            setMainData(initialMainData); 
            setDescriptions([]); 
            handleNewDescription();
        } catch (error) {
            alert(`अर्ज जतन करताना त्रुटी आली: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Consistent styling for inputs
    const inputClass = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm";
    
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">मालमत्ता माहिती व कर आकारणी</h1>
                    <p className="text-gray-600 mt-1">नवीन मालमत्ता नोंदणी करण्यासाठी खालील माहिती भरा.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Section 1: Holder's Details */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">१. मालमत्ता धारकाची माहिती</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <FormField label="धारकाचे नाव (मराठी)"><input type="text" name="holderName" value={mainData.holderName} onChange={handleMainChange} className={inputClass} required /></FormField>
                            <FormField label="धारकाचे नाव (English)"><input type="text" name="holderNameEnglish" value={mainData.holderNameEnglish} onChange={handleMainChange} className={inputClass} /></FormField>
                            <FormField label="मोबाईल नंबर"><input type="tel" name="mobileNo" value={mainData.mobileNo} onChange={handleMainChange} className={inputClass} placeholder="10-digit number" /></FormField>
                            <FormField label="आधार क्रमांक"><input type="text" name="aadharNo" value={mainData.aadharNo} onChange={handleMainChange} className={inputClass} placeholder="12-digit number" /></FormField>
                        </div>
                    </div>
                    
                    {/* Section 2: Property Location and ID */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">२. मालमत्तेचे ओळख व स्थान</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <FormField label="गाव"><select name="village" value={mainData.village} onChange={handleMainChange} className={inputClass}>{VILLAGE_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                            <FormField label="रस्त्याचे नाव / गल्ली"><select name="street" value={mainData.street} onChange={handleMainChange} className={inputClass}>{STREET_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                            <FormField label="मालमत्ता क्रमांक (नमुना ८)"><input type="text" name="propertyNoFull" value={mainData.propertyNoFull} onChange={handleMainChange} className={inputClass} /></FormField>
                            <FormField label="मालमत्ता क्रमांक"><input type="text" name="propertyNo" value={mainData.propertyNo} onChange={handleMainChange} className={inputClass} /></FormField>
                            <FormField label="गट नंबर"><input type="text" name="gatNo" value={mainData.gatNo} onChange={handleMainChange} className={inputClass} /></FormField>
                            <FormField label="फ्लॅट क्रमांक"><input type="text" name="flatNo" value={mainData.flatNo} onChange={handleMainChange} className={inputClass} /></FormField>
                            <FormField label="Ward प्रभाग क्र."><input type="text" name="wardNo" value={mainData.wardNo} onChange={handleMainChange} className={inputClass} /></FormField>
                            <FormField label="प्रभाग क्र."><input type="text" name="prabhagNo" value={mainData.prabhagNo} onChange={handleMainChange} className={inputClass} /></FormField>
                        </div>
                    </div>

                    {/* Section 3: Add Property Description */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">३. मालमत्तेचे वर्णन {editingId ? '(नोंदणी बदलत आहे)' : '(नवीन नोंदणी)'}</h2>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField label="मालमत्तेचा प्रकार"><select name="propertyType" value={currentDescription.propertyType} onChange={handleDescriptionChange} className={inputClass}>{PROPERTY_TYPES.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                                <FormField label="मजला"><select name="floor" value={currentDescription.floor} onChange={handleDescriptionChange} className={inputClass}>{FLOOR_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                                <FormField label="लांबी (फूट)"><input type="number" step="0.01" name="length" value={currentDescription.length} onChange={handleDescriptionChange} className={inputClass} placeholder="e.g., 30" /></FormField>
                                <FormField label="रुंदी (फूट)"><input type="number" step="0.01" name="width" value={currentDescription.width} onChange={handleDescriptionChange} className={inputClass} placeholder="e.g., 48" /></FormField>
                                <FormField label="एकूण क्षेत्रफळ (चौ.फू.)"><input type="text" name="area" value={currentDescription.area} className={`${inputClass} bg-gray-100 cursor-not-allowed`} readOnly /></FormField>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField label="वापर"><input type="text" name="usage" value={currentDescription.usage} onChange={handleDescriptionChange} className={inputClass} placeholder="e.g., रहिवासी" /></FormField>
                                <FormField label="बांधकाम वर्ष"><input type="number" name="constructionYear" value={currentDescription.constructionYear} onChange={handleDescriptionChange} className={inputClass} placeholder="e.g., 1995" /></FormField>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField label="मालमत्ता कर दर प्रकार">
                                     <select name="propertyTaxRateType" value={currentDescription.propertyTaxRateType} onChange={handleDescriptionChange} className={inputClass}>
                                        <option value="">-- निवडा --</option>{TAX_RATE_TYPES.map(opt => <option key={opt}>{opt}</option>)}
                                    </select>
                                </FormField>
                                <FormField label="प्रभाग उपविभाग (स्वयंचलित)">
                                    <select name="dependentTaxType" value={currentDescription.dependentTaxType} onChange={handleDescriptionChange} className={inputClass}>
                                        {dependentOptions.map(opt => <option key={opt}>{opt}</option>)}
                                    </select>
                                </FormField>
                             </div>
                        </div>
                         <div className="mt-6 pt-6 border-t flex items-center gap-4">
                            <button type="button" onClick={handleSaveDescription} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {editingId ? 'वर्णन अपडेट करा' : 'वर्णन जोडा'}
                            </button>
                             <button type="button" onClick={handleNewDescription} className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300">
                                साफ करा
                            </button>
                        </div>
                    </div>

                    {/* Section 4: List of Added Descriptions */}
                    {descriptions.length > 0 && (
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">४. जोडलेल्या मालमत्तेची यादी</h2>
                            <div className="overflow-x-auto border rounded-lg">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            {['प्रकार', 'मजला', 'क्षेत्रफळ', 'वापर', 'बांधकाम वर्ष', 'Actions'].map(h => 
                                                <th key={h} className="p-3 text-left font-semibold text-gray-600 tracking-wider">{h}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {descriptions.map((d, index) => (
                                            <tr key={d.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                                <td className="p-3 text-gray-800">{d.propertyType}</td>
                                                <td className="p-3 text-gray-800">{d.floor}</td>
                                                <td className="p-3 text-gray-800">{d.area} चौ.फू.</td>
                                                <td className="p-3 text-gray-800">{d.usage}</td>
                                                <td className="p-3 text-gray-800">{d.constructionYear}</td>
                                                <td className="p-3 space-x-4 whitespace-nowrap">
                                                    <button type="button" onClick={() => handleEditDescription(d.id)} className="font-medium text-indigo-600 hover:text-indigo-800">बदल</button>
                                                    <button type="button" onClick={() => handleDeleteDescription(d.id)} className="font-medium text-red-600 hover:text-red-800">काढा</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    
                    {/* Final Submission Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <p className="text-gray-600 text-sm">कृपया सबमिट करण्यापूर्वी सर्व माहिती तपासा. एकदा सबमिट केल्यावर बदल करता येणार नाहीत.</p>
                            <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-10 py-3 bg-green-600 text-white font-bold text-lg rounded-md shadow-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105">
                                {isSubmitting ? 'जतन करत आहे...' : 'संपूर्ण अर्ज जतन करा'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}