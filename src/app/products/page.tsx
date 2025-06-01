import type { Metadata } from 'next';
import { ProductCard } from '@/components/products/ProductCard';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { PRODUCTS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Our Collection',
  description: 'Explore the full range of luxury porcelain tiles from The Home Ceramics Atelier.',
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 animate-in fade-in duration-500">
      <SectionTitle 
        as="h1" // Use h1 for the main page title
        title="Our Exquisite Tile Collection" 
        subtitle="Discover the perfect porcelain tiles to elevate your space." 
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {PRODUCTS.map((product, index) => (
          <div 
            key={product.id} 
            className="animate-in fade-in slide-in-from-bottom-8 duration-700"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
