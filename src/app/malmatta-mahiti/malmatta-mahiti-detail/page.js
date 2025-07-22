'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

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
    </div>
  );
}