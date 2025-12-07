import Image from 'next/image';
import Link from 'next/link';
import { NewsItem } from '@/data/news';

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col">
      {/* Gambar Berita */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={news.image} 
          alt={news.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-indigo-600/90 text-white px-2 py-1 rounded text-xs font-semibold">
          {news.category}
        </div>
      </div>

      {/* Konten */}
      <div className="p-5 flex flex-col grow">
        <span className="text-xs text-gray-400 mb-2 block">{news.date}</span>
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {news.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 grow">
          {news.excerpt}
        </p>
        
        <Link href={`/berita/${news.id}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mt-auto">
          Baca Selengkapnya
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </Link>
      </div>
    </div>
  );
}