'use client';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { DoorOpen, DoorClosed } from 'lucide-react';

export default function AccessStatus() {
  const doorStatus = 'open';
  const isOpen = doorStatus === 'open';

  return (
    <Layout>
      <Head>
        <title>Status Pintu | Card RFID</title>
      </Head>
      <div className="p-8 max-w-3xl mx-auto">
        <div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-semibold text-gray-800">Status Pintu</h1>
          <p className="text-gray-500 text-sm mt-1">Pantauan real-time kondisi pintu saat ini.</p>
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
      </div>
    </Layout>
  );
}
