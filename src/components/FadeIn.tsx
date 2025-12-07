"use client";

import { motion } from "framer-motion";
import { useAnimation } from "@/context/AnimationContext";

export default function FadeIn({ 
  children, 
  delay = 0, 
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  className?: string; 
}) {
  const { shouldAnimate } = useAnimation();

  // Jika shouldAnimate FALSE (sudah pernah berkunjung), 
  // kita render DIV biasa tanpa efek Framer Motion.
  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  // Jika TRUE (kunjungan pertama), jalankan animasi
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}