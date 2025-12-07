"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  
  // 1. Ambil semua fungsi dari useAuth di sini (Top Level)
  const { 
    user, 
    logout,
    openLoginModal, 
    closeLoginModal,
    isLoginModalOpen,
    loginAsBuyer,  // Ambil fungsi ini di sini
    loginAsSeller  // Ambil fungsi ini di sini
  } = useAuth(); 
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleLanguage = (lang: 'EN' | 'ID') => {
    setLanguage(lang);
    setIsLanguageOpen(false);
  };

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/cari', label: t('search') },
    { path: '/berita', label: t('news') },
    { path: '/kontak', label: t('contact') },
  ];

  return (
    <>
      <nav 
        className={`fixed w-full top-0 z-50 transition-all duration-300 ease-in-out border-b
        ${isMobileMenuOpen
          ? 'bg-[#0B1120] border-white/10 py-4' 
          : scrolled 
            ? 'bg-[#0B1120]/90 backdrop-blur-md shadow-lg py-3 border-white/10' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* LOGO */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group z-50">
              <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                 <NextImage src="/shama-logo.svg" alt="Shama Logo" fill className="object-contain" />
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tight text-white drop-shadow-md">
                SHAMA <span className="text-indigo-400">MARKET</span>
              </span>
            </Link>
            
            {/* MENU DESKTOP */}
            <div className="hidden lg:flex space-x-8 items-center">
              {navLinks.map((item) => (
                <Link key={item.path} href={item.path} className="group relative text-gray-300 font-medium text-sm uppercase tracking-wider hover:text-white transition-colors">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* KANAN: BAHASA & USER */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  🌐 {language}
                </button>
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5">
                    <button onClick={() => toggleLanguage('EN')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 font-medium">English (EN)</button>
                    <button onClick={() => toggleLanguage('ID')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 font-medium">Indonesia (ID)</button>
                  </div>
                )}
              </div>

              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 pl-2 pr-4 py-1.5 rounded-full transition border border-white/10"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden relative border border-indigo-400">
                      <NextImage src={user.avatar} alt="User" fill className="object-cover" />
                    </div>
                    <span className="text-white text-sm font-bold truncate max-w-[100px]">{user.name}</span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile Saya</Link>
                      <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 font-bold hover:bg-red-50">Keluar</button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={openLoginModal} 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105"
                >
                  {t('login')}
                </button>
              )}
            </div>

            {/* HAMBURGER MENU */}
            <div className="lg:hidden flex items-center z-50">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="text-white p-2 rounded-lg hover:bg-white/10 transition focus:outline-none"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5 relative">
                  <span className={`h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE OVERLAY MENU */}
        <div className={`fixed inset-0 bg-[#0B1120] z-40 transition-all duration-300 lg:hidden flex flex-col pt-24 px-6 h-screen ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
           <div className="flex flex-col gap-4">
             {navLinks.map((item, idx) => (
                <Link 
                  key={item.path} 
                  href={item.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold text-gray-300 hover:text-white py-3 border-b border-white/5 hover:pl-2 transition-all"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {item.label}
                </Link>
             ))}
           </div>

           <div className="mt-8 pt-8 border-t border-white/10">
             {user ? (
               <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500 relative">
                        <NextImage src={user.avatar} alt="User" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">{user.name}</p>
                      <p className="text-indigo-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block w-full bg-indigo-600 text-white text-center py-3 rounded-xl font-bold mb-3">
                    Ke Dashboard
                  </Link>
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="block w-full border border-red-500/30 text-red-400 text-center py-3 rounded-xl font-bold hover:bg-red-500/10">
                    Keluar
                  </button>
               </div>
             ) : (
               <button 
                onClick={() => { setIsMobileMenuOpen(false); openLoginModal(); }} 
                className="w-full bg-indigo-600 text-white text-lg py-4 rounded-2xl font-bold shadow-xl"
               >
                 Login / Register
               </button>
             )}
           </div>

           <div className="mt-auto pb-24 flex justify-center gap-4">
              <button onClick={() => toggleLanguage('EN')} className={`px-6 py-2 rounded-full border ${language === 'EN' ? 'bg-white text-black border-white' : 'text-gray-400 border-gray-700'}`}>English</button>
              <button onClick={() => toggleLanguage('ID')} className={`px-6 py-2 rounded-full border ${language === 'ID' ? 'bg-white text-black border-white' : 'text-gray-400 border-gray-700'}`}>Indonesia</button>
           </div>
        </div>
      </nav>

      {/* MODAL LOGIN */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={closeLoginModal} 
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-linear-to-tr from-indigo-500 to-purple-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-200">
                👤
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang</h3>
              <p className="text-gray-500 mb-8">Silakan pilih peran untuk melanjutkan</p>
              
              <div className="space-y-4">
                {/* PERBAIKAN: Gunakan variabel loginAsBuyer/Seller dari top-level, BUKAN useAuth().loginAs... */}
                <button 
                  onClick={loginAsBuyer} 
                  className="group w-full flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50/50 hover:shadow-md transition-all duration-300 bg-gray-50/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">B</div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900 group-hover:text-indigo-700">Akun Pembeli</h4>
                      <p className="text-xs text-gray-500">Budi Santoso</p>
                    </div>
                  </div>
                  <span className="text-gray-300 group-hover:text-indigo-600 font-bold">→</span>
                </button>

                <button 
                  onClick={loginAsSeller} 
                  className="group w-full flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:border-purple-500 hover:bg-purple-50/50 hover:shadow-md transition-all duration-300 bg-gray-50/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">S</div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-700">Akun Agen</h4>
                      <p className="text-xs text-gray-500">Siti Properti</p>
                    </div>
                  </div>
                  <span className="text-gray-300 group-hover:text-purple-600 font-bold">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}