import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Pastikan baris ini ADA
  images: {
    unoptimized: true, // Pastikan baris ini ADA
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;