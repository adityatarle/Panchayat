'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MalmattaFerfer() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    // Property Details
    propertyNumber: '',
    surveyNumber: '',
    plotNumber: '',
    village: '',
    taluka: '',
    district: 'Maharashtra',
    
    // From Owner Details
    ownerName: '',
    ownerNameMarathi: '',
    fatherName: '',
    aadharNumber: '',
    mobileNumber: '',
    
    // To Owner Details
    newOwnerName: '',
    newOwnerFatherName: '',
    newOwnerAadhar: '',
    newOwnerMobile: '',
    newOwnerAddress: '',
    
    // Transfer Details
    transferReason: '',
    transferDate: '',
    transferAmount: '',
    propertyType: '',
    totalArea: '',
    
    // Purpose
    purpose: 'Property Transfer'
  });

  const [documents, setDocuments] = useState({
    aadharCard: null,
    newOwnerAadhar: null,
    sevenTwelve: null,
    salesDeed: null,
    noObjectionCertificate: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    
    try {
      const submitData = {
        ...formData,
        documents: documents,
        serviceType: 'property-transfer'
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
        alert(`मालमत्ता फेरफार अर्ज सफलतापूर्वक जमा झाला! आपला अर्ज क्रमांक: ${result.applicationId}`);
        // Reset form or redirect to success page
      } else {
        alert(`अर्ज जमा करण्यात त्रुटी: ${result.message}`);
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('अर्ज जमा करण्यात त्रुटी झाली. कृपया पुन्हा प्रयत्न करा.');
    }
  };

  const pageTexts = {
    title: {
      hi: 'मालमत्ता फेरफार',
      mr: 'मालमत्ता फेरफार',
      en: 'Property Transfer'
    },
    subtitle: {
      hi: 'संपत्ति हस्तांतरण के लिए आवेदन करें',
      mr: 'मालमत्ता हस्तांतरणासाठी अर्ज करा',
      en: 'Apply for property transfer'
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
          <div className="text-sm text-gray-500">
            आवेदन शुल्क: ₹200
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t(pageTexts.title)}</h1>
        <p className="text-gray-600">{t(pageTexts.subtitle)}</p>
      </div>

      {/* Important Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-yellow-800 mb-3">महत्वपूर्ण निर्देश | Important Instructions</h2>
        <ul className="space-y-2 text-sm text-yellow-700">
          <li>• मालमत्ता फेरफारासाठी सर्व कायदेशीर कागदपत्रे आवश्यक आहेत</li>
          <li>• All legal documents are required for property transfer</li>
          <li>• स्टँप ड्यूटी आणि नोंदणी शुल्क भरणे आवश्यक आहे</li>
          <li>• दोन्ही पक्षांच्या सहमतीची आवश्यकता आहे</li>
          <li>• प्रक्रिया पूर्ण होण्यासाठी 20-30 कार्य दिवस लागू शकतात</li>
          <li>• स्थानिक तहसीलदार कार्यालयात सत्यापन होईल</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Property Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">मालमत्ता तपशील | Property Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मालमत्ता नंबर *
              </label>
              <input
                type="text"
                name="propertyNumber"
                value={formData.propertyNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Property Number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                सर्व्हे नंबर *
              </label>
              <input
                type="text"
                name="surveyNumber"
                value={formData.surveyNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Survey Number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                प्लॉट नंबर
              </label>
              <input
                type="text"
                name="plotNumber"
                value={formData.plotNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Plot Number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                गाव *
              </label>
              <input
                type="text"
                name="village"
                value={formData.village}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Village Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मालमत्तेचा प्रकार *
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">निवडा</option>
                <option value="Residential">निवासी</option>
                <option value="Commercial">व्यावसायिक</option>
                <option value="Agricultural">कृषी</option>
                <option value="Industrial">औद्योगिक</option>
                <option value="Plot">प्लॉट</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                एकूण क्षेत्रफळ (चौ.फूट)
              </label>
              <input
                type="number"
                name="totalArea"
                value={formData.totalArea}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Total Area in Sq.Ft"
              />
            </div>
          </div>
        </div>

        {/* Current Owner Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">सध्याचे मालक तपशील | Current Owner Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मालकाचे नाव (इंग्रजी) *
              </label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Owner Name in English"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मालकाचे नाव (मराठी)
              </label>
              <input
                type="text"
                name="ownerNameMarathi"
                value={formData.ownerNameMarathi}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Owner Name in Marathi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वडिलांचे नाव *
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Father's Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                आधार नंबर *
              </label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                pattern="[0-9]{12}"
                placeholder="12 digit Aadhar Number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मोबाइल नंबर *
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                pattern="[0-9]{10}"
                placeholder="10 digit Mobile Number"
              />
            </div>
          </div>
        </div>

        {/* New Owner Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">नवीन मालक तपशील | New Owner Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                नवीन मालकाचे नाव *
              </label>
              <input
                type="text"
                name="newOwnerName"
                value={formData.newOwnerName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="New Owner Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                नवीन मालकाचे वडिलांचे नाव *
              </label>
              <input
                type="text"
                name="newOwnerFatherName"
                value={formData.newOwnerFatherName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="New Owner's Father Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                नवीन मालकाचा आधार नंबर *
              </label>
              <input
                type="text"
                name="newOwnerAadhar"
                value={formData.newOwnerAadhar}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                pattern="[0-9]{12}"
                placeholder="12 digit Aadhar Number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                नवीन मालकाचा मोबाइल नंबर *
              </label>
              <input
                type="tel"
                name="newOwnerMobile"
                value={formData.newOwnerMobile}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                pattern="[0-9]{10}"
                placeholder="10 digit Mobile Number"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                नवीन मालकाचा पत्ता *
              </label>
              <textarea
                name="newOwnerAddress"
                value={formData.newOwnerAddress}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Complete Address"
              />
            </div>
          </div>
        </div>

        {/* Transfer Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">हस्तांतरण तपशील | Transfer Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                हस्तांतरणाचे कारण *
              </label>
              <select
                name="transferReason"
                value={formData.transferReason}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">निवडा</option>
                <option value="Sale">विक्री</option>
                <option value="Gift">भेट/दान</option>
                <option value="Inheritance">वारसा</option>
                <option value="Will">मृत्युपत्र</option>
                <option value="Court Order">न्यायालयाचा आदेश</option>
                <option value="Family Settlement">कौटुंबिक तोडगा</option>
                <option value="Other">इतर</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                हस्तांतरणाची तारीख *
              </label>
              <input
                type="date"
                name="transferDate"
                value={formData.transferDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                हस्तांतरण रक्कम (रुपयात)
              </label>
              <input
                type="number"
                name="transferAmount"
                value={formData.transferAmount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Transfer Amount in Rupees"
              />
            </div>
          </div>
        </div>

        {/* Document Upload */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">आवश्यक कागदपत्रे | Required Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                सध्याच्या मालकाचा आधार कार्ड *
              </label>
              <input
                type="file"
                name="aadharCard"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                नवीन मालकाचा आधार कार्ड *
              </label>
              <input
                type="file"
                name="newOwnerAadhar"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ७/१२ उतारा *
              </label>
              <input
                type="file"
                name="sevenTwelve"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                विक्री खत / Sales Deed *
              </label>
              <input
                type="file"
                name="salesDeed"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ना हरकत प्रमाणपत्र
              </label>
              <input
                type="file"
                name="noObjectionCertificate"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              मी घोषणा करतो/करते की वरील सर्व माहिती सत्य आहे आणि मी सर्व कायदेशीर अटी मानतो/मानते. 
              मी हस्तांतरणासाठी सहमत आहे आणि सर्व आवश्यक शुल्क भरण्यास तयार आहे.
            </label>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              अर्ज जमा करा (Submit Application)
            </button>
            <Link href="/malmatta-mahiti" className="btn-secondary text-center flex-1">
              रद्द करा (Cancel)
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}