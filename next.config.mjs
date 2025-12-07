/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Ini perintah wajib untuk Cloudflare
  images: {
    unoptimized: true, // Ini wajib agar gambar tidak error
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;