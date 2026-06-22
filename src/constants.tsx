
import React from 'react';
import { Service, Review } from './types';

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
  name: 'Frank Alonso Beauty',
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
    templateId: 'template_57aky1o',    // ← Reemplazar con tu Template ID de EmailJS
    publicKey: 'TQnGeH1eGDyE9CA0o',      // ← Reemplazar con tu Public Key de EmailJS
  }
};

export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Lidia',
    rating: 5,
    comment: 'Un gran profesional. Llevo casi dos años haciéndome la manicura con Frank y estoy encantada. No siempre llevo una idea clara (sobre el diseño de uñas) y Frank siempre me propone opciones ingeniosas que me impresionan. Es una persona muy creativa y es muy minucioso en los detalles. Por otro lado, comencé a hacerme el diseño de cejas con él y no puedo estar más contenta. Tenía las cejas muy curvas y pensaba que, con mi tipo de ceja, era complejo conseguir cejas angulares (con pico). Sin embargo, Frank lo ha conseguido y estoy realmente satisfecha.',
    service: '',
    initials: 'L',
    date: 'Hace 1 semana'
  },
  {
    id: '2',
    name: 'Ma',
    rating: 5,
    comment: 'A Frank le conozco desde hace varios años cuando este trabajaba en otro centro, pero cuando abrió su propio centro de estética pude localizarle y continuar con sus servicios que son inmejorables. Puedo constatar que es un gran profesional, me ha realizado reconstrucción de uñas y pedicura y estoy encantadisima con el resultado. Cuida mucho la limpieza y desinfección y su trato es muy cercano, te hace sentir como en casa, es inmejorable, recomendable 100%.',
    service: '',
    initials: 'M',
    date: ''
  },
  {
    id: '3',
    name: 'Mary',
    rating: 5,
    comment: 'Fui por primera vez por una pedicura y me quedé muy satisfecha. Me encantó el resultado y la profesionalidad del personal. Muchísimas gracias!Muy recomendado',
    service: '',
    initials: 'M',
    date: ''
  },
  {
    id: '4',
    name: 'Teresa',
    rating: 5,
    comment: 'Confié en Frank para hacerme la manicura y pedicura el día de mi boda y no pude acertar más! Quedaron preciosas y me duraron muchísimo. La calidad del servicio fue perfecto, el trato de Frank que no puede ser más amable y cercano. La limpieza y el cuidado de todo lo que utiliza también es perfecta. Muchas gracias!!',
    service: '',
    initials: 'T',
    date: ''
  },
  {
    id: '5',
    name: 'Lucía',
    rating: 5,
    comment: 'Fui a Frank recomendada por una amiga y desde luego que la mejor decisión que pude tomar! Es un encanto y me hizo manicura y pedicura con mucho mimo y súper atento a casa detalle. Sin duda que merece la pena!!',
    service: '',
    initials: 'L',
    date: ''
  },
  {
    id: '6',
    name: 'Cindy',
    rating: 5,
    comment: 'Conozco a Frank desde hace muchos años y puedo afirmar que es un profesional excepcional y muy polivalente. Elegir su estudio es siempre un acierto, ya que tanto el trato personal como la calidad de los servicios son excelentes. El ambiente es muy acogedor y el local destaca por su limpieza. Su trabajo es perfecto; cada manicura y pedicura que me hace no solo lucen genial, sino que también duran mucho tiempo. Confío tanto en él que no solo asisto yo, sino que también asiste mi madre y mi hija, sabiendo que recibirán un trato cercano y de confianza, y que quedarán completamente satisfechas con los resultados.',
    service: '',
    initials: 'C',
    date: ''
  },
  {
    id: '7',
    name: 'Ana',
    rating: 5,
    comment: 'Excepcional!!!, trabajo muy profesional y amabilidad de 11, sin duda volveré!!',
    service: '',
    initials: 'A',
    date: ''
  },
  {
    id: '8',
    name: 'Mari',
    rating: 5,
    comment: 'Muy, muy recomendable. Tengo limitaciones de movilidad y con Fran todo son facilidades, además de un gran profesional. Higiene, esterilizacion, manos de ori. En fin, todo lo que diga es poco. Probarlo, no os defraudará.',
    service: '',
    initials: 'EM',
    date: ''
  },
  {
    id: '9',
    name: 'Jesana',
    rating: 5,
    comment: 'Todo genial en manos de Frank es súper profesional y meticuloso por no hablar de lo amable que es y lo que cuida cada detalle. Me ha hecho las mejores uñas de mi vida y también un laminado de cejas muy cool y elegante que me cambia la cara. Para mí un imprescindible',
    service: '',
    initials: 'J',
    date: ''
  },
  {
    id: '10',
    name: 'Lesya',
    rating: 5,
    comment: 'Una experiencia de 10! Este salón de uñas es simplemente espectacular.El ambiente es súper agradable, limpio y acogedor, pero lo mejor de todo es el trato.Me atendió un chico majísimo, muy profesional, detallista y con muchísimo gusto.Se nota que le apasiona lo que hace, y eso se refleja en el resultado final: ¡mis uñas quedaron perfectas!. Además, fue muy amable y atento en todo momento, creando una experiencia relajante y cómoda desde el primer minuto. Sin duda, se ha convertido en mi sitio de confianza. Lo recomiendo con los ojos cerrados. Volveré pronto',
    service: '',
    initials: 'L',
    date: ''
  },
  {
    id: '11',
    name: 'Noe',
    rating: 5,
    comment: 'Frank es un artista!! Es capaz de plasmar perfectamente lo que quieres, opina para decirte cómo te quedaría mejor… siempre que voy salgo encantada y por supuesto lo recomiendo!!',
    service: '',
    initials: 'N',
    date: ''
  },
  {
    id: '12',
    name: 'Leyre',
    rating: 5,
    comment: 'Conozco a Fran desde hace ya unos años y desde que se abrió su propio centro de estética , no dudé ni un minuto en acudir a hacerme allí la manicura permanente cada mes , yo siempre le llevo la idea que llevo en una foto y siempre me lo hace igual a la perfección y con su toque personal que la hace única y especial , estoy muy contenta con los resultados y lo bien que llevo las uñas . Siempre tiene disponibilidad y cuadra los huecos para darme cita cada mes cuando me viene bien acudir . Yo vivo a las afueras de Zaragoza y bajo al centro dé propio para hacérmelas allí porque estoy muy contenta , es un chico adorable , risueño y trabajar de los pies a la cabeza. Y por último el centro está súper limpio , y cuidado con mucho mimo y encanto.',
    service: '',
    initials: 'L',
    date: ''
  }

];
