'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WaterTax() {
  const [activeTab, setActiveTab] = useState('payment');
  const [connectionNumber, setConnectionNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const [newConnectionData, setNewConnectionData] = useState({
    applicantName: '',
    applicantNameMarathi: '',
    fatherName: '',
    contactNumber: '',
    email: '',
    aadharNumber: '',
    propertyNumber: '',
    plotNumber: '',
    address: '',
    pincode: '',
    connectionType: '',
    waterUsage: '',
    propertyType: '',
    noOfMembers: '',
    existingConnection: 'no'
  });

  const sampleBills = [
    {
      connectionNo: 'WC001234',
      billNumber: 'WB2024001',
      billDate: '2024-01-15',
      dueDate: '2024-02-14',
      previousReading: 1250,
      currentReading: 1380,
      consumption: 130,
      amount: 850,
      status: 'Pending',
      penalty: 0
    },
    {
      connectionNo: 'WC001234',
      billNumber: 'WB2023012',
      billDate: '2023-12-15',
      billDate: '2024-01-14',
      previousReading: 1120,
      currentReading: 1250,
      consumption: 130,
      amount: 850,
      status: 'Paid',
      penalty: 0
    }
  ];

  const handleSearch = () => {
    if (connectionNumber === 'WC001234') {
      setSearchResult({
        connectionNumber: 'WC001234',
        consumerName: 'राम कुमार शर्मा',
        address: 'प्लॉट नं. 123, वार्ड नं. 5, ग्राम पंचायत सैंपल',
        connectionType: 'Domestic',
        status: 'Active',
        currentDue: 850,
        lastPayment: '2023-11-15',
        meterNumber: 'WM789012'
      });
    } else {
      setSearchResult(null);
      alert('कनेक्शन नंबर नहीं मिला। कृपया सही नंबर डालें।');
    }
  };

  const handleNewConnectionSubmit = (e) => {
    e.preventDefault();
    alert('नया कनेक्शन आवेदन सफलतापूर्वक जमा किया गया! आपका आवेदन संख्या: WA' + Date.now().toString().slice(-6));
  };

  const handlePayment = (billAmount) => {
    alert(`₹${billAmount} का भुगतान पेमेंट गेटवे पर भेजा जा रहा है...`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
        <Link href="/" className="text-primary-600 hover:text-primary-700 flex items-center mb-4">
          ← वापस होम पर जाएं
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">जल कर विभाग</h1>
        <p className="text-gray-600">Water Tax Department - Maharashtra Gram Panchayat</p>
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
            💧 बिल भुगतान | Bill Payment
          </button>
          <button
            onClick={() => setActiveTab('newConnection')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'newConnection'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🔌 नया कनेक्शन | New Connection
          </button>
          <button
            onClick={() => setActiveTab('viewBills')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'viewBills'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📊 बिल देखें | View Bills
          </button>
          <button
            onClick={() => setActiveTab('rates')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'rates'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            💰 दरें | Water Rates
          </button>
        </div>

        <div className="p-6">
          {/* Bill Payment Tab */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">जल कर भुगतान | Water Tax Payment</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      कनेक्शन नंबर डालें *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={connectionNumber}
                        onChange={(e) => setConnectionNumber(e.target.value)}
                        placeholder="WC001234"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <button
                        onClick={handleSearch}
                        className="btn-primary"
                      >
                        खोजें
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      डेमो के लिए: WC001234 का उपयोग करें
                    </p>
                  </div>

                  {searchResult && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-bold text-green-800 mb-3">कनेक्शन विवरण</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">नाम:</span> {searchResult.consumerName}</p>
                        <p><span className="font-medium">पता:</span> {searchResult.address}</p>
                        <p><span className="font-medium">कनेक्शन प्रकार:</span> {searchResult.connectionType}</p>
                        <p><span className="font-medium">मीटर नंबर:</span> {searchResult.meterNumber}</p>
                        <p><span className="font-medium">स्थिति:</span> 
                          <span className="text-green-600 font-medium"> {searchResult.status}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {searchResult && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-red-800 mb-4">बकाया राशि | Outstanding Amount</h3>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600 mb-2">₹{searchResult.currentDue}</div>
                      <p className="text-sm text-red-700 mb-4">कुल बकाया राशि</p>
                      <button
                        onClick={() => handlePayment(searchResult.currentDue)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                      >
                        अभी भुगतान करें | Pay Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* New Connection Tab */}
          {activeTab === 'newConnection' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">नया जल कनेक्शन आवेदन | New Water Connection Application</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-bold text-yellow-800 mb-2">आवश्यक दस्तावेज | Required Documents</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• आधार कार्ड की प्रति</li>
                  <li>• संपत्ति कागजात (7/12 उतारा, संपत्ति कार्ड)</li>
                  <li>• पासपोर्ट साइज फोटो</li>
                  <li>• आवेदन शुल्क: ₹500 (घरेलू), ₹1000 (व्यावसायिक)</li>
                </ul>
              </div>

              <form onSubmit={handleNewConnectionSubmit} className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">व्यक्तिगत जानकारी | Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        आवेदक का नाम (अंग्रेजी में) *
                      </label>
                      <input
                        type="text"
                        name="applicantName"
                        value={newConnectionData.applicantName}
                        onChange={(e) => setNewConnectionData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        आवेदक का नाम (मराठी में)
                      </label>
                      <input
                        type="text"
                        name="applicantNameMarathi"
                        value={newConnectionData.applicantNameMarathi}
                        onChange={(e) => setNewConnectionData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        पिता/पति का नाम *
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={newConnectionData.fatherName}
                        onChange={(e) => setNewConnectionData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        मोबाइल नंबर *
                      </label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={newConnectionData.contactNumber}
                        onChange={(e) => setNewConnectionData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                        pattern="[0-9]{10}"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        आधार नंबर *
                      </label>
                      <input
                        type="text"
                        name="aadharNumber"
                        value={newConnectionData.aadharNumber}
                        onChange={(e) => setNewConnectionData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                        pattern="[0-9]{12}"
                        placeholder="12 अंकों का आधार नंबर"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ईमेल
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={newConnectionData.email}
                        onChange={(e) => setNewConnectionData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">संपत्ति जानकारी | Property Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        संपत्ति प्रकार *
                      </label>
                      <select
                        name="propertyType"
                        value={newConnectionData.propertyType}
                        onChange={(e) => setNewConnectionData(prev => ({
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
                        <option value="Institutional">संस्थागत / Institutional</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        कनेक्शन प्रकार *
                      </label>
                      <select
                        name="connectionType"
                        value={newConnectionData.connectionType}
                        onChange={(e) => setNewConnectionData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      >
                        <option value="">चुनें</option>
                        <option value="Domestic">घरेलू / Domestic</option>
                        <option value="Non-Domestic">गैर-घरेलू / Non-Domestic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        संपत्ति नंबर
                      </label>
                      <input
                        type="text"
                        name="propertyNumber"
                        value={newConnectionData.propertyNumber}
                        onChange={(e) => setNewConnectionData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        प्लॉट नंबर *
                      </label>
                      <input
                        type="text"
                        name="plotNumber"
                        value={newConnectionData.plotNumber}
                        onChange={(e) => setNewConnectionData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        परिवार के सदस्यों की संख्या
                      </label>
                      <input
                        type="number"
                        name="noOfMembers"
                        value={newConnectionData.noOfMembers}
                        onChange={(e) => setNewConnectionData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        पिन कोड *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={newConnectionData.pincode}
                        onChange={(e) => setNewConnectionData(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                        pattern="[0-9]{6}"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      पूरा पता *
                    </label>
                    <textarea
                      name="address"
                      value={newConnectionData.address}
                      onChange={(e) => setNewConnectionData(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value
                      }))}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                      placeholder="पूरा पता लिखें"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                  >
                    आवेदन जमा करें | Submit Application
                  </button>
                  <button
                    type="button"
                    className="btn-secondary flex-1"
                    onClick={() => setNewConnectionData({
                      applicantName: '',
                      applicantNameMarathi: '',
                      fatherName: '',
                      contactNumber: '',
                      email: '',
                      aadharNumber: '',
                      propertyNumber: '',
                      plotNumber: '',
                      address: '',
                      pincode: '',
                      connectionType: '',
                      waterUsage: '',
                      propertyType: '',
                      noOfMembers: '',
                      existingConnection: 'no'
                    })}
                  >
                    रीसेट करें | Reset
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* View Bills Tab */}
          {activeTab === 'viewBills' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">बिल इतिहास | Bill History</h2>
              
              <div className="space-y-4">
                {sampleBills.map((bill, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 md:mb-0">
                        <div>
                          <p className="text-sm text-gray-500">बिल नंबर</p>
                          <p className="font-medium">{bill.billNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">बिल दिनांक</p>
                          <p className="font-medium">{bill.billDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">खपत (लीटर)</p>
                          <p className="font-medium">{bill.consumption}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">राशि</p>
                          <p className="font-medium text-lg">₹{bill.amount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          bill.status === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {bill.status === 'Paid' ? 'भुगतान किया गया' : 'बकाया'}
                        </span>
                        {bill.status === 'Pending' && (
                          <button
                            onClick={() => handlePayment(bill.amount)}
                            className="btn-primary text-sm"
                          >
                            भुगतान करें
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Water Rates Tab */}
          {activeTab === 'rates' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">जल दरें | Water Rates</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-blue-800 mb-4">घरेलू दरें | Domestic Rates</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>0-5000 लीटर</span>
                      <span className="font-medium">₹2 प्रति 1000 लीटर</span>
                    </div>
                    <div className="flex justify-between">
                      <span>5001-10000 लीटर</span>
                      <span className="font-medium">₹3 प्रति 1000 लीटर</span>
                    </div>
                    <div className="flex justify-between">
                      <span>10000+ लीटर</span>
                      <span className="font-medium">₹5 प्रति 1000 लीटर</span>
                    </div>
                    <hr className="my-3 border-blue-200" />
                    <div className="flex justify-between font-bold">
                      <span>न्यूनतम शुल्क</span>
                      <span>₹100 प्रति माह</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-orange-800 mb-4">व्यावसायिक दरें | Commercial Rates</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>0-3000 लीटर</span>
                      <span className="font-medium">₹5 प्रति 1000 लीटर</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3001-6000 लीटर</span>
                      <span className="font-medium">₹7 प्रति 1000 लीटर</span>
                    </div>
                    <div className="flex justify-between">
                      <span>6000+ लीटर</span>
                      <span className="font-medium">₹10 प्रति 1000 लीटर</span>
                    </div>
                    <hr className="my-3 border-orange-200" />
                    <div className="flex justify-between font-bold">
                      <span>न्यूनतम शुल्क</span>
                      <span>₹300 प्रति माह</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">अन्य शुल्क | Other Charges</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>नया कनेक्शन शुल्क (घरेलू)</span>
                      <span className="font-medium">₹500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>नया कनेक्शन शुल्क (व्यावसायिक)</span>
                      <span className="font-medium">₹1,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>मीटर जमा राशि</span>
                      <span className="font-medium">₹1,500</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>देर से भुगतान जुर्माना</span>
                      <span className="font-medium">2% प्रति माह</span>
                    </div>
                    <div className="flex justify-between">
                      <span>कनेक्शन बंद करने का शुल्क</span>
                      <span className="font-medium">₹100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>डुप्लिकेट बिल शुल्क</span>
                      <span className="font-medium">₹50</span>
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