
import type { Metadata } from 'next';
import { ProductCard } from '@/components/products/ProductCard';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { PRODUCTS } from '@/lib/data'; 
import { getDictionary } from '@/lib/getDictionary';
import type { Product } from '@/types'; 
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase } from 'lucide-react'; // Changed from Info to Briefcase or similar for B2B

const defaultLocale = 'es';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const dict = await getDictionary(locale);
  const pageDict = dict.ProductsPage?.metadata || {};
  const navLinks = dict.NavLinks || {};
  const companyName = dict.COMPANY_INFO?.name || "The Home Ceramics Atelier";

  return {
    title: pageDict.title || `${navLinks.products || 'Our Collection'} - ${companyName}`,
    description: pageDict.description || `Explore the full range of luxury porcelain tiles from ${companyName}.`,
    alternates: {
      canonical: `/${locale}/products`,
      languages: {
        'en': '/en/products',
        'es': '/es/products',
        'fr': '/fr/products',
        'x-default': `/${defaultLocale}/products`,
      },
    },
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
    viewDetailsButton: "Contact us on WhatsApp",
    whatsappInquiryPrefix: "Hello, I'm interested in:" 
  };
  const contactPageTexts = dict.ContactPage || {};

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
        as="h1" 
        title={t?.title || "Our Exquisite Tile Collection"}
        subtitle={t?.subtitle || "Discover the perfect porcelain tiles to elevate your space."}
      />
      
      {contactPageTexts.b2bCtaButtonProducts && (
        <div className="my-8 text-center">
          <Button asChild size="lg" variant="default" className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link href={`/${locale}/contact`}>
              <Briefcase className="mr-2 h-5 w-5" /> 
              {contactPageTexts.b2bCtaButtonProducts}
            </Link>
          </Button>
        </div>
      )}

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
    
