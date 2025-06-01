import type { Metadata } from 'next';
import Image from 'next/image';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { COMPANY_INFO } from '@/lib/data';
import { CheckCircle, Award, Users, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about TheHomeCeramics's mission, values, and expertise in luxury porcelain tiles.`,
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 animate-in fade-in duration-500">
      <SectionTitle
        as="h1" // Use h1 for the main page title
        title={`About ${COMPANY_INFO.name}`}
        subtitle="Crafting beauty and elegance, one tile at a time."
      />

      <div className="max-w-4xl mx-auto">
        <Card className="mb-12 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <Image
                  src="/image/mitos-sobre-el-coworking-e1645011335655.jpg"
                  alt="Modern workspace illustrating our mission"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md object-cover w-full h-full"
                  data-ai-hint="modern workspace"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-headline font-semibold text-primary mb-4 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-accent" /> Our Mission
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {COMPANY_INFO.mission}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary flex items-center justify-center">
              <Award className="h-7 w-7 mr-2 text-accent" /> Our Expertise
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <p className="text-foreground/80 leading-relaxed text-center">
              {COMPANY_INFO.expertise}
            </p>
          </CardContent>
        </Card>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <SectionTitle title="Our Core Values" titleClassName="text-3xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {COMPANY_INFO.values.map((value, index) => (
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
            <Users className="h-7 w-7 mr-2 text-accent" /> The Team Behind the Tiles
          </h3>
          <p className="text-foreground/80 leading-relaxed max-w-2xl mx-auto">
            Our passionate team of designers, artisans, and customer service professionals are dedicated to bringing your vision to life. We believe that every space deserves the touch of luxury that only the finest porcelain tiles can provide.
          </p>
        </div>
      </div>
    </div>
  );
}
