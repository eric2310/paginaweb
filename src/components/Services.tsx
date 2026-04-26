
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="servicios" className="py-24 bg-soft-pink">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">Nuestros Servicios</h2>
          <div className="w-24 h-1 bg-rose-gold mx-auto mb-6"></div>
          <p className="text-stone-500 max-w-xl mx-auto">
            Cada tratamiento es una experiencia personalizada diseñada para resaltar lo mejor de ti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                {service.image ? (
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-soft-pink flex items-center justify-center">
                    <span className="text-6xl filter grayscale opacity-20 transform group-hover:scale-110 transition-transform duration-700">
                      {service.icon}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <div className="p-8">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3">{service.title}</h3>
                <p className="text-stone-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link to={`/servicios/${service.id}`} className="text-rose-gold font-bold text-sm tracking-widest uppercase flex items-center group-hover:gap-2 transition-all">
                  Saber más <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
