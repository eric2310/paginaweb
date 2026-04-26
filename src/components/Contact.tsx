
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import { STUDIO_INFO, SERVICES } from '../constants';
import { ContactForm } from '../types';

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    const serviceName = SERVICES.find(s => s.id === form.service)?.title || form.service || 'No especificado';

    try {
      await emailjs.send(
        STUDIO_INFO.emailjs.serviceId,
        STUDIO_INFO.emailjs.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          service: serviceName,
          message: form.message || 'Sin mensaje adicional',
          to_email: 'ericalonso459@gmail.com',
        },
        STUDIO_INFO.emailjs.publicKey
      );

      setShowSuccess(true);
      setForm({ name: '', email: '', service: '', message: '' });
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      setError('Error al enviar. Inténtalo de nuevo o contacta por WhatsApp.');
      console.error('EmailJS error:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-white relative">
      {/* Notificación Bonita */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4"
          >
            <div className="bg-white border border-rose-gold/20 shadow-2xl rounded-2xl p-6 flex items-center gap-4 backdrop-blur-sm bg-white/90">
              <div className="w-12 h-12 bg-rose-gold rounded-full flex items-center justify-center text-white shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-lg">¡Solicitud Enviada!</h4>
                <p className="text-stone-600 text-sm">Gracias, cielo. Te responderemos muy pronto para confirmar tu cita.</p>
              </div>
              <button
                onClick={() => setShowSuccess(false)}
                className="ml-auto text-stone-400 hover:text-stone-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-8">Ven a vernos</h2>
            <p className="text-stone-600 mb-12 text-lg">
              Estamos listos para recibirte con una sonrisa y brindarte el mejor servicio personalizado.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-soft-pink p-3 rounded-full text-rose-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Email</h4>
                  <p className="text-stone-600">{STUDIO_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-soft-pink p-3 rounded-full text-rose-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">WhatsApp</h4>
                  <a
                    href={`https://wa.me/${STUDIO_INFO.phone.replace(/\s+/g, '').replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-600 hover:text-rose-gold transition-colors"
                  >
                    {STUDIO_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-soft-pink p-3 rounded-full text-rose-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Horario</h4>
                  <p className="text-stone-900 font-bold"> Cita previa </p>
                  {STUDIO_INFO.hours.map((h, i) => (
                    <p key={i} className="text-stone-600">{h.days}: {h.time}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-soft-pink p-3 rounded-full text-rose-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Ubicación</h4>
                  <p className="text-stone-600">{STUDIO_INFO.address}</p>
                </div>
              </div>
            </div>



            {/* Mapa */}
            <div className="mt-8 rounded-2xl overflow-hidden shadow-sm border border-stone-100">

              <iframe
                title="Ubicación de Alonso Beauty Studio"
                src={STUDIO_INFO.mapEmbed}
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="bg-stone-50 p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100">
            <h3 className="text-3xl font-serif font-bold text-stone-900 mb-6">Pide tu cita</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Nombre</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-gold/20 focus:border-rose-gold transition-all"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-gold/20 focus:border-rose-gold transition-all"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Servicio de interés</label>
                <select
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-gold/20 focus:border-rose-gold transition-all appearance-none"
                  value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                >
                  <option value="">Selecciona un servicio...</option>
                  {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Mensaje</label>
                <textarea
                  rows={4}
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-gold/20 focus:border-rose-gold transition-all"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                ></textarea>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-rose-gold text-white font-bold py-4 rounded-xl shadow-lg hover:bg-rose-900 transition-all transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {sending ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
