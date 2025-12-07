"use client";

import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import NewsCard from '@/components/NewsCard';
import { properties } from '@/data/properties';
import { newsData } from '@/data/news';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import NextImage from 'next/image'; 
import FadeIn from '@/components/FadeIn';

export default function Home() {
  const { t, language } = useLanguage();
  const topProperties = properties.slice(0, 3);
  const topNews = newsData.slice(0, 3);

  return (
    <main className="min-h-screen text-gray-800"> 
      <Navbar />
      
      {/* 1. HERO SECTION (Cleaner & Cinematic) */}
      <FadeIn className="relative h-[650px] flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <NextImage 
            src="https://images.unsplash.com/photo-1565402170291-8491f14678db?q=80"
            alt="Bali Villa Background"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-10">
          <FadeIn delay={0.2}>
            <span className="inline-block py-2 px-4 rounded-full bg-indigo-600/30 backdrop-blur-md text-indigo-100 text-xs font-bold mb-6 border border-indigo-400/30 uppercase tracking-widest shadow-lg">
              ✨ #1 Premium Property in Bali
            </span>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-2xl">
              {t('heroTitle')}
            </h1>
          </FadeIn>

          <FadeIn delay={0.6}>
            <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              {t('heroSubtitle')}
            </p>
          </FadeIn>

          {/* REVISI: Search Filter DIHAPUS, diganti Tombol CTA Tunggal */}
          <FadeIn delay={0.8}>
             <div className="flex justify-center">
               <Link 
                  href="/cari" 
                  className="bg-white text-indigo-900 px-10 py-4 rounded-full font-bold text-lg transition flex items-center justify-center shadow-xl shadow-indigo-900/20 hover:bg-gray-100 hover:scale-105 duration-300"
               >
                  {language === 'EN' ? 'Explore Properties' : 'Jelajahi Properti'} →
               </Link>
             </div>
          </FadeIn>
        </div>
      </FadeIn>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        
        {/* 2. STATS */}
        <FadeIn delay={0.2} className="-mt-10 mb-20 relative z-20">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
             <div className="text-center">
                <h4 className="text-4xl font-extrabold text-gray-900 mb-1">500+</h4>
                <p className="text-gray-500 text-sm font-medium">Listings</p>
             </div>
             <div className="text-center pl-4">
                <h4 className="text-4xl font-extrabold text-gray-900 mb-1">120</h4>
                <p className="text-gray-500 text-sm font-medium">Agents</p>
             </div>
             <div className="text-center pl-4">
                <h4 className="text-4xl font-extrabold text-gray-900 mb-1">5k+</h4>
                <p className="text-gray-500 text-sm font-medium">Sold</p>
             </div>
             <div className="text-center pl-4">
                <h4 className="text-4xl font-extrabold text-gray-900 mb-1">4.9</h4>
                <p className="text-gray-500 text-sm font-medium">Rating</p>
             </div>
          </div>
        </FadeIn>

        {/* 3. SECTION: PROPERTI */}
        <section className="mb-32">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">{t('featuredProp')}</h2>
              <p className="text-gray-500 max-w-lg text-lg">
                {language === 'EN' ? 'Curated selection of the most requested properties.' : 'Pilihan properti paling diminati minggu ini.'}
              </p>
            </div>
            <Link href="/cari" className="px-6 py-3 rounded-full border border-gray-300 font-semibold hover:border-indigo-600 hover:text-indigo-600 transition duration-300">
              {t('viewAll')} →
            </Link>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topProperties.map((item, index) => (
              <FadeIn key={item.id} delay={index * 0.1}>
                <PropertyCard property={item} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 4. SECTION: NEWS */}
        <section>
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
             <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">{t('latestNews')}</h2>
              <p className="text-gray-500">Update pasar terkini.</p>
            </div>
            <Link href="/berita" className="px-6 py-3 rounded-full border border-gray-300 font-semibold hover:border-indigo-600 hover:text-indigo-600 transition duration-300">
              {t('readAll')} →
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topNews.map((item, index) => (
              <FadeIn key={item.id} delay={index * 0.1}>
                <NewsCard news={item} />
              </FadeIn>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}