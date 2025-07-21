'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DownloadCertificate() {
  const [searchCriteria, setSearchCriteria] = useState('application');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Sample certificate data
  const sampleCertificates = {
    'BC123456': {
      type: 'Birth Certificate',
      applicantName: 'राम कुमार शर्मा',
      applicationNumber: 'BC123456',
      certificateNumber: 'GP/BC/2024/001234',
      issueDate: '2024-01-20',
      issuedBy: 'ग्राम पंचायत सैंपल',
      status: 'Available',
      downloadUrl: '#',
      validUpto: '2029-01-20'
    },
    'RC789012': {
      type: 'Residence Certificate',
      applicantName: 'सुनीता पाटिल',
      applicationNumber: 'RC789012',
      certificateNumber: 'GP/RC/2024/007890',
      issueDate: '2024-01-18',
      issuedBy: 'ग्राम पंचायत सैंपल',
      status: 'Available',
      downloadUrl: '#',
      validUpto: '2027-01-18'
    },
    'IC456789': {
      type: 'Income Certificate',
      applicantName: 'अजय कुमार वर्मा',
      applicationNumber: 'IC456789',
      certificateNumber: 'GP/IC/2024/004567',
      issueDate: '2024-01-15',
      issuedBy: 'ग्राम पंचायत सैंपल',
      status: 'Available',
      downloadUrl: '#',
      validUpto: '2025-01-15'
    }
  };

  const handleSearch = () => {
    if (sampleCertificates[searchValue]) {
      setSearchResult(sampleCertificates[searchValue]);
    } else {
      setSearchResult(null);
      alert('कोई प्रमाणपत्र नहीं मिला। कृपया सही जानकारी डालें।');
    }
  };

  const handleDownload = (certificate) => {
    // In a real application, this would trigger the actual download
    alert(`${certificate.type} डाउनलोड शुरू हो रहा है...`);
  };

  const handleShare = (certificate) => {
    if (navigator.share) {
      navigator.share({
        title: `${certificate.type} - ${certificate.applicantName}`,
        text: `Certificate Number: ${certificate.certificateNumber}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`Certificate: ${certificate.certificateNumber}\nIssued to: ${certificate.applicantName}`);
      alert('प्रमाणपत्र की जानकारी क्लिपबोर्ड में कॉपी हो गई है।');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
        <Link href="/" className="text-primary-600 hover:text-primary-700 flex items-center mb-4">
          ← वापस होम पर जाएं
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">प्रमाणपत्र डाउनलोड</h1>
        <p className="text-gray-600">Download Your Certificates | अपने प्रमाणपत्र डाउनलोड करें</p>
      </div>

      {/* Sample Certificates Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-green-800 mb-3">डेमो के लिए उपलब्ध प्रमाणपत्र | Available Sample Certificates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded border">
            <p className="font-medium text-gray-800">Birth Certificate</p>
            <p className="text-green-600 font-bold">BC123456</p>
            <p className="text-sm text-gray-600">राम कुमार शर्मा</p>
          </div>
          <div className="bg-white p-4 rounded border">
            <p className="font-medium text-gray-800">Residence Certificate</p>
            <p className="text-green-600 font-bold">RC789012</p>
            <p className="text-sm text-gray-600">सुनीता पाटिल</p>
          </div>
          <div className="bg-white p-4 rounded border">
            <p className="font-medium text-gray-800">Income Certificate</p>
            <p className="text-green-600 font-bold">IC456789</p>
            <p className="text-sm text-gray-600">अजय कुमार वर्मा</p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">प्रमाणपत्र खोजें | Search Certificate</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              खोज का प्रकार | Search Type
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="application"
                  checked={searchCriteria === 'application'}
                  onChange={(e) => setSearchCriteria(e.target.value)}
                  className="mr-2"
                />
                आवेदन संख्या | Application Number
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="certificate"
                  checked={searchCriteria === 'certificate'}
                  onChange={(e) => setSearchCriteria(e.target.value)}
                  className="mr-2"
                />
                प्रमाणपत्र संख्या | Certificate Number
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="name"
                  checked={searchCriteria === 'name'}
                  onChange={(e) => setSearchCriteria(e.target.value)}
                  className="mr-2"
                />
                नाम | Name
              </label>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {searchCriteria === 'application' && 'आवेदन संख्या डालें | Enter Application Number'}
                {searchCriteria === 'certificate' && 'प्रमाणपत्र संख्या डालें | Enter Certificate Number'}
                {searchCriteria === 'name' && 'आवेदक का नाम डालें | Enter Applicant Name'}
              </label>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
                placeholder={
                  searchCriteria === 'application' ? 'BC123456, RC789012, IC456789' :
                  searchCriteria === 'certificate' ? 'GP/BC/2024/001234' :
                  'आवेदक का पूरा नाम'
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="btn-primary w-full md:w-auto"
              >
                खोजें | Search
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>📱 SMS या Email में प्राप्त संख्या का उपयोग करें</p>
            <p>🔒 आपकी व्यक्तिगत जानकारी सुरक्षित है</p>
          </div>
        </div>
      </div>

      {/* Search Result */}
      {searchResult && (
        <div className="space-y-6">
          {/* Certificate Details */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  📜 {searchResult.type}
                </h2>
                <p className="text-gray-600">आवेदक: {searchResult.applicantName}</p>
                <p className="text-gray-600">प्रमाणपत्र संख्या: {searchResult.certificateNumber}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  ✅ डाउनलोड के लिए उपलब्ध
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500">आवेदन संख्या</p>
                <p className="font-medium">{searchResult.applicationNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">जारी करने की तारीख</p>
                <p className="font-medium">{searchResult.issueDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">जारी करने वाली संस्था</p>
                <p className="font-medium">{searchResult.issuedBy}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">वैधता समाप्ति</p>
                <p className="font-medium">{searchResult.validUpto}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={() => handleDownload(searchResult)}
                className="btn-primary flex items-center justify-center"
              >
                📥 डाउनलोड करें | Download PDF
              </button>
              <button
                onClick={() => handleShare(searchResult)}
                className="btn-secondary flex items-center justify-center"
              >
                📤 साझा करें | Share
              </button>
              <button
                onClick={() => alert('सत्यापन सुविधा जल्द ही उपलब्ध होगी।')}
                className="btn-secondary flex items-center justify-center"
              >
                🔍 सत्यापित करें | Verify
              </button>
            </div>
          </div>

          {/* Certificate Preview */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">प्रमाणपत्र पूर्वावलोकन | Certificate Preview</h3>
            
            <div className="border-2 border-gray-300 rounded-lg p-8 bg-gray-50">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h4 className="text-lg font-bold text-gray-800">ग्राम पंचायत सैंपल</h4>
                <p className="text-sm text-gray-600">जिला: सैंपल, महाराष्ट्र</p>
                <p className="text-lg font-bold text-primary-600 mt-2">{searchResult.type}</p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">प्रमाणपत्र संख्या:</span>
                  <span>{searchResult.certificateNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">आवेदक का नाम:</span>
                  <span>{searchResult.applicantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">जारी करने की तारीख:</span>
                  <span>{searchResult.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">वैधता:</span>
                  <span>{searchResult.validUpto} तक</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-300 text-center">
                <p className="text-xs text-gray-500">
                  यह एक डिजिटल प्रमाणपत्र है और सरकारी उद्देश्यों के लिए मान्य है।
                </p>
                <div className="mt-2">
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">QR Code: GP-{searchResult.certificateNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Download Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-800 mb-4">डाउनलोड निर्देश | Download Instructions</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• डाउनलोड किया गया प्रमाणपत्र PDF फॉर्मेट में होगा</li>
              <li>• यह प्रमाणपत्र सभी सरकारी और गैर-सरकारी उद्देश्यों के लिए वैध है</li>
              <li>• प्रमाणपत्र की सत्यता QR कोड से जांची जा सकती है</li>
              <li>• यदि कोई समस्या हो तो ग्राम पंचायत कार्यालय से संपर्क करें</li>
              <li>• प्रमाणपत्र को अपने डिवाइस में सुरक्षित रूप से स्टोर करें</li>
            </ul>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mt-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">सहायता | Help & Support</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">सामान्य समस्याएं</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• प्रमाणपत्र नहीं मिल रहा? आवेदन स्थिति जांचें</li>
              <li>• डाउनलोड नहीं हो रहा? ब्राउज़र अपडेट करें</li>
              <li>• गलत जानकारी? ग्राम पंचायत से संपर्क करें</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">संपर्क जानकारी</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• फोन: 1800-XXX-XXXX</li>
              <li>• ईमेल: certificates@grampanchayat.gov.in</li>
              <li>• समय: सोमवार - शुक्रवार, 10:00 AM - 5:00 PM</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mt-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">त्वरित कार्य | Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/track-application" className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">🔍</div>
            <p className="text-sm font-medium">ट्रैक करें</p>
          </Link>
          <Link href="/birth-certificate" className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">👶</div>
            <p className="text-sm font-medium">नया आवेदन</p>
          </Link>
          <Link href="/complaint" className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">📝</div>
            <p className="text-sm font-medium">शिकायत</p>
          </Link>
          <Link href="/help" className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">❓</div>
            <p className="text-sm font-medium">सहायता</p>
          </Link>
        </div>
      </div>
    </div>
  );
}