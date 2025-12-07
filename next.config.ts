import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Wajib: Agar menghasilkan folder 'out' untuk Cloudflare
  images: {
    unoptimized: true, // Wajib: Agar gambar jalan di mode static
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;