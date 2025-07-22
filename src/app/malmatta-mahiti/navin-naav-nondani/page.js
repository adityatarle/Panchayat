'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NavinNaavNondani() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    // Property Details
    propertyNumber: '',
    surveyNumber: '',
    plotNumber: '',
    
    // Current Owner Details
    currentOwnerName: '',
    currentOwnerNameMarathi: '',
    currentOwnerFatherName: '',
    currentOwnerAadhar: '',
    
    // New Owner Details
    newOwnerName: '',
    newOwnerNameMarathi: '',
    newOwnerFatherName: '',
    newOwnerMotherName: '',
    newOwnerDateOfBirth: '',
    newOwnerAadhar: '',
    newOwnerMobile: '',
    newOwnerEmail: '',
    
    // Address Details
    newOwnerAddress: '',
    city: '',
    district: 'Maharashtra',
    state: 'Maharashtra',
    pincode: '',
    
    // Transfer Details
    transferReason: '',
    transferDate: '',
    transferAmount: '',
    stampDutyPaid: '',
    registrationFee: '',
    
    // Additional Information
    relationWithCurrentOwner: '',
    maritalStatus: '',
    occupation: '',
    monthlyIncome: ''
  });

  const [documents, setDocuments] = useState({
    currentOwnerAadhar: null,
    newOwnerAadhar: null,
    sevenTwelve: null,
    eightA: null,
    salesDeed: null,
    giftDeed: null,
    willDocument: null,
    courtOrder: null,
    noObjectionCertificate: null,
    stampPaper: null,
    identityProof: null,
    addressProof: null
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
        serviceType: 'new-name-registration'
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
        alert(`नवीन नाव नोंदणी अर्ज सफलतापूर्वक जमा झाला! आपला अर्ज क्रमांक: ${result.applicationId}`);
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
      hi: 'नवीन नाव नोंदणी',
      mr: 'नवीन नाव नोंदणी',
      en: 'New Name Registration'
    },
    subtitle: {
      hi: 'संपत्ति नाम परिवर्तन के लिए आवेदन करें',
      mr: 'मालमत्ता नाव बदलासाठी अर्ज करा',
      en: 'Apply for property name change'
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
            आवेदन शुल्क: ₹100
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t(pageTexts.title)}</h1>
        <p className="text-gray-600">{t(pageTexts.subtitle)}</p>
      </div>

      {/* Important Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-yellow-800 mb-3">महत्वपूर्ण निर्देश | Important Instructions</h2>
        <ul className="space-y-2 text-sm text-yellow-700">
          <li>• नाव नोंदणीसाठी सर्व कायदेशीर कागदपत्रे आवश्यक आहेत</li>
          <li>• All legal documents are required for name registration</li>
          <li>• मूळ मालकाकडून नो ऑब्जेक्शन सर्टिफिकेट आवश्यक</li>
          <li>• स्टँप ड्यूटी आणि नोंदणी शुल्क भरावे लागेल</li>
          <li>• प्रक्रिया पूर्ण होण्यासाठी 15-30 कार्य दिवस लागू शकतात</li>
          <li>• स्थानिक तहसीलदार कार्यालयात सत्यापन आवश्यक</li>
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
          </div>
        </div>

        {/* Current Owner Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">सध्याचे मालक तपशील | Current Owner Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                सध्याच्या मालकाचे नाव (इंग्रजी) *
              </label>
              <input
                type="text"
                name="currentOwnerName"
                value={formData.currentOwnerName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Current Owner Name in English"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                सध्याच्या मालकाचे नाव (मराठी)
              </label>
              <input
                type="text"
                name="currentOwnerNameMarathi"
                value={formData.currentOwnerNameMarathi}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Current Owner Name in Marathi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                सध्याच्या मालकाचे वडिलांचे नाव *
              </label>
              <input
                type="text"
                name="currentOwnerFatherName"
                value={formData.currentOwnerFatherName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Current Owner's Father Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                सध्याच्या मालकाचा आधार नंबर *
              </label>
              <input
                type="text"
                name="currentOwnerAadhar"
                value={formData.currentOwnerAadhar}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                pattern="[0-9]{12}"
                placeholder="12 digit Aadhar Number"
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
                नवीन मालकाचे नाव (इंग्रजी) *
              </label>
              <input
                type="text"
                name="newOwnerName"
                value={formData.newOwnerName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="New Owner Name in English"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                नवीन मालकाचे नाव (मराठी)
              </label>
              <input
                type="text"
                name="newOwnerNameMarathi"
                value={formData.newOwnerNameMarathi}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="New Owner Name in Marathi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वडिलांचे नाव *
              </label>
              <input
                type="text"
                name="newOwnerFatherName"
                value={formData.newOwnerFatherName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Father's Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                आईचे नाव
              </label>
              <input
                type="text"
                name="newOwnerMotherName"
                value={formData.newOwnerMotherName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Mother's Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                जन्म तारीख *
              </label>
              <input
                type="date"
                name="newOwnerDateOfBirth"
                value={formData.newOwnerDateOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                आधार नंबर *
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
                मोबाइल नंबर *
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ईमेल आयडी
              </label>
              <input
                type="email"
                name="newOwnerEmail"
                value={formData.newOwnerEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Email ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वैवाहिक स्थिती *
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">निवडा</option>
                <option value="Single">अविवाहित</option>
                <option value="Married">विवाहित</option>
                <option value="Divorced">घटस्फोटित</option>
                <option value="Widow">विधवा/विधुर</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                व्यवसाय *
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Occupation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मासिक उत्पन्न (रुपयात)
              </label>
              <input
                type="number"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Monthly Income in Rupees"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                सध्याच्या मालकाशी नाते *
              </label>
              <select
                name="relationWithCurrentOwner"
                value={formData.relationWithCurrentOwner}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">निवडा</option>
                <option value="Son">मुलगा</option>
                <option value="Daughter">मुलगी</option>
                <option value="Wife">पत्नी</option>
                <option value="Husband">पती</option>
                <option value="Brother">भाऊ</option>
                <option value="Sister">बहीण</option>
                <option value="Father">वडील</option>
                <option value="Mother">आई</option>
                <option value="Buyer">खरेदीदार</option>
                <option value="Other">इतर</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">पत्ता तपशील | Address Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                नवीन मालकाचा पूर्ण पत्ता *
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शहर *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                जिल्हा *
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="District"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                राज्य *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="State"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पिन कोड *
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                pattern="[0-9]{6}"
                placeholder="Pin Code"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मुद्रांक शुल्क भरलेले (रुपयात)
              </label>
              <input
                type="number"
                name="stampDutyPaid"
                value={formData.stampDutyPaid}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Stamp Duty Paid in Rupees"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                नोंदणी फी भरलेली (रुपयात)
              </label>
              <input
                type="number"
                name="registrationFee"
                value={formData.registrationFee}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Registration Fee Paid in Rupees"
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
                name="currentOwnerAadhar"
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
                ८-अ उतारा
              </label>
              <input
                type="file"
                name="eightA"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                विक्री खत / Sales Deed
              </label>
              <input
                type="file"
                name="salesDeed"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                भेट खत / Gift Deed
              </label>
              <input
                type="file"
                name="giftDeed"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मृत्युपत्र / Will Document
              </label>
              <input
                type="file"
                name="willDocument"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                न्यायालयाचा आदेश / Court Order
              </label>
              <input
                type="file"
                name="courtOrder"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ना हरकत प्रमाणपत्र / No Objection Certificate
              </label>
              <input
                type="file"
                name="noObjectionCertificate"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                स्टँप पेपर / Stamp Paper
              </label>
              <input
                type="file"
                name="stampPaper"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ओळखपत्र / Identity Proof
              </label>
              <input
                type="file"
                name="identityProof"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पत्त्याचा पुरावा / Address Proof
              </label>
              <input
                type="file"
                name="addressProof"
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
              जर कोणतीही माहिती चुकीची आढळली तर मी त्याची संपूर्ण जबाबदारी घेतो/घेते.
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