"use client";

import { useParams } from 'next/navigation';
import NextImage from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import NewsCard from '@/components/NewsCard'; // Kita pakai ulang card untuk rekomendasi
import { newsData } from '@/data/news';
import { useLanguage } from '@/context/LanguageContext';
import FadeIn from '@/components/FadeIn';

export default function NewsDetail() {
  const params = useParams();
  const { language } = useLanguage();

  // 1. Validasi ID
  if (!params?.id) return null;

  // 2. Cari data berita
  const newsId = Number(params.id);
  const news = newsData.find((n) => n.id === newsId);
  
  // 3. Cari berita rekomendasi (Selain berita yang sedang dibuka)
  const relatedNews = newsData.filter(n => n.id !== newsId).slice(0, 3);

  // Jika tidak ditemukan
  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <Navbar />
        <div className="mt-20">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Artikel Tidak Ditemukan</h1>
          <Link href="/berita" className="text-indigo-600 font-semibold hover:underline">
            ← Kembali ke Berita
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* 1. IMMERSIVE HERO SECTION */}
      <div className="relative w-full h-[60vh] min-h-[400px]">
        {/* Background Image */}
        <NextImage 
          src={news.image} 
          alt={news.title} 
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay (Gradient) */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/30"></div>

        {/* Title & Meta Data (Floating on Image) */}
        <div className="absolute bottom-0 left-0 w-full pb-20 pt-32 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <div className="flex items-center justify-center gap-3 mb-6">
                 <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                   {news.category}
                 </span>
                 <span className="text-gray-300 text-sm font-medium">• {news.date}</span>
                 <span className="text-gray-300 text-sm font-medium hidden sm:inline">• 5 min read</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
                {news.title}
              </h1>
              
              {/* Author Info */}
              <div className="flex items-center justify-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-white font-bold">
                   S
                 </div>
                 <div className="text-left text-white">
                    <p className="text-sm font-bold">Shama Editor</p>
                    <p className="text-xs text-gray-300">Real Estate Analyst</p>
                 </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* 2. CONTENT CARD (Overlapping) */}
      <main className="relative z-10 -mt-12 px-4 pb-20">
        <FadeIn delay={0.2}>
          <article className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border border-gray-100">
            
            {/* Breadcrumb Back */}
            <Link 
              href="/berita" 
              className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-indigo-600 mb-8 transition"
            >
              ← {language === 'EN' ? 'Back to All News' : 'Kembali ke Semua Berita'}
            </Link>

            {/* Excerpt / Lead Paragraph */}
            <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed mb-8 border-l-4 border-emerald-500 pl-6 italic">
              {news.excerpt}
            </p>

            {/* Body Text */}
            <div className="space-y-6 text-gray-600 leading-8 text-lg font-light">
              <p>
                <strong className="text-gray-900 font-bold">Bali, {news.date}</strong> — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Di Bali, properti seperti ini memiliki potensi investasi yang sangat tinggi (ROI) terutama di kawasan <span className="bg-emerald-100 text-emerald-800 px-1 rounded font-medium">{news.category}</span>.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                {language === 'EN' ? 'Key Takeaways' : 'Poin Penting'}
              </h2>
              <ul className="space-y-4 mb-8">
                {['Lokasi strategis menentukan harga.', 'Legalitas tanah (SHM vs Leasehold) wajib diperiksa.', 'Tren pasar menunjukkan kenaikan 15% tahun ini.'].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <p>
                 Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
              </p>

              {/* Quote Block */}
              <blockquote className="my-10 p-8 bg-gray-50 rounded-2xl text-center">
                 <p className="text-xl font-serif text-gray-800 italic mb-4">"Investasi properti bukan tentang menunggu untuk membeli, tapi membeli lalu menunggu."</p>
                 <footer className="text-sm font-bold text-gray-500">— Robert Kiyosaki</footer>
              </blockquote>

              <p>
                Kesimpulannya, pasar properti Bali terus menunjukkan tren positif. Pastikan Anda selalu berkonsultasi dengan agen properti terpercaya sebelum mengambil keputusan besar. Pantau terus Shama Realestate Market untuk update terbaru lainnya.
              </p>
            </div>

            {/* Share / Tags */}
            <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex gap-2">
                {['#RealEstate', '#Bali', '#Investment'].map(tag => (
                  <span key={tag} className="text-sm text-gray-500 hover:text-indigo-600 cursor-pointer transition">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900">Share:</span>
                <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white flex items-center justify-center transition">FB</button>
                <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-sky-500 hover:text-white flex items-center justify-center transition">TW</button>
                <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-green-500 hover:text-white flex items-center justify-center transition">WA</button>
              </div>
            </div>

          </article>
        </FadeIn>
      </main>

      {/* 3. RELATED NEWS SECTION */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              {language === 'EN' ? 'Read Next' : 'Artikel Lainnya'}
            </h3>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedNews.map((item, index) => (
              <FadeIn key={item.id} delay={index * 0.1}>
                 <NewsCard news={item} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}