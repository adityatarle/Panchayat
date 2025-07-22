'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NonAvailabilityCertificate() {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantNameMarathi: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    currentAddress: '',
    permanentAddress: '',
    mobileNumber: '',
    email: '',
    aadharNumber: '',
    purpose: '',
    purposeDetails: '',
    certificateType: '',
    searchedOffices: '',
    declarationDate: ''
  });

  const [documents, setDocuments] = useState({
    aadharCard: null,
    addressProof: null,
    searchCertificate: null,
    affidavit: null,
    birthProof: null
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
        submissionDate: new Date(),
        status: 'submitted'
      };
      
      alert(`अनुपलब्धता प्रमाणपत्र आवेदन सफलतापूर्वक जमा किया गया! आपका आवेदन संख्या: NA${Date.now().toString().slice(-6)}`);
      
      // Reset form
      setFormData({
        applicantName: '',
        applicantNameMarathi: '',
        fatherName: '',
        motherName: '',
        dateOfBirth: '',
        placeOfBirth: '',
        currentAddress: '',
        permanentAddress: '',
        mobileNumber: '',
        email: '',
        aadharNumber: '',
        purpose: '',
        purposeDetails: '',
        certificateType: '',
        searchedOffices: '',
        declarationDate: ''
      });
      
      setDocuments({
        aadharCard: null,
        addressProof: null,
        searchCertificate: null,
        affidavit: null,
        birthProof: null
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert('आवेदन जमा करने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="text-primary-600 hover:text-primary-700 flex items-center">
            ← वापस होम पर जाएं
          </Link>
          <div className="text-sm text-gray-500">
            आवेदन शुल्क: ₹25
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">अनुपलब्धता प्रमाणपत्र आवेदन</h1>
        <p className="text-gray-600">Non-Availability Certificate Application</p>
      </div>

      {/* Important Instructions */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-red-800 mb-3">महत्वपूर्ण निर्देश | Important Instructions</h2>
        <ul className="space-y-2 text-sm text-red-700">
          <li>• यह प्रमाणपत्र तब जारी किया जाता है जब मूल दस्तावेज उपलब्ध नहीं है</li>
          <li>• This certificate is issued when original documents are not available</li>
          <li>• आपको संबंधित कार्यालयों में खोज करानी होगी</li>
          <li>• शपथ पत्र (एफिडेविट) आवश्यक है</li>
          <li>• सभी दस्तावेज स्पष्ट और पढ़ने योग्य होने चाहिए</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">व्यक्तिगत जानकारी | Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                आवेदक का नाम (अंग्रेजी में) *
              </label>
              <input
                type="text"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Applicant's Name in English"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                आवेदक का नाम (मराठी/हिंदी में)
              </label>
              <input
                type="text"
                name="applicantNameMarathi"
                value={formData.applicantNameMarathi}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Applicant's Name in Marathi/Hindi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पिता का नाम *
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
                माता का नाम *
              </label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Mother's Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                जन्म तिथि *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                जन्म स्थान *
              </label>
              <input
                type="text"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Place of Birth"
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
                placeholder="10 अंकों का मोबाइल नंबर"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ईमेल आईडी
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="example@email.com"
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
                placeholder="12 अंकों का आधार नंबर"
              />
            </div>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">प्रमाणपत्र विवरण | Certificate Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                कौन सा प्रमाणपत्र अनुपलब्ध है? *
              </label>
              <select
                name="certificateType"
                value={formData.certificateType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">चुनें</option>
                <option value="Birth Certificate">जन्म प्रमाणपत्र / Birth Certificate</option>
                <option value="Death Certificate">मृत्यु प्रमाणपत्र / Death Certificate</option>
                <option value="Marriage Certificate">विवाह प्रमाणपत्र / Marriage Certificate</option>
                <option value="Educational Certificate">शैक्षणिक प्रमाणपत्र / Educational Certificate</option>
                <option value="Caste Certificate">जाति प्रमाणपत्र / Caste Certificate</option>
                <option value="Income Certificate">आय प्रमाणपत्र / Income Certificate</option>
                <option value="Other">अन्य / Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                अनुपलब्धता की तारीख
              </label>
              <input
                type="date"
                name="declarationDate"
                value={formData.declarationDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                किन कार्यालयों में खोज की गई? *
              </label>
              <textarea
                name="searchedOffices"
                value={formData.searchedOffices}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="उदाहरण: ग्राम पंचायत कार्यालय, तहसील कार्यालय, जिला कलेक्टोरेट..."
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">पता जानकारी | Address Information</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वर्तमान पता *
              </label>
              <textarea
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="पूरा वर्तमान पता लिखें..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                स्थायी पता *
              </label>
              <textarea
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="स्थायी पता लिखें..."
              />
            </div>
          </div>
        </div>

        {/* Purpose Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">प्रमाणपत्र का उद्देश्य | Purpose of Certificate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                प्रमाणपत्र का उद्देश्य *
              </label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">चुनें</option>
                <option value="Education">शिक्षा / Education</option>
                <option value="Passport">पासपोर्ट / Passport</option>
                <option value="Government Job">सरकारी नौकरी / Government Job</option>
                <option value="Bank Account">बैंक खाता / Bank Account</option>
                <option value="Insurance">बीमा / Insurance</option>
                <option value="Legal Purpose">कानूनी उद्देश्य / Legal Purpose</option>
                <option value="Other">अन्य / Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                उद्देश्य का विस्तृत विवरण
              </label>
              <textarea
                name="purposeDetails"
                value={formData.purposeDetails}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="प्रमाणपत्र की आवश्यकता का विस्तृत विवरण..."
              />
            </div>
          </div>
        </div>

        {/* Document Upload */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">आवश्यक दस्तावेज | Required Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                आधार कार्ड *
              </label>
              <input
                type="file"
                name="aadharCard"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 2MB)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पता प्रमाण *
              </label>
              <input
                type="file"
                name="addressProof"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                खोज प्रमाणपत्र (कार्यालयों से)
              </label>
              <input
                type="file"
                name="searchCertificate"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शपथ पत्र (नोटेराइज़ड) *
              </label>
              <input
                type="file"
                name="affidavit"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                जन्म का प्रमाण (स्कूल रिकॉर्ड आदि)
              </label>
              <input
                type="file"
                name="birthProof"
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
              मैं घोषणा करता/करती हूं कि उपरोक्त सभी जानकारी सत्य है और मैंने संबंधित कार्यालयों में दस्तावेज खोजने का प्रयास किया है लेकिन वह उपलब्ध नहीं है। 
              यदि कोई जानकारी गलत पाई जाती है तो मैं इसकी जिम्मेदारी लेता/लेती हूं।
            </label>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              आवेदन जमा करें (Submit Application)
            </button>
            <Link href="/" className="btn-secondary text-center flex-1">
              रद्द करें (Cancel)
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}