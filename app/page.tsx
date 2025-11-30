"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, MapPin, Home, Bed, Bath, Square, ShieldCheck, Info, 
  ChevronRight, Calculator, FileText, Camera, MessageCircle, Calendar, 
  CreditCard, User, Menu, X, Share2, Heart, ArrowRight, Star, 
  LogOut, Upload, BarChart3, Users, Building, AlertCircle, Clock,
  Search, Filter, TrendingUp, DollarSign, Briefcase, Phone, Lock, Eye,
  Move, Rotate3d, Check
} from 'lucide-react';

// --- MOCK DATA DATABASE ---

const PROPERTIES_DATA = [
  {
    id: 1,
    title: "Cluster Harmony Living - Tipe 45/90",
    price: 850000000,
    location: "Cibubur, Jakarta Timur",
    developer: "PT. Agung Podomoro Land",
    category: "Rumah",
    isVerified: true,
    isShamaMall: true,
    isFlashSale: true,
    rating: 4.8,
    reviews: 124,
    specs: { bedrooms: 2, bathrooms: 1, landSize: 90, buildingSize: 45, carport: 1, certificate: "SHM" },
    legalitas: {
        shm: { status: "Tersedia & Pecah", verified: true },
        imb: { status: "Terbit (No. 556/IMB/2023)", verified: true },
        pbb: { status: "Lunas 2024", verified: true },
        cleanAndClear: true
    },
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    panoramaImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 2,
    title: "Grand Wisata Smart Home",
    price: 1250000000,
    location: "Bekasi, Jawa Barat",
    developer: "Sinar Mas Land",
    category: "Rumah",
    isVerified: true,
    isShamaMall: true,
    isFlashSale: false,
    rating: 4.9,
    reviews: 85,
    specs: { bedrooms: 3, bathrooms: 2, landSize: 120, buildingSize: 70, carport: 2, certificate: "SHM" },
    legalitas: {
        shm: { status: "Tersedia & Pecah", verified: true },
        imb: { status: "Terbit", verified: true },
        pbb: { status: "Lunas 2024", verified: true },
        cleanAndClear: true
    },
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    panoramaImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 3,
    title: "Apartemen Podomoro Golf View",
    price: 450000000,
    location: "Cimanggis, Depok",
    developer: "PT. Agung Podomoro Land",
    category: "Apartemen",
    isVerified: true,
    isShamaMall: false,
    isFlashSale: true,
    rating: 4.5,
    reviews: 210,
    specs: { bedrooms: 1, bathrooms: 1, landSize: 0, buildingSize: 24, carport: 0, certificate: "Strata Title" },
    legalitas: {
        shm: { status: "Strata Title (HGB)", verified: true },
        imb: { status: "Terbit Induk", verified: true },
        pbb: { status: "Lunas", verified: true },
        cleanAndClear: true
    },
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    panoramaImage: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  }
];

const INITIAL_PROGRESS_LOGS = [
  { id: 1, date: "20 Okt 2024", title: "Pemasangan Rangka Atap", status: "Selesai", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 2, date: "15 Sep 2024", title: "Penyelesaian Dinding", status: "Selesai", image: null }
];

// --- HELPER COMPONENTS ---

const PercentBadge = ({ className }: { className?: string }) => (
  <div className={`flex items-center justify-center font-bold text-[10px] border-2 border-current rounded-full w-6 h-6 ${className}`}>%</div>
);

const PropertyCard = ({ property, onClick }: { property: any, onClick: () => void }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all cursor-pointer group" onClick={onClick}>
     <div className="h-48 relative overflow-hidden">
        <img src={property.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
        <div className="absolute top-3 left-3 flex flex-col gap-1">
           {property.isShamaMall && <span className="bg-indigo-600/90 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1"><ShieldCheck size={10}/> Shama Mall</span>}
           {property.isFlashSale && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1"><TrendingUp size={10}/> Flash Sale</span>}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-current"/> {property.rating}</div>
     </div>
     <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{property.developer}</p>
        <h3 className="font-bold text-slate-900 mb-1 truncate">{property.title}</h3>
        <p className="text-indigo-600 font-bold text-lg mb-3">
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(property.price)}
        </p>
        <div className="flex gap-3 text-xs text-gray-500 border-t pt-3">
           <span className="flex items-center gap-1"><Bed size={14}/> {property.specs.bedrooms} KT</span>
           <span className="flex items-center gap-1"><Bath size={14}/> {property.specs.bathrooms} KM</span>
           <span className="flex items-center gap-1"><Square size={14}/> {property.specs.buildingSize}m²</span>
        </div>
     </div>
  </div>
);

const Navbar = ({ scrollPosition, currentView, currentUser, handleNavigate, handleLogout, setShowLoginModal }: any) => (
  <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollPosition > 20 || currentView !== 'home' ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 border-b' : 'bg-transparent py-6'}`}>
    <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('home')}>
        <div className="bg-indigo-600 text-white p-1.5 rounded-lg font-bold text-xl">S</div>
        <span className={`font-bold text-xl ${scrollPosition > 20 || currentView !== 'home' ? 'text-indigo-900' : 'text-white'}`}>Shama</span>
      </div>
      
      <div className={`hidden md:flex space-x-1 text-sm font-medium ${scrollPosition > 20 || currentView !== 'home' ? 'text-gray-600' : 'text-white/90'}`}>
         <button onClick={() => handleNavigate('search')} className="hover:bg-white/20 px-4 py-2 rounded-full">Beli Rumah</button>
         <button onClick={() => handleNavigate('sell')} className="hover:bg-white/20 px-4 py-2 rounded-full">Jual Properti</button>
         <button onClick={() => handleNavigate('kpr')} className="hover:bg-white/20 px-4 py-2 rounded-full">Simulasi KPR</button>
         <button onClick={() => handleNavigate('legal')} className="hover:bg-white/20 px-4 py-2 rounded-full">Cek Legalitas</button>
      </div>

      <div className="flex items-center gap-3">
         {currentUser ? (
            <div className="flex items-center gap-3">
               <button 
                 onClick={() => {
                    if (currentUser.role === 'admin') handleNavigate('admin-dashboard');
                    else if (currentUser.role === 'developer') handleNavigate('developer-dashboard');
                    else handleNavigate('user-dashboard');
                 }} 
                 className={`text-sm font-medium px-4 py-2 rounded-full ${scrollPosition > 20 || currentView !== 'home' ? 'bg-gray-100 text-gray-800' : 'bg-white/20 text-white'}`}
               >
                 Dashboard
               </button>
               <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">{currentUser.name[0]}</div>
               <button onClick={handleLogout} className="text-gray-400 hover:text-red-500"><LogOut size={18}/></button>
            </div>
         ) : (
            <button onClick={() => setShowLoginModal(true)} className="px-5 py-2.5 text-sm font-bold text-indigo-600 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-all">Masuk</button>
         )}
      </div>
    </div>
  </nav>
);

