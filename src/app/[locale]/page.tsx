
import type { Metadata } from 'next';
import { getDictionary, type Dictionary } from '@/lib/getDictionary';
import HomePageClient from '@/components/home/HomePageClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const dict = await getDictionary(locale);
  const homeMeta = dict.HomePage?.metadata || {};
  
  return {
    title: { absolute: homeMeta.title || "TheHomeCeramics Atelier - Luxury Tiles" }, // Updated default
    description: homeMeta.description || "Luxury porcelain tiles for elegant interiors and exteriors.",
    alternates: {
      canonical: `/${locale}`, 
      languages: {
        'en': '/en',
        'es': '/es',
        'fr': '/fr',
        'x-default': '/es', 
      },
    },
  };
}

// This remains a Server Component
export default async function HomePageContainer({ params: { locale } }: { params: { locale: string } }) {
  const dictionary = await getDictionary(locale);
  
  // Ensure all expected parts of the dictionary are passed
  const homePageDict = dictionary.HomePage || {};
  const companyInfoDict = dictionary.COMPANY_INFO || {};
  const navLinksDict = dictionary.NavLinks || {};
  const productsData = dictionary.PRODUCTS_DATA || []; // For product names/descriptions if translated
  const productCardTexts = dictionary.ProductCard || {
    materialLabel: "Material:",
    finishLabel: "Finish:",
    sizeLabel: "Size:",
    styleLabel: "Style:",
    viewDetailsButton: "Contact us on WhatsApp",
    whatsappInquiryPrefix: "Hello, I'm interested in:"
  };

  return (
    <HomePageClient 
      locale={locale} 
      homePageDict={homePageDict} 
      companyInfoDict={companyInfoDict} 
      navLinksDict={navLinksDict}
      productsData={productsData} 
      productCardTexts={productCardTexts}
    />
  );
}

    