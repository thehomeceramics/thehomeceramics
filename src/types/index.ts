
export interface NavItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface ProductSpecification {
  material: string;
  finish: string;
  size: string;
  thickness: string;
  application: string;
  style: string;
}

export interface ProductImage {
  url: string;
  dataAiHint?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: ProductImage[]; // Changed from imageUrl and dataAiHint
  specifications: ProductSpecification;
  price?: string;
}
