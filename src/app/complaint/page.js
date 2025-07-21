'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Complaint() {
  const [complaintData, setComplaintData] = useState({
    complainantName: '',
    fatherName: '',
    mobileNumber: '',
    email: '',
    aadharNumber: '',
    address: '',
    complaintType: '',
    department: '',
    subject: '',
    description: '',
    urgency: '',
    applicationId: '',
    previousComplaintId: ''
  });

  const [documents, setDocuments] = useState({
    supportingDoc1: null,
    supportingDoc2: null,
    identityProof: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaintData(prev => ({
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
      const complaintId = `CMP${Date.now().toString().slice(-6)}`;
      
      alert(`शिकायत सफलतापूर्वक दर्ज की गई! आपकी शिकायत संख्या: ${complaintId}\n\nआपको 48 घंटे के भीतर प्रतिक्रिया मिलेगी।`);
      
      // Reset form
      setComplaintData({
        complainantName: '',
        fatherName: '',
        mobileNumber: '',
        email: '',
        aadharNumber: '',
        address: '',
        complaintType: '',
        department: '',
        subject: '',
        description: '',
        urgency: '',
        applicationId: '',
        previousComplaintId: ''
      });
      
      setDocuments({
        supportingDoc1: null,
        supportingDoc2: null,
        identityProof: null
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert('शिकायत दर्ज करने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
        <Link href="/" className="text-primary-600 hover:text-primary-700 flex items-center mb-4">
          ← वापस होम पर जाएं
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">शिकायत दर्ज करें</h1>
        <p className="text-gray-600">File a Complaint - Maharashtra Gram Panchayat</p>
      </div>

      {/* Important Information */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-orange-800 mb-3">शिकायत दिशा-निर्देश | Complaint Guidelines</h2>
        <ul className="space-y-2 text-sm text-orange-700">
          <li>• सभी शिकायतों का जवाब 48 घंटे के भीतर दिया जाएगा</li>
          <li>• All complaints will be responded to within 48 hours</li>
          <li>• झूठी या गलत शिकायत दर्ज करना कानूनी अपराध है</li>
          <li>• कृपया सभी आवश्यक जानकारी सही-सही भरें</li>
          <li>• शिकायत की स्थिति आप अपने शिकायत नंबर से देख सकते हैं</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Complainant Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">शिकायतकर्ता की जानकारी | Complainant Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शिकायतकर्ता का नाम *
              </label>
              <input
                type="text"
                name="complainantName"
                value={complaintData.complainantName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Complainant's Full Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पिता का नाम *
              </label>
              <input
                type="text"
                name="fatherName"
                value={complaintData.fatherName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Father's Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मोबाइल नंबर *
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={complaintData.mobileNumber}
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
                value={complaintData.email}
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
                value={complaintData.aadharNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                pattern="[0-9]{12}"
                placeholder="12 अंकों का आधार नंबर"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              पूरा पता *
            </label>
            <textarea
              name="address"
              value={complaintData.address}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
              placeholder="पूरा पता लिखें..."
            />
          </div>
        </div>

        {/* Complaint Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">शिकायत का विवरण | Complaint Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शिकायत का प्रकार *
              </label>
              <select
                name="complaintType"
                value={complaintData.complaintType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">चुनें</option>
                <option value="Service Related">सेवा संबंधी / Service Related</option>
                <option value="Application Delay">आवेदन में देरी / Application Delay</option>
                <option value="Wrong Information">गलत जानकारी / Wrong Information</option>
                <option value="Staff Behavior">कर्मचारी व्यवहार / Staff Behavior</option>
                <option value="Corruption">भ्रष्टाचार / Corruption</option>
                <option value="Infrastructure">बुनियादी ढांचा / Infrastructure</option>
                <option value="Water Supply">पानी की आपूर्ति / Water Supply</option>
                <option value="Waste Management">कचरा प्रबंधन / Waste Management</option>
                <option value="Street Lights">सड़क की रोशनी / Street Lights</option>
                <option value="Other">अन्य / Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                संबंधित विभाग *
              </label>
              <select
                name="department"
                value={complaintData.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">चुनें</option>
                <option value="Certificate Services">प्रमाणपत्र सेवा / Certificate Services</option>
                <option value="Water Tax Department">जल कर विभाग / Water Tax Department</option>
                <option value="House Tax Department">गृह कर विभाग / House Tax Department</option>
                <option value="Public Works">लोक निर्माण / Public Works</option>
                <option value="Health Department">स्वास्थ्य विभाग / Health Department</option>
                <option value="Education">शिक्षा / Education</option>
                <option value="General Administration">सामान्य प्रशासन / General Administration</option>
                <option value="Other">अन्य / Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                प्राथमिकता स्तर *
              </label>
              <select
                name="urgency"
                value={complaintData.urgency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">चुनें</option>
                <option value="Low">कम / Low</option>
                <option value="Medium">मध्यम / Medium</option>
                <option value="High">उच्च / High</option>
                <option value="Urgent">तत्काल / Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                संबंधित आवेदन संख्या (यदि कोई हो)
              </label>
              <input
                type="text"
                name="applicationId"
                value={complaintData.applicationId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="BC123456, RC789012, WC001234 etc."
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              शिकायत का विषय *
            </label>
            <input
              type="text"
              name="subject"
              value={complaintData.subject}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
              placeholder="शिकायत का संक्षिप्त विषय लिखें..."
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              शिकायत का विस्तृत विवरण *
            </label>
            <textarea
              name="description"
              value={complaintData.description}
              onChange={handleInputChange}
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
              placeholder="कृपया अपनी शिकायत का विस्तृत विवरण दें। घटना की तारीख, स्थान, संबंधित व्यक्ति का नाम (यदि कोई हो) आदि की जानकारी दें।"
            />
            <p className="text-xs text-gray-500 mt-1">कम से कम 50 अक्षर लिखें</p>
          </div>
        </div>

        {/* Supporting Documents */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">सहायक दस्तावेज | Supporting Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पहचान प्रमाण (आधार कार्ड)
              </label>
              <input
                type="file"
                name="identityProof"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 2MB)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                सहायक दस्तावेज 1
              </label>
              <input
                type="file"
                name="supportingDoc1"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-xs text-gray-500 mt-1">Related application, receipt, photo etc.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                सहायक दस्तावेज 2
              </label>
              <input
                type="file"
                name="supportingDoc2"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-xs text-gray-500 mt-1">Additional supporting evidence</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">शिकायत सहायता संपर्क | Complaint Support Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">ग्राम पंचायत कार्यालय</h4>
              <p className="text-sm text-gray-600">फोन: 1800-XXX-XXXX</p>
              <p className="text-sm text-gray-600">ईमेल: complaints@grampanchayat.gov.in</p>
              <p className="text-sm text-gray-600">समय: सोमवार - शुक्रवार, 10:00 AM - 5:00 PM</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">तत्काल सहायता</h4>
              <p className="text-sm text-gray-600">व्हाट्सऐप: +91-XXXXX-XXXXX</p>
              <p className="text-sm text-gray-600">टोल फ्री: 1800-XXX-XXXX</p>
              <p className="text-sm text-gray-600">आपातकाल: 24 घंटे उपलब्ध</p>
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
              मैं घोषणा करता/करती हूं कि उपरोक्त सभी जानकारी सत्य है और मैं इसकी जिम्मेदारी लेता/लेती हूं। 
              मैं समझता/समझती हूं कि झूठी शिकायत दर्ज करना कानूनी अपराध है।
            </label>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              शिकायत दर्ज करें (Submit Complaint)
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