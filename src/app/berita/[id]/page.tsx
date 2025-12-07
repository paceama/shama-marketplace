import { newsData } from '@/data/news';
import ClientNewsDetail from './ClientNewsDetail';

// Ini fungsi Server (Build time)
export async function generateStaticParams() {
  return newsData.map((news) => ({
    id: news.id.toString(),
  }));
}

// Ini komponen pembungkus
export default function NewsPage() {
  return <ClientNewsDetail />;
}