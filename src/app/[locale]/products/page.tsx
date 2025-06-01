
import type { Metadata } from 'next';
import { ProductCard } from '@/components/products/ProductCard';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { PRODUCTS } from '@/lib/data'; // Product details themselves would need translation
import { getDictionary } from '@/lib/getDictionary';
import type { Product } from '@/types'; // Import Product type

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const dict = await getDictionary(locale);
  const pageDict = dict.ProductsPage?.metadata || {};
  return {
    title: pageDict.title || dict.NavLinks?.products || 'Our Collection',
    description: pageDict.description || 'Explore the full range of luxury porcelain tiles from The Home Ceramics Atelier.',
  };
}

export default async function ProductsPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  const t = dict.ProductsPage;
  const productCardTexts = dict.ProductCard || {
    materialLabel: "Material:", 
    finishLabel: "Finish:", 
    sizeLabel: "Size:", 
    styleLabel: "Style:", 
    viewDetailsButton: "Chat on WhatsApp",
    whatsappInquiryPrefix: "Hello, I'm interested in:" 
  };

  // Localize product names and descriptions
  const localizedProducts = PRODUCTS.map(fallbackProduct => {
    const translatedData = dict.PRODUCTS_DATA?.find((p: any) => p.id === fallbackProduct.id);
    return {
      ...fallbackProduct,
      name: translatedData?.name || fallbackProduct.name,
      description: translatedData?.description || fallbackProduct.description,
    };
  });

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 animate-in fade-in duration-500">
      <SectionTitle 
        as="h1" // Use h1 for the main page title
        title={t?.title || "Our Exquisite Tile Collection"}
        subtitle={t?.subtitle || "Discover the perfect porcelain tiles to elevate your space."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {localizedProducts.map((product: Product, index: number) => ( 
          <div 
            key={product.id} 
            className="animate-in fade-in slide-in-from-bottom-8 duration-700"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard product={product} dictionaryTexts={productCardTexts} /> 
          </div>
        ))}
      </div>
    </div>
  );
}

    