const BookingFlow = ({ selectedPropertyId, setShowBookingModal, handleBookingSuccess }: any) => {
  const [step, setStep] = useState(1);
  const property = PROPERTIES_DATA.find(p => p.id === selectedPropertyId) || PROPERTIES_DATA[0];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-4 border-b flex justify-between">
          <h3 className="font-bold">Booking Unit</h3>
          <button onClick={() => setShowBookingModal(false)}><X size={20}/></button>
        </div>
        <div className="p-6">
          {step === 1 && (
             <div className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded-xl">
                   <p className="font-bold">{property.title}</p>
                   <p className="text-sm text-gray-500">{property.location}</p>
                   <div className="flex justify-between mt-2 pt-2 border-t border-indigo-200 font-bold"><span>Biaya Booking</span><span className="text-orange-600">Rp 5.000.000</span></div>
                </div>
                <button onClick={() => setStep(2)} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold">Lanjut Bayar</button>
             </div>
          )}
          {step === 2 && (
             <div className="space-y-3">
                {['BCA Virtual Account', 'Mandiri VA', 'QRIS'].map(m => (
                   <button key={m} onClick={() => setStep(3)} className="w-full p-4 border rounded-xl flex justify-between hover:border-indigo-500 text-sm font-bold">{m} <ChevronRight size={16}/></button>
                ))}
             </div>
          )}
          {step === 3 && (
             <div className="text-center py-4">
                <CheckCircle size={48} className="mx-auto text-emerald-500 mb-4"/>
                <h4 className="font-bold text-xl">Pembayaran Berhasil!</h4>
                <p className="text-gray-500 text-sm mb-6">Unit berhasil dikunci untuk Anda.</p>
                <button onClick={() => handleBookingSuccess(property)} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold">Selesai</button>
             </div>
          )}
        </div>
      </div>
    </div>
  )
};

const LoginModal = ({ setShowLoginModal, handleLogin }: any) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
     <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl relative">
        <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-gray-400"><X size={20}/></button>
        <h3 className="text-xl font-bold text-center mb-6">Masuk ke Shama</h3>
        <div className="space-y-3">
           <button onClick={() => handleLogin('user')} className="w-full p-4 border rounded-xl hover:bg-indigo-50 text-left font-bold text-slate-700 flex gap-3 items-center group transition-colors">
              <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600 group-hover:bg-white"><User size={20}/></div>
              <div><p>Pembeli (User)</p><p className="text-xs text-gray-400 font-normal">Cari & Booking Rumah</p></div>
           </button>
           <button onClick={() => handleLogin('developer')} className="w-full p-4 border rounded-xl hover:bg-orange-50 text-left font-bold text-slate-700 flex gap-3 items-center group transition-colors">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600 group-hover:bg-white"><Building size={20}/></div>
              <div><p>Developer</p><p className="text-xs text-gray-400 font-normal">Jual & Update Progress</p></div>
           </button>
           <button onClick={() => handleLogin('admin')} className="w-full p-4 border rounded-xl hover:bg-slate-50 text-left font-bold text-slate-700 flex gap-3 items-center group transition-colors">
              <div className="bg-slate-200 p-2 rounded-lg text-slate-600 group-hover:bg-white"><Lock size={20}/></div>
              <div><p>Admin Shama</p><p className="text-xs text-gray-400 font-normal">Verifikasi & Escrow</p></div>
           </button>
        </div>
     </div>
  </div>
);

// --- PAGE COMPONENTS ---

