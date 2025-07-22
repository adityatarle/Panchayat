'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MalmattaMahitiDetail() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    // Property Details
    propertyNumber: '',
    surveyNumber: '',
    subdividedNumber: '',
    plotNumber: '',
    
    // Property Location
    village: '',
    taluka: '',
    district: 'Maharashtra',
    state: 'Maharashtra',
    pincode: '',
    
    // Owner Details
    ownerName: '',
    ownerNameMarathi: '',
    fatherName: '',
    motherName: '',
    aadharNumber: '',
    mobileNumber: '',
    email: '',
    
    // Property Information
    propertyType: '',
    propertyUsage: '',
    totalArea: '',
    builtUpArea: '',
    yearOfConstruction: '',
    
    // Revenue Details
    classOfLand: '',
    typeOfTenure: '',
    revenueRecordNumber: '',
    
    // Purpose and Documents
    purpose: ''
  });

  const [documents, setDocuments] = useState({
    aadharCard: null,
    propertyCard: null,
    sevenTwelve: null,
    eightA: null,
    salesDeed: null,
    occupancyCertificate: null,
    taxReceipt: null
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
      hi: 'मालमत्तेची माहिती',
      mr: 'मालमत्तेची माहिती',
      en: 'Property Information'
    },
    subtitle: {
      hi: 'संपत्ति की विस्तृत जानकारी प्राप्त करें',
      mr: 'मालमत्तेची तपशीलवार माहिती मिळवा',
      en: 'Get detailed property information'
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
            आवेदन शुल्क: ₹50
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t(pageTexts.title)}</h1>
        <p className="text-gray-600">{t(pageTexts.subtitle)}</p>
      </div>

      {/* Important Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-yellow-800 mb-3">महत्वपूर्ण निर्देश | Important Instructions</h2>
        <ul className="space-y-2 text-sm text-yellow-700">
          <li>• मालमत्तेचा सर्व्हे नंबर किंवा प्लॉट नंबर अचूक असावा</li>
          <li>• Property survey number or plot number should be accurate</li>
          <li>• सर्व कागदपत्रे स्पष्ट आणि वाचण्यायोग्य असावीत</li>
          <li>• मालमत्ता सत्यापनासाठी स्थानिक तपासणी केली जाईल</li>
          <li>• माहिती मिळण्यासाठी 3-7 कार्य दिवस लागू शकतात</li>
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
                उपविभाग नंबर
              </label>
              <input
                type="text"
                name="subdividedNumber"
                value={formData.subdividedNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Subdivided Number"
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

        {/* Location Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">स्थान तपशील | Location Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                तालुका *
              </label>
              <input
                type="text"
                name="taluka"
                value={formData.taluka}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Taluka Name"
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
                placeholder="District Name"
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

        {/* Owner Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">मालक तपशील | Owner Details</h2>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ईमेल आयडी
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Email ID"
              />
            </div>
          </div>
        </div>

        {/* Property Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">मालमत्ता माहिती | Property Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <option value="Residential">निवासी / Residential</option>
                <option value="Commercial">व्यावसायिक / Commercial</option>
                <option value="Agricultural">कृषी / Agricultural</option>
                <option value="Industrial">औद्योगिक / Industrial</option>
                <option value="Plot">प्लॉट / Plot</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मालमत्तेचा वापर
              </label>
              <select
                name="propertyUsage"
                value={formData.propertyUsage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">निवडा</option>
                <option value="Self Occupied">स्वतःच्या वापरासाठी</option>
                <option value="Rented">भाड्याने दिले</option>
                <option value="Vacant">रिकामे</option>
                <option value="Under Construction">बांधकाम चालू</option>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                बांधकाम क्षेत्रफळ (चौ.फूट)
              </label>
              <input
                type="number"
                name="builtUpArea"
                value={formData.builtUpArea}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Built-up Area in Sq.Ft"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                बांधकामाचे वर्ष
              </label>
              <input
                type="number"
                name="yearOfConstruction"
                value={formData.yearOfConstruction}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Year of Construction"
                min="1900"
                max="2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                माहितीचा हेतू *
              </label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">निवडा</option>
                <option value="Bank Loan">बँक कर्जासाठी</option>
                <option value="Legal Matters">कायदेशीर कामासाठी</option>
                <option value="Sale/Purchase">विक्री/खरेदीसाठी</option>
                <option value="Tax Assessment">कर निर्धारणासाठी</option>
                <option value="Other">इतर</option>
              </select>
            </div>
          </div>
        </div>

        {/* Document Upload */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">आवश्यक कागदपत्रे | Required Documents</h2>
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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मालमत्ता कार्ड
              </label>
              <input
                type="file"
                name="propertyCard"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ७/१२ उतारा
              </label>
              <input
                type="file"
                name="sevenTwelve"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                विक्री खत
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
                कर पावती
              </label>
              <input
                type="file"
                name="taxReceipt"
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
              मी घोषणा करतो/करते की वरील सर्व माहिती सत्य आहे आणि मी या मालमत्तेचा वास्तविक मालक/हक्कदार आहे. 
              जर कोणतीही माहिती चुकीची आढळली तर मी त्याची जबाबदारी घेतो/घेते.
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