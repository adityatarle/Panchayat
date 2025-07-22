'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AdminDashboard() {
  const { t } = useLanguage();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [applications, setApplications] = useState([]);
  const [statistics, setStatistics] = useState({
    totalApplications: 847,
    pendingApplications: 23,
    approvedApplications: 789,
    rejectedApplications: 35,
    todayApplications: 12,
    revenue: 25650
  });

  // Sample applications data
  const sampleApplications = [
    {
      id: 'BC123456',
      type: 'Birth Certificate',
      applicantName: 'राम कुमार शर्मा',
      submissionDate: '2024-01-20',
      status: 'pending',
      priority: 'high',
      officer: 'श्री राज पाटिल'
    },
    {
      id: 'RC789012',
      type: 'Residence Certificate', 
      applicantName: 'सुनीता पाटिल',
      submissionDate: '2024-01-19',
      status: 'approved',
      priority: 'medium',
      officer: 'श्री विकास मराठे'
    },
    {
      id: 'MC456789',
      type: 'Marriage Certificate',
      applicantName: 'अमित सिंह & प्रिया शर्मा',
      submissionDate: '2024-01-18',
      status: 'pending',
      priority: 'low',
      officer: 'श्रीमती सुमित्रा देशमुख'
    },
    {
      id: 'CC234567',
      type: 'Caste Certificate',
      applicantName: 'राजेश कुमार',
      submissionDate: '2024-01-17',
      status: 'rejected',
      priority: 'medium',
      officer: 'श्री संदीप जाधव'
    },
    {
      id: 'IC567890',
      type: 'Income Certificate',
      applicantName: 'मीरा देवी',
      submissionDate: '2024-01-16',
      status: 'approved',
      priority: 'high',
      officer: 'श्री राज पाटिल'
    }
  ];

  useEffect(() => {
    setApplications(sampleApplications);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'in-review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleStatusUpdate = (applicationId, newStatus) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: newStatus }
          : app
      )
    );
    alert(`Application ${applicationId} status updated to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-primary-600 hover:text-primary-700 mr-4">
                ← Back to Portal
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">ग्राम पंचायत एडमिन डैशबोर्ड</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin: श्री राजेश कुमार</span>
              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              डैशबोर्ड
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              आवेदन प्रबंधन
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              रिपोर्ट्स
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              सेटिंग्स
            </button>
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm">📋</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">कुल आवेदन</dt>
                        <dd className="text-lg font-medium text-gray-900">{statistics.totalApplications}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm">⏳</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">लंबित आवेदन</dt>
                        <dd className="text-lg font-medium text-gray-900">{statistics.pendingApplications}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm">✅</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">स्वीकृत आवेदन</dt>
                        <dd className="text-lg font-medium text-gray-900">{statistics.approvedApplications}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm">❌</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">अस्वीकृत आवेदन</dt>
                        <dd className="text-lg font-medium text-gray-900">{statistics.rejectedApplications}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm">📅</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">आज के आवेदन</dt>
                        <dd className="text-lg font-medium text-gray-900">{statistics.todayApplications}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm">₹</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">मासिक राजस्व</dt>
                        <dd className="text-lg font-medium text-gray-900">₹{statistics.revenue.toLocaleString()}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">हाल के आवेदन</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          आवेदन ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          प्रकार
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          आवेदक
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          स्थिति
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          प्राथमिकता
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          कार्य
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {applications.slice(0, 5).map((app) => (
                        <tr key={app.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {app.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {app.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {app.applicantName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(app.priority)}`}>
                              {app.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => alert(`Viewing details for ${app.id}`)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              देखें
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(app.id, 'approved')}
                              className="text-green-600 hover:text-green-900"
                            >
                              स्वीकार करें
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Applications Management Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">आवेदन फिल्टर</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  <option>सभी प्रकार</option>
                  <option>Birth Certificate</option>
                  <option>Marriage Certificate</option>
                  <option>Residence Certificate</option>
                  <option>Income Certificate</option>
                  <option>Caste Certificate</option>
                </select>
                <select className="border border-gray-300 rounded-md px-3 py-2">
                  <option>सभी स्थिति</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                  <option>In Review</option>
                </select>
                <input
                  type="date"
                  className="border border-gray-300 rounded-md px-3 py-2"
                  placeholder="From Date"
                />
                <input
                  type="date"
                  className="border border-gray-300 rounded-md px-3 py-2"
                  placeholder="To Date"
                />
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">सभी आवेदन</h3>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          आवेदन ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          प्रकार
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          आवेदक
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          जमा तारीख
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          स्थिति
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          अधिकारी
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          कार्य
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {applications.map((app) => (
                        <tr key={app.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {app.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {app.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {app.applicantName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {app.submissionDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={app.status}
                              onChange={(e) => handleStatusUpdate(app.id, e.target.value)}
                              className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(app.status)}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="in-review">In Review</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {app.officer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                              विवरण
                            </button>
                            <button className="text-green-600 hover:text-green-900 mr-3">
                              संपादित करें
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              डाउनलोड
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">रिपोर्ट्स डैशबोर्ड</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">मासिक रिपोर्ट</h4>
                  <p className="text-sm text-gray-600 mb-4">इस महीने के सभी आवेदनों की रिपोर्ट</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                    डाउनलोड PDF
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">राजस्व रिपोर्ट</h4>
                  <p className="text-sm text-gray-600 mb-4">शुल्क संग्रह की विस्तृत रिपोर्ट</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
                    डाउनलोड Excel
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">प्रदर्शन रिपोर्ट</h4>
                  <p className="text-sm text-gray-600 mb-4">अधिकारियों के प्रदर्शन की रिपोर्ट</p>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700">
                    देखें
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">सिस्टम सेटिंग्स</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">शुल्क प्रबंधन</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Birth Certificate Fee</label>
                      <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" defaultValue="20" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Marriage Certificate Fee</label>
                      <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2" defaultValue="50" />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">अधिकारी प्रबंधन</h4>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
                    नया अधिकारी जोड़ें
                  </button>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">बैकअप सेटिंग्स</h4>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 mr-3">
                    डेटा बैकअप लें
                  </button>
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
                    डेटा रिस्टोर करें
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}