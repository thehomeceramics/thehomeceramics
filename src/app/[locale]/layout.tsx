
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/lib/getDictionary';
import { Toaster } from "@/components/ui/toaster";
import '../globals.css'; // Import global styles here as this layout now renders <body>

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'fr' }];
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const dict = await getDictionary(locale);
  const metadataDict = dict.Metadata || {};
  return {
    // Default title and description are now primarily sourced from here
    title: {
      default: metadataDict.defaultTitle || 'The Home Ceramics Atelier - Luxury Tiles', // Fallback if not in dict
      template: metadataDict.templateTitle || '%s | The Home Ceramics Atelier',
    },
    description: metadataDict.defaultDescription || 'Discover exquisite luxury porcelain tiles.', // Fallback
    keywords: metadataDict.keywords || ['luxury porcelain tiles', 'ceramics', 'interior design'],
    alternates: {
      // Canonical for the layout itself isn't typical; pages set their own.
      // Hreflang for the base path of each locale. Specific pages will add their paths.
      languages: {
        'en': '/en',
        'es': '/es',
        'fr': '/fr',
        'x-default': '/es', // Your default language version
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

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sura:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-background font-body antialiased flex flex-col">
        <Header locale={locale} dictionary={dict} />
        <main className="flex-grow">{children}</main>
        <Footer locale={locale} dictionary={dict} />
        <Toaster />
      </body>
    </html>
  );
}
