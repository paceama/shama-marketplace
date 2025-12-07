"use client";

import Link from 'next/link';
import NextImage from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-[#0B1120] border-t border-white/10 pt-20 pb-10 mt-auto relative overflow-hidden">
      
      {/* Background decoration (Subtle Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Kolom 1: Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                 <NextImage src="/shama-logo.svg" alt="Shama Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                SHAMA <span className="text-indigo-400">MARKET</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              {language === 'EN' 
                ? 'Your trusted partner in finding the best property deals in Bali. Luxury villas, land, and commercial spaces.' 
                : 'Mitra terpercaya Anda dalam menemukan properti terbaik di Bali. Villa mewah, tanah, dan ruang komersial.'}
            </p>
            <div className="flex gap-4">
              {/* Social Icons (Dark Glass Style) */}
              {['IG', 'FB', 'LN', 'YT'].map((social) => (
                <div key={social} className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300 cursor-pointer text-xs font-bold">
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* Kolom 2: Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">{language === 'EN' ? 'Company' : 'Perusahaan'}</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-indigo-400 transition flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full"></span> About Us</Link></li>
              <li><Link href="/" className="hover:text-indigo-400 transition flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full"></span> Careers</Link></li>
              <li><Link href="/berita" className="hover:text-indigo-400 transition flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full"></span> Blog & News</Link></li>
              <li><Link href="/kontak" className="hover:text-indigo-400 transition flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full"></span> Contact Support</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Property Type */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">{language === 'EN' ? 'Explore' : 'Jelajahi'}</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/cari" className="hover:text-indigo-400 transition">Villa for Sale</Link></li>
              <li><Link href="/cari" className="hover:text-indigo-400 transition">Land for Sale</Link></li>
              <li><Link href="/cari" className="hover:text-indigo-400 transition">Monthly Rental</Link></li>
              <li><Link href="/cari" className="hover:text-indigo-400 transition">New Projects</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Contact */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">{language === 'EN' ? 'Office' : 'Kantor'}</h3>
            <ul className="space-y-5 text-sm text-gray-400">
              <li className="flex items-start gap-4">
                <span className="bg-white/10 p-2 rounded-lg text-white">📍</span>
                <span className="mt-1">Jl. Sunset Road No. 88, Seminyak, Kuta, Bali 80361</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="bg-white/10 p-2 rounded-lg text-white">📞</span>
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="bg-white/10 p-2 rounded-lg text-white">✉️</span>
                <span>hello@shama-market.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2025 Shama Realestate Market. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}