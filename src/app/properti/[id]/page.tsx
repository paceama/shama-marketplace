"use client";

import NextImage from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { properties } from '@/data/properties';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice } from '@/utils/currency';
import FadeIn from '@/components/FadeIn';
import { useAuth } from '@/context/AuthContext';

export default function PropertyDetail() {
  const params = useParams();
  const { language, t } = useLanguage();
  const { user, openLoginModal } = useAuth();
  
  // Data Properti
  const propertyId = Number(params.id);
  const property = properties.find((p) => p.id === propertyId);

  // State Booking & Voucher
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle'|'submitting'|'success'>('idle');
  
  // State Form Booking
  const [inputVoucher, setInputVoucher] = useState('');
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  
  // Reset state saat properti berubah atau modal ditutup
  useEffect(() => {
    if (property) {
      setFinalPrice(property.price);
      setIsVoucherApplied(false);
      setDiscountAmount(0);
      setInputVoucher('');
    }
  }, [property, isBookingOpen]);

  if (!params?.id || !property) return null;

  const currentTitle = property.title[language === 'EN' ? 'en' : 'id'];
  const currentSpecs = property.specs[language === 'EN' ? 'en' : 'id'];

  // --- LOGIC BUKA MODAL ---
  const handleOpenBooking = () => {
    if (!user) {
      openLoginModal(); // Paksa login dulu
    } else {
      setIsBookingOpen(true);
    }
  };

  // --- LOGIC CEK VOUCHER ---
  const handleApplyVoucher = () => {
    // Simulasi: Kode valid adalah kode yang ada di data properti (properties.ts)
    // Atau kode global misal "SHAMA2025"
    const validCode = property.promoCode || "SHAMA2025"; 

    if (inputVoucher === validCode) {
      // Diskon 5% untuk simulasi
      const discount = property.price * 0.05; 
      setDiscountAmount(discount);
      setFinalPrice(property.price - discount);
      setIsVoucherApplied(true);
    } else {
      alert("Kode Voucher tidak valid atau kadaluarsa.");
      setIsVoucherApplied(false);
      setFinalPrice(property.price);
    }
  };

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus('submitting');
    setTimeout(() => {
      setBookingStatus('success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      
      {/* 1. HERO IMAGE */}
      <div className="relative w-full h-[60vh] mt-0">
        <NextImage 
          src={property.image}
          alt={currentTitle}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white max-w-7xl mx-auto z-10">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
               <span className="bg-indigo-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                 {property.type}
               </span>
               <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold border border-white/30">
                 {property.location}
               </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-md">{currentTitle}</h1>
            <p className="text-xl opacity-90 font-medium">{formatPrice(property.price, language)}</p>
          </FadeIn>
        </div>
      </div>

      {/* 2. CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* KOLOM KIRI: Deskripsi */}
        <div className="lg:col-span-2 space-y-10">
          <FadeIn delay={0.2}>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                  {language === 'EN' ? 'Description' : 'Deskripsi Properti'}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {language === 'EN' 
                    ? `Experience luxury living in this stunning property located in ${property.location}. Features include ${currentSpecs}. Perfect for investment or private living.`
                    : `Nikmati hunian mewah di properti menakjubkan yang berlokasi di ${property.location}. Fitur termasuk ${currentSpecs}. Sangat cocok untuk investasi atau tempat tinggal pribadi.`
                  }
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                   <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-xs text-gray-500 uppercase font-bold">Luas Tanah</p>
                      <p className="text-gray-900 font-bold">500 m²</p>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-xs text-gray-500 uppercase font-bold">Sertifikat</p>
                      <p className="text-gray-900 font-bold">SHM (Freehold)</p>
                   </div>
                </div>
            </div>
          </FadeIn>
        </div>

        {/* KOLOM KANAN: SIDEBAR */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* A. CARD BOOKING (Updated) */}
          <FadeIn delay={0.3}>
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
               <p className="text-sm text-gray-500 mb-1 relative z-10">{t('priceStart')}</p>
               <div className="text-3xl font-bold text-indigo-600 mb-6 relative z-10">
                 {formatPrice(property.price, language)}
               </div>
               
               {/* TOMBOL BOOKING NOW */}
               <button 
                 onClick={handleOpenBooking}
                 className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 active:scale-95 text-lg flex justify-center items-center gap-2"
               >
                  <span>📅</span> Booking Now
               </button>
               <p className="text-center text-xs text-gray-400 mt-3">
                 {language === 'EN' ? 'Secure this property today' : 'Amankan properti ini hari ini'}
               </p>
            </div>
          </FadeIn>

          {/* B. CARD AGEN */}
          <FadeIn delay={0.4}>
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Listing Agent</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-100 p-1">
                  <NextImage src={property.agent.photo} alt={property.agent.name} fill className="object-cover rounded-full" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{property.agent.name}</h4>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full w-fit mt-1">
                    <span>✓</span> Verified Agent
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                 <button className="flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition shadow-lg shadow-emerald-200">WhatsApp</button>
                 <button className="flex items-center justify-center gap-2 border-2 border-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:border-gray-300 hover:bg-gray-50 transition">Call</button>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>

      {/* --- 3. MODAL BOOKING & VOUCHER --- */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all animate-in fade-in">
           <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg relative overflow-hidden flex flex-col max-h-[90vh]">
              
              {/* Header Modal */}
              <div className="bg-gray-50 px-8 py-5 border-b border-gray-100 flex justify-between items-center">
                 <h3 className="font-bold text-lg text-gray-800">Booking Confirmation</h3>
                 <button 
                    onClick={() => { setIsBookingOpen(false); setBookingStatus('idle'); }}
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full text-gray-600 transition"
                  >
                    ✕
                  </button>
              </div>

              <div className="p-8 overflow-y-auto">
                 {bookingStatus === 'success' ? (
                    // TAMPILAN SUKSES
                    <div className="text-center py-10">
                       <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl animate-in zoom-in">✅</div>
                       <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Berhasil!</h3>
                       <p className="text-gray-500 mb-6">Kode booking Anda telah dikirim ke email. Agen kami akan segera menghubungi untuk proses pembayaran DP.</p>
                       <div className="bg-gray-100 p-4 rounded-xl mb-6">
                          <p className="text-xs text-gray-500 uppercase font-bold">Total Deal</p>
                          <p className="text-xl font-bold text-indigo-600">{formatPrice(finalPrice, language)}</p>
                       </div>
                       <button onClick={() => setIsBookingOpen(false)} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition">Selesai</button>
                    </div>
                 ) : (
                    // FORMULIR BOOKING
                    <>
                      <div className="flex gap-4 mb-6 bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                         <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                            <NextImage src={property.image} alt="Thumb" fill className="object-cover" />
                         </div>
                         <div>
                            <h4 className="font-bold text-gray-900 line-clamp-1">{currentTitle}</h4>
                            <p className="text-xs text-gray-500 mb-1">{property.location}</p>
                            <p className="text-indigo-600 font-bold">{formatPrice(property.price, language)}</p>
                         </div>
                      </div>
                      
                      <form onSubmit={submitBooking} className="space-y-6">
                         
                         {/* SECTION 1: VOUCHER */}
                         <div className="space-y-3 pb-6 border-b border-gray-100">
                            <label className="block text-xs font-bold text-gray-500 uppercase">Kode Voucher Marketing</label>
                            <div className="flex gap-2">
                               <input 
                                 type="text" 
                                 placeholder="Masukkan Kode (e.g. SHAMA2025)" 
                                 className={`w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition uppercase font-medium ${isVoucherApplied ? 'border-green-500 text-green-700 bg-green-50' : 'border-gray-200'}`}
                                 value={inputVoucher}
                                 onChange={(e) => setInputVoucher(e.target.value)}
                                 disabled={isVoucherApplied}
                               />
                               <button 
                                 type="button"
                                 onClick={handleApplyVoucher}
                                 disabled={isVoucherApplied || !inputVoucher}
                                 className={`px-4 py-2 rounded-xl font-bold text-sm transition ${isVoucherApplied ? 'bg-green-100 text-green-700 cursor-default' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                               >
                                 {isVoucherApplied ? 'Applied' : 'Pakai'}
                               </button>
                            </div>
                            {isVoucherApplied && (
                                <div className="flex justify-between items-center text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
                                   <span>Potongan Voucher</span>
                                   <span>- {formatPrice(discountAmount, language)}</span>
                                </div>
                            )}
                         </div>

                         {/* SECTION 2: SCHEDULE */}
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tanggal</label>
                                <input required type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Jam</label>
                                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500">
                                   <option>09:00</option>
                                   <option>11:00</option>
                                   <option>14:00</option>
                                   <option>16:00</option>
                                </select>
                            </div>
                         </div>

                         {/* SECTION 3: TOTAL & SUBMIT */}
                         <div className="bg-indigo-50 p-4 rounded-xl flex justify-between items-center">
                            <span className="text-sm font-bold text-indigo-900">Total Harga</span>
                            <div className="text-right">
                               {isVoucherApplied && (
                                 <span className="block text-xs text-gray-400 line-through">{formatPrice(property.price, language)}</span>
                               )}
                               <span className="text-xl font-extrabold text-indigo-700">{formatPrice(finalPrice, language)}</span>
                            </div>
                         </div>
                         
                         <button 
                           type="submit" 
                           disabled={bookingStatus === 'submitting'}
                           className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                         >
                           {bookingStatus === 'submitting' ? 'Memproses...' : 'Konfirmasi Booking'}
                         </button>
                      </form>
                    </>
                 )}
              </div>
           </div>
        </div>
      )}

    </div>
  );
}