
import type { Metadata } from 'next';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { CATALOGS_BASE_DATA } from '@/lib/data';
import { getDictionary } from '@/lib/getDictionary';
import type { CatalogItem, CatalogItemLocalized } from '@/types';
import { CatalogCard } from '@/components/catalogs/CatalogCard';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const dict = await getDictionary(locale);
  const pageDict = dict.CatalogsPage?.metadata || {};
  const companyName = dict.COMPANY_INFO?.name || "TheHomeCeramics";
  const navLinks = dict.NavLinks || {};

  return {
    title: pageDict.title || `${navLinks.catalogs || 'Catalogs'} - ${companyName}`,
    description: pageDict.description || `Download and view our latest catalogs from ${companyName}.`,
    alternates: {
      canonical: `/${locale}/catalogs`,
      languages: {
        'en': '/en/catalogs',
        'es': '/es/catalogs',
        'fr': '/fr/catalogs',
        'x-default': `/es/catalogs`,
      },
    },
  };
}

export default async function CatalogsPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  const t = dict.CatalogsPage;
  const navLinks = dict.NavLinks || {};

  const localizedCatalogs: CatalogItem[] = CATALOGS_BASE_DATA.map(baseCatalog => {
    const translatedData = dict.CATALOG_ITEMS_DATA?.find((c: CatalogItemLocalized) => c.id === baseCatalog.id);
    return {
      ...baseCatalog,
      name: translatedData?.name || `Catalog ${baseCatalog.id}`, 
      description: translatedData?.description || "View our latest catalog.", 
    };
  });

  // Assuming all current catalogs are for "Polished & Glossy Tiles"
  // In the future, you might filter or group catalogs by a category property
  const polishedGlossyCatalogs = localizedCatalogs; 

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 animate-in fade-in duration-500">
      <SectionTitle 
        as="h1"
        title={t?.title || navLinks.catalogs || "Our Catalogs"}
        subtitle={t?.subtitle || "Browse our digital catalogs for detailed product information and inspiration."}
      />

      {polishedGlossyCatalogs.length > 0 && t?.polishedGlossySectionTitle && (
        <div className="mt-12 mb-8"> {/* Added margin for spacing */}
          <SectionTitle
            as="h2" // Use h2 for section titles
            title={t.polishedGlossySectionTitle}
            titleClassName="text-3xl md:text-4xl" // Slightly smaller than page title
            // subtitle="Explore our range of high-shine finishes" // Optional subtitle for this section
            className="mb-6 md:mb-8" // Adjust bottom margin for this section title
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {polishedGlossyCatalogs.map((catalog: CatalogItem, index: number) => ( 
              <div 
                key={catalog.id} 
                className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CatalogCard catalog={catalog} viewButtonText={t?.viewCatalogButton || "View Catalog"} /> 
              </div>
            ))}
          </div>
        </div>
      )}
      
      {localizedCatalogs.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">
          {t?.noCatalogs || "No catalogs available at the moment. Please check back soon!"}
        </p>
      )}
    </div>
  );
}

    
