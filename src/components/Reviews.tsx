import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../constants';

const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<any>(null);

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
    if (!isHovered) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [isHovered, currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
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

  const currentReview = REVIEWS[currentIndex];

  return (
    <section id="resenas" className="py-24 bg-stone-50 overflow-hidden relative border-t border-b border-stone-100">
      {/* Background soft pink blob for visual warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-soft-pink/30 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        {/* Title */}
        <span className="text-rose-gold font-bold tracking-[0.2em] uppercase text-sm mb-4 block text-center">
          Opiniones de clientes
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-12 text-center">
          Lo que dicen de nosotros
        </h2>

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
                    <p className="text-rose-gold text-xs font-semibold tracking-wider uppercase mt-0.5">
                      {currentReview.service}
                    </p>
                  </div>
                </div>

                {/* Relative date (optional info badge) */}
                <span className="absolute bottom-4 right-6 text-stone-300 text-xs font-light">
                  {currentReview.date}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Indicator Dots */}
        <div className="flex gap-2.5 mt-8 z-20">
          {REVIEWS.map((_, index) => (
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
      </div>
    </section>
  );
};

export default Reviews;
