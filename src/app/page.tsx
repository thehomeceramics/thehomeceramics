
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ProductCard } from '@/components/products/ProductCard';
import { PRODUCTS, COMPANY_INFO } from '@/lib/data';
import { ArrowRight, Lightbulb, Sparkles } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-background to-secondary/30 overflow-hidden">
        {/* Video background was here for [locale] page, but keeping original for non-locale for now unless specified */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="heroDotsPattern" patternUnits="userSpaceOnUse" width="50" height="50" patternTransform="rotate(15)">
                <circle cx="10" cy="10" r="1.2" fill="hsl(var(--primary))" />
                <circle cx="35" cy="35" r="1" fill="hsl(var(--primary))" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroDotsPattern)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary mb-6">
            Elegance Forged in Porcelain
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
            Discover unparalleled luxury and timeless design with The Home Ceramics Atelier&apos;s exclusive collection of porcelain tiles.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="shadow-lg hover:scale-105 transition-transform duration-200">
              <Link href="/products">
                Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {/* AI Advisor Button Removed */}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <SectionTitle title="Featured Collection" subtitle="Handpicked selections from our finest porcelain tiles" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="link" className="text-accent text-lg">
              <Link href="/products">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AI Tile Advisor Teaser REMOVED */}

      {/* About Us Teaser */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
          <SectionTitle title={`About ${COMPANY_INFO.name}`} subtitle="Crafting beauty, one tile at a time." />
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-8">
            {COMPANY_INFO.mission.substring(0, 150)}...
          </p>
          <Button asChild variant="outline" size="lg" className="shadow-md">
            <Link href="/about">
              Learn More About Us
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
