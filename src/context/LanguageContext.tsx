"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'EN' | 'ID';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // Fungsi helper sederhana untuk teks statis
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Dictionary untuk teks statis di UI
const translations = {
  EN: {
    home: 'Home',
    search: 'Search Properties',
    news: 'News',
    contact: 'Contact Us',
    login: 'Login',
    heroTitle: 'Find Your Dream Home in Bali',
    heroSubtitle: 'Shama Realestate Market provides the best property choices from villas, land, to commercial living.',
    featuredProp: 'Featured Properties',
    featuredPropSub: 'Best choices this week',
    viewAll: 'View All',
    latestNews: 'Latest News',
    latestNewsSub: 'Latest property market insights',
    readAll: 'Read All',
    priceStart: 'Price Starts From',
    contactSeller: 'Contact Seller',
    searchPageTitle: 'Search Properties',
    newsPageTitle: 'News & Articles',
    showingAll: 'Showing all available properties',
  },
  ID: {
    home: 'Beranda',
    search: 'Cari Properti',
    news: 'Berita',
    contact: 'Hubungi Kami',
    login: 'Masuk',
    heroTitle: 'Temukan Hunian Impian di Bali',
    heroSubtitle: 'Shama Realestate Market menyediakan pilihan properti terbaik mulai dari villa, tanah, hingga hunian komersial.',
    featuredProp: 'Properti Unggulan',
    featuredPropSub: 'Pilihan terbaik minggu ini',
    viewAll: 'Lihat Semua',
    latestNews: 'Berita Terkini',
    latestNewsSub: 'Wawasan pasar properti terbaru',
    readAll: 'Baca Semua',
    priceStart: 'Harga Mulai Dari',
    contactSeller: 'Hubungi Penjual',
    searchPageTitle: 'Cari Properti',
    newsPageTitle: 'Berita & Artikel',
    showingAll: 'Menampilkan seluruh properti tersedia',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN'); // Default Inggris

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['EN']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}