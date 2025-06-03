
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/lib/getDictionary';
// Toaster and globals.css are now in the root layout (src/app/layout.tsx)

const defaultLocale = 'es';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'fr' }];
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const dict = await getDictionary(locale);
  const metadataDict = dict.Metadata || {};
  return {
    title: {
      default: metadataDict.defaultTitle || 'The Home Ceramics Atelier - Luxury Tiles',
      template: metadataDict.templateTitle || '%s | The Home Ceramics Atelier',
    },
    description: metadataDict.defaultDescription || 'Discover exquisite luxury porcelain tiles.',
    keywords: metadataDict.keywords || ['luxury porcelain tiles', 'ceramics', 'interior design'],
    alternates: {
      // Canonical URL for the locale's root will be derived by Next.js, typically /<locale>
      // The `metadataBase` in root layout ensures full URLs are generated.
      languages: {
        'en': '/en',
        'es': '/es',
        'fr': '/fr',
        'x-default': `/${defaultLocale}`,
      },
    },
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

  // The <html> and <body> tags are now rendered by src/app/layout.tsx.
  // Next.js will automatically set the lang attribute on the <html> tag
  // based on the `locale` param for routes within this segment.
  return (
    <>
      <Header locale={locale} dictionary={dict} />
      <main className="flex-grow">{children}</main>
      <Footer locale={locale} dictionary={dict} />
      {/* Toaster is now in the root layout */}
    </>
  );
}
