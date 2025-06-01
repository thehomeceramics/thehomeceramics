
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ProductCard } from '@/components/products/ProductCard';
import { PRODUCTS as FALLBACK_PRODUCTS, COMPANY_INFO as FALLBACK_COMPANY_INFO } from '@/lib/data'; // Original data as fallback
import { ArrowRight } from 'lucide-react';
import { NatureInspirationSection } from '@/components/home/NatureInspirationSection';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from 'react'; // Required for Autoplay plugin
import type { Dictionary } from '@/lib/getDictionary'; // For typing props
import type { Product } from '@/types';

const heroImages = [
  { src: "/image/inicio_image_1.webp", altKey: "heroImage1Alt", dataAiHint: "modern interior tile" },
  { src: "/image/inicio_image_2.webp", altKey: "heroImage2Alt", dataAiHint: "luxury bathroom tile" },
  { src: "/image/inicio_image_3.webp", altKey: "heroImage3Alt", dataAiHint: "modern kitchen tile" },
  { src: "/image/inicio_image_4.webp", altKey: "heroImage4Alt", dataAiHint: "outdoor patio tile" },
];

interface ProductCardTexts {
  materialLabel: string;
  finishLabel: string;
  sizeLabel: string;
  styleLabel: string;
  viewDetailsButton: string;
}
interface HomePageClientProps {
  locale: string;
  homePageDict: any; 
  companyInfoDict: any; 
  navLinksDict: any; 
  productsData: Array<{ id: string; name: string; description: string }>; 
  productCardTexts: ProductCardTexts; // Added prop for ProductCard texts
}

export default function HomePageClient({ 
  locale, 
  homePageDict, 
  companyInfoDict, 
  navLinksDict, 
  productsData,
  productCardTexts // Destructure new prop
}: HomePageClientProps) {
  const heroTexts = homePageDict.hero || {};
  const featuredCollectionTexts = homePageDict.featuredCollection || {};
  const aboutUsTeaserTexts = homePageDict.aboutUsTeaser || {};
  const natureInspirationTexts = homePageDict.natureInspiration || {};

  const companyName = companyInfoDict.name || FALLBACK_COMPANY_INFO.name;
  const companyMissionShort = companyInfoDict.missionShort || FALLBACK_COMPANY_INFO.mission.substring(0,150)+'...';

  // Map PRODUCTS with translated names/descriptions
  const localizedProducts = FALLBACK_PRODUCTS.map(fallbackProduct => {
    const translatedData = productsData.find(p => p.id === fallbackProduct.id);
    return {
      ...fallbackProduct,
      name: translatedData?.name || fallbackProduct.name,
      description: translatedData?.description || fallbackProduct.description,
    };
  }).slice(0, 3); // Only first 3 featured products

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center">
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false, 
            }),
          ]}
          opts={{
            loop: true,
          }}
          className="absolute inset-0 -z-10 w-full h-full"
        >
          <CarouselContent className="h-full">
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="h-full relative">
                <Image
                  src={image.src}
                  alt={heroTexts[image.altKey] || `Hero image ${index + 1}`}
                  fill 
                  style={{ objectFit: 'cover' }} 
                  priority={index === 0} 
                  data-ai-hint={image.dataAiHint}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-black/40"></div> 
        
        <div className="container mx-auto px-4 text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-white mb-6 shadow-sm">
            {heroTexts.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 shadow-sm">
            {heroTexts.subtitle}
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="shadow-lg hover:scale-105 transition-transform duration-200">
              <Link href={`/${locale}/products`}>
                {heroTexts.exploreButton} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <SectionTitle title={featuredCollectionTexts.title} subtitle={featuredCollectionTexts.subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {localizedProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} dictionaryTexts={productCardTexts} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="link" className="text-accent text-lg">
              <Link href={`/${locale}/products`}>
                {featuredCollectionTexts.viewAll} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Teaser */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
          <SectionTitle title={`${aboutUsTeaserTexts.titlePrefix} ${companyName}`} subtitle={aboutUsTeaserTexts.subtitle} />
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-8">
            {companyMissionShort}
          </p>
          <Button asChild variant="outline" size="lg" className="shadow-md">
            <Link href={`/${locale}/about`}>
              {aboutUsTeaserTexts.learnMoreButton}
            </Link>
          </Button>
        </div>
      </section>

      {natureInspirationTexts.sectionTitle && (
         <SectionTitle title={natureInspirationTexts.sectionTitle} className="pt-16 md:pt-24" />
      )}
      <NatureInspirationSection dictionary={natureInspirationTexts} locale={locale} />

    </div>
  );
}
