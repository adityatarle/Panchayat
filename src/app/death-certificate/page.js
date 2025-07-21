'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DeathCertificate() {
  const [formData, setFormData] = useState({
    deceasedName: '',
    deceasedNameMarathi: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    dateOfDeath: '',
    timeOfDeath: '',
    placeOfDeath: '',
    age: '',
    sex: '',
    causeOfDeath: '',
    hospitalName: '',
    doctorName: '',
    informantName: '',
    informantRelation: '',
    informantAddress: '',
    informantContact: '',
    permanentAddress: '',
    registrationDate: '',
    caste: '',
    religion: '',
    nationality: 'Indian',
    occupation: '',
    maritalStatus: ''
  });

  const [documents, setDocuments] = useState({
    deathCertificate: null,
    hospitalRecord: null,
    aadharCard: null,
    informantId: null,
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
      // Create a death certificate model for backend
      const submitData = {
        ...formData,
        documents: documents,
        submissionDate: new Date(),
        status: 'submitted'
      };
      
      // For now, we'll use a simple alert since death certificate API needs to be created
      alert(`मृत्यु प्रमाणपत्र आवेदन सफलतापूर्वक जमा किया गया! आपका आवेदन संख्या: DC${Date.now().toString().slice(-6)}`);
      
      // Reset form
      setFormData({
        deceasedName: '',
        deceasedNameMarathi: '',
        fatherName: '',
        motherName: '',
        spouseName: '',
        dateOfDeath: '',
        timeOfDeath: '',
        placeOfDeath: '',
        age: '',
        sex: '',
        causeOfDeath: '',
        hospitalName: '',
        doctorName: '',
        informantName: '',
        informantRelation: '',
        informantAddress: '',
        informantContact: '',
        permanentAddress: '',
        registrationDate: '',
        caste: '',
        religion: '',
        nationality: 'Indian',
        occupation: '',
        maritalStatus: ''
      });
      
      setDocuments({
        deathCertificate: null,
        hospitalRecord: null,
        aadharCard: null,
        informantId: null,
        addressProof: null
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">मृत्यु प्रमाणपत्र आवेदन</h1>
        <p className="text-gray-600">Death Certificate Application</p>
      </div>

      {/* Important Instructions */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-red-800 mb-3">महत्वपूर्ण निर्देश | Important Instructions</h2>
        <ul className="space-y-2 text-sm text-red-700">
          <li>• मृत्यु की तारीख से 21 दिन के भीतर पंजीकरण आवश्यक है</li>
          <li>• Death registration must be done within 21 days of death</li>
          <li>• सभी दस्तावेज स्पष्ट और पढ़ने योग्य होने चाहिए</li>
          <li>• डॉक्टर या अस्पताल का प्रमाणपत्र आवश्यक है</li>
          <li>• सामान्यतः 7-10 कार्य दिवसों में प्रमाणपत्र तैयार हो जाता है</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Deceased Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">मृतक की जानकारी | Deceased Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मृतक का नाम (अंग्रेजी में) *
              </label>
              <input
                type="text"
                name="deceasedName"
                value={formData.deceasedName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Deceased's Name in English"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मृतक का नाम (मराठी/हिंदी में)
              </label>
              <input
                type="text"
                name="deceasedNameMarathi"
                value={formData.deceasedNameMarathi}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Deceased's Name in Marathi/Hindi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मृत्यु तिथि *
              </label>
              <input
                type="date"
                name="dateOfDeath"
                value={formData.dateOfDeath}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मृत्यु समय
              </label>
              <input
                type="time"
                name="timeOfDeath"
                value={formData.timeOfDeath}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                आयु (वर्ष में) *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                min="0"
                placeholder="Age in years"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              मृत्यु का स्थान *
            </label>
            <textarea
              name="placeOfDeath"
              value={formData.placeOfDeath}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
              placeholder="अस्पताल/घर का पूरा पता लिखें"
            />
          </div>
        </div>

        {/* Family Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">पारिवारिक जानकारी | Family Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                पति/पत्नी का नाम
              </label>
              <input
                type="text"
                name="spouseName"
                value={formData.spouseName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Spouse's Name (if married)"
              />
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
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">अतिरिक्त जानकारी | Additional Information</h2>
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
                <option value="General">सामान्य / General</option>
                <option value="OBC">अन्य पिछड़ा वर्ग / OBC</option>
                <option value="SC">अनुसूचित जाति / SC</option>
                <option value="ST">अनुसूचित जनजाति / ST</option>
                <option value="NT">घुमंतू जनजाति / NT</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                धर्म *
              </label>
              <input
                type="text"
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Religion"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मृत्यु का कारण *
              </label>
              <input
                type="text"
                name="causeOfDeath"
                value={formData.causeOfDeath}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Cause of Death"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                अस्पताल/नर्सिंग होम का नाम
              </label>
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Hospital/Nursing Home Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                डॉक्टर का नाम
              </label>
              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Attending Doctor's Name"
              />
            </div>
          </div>
          <div className="mt-6">
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
              placeholder="मृतक का स्थायी पता"
            />
          </div>
        </div>

        {/* Informant Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">सूचना देने वाले की जानकारी | Informant Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                सूचना देने वाले का नाम *
              </label>
              <input
                type="text"
                name="informantName"
                value={formData.informantName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Informant's Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मृतक से संबंध *
              </label>
              <select
                name="informantRelation"
                value={formData.informantRelation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">चुनें</option>
                <option value="Son">पुत्र / Son</option>
                <option value="Daughter">पुत्री / Daughter</option>
                <option value="Spouse">पति/पत्नी / Spouse</option>
                <option value="Father">पिता / Father</option>
                <option value="Mother">माता / Mother</option>
                <option value="Brother">भाई / Brother</option>
                <option value="Sister">बहन / Sister</option>
                <option value="Other">अन्य / Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                संपर्क नंबर *
              </label>
              <input
                type="tel"
                name="informantContact"
                value={formData.informantContact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                pattern="[0-9]{10}"
                placeholder="10 अंकों का मोबाइल नंबर"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              सूचना देने वाले का पता *
            </label>
            <textarea
              name="informantAddress"
              value={formData.informantAddress}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
              placeholder="सूचना देने वाले का पूरा पता"
            />
          </div>
        </div>

        {/* Document Upload */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">आवश्यक दस्तावेज | Required Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                डॉक्टर/अस्पताल मृत्यु प्रमाणपत्र *
              </label>
              <input
                type="file"
                name="deathCertificate"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 2MB)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                अस्पताल रिकॉर्ड
              </label>
              <input
                type="file"
                name="hospitalRecord"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मृतक का आधार कार्ड
              </label>
              <input
                type="file"
                name="aadharCard"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                सूचना देने वाले का पहचान प्रमाण *
              </label>
              <input
                type="file"
                name="informantId"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
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
              मैं घोषणा करता/करती हूं कि उपरोक्त सभी जानकारी सत्य है और मैं इसकी जिम्मेदारी लेता/लेती हूं।
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