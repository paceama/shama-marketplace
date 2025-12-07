"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext'; // Tambahkan Import ini
import { properties } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import FadeIn from '@/components/FadeIn';
import { formatPrice } from '@/utils/currency';

// Tipe Tab Menu
type Tab = 'profile' | 'documents' | 'favorites' | 'bookings';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { language } = useLanguage(); // Gunakan hook ini untuk format harga
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  // Proteksi: Jika tidak ada user, lempar ke Home
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user) {
        router.push('/');
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [user, router]);

  if (!user) return null;

  // --- DUMMY DATA ---
  const favoriteProperties = properties.slice(0, 2);

  const myBookings = [
    { id: 'BK-001', date: '2025-12-10', property: properties[0], status: 'Menunggu Konfirmasi', payment: 'Unpaid' },
    { id: 'BK-002', date: '2025-11-20', property: properties[2], status: 'Selesai Survey', payment: 'Paid' },
  ];

  const myDocuments = [
    { id: 1, name: 'KTP - Budi Santoso.jpg', status: 'Verified', date: '2025-01-10' },
    { id: 2, name: 'NPWP.pdf', status: 'Reviewing', date: '2025-12-05' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      
      {/* Spacer untuk Navbar Fixed */}
      <div className="h-24 bg-[#0B1120]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* === SIDEBAR MENU === */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sticky top-28">
              
              {/* User Info Kecil */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-100 relative">
                   <NextImage src={user.avatar} alt="User" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{user.name}</h3>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase rounded-full tracking-wider">
                    {user.role === 'buyer' ? 'Pembeli' : 'Agen'}
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="space-y-2">
                {[
                  { id: 'profile', label: 'Data Diri', icon: '👤' },
                  { id: 'documents', label: 'Berkas Saya', icon: '📂' },
                  { id: 'bookings', label: 'Pesanan & Booking', icon: '📅' },
                  { id: 'favorites', label: 'Properti Favorit', icon: '❤️' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as Tab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      activeTab === item.id 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-indigo-600'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
                
                <button 
                  onClick={() => { logout(); router.push('/'); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-all mt-8"
                >
                  <span>🚪</span> Keluar
                </button>
              </nav>
            </div>
          </aside>

          {/* === MAIN CONTENT === */}
          <main className="w-full lg:w-3/4">
            <FadeIn key={activeTab}>
              
              {/* 1. TAB PROFILE */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Diri</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Nama Lengkap</label>
                        <input type="text" defaultValue={user.name} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                        <input type="email" defaultValue={user.email} disabled className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">No. Telepon</label>
                        <input type="tel" defaultValue="+62 812 3456 7890" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Pekerjaan</label>
                        <input type="text" defaultValue="Entrepreneur" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Alamat</label>
                        <textarea rows={3} defaultValue="Jl. Sudirman No. 45, Jakarta Selatan" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
                    </div>
                    <div className="flex justify-end">
                      <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg">Simpan Perubahan</button>
                    </div>
                  </form>
                </div>
              )}

              {/* 2. TAB DOCUMENTS */}
              {activeTab === 'documents' && (
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Berkas Saya</h2>
                    <button className="text-sm bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-bold hover:bg-indigo-100 transition">
                      + Upload Baru
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {myDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:border-indigo-500 transition group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-xl">📄</div>
                          <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition">{doc.name}</h4>
                            <p className="text-xs text-gray-500">Uploaded on {doc.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            doc.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {doc.status}
                          </span>
                          <button className="text-gray-400 hover:text-red-500">🗑️</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-3">
                    <span className="text-2xl">ℹ️</span>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      Pastikan berkas KTP dan NPWP Anda terlihat jelas. Dokumen ini diperlukan untuk proses verifikasi pembelian properti dan administrasi notaris.
                    </p>
                  </div>
                </div>
              )}

              {/* 3. TAB BOOKINGS */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 px-2">Riwayat Booking</h2>
                  {myBookings.map((book) => (
                    <div key={book.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Image Thumbnail */}
                        <div className="w-full md:w-48 h-32 relative rounded-xl overflow-hidden shrink-0">
                           <NextImage src={book.property.image} alt="Thumb" fill className="object-cover" />
                        </div>
                        
                        {/* Detail */}
                        <div className="grow">
                           <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg text-gray-900">{book.property.title[language === 'EN' ? 'en' : 'id']}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                book.status === 'Selesai Survey' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                              }`}>
                                {book.status}
                              </span>
                           </div>
                           <p className="text-gray-500 text-sm mb-4">📅 Jadwal Survey: {book.date}</p>
                           {/* PERBAIKAN: Gunakan variable 'language' dari context, BUKAN string 'IDR' */}
                           <p className="text-indigo-600 font-bold text-lg">{formatPrice(book.property.price, language)}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 justify-center min-w-[140px]">
                           <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 transition">
                             Detail
                           </button>
                           <button className="w-full border border-gray-200 text-gray-600 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 transition">
                             Hubungi Agen
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 4. TAB FAVORITES */}
              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 px-2">Properti Disukai</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteProperties.map((item) => (
                      <PropertyCard key={item.id} property={item} />
                    ))}
                  </div>
                </div>
              )}

            </FadeIn>
          </main>

        </div>
      </div>
    </div>
  );
}