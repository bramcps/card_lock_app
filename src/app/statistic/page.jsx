// import jangan di rubah
'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { Calendar, Search, User } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { api } from "@/hooks/useAuth";
// import jangan di rubah


export default function StatisticPage() {
  const [filter, setFilter] = useState('Hari');
  const [chartData, setChartData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [accessLogs, setAccessLogs] = useState([]);

  // fecth data untuk mengambil data dari api log access
  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await api.get("access_logs/statistics?filter=${filter}");
        setChartData(res.data || []);
      } catch (err) {
        console.error("Gagal mengambil data statistik:", err);
      }
    };

    fetchChart();
  }, [filter]);

  // fecth data untuk mengambil data dari api log access
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get("access_logs/statistics?filter=${filter}");
        setAccessLogs(res.data?.data || []);
      } catch (err) {
        console.error("Gagal mengambil log akses:", err);
      }
    };

    fetchLogs();
  }, []);

  // Filtered logs
  const filteredLogs = accessLogs.filter(log =>
    log.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.rfid_card?.card_number?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <Head>
        <title>Statistik Akses | RFID</title>
      </Head>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-light text-gray-800">Statistik Akses</h1>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700"
          >
            <option value="Hari">Hari</option>
            <option value="Minggu">Minggu</option>
            <option value="Bulan">Bulan</option>
          </select>
        </div>

        {/* Grafik */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}
