
import type { Metadata } from 'next';
// Global CSS is now imported in src/app/layout.tsx
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/lib/getDictionary';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'fr' }];
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const dict = await getDictionary(locale);
  const metadataDict = dict.Metadata || {};
  // These will be merged with the root layout's metadata
  return {
    title: {
      default: metadataDict.defaultTitle || 'The Home Ceramics Atelier - Luxury Porcelain Tiles',
      template: metadataDict.templateTitle || '%s | The Home Ceramics Atelier',
    },
    description: metadataDict.defaultDescription || 'Discover exquisite luxury porcelain tiles from TheHomeCeramics. We offer timeless elegance and superior durability for your interior and exterior design projects.',
    keywords: metadataDict.keywords || ['luxury porcelain tiles', 'ceramics', 'interior design', 'home renovation', 'tile store'],
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const dict = await getDictionary(locale);

  // This layout no longer renders <html>, <head>, or <body> tags.
  // These are now handled by the root src/app/layout.tsx.
  return (
    <>
      {/* The <head> content (like fonts) is in src/app/layout.tsx */}
      {/* The <body className="..."> is in src/app/layout.tsx */}
      <Header locale={locale} dictionary={dict} />
      <main className="flex-grow">{children}</main>
      <Footer locale={locale} dictionary={dict} />
      {/* <Toaster /> is now in src/app/layout.tsx */}
    </>
  );
}
