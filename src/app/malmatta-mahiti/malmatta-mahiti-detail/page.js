'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MalmattaMahitiDetail() {
  const { language, t } = useLanguage();
  
  const [formData, setFormData] = useState({
    // मालमत्ता धारकाची माहिती (Property Holder Information)
    serialNo: '',
    period: '',
    villageName: '',
    propertyGroupEconomicCategory: '',
    propertyNumber: '',
    wardNo: '',
    groupNo: '',
    propertyActivityNo: '',
    streetName: '',
    laneNo: '',
    address: '',
    propertyHolderName: '',
    propertyHolderNameEnglish: '',
    aadharNumber: '',
    mobileNumber: '',
    waterSupply: '',
    permanentAccountNumber: '',
    tapNumber: '',
    residentNumber: '',
    toilet: '',
    
    // Checkboxes (Right side options)
    planTax: false,
    diwaliTax: false,
    diwanAgam: false,
    defenseArea: false,
    midc: false,
    specialProperty: false,
    
    // Legacy fields for compatibility
    surveyNumber: '',
    subdividedNumber: '',
    plotNumber: '',
    village: '',
    taluka: '',
    district: 'Maharashtra',
    state: 'Maharashtra',
    pincode: '',
    ownerName: '',
    ownerNameMarathi: '',
    fatherName: '',
    motherName: '',
    email: '',
    
    // Purpose
    purpose: 'Property Information',
    purposeDescription: ''
  });

  const [propertyDescriptions, setPropertyDescriptions] = useState([
    {
      propertyType: '',
      otherPropertyInfo: '',
      floor: '',
      areaForPerson: '',
      tank: '',
      length: '',
      width: '',
      area: '',
      usage: '',
      propertyAssessmentCategory: '',
      assessmentYear: '',
      landAssessmentRatePerSqm: '',
      landRate: '',
      rateType: '',
      shopRatePerSqft: '',
      shopRatePerSqm: '',
      taxAssessmentType: '',
      subdivision: '',
      rebateExemption: ''
    }
  ]);

  const [documents, setDocuments] = useState({
    aadharCard: null,
    propertyCard: null,
    sevenTwelve: null,
    eightA: null,
    salesDeed: null,
    occupancyCertificate: null,
    taxReceipt: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePropertyDescriptionChange = (index, field, value) => {
    setPropertyDescriptions(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addPropertyDescription = () => {
    setPropertyDescriptions(prev => [...prev, {
      propertyType: '',
      otherPropertyInfo: '',
      floor: '',
      areaForPerson: '',
      tank: '',
      length: '',
      width: '',
      area: '',
      usage: '',
      propertyAssessmentCategory: '',
      assessmentYear: '',
      landAssessmentRatePerSqm: '',
      landRate: '',
      rateType: '',
      shopRatePerSqft: '',
      shopRatePerSqm: '',
      taxAssessmentType: '',
      subdivision: '',
      rebateExemption: ''
    }]);
  };

  const removePropertyDescription = (index) => {
    if (propertyDescriptions.length > 1) {
      setPropertyDescriptions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setDocuments(prev => ({
      ...prev,
      [name]: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const submitData = {
        ...formData,
        propertyDescriptions: propertyDescriptions,
        documents: documents,
        serviceType: 'property-information'
      };

      const response = await fetch('/api/malmatta-mahiti', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();
      
      if (result.success) {
        alert(`मालमत्ता माहिती अर्ज सफलतापूर्वक जमा झाला! आपला अर्ज क्रमांक: ${result.applicationId}`);
        // Reset form or redirect to success page
        window.location.href = '/malmatta-mahiti';
      } else {
        alert(`अर्ज जमा करण्यात त्रुटी: ${result.message}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('अर्ज जमा करण्यात त्रुटी झाली. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href="/malmatta-mahiti" className="text-blue-600 hover:text-blue-800 mr-4">
              ← परत जा
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">मालमत्तेची माहिती</h1>
          </div>
          <p className="text-gray-600">मालमत्ता संबंधी संपूर्ण माहिती प्राप्त करण्यासाठी खालील फॉर्म भरा</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* मालमत्ता धारकाची माहिती (Property Holder Information) */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-blue-600 text-white">
              <h2 className="text-xl font-semibold">मालमत्ता धारकाची माहिती (Property Holder Information)</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Main Form Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    अ.क्र. (Serial No.)
                  </label>
                  <input
                    type="text"
                    name="serialNo"
                    value={formData.serialNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    कालावधी (Period)
                  </label>
                  <input
                    type="text"
                    name="period"
                    value={formData.period}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    गावाचे नाव (Village Name) *
                  </label>
                  <input
                    type="text"
                    name="villageName"
                    value={formData.villageName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मालमत्ता गट आर्थिक वर्ग (Property Group Economic Category)
                  </label>
                  <input
                    type="text"
                    name="propertyGroupEconomicCategory"
                    value={formData.propertyGroupEconomicCategory}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मालमत्ता क्रमांक (Property No.) *
                  </label>
                  <input
                    type="text"
                    name="propertyNumber"
                    value={formData.propertyNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    वार्ड नं. (Ward No.)
                  </label>
                  <input
                    type="text"
                    name="wardNo"
                    value={formData.wardNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    गट नं. (Group No.)
                  </label>
                  <input
                    type="text"
                    name="groupNo"
                    value={formData.groupNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मालमत्ता उपक्रम क्र. (Property Activity No.)
                  </label>
                  <input
                    type="text"
                    name="propertyActivityNo"
                    value={formData.propertyActivityNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    रस्त्याचे नाव (Street Name)
                  </label>
                  <input
                    type="text"
                    name="streetName"
                    value={formData.streetName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    गल्ली क्र. (Lane No.)
                  </label>
                  <input
                    type="text"
                    name="laneNo"
                    value={formData.laneNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    पत्‍ता (Address) *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मालमत्ता धारकाचे नाव (Property Holder's Name) *
                  </label>
                  <input
                    type="text"
                    name="propertyHolderName"
                    value={formData.propertyHolderName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मालमत्ता धारकाचे नाव (ENGLISH) *
                  </label>
                  <input
                    type="text"
                    name="propertyHolderNameEnglish"
                    value={formData.propertyHolderNameEnglish}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    आधार क्रमांक (Aadhaar No.) *
                  </label>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{12}"
                    maxLength="12"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मोबाइल क्रमांक (Mobile No.) *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    maxLength="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    पाणीपुरवठा (Water Supply)
                  </label>
                  <select
                    name="waterSupply"
                    value={formData.waterSupply}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">निवडा</option>
                    <option value="आहे">आहे</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    स्थायी खाते क्रमांक (Permanent Account Number)
                  </label>
                  <input
                    type="text"
                    name="permanentAccountNumber"
                    value={formData.permanentAccountNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    नळ क्रमांक (Tap Number)
                  </label>
                  <input
                    type="text"
                    name="tapNumber"
                    value={formData.tapNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    रहिवासी क्र. (Resident No.)
                  </label>
                  <input
                    type="text"
                    name="residentNumber"
                    value={formData.residentNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    शौचालय (Toilet)
                  </label>
                  <select
                    name="toilet"
                    value={formData.toilet}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">निवडा</option>
                    <option value="आहे">आहे</option>
                    <option value="नाही">नाही</option>
                  </select>
                </div>
              </div>

              {/* Checkboxes Section */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">अतिरिक्त माहिती</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="planTax"
                      id="planTax"
                      checked={formData.planTax}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="planTax" className="ml-2 block text-sm text-gray-700">
                      आराखडा कर (Plan Tax)
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="diwaliTax"
                      id="diwaliTax"
                      checked={formData.diwaliTax}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="diwaliTax" className="ml-2 block text-sm text-gray-700">
                      दिवाळी कर (Diwali Tax)
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="diwanAgam"
                      id="diwanAgam"
                      checked={formData.diwanAgam}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="diwanAgam" className="ml-2 block text-sm text-gray-700">
                      दिवाण/अगम (Diwan/Agam)
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="defenseArea"
                      id="defenseArea"
                      checked={formData.defenseArea}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="defenseArea" className="ml-2 block text-sm text-gray-700">
                      संरक्षण क्षेत्रात काम (Working in Defense Area)
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="midc"
                      id="midc"
                      checked={formData.midc}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="midc" className="ml-2 block text-sm text-gray-700">
                      MIDC
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="specialProperty"
                      id="specialProperty"
                      checked={formData.specialProperty}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="specialProperty" className="ml-2 block text-sm text-gray-700">
                      विशेष प्रकारची मालमत्ता (Special Property)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* मालमत्तेचे वर्णन (Property Description) */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-green-600 text-white flex justify-between items-center">
              <h2 className="text-xl font-semibold">मालमत्तेचे वर्णन (Property Description)</h2>
              <button
                type="button"
                onClick={addPropertyDescription}
                className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded text-sm font-medium"
              >
                नवीन (New)
              </button>
            </div>
            
            <div className="p-6">
              {propertyDescriptions.map((desc, index) => (
                <div key={index} className="mb-8 p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      मालमत्ता वर्णन #{index + 1}
                    </h3>
                    {propertyDescriptions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePropertyDescription(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        काढून टाका (Remove)
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        मि.प्रकार (Property Type)
                      </label>
                      <input
                        type="text"
                        value={desc.propertyType}
                        onChange={(e) => handlePropertyDescriptionChange(index, 'propertyType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        मि. इतर माहिती (Other Info)
                      </label>
                      <input
                        type="text"
                        value={desc.otherPropertyInfo}
                        onChange={(e) => handlePropertyDescriptionChange(index, 'otherPropertyInfo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        मजला (Floor)
                      </label>
                      <input
                        type="text"
                        value={desc.floor}
                        onChange={(e) => handlePropertyDescriptionChange(index, 'floor', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        लांबी (Length)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={desc.length}
                        onChange={(e) => handlePropertyDescriptionChange(index, 'length', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        रूंदी (Width)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={desc.width}
                        onChange={(e) => handlePropertyDescriptionChange(index, 'width', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        क्षेत्रफळ (Area)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={desc.area}
                        onChange={(e) => handlePropertyDescriptionChange(index, 'area', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        वापर (Usage)
                      </label>
                      <input
                        type="text"
                        value={desc.usage}
                        onChange={(e) => handlePropertyDescriptionChange(index, 'usage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        आकारणी वर्ष (Assessment Year)
                      </label>
                      <input
                        type="text"
                        value={desc.assessmentYear}
                        onChange={(e) => handlePropertyDescriptionChange(index, 'assessmentYear', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        कर दर प्रकार (Tax Rate Type)
                      </label>
                      <input
                        type="text"
                        value={desc.rateType}
                        onChange={(e) => handlePropertyDescriptionChange(index, 'rateType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        सुटका (Rebate/Exemption)
                      </label>
                      <input
                        type="text"
                        value={desc.rebateExemption}
                        onChange={(e) => handlePropertyDescriptionChange(index, 'rebateExemption', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Property Descriptions Table */}
              <div className="mt-8 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        मि. नं.
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        मि. प्रकार
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        मजला
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        लांबी
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        रूंदी
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        क्षेत्रफळ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        वापर
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        आकारणी वर्ष
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        सुटका
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {propertyDescriptions.map((desc, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {desc.propertyType || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {desc.floor || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {desc.length || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {desc.width || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {desc.area || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {desc.usage || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {desc.assessmentYear || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {desc.rebateExemption || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-purple-600 text-white">
              <h2 className="text-xl font-semibold">आवश्यक कागदपत्रे (Required Documents)</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    आधार कार्ड (Aadhaar Card) *
                  </label>
                  <input
                    type="file"
                    name="aadharCard"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मालमत्ता कार्ड (Property Card) *
                  </label>
                  <input
                    type="file"
                    name="propertyCard"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ७/१२ उतारा (7/12 Extract) *
                  </label>
                  <input
                    type="file"
                    name="sevenTwelve"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ८-अ उतारा (8-A Extract)
                  </label>
                  <input
                    type="file"
                    name="eightA"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    विक्री खत (Sale Deed)
                  </label>
                  <input
                    type="file"
                    name="salesDeed"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    कर रसीद (Tax Receipt)
                  </label>
                  <input
                    type="file"
                    name="taxReceipt"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isSubmitting ? 'सबमिट करत आहे...' : 'साठवा (Save)'}
                </button>

                <button
                  type="button"
                  onClick={() => window.location.href = '/malmatta-mahiti'}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  रद्द करा (Cancel)
                </button>

                <button
                  type="button"
                  onClick={() => window.location.href = '/malmatta-mahiti'}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  बाहेर (Exit)
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}