const HomePage = ({ handleNavigate }: any) => (
  <div className="pb-12">
    <div className="relative h-[550px] bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent z-10"></div>
      <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" className="absolute inset-0 w-full h-full object-cover" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl animate-in slide-in-from-bottom-10 duration-700">
           <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block tracking-wider">NEW WAY TO BUY HOME</span>
           <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Beli Rumah Semudah <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Checkout Online</span></h1>
           <p className="text-lg text-gray-300 mb-8 leading-relaxed">Platform properti pertama di Indonesia dengan transparansi harga total, sistem booking online, dan jaminan keamanan legalitas 100%.</p>
           
           <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 max-w-xl">
             <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-100 py-3 md:py-0">
                <MapPin className="text-gray-400 mr-3" size={20}/>
                <input type="text" placeholder="Lokasi (mis: Cibubur)" className="w-full outline-none text-gray-700 font-medium"/>
             </div>
             <button onClick={() => handleNavigate('search')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
               Cari <Search size={18}/>
             </button>
           </div>
           
           <div className="mt-8 flex gap-6 text-gray-400 text-sm font-medium">
             <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500"/> Verified Developer</span>
             <span className="flex items-center gap-2"><CreditCard size={16} className="text-blue-500"/> Aman dengan Escrow</span>
           </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-30 mb-16">
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{icon: Home, label: "Rumah Tapak"}, {icon: Building, label: "Apartemen"}, {icon: Briefcase, label: "Ruko & Komersial"}, {icon: PercentBadge, label: "Take Over KPR"}].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => handleNavigate('search')}>
               <div className="bg-indigo-50 p-4 rounded-full text-indigo-600 mb-3"><item.icon size={24}/></div>
               <h3 className="font-bold text-slate-800">{item.label}</h3>
            </div>
          ))}
       </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 mb-16">
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-3">
           <div className="bg-red-600 text-white p-2 rounded-lg"><TrendingUp size={24}/></div>
           <div>
             <h2 className="text-2xl font-bold text-slate-900">Flash Sale Properti</h2>
             <p className="text-gray-500 text-sm">Diskon booking fee khusus hari ini</p>
           </div>
         </div>
         <div className="flex items-center gap-2 text-red-600 font-mono font-bold bg-red-50 px-3 py-1 rounded-lg">
            <Clock size={16}/> 04:23:10
         </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {PROPERTIES_DATA.filter(p => p.isFlashSale).map(property => (
           <PropertyCard key={property.id} property={property} onClick={() => handleNavigate('detail', property.id)} />
         ))}
      </div>
    </div>

    <div className="bg-slate-50 py-16 mb-16">
      <div className="max-w-7xl mx-auto px-4">
         <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">Shama Mall</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-4">Properti Pilihan Terverifikasi</h2>
            <p className="text-gray-500">Hanya menampilkan listing dari developer yang telah lolos verifikasi legalitas 100% (Clean & Clear) oleh tim hukum Shama.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {PROPERTIES_DATA.map(property => (
               <PropertyCard key={property.id} property={property} onClick={() => handleNavigate('detail', property.id)} />
            ))}
         </div>
         <div className="text-center mt-12">
            <button onClick={() => handleNavigate('search')} className="border-2 border-slate-900 text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-900 hover:text-white transition-all">Lihat Semua Properti</button>
         </div>
      </div>
    </div>
  </div>
);

const ExplorePage = ({ handleNavigate }: any) => (
  <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
       <div>
          <h1 className="text-2xl font-bold text-slate-900">Jelajah Properti</h1>
          <p className="text-gray-500">Menampilkan {PROPERTIES_DATA.length} properti di Jabodetabek</p>
       </div>
       <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm font-medium"><Filter size={16}/> Filter</button>
          <select className="px-4 py-2 border rounded-lg bg-white text-sm font-medium outline-none">
            <option>Harga Terendah</option>
            <option>Harga Tertinggi</option>
            <option>Terpopuler</option>
          </select>
       </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
       <div className="hidden md:block space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="font-bold mb-4">Lokasi</h3>
             <div className="space-y-2 text-sm text-gray-600">
                <label className="flex items-center gap-2"><input type="checkbox"/> Jakarta Selatan</label>
                <label className="flex items-center gap-2"><input type="checkbox"/> Cibubur</label>
                <label className="flex items-center gap-2"><input type="checkbox"/> Tangerang</label>
             </div>
          </div>
       </div>
       <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROPERTIES_DATA.map(property => (
             <PropertyCard key={property.id} property={property} onClick={() => handleNavigate('detail', property.id)} />
          ))}
       </div>
    </div>
  </div>
);

const SellPage = () => (
  <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
     <div className="bg-indigo-600 rounded-3xl p-8 md:p-16 text-white text-center mb-12 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
           <h1 className="text-3xl md:text-5xl font-bold mb-6">Jual Properti Anda di Shama</h1>
           <p className="text-indigo-100 text-lg mb-8">Dapatkan akses ke ribuan pembeli serius yang telah terverifikasi. Proses cepat, transparan, dan aman.</p>
           <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">Daftar Sebagai Partner</button>
        </div>
     </div>
     
     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
        <div>
           <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><Users size={32}/></div>
           <h3 className="font-bold text-lg">Verified Leads</h3>
           <p className="text-gray-500 text-sm">Kami menyaring pembeli dengan BI Checking awal, sehingga Anda hanya berurusan dengan prospek serius.</p>
        </div>
        <div>
           <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4"><Clock size={32}/></div>
           <h3 className="font-bold text-lg">Cepat Terjual</h3>
           <p className="text-gray-500 text-sm">Fitur Flash Sale dan notifikasi real-time mempercepat siklus penjualan properti Anda.</p>
        </div>
        <div>
           <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"><BarChart3 size={32}/></div>
           <h3 className="font-bold text-lg">Dashboard Pintar</h3>
           <p className="text-gray-500 text-sm">Pantau performa listing, atur stok unit, dan update progres pembangunan dalam satu aplikasi.</p>
        </div>
     </div>
  </div>
);

