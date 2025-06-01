
import type { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'PORCELANICO 60X120 MATE (RELIEVE) - BRILLER CHOCO RUBIC',
    description: 'Sophisticated matte porcelain tile with relief texture, Briller Choco Rubic finish. Ideal for modern interiors.',
    images: [
      { url: '/image/products/releave_1.jpg', dataAiHint: 'choco rubic tile' },
      { url: '/image/products/releave_2.jpg', dataAiHint: 'matte relief texture' }
    ],
    specifications: {
      material: 'Porcelánico',
      finish: 'Mate con Relieve, Color Briller Choco Rubic',
      size: '60x120 cm',
      thickness: '10mm',
      application: 'Pared, Suelo',
      style: 'Moderno, Texturizado',
    },
    price: '€7.00 - €10.00 / m²',
  },
  {
    id: '2',
    name: 'PORCELANICO 60X120 BRILLO (RAINBOW) - GRACIA AQUA',
    description: 'Vibrant glossy porcelain tile with a rainbow effect in Gracia Aqua color. Perfect for creating stunning, contemporary feature walls and floors.',
    images: [
      { url: '/image/products/porcelanico-60x120-brillo-rainbow1.jpg', dataAiHint: 'aqua rainbow tile' },
      { url: '/image/products/porcelanico-60x120-brillo-rainbow2.jpg', dataAiHint: 'glossy porcelain texture' }
    ],
    specifications: {
      material: 'Porcelánico',
      finish: 'Brillo, Efecto Rainbow, Color Gracia Aqua',
      size: '60x120 cm',
      thickness: '10mm',
      application: 'Pared, Suelo (uso decorativo recomendado)',
      style: 'Moderno, Decorativo, Vibrante',
    },
    price: '€7.00 - €10.00 / m²',
  },
  {
    id: '3',
    name: 'PORCELANICO 60X120 CARVING GROOVE LIGHT',
    description: 'Elegant porcelain tile with a "carving" relief finish in Groove Light tone, offering subtle texture and light play. Ideal for sophisticated contemporary spaces.',
    images: [
      { url: '/image/products/porcelanico-60x120-carving1.jpg', dataAiHint: 'carving texture tile' },
      { url: '/image/products/porcelanico-60x120-carving2.jpg', dataAiHint: 'groove light porcelain' }
    ],
    specifications: {
      material: 'Porcelánico',
      finish: 'Tallado (Carving), Tono Groove Light',
      size: '60x120 cm',
      thickness: '10mm',
      application: 'Pared, Suelo',
      style: 'Contemporáneo, Elegante, Texturizado',
    },
    price: '€7.00 - €10.00 / m²',
  },
  {
    id: '4',
    name: 'PORCELANICO 60X120 MATE IN/PUT TERRAZA 1032',
    description: 'Versatile large-format porcelain tile with a sophisticated matte finish, ideal for creating seamless indoor/outdoor transitions, especially for terraces.',
    images: [
      { url: '/image/products/porcelanico_60x120_mate_input1.jpg', dataAiHint: 'matte terrace tile' },
      { url: '/image/products/porcelanico_60x120_mate_input2.jpg', dataAiHint: 'outdoor porcelain paver' }
    ],
    specifications: {
      material: 'Porcelánico',
      finish: 'Mate, Apto para Exterior (IN/OUT)',
      size: '60x120 cm',
      thickness: '10mm',
      application: 'Suelo, Pared, Interior/Exterior, Terrazas',
      style: 'Moderno, Contemporáneo, Resistente',
    },
    price: '€7.00 - €10.00 / m²',
  },
  {
    id: '5',
    name: 'PORCELANICO 60X120 STATUARIO BRILLO PEARL STATUARIO',
    description: 'Achieve timeless sophistication with this Statuario marble effect porcelain tile. High-gloss finish, perfect for luxurious interiors.',
    images: [
      { url: '/image/products/porcelanico_60x120_statuario_brillo1.jpg', dataAiHint: 'statuario marble tile' },
      { url: '/image/products/porcelanico_60x120_statuario_brillo2.jpg', dataAiHint: 'glossy marble texture' }
    ],
    specifications: {
      material: 'Porcelánico',
      finish: 'Brillo, Efecto Mármol Statuario, Tono Pearl',
      size: '60x120 cm',
      thickness: '10mm',
      application: 'Pared, Suelo, Interiores',
      style: 'Clásico, Lujoso, Elegante',
    },
    price: '€7.00 - €10.00 / m²',
  },
  {
    id: '6',
    name: 'PORCELANICO 60X120 BABYCON ROCCIA LUPO',
    description: 'Embrace the raw beauty of nature with this Roccia Lupo stone-effect porcelain tile, featuring intricate details and a rich, earthy palette with Babycon texture.',
    images: [
      { url: '/image/products/porcelanico_60x120_babycon1.png', dataAiHint: 'roccia lupo tile' },
      { url: '/image/products/porcelanico_60x120_babycon2.png', dataAiHint: 'babycon stone texture' }
    ],
    specifications: {
      material: 'Porcelánico',
      finish: 'Efecto Piedra Roccia Lupo, Textura Babycon',
      size: '60x120 cm',
      thickness: '10mm',
      application: 'Suelo, Pared, Interiores',
      style: 'Moderno, Aspecto Piedra, Natural',
    },
    price: '€7.00 - €10.00 / m²',
  },
];

export const COMPANY_INFO = {
  name: "TheHomeCeramics",
  mission: "To provide discerning customers with the most exquisite and durable luxury porcelain tiles, transforming spaces into timeless works of art.",
  values: ["Excellence in Quality", "Innovative Design", "Customer Centricity", "Sustainable Practices"],
  expertise: "With decades of experience in the ceramics industry, we specialize in sourcing and curating high-end porcelain tiles known for their superior aesthetics, durability, and craftsmanship. Our team of experts stays ahead of design trends to offer a collection that is both timeless and contemporary."
};

export const CONTACT_DETAILS = {
  email: "bilal@thehomeceramics.com, ismail@thehomeceramics.com",
  phone: "+34 625 05 27 53",
  address: "Carrer de Pere Aleixandre, 22, BAJO 2, Quatre Carreres, 46006 València"
};

    