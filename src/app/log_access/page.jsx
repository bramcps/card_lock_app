'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { User, Calendar } from 'lucide-react';
import Layout from '@/components/Layout';
import { api } from "@/hooks/useAuth";

export default function AccessLog() {
  const [accessLogs, setAccessLogs] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('All Doors');
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const grantedUsers = new Set(accessLogs.filter(log => log.status === 'success').map(log => log.user.name));
  const totalGrantedUsers = grantedUsers.size;
  const filteredLogs = accessLogs.filter(log =>
    log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.rfidCard.card_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Fetch access logs from the API when the component is mounted
  useEffect(() => {
    async function fetchAccessLogs() {
      try {
        const res = await api.get("access-logs");
        setAccessLogs(res.data.data); // Assuming the API returns the logs in a `data` key
      } catch (error) {
        console.error('Error fetching access logs:', error);
      }
    }

    fetchAccessLogs();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Access Log | Card RFID</title>
      </Head>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-light text-gray-800">AKSES LOG</h1>
            <p className="text-gray-500 text-sm mt-1">
              Jumlah user yang berhasil membuka pintu: <strong>{totalGrantedUsers}</strong>
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Card ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pintu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Akses</th>
                  <th className="px-6 py-3 ml-2  text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{log.user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.rfidCard.card_number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.door.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {log.status === 'success' ? 'Granted' : 'Denied'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {log.accessed_at}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </Layout>
  );
}
