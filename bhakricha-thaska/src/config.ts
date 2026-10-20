export type Category = 'Signature' | 'Extra punch' | 'Sharing';
export type FoodImage = { src: string; alt: string; srcSet?: string };
export type Product = {
  id: string; name: string; marathi: string; category: Category;
  description: string; price: number | null; sample: boolean;
  image: FoodImage | null; variant: number;
};

export const brand = {
  name: 'BHAKRICHA THASKA', marathi: 'भाकरीचा ठसका',
  tagline: 'Solapuri Crunch, Zanzanit Punch!',
  logo: '/images/brand-logo.jpg',
  heroImage: null as FoodImage | null,
  contact: {
    email: '', phoneDisplay: '', phoneE164: '', address: '',
    hours: [] as string[], mapUrl: '',
  },
  socials: [] as { label: string; url: string }[],
};

// SAMPLE concepts, not a confirmed live menu. Prices are intentionally unset.
export const products: Product[] = [
  { id: 'classic', name: 'The Solapuri Crunch', marathi: 'सोलापुरी क्रंच',
    category: 'Signature', description: 'Crunchy bhakri, tomato, onion, sev and a lively masala finish.',
    price: null, sample: true, image: null, variant: 0 },
  { id: 'punch', name: 'The Zanzanit Punch', marathi: 'झणझणीत ठसका',
    category: 'Extra punch', description: 'A proposed bolder take on the bhakri crunch, with an extra-spicy masala finish.',
    price: null, sample: true, image: null, variant: 1 },
  { id: 'share', name: 'The Crunch Gathering', marathi: 'गप्पा आणि क्रंच',
    category: 'Sharing', description: 'A proposed sharing portion of loaded bhakri, made for a table full of conversation.',
    price: null, sample: true, image: null, variant: 2 },
];

export const gallery: { title: string; caption: string; image: FoodImage | null; variant: number }[] = [
  { title: 'The crunch', caption: 'Concept illustration · loaded bhakri', image: null, variant: 0 },
  { title: 'The punch', caption: 'Concept illustration · spicy toppings', image: null, variant: 1 },
  { title: 'The gathering', caption: 'Concept illustration · a sharing plate', image: null, variant: 2 },
];

export const navigation = [
  { href: '#menu', label: 'Menu' }, { href: '#story', label: 'Our story' },
  { href: '#gallery', label: 'Gallery' }, { href: '#contact', label: 'Contact' },
];
