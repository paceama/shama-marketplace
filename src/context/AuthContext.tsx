"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller';
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isLoginModalOpen: boolean; // State Modal Global
  openLoginModal: () => void; // Fungsi Buka Modal
  closeLoginModal: () => void; // Fungsi Tutup Modal
  loginAsBuyer: () => void;
  loginAsSeller: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State dipindah ke sini

  useEffect(() => {
    const savedUser = localStorage.getItem('shama_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const loginAsBuyer = () => {
    const dummyBuyer: User = {
      id: 'user_1',
      name: 'Budi Santoso',
      email: 'budi@gmail.com',
      role: 'buyer',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
    };
    setUser(dummyBuyer);
    localStorage.setItem('shama_user', JSON.stringify(dummyBuyer));
    setIsLoginModalOpen(false); // Tutup modal otomatis setelah login
  };

  const loginAsSeller = () => {
    const dummySeller: User = {
      id: 'user_2',
      name: 'Siti Properti',
      email: 'siti@agency.com',
      role: 'seller',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    };
    setUser(dummySeller);
    localStorage.setItem('shama_user', JSON.stringify(dummySeller));
    setIsLoginModalOpen(false); // Tutup modal otomatis
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shama_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoginModalOpen, 
      openLoginModal: () => setIsLoginModalOpen(true), 
      closeLoginModal: () => setIsLoginModalOpen(false),
      loginAsBuyer, 
      loginAsSeller, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}