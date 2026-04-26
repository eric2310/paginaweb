
import React from 'react';
import { Link } from 'react-router-dom';
import { STUDIO_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b border-stone-800 pb-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-serif font-bold text-white mb-2">
              Alonso <span className="text-rose-gold">Beauty Studio</span>
            </h2>
            <p className="max-w-xs text-sm italic">
              Donde la dulzura se encuentra con la excelencia estética.
            </p>
          </div>

          <div className="flex gap-8 text-sm uppercase tracking-widest">
            <Link to="/#inicio" className="hover:text-rose-gold transition-colors">Inicio</Link>
            <Link to="/#servicios" className="hover:text-rose-gold transition-colors">Servicios</Link>
            <Link to="/#contacto" className="hover:text-rose-gold transition-colors">Contacto</Link>
          </div>

          <div className="flex gap-6">
            <a
              href={STUDIO_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-gold transition-colors"
            >
              <span className="sr-only">Instagram</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            </a>
          </div>
        </div>

        <div className="mt-12 text-center text-xs flex flex-col md:flex-row justify-between gap-4">
          <p>© {new Date().getFullYear()} {STUDIO_INFO.name}. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-white">Aviso Legal</a>
            <a href="#" className="hover:text-white">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
