'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  AlertTriangle, Bell, Clock, X, CheckCircle, AlertCircle
} from 'lucide-react';
import Layout from '@/components/Layout';
import { api } from "@/hooks/useAuth";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get("alerts");
        setAlerts(res.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch alerts:', error);
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const paginatedAlerts = alerts.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(alerts.length / rowsPerPage);

  const getAlertIcon = (severity) => {
    switch (severity) {
      case 'High': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'Medium': return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'Low': return <Bell className="h-5 w-5 text-blue-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Investigating': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <Head>
        <title>Security Alerts | Card RFID</title>
      </Head>

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-light text-gray-800">SECURITY ALERTS</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          {loading ? (
            <p className='text-black'>Loading alerts...</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Triggered At</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acknowledged</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedAlerts.map((alert) => (
                      <tr key={alert.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">{getAlertIcon(alert.severity)}</div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{alert.alert_type}</div>
                              <div className="text-xs text-gray-500">
                                {alert.door?.name ? alert.description.replace(/\(\)/g, '').trim() : alert.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-gray-400" />
                            {new Date(alert.triggered_at).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {alert.is_acknowledged ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-red-500" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-6">
                <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