const LegalPage = () => (
  <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
     <h1 className="text-3xl font-bold text-slate-900 mb-6">Standar Legalitas Shama</h1>
     <div className="prose prose-lg text-gray-600">
       <p>Di Shama Marketplace, keamanan transaksi adalah prioritas utama. Kami menerapkan standar "Clean & Clear" sebelum sebuah properti bisa ditampilkan dengan badge <strong>Shama Mall</strong>.</p>
       
       <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 my-8">
          <h3 className="font-bold text-emerald-800 text-xl mb-4">Proses Verifikasi Kami</h3>
          <ul className="space-y-3">
             <li className="flex items-center gap-3"><CheckCircle className="text-emerald-600" size={20}/> Pengecekan Keaslian Sertifikat (SHM/HGB) ke BPN.</li>
             <li className="flex items-center gap-3"><CheckCircle className="text-emerald-600" size={20}/> Verifikasi IMB/PBG sesuai dengan fisik bangunan.</li>
             <li className="flex items-center gap-3"><CheckCircle className="text-emerald-600" size={20}/> Pengecekan Status Sengketa Lahan.</li>
             <li className="flex items-center gap-3"><CheckCircle className="text-emerald-600" size={20}/> Kredibilitas Developer (Track Record).</li>
          </ul>
       </div>

       <h3>Rekening Bersama (Escrow)</h3>
       <p>Uang Booking Fee dan DP yang Anda bayarkan tidak langsung diteruskan ke Developer. Dana tersebut ditahan di Rekening Escrow Shama hingga:</p>
       <ol>
         <li>Berkas KPR Anda disetujui Bank (SP3K).</li>
         <li>Penandatanganan SPR (Surat Pemesanan Rumah) selesai.</li>
       </ol>
       <p>Jika KPR ditolak, dana Booking Fee dikembalikan 100%.</p>
     </div>
  </div>
);

