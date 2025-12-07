"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

// Defaultnya kita anggap true (animasi nyala) dulu agar aman saat Server Side Rendering
const AnimationContext = createContext({ shouldAnimate: true });

export const AnimationProvider = ({ children }: { children: React.ReactNode }) => {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Cek Session Storage (Memori browser yang hilang jika tab ditutup)
    const visited = sessionStorage.getItem('has_visited_shama');

    if (visited) {
      // Jika sudah ada tanda visited, matikan animasi
      setShouldAnimate(false);
    } else {
      // Jika belum, biarkan animasi nyala, tapi simpan tanda untuk kunjungan berikutnya
      sessionStorage.setItem('has_visited_shama', 'true');
      setShouldAnimate(true);
    }
  }, []);

  return (
    <AnimationContext.Provider value={{ shouldAnimate }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => useContext(AnimationContext);