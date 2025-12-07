import { Property } from '@/types';

export const properties: Property[] = [
  {
    id: 1,
    title: { en: "Minimalist Villa Canggu", id: "Villa Minimalis Canggu" },
    location: "Canggu, Bali",
    price: 3500000000, // 3.5 Miliar
    image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80",
    specs: { en: "3 Bed • 2 Bath • Pool", id: "3 Kamar • 2 Mandi • Kolam" },
    type: "Dijual",
    agent: {
      name: "Sarah Wijaya",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      phone: "+6281234567890"
    },
    promoCode: "CANGGU_DEAL_25"
  },
  {
    id: 2,
    title: { en: "Ubud Rice Field Land Plot", id: "Tanah Plot Ubud View Sawah" },
    location: "Ubud, Gianyar",
    price: 850000000, // 850 Juta
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    specs: { en: "500 m² • Freehold", id: "500 m² • SHM" },
    type: "Dijual",
    agent: {
      name: "Budi Santoso",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      phone: "+6281987654321"
    },
    promoCode: "UBUD_PEACE"
  },
  {
    id: 3,
    title: { en: "Seminyak Loft Apartment", id: "Apartemen Loft Seminyak" },
    location: "Seminyak, Bali",
    price: 150000000, // 150 Juta
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    specs: { en: "1 Bed • 1 Bath • Furnished", id: "1 Kamar • 1 Mandi • Full Perabot" },
    type: "Sewa",
    agent: {
      name: "Jessica Tan",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
      phone: "+628122334455"
    },
    promoCode: "RENT_DISC_10"
  },
  {
    id: 4,
    title: { en: "Luxury Cliff Villa Uluwatu", id: "Luxury Cliff Villa Uluwatu" },
    location: "Uluwatu, Pecatu",
    price: 12500000000, // 12.5 Miliar
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    specs: { en: "4 Bed • Infinity Pool • Ocean View", id: "4 Kamar • Infinity Pool • View Laut" },
    type: "Dijual",
    agent: {
      name: "Michael Chen",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      phone: "+628111222333"
    }
    // PromoCode opsional, jadi boleh tidak ada
  },
  {
    id: 5,
    title: { en: "Family Home Denpasar", id: "Rumah Keluarga Denpasar" },
    location: "Renon, Denpasar",
    price: 2100000000, // 2.1 Miliar
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    specs: { en: "3 Bed • 2 Bath • Garage", id: "3 Kamar • 2 Mandi • Garasi Luas" },
    type: "Dijual",
    agent: {
      name: "Sarah Wijaya",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      phone: "+6281234567890"
    },
    promoCode: "FAMILY_FIRST"
  },
  {
    id: 6,
    title: { en: "Cozy Villa Pererenan", id: "Cozy Villa Pererenan" },
    location: "Pererenan, Mengwi",
    price: 250000000, // 250 Juta
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    specs: { en: "2 Bed • Private Pool • Quiet", id: "2 Kamar • Private Pool • Tenang" },
    type: "Sewa",
    agent: {
      name: "Budi Santoso",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      phone: "+6281987654321"
    }
  },
  {
    id: 7,
    title: { en: "Commercial Land Sanur", id: "Tanah Komersial Sanur" },
    location: "Sanur, Denpasar",
    price: 12000000000, // 12 Miliar
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    specs: { en: "1000 m² • Tourism Zone", id: "1000 m² • Zona Pariwisata" },
    type: "Dijual",
    agent: {
      name: "Jessica Tan",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
      phone: "+628122334455"
    },
    promoCode: "BIZ_START"
  },
  {
    id: 8,
    title: { en: "Modern Townhouse Jimbaran", id: "Modern Townhouse Jimbaran" },
    location: "Jimbaran, Kuta Selatan",
    price: 1800000000, // 1.8 Miliar
    image: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80",
    specs: { en: "2 Bed • Smart Home", id: "2 Kamar • Smart Home" },
    type: "Dijual",
    agent: {
      name: "Michael Chen",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      phone: "+628111222333"
    }
  }
];