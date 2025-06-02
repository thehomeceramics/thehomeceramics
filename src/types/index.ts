
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
  url:string;
  dataAiHint?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: ProductImage[];
  specifications: ProductSpecification;
  price?: string;
}

// New type for base catalog data (non-translatable)
export interface CatalogItemBase {
  id: string;
  coverImageUrl: string;
  driveLink: string;
  dataAiHint: string;
}

// New type for localized catalog data (from dictionary)
export interface CatalogItemLocalized {
  id: string;
  name: string;
  description: string;
}

// Combined type used in the CatalogCard component
export interface CatalogItem extends CatalogItemBase, CatalogItemLocalized {}
