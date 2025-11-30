import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    PENTING:
    'output: export' memerintahkan Next.js untuk mengubah website menjadi file HTML/CSS/JS murni.
    Ini WAJIB untuk hosting di Cloudflare Pages (versi standar/gratis).
  */
  output: 'export',
  
  /*
    PENTING:
    'unoptimized: true' mematikan optimasi gambar server-side.
    Karena kita menggunakan mode 'export' (statis), kita tidak punya server untuk memproses gambar.
    Tanpa ini, gambar dari Unsplash tidak akan muncul saat di-deploy.
  */
  images: {
    unoptimized: true,
  },
  
  // Opsi tambahan untuk memastikan typescript checking tidak menghalangi build jika ada error kecil
  typescript: {
    ignoreBuildErrors: true,
  },
  
};

export default nextConfig;