const KPRPage = () => {
  const [price, setPrice] = useState(850000000);
  const [dpPercent, setDpPercent] = useState(20);
  const [tenor, setTenor] = useState(15);
  const [interest, setInterest] = useState(4.5);

  const dpAmount = price * (dpPercent / 100);
  const loanAmount = price - dpAmount;
  const monthlyInterest = (interest / 100) / 12;
  const months = tenor * 12;
  const monthlyPayment = (loanAmount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -months));

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  return (
    <div className="pt-24 pb-12 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-10">
         <h1 className="text-3xl font-bold text-slate-900 mb-2">Simulasi KPR</h1>
         <p className="text-gray-500">Hitung estimasi cicilan rumah impian Anda dengan akurat.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
         <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Harga Properti</label>
                  <div className="flex items-center border rounded-xl px-4 py-3 bg-gray-50">
                     <span className="text-gray-500 mr-2">Rp</span>
                     <input 
                       type="number" 
                       value={price} 
                       onChange={(e) => setPrice(Number(e.target.value))}
                       className="w-full bg-transparent outline-none font-bold text-slate-800"
                     />
                  </div>
               </div>
               
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Uang Muka (DP) {dpPercent}%</label>
                  <input type="range" min="0" max="50" value={dpPercent} onChange={(e) => setDpPercent(Number(e.target.value))} className="w-full accent-indigo-600 mb-2"/>
                  <p className="text-right text-indigo-600 font-bold text-sm">{formatRupiah(dpAmount)}</p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">Bunga (%)</label>
                     <input type="number" value={interest} onChange={(e) => setInterest(Number(e.target.value))} className="w-full border rounded-xl px-4 py-3 bg-gray-50 outline-none"/>
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">Tenor (Tahun)</label>
                     <select value={tenor} onChange={(e) => setTenor(Number(e.target.value))} className="w-full border rounded-xl px-4 py-3 bg-gray-50 outline-none">
                        <option value="5">5 Tahun</option>
                        <option value="10">10 Tahun</option>
                        <option value="15">15 Tahun</option>
                        <option value="20">20 Tahun</option>
                     </select>
                  </div>
               </div>
            </div>

            <div className="bg-indigo-900 rounded-2xl p-8 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
               <p className="text-indigo-200 text-sm mb-2">Estimasi Cicilan per Bulan</p>
               <h2 className="text-4xl font-bold mb-6">{formatRupiah(monthlyPayment)}</h2>
               
               <div className="w-full space-y-3 text-sm text-indigo-100 border-t border-indigo-800 pt-4">
                  <div className="flex justify-between"><span>Pokok Pinjaman</span><span>{formatRupiah(loanAmount)}</span></div>
                  <div className="flex justify-between"><span>Total Bunga</span><span>{formatRupiah((monthlyPayment * months) - loanAmount)}</span></div>
               </div>
               
               <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl mt-6 transition-colors">
                  Cari Rumah Sesuai Budget
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

const DetailPage = ({ selectedPropertyId, currentUser, setShowBookingModal, setShowLoginModal, currentProgress, progressLogs, handleNavigate }: any) => {
  const property = PROPERTIES_DATA.find(p => p.id === selectedPropertyId) || PROPERTIES_DATA[0];
  const [isCalcOpen, setIsCalcOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Deskripsi');
  const [showTourModal, setShowTourModal] = useState(false);

  const ppn = property.price * 0.11;
  const bphtb = (property.price - 60000000) * 0.05;
  const notary = property.price * 0.01;
  const total = property.price + ppn + (bphtb > 0 ? bphtb : 0) + notary;

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  return (
    <div className="pb-20">
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
              <div>
                 <button onClick={() => handleNavigate('search')} className="text-sm text-gray-500 mb-2 hover:text-indigo-600 flex items-center gap-1"><ChevronRight size={14} className="rotate-180"/> Kembali ke Pencarian</button>
                 <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{property.title}</h1>
                 <p className="flex items-center text-gray-500 mt-2 text-sm"><MapPin size={16} className="mr-1 text-indigo-500" /> {property.location}</p>
              </div>
              <div className="flex gap-2">
                 <button className="p-3 rounded-full bg-white border hover:bg-gray-50"><Share2 size={20}/></button>
                 <button className="p-3 rounded-full bg-white border hover:bg-gray-50 text-red-500"><Heart size={20}/></button>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] rounded-3xl overflow-hidden shadow-lg relative">
              <div className="md:col-span-2 md:row-span-2 relative h-full">
                  <img src={property.images[0]} className="w-full h-full object-cover"/>
                  {property.isShamaMall && <span className="absolute top-4 left-4 bg-indigo-600/90 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1"><ShieldCheck size={14} /> Shama Mall Verified</span>}
              </div>
              <div className="hidden md:block relative h-full"><img src={property.images[1]} className="w-full h-full object-cover"/></div>
              <div className="hidden md:block relative h-full"><img src={property.images[2]} className="w-full h-full object-cover"/></div>
              
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
                  <button 
                    onClick={() => setShowTourModal(true)}
                    className="bg-white/90 backdrop-blur text-slate-900 px-6 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-2 border border-white/50"
                  >
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> 
                      <Rotate3d size={20} className="text-indigo-600"/>
                      Lihat Virtual Tour 360°
                  </button>
              </div>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-around">
                 <div className="text-center"><p className="text-gray-500 text-xs">Kamar</p><p className="font-bold text-lg flex justify-center items-center gap-1"><Bed size={18}/> {property.specs.bedrooms}</p></div>
                 <div className="text-center"><p className="text-gray-500 text-xs">Toilet</p><p className="font-bold text-lg flex justify-center items-center gap-1"><Bath size={18}/> {property.specs.bathrooms}</p></div>
                 <div className="text-center"><p className="text-gray-500 text-xs">Luas</p><p className="font-bold text-lg flex justify-center items-center gap-1"><Square size={18}/> {property.specs.buildingSize}m²</p></div>
                 <div className="text-center"><p className="text-gray-500 text-xs">Sertifikat</p><p className="font-bold text-lg flex justify-center items-center gap-1 text-indigo-600"><FileText size={18}/> {property.specs.certificate}</p></div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex border-b border-gray-100">
                      {['Deskripsi', 'Legalitas', 'Progress'].map(tab => (
                          <button 
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`flex-1 py-4 text-sm font-bold capitalize ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/20' : 'text-gray-400 hover:text-gray-600'}`}
                          >
                              {tab}
                          </button>
                      ))}
                  </div>
                  
                  <div className="p-6 md:p-8 min-h-[300px]">
                      {activeTab === 'Deskripsi' && (
                          <div className="animate-in fade-in">
                              <h3 className="font-bold text-lg mb-4">Tentang Properti Ini</h3>
                              <p className="text-gray-600 leading-relaxed mb-4">
                                  Hunian modern di kawasan strategis Cibubur. Lingkungan asri, bebas banjir, dan keamanan 24 jam dengan One Gate System. 
                                  Unit ini memiliki desain High Ceiling yang memastikan sirkulasi udara sangat baik.
                              </p>
                              <div className="flex gap-2 flex-wrap mt-4">
                                  {['Kolam Renang', 'Gym', 'Taman', 'Security 24 Jam'].map(tag => (
                                      <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
                                  ))}
                              </div>
                          </div>
                      )}

                      {activeTab === 'Legalitas' && (
                          <div className="animate-in fade-in">
                              <div className="flex items-center justify-between mb-6 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                  <div>
                                      <h3 className="font-bold text-emerald-900">Status: Shama Verified</h3>
                                      <p className="text-emerald-700 text-sm">Dokumen fisik telah diaudit oleh tim legal Shama.</p>
                                  </div>
                                  <ShieldCheck size={32} className="text-emerald-500" />
                              </div>

                              <div className="space-y-4">
                                  <div className="flex items-center justify-between p-4 border rounded-xl hover:shadow-sm transition-shadow">
                                      <div className="flex items-center gap-4">
                                          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><FileText size={20}/></div>
                                          <div>
                                              <p className="font-bold text-gray-800">Sertifikat Hak Milik (SHM)</p>
                                              <p className="text-sm text-gray-500">{property.legalitas?.shm?.status || "Tersedia"}</p>
                                          </div>
                                      </div>
                                      {property.legalitas?.shm?.verified ? <div className="flex items-center gap-1 text-emerald-600 text-sm font-bold bg-emerald-50 px-3 py-1 rounded-full"><Check size={16}/> Verified</div> : <span className="text-yellow-500 text-sm">Proses</span>}
                                  </div>

                                  <div className="flex items-center justify-between p-4 border rounded-xl hover:shadow-sm transition-shadow">
                                      <div className="flex items-center gap-4">
                                          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Building size={20}/></div>
                                          <div>
                                              <p className="font-bold text-gray-800">IMB / PBG</p>
                                              <p className="text-sm text-gray-500">{property.legalitas?.imb?.status || "Terbit"}</p>
                                          </div>
                                      </div>
                                      {property.legalitas?.imb?.verified ? <div className="flex items-center gap-1 text-emerald-600 text-sm font-bold bg-emerald-50 px-3 py-1 rounded-full"><Check size={16}/> Verified</div> : <span className="text-yellow-500 text-sm">Proses</span>}
                                  </div>

                                  <div className="flex items-center justify-between p-4 border rounded-xl hover:shadow-sm transition-shadow">
                                      <div className="flex items-center gap-4">
                                          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><FileText size={20}/></div>
                                          <div>
                                              <p className="font-bold text-gray-800">Pajak Bumi Bangunan (PBB)</p>
                                              <p className="text-sm text-gray-500">{property.legalitas?.pbb?.status || "Lunas"}</p>
                                          </div>
                                      </div>
                                      {property.legalitas?.pbb?.verified ? <div className="flex items-center gap-1 text-emerald-600 text-sm font-bold bg-emerald-50 px-3 py-1 rounded-full"><Check size={16}/> Verified</div> : <span className="text-yellow-500 text-sm">Proses</span>}
                                  </div>
                              </div>
                          </div>
                      )}

                      {activeTab === 'Progress' && (
                          <div className="animate-in fade-in">
                              <div className="flex items-center justify-between mb-6">
                                  <h3 className="font-bold text-gray-900">Timeline Pembangunan</h3>
                                  <span className="text-indigo-600 font-bold">{currentProgress}% Selesai</span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-2.5 mb-8">
                                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${currentProgress}%` }}></div>
                              </div>
                              <div className="space-y-6 relative border-l-2 border-gray-200 ml-3 pl-6">
                                  {progressLogs.map((log: any) => (
                                      <div key={log.id} className="relative">
                                          <span className="absolute -left-[31px] top-0 bg-indigo-600 w-4 h-4 rounded-full border-2 border-white"></span>
                                          <h4 className="font-bold text-gray-800">{log.title}</h4>
                                          <p className="text-sm text-gray-500 mb-2">{log.date}</p>
                                          {log.image && (
                                              <img src={log.image} alt="Progress" className="w-32 h-24 object-cover rounded-lg border border-gray-100" />
                                          )}
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          </div>

          <div className="lg:col-span-4">
             <div className="sticky top-28 space-y-4">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                    <p className="text-sm text-gray-500 mb-1">Harga Mulai</p>
                    <h2 className="text-3xl font-extrabold text-indigo-900 mb-6">{formatRupiah(property.price)}</h2>
                    
                    <div className={`border rounded-xl transition-all ${isCalcOpen ? 'bg-white' : 'bg-gray-50'}`}>
                       <div className="flex justify-between p-4 cursor-pointer" onClick={() => setIsCalcOpen(!isCalcOpen)}>
                          <div className="flex gap-2 font-bold text-sm text-indigo-900"><Calculator size={18}/> Transparansi Harga</div>
                          <ChevronRight size={16} className={isCalcOpen ? 'rotate-90' : ''}/>
                       </div>
                       {isCalcOpen && (
                          <div className="px-4 pb-4 text-sm space-y-2">
                             <div className="flex justify-between text-gray-500"><span>Unit</span><span>{formatRupiah(property.price)}</span></div>
                             <div className="flex justify-between text-gray-500"><span>PPN (11%)</span><span>{formatRupiah(ppn)}</span></div>
                             <div className="flex justify-between text-gray-500"><span>BPHTB</span><span>{formatRupiah(bphtb)}</span></div>
                             <div className="flex justify-between text-gray-500"><span>Notaris</span><span>{formatRupiah(notary)}</span></div>
                             <div className="flex justify-between font-bold text-indigo-700 pt-2 border-t mt-2"><span>Total</span><span>{formatRupiah(total)}</span></div>
                          </div>
                       )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex justify-between text-sm mb-4"><span className="text-gray-500">Booking Fee</span><span className="font-bold">Rp 5.000.000</span></div>
                    <button 
                       onClick={() => currentUser ? setShowBookingModal(true) : setShowLoginModal(true)}
                       className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all mb-2"
                    >
                       Booking Sekarang
                    </button>
                    <button className="w-full border py-3 rounded-xl font-bold text-slate-700 hover:bg-gray-50">Hubungi Agen</button>
                </div>
             </div>
          </div>
      </div>
      {/* Render Virtual Tour jika aktif */}
      {showTourModal && <VirtualTourViewer property={property} onClose={() => setShowTourModal(false)} />}
    </div>
  );
};

const VirtualTourViewer = ({ property, onClose }: any) => {
   if (!property) return null;

   return (
     <div className="fixed inset-0 bg-black z-[100] flex flex-col animate-in fade-in duration-300">
       <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
           <div className="text-white">
               <h3 className="font-bold text-lg">{property.title}</h3>
               <p className="text-xs opacity-80 flex items-center gap-1"><Rotate3d size={14}/> 360° Virtual Tour Experience</p>
           </div>
           <button onClick={onClose} className="p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors backdrop-blur"><X size={24}/></button>
       </div>

       <div className="flex-1 w-full h-full relative overflow-hidden bg-gray-900 cursor-move group">
           <div 
             className="absolute top-0 left-0 h-full w-[300%] bg-cover bg-center transition-transform duration-[60s] ease-linear hover:duration-[120s]"
             style={{ 
               backgroundImage: `url('${property.panoramaImage}')`,
               animation: 'pan 40s linear infinite alternate'
             }}
           ></div>
           
           <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur px-6 py-2 rounded-full text-white flex items-center gap-2 pointer-events-none">
               <Move size={18} />
               <span className="text-sm font-medium">Geser untuk melihat sekeliling</span>
           </div>

           <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 group/hotspot cursor-pointer">
               <div className="w-8 h-8 bg-white/80 rounded-full border-4 border-white animate-pulse shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
               </div>
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white text-slate-900 text-xs font-bold px-3 py-1 rounded shadow opacity-0 group-hover/hotspot:opacity-100 transition-opacity whitespace-nowrap">
                  Ruang Tamu
               </div>
           </div>
           <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 group/hotspot cursor-pointer">
               <div className="w-8 h-8 bg-white/80 rounded-full border-4 border-white animate-pulse shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
               </div>
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white text-slate-900 text-xs font-bold px-3 py-1 rounded shadow opacity-0 group-hover/hotspot:opacity-100 transition-opacity whitespace-nowrap">
                  Dapur Bersih
               </div>
           </div>
       </div>
       
       <style dangerouslySetInnerHTML={{__html: `
          @keyframes pan {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
          }
       `}} />
     </div>
   )
}

const UserDashboard = ({ bookings, progressLogs, handleNavigate }: any) => {
   return (
     <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
       <h1 className="text-2xl font-bold mb-6">Dashboard Pembeli</h1>
       {bookings.length === 0 ? (
         <div className="text-center p-12 bg-white rounded-2xl border border-dashed">
            <Home size={48} className="mx-auto text-gray-300 mb-4"/>
            <p className="text-gray-500 mb-4">Belum ada booking aktif.</p>
            <button onClick={() => handleNavigate('search')} className="bg-indigo-600 text-white px-6 py-2 rounded-lg">Cari Properti</button>
         </div>
       ) : (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
               {bookings.map((booking: any) => (
                 <div key={booking.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                    <img src={booking.propertyImage} className="w-24 h-24 object-cover rounded-lg"/>
                    <div className="flex-1">
                       <div className="flex justify-between mb-2">
                          <h3 className="font-bold">{booking.propertyTitle}</h3>
                          <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold">{booking.status}</span>
                       </div>
                       <p className="text-sm text-gray-500 mb-4">{booking.location}</p>
                       <div className="flex gap-2">
                          <button className="text-xs border px-3 py-1 rounded hover:bg-gray-50 bg-white">Upload KTP & NPWP</button>
                          <button className="text-xs border px-3 py-1 rounded hover:bg-gray-50 bg-white">Lihat Progress</button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 h-fit">
               <h3 className="font-bold mb-4">Progres Pembangunan</h3>
               <div className="space-y-4 relative pl-4 border-l-2 ml-2">
                  {progressLogs.map((log: any) => (
                     <div key={log.id} className="relative pl-4">
                        <div className="absolute -left-[21px] top-1 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white"></div>
                        <p className="text-xs text-gray-500">{log.date}</p>
                        <p className="font-bold text-sm">{log.title}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
       )}
     </div>
   )
};

const DeveloperDashboard = ({ bookings }: any) => (
   <div className="pt-24 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8">
         <div>
           <h1 className="text-2xl font-bold">Dashboard Developer</h1>
           <p className="text-sm text-gray-500">PT. Agung Podomoro Land</p>
         </div>
         <button onClick={() => alert('Simulasi: Upload foto progress berhasil!')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm flex gap-2 items-center hover:bg-indigo-700"><Camera size={16}/> Update Progress</button>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
         <div className="bg-white p-4 rounded-xl border border-gray-100"><p className="text-xs text-gray-500">Total Unit</p><p className="text-2xl font-bold">45</p></div>
         <div className="bg-white p-4 rounded-xl border border-gray-100"><p className="text-xs text-gray-500">Booking Masuk</p><p className="text-2xl font-bold text-orange-600">{bookings.length}</p></div>
         <div className="bg-white p-4 rounded-xl border border-gray-100"><p className="text-xs text-gray-500">Akad Kredit</p><p className="text-2xl font-bold text-emerald-600">12</p></div>
         <div className="bg-white p-4 rounded-xl border border-gray-100"><p className="text-xs text-gray-500">Revenue</p><p className="text-2xl font-bold text-indigo-900">8.5 M</p></div>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
         <div className="p-4 border-b bg-gray-50 font-bold text-sm">Pesanan Masuk</div>
         <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 font-bold text-gray-600"><tr><th className="p-4">ID</th><th className="p-4">Unit</th><th className="p-4">Customer</th><th className="p-4">Status</th></tr></thead>
            <tbody>
               {bookings.length === 0 ? <tr><td colSpan={4} className="p-8 text-center text-gray-400">Belum ada booking baru</td></tr> : bookings.map((b: any) => (
                  <tr key={b.id} className="border-b">
                     <td className="p-4 font-mono">{b.id}</td>
                     <td className="p-4">{b.propertyTitle}</td>
                     <td className="p-4">Budi Santoso</td>
                     <td className="p-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">{b.status}</span></td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   </div>
);

const AdminDashboard = () => (
   <div className="pt-24 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8">
         <div>
           <h1 className="text-2xl font-bold text-slate-900">Shama Super Admin</h1>
           <p className="text-sm text-gray-500">Panel Kendali & Verifikasi</p>
         </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
           <div className="flex items-center gap-3 mb-2"><ShieldCheck className="text-emerald-500"/><h3 className="font-bold">Verifikasi Developer</h3></div>
           <p className="text-2xl font-bold">3</p>
           <p className="text-xs text-gray-500">Menunggu review legalitas</p>
           <button className="mt-4 w-full text-xs bg-gray-50 hover:bg-gray-100 py-2 rounded">Review Dokumen</button>
         </div>
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
           <div className="flex items-center gap-3 mb-2"><Users className="text-blue-500"/><h3 className="font-bold">Verifikasi User</h3></div>
           <p className="text-2xl font-bold">5</p>
           <p className="text-xs text-gray-500">Menunggu BI Checking awal</p>
           <button className="mt-4 w-full text-xs bg-gray-50 hover:bg-gray-100 py-2 rounded">Cek Data</button>
         </div>
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
           <div className="flex items-center gap-3 mb-2"><DollarSign className="text-orange-500"/><h3 className="font-bold">Dana Escrow</h3></div>
           <p className="text-2xl font-bold">Rp 25.000.000</p>
           <p className="text-xs text-gray-500">Dana tertahan di rekening bersama</p>
           <button className="mt-4 w-full text-xs bg-gray-50 hover:bg-gray-100 py-2 rounded">Kelola Dana</button>
         </div>
      </div>
      
      <h3 className="font-bold mb-4">Aktivitas Terbaru</h3>
      <div className="bg-white rounded-xl border border-gray-100">
           {/* Mock logs */}
           {[1,2,3].map(i => (
              <div key={i} className="p-4 border-b flex justify-between items-center text-sm">
                 <div>
                    <p className="font-bold">User Budi melakukan Booking</p>
                    <p className="text-xs text-gray-500">Cluster Harmony - A12</p>
                 </div>
                 <span className="text-xs text-gray-400">2 jam lalu</span>
              </div>
           ))}
      </div>
   </div>
);

// --- MAIN EXPORT ---

const ShamaMarketplace = () => {
  const [currentView, setCurrentView] = useState('home'); 
  const [currentUser, setCurrentUser] = useState<any>(null); 
  const [selectedPropertyId, setSelectedPropertyId] = useState(1);
  const [bookings, setBookings] = useState<any[]>([]);
  const [progressLogs, setProgressLogs] = useState(INITIAL_PROGRESS_LOGS);
  const [currentProgress, setCurrentProgress] = useState(30);
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleNavigate = (view: string, propertyId: number | null = null) => {
    if (propertyId) setSelectedPropertyId(propertyId);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleLogin = (role: string) => {
    if (role === 'user') {
      setCurrentUser({ role: 'user', name: 'Budi Santoso', email: 'user@shama.id' });
      setCurrentView('home');
    } else if (role === 'developer') {
      setCurrentUser({ role: 'developer', name: 'Agung Podomoro', email: 'dev@shama.id' });
      setCurrentView('developer-dashboard');
    } else if (role === 'admin') {
      setCurrentUser({ role: 'admin', name: 'Shama Admin', email: 'superadmin@shama.id' });
      setCurrentView('admin-dashboard');
    }
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleBookingSuccess = (property: any) => {
    const newBooking = {
      id: `SHM-${Math.floor(Math.random() * 10000)}`,
      propertyTitle: property.title,
      propertyImage: property.images[0],
      price: property.price,
      location: property.location,
      date: new Date().toLocaleDateString('id-ID'),
      status: 'Menunggu Verifikasi Admin',
      bookingFee: 5000000,
      documents: { ktp: false, npwp: false, slip_gaji: false }
    };
    setBookings([newBooking, ...bookings]);
    setShowBookingModal(false);
    if (currentUser?.role === 'user') setCurrentView('user-dashboard');
  };

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-800">
       <Navbar 
         scrollPosition={scrollPosition} 
         currentView={currentView} 
         currentUser={currentUser} 
         handleNavigate={handleNavigate} 
         handleLogout={handleLogout} 
         setShowLoginModal={setShowLoginModal} 
       />
       
       {currentView === 'home' && <HomePage handleNavigate={handleNavigate} />}
       {currentView === 'search' && <ExplorePage handleNavigate={handleNavigate} />}
       {currentView === 'detail' && 
         <DetailPage 
           selectedPropertyId={selectedPropertyId} 
           currentUser={currentUser}
           setShowBookingModal={setShowBookingModal}
           setShowLoginModal={setShowLoginModal}
           currentProgress={currentProgress}
           progressLogs={progressLogs}
           handleNavigate={handleNavigate}
         />
       }
       {currentView === 'kpr' && <KPRPage />}
       {currentView === 'sell' && <SellPage />}
       {currentView === 'legal' && <LegalPage />}
       
       {/* Dashboards */}
       {currentView === 'user-dashboard' && <UserDashboard bookings={bookings} progressLogs={progressLogs} handleNavigate={handleNavigate} />}
       {currentView === 'developer-dashboard' && <DeveloperDashboard bookings={bookings} />}
       {currentView === 'admin-dashboard' && <AdminDashboard />}

       {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal} handleLogin={handleLogin} />}
       {showBookingModal && 
         <BookingFlow 
           selectedPropertyId={selectedPropertyId} 
           setShowBookingModal={setShowBookingModal} 
           handleBookingSuccess={handleBookingSuccess} 
         />
       }
       
       {/* Demo Account Info Update */}
       <div className="fixed bottom-4 right-4 z-40 bg-slate-900 text-white p-3 rounded-xl text-xs shadow-2xl opacity-80 hover:opacity-100 transition-opacity">
          <p className="font-bold text-indigo-300 mb-1">Demo Roles:</p>
          <p className="flex justify-between w-40"><span>User:</span> <span className="text-gray-400">user@shama.id</span></p>
          <p className="flex justify-between w-40"><span>Dev:</span> <span className="text-gray-400">dev@shama.id</span></p>
          <p className="flex justify-between w-40"><span>Admin:</span> <span className="text-gray-400">super@shama.id</span></p>
       </div>
    </div>
  );
};

export default ShamaMarketplace;