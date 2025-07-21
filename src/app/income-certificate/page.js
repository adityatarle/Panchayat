'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IncomeCertificate() {
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantNameMarathi: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    age: '',
    sex: '',
    occupation: '',
    employerName: '',
    employerAddress: '',
    monthlyIncome: '',
    annualIncome: '',
    incomeSource: '',
    currentAddress: '',
    permanentAddress: '',
    mobileNumber: '',
    email: '',
    aadharNumber: '',
    panNumber: '',
    rationCardNumber: '',
    caste: '',
    maritalStatus: '',
    purpose: '',
    purposeDetails: '',
    landDetails: '',
    businessDetails: ''
  });

  const [documents, setDocuments] = useState({
    aadharCard: null,
    panCard: null,
    salarySlips: null,
    bankStatements: null,
    employmentCert: null,
    incomeProof: null,
    rationCard: null,
    landRecords: null
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
      
      alert(`आय प्रमाणपत्र आवेदन सफलतापूर्वक जमा किया गया! आपका आवेदन संख्या: IC${Date.now().toString().slice(-6)}`);
      
      // Reset form
      setFormData({
        applicantName: '',
        applicantNameMarathi: '',
        fatherName: '',
        motherName: '',
        dateOfBirth: '',
        age: '',
        sex: '',
        occupation: '',
        employerName: '',
        employerAddress: '',
        monthlyIncome: '',
        annualIncome: '',
        incomeSource: '',
        currentAddress: '',
        permanentAddress: '',
        mobileNumber: '',
        email: '',
        aadharNumber: '',
        panNumber: '',
        rationCardNumber: '',
        caste: '',
        maritalStatus: '',
        purpose: '',
        purposeDetails: '',
        landDetails: '',
        businessDetails: ''
      });
      
      setDocuments({
        aadharCard: null,
        panCard: null,
        salarySlips: null,
        bankStatements: null,
        employmentCert: null,
        incomeProof: null,
        rationCard: null,
        landRecords: null
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">आय प्रमाणपत्र आवेदन</h1>
        <p className="text-gray-600">Income Certificate Application</p>
      </div>

      {/* Important Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-blue-800 mb-3">महत्वपूर्ण निर्देश | Important Instructions</h2>
        <ul className="space-y-2 text-sm text-blue-700">
          <li>• आय का सत्यापन किया जाएगा, गलत जानकारी देने पर कानूनी कार्रवाई हो सकती है</li>
          <li>• Income verification will be done, legal action may be taken for false information</li>
          <li>• पिछले 6 महीने की सैलरी स्लिप या आय प्रमाण आवश्यक है</li>
          <li>• सभी दस्तावेज स्पष्ट और पढ़ने योग्य होने चाहिए</li>
          <li>• प्रमाणपत्र जारी करने में 10-15 कार्य दिवस लग सकते हैं</li>
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
                आयु *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                min="18"
                placeholder="Age in years"
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
                <option value="General">सामान्य / General</option>
                <option value="OBC">अन्य पिछड़ा वर्ग / OBC</option>
                <option value="SC">अनुसूचित जाति / SC</option>
                <option value="ST">अनुसूचित जनजाति / ST</option>
                <option value="NT">घुमंतू जनजाति / NT</option>
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
                पैन नंबर
              </label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="PAN Number"
              />
            </div>
          </div>
        </div>

        {/* Income Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">आय की जानकारी | Income Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                व्यवसाय/नौकरी *
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Occupation/Job"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                आय का स्रोत *
              </label>
              <select
                name="incomeSource"
                value={formData.incomeSource}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">चुनें</option>
                <option value="Salary">वेतन / Salary</option>
                <option value="Business">व्यवसाय / Business</option>
                <option value="Agriculture">कृषि / Agriculture</option>
                <option value="Pension">पेंशन / Pension</option>
                <option value="Daily Wages">दैनिक मजदूरी / Daily Wages</option>
                <option value="Other">अन्य / Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मासिक आय (रुपए में) *
              </label>
              <input
                type="number"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                min="0"
                placeholder="Monthly Income in Rupees"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वार्षिक आय (रुपए में) *
              </label>
              <input
                type="number"
                name="annualIncome"
                value={formData.annualIncome}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                min="0"
                placeholder="Annual Income in Rupees"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                नियोक्ता का नाम (यदि नौकरी में हैं)
              </label>
              <input
                type="text"
                name="employerName"
                value={formData.employerName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Employer Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                नियोक्ता का पता
              </label>
              <input
                type="text"
                name="employerAddress"
                value={formData.employerAddress}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Employer Address"
              />
            </div>
          </div>
          
          {/* Conditional fields for specific income sources */}
          {formData.incomeSource === 'Agriculture' && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                भूमि का विवरण (एकड़ में)
              </label>
              <textarea
                name="landDetails"
                value={formData.landDetails}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="भूमि का विवरण - खेत का क्षेत्रफल, फसल का प्रकार आदि"
              />
            </div>
          )}
          
          {formData.incomeSource === 'Business' && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                व्यवसाय का विवरण
              </label>
              <textarea
                name="businessDetails"
                value={formData.businessDetails}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="व्यवसाय का प्रकार, दुकान का पता, व्यापार लाइसेंस आदि"
              />
            </div>
          )}
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
                <option value="Government Scheme">सरकारी योजना / Government Scheme</option>
                <option value="Bank Loan">बैंक लोन / Bank Loan</option>
                <option value="EWS Certificate">EWS प्रमाणपत्र / EWS Certificate</option>
                <option value="Court Case">न्यायालय में / Court Case</option>
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
                पैन कार्ड (यदि उपलब्ध हो)
              </label>
              <input
                type="file"
                name="panCard"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                सैलरी स्लिप/आय प्रमाण *
              </label>
              <input
                type="file"
                name="salarySlips"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                बैंक स्टेटमेंट (6 महीने का) *
              </label>
              <input
                type="file"
                name="bankStatements"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                नियोजन प्रमाणपत्र (यदि नौकरी में हैं)
              </label>
              <input
                type="file"
                name="employmentCert"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                अन्य आय प्रमाण दस्तावेज
              </label>
              <input
                type="file"
                name="incomeProof"
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
              मैं घोषणा करता/करती हूं कि उपरोक्त सभी जानकारी सत्य है और आय की जानकारी सही है। 
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