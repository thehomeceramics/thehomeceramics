
import type { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '@/lib/getDictionary';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const dict = await getDictionary(locale);
  const pageDict = dict.FeatureRemovedPage?.metadata || {};
  return {
    title: pageDict.title || "Feature Removed",
    description: pageDict.description || "This feature is no longer available.",
  };
}

export default async function AiAdvisorFeatureRemovedPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  const pageContent = dict.FeatureRemovedPage || {};
  const homeLinkText = dict.NavLinks?.home || "Return to Homepage"; // Fallback if NavLinks.home is missing

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 text-center animate-in fade-in duration-500">
      <h1 className="text-3xl font-headline font-bold text-primary mb-6">
        {pageContent.title || "Feature Removed"}
      </h1>
      <p className="text-lg text-foreground/80 mb-8">
        {pageContent.message || "This feature is no longer available."}
      </p>
      <Link href={`/${locale}`} className="text-accent hover:underline">
        {homeLinkText}
      </Link>
    </div>
  );
}
