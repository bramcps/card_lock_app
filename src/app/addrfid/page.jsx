'use client';
import { useEffect, useState } from 'react';
import { api, useAuth } from '@/hooks/useAuth';
import Link from "next/link";


export default function AddRFIDCardPage() {
  const [cardData, setCardData] = useState({
    card_number: '',
    card_name: '',
    user_id: '',
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { listUsers } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { success, data } = await listUsers();
    if (success) {
      setUsers(data.data || []);
    } else {
      console.error("Gagal memuat users");
    }
  };

  const handleChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/rfid_cards", cardData);
      alert("Kartu RFID berhasil ditambahkan!");
      setCardData({ card_number: '', card_name: '', user_id: '' });
    } catch (error) {
      console.error("Gagal menambahkan kartu:", error);
      alert(error.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Tambah Kartu RFID
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Nomor Kartu</label>
            <input
              type="text"
              name="card_number"
              placeholder="your_cardnumber"
              value={cardData.card_number}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50  text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Nama Kartu</label>
            <input
              type="text"
              name="card_name"
              placeholder="your_cardname"
              value={cardData.card_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50  text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Pemilik (User)</label>
            <select
              name="user_id"
              value={cardData.user_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50  text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="">Pilih User</option>
              {users.filter(user => user.role === 'user').map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
          <div className='flex gap-5'>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? "Menyimpan..." : "Tambah Kartu"}
          </button>
          <Link
            href="/users"
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Batal
          </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
