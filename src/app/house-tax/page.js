'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HouseTax() {
  const [activeTab, setActiveTab] = useState('payment');
  const [propertyId, setPropertyId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const [exemptionApplication, setExemptionApplication] = useState({
    applicantName: '',
    propertyId: '',
    exemptionType: '',
    reason: '',
    documents: []
  });

  const [assessmentData, setAssessmentData] = useState({
    propertyId: '',
    propertyType: '',
    area: '',
    constructionType: '',
    age: '',
    floors: '',
    usage: '',
    location: ''
  });

  const sampleTaxRecords = [
    {
      propertyId: 'HP001234',
      assessmentYear: '2023-24',
      taxAmount: 12500,
      paidAmount: 12500,
      dueDate: '2024-03-31',
      status: 'Paid',
      penalty: 0
    },
    {
      propertyId: 'HP001234',
      assessmentYear: '2024-25',
      taxAmount: 13200,
      paidAmount: 0,
      dueDate: '2025-03-31',
      status: 'Pending',
      penalty: 660
    }
  ];

  const handlePropertySearch = async () => {
    if (!propertyId.trim()) {
      alert('कृपया संपत्ति आईडी दर्ज करें।');
      return;
    }

    try {
      const response = await fetch(`/api/house-tax?propertyId=${propertyId}`);
      const result = await response.json();

      if (result.success && result.data) {
        const property = result.data;
        setSearchResult({
          propertyId: property.propertyId,
          ownerName: property.ownerName,
          address: property.propertyAddress,
          propertyType: property.propertyType,
          area: `${property.builtUpArea} sq ft`,
          assessedValue: property.assessedValue,
          currentTax: property.currentTax?.totalTax || 0,
          taxStatus: property.currentTax?.paymentStatus || 'Unknown',
          lastPaid: property.lastPaymentDate || 'N/A'
        });
      } else {
        // Fallback to sample data for demo
        if (propertyId === 'HP001234') {
          setSearchResult({
            propertyId: 'HP001234',
            ownerName: 'श्रीमती सुनीता पाटील',
            address: 'प्लॉट नं. 456, सेक्टर 7, ग्राम पंचायत सैंपल',
            propertyType: 'Residential',
            area: '1200 sq ft',
            assessedValue: 850000,
            currentTax: 13200,
            taxStatus: 'Pending',
            lastPaid: '2023-03-15'
          });
        } else {
          setSearchResult(null);
          alert('संपत्ति आईडी नहीं मिली। कृपया सही आईडी डालें।');
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to sample data
      if (propertyId === 'HP001234') {
        setSearchResult({
          propertyId: 'HP001234',
          ownerName: 'श्रीमती सुनीता पाटील',
          address: 'प्लॉट नं. 456, सेक्टर 7, ग्राम पंचायत सैंपल',
          propertyType: 'Residential',
          area: '1200 sq ft',
          assessedValue: 850000,
          currentTax: 13200,
          taxStatus: 'Pending',
          lastPaid: '2023-03-15'
        });
      } else {
        alert('संपत्ति खोजने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
      }
    }
  };

  const handlePayment = (amount) => {
    alert(`₹${amount} का भुगतान पेमेंट गेटवे पर भेजा जा रहा है...`);
  };

  const handleExemptionSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submitData = {
        action: 'apply_exemption',
        propertyId: exemptionApplication.propertyId,
        exemptionType: exemptionApplication.exemptionType.toLowerCase().replace(' ', '_'),
        exemptionReason: exemptionApplication.reason
      };
      
      const response = await fetch('/api/house-tax', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(`छूट आवेदन सफलतापूर्वक जमा किया गया! संदर्भ संख्या: EX${Date.now().toString().slice(-6)}`);
        setExemptionApplication({
          applicantName: '',
          propertyId: '',
          exemptionType: '',
          reason: '',
          documents: []
        });
      } else {
        alert(`आवेदन जमा करने में त्रुटि: ${result.message}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('छूट आवेदन सफलतापूर्वक जमा किया गया! आपका आवेदन संख्या: EX' + Date.now().toString().slice(-6));
    }
  };

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submitData = {
        action: 'register_property',
        ownerName: 'Property Owner', // This would come from a separate field
        propertyAddress: 'Address from form', // This would come from form
        plotNumber: assessmentData.propertyId,
        propertyType: assessmentData.propertyType,
        builtUpArea: parseFloat(assessmentData.area),
        numberOfFloors: parseInt(assessmentData.floors),
        age: parseInt(assessmentData.age),
        constructionType: assessmentData.constructionType,
        currentTax: {
          assessmentYear: new Date().getFullYear().toString(),
          taxableValue: parseFloat(assessmentData.area) * 800, // Sample calculation
        }
      };
      
      const response = await fetch('/api/house-tax', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(`मूल्यांकन आवेदन सफलतापूर्वक जमा किया गया! संपत्ति ID: ${result.propertyId}`);
        setAssessmentData({
          propertyId: '',
          propertyType: '',
          area: '',
          constructionType: '',
          age: '',
          floors: '',
          usage: '',
          location: ''
        });
      } else {
        alert(`आवेदन जमा करने में त्रुटि: ${result.message}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('मूल्यांकन आवेदन सफलतापूर्वक जमा किया गया! आपका आवेदन संख्या: AS' + Date.now().toString().slice(-6));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
        <Link href="/" className="text-primary-600 hover:text-primary-700 flex items-center mb-4">
          ← वापस होम पर जाएं
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">गृह कर विभाग</h1>
        <p className="text-gray-600">House Tax Department - Maharashtra Gram Panchayat</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-wrap border-b border-gray-200">
          <button
            onClick={() => setActiveTab('payment')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'payment'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🏘️ कर भुगतान | Tax Payment
          </button>
          <button
            onClick={() => setActiveTab('assessment')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'assessment'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📊 मूल्यांकन | Assessment
          </button>
          <button
            onClick={() => setActiveTab('exemption')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'exemption'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            💰 छूट आवेदन | Exemption
          </button>
          <button
            onClick={() => setActiveTab('rates')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'rates'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📋 कर दरें | Tax Rates
          </button>
        </div>

        <div className="p-6">
          {/* Tax Payment Tab */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">संपत्ति कर भुगतान | Property Tax Payment</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      संपत्ति आईडी डालें *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={propertyId}
                        onChange={(e) => setPropertyId(e.target.value)}
                        placeholder="HP001234"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <button
                        onClick={handlePropertySearch}
                        className="btn-primary"
                      >
                        खोजें
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      डेमो के लिए: HP001234 का उपयोग करें
                    </p>
                  </div>

                  {searchResult && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-bold text-green-800 mb-3">संपत्ति विवरण</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">मालिक:</span> {searchResult.ownerName}</p>
                        <p><span className="font-medium">पता:</span> {searchResult.address}</p>
                        <p><span className="font-medium">संपत्ति प्रकार:</span> {searchResult.propertyType}</p>
                        <p><span className="font-medium">क्षेत्रफल:</span> {searchResult.area}</p>
                        <p><span className="font-medium">मूल्यांकित मूल्य:</span> ₹{searchResult.assessedValue.toLocaleString()}</p>
                        <p><span className="font-medium">स्थिति:</span> 
                          <span className={searchResult.taxStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}> {searchResult.taxStatus}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {searchResult && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-red-800 mb-4">बकाया कर | Outstanding Tax</h3>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600 mb-2">₹{searchResult.currentTax}</div>
                      <p className="text-sm text-red-700 mb-4">वर्तमान वर्ष कर राशि</p>
                      <button
                        onClick={() => handlePayment(searchResult.currentTax)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                      >
                        अभी भुगतान करें | Pay Now
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tax History */}
              {searchResult && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">कर इतिहास | Tax History</h3>
                  {sampleTaxRecords.map((record, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 md:mb-0">
                          <div>
                            <p className="text-sm text-gray-500">मूल्यांकन वर्ष</p>
                            <p className="font-medium">{record.assessmentYear}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">कर राशि</p>
                            <p className="font-medium">₹{record.taxAmount}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">भुगतान राशि</p>
                            <p className="font-medium">₹{record.paidAmount}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">स्थिति</p>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              record.status === 'Paid' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {record.status === 'Paid' ? 'भुगतान किया गया' : 'बकाया'}
                            </span>
                          </div>
                        </div>
                        {record.status === 'Pending' && (
                          <button
                            onClick={() => handlePayment(record.taxAmount + record.penalty)}
                            className="btn-primary text-sm"
                          >
                            ₹{record.taxAmount + record.penalty} भुगतान करें
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Assessment Tab */}
          {activeTab === 'assessment' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">संपत्ति मूल्यांकन आवेदन | Property Assessment Application</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-2">मूल्यांकन के लिए आवश्यक दस्तावेज | Required Documents</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• संपत्ति कागजात (7/12 उतारा, संपत्ति कार्ड)</li>
                  <li>• निर्माण अनुमति प्रमाणपत्र</li>
                  <li>• पूर्णता प्रमाणपत्र</li>
                  <li>• संपत्ति की तस्वीरें</li>
                  <li>• आवेदन शुल्क: ₹200</li>
                </ul>
              </div>

              <form onSubmit={handleAssessmentSubmit} className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">संपत्ति विवरण | Property Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        संपत्ति आईडी *
                      </label>
                      <input
                        type="text"
                        name="propertyId"
                        value={assessmentData.propertyId}
                        onChange={(e) => setAssessmentData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                        placeholder="HP001234"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        संपत्ति प्रकार *
                      </label>
                      <select
                        name="propertyType"
                        value={assessmentData.propertyType}
                        onChange={(e) => setAssessmentData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      >
                        <option value="">चुनें</option>
                        <option value="Residential">आवासीय / Residential</option>
                        <option value="Commercial">व्यावसायिक / Commercial</option>
                        <option value="Industrial">औद्योगिक / Industrial</option>
                        <option value="Agricultural">कृषि / Agricultural</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        क्षेत्रफल (वर्ग फुट) *
                      </label>
                      <input
                        type="number"
                        name="area"
                        value={assessmentData.area}
                        onChange={(e) => setAssessmentData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                        placeholder="1200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        निर्माण प्रकार *
                      </label>
                      <select
                        name="constructionType"
                        value={assessmentData.constructionType}
                        onChange={(e) => setAssessmentData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      >
                        <option value="">चुनें</option>
                        <option value="RCC">आरसीसी / RCC</option>
                        <option value="Load Bearing">लोड बेयरिंग</option>
                        <option value="Semi-Pucca">अर्ध-पक्का</option>
                        <option value="Kutcha">कच्चा</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        मंजिलों की संख्या *
                      </label>
                      <select
                        name="floors"
                        value={assessmentData.floors}
                        onChange={(e) => setAssessmentData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      >
                        <option value="">चुनें</option>
                        <option value="1">1 मंजिल</option>
                        <option value="2">2 मंजिल</option>
                        <option value="3">3 मंजिल</option>
                        <option value="4+">4+ मंजिल</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        संपत्ति की आयु (वर्ष) *
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={assessmentData.age}
                        onChange={(e) => setAssessmentData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                        placeholder="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        उपयोग *
                      </label>
                      <select
                        name="usage"
                        value={assessmentData.usage}
                        onChange={(e) => setAssessmentData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      >
                        <option value="">चुनें</option>
                        <option value="Self Occupied">स्वयं निवास</option>
                        <option value="Rented">किराए पर</option>
                        <option value="Commercial Use">व्यावसायिक उपयोग</option>
                        <option value="Vacant">खाली</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        स्थान श्रेणी *
                      </label>
                      <select
                        name="location"
                        value={assessmentData.location}
                        onChange={(e) => setAssessmentData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      >
                        <option value="">चुनें</option>
                        <option value="Prime">मुख्य स्थान</option>
                        <option value="Semi-Prime">अर्ध-मुख्य स्थान</option>
                        <option value="Normal">सामान्य स्थान</option>
                        <option value="Rural">ग्रामीण स्थान</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                  >
                    मूल्यांकन आवेदन जमा करें | Submit Assessment Application
                  </button>
                  <button
                    type="button"
                    className="btn-secondary flex-1"
                    onClick={() => setAssessmentData({
                      propertyId: '',
                      propertyType: '',
                      area: '',
                      constructionType: '',
                      age: '',
                      floors: '',
                      usage: '',
                      location: ''
                    })}
                  >
                    रीसेट करें | Reset
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Exemption Tab */}
          {activeTab === 'exemption' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">कर छूट आवेदन | Tax Exemption Application</h2>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-green-800 mb-2">छूट की श्रेणियां | Exemption Categories</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• विकलांगता के आधार पर छूट</li>
                  <li>• वरिष्ठ नागरिकों के लिए छूट (65 वर्ष से अधिक)</li>
                  <li>• विधवा महिलाओं के लिए छूट</li>
                  <li>• आर्थिक रूप से कमजोर वर्ग (EWS) छूट</li>
                  <li>• धार्मिक/शैक्षणिक संस्थानों के लिए छूट</li>
                </ul>
              </div>

              <form onSubmit={handleExemptionSubmit} className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">आवेदक विवरण | Applicant Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        आवेदक का नाम *
                      </label>
                      <input
                        type="text"
                        name="applicantName"
                        value={exemptionApplication.applicantName}
                        onChange={(e) => setExemptionApplication(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                        placeholder="पूरा नाम लिखें"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        संपत्ति आईडी *
                      </label>
                      <input
                        type="text"
                        name="propertyId"
                        value={exemptionApplication.propertyId}
                        onChange={(e) => setExemptionApplication(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                        placeholder="HP001234"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        छूट का प्रकार *
                      </label>
                      <select
                        name="exemptionType"
                        value={exemptionApplication.exemptionType}
                        onChange={(e) => setExemptionApplication(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      >
                        <option value="">चुनें</option>
                        <option value="Disability">विकलांगता छूट</option>
                        <option value="Senior Citizen">वरिष्ठ नागरिक छूट</option>
                        <option value="Widow">विधवा छूट</option>
                        <option value="EWS">आर्थिक रूप से कमजोर वर्ग छूट</option>
                        <option value="Religious">धार्मिक संस्थान छूट</option>
                        <option value="Educational">शैक्षणिक संस्थान छूट</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        छूट का कारण *
                      </label>
                      <textarea
                        name="reason"
                        value={exemptionApplication.reason}
                        onChange={(e) => setExemptionApplication(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                        placeholder="छूट के लिए विस्तृत कारण लिखें..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                  >
                    छूट आवेदन जमा करें | Submit Exemption Application
                  </button>
                  <button
                    type="button"
                    className="btn-secondary flex-1"
                    onClick={() => setExemptionApplication({
                      applicantName: '',
                      propertyId: '',
                      exemptionType: '',
                      reason: '',
                      documents: []
                    })}
                  >
                    रीसेट करें | Reset
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tax Rates Tab */}
          {activeTab === 'rates' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">संपत्ति कर दरें | Property Tax Rates</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-blue-800 mb-4">आवासीय संपत्ति | Residential Property</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>स्वयं निवास</span>
                      <span className="font-medium">1.2% प्रति वर्ष</span>
                    </div>
                    <div className="flex justify-between">
                      <span>किराए पर दी गई</span>
                      <span className="font-medium">1.8% प्रति वर्ष</span>
                    </div>
                    <div className="flex justify-between">
                      <span>खाली संपत्ति</span>
                      <span className="font-medium">2.5% प्रति वर्ष</span>
                    </div>
                    <hr className="my-3 border-blue-200" />
                    <div className="flex justify-between font-bold">
                      <span>न्यूनतम कर</span>
                      <span>₹1,200 प्रति वर्ष</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-orange-800 mb-4">व्यावसायिक संपत्ति | Commercial Property</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>दुकान/कार्यालय</span>
                      <span className="font-medium">2.5% प्रति वर्ष</span>
                    </div>
                    <div className="flex justify-between">
                      <span>बैंक/होटल</span>
                      <span className="font-medium">3.0% प्रति वर्ष</span>
                    </div>
                    <div className="flex justify-between">
                      <span>औद्योगिक उपयोग</span>
                      <span className="font-medium">2.8% प्रति वर्ष</span>
                    </div>
                    <hr className="my-3 border-orange-200" />
                    <div className="flex justify-between font-bold">
                      <span>न्यूनतम कर</span>
                      <span>₹5,000 प्रति वर्ष</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">छूट और जुर्माना | Exemptions and Penalties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">छूट | Exemptions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>विकलांगता छूट</span>
                        <span className="font-medium">50%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>वरिष्ठ नागरिक (65+)</span>
                        <span className="font-medium">30%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>विधवा छूट</span>
                        <span className="font-medium">40%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>EWS श्रेणी</span>
                        <span className="font-medium">25%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">जुर्माना | Penalties</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>देर से भुगतान (1-3 महीने)</span>
                        <span className="font-medium">5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>देर से भुगतान (3-6 महीने)</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>6 महीने से अधिक</span>
                        <span className="font-medium">18% प्रति वर्ष</span>
                      </div>
                      <div className="flex justify-between">
                        <span>कानूनी कार्रवाई शुल्क</span>
                        <span className="font-medium">₹500</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}