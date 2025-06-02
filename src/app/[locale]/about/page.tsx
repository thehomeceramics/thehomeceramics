
import type { Metadata } from 'next';
import Image from 'next/image';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { COMPANY_INFO } from '@/lib/data'; 
import { CheckCircle, Award, Users, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDictionary } from '@/lib/getDictionary';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const dict = await getDictionary(locale);
  const pageDict = dict.AboutPage?.metadata || {};
  const companyInfo = dict.COMPANY_INFO || COMPANY_INFO; // Use translated or fallback
  const navLinks = dict.NavLinks || {};
  
  return {
    title: pageDict.title || `${navLinks.about || 'About Us'} - ${companyInfo.name}`,
    description: pageDict.description || `Learn about ${companyInfo.name}'s mission, values, and expertise in luxury porcelain tiles.`,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        'en': '/en/about',
        'es': '/es/about',
        'fr': '/fr/about',
        'x-default': `/es/about`,
      },
    },
  };
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  const t = dict.AboutPage;
  const companyInfo = { 
    name: dict.COMPANY_INFO?.name || COMPANY_INFO.name,
    mission: dict.COMPANY_INFO?.mission || COMPANY_INFO.mission,
    expertise: dict.COMPANY_INFO?.expertise || COMPANY_INFO.expertise,
    values: dict.COMPANY_INFO?.values || COMPANY_INFO.values,
  };


  return (
    <div className="container mx-auto px-4 py-12 md:py-16 animate-in fade-in duration-500">
      <SectionTitle
        as="h1" 
        title={`${t?.titlePrefix || 'About'} ${companyInfo.name}`}
        subtitle={t?.subtitle || "Crafting beauty and elegance, one tile at a time."}
      />

      <div className="max-w-4xl mx-auto">
        <Card className="mb-12 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <Image
                  src="/image/mitos-sobre-el-coworking-e1645011335655.jpg"
                  alt={t?.ourMissionImageAlt || "Illustrative image for Our Mission"}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md object-cover w-full h-full"
                  data-ai-hint="modern workspace"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-headline font-semibold text-primary mb-4 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-accent" /> {t?.ourMissionTitle || "Our Mission"}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {companyInfo.mission}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary flex items-center justify-center">
              <Award className="h-7 w-7 mr-2 text-accent" /> {t?.ourExpertiseTitle || "Our Expertise"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <p className="text-foreground/80 leading-relaxed text-center">
              {companyInfo.expertise}
            </p>
          </CardContent>
        </Card>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <SectionTitle title={t?.coreValuesTitle || "Our Core Values"} titleClassName="text-3xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {companyInfo.values.map((value: string, index: number) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3 text-accent flex-shrink-0" />
                  <span className="text-lg text-foreground/90">{value}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <h3 className="text-2xl font-headline font-semibold text-primary mb-4 flex items-center justify-center">
            <Users className="h-7 w-7 mr-2 text-accent" /> {t?.teamTitle || "The Team Behind the Tiles"}
          </h3>
          <p className="text-foreground/80 leading-relaxed max-w-2xl mx-auto">
            {t?.teamDescription || "Our passionate team of designers, artisans, and customer service professionals are dedicated to bringing your vision to life. We believe that every space deserves the touch of luxury that only the finest porcelain tiles can provide."}
          </p>
        </div>
      </div>
    </div>
  );
}

    