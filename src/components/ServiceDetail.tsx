
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import { motion } from 'motion/react';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = SERVICES.find((s) => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!service) {
      navigate('/');
    }
  }, [service, navigate]);

  if (!service) return null;

  return (
    <div className="pt-24 min-h-screen bg-stone-50">
      {/* Header Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {service.image ? (
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-soft-pink flex items-center justify-center">
            <span className="text-9xl opacity-10">{service.icon}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-rose-gold text-2xl mb-4 block"
            >
              {service.icon}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif font-bold mb-4"
            >
              {service.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-1 bg-rose-gold mx-auto"
            ></motion.div>
          </div>
        </div>
        <Link
          to="/"
          className="absolute top-8 left-8 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-all group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6" /></svg>
        </Link>
      </section>

      {/* Content Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-rose-gold font-bold tracking-widest uppercase text-sm mb-4 block">Sobre el tratamiento</span>
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-8 leading-tight">
              Excelencia y cuidado en cada detalle de tu <span className="italic">{service.title}</span>.
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-8 whitespace-pre-line">
              {service.longDescription}
            </p>
            <Link
              to="/#contacto"
              className="inline-block bg-rose-gold text-white px-12 py-4 rounded-xl font-bold shadow-lg hover:bg-rose-900 transition-all transform hover:scale-105"
            >
              Reservar Cita
            </Link>
          </div>

          <div className="space-y-12">
            <div className="bg-soft-pink/30 p-1 rounded-3xl min-h-[400px] flex items-center justify-center">
              {service.image ? (
                <img
                  src={service.image}
                  alt="Detail"
                  className="rounded-3xl shadow-xl w-full h-[400px] object-cover"
                />
              ) : (
                <div className="text-8xl opacity-10">{service.icon}</div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-stone-100">
                <h4 className="font-bold text-stone-900 mb-1">Resultado</h4>
                <p className="text-stone-500 text-sm">Inmediato y duradero</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before and After Section */}
      {service.beforeAfterImages && service.beforeAfterImages.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-16">Resultados Reales (Antes y Después)</h2>
            <div className="space-y-16">
              {service.beforeAfterImages.map((pair, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="relative group">
                    <img src={pair.before} alt="Antes" className="rounded-3xl shadow-lg w-full h-[500px] object-contain bg-stone-100" />
                    <div className="absolute top-6 left-6 bg-stone-900/80 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest backdrop-blur-sm">
                      Antes
                    </div>
                  </div>
                  <div className="relative group">
                    <img src={pair.after} alt="Después" className="rounded-3xl shadow-lg w-full h-[500px] object-contain bg-stone-100" />
                    <div className="absolute top-6 left-6 bg-rose-gold text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest shadow-xl">
                      Después
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {service.gallery && service.gallery.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-16">Nuestros Trabajos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.gallery.map((img, index) => (
                <div key={index} className="relative group overflow-hidden rounded-3xl shadow-lg aspect-square bg-stone-50">
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className={`w-full h-full ${((service.id === 'pedicura' && index === 3) || (service.id === 'cara' && index >= 1))
                      ? 'object-cover' : 'object-contain'
                      } ${(service.id === 'cara' && index === 1) ? 'scale-[2] object-center' : ''} transition-transform duration-700 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ or Tips - Optional Extra */}
      <section className="py-24 bg-soft-pink/20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-serif font-bold text-stone-900 mb-6 font-italic">¿Por qué elegir nuestro Studio?</h3>
          <p className="text-stone-600 mb-12">
            Utilizamos tecnología de vanguardia y productos hipoalergénicos para garantizar tu seguridad y confort. Nuestra prioridad es tu satisfacción.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-white rounded-full text-stone-600 font-medium border border-stone-100 shadow-sm">Productos Premium</div>
            <div className="px-6 py-3 bg-white rounded-full text-stone-600 font-medium border border-stone-100 shadow-sm">Expertas Certificadas</div>
            <div className="px-6 py-3 bg-white rounded-full text-stone-600 font-medium border border-stone-100 shadow-sm">Ambiente Relajante</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
