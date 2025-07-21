'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CasteCertificate() {
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantNameMarathi: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    currentAddress: '',
    permanentAddress: '',
    caste: '',
    subCaste: '',
    religion: '',
    mobileNumber: '',
    email: '',
    aadharNumber: '',
    rationCardNumber: '',
    voterIdNumber: '',
    occupation: '',
    monthlyIncome: '',
    purpose: '',
    purposeDetails: '',
    maritalStatus: '',
    sex: ''
  });

  const [documents, setDocuments] = useState({
    aadharCard: null,
    fatherCasteCert: null,
    motherCasteCert: null,
    schoolLeavingCert: null,
    rationCard: null,
    voterIdCard: null,
    affidavit: null,
    incomeCert: null
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
      
      alert(`जाति प्रमाणपत्र आवेदन सफलतापूर्वक जमा किया गया! आपका आवेदन संख्या: CC${Date.now().toString().slice(-6)}`);
      
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
        caste: '',
        subCaste: '',
        religion: '',
        mobileNumber: '',
        email: '',
        aadharNumber: '',
        rationCardNumber: '',
        voterIdNumber: '',
        occupation: '',
        monthlyIncome: '',
        purpose: '',
        purposeDetails: '',
        maritalStatus: '',
        sex: ''
      });
      
      setDocuments({
        aadharCard: null,
        fatherCasteCert: null,
        motherCasteCert: null,
        schoolLeavingCert: null,
        rationCard: null,
        voterIdCard: null,
        affidavit: null,
        incomeCert: null
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
            आवेदन शुल्क: ₹30
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">जाति प्रमाणपत्र आवेदन</h1>
        <p className="text-gray-600">Caste Certificate Application</p>
      </div>

      {/* Important Instructions */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-purple-800 mb-3">महत्वपूर्ण निर्देश | Important Instructions</h2>
        <ul className="space-y-2 text-sm text-purple-700">
          <li>• जाति प्रमाणपत्र केवल SC/ST/OBC/NT श्रेणी के लिए जारी किया जाता है</li>
          <li>• Caste certificate is issued only for SC/ST/OBC/NT categories</li>
          <li>• माता-पिता में से किसी एक का जाति प्रमाणपत्र आवश्यक है</li>
          <li>• सभी दस्तावेज स्पष्ट और पढ़ने योग्य होने चाहिए</li>
          <li>• प्रमाणपत्र जारी करने में 15-21 कार्य दिवस लग सकते हैं</li>
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
                लिंग *
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">चुनें</option>
                <option value="Male">पुरुष / Male</option>
                <option value="Female">महिला / Female</option>
                <option value="Transgender">तृतीय लिंग / Transgender</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वैवाहिक स्थिति *
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">चुनें</option>
                <option value="Single">अविवाहित / Single</option>
                <option value="Married">विवाहित / Married</option>
                <option value="Divorced">तलाकशुदा / Divorced</option>
                <option value="Widow">विधवा / Widow</option>
              </select>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                व्यवसाय
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Occupation"
              />
            </div>
          </div>
        </div>

        {/* Caste Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">जाति जानकारी | Caste Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                जाति *
              </label>
              <select
                name="caste"
                value={formData.caste}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">चुनें</option>
                <option value="SC">अनुसूचित जाति / Scheduled Caste (SC)</option>
                <option value="ST">अनुसूचित जनजाति / Scheduled Tribe (ST)</option>
                <option value="OBC">अन्य पिछड़ा वर्ग / Other Backward Class (OBC)</option>
                <option value="NT">घुमंतू जनजाति / Nomadic Tribe (NT)</option>
                <option value="SBC">विशेष पिछड़ा वर्ग / Special Backward Class (SBC)</option>
                <option value="DT">विमुक्त जाति / Denotified Tribe (DT)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                उप-जाति *
              </label>
              <input
                type="text"
                name="subCaste"
                value={formData.subCaste}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Sub-Caste Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                धर्म *
              </label>
              <select
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">चुनें</option>
                <option value="Hindu">हिन्दू / Hindu</option>
                <option value="Muslim">मुस्लिम / Muslim</option>
                <option value="Christian">ईसाई / Christian</option>
                <option value="Sikh">सिख / Sikh</option>
                <option value="Buddhist">बौद्ध / Buddhist</option>
                <option value="Jain">जैन / Jain</option>
                <option value="Other">अन्य / Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मासिक आय (रुपए में)
              </label>
              <input
                type="number"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                min="0"
                placeholder="Monthly Income in Rupees"
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
                <option value="Scholarship">छात्रवृत्ति / Scholarship</option>
                <option value="Government Job">सरकारी नौकरी / Government Job</option>
                <option value="Reservation">आरक्षण / Reservation</option>
                <option value="Admission">प्रवेश / Admission</option>
                <option value="Bank Loan">बैंक लोन / Bank Loan</option>
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

        {/* Additional Document Numbers */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">अतिरिक्त दस्तावेज नंबर | Additional Document Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                राशन कार्ड नंबर
              </label>
              <input
                type="text"
                name="rationCardNumber"
                value={formData.rationCardNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Ration Card Number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वोटर आईडी नंबर
              </label>
              <input
                type="text"
                name="voterIdNumber"
                value={formData.voterIdNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Voter ID Number"
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
                पिता का जाति प्रमाणपत्र *
              </label>
              <input
                type="file"
                name="fatherCasteCert"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                माता का जाति प्रमाणपत्र
              </label>
              <input
                type="file"
                name="motherCasteCert"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                स्कूल छोड़ने का प्रमाणपत्र
              </label>
              <input
                type="file"
                name="schoolLeavingCert"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                राशन कार्ड
              </label>
              <input
                type="file"
                name="rationCard"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वोटर आईडी कार्ड
              </label>
              <input
                type="file"
                name="voterIdCard"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शपथ पत्र (नोटेराइज़ड)
              </label>
              <input
                type="file"
                name="affidavit"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                आय प्रमाणपत्र (यदि उपलब्ध हो)
              </label>
              <input
                type="file"
                name="incomeCert"
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
              मैं घोषणा करता/करती हूं कि उपरोक्त सभी जानकारी सत्य है और मैं इस जाति का हूं। 
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