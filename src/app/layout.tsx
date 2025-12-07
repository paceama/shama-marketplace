import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // Import Font Google
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Kita akan buat ini nanti
import { AnimationProvider } from "@/context/AnimationContext"; // Import baru
import { AuthProvider } from "@/context/AuthContext"; // Import baru

// Konfigurasi Font
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: "Shama Realestate Market",
  description: "Bali Property Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased bg-gray-50 text-gray-900`}>
        <LanguageProvider>
          <AnimationProvider>
            <AuthProvider> {/* Bungkus AuthProvider di sini */}
              {children}
              <Footer /> 
            </AuthProvider>
          </AnimationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}