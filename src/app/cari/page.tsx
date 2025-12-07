"use client";

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/data/properties';
import { useLanguage } from '@/context/LanguageContext';
import FadeIn from '@/components/FadeIn';

export default function SearchPage() {
  const { t, language } = useLanguage();

  // --- STATE FILTER ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000000000 });
  const [minBeds, setMinBeds] = useState(0);
  const [sortBy, setSortBy] = useState('newest');

  // --- LOGIC FILTERING ---
  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      // 1. Search
      const title = item.title[language === 'EN' ? 'en' : 'id'].toLowerCase();
      const location = item.location.toLowerCase();
      const query = searchQuery.toLowerCase();
      const matchSearch = title.includes(query) || location.includes(query);

      // 2. Type
      const matchType = selectedType === 'All' || item.type === selectedType;

      // 3. Price
      const matchPrice = item.price >= priceRange.min && item.price <= priceRange.max;

      // 4. Beds
      const bedMatch = item.specs[language === 'EN' ? 'en' : 'id'].match(/(\d+)\s*(Bed|Kamar)/);
      const itemBeds = bedMatch ? parseInt(bedMatch[1]) : 0;
      const matchBeds = minBeds === 0 || itemBeds >= minBeds;

      return matchSearch && matchType && matchPrice && matchBeds;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      return b.id - a.id;
    });
  }, [searchQuery, selectedType, priceRange, minBeds, sortBy, language]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      
      {/* 1. HEADER HALAMAN */}
      {/* pt-28 disesuaikan agar pas dengan navbar yang fixed */}
      <div className="bg-[#0B1120] pt-32 pb-12 px-4 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {language === 'EN' ? 'Find Your Dream Property' : 'Temukan Properti Impian'}
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* 2. HORIZONTAL FILTER BAR (Sticky) */}
      {/* PERBAIKAN: top-[64px] agar pas menempel di bawah navbar saat scroll */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
            
            {/* Group Filter Inputs */}
            <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto overflow-x-auto pb-2 md:pb-0 items-center no-scrollbar">
              
              {/* Input Pencarian */}
              <div className="relative w-full md:w-64 shrink-0">
                <input 
                  type="text" 
                  placeholder={language === 'EN' ? "Search location..." : "Cari lokasi..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm hover:bg-white transition"
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>

              {/* Tipe Properti */}
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full md:w-auto px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:bg-white transition"
              >
                <option value="All">{language === 'EN' ? 'All Types' : 'Semua Tipe'}</option>
                <option value="Dijual">Dijual</option>
                <option value="Sewa">Sewa</option>
              </select>

              {/* Harga Min */}
              <select 
                className="w-full md:w-auto px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:bg-white transition"
                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              >
                <option value="0">Min Harga</option>
                <option value="500000000">500 Juta</option>
                <option value="1000000000">1 Miliar</option>
                <option value="5000000000">5 Miliar</option>
              </select>

              {/* Harga Max */}
              <select 
                className="w-full md:w-auto px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:bg-white transition"
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                defaultValue="100000000000"
              >
                <option value="100000000000">Max Harga</option>
                <option value="1000000000">1 Miliar</option>
                <option value="5000000000">5 Miliar</option>
                <option value="10000000000">10 Miliar</option>
              </select>

              {/* Kamar Tidur */}
              <div className="flex bg-gray-50 rounded-full p-1 border border-gray-200 shrink-0">
                {[0, 2, 3].map((num) => (
                   <button
                   key={num}
                   onClick={() => setMinBeds(num)}
                   className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                     minBeds === num 
                       ? 'bg-white text-indigo-600 shadow-sm' 
                       : 'text-gray-500 hover:text-gray-900'
                   }`}
                 >
                   {num === 0 ? 'Any' : `${num}+`}
                 </button>
                ))}
              </div>

            </div>

            {/* Sort & Count */}
            <div className="flex items-center gap-3 w-full xl:w-auto justify-between xl:justify-end border-t xl:border-t-0 pt-3 xl:pt-0 mt-2 xl:mt-0">
               <span className="text-sm font-semibold text-gray-500 shrink-0">
                 <strong className="text-indigo-600">{filteredProperties.length}</strong> {language === 'EN' ? 'Results' : 'Properti'}
               </span>
               <select 
                  className="bg-transparent text-gray-700 text-sm font-bold outline-none cursor-pointer hover:text-indigo-600 text-right"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Sort: Terbaru</option>
                  <option value="price_low">Sort: Termurah</option>
                  <option value="price_high">Sort: Termahal</option>
                </select>
            </div>

          </div>
        </div>
      </div>

      {/* 3. GRID PROPERTI (Full Width) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProperties.map((item, index) => (
              <FadeIn key={item.id} delay={index * 0.05}>
                <PropertyCard property={item} />
              </FadeIn>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-4xl grayscale opacity-50">
              🔍
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Properti tidak ditemukan</h3>
            <p className="text-gray-500 max-w-md">Kami tidak dapat menemukan properti yang cocok dengan filter Anda. Silakan coba atur ulang filter.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedType('All');
                setPriceRange({ min: 0, max: 100000000000 });
                setMinBeds(0);
              }}
              className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition shadow-lg"
            >
              Reset Filter
            </button>
          </div>
        )}

      </div>
    </div>
  );
}