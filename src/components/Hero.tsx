
import React from 'react';
import { STUDIO_INFO } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/portada.jpeg"
          alt="Alonso Beauty Studio - Especialistas en Uñas"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/30 via-transparent to-stone-50"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <span className="inline-block text-rose-gold font-medium tracking-[0.3em] uppercase mb-4 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
          Zaragoza • Tu rincón de mimos
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 leading-tight mb-6 opacity-0 animate-[fadeIn_1s_0.3s_ease-out_forwards]">
          Tus manos hablan de ti, <span className="italic">hazlas brillar</span>.
        </h1>
        <p className="text-lg md:text-xl text-stone-700 mb-10 max-w-2xl mx-auto font-medium opacity-0 animate-[fadeIn_1s_0.6s_ease-out_forwards]">
          Bienvenida a tu espacio de belleza.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center opacity-0 animate-[fadeIn_1s_0.9s_ease-out_forwards]">
          <a href="#servicios" className="bg-rose-gold text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-rose-900 transition-all shadow-lg transform hover:-translate-y-1">
            Ver Servicios
          </a>
          <a
            href={STUDIO_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-rose-gold text-rose-gold px-10 py-4 rounded-full text-lg font-medium hover:bg-rose-gold hover:text-white transition-all shadow-sm transform hover:-translate-y-1 bg-white/50 backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            Instagram
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
