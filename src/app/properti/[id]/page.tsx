import { properties } from '@/data/properties';
import ClientPropertyDetail from './ClientPropertyDetail';

// Fungsi Server untuk Static Export
export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id.toString(),
  }));
}

export default function PropertyPage() {
  return <ClientPropertyDetail />;
}