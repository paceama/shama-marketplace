export interface Property {
    id: number;
    title: { en: string; id: string };
    location: string;
    price: number;
    image: string;
    specs: { en: string; id: string };
    type: 'Dijual' | 'Sewa';
    // TAMBAHAN BARU:
    agent: {
      name: string;
      photo: string;
      phone: string;
    };
    promoCode?: string; // Opsional (tanda tanya)
}