"use client"; 

import NextImage from 'next/image';
import { useRouter } from 'next/navigation'; // Import Router
import { Property } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice } from '@/utils/currency';
import { useAuth } from '@/context/AuthContext'; // Import Auth

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { language } = useLanguage();
  const { user, openLoginModal } = useAuth(); // Ambil user & fungsi buka modal
  const router = useRouter(); // Untuk navigasi manual

  // FUNGSI CEK LOGIN
  const handleDetailClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Cegah link default
    
    if (user) {
      // Jika sudah login, pergi ke halaman detail
      router.push(`/properti/${property.id}`);
    } else {
      // Jika belum, buka modal login
      openLoginModal();
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-[0_20px_50px_rgba(8,112,184,0.1)] transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full hover:-translate-y-1">
      {/* Gambar Properti */}
      <div className="relative h-64 w-full overflow-hidden cursor-pointer" onClick={handleDetailClick}>
        <NextImage 
          src={property.image} 
          alt={property.title[language === 'EN' ? 'en' : 'id']} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-900 shadow-sm">
          {property.type}
        </div>
      </div>

      {/* Konten Card */}
      <div className="p-5 flex flex-col grow">
        <div className="mb-4 cursor-pointer" onClick={handleDetailClick}>
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">{property.location}</p>
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {property.title[language === 'EN' ? 'en' : 'id']} 
          </h3>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <span className="bg-gray-50 px-2 py-1 rounded border border-gray-100">
            {property.specs[language === 'EN' ? 'en' : 'id']}
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(property.price, language)}
          </span>
          
          {/* Ubah Link menjadi Tombol/Div dengan onClick */}
          <button 
            onClick={handleDetailClick}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 focus:outline-none"
          >
            {language === 'EN' ? 'View Details' : 'Lihat Detail'}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}