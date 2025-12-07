"use client";

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import NewsCard from '@/components/NewsCard';
import { newsData } from '@/data/news';
import { useLanguage } from '@/context/LanguageContext';
import FadeIn from '@/components/FadeIn';
import NextImage from 'next/image';
import Link from 'next/link';

export default function NewsPage() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 1. Ambil Kategori Unik dari Data
  const categories = ['All', ...new Set(newsData.map((item) => item.category))];

  // 2. Filter Logic
  const filteredNews = useMemo(() => {
    return newsData.filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Pisahkan Berita Utama (Featured) dengan Berita Sisa
  const featuredNews = filteredNews.length > 0 ? filteredNews[0] : null;
  const remainingNews = filteredNews.length > 0 ? filteredNews.slice(1) : [];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      
      {/* 1. HEADER HALAMAN (Dark Premium) */}
      <div className="bg-[#0B1120] pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-4 uppercase tracking-widest">
              {language === 'EN' ? 'The Blog' : 'Artikel & Wawasan'}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              {language === 'EN' ? 'Market Insights & News' : 'Berita & Tren Properti'}
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              {language === 'EN' 
                ? 'Stay ahead of the curve with the latest updates from the Bali real estate market.' 
                : 'Dapatkan informasi terdepan seputar perkembangan pasar properti di Bali.'}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* 2. FILTER BAR (Sticky) */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm py-4 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Categories Scrollable */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap border ${
                    selectedCategory === cat
                      ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900 hover:text-gray-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder={language === 'EN' ? "Search articles..." : "Cari artikel..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 3. HERO NEWS (Artikel Utama) */}
        {featuredNews && (
          <FadeIn className="mb-16">
            <Link href={`/berita/${featuredNews.id}`} className="group relative block rounded-3xl overflow-hidden shadow-2xl h-[500px]">
              <NextImage 
                src={featuredNews.image}
                alt={featuredNews.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-4 text-sm font-bold text-emerald-400 uppercase tracking-wider">
                    <span className="bg-emerald-500/20 px-2 py-1 rounded backdrop-blur-md border border-emerald-500/30">
                      {featuredNews.category}
                    </span>
                    <span className="text-gray-300">• {featuredNews.date}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight group-hover:text-emerald-300 transition-colors">
                    {featuredNews.title}
                  </h2>
                  <p className="text-gray-200 text-lg md:text-xl line-clamp-2 mb-6 max-w-2xl">
                    {featuredNews.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-emerald-500 pb-1 hover:text-emerald-400 transition">
                    {language === 'EN' ? 'Read Full Article' : 'Baca Selengkapnya'} →
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>
        )}

        {/* 4. GRID BERITA (Sisanya) */}
        {remainingNews.length > 0 ? (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-bold text-gray-900">
                {language === 'EN' ? 'More Updates' : 'Artikel Lainnya'}
              </h3>
              <div className="h-px bg-gray-200 grow"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {remainingNews.map((item, index) => (
                <FadeIn key={item.id} delay={index * 0.05}>
                  <NewsCard news={item} />
                </FadeIn>
              ))}
            </div>
          </div>
        ) : (
           // Empty State jika tidak ada hasil search
           !featuredNews && (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-bold text-gray-900">Tidak ada artikel ditemukan</h3>
              <p className="text-gray-500">Coba kata kunci atau kategori lain.</p>
            </div>
           )
        )}

        {/* 5. NEWSLETTER SECTION */}
        <FadeIn className="mt-20">
          <div className="bg-[#0B1120] rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none"></div>
             
             <div className="relative z-10 max-w-2xl mx-auto">
               <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                 {language === 'EN' ? 'Subscribe to our Newsletter' : 'Berlangganan Newsletter Kami'}
               </h3>
               <p className="text-gray-400 mb-8">
                 {language === 'EN' 
                   ? 'Get the latest market updates and exclusive offers sent directly to your inbox.' 
                   : 'Dapatkan update pasar terbaru dan penawaran eksklusif langsung di inbox Anda.'}
               </p>
               <div className="flex flex-col sm:flex-row gap-3">
                 <input 
                   type="email" 
                   placeholder="Enter your email" 
                   className="w-full px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 backdrop-blur-sm"
                 />
                 <button className="px-8 py-3.5 rounded-full bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition shadow-lg shadow-emerald-500/30">
                   Subscribe
                 </button>
               </div>
             </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}