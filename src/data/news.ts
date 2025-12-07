export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Tren Properti Bali 2025: Kawasan Utara Mulai Dilirik",
    excerpt: "Investor mulai beralih ke kawasan Buleleng dan Karangasem seiring padatnya Bali Selatan.",
    date: "8 Des 2025",
    category: "Market Update",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Tips Membeli Tanah Girik vs SHM di Bali",
    excerpt: "Pahami risiko dan keuntungan sebelum memutuskan membeli tanah adat atau bersertifikat.",
    date: "6 Des 2025",
    category: "Edukasi",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Kenaikan Pajak Wisatawan Asing, Apa Dampaknya?",
    excerpt: "Analisis dampak kebijakan baru terhadap permintaan sewa villa jangka pendek.",
    date: "5 Des 2025",
    category: "Regulasi",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Desain Villa Tropis Modern yang Paling Diminati",
    excerpt: "Inspirasi arsitektur yang memadukan kenyamanan modern dengan nuansa alam Bali.",
    date: "3 Des 2025",
    category: "Arsitektur",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Canggu vs Pererenan: Mana yang Lebih Menguntungkan?",
    excerpt: "Perbandingan ROI (Return on Investment) untuk sewa harian di dua lokasi hits ini.",
    date: "1 Des 2025",
    category: "Investasi",
    image: "https://images.unsplash.com/photo-1570211776045-af3a51026f4a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Panduan Renovasi Rumah Tua di Denpasar",
    excerpt: "Cara hemat menyulap rumah tua menjadi hunian estetik bernilai jual tinggi.",
    date: "28 Nov 2025",
    category: "Tips",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Digital Nomad & Pergeseran Gaya Hunian",
    excerpt: "Fasilitas co-living dan work-friendly villa kini menjadi standar baru.",
    date: "25 Nov 2025",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    title: "Peluang Investasi di Nusa Penida",
    excerpt: "Melihat potensi perkembangan infrastruktur dan pariwisata di pulau tetangga.",
    date: "20 Nov 2025",
    category: "Investasi",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80"
  }
];