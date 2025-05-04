'use client';
import { useState } from 'react';
import Head from 'next/head';
import { DoorOpen, DoorClosed } from 'lucide-react';
import { BarChart as Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';


export default function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState('General');
  const [selectedCountry, setSelectedCountry] = useState('Canada');
  const [selectedPeriod, setSelectedPeriod] = useState('This month');
  const doorStatus = 'false';
  const isOpen = doorStatus === 'open';

  const unitsByStatus = [
    { name: 'gray', value: 21, color: '#71717A' },
    { name: 'stone', value: 11, color: '#A1A1AA' },
    { name: 'black', value: 28, color: '#18181B' }
  ];

  return (
    <Layout>
      <Head>
        <title>Dashboard | Card RFID</title>
      </Head>

      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-light text-gray-800">DASHBOARD</h1>
        </div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center justify-between px-6 py-4 rounded-2xl shadow-lg border
            ${isOpen ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
        >
          <div className="flex items-center">
            {isOpen ? (
              <DoorOpen className="w-10 h-10 text-green-600 animate-pulse" />
            ) : (
              <DoorClosed className="w-10 h-10 text-red-600 animate-pulse" />
            )}
            <div className="ml-4">
              <h2 className={`text-xl font-bold ${isOpen ? 'text-green-700' : 'text-red-700'}`}>
                {isOpen ? 'Pintu Terbuka' : 'Pintu Tertutup'}
              </h2>
              <p className="text-gray-500 text-sm">Diperbarui secara otomatis</p>
            </div>
          </div>

          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
              ${isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
          >
            {isOpen ? 'AKTIF' : 'TERKUNCI'}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
            PEWARNAAN PADA WEB</h2>
            <div className="flex">
              <div className="h-64 w-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={unitsByStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {unitsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="ml-6 flex flex-col justify-center">
                {unitsByStatus.map((unit, index) => (
                  <div key={index} className="flex items-center mb-3">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: unit.color }}></div>
                    <span className="text-sm text-gray-600">{unit.name}</span>
                    <span className="ml-auto font-medium">{unit.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
