"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";
import { api } from "@/hooks/useAuth";

export default function UserManager() {
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, [currentPage]);

  const fetchCards = async () => {
    try {
      const response = await api.get("/rfid_cards");
      console.log(response.data);
      setCards(response.data.cards.data || []); // akses .data dari cards
    } catch (error) {
      console.error("Gagal memuat kartu:", error);
    }
  };

  const handleDeleteCard = async (id) => {
    if (!confirm("Yakin ingin menghapus kartu ini?")) return;
    try {
      await api.delete(`/rfid_cards/${id}`);
      setCards(cards.filter((card) => card.id !== id));
    } catch (error) {
      console.error("Gagal menghapus kartu:", error);
      alert(error.response?.data?.message || "Terjadi kesalahan saat menghapus kartu");
    }
  };

  return (
    <Layout>
      <Head>
        <title>Pusat Pengguna | Card RFID</title>
      </Head>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-light text-gray-800">Pusat Pengguna</h1>
          <div className="flex gap-5">
          <Link href="/addrfid">
            <button className="cursor-pointer bg-stone-600 hover:bg-stone-700 text-white px-4 py-2 rounded-md flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add New Card
            </button>
          </Link>
            <Link href="/adduser">
              <button className="cursor-pointer bg-stone-600 hover:bg-stone-700 text-white px-4 py-2 rounded-md flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add New User
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nomor Kartu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Kartu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pengguna</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cards.map((card) => (
                  <tr key={card.id}>
                    <td className="px-6 py-4 text-black">{card.card_number}</td>
                    <td className="px-6 py-4 text-black">{card.card_name || "-"}</td>
                    <td className="px-6 py-4">
                      {card.user ? (
                        <>
                          <div className="text-sm font-medium text-black">{card.user.name}</div>
                          <div className="text-sm text-gray-500">{card.user.email}</div>
                        </>
                      ) : (
                        <span className="text-sm text-red-500">Tidak ada user</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="cursor-pointer text-red-600 hover:text-red-800" onClick={() => handleDeleteCard(card.id)}>
                        <Trash2 className="h-5 w-5" />
                      </button>
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
