
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServiceDetail from './components/ServiceDetail';

const ScrollToAnchor = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  return null;
};

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />

      {/* About Minimal Section */}
      <section id="empresa" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-soft-pink rounded-full -z-10 animate-pulse"></div>
              <img
                src="/images/studio-session.jpg"
                alt="Alonso Beauty Studio Professional Session"
                className="rounded-3xl shadow-2xl z-10 relative object-cover w-full h-[500px]"
              />
            </div>
            <div className="lg:w-1/2">
              <span className="text-rose-gold font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Nuestra Esencia</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-8 leading-tight">
                Un refugio de paz y belleza en el centro de <span className="text-rose-gold italic">Zaragoza</span>.
              </h2>
              <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                Creemos que la belleza va más allá de lo superficial. Es un momento de autocuidado, una pausa necesaria en tu rutina diaria.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-bold text-stone-900 mb-2">Profesionalidad</h4>
                  <p className="text-stone-500 text-sm">Experto titulado con 14 años de experiencia en el sector.</p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 mb-2">Calidad</h4>
                  <p className="text-stone-500 text-sm">Solo utilizamos los mejores productos del mercado.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <ScrollToAnchor />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios/:id" element={<ServiceDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
