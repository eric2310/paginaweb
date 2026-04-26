
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { STUDIO_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-rose-gold">
          {STUDIO_INFO.name.split(' ')[0]} <span className="text-stone-400 font-light">Beauty</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest text-stone-600">
          <Link to="/#inicio" className="hover:text-rose-gold transition-colors">Inicio</Link>
          <Link to="/#servicios" className="hover:text-rose-gold transition-colors">Servicios</Link>
          <Link to="/#contacto" className="hover:text-rose-gold transition-colors">Contacto</Link>
          <a
            href={STUDIO_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-gold hover:scale-110 transition-transform"
            title="Síguenos en Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
          </a>
        </div>

        <Link
          to="/#contacto"
          className="bg-rose-gold text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-rose-900 transition-all shadow-md"
        >
          Citarse
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
