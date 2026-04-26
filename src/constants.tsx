
import React from 'react';
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'manicura',
    title: 'Manicura',
    description: 'Cuidado experto para tus manos, desde esmaltado tradicional hasta técnicas de gel y nail art personalizado.',
    longDescription: 'Nuestra manicura profesional es mucho más que un simple esmaltado. Es un ritual de belleza que incluye el cuidado de las cutículas, limado de precisión, exfoliación hidratante y un masaje relajante. Utilizamos productos de alta gama que respetan la salud de tu uña natural mientras ofrecen un acabado impecable y duradero. Ya sea que busques algo minimalista como un "clean look" o algo atrevido con "nail art" artesanal, nuestras expertas harán realidad tu visión.',
    icon: '✨',
    image: '/images/manicura-portada.jpeg',
    gallery: [
      '/images/manicura-1.jpeg',
      '/images/manicura-rojo.jpeg',
      '/images/manicura-3.jpg',
      '/images/manicura-4.jpeg'
    ]
  },
  {
    id: 'pedicura',
    title: 'Pedicura',
    description: 'Relajación y belleza para tus pies. Tratamientos completos que miman cada detalle.',
    longDescription: 'Tus pies sostienen todo tu día, se merecen un descanso de lujo. Nuestra pedicura profunda combina técnicas estéticas y de bienestar. Disfruta de un baño de sales aromáticas, eliminación suave de durezas, y un cuidado meticuloso de tus uñas. El tratamiento finaliza con una hidratación intensiva que deja tus pies suaves, renovados y listos para lucir cualquier calzado.',
    icon: '🌸',
    image: '/images/pedicura-cover.jpg',
    gallery: [
      '/images/pedicura-1.PNG',
      '/images/pedicura-2.PNG',
      '/images/pedicura-3.jpeg',
      '/images/pedicura-4.jpeg'
    ]
  },
  {
    id: 'cejas',
    title: 'Diseño de Cejas',
    description: 'Enmarcamos tu mirada con técnicas de depilación, laminado y tinte para un acabado natural y perfecto.',
    longDescription: 'Las cejas son el marco de la cara. En Alonso Beauty Studio realizamos un estudio morfológico personalizado para encontrar la forma que mejor resalte tus facciones. Ofrecemos desde el diseño clásico con hilo o pinza, hasta el laminado de cejas (Brow Lift) para una mirada más abierta y moderna, y tinte de henna para mayor definición sin necesidad de maquillaje diario.',
    icon: '👁️',
    image: '/images/cejas-portada.PNG',
    beforeAfterImages: [
      {
        before: '/images/cejas-antes.png',
        after: '/images/cejas-despues.png'
      }
    ]
  },
  {
    id: 'cara',
    title: 'Lifting de Pestañas',
    description: 'Lifting de Pestañas - definición y realce natural para una mirada impactante.',
    longDescription: 'Lifting de Pestañas - definición y realce natural para una mirada impactante  - Tecnica coreana.',
    icon: '🌿',
    image: '/images/lifting-portada.jpeg',
    gallery: [
      '/images/lifting-4.jpeg',
      '/images/lifting-1.jpeg',
      '/images/lifting-2.jpeg',
      '/images/lifting-3.jpeg'
    ]
  }
];

export const STUDIO_INFO = {
  name: 'Alonso Beauty Studio',
  address: 'C. de Bolonia 10, 50008 Zaragoza',
  phone: "+34 675 43 94 31",
  email: 'frankalonsoabanto1@gmail.com',
  instagram: 'https://www.instagram.com/frank_alonso_prof/',
  instagramHandle: '@frank_alonso_prof',
  hours: [
    { days: 'Lunes - Viernes', time: '10:00 - 20:00' },
    { days: 'Sábados', time: 'cerrados' },
    { days: 'Domingos', time: 'Cerrado' }
  ],
  mapEmbed: 'https://maps.google.com/maps?q=Calle+Bolonia+10,+50008+Zaragoza,+Spain&t=&z=16&ie=UTF8&iwloc=&output=embed',
  emailjs: {
    serviceId: 'service_af4x3l5',      // ← Reemplazar con tu Service ID de EmailJS
    templateId: 'template_8i5k5kj',    // ← Reemplazar con tu Template ID de EmailJS
    publicKey: 'TQnGeH1eGDyE9CA0o',      // ← Reemplazar con tu Public Key de EmailJS
  }
};
