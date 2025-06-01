
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Dictionary } from '@/lib/getDictionary'; // Assuming Dictionary type is appropriately defined
import { ArrowRight } from 'lucide-react';

interface NatureInspirationSectionProps {
  dictionary: Dictionary['HomePage']['natureInspiration'];
  locale: string;
}

export function NatureInspirationSection({ dictionary, locale }: NatureInspirationSectionProps) {
  if (!dictionary) {
    // Fallback or loading state if dictionary content is not available
    return <div className="container mx-auto px-4 py-12 text-center">Loading section...</div>;
  }

  return (
    <section className="pb-16 md:pb-24 bg-background"> {/* Removed top padding as SectionTitle above will handle it */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-10 gap-8 lg:gap-12 items-start">
          {/* Left Column (Images + Text) - takes 6/10 (md:col-span-6) */}
          <div className="md:col-span-6 space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
                <Image
                  src="/image/45x45_hurrem.jpg" // Path to image in public/image/
                  alt={dictionary.image1Alt || "Elegant living space with armchairs"}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint="Hurrem tile" 
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
                <Image
                  src="/image/inicio_quien_somos.jpg"
                  alt={dictionary.image2Alt || "Artistic view of The Home Ceramics Atelier products"}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint="atelier products display"
                />
              </div>
            </div>
            
            <div className="bg-card p-6 sm:p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl lg:text-3xl font-headline font-semibold text-primary mb-4">
                {dictionary.headline}
              </h2>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                {dictionary.paragraph1}
              </p>
              <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
                {dictionary.paragraph2}
              </p>
              <Button asChild size="lg" className="shadow-md">
                <Link href={`/${locale}/about`}>
                  {dictionary.detailsButton} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column (Tall Image) - takes 4/10 (md:col-span-4) */}
          <div className="md:col-span-4 h-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/image/inicio_quien_somos_1.jpg"
              alt={dictionary.image3Alt || "The Home Ceramics Atelier design or showroom view"}
              width={400}
              height={600}
              quality={85} // Increased quality
              className="w-full h-auto md:h-full object-cover min-h-[300px] sm:min-h-[400px] md:min-h-0 transition-transform duration-300 hover:scale-105"
              data-ai-hint="atelier showroom design"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

