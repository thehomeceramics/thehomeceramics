
import { getDictionary, type Dictionary } from '@/lib/getDictionary';
import HomePageClient from '@/components/home/HomePageClient';

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
    viewDetailsButton: "Chat on WhatsApp",
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

    