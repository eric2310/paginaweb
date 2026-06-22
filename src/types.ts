
export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  icon: string;
  image: string;
  beforeAfterImages?: { before: string; after: string }[];
  gallery?: string[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface ContactForm {
  name: string;
  email: string;
  service: string;
  message: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  service: string;
  initials: string;
  date: string;
}

