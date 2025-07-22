'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MarriageCertificate() {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    // Groom Details
    groomName: '',
    groomNameMarathi: '',
    groomFatherName: '',
    groomMotherName: '',
    groomDateOfBirth: '',
    groomAge: '',
    groomEducation: '',
    groomOccupation: '',
    groomAddress: '',
    groomReligion: '',
    groomCaste: '',
    groomNationality: '',
    groomAadhar: '',
    // Bride Details
    brideName: '',
    brideNameMarathi: '',
    brideFatherName: '',
    brideMotherName: '',
    brideDateOfBirth: '',
    brideAge: '',
    brideEducation: '',
    brideOccupation: '',
    brideAddress: '',
    brideReligion: '',
    brideCaste: '',
    brideNationality: '',
    brideAadhar: '',
    // Marriage Details
    marriageDate: '',
    marriagePlace: '',
    marriageType: '',
    priestName: '',
    witnessName1: '',
    witnessName2: '',
    witnessAddress1: '',
    witnessAddress2: '',
    // Contact Details
    mobileNumber: '',
    email: '',
    // Application Details
    applicationDate: new Date().toISOString().split('T')[0]
  });

  const [documents, setDocuments] = useState({
    groomAadhar: null,
    brideAadhar: null,
    groomBirthCert: null,
    brideBirthCert: null,
    marriagePhoto: null,
    witnessIds: null,
    priestCertificate: null,
    invitationCard: null
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
      
      alert(`विवाह प्रमाणपत्र आवेदन सफलतापूर्वक जमा किया गया! आपका आवेदन संख्या: MC${Date.now().toString().slice(-6)}`);
      
      // Reset form
      setFormData({
        groomName: '', groomNameMarathi: '', groomFatherName: '', groomMotherName: '',
        groomDateOfBirth: '', groomAge: '', groomEducation: '', groomOccupation: '',
        groomAddress: '', groomReligion: '', groomCaste: '', groomNationality: '', groomAadhar: '',
        brideName: '', brideNameMarathi: '', brideFatherName: '', brideMotherName: '',
        brideDateOfBirth: '', brideAge: '', brideEducation: '', brideOccupation: '',
        brideAddress: '', brideReligion: '', brideCaste: '', brideNationality: '', brideAadhar: '',
        marriageDate: '', marriagePlace: '', marriageType: '', priestName: '',
        witnessName1: '', witnessName2: '', witnessAddress1: '', witnessAddress2: '',
        mobileNumber: '', email: '', applicationDate: new Date().toISOString().split('T')[0]
      });
      
      setDocuments({
        groomAadhar: null, brideAadhar: null, groomBirthCert: null, brideBirthCert: null,
        marriagePhoto: null, witnessIds: null, priestCertificate: null, invitationCard: null
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
            आवेदन शुल्क: ₹50
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">विवाह प्रमाणपत्र आवेदन</h1>
        <p className="text-gray-600">Marriage Certificate Application</p>
      </div>

      {/* Important Instructions */}
      <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-pink-800 mb-3">महत्वपूर्ण निर्देश | Important Instructions</h2>
        <ul className="space-y-2 text-sm text-pink-700">
          <li>• विवाह के 30 दिन के भीतर पंजीकरण आवश्यक है</li>
          <li>• Marriage registration is required within 30 days of marriage</li>
          <li>• दोनों पक्षों की उपस्थिति आवश्यक है</li>
          <li>• 2 गवाहों की उपस्थिति अनिवार्य है</li>
          <li>• सभी दस्तावेज मूल के साथ फोटोकॉपी लाएं</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Groom Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">वर की जानकारी | Groom's Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वर का नाम (अंग्रेजी में) *
              </label>
              <input
                type="text"
                name="groomName"
                value={formData.groomName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Groom's Name in English"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वर का नाम (मराठी/हिंदी में) *
              </label>
              <input
                type="text"
                name="groomNameMarathi"
                value={formData.groomNameMarathi}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Groom's Name in Marathi/Hindi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वर के पिता का नाम *
              </label>
              <input
                type="text"
                name="groomFatherName"
                value={formData.groomFatherName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Groom's Father Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वर की माता का नाम *
              </label>
              <input
                type="text"
                name="groomMotherName"
                value={formData.groomMotherName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Groom's Mother Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वर की जन्म तिथि *
              </label>
              <input
                type="date"
                name="groomDateOfBirth"
                value={formData.groomDateOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वर की उम्र *
              </label>
              <input
                type="number"
                name="groomAge"
                value={formData.groomAge}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                min="21"
                placeholder="Age (minimum 21)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शिक्षा *
              </label>
              <select
                name="groomEducation"
                value={formData.groomEducation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">चुनें</option>
                <option value="Primary">प्राथमिक / Primary</option>
                <option value="Secondary">माध्यमिक / Secondary</option>
                <option value="Higher Secondary">उच्च माध्यमिक / Higher Secondary</option>
                <option value="Graduate">स्नातक / Graduate</option>
                <option value="Post Graduate">स्नातकोत्तर / Post Graduate</option>
                <option value="Diploma">डिप्लोमा / Diploma</option>
                <option value="Other">अन्य / Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                व्यवसाय *
              </label>
              <input
                type="text"
                name="groomOccupation"
                value={formData.groomOccupation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Occupation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                धर्म *
              </label>
              <select
                name="groomReligion"
                value={formData.groomReligion}
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
                जाति
              </label>
              <input
                type="text"
                name="groomCaste"
                value={formData.groomCaste}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Caste (Optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                आधार नंबर *
              </label>
              <input
                type="text"
                name="groomAadhar"
                value={formData.groomAadhar}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                pattern="[0-9]{12}"
                placeholder="12 अंकों का आधार नंबर"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वर का पूरा पता *
              </label>
              <textarea
                name="groomAddress"
                value={formData.groomAddress}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Groom's complete address..."
              />
            </div>
          </div>
        </div>

        {/* Bride Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">वधू की जानकारी | Bride's Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वधू का नाम (अंग्रेजी में) *
              </label>
              <input
                type="text"
                name="brideName"
                value={formData.brideName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Bride's Name in English"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वधू का नाम (मराठी/हिंदी में) *
              </label>
              <input
                type="text"
                name="brideNameMarathi"
                value={formData.brideNameMarathi}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Bride's Name in Marathi/Hindi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वधू के पिता का नाम *
              </label>
              <input
                type="text"
                name="brideFatherName"
                value={formData.brideFatherName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Bride's Father Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वधू की माता का नाम *
              </label>
              <input
                type="text"
                name="brideMotherName"
                value={formData.brideMotherName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Bride's Mother Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वधू की जन्म तिथि *
              </label>
              <input
                type="date"
                name="brideDateOfBirth"
                value={formData.brideDateOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वधू की उम्र *
              </label>
              <input
                type="number"
                name="brideAge"
                value={formData.brideAge}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                min="18"
                placeholder="Age (minimum 18)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शिक्षा *
              </label>
              <select
                name="brideEducation"
                value={formData.brideEducation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">चुनें</option>
                <option value="Primary">प्राथमिक / Primary</option>
                <option value="Secondary">माध्यमिक / Secondary</option>
                <option value="Higher Secondary">उच्च माध्यमिक / Higher Secondary</option>
                <option value="Graduate">स्नातक / Graduate</option>
                <option value="Post Graduate">स्नातकोत्तर / Post Graduate</option>
                <option value="Diploma">डिप्लोमा / Diploma</option>
                <option value="Other">अन्य / Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                व्यवसाय
              </label>
              <input
                type="text"
                name="brideOccupation"
                value={formData.brideOccupation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Occupation (Optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                धर्म *
              </label>
              <select
                name="brideReligion"
                value={formData.brideReligion}
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
                जाति
              </label>
              <input
                type="text"
                name="brideCaste"
                value={formData.brideCaste}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Caste (Optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                आधार नंबर *
              </label>
              <input
                type="text"
                name="brideAadhar"
                value={formData.brideAadhar}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                pattern="[0-9]{12}"
                placeholder="12 अंकों का आधार नंबर"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वधू का पूरा पता *
              </label>
              <textarea
                name="brideAddress"
                value={formData.brideAddress}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Bride's complete address..."
              />
            </div>
          </div>
        </div>

        {/* Marriage Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">विवाह विवरण | Marriage Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                विवाह की तारीख *
              </label>
              <input
                type="date"
                name="marriageDate"
                value={formData.marriageDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                विवाह का प्रकार *
              </label>
              <select
                name="marriageType"
                value={formData.marriageType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">चुनें</option>
                <option value="Hindu">हिन्दू विवाह / Hindu Marriage</option>
                <option value="Muslim">मुस्लिम विवाह / Muslim Marriage</option>
                <option value="Christian">ईसाई विवाह / Christian Marriage</option>
                <option value="Civil">सिविल विवाह / Civil Marriage</option>
                <option value="Court">कोर्ट विवाह / Court Marriage</option>
                <option value="Other">अन्य / Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                विवाह स्थान *
              </label>
              <textarea
                name="marriagePlace"
                value={formData.marriagePlace}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Complete marriage venue address..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पुजारी/धर्मगुरु का नाम
              </label>
              <input
                type="text"
                name="priestName"
                value={formData.priestName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Priest/Religious Leader Name"
              />
            </div>
          </div>
        </div>

        {/* Witnesses Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">गवाहों की जानकारी | Witnesses Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पहले गवाह का नाम *
              </label>
              <input
                type="text"
                name="witnessName1"
                value={formData.witnessName1}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="First Witness Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                दूसरे गवाह का नाम *
              </label>
              <input
                type="text"
                name="witnessName2"
                value={formData.witnessName2}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Second Witness Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पहले गवाह का पता *
              </label>
              <textarea
                name="witnessAddress1"
                value={formData.witnessAddress1}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="First Witness Address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                दूसरे गवाह का पता *
              </label>
              <textarea
                name="witnessAddress2"
                value={formData.witnessAddress2}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Second Witness Address"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">संपर्क जानकारी | Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </div>

        {/* Document Upload */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">आवश्यक दस्तावेज | Required Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वर का आधार कार्ड *
              </label>
              <input
                type="file"
                name="groomAadhar"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वधू का आधार कार्ड *
              </label>
              <input
                type="file"
                name="brideAadhar"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वर का जन्म प्रमाणपत्र *
              </label>
              <input
                type="file"
                name="groomBirthCert"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वधू का जन्म प्रमाणपत्र *
              </label>
              <input
                type="file"
                name="brideBirthCert"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                विवाह की फोटो *
              </label>
              <input
                type="file"
                name="marriagePhoto"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                गवाहों के आईडी प्रमाण *
              </label>
              <input
                type="file"
                name="witnessIds"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पुजारी/धर्मगुरु प्रमाणपत्र
              </label>
              <input
                type="file"
                name="priestCertificate"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                विवाह कार्ड/निमंत्रण
              </label>
              <input
                type="file"
                name="invitationCard"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 2MB each)</p>
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
              मैं/हम घोषणा करते हैं कि उपरोक्त सभी जानकारी सत्य है और विवाह सभी कानूनी नियमों के अनुसार संपन्न हुआ है। 
              यदि कोई जानकारी गलत पाई जाती है तो मैं/हम इसकी जिम्मेदारी लेते हैं।
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