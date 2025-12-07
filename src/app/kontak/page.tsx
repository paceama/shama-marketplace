"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/context/LanguageContext';
import FadeIn from '@/components/FadeIn';
import NextImage from 'next/image';

export default function ContactPage() {
  const { language } = useLanguage();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedTopic, setSelectedTopic] = useState('Buying Property');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100">
      <Navbar />

      {/* 1. IMMERSIVE HERO BACKGROUND */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <NextImage 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Office"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/80 via-slate-900/60 to-[#0f172a]"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-20">
          <FadeIn>
            <span className="inline-block py-1 px-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-6">
              24/7 Support
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
              {language === 'EN' ? "Let's Start a Conversation" : "Mari Mulai Diskusi"}
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              {language === 'EN' 
                ? 'Can’t find what you’re looking for? Tell us your requirements, and we will find it for you.' 
                : 'Tidak menemukan properti yang cocok? Beritahu kami kebutuhan Anda, kami akan carikan khusus untuk Anda.'}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* 2. FLOATING CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* KOLOM KIRI: CONTACT TILES */}
          <div className="lg:col-span-4 space-y-4">
             <FadeIn delay={0.1}>
              <div className="group bg-slate-800/50 backdrop-blur-xl border border-white/5 p-6 rounded-3xl hover:bg-indigo-600 transition-all duration-300 cursor-pointer shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider group-hover:text-indigo-200">Call Us</p>
                    <p className="text-white font-bold text-lg">+62 812 3456 7890</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="group bg-slate-800/50 backdrop-blur-xl border border-white/5 p-6 rounded-3xl hover:bg-emerald-600 transition-all duration-300 cursor-pointer shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-emerald-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider group-hover:text-emerald-200">Email Us</p>
                    <p className="text-white font-bold text-lg">hello@shama.com</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* KOLOM KANAN: DARK PREMIUM FORM */}
          <FadeIn delay={0.4} className="lg:col-span-8">
            {/* Perubahan: bg-slate-800/80 (Dark Glass) & border-white/10 */}
            <div className="bg-slate-800/80 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-white/10 relative overflow-hidden">
              
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-20 animate-in fade-in slide-in-from-bottom-4">
                  <div className="w-24 h-24 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-6 text-5xl border border-emerald-500/20 shadow-emerald-900/20 shadow-lg">✨</div>
                  <h3 className="text-3xl font-extrabold text-white mb-4">Request Sent!</h3>
                  <p className="text-gray-400 max-w-md text-lg">Agen kami akan segera mencarikan properti yang sesuai dengan kriteria Anda dan menghubungi Anda secepatnya.</p>
                  <button onClick={() => setFormStatus('idle')} className="mt-10 px-8 py-3 rounded-full border border-indigo-500 text-indigo-400 font-bold hover:bg-indigo-600 hover:text-white transition">Kirim Pesan Lain</button>
                </div>
              ) : (
                <>
                  <div className="relative z-10 mb-10">
                    <h2 className="text-3xl font-extrabold text-white mb-2">
                      {language === 'EN' ? 'Tell us your needs' : 'Beritahu Kebutuhan Anda'}
                    </h2>
                    <p className="text-slate-400 text-lg">
                      {language === 'EN' ? 'Fill out the form below.' : 'Isi formulir di bawah ini.'}
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group space-y-2">
                        <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Full Name</label>
                        {/* Style Input Baru: Dark, Bordered, Clean */}
                        <input required type="text" placeholder="John Doe" className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                      </div>
                      <div className="group space-y-2">
                        <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Email Address</label>
                        <input required type="email" placeholder="john@example.com" className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group space-y-2">
                        <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Phone Number</label>
                        <input type="tel" placeholder="+62..." className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
                      </div>
                      
                      <div className="group space-y-2">
                        <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Topic</label>
                        <div className="relative">
                          <select 
                              value={selectedTopic}
                              onChange={(e) => setSelectedTopic(e.target.value)}
                              className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                          >
                            <option className="bg-slate-900 text-gray-300" value="Buying Property">General Inquiry (Umum)</option>
                            <option className="bg-slate-900 text-indigo-300 font-bold" value="Request Property">Request Specific Property (Carikan Saya)</option>
                            <option className="bg-slate-900 text-gray-300" value="Selling Property">Selling Property (Saya Penjual)</option>
                            <option className="bg-slate-900 text-gray-300" value="Partnership">Partnership</option>
                          </select>
                          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                        </div>
                      </div>
                    </div>

                    {/* --- FITUR DINAMIS: REQUEST PROPERTY (DARK MODE) --- */}
                    {selectedTopic === 'Request Property' && (
                        <div className="bg-indigo-500/10 p-8 rounded-2xl border border-indigo-500/30 space-y-6 animate-in fade-in slide-in-from-top-4">
                            <h4 className="font-bold text-indigo-200 flex items-center gap-2 text-lg">
                                🏠 {language === 'EN' ? 'Property Requirements' : 'Detail Properti yang Dicari'}
                            </h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-bold text-indigo-300/80 uppercase mb-2 block">Location</label>
                                    <input type="text" placeholder="e.g. Canggu" className="w-full bg-slate-900/80 px-4 py-3 rounded-lg border border-indigo-500/30 text-white focus:outline-none focus:border-indigo-400" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-indigo-300/80 uppercase mb-2 block">Property Type</label>
                                    <select className="w-full bg-slate-900/80 px-4 py-3 rounded-lg border border-indigo-500/30 text-white focus:outline-none focus:border-indigo-400">
                                        <option>Villa</option>
                                        <option>Land</option>
                                        <option>Apartment</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-bold text-indigo-300/80 uppercase mb-2 block">Budget Range</label>
                                    <input type="text" placeholder="e.g. 2M - 5M IDR" className="w-full bg-slate-900/80 px-4 py-3 rounded-lg border border-indigo-500/30 text-white focus:outline-none focus:border-indigo-400" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-indigo-300/80 uppercase mb-2 block">Bedrooms</label>
                                    <select className="w-full bg-slate-900/80 px-4 py-3 rounded-lg border border-indigo-500/30 text-white focus:outline-none focus:border-indigo-400">
                                        <option>Any</option>
                                        <option>1+</option>
                                        <option>2+</option>
                                        <option>3+</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="group space-y-2">
                      <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                          {selectedTopic === 'Request Property' ? 'Specific Needs / Notes' : 'Your Message'}
                      </label>
                      <textarea required rows={4} placeholder="Tell us more details..." className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"></textarea>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button 
                        type="submit" 
                        disabled={formStatus === 'submitting'}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-indigo-900/50 hover:shadow-indigo-600/50 hover:-translate-y-1 flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                        {formStatus === 'submitting' ? 'Sending...' : (language === 'EN' ? 'Send Request' : 'Kirim Permintaan')}
                        <span>→</span>
                        </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </FadeIn>
        </div>

        {/* 3. MAP SECTION FULL WIDTH */}
        <FadeIn className="mt-24">
           <div className="rounded-[2.5rem] overflow-hidden shadow-2xl h-[450px] relative group grayscale hover:grayscale-0 transition-all duration-700 border border-white/5">
             <NextImage 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=80"
                alt="Map Location"
                fill
                className="object-cover"
             />
             <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex flex-col items-center justify-center">
                <h3 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg">Visit Our HQ</h3>
                <a 
                  href="https://maps.google.com" 
                  target="_blank"
                  className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold shadow-2xl hover:scale-110 transition transform flex items-center gap-2"
                >
                  📍 Open Google Maps
                </a>
             </div>
           </div>
        </FadeIn>

        {/* 4. FAQ */}
        <FadeIn className="mt-24 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-12">Frequently Asked Questions</h2>
            <div className="grid gap-4 text-left">
                {[
                { q: 'Apakah ada biaya konsultasi?', a: 'Tidak. Konsultasi awal dengan tim Shama Market 100% Gratis.' },
                { q: 'Bisakah saya titip jual properti?', a: 'Tentu. Kami memiliki jaringan ke ribuan investor. Silakan pilih topik "Selling Property" di formulir.' },
                ].map((faq, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-white/5 rounded-2xl p-6 hover:bg-slate-800/80 transition cursor-pointer">
                    <h4 className="text-white font-bold text-lg mb-2">{faq.q}</h4>
                    <p className="text-gray-400">{faq.a}</p>
                </div>
                ))}
            </div>
        </FadeIn>

      </div>
    </div>
  );
}