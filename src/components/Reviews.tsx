import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import { REVIEWS, SERVICES, STUDIO_INFO } from '../constants';
import { Review } from '../types';

const RATING_LABELS: Record<number, string> = {
  1: 'Necesita mejorar',
  2: 'Regular',
  3: 'Bueno',
  4: 'Muy bueno',
  5: '¡Excelente! ❤️',
};

const getInitials = (fullName: string): string => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'A';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getInitialReviews = (): Review[] => {
  const sanitizeReviews = (list: Review[]) =>
    list.filter((r) => r.name?.toLowerCase().trim() !== 'erika');

  if (typeof window === 'undefined') return sanitizeReviews(REVIEWS);
  try {
    const saved = localStorage.getItem('user_reviews');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const filtered = sanitizeReviews(parsed);
        if (filtered.length !== parsed.length) {
          localStorage.setItem('user_reviews', JSON.stringify(filtered));
        }
        return [...filtered, ...sanitizeReviews(REVIEWS)];
      }
    }
  } catch (err) {
    console.error('Error al cargar reseñas guardadas:', err);
  }
  return sanitizeReviews(REVIEWS);
};

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(getInitialReviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<any>(null);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  useEffect(() => {
    if (!isHovered && !isModalOpen) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [isHovered, isModalOpen, currentIndex, reviews.length]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Asegurar la eliminación de cualquier reseña de "Erika" en el navegador
  useEffect(() => {
    try {
      const saved = localStorage.getItem('user_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter(
            (r: Review) => r.name?.toLowerCase().trim() !== 'erika'
          );
          if (filtered.length !== parsed.length) {
            localStorage.setItem('user_reviews', JSON.stringify(filtered));
            setReviews((prev) => prev.filter((r) => r.name?.toLowerCase().trim() !== 'erika'));
          }
        }
      }
    } catch (e) {
      // Ignorar error de parsing
    }
  }, []);

  const handleDeleteReview = (id: string) => {
    setReviews((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      return updated.length > 0 ? updated : REVIEWS;
    });
    setCurrentIndex(0);
    try {
      const saved = localStorage.getItem('user_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const updated = parsed.filter((r: Review) => r.id !== id);
          localStorage.setItem('user_reviews', JSON.stringify(updated));
        }
      }
    } catch (err) {
      console.error('Error al eliminar reseña de localStorage:', err);
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    setIsSubmitting(true);

    const newReview: Review = {
      id: `user-${Date.now()}`,
      name: authorName.trim(),
      rating,
      comment: comment.trim(),
      service: selectedService || 'Tratamiento',
      initials: getInitials(authorName),
      date: 'Reciente',
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem('user_reviews');
      const parsed = existing ? JSON.parse(existing) : [];
      const updated = [newReview, ...parsed];
      localStorage.setItem('user_reviews', JSON.stringify(updated));
    } catch (err) {
      console.error('Error al guardar reseña en localStorage:', err);
    }

    // Try sending notification via EmailJS (best-effort)
    try {
      if (STUDIO_INFO.emailjs?.serviceId) {
        await emailjs.send(
          STUDIO_INFO.emailjs.serviceId,
          STUDIO_INFO.emailjs.templateId,
          {
            from_name: newReview.name,
            from_email: 'resena@alonsobeauty.com',
            service: `Nueva reseña (${newReview.rating}⭐): ${newReview.service}`,
            message: `⭐ Puntuación: ${newReview.rating}/5\n💅 Servicio: ${newReview.service}\n💬 Comentario:\n"${newReview.comment}"`,
            to_email: STUDIO_INFO.email,
          },
          STUDIO_INFO.emailjs.publicKey
        );
      }
    } catch (err) {
      console.warn('Aviso: no se pudo enviar notificación EmailJS de la reseña, pero se publicó localmente.', err);
    }

    // Prepend to current list and show immediately
    setReviews((prev) => [newReview, ...prev]);
    setCurrentIndex(0);
    setDirection(0);

    // Reset form and close
    setAuthorName('');
    setRating(5);
    setHoverRating(0);
    setSelectedService('');
    setComment('');
    setIsSubmitting(false);
    setIsModalOpen(false);

    // Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 6000);
  };

  // Variants for sliding transition
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  const currentReview = reviews[currentIndex] || reviews[0];

  return (
    <section id="resenas" className="py-24 bg-stone-50 overflow-hidden relative border-t border-b border-stone-100">
      {/* Background soft pink blob for visual warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-soft-pink/30 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Success Notification Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[130] w-full max-w-md px-4"
          >
            <div className="bg-white border border-rose-gold/20 shadow-2xl rounded-2xl p-5 flex items-center gap-4 backdrop-blur-sm bg-white/95">
              <div className="w-11 h-11 bg-rose-gold rounded-full flex items-center justify-center text-white shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-serif font-bold text-stone-900 text-base">¡Muchas gracias por tu reseña!</h4>
                <p className="text-stone-600 text-xs">Tu opinión ya es visible en la web. Nos encanta saber de ti.</p>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="text-stone-400 hover:text-stone-600 transition-colors p-1"
                aria-label="Cerrar notificación"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        {/* Title */}
        <span className="text-rose-gold font-bold tracking-[0.2em] uppercase text-sm mb-4 block text-center">
          Opiniones de clientes
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4 text-center">
          Lo que dicen de nosotros
        </h2>

        {/* Global Rating Badge */}
        <div className="flex items-center gap-2 mb-10 bg-white/80 backdrop-blur-xs px-4 py-1.5 rounded-full border border-stone-200/60 shadow-xs">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="text-stone-700 font-bold text-sm">5.0</span>
          <span className="text-stone-400 text-xs">• {reviews.length} opiniones</span>
        </div>

        {/* Carousel Container */}
        <div
          className="w-full min-h-[320px] md:min-h-[260px] relative flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:-left-16 z-20 w-12 h-12 rounded-full border border-stone-200 bg-white shadow-sm flex items-center justify-center text-stone-600 hover:text-rose-gold hover:border-rose-gold hover:shadow-md transition-all active:scale-95"
            aria-label="Reseña anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 md:-right-16 z-20 w-12 h-12 rounded-full border border-stone-200 bg-white shadow-sm flex items-center justify-center text-stone-600 hover:text-rose-gold hover:border-rose-gold hover:shadow-md transition-all active:scale-95"
            aria-label="Siguiente reseña"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Review Card */}
          <div className="w-full max-w-2xl px-12 md:px-6">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-white border border-stone-100 rounded-3xl p-8 md:p-10 shadow-xl shadow-stone-100/50 flex flex-col items-center text-center relative"
              >
                {/* Decorative Quotes Icon */}
                <div className="absolute top-6 left-8 text-soft-pink opacity-20 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.748-9.762 9-10.109V5c-3.655.222-5 2.5-5 4.889h5V21h-9zm-14 0v-7.391c0-5.704 3.748-9.762 9-10.109V5c-3.655.222-5 2.5-5 4.889h5V21h-9z" />
                  </svg>
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-6 text-amber-400">
                  {Array.from({ length: currentReview.rating }).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-stone-700 text-lg md:text-xl font-light italic leading-relaxed mb-8 max-w-lg">
                  "{currentReview.comment}"
                </p>

                {/* Client Avatar / Initials */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-gold text-white font-serif font-bold rounded-full flex items-center justify-center text-md tracking-wider">
                    {currentReview.initials}
                  </div>
                  <div className="text-left">
                    <h4 className="font-serif font-bold text-stone-900 leading-tight">
                      {currentReview.name}
                    </h4>
                    {currentReview.service && (
                      <p className="text-rose-gold text-xs font-semibold tracking-wider uppercase mt-0.5">
                        {currentReview.service}
                      </p>
                    )}
                  </div>
                </div>

                {/* Botón para eliminar reseñas creadas por el usuario */}
                {currentReview.id.startsWith('user-') && (
                  <button
                    onClick={() => handleDeleteReview(currentReview.id)}
                    title="Eliminar esta reseña"
                    className="absolute top-4 right-4 text-stone-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-all cursor-pointer"
                    aria-label="Eliminar reseña"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                )}

                {/* Relative date */}
                {currentReview.date && (
                  <span className="absolute bottom-4 right-6 text-stone-300 text-xs font-light">
                    {currentReview.date}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Indicator Dots */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 z-20 max-w-sm px-4">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-rose-gold'
                  : 'w-2.5 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Ir a reseña ${index + 1}`}
            />
          ))}
        </div>

        {/* Button to open Leave Review Modal */}
        <div className="mt-8 z-20">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-rose-gold text-white font-semibold text-sm shadow-lg shadow-rose-gold/25 hover:bg-rose-900 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span>Dejar mi reseña</span>
          </button>
        </div>
      </div>

      {/* Modal / Dialog para Dejar una Reseña */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto border border-rose-gold/15"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => !isSubmitting && setIsModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Modal Header */}
              <div className="text-center mb-6">
                <span className="text-rose-gold font-bold tracking-[0.2em] uppercase text-xs block mb-1">
                  Tu opinión nos ayuda a crecer
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  Cuéntanos tu experiencia
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm mt-1">
                  Nos encanta saber cómo ha sido tu visita en Frank Alonso Beauty.
                </p>
              </div>

              {/* Review Form */}
              <form onSubmit={handleSubmitReview} className="space-y-5">
                {/* Rating Stars Selector */}
                <div className="flex flex-col items-center p-4 bg-stone-50 rounded-2xl border border-stone-150">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                    Tu valoración
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = star <= (hoverRating || rating);
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 text-amber-400 hover:scale-115 active:scale-95 transition-transform cursor-pointer"
                          aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill={isFilled ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className={isFilled ? 'text-amber-400 drop-shadow-xs' : 'text-stone-300'}
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs font-medium text-rose-gold mt-1.5 h-4">
                    {RATING_LABELS[hoverRating || rating]}
                  </span>
                </div>

                {/* Author Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Tu nombre <span className="text-rose-gold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Laura Gómez"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/20 focus:border-rose-gold transition-all"
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Servicio recibido (opcional)
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/20 focus:border-rose-gold transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Selecciona un servicio...</option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Tratamiento personalizado">Otro tratamiento</option>
                  </select>
                </div>

                {/* Comment Textarea */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Tu opinión <span className="text-rose-gold">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Cuéntanos qué te ha parecido el servicio, el trato recibido, la atención al detalle..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/20 focus:border-rose-gold transition-all resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => !isSubmitting && setIsModalOpen(false)}
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl text-stone-500 hover:text-stone-800 text-sm font-medium transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-rose-gold text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-rose-900 transition-all text-sm transform hover:scale-[1.02] active:scale-95 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Publicando...</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Publicar reseña</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Reviews;
