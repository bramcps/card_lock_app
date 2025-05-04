'use client';
import { useState } from 'react';
import Head from 'next/head';
import { AlertTriangle, Bell, Clock, Filter, Search, Download, X, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import Layout from '@/components/Layout';

export default function AlertsPage() {
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const alerts = [
    {
      id: 1,
      title: 'Unauthorized Access Attempt',
      description: 'Multiple failed attempts at Server Room door',
      severity: 'High',
      status: 'Active',
      source: 'Security System',
      timestamp: '2023-06-15 08:42:23'
    },
    {
      id: 2,
      title: 'Door Left Open',
      description: 'Main Entrance door has been open for more than 5 minutes',
      severity: 'Medium',
      status: 'Resolved',
      source: 'Door Sensor',
      timestamp: '2023-06-15 09:15:47'
    },
    {
      id: 3,
      title: 'Unknown Card Used',
      description: 'Unregistered card attempted access at Office West',
      severity: 'Low',
      status: 'Active',
      source: 'Card Reader',
      timestamp: '2023-06-15 10:03:12'
    },
    {
      id: 4,
      title: 'System Reboot',
      description: 'Security system restarted unexpectedly',
      severity: 'Medium',
      status: 'Active',
      source: 'System Monitor',
      timestamp: '2023-06-15 11:27:35'
    },
    {
      id: 5,
      title: 'Power Outage Detected',
      description: 'Backup power activated for east wing access control',
      severity: 'High',
      status: 'Resolved',
      source: 'Power System',
      timestamp: '2023-06-15 13:45:18'
    },
    {
      id: 6,
      title: 'Multiple Access Attempts',
      description: 'Card CRD-6742 used at 3 different doors within 2 minutes',
      severity: 'Medium',
      status: 'Investigating',
      source: 'Behavior Analysis',
      timestamp: '2023-06-15 14:30:09'
    },
    {
      id: 7,
      title: 'Sensor Offline',
      description: 'Motion sensor in corridor B is not responding',
      severity: 'Low',
      status: 'Active',
      source: 'System Health',
      timestamp: '2023-06-15 16:12:44'
    },
  ];

  const activeAlerts = alerts.filter(alert => alert.status === 'Active');
  const highSeverityCount = activeAlerts.filter(alert => alert.severity === 'High').length;
  const mediumSeverityCount = activeAlerts.filter(alert => alert.severity === 'Medium').length;
  const lowSeverityCount = activeAlerts.filter(alert => alert.severity === 'Low').length;

  const filteredAlerts = alerts.filter(alert =>
    alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAlerts.length / rowsPerPage);
  const paginatedAlerts = filteredAlerts.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const getAlertIcon = (severity) => {
    switch(severity) {
      case 'High':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'Medium':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'Low':
        return <Bell className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Active':
        return 'bg-red-100 text-red-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Investigating':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <Head>
        <title>Security Alerts | Card RFID</title>
      </Head>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-light text-gray-800">SECURITY ALERTS</h1>
            <p className="text-gray-500 text-sm mt-1">
              Active alerts: <span className="font-bold text-red-600">{highSeverityCount}</span> high,
              <span className="font-bold text-orange-500 ml-1">{mediumSeverityCount}</span> medium,
              <span className="font-bold text-blue-500 ml-1">{lowSeverityCount}</span> low severity
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="rounded-full bg-red-100 p-3 mr-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">High Severity</h3>
              <p className="text-lg font-bold">{highSeverityCount} Alerts</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="rounded-full bg-orange-100 p-3 mr-4">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Medium Severity</h3>
              <p className="text-lg font-bold">{mediumSeverityCount} Alerts</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Low Severity</h3>
              <p className="text-lg font-bold">{lowSeverityCount} Alerts</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search alerts..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset pagination when search changes
                }}
              />
            </div>
            <div className="flex space-x-2 ml-4">
              <select
                className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
              >
                <option>All Severities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                <Download className="h-4 w-4 mr-1" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getAlertIcon(alert.severity)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{alert.title}</div>
                          <div className="text-xs text-gray-500">{alert.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${
                        alert.severity === 'High' ? 'text-red-600' :
                        alert.severity === 'Medium' ? 'text-orange-500' : 'text-blue-500'
                      }`}>
                        {alert.severity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(alert.status)}`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        {alert.timestamp}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm text-black border border-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm text-black border border-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
