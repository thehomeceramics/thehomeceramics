import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { CONTACT_DETAILS } from '@/lib/data'; // CONTACT_DETAILS needs translation
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDictionary } from '@/lib/getDictionary';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const dict = await getDictionary(locale);
  const pageDict = dict.ContactPage?.metadata || {};
  const companyName = dict.COMPANY_INFO?.name || "The Home Ceramics Atelier";
  return {
    title: pageDict.title || dict.NavLinks?.contact || 'Contact Us',
    description: pageDict.description || `Get in touch with ${companyName} for inquiries, quotes, or support.`,
  };
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const dict = await getDictionary(locale);
  const t = dict.ContactPage;
  const contactDetails = { // Merge or use translated version
    email: dict.CONTACT_DETAILS?.email || CONTACT_DETAILS.email,
    phone: dict.CONTACT_DETAILS?.phone || CONTACT_DETAILS.phone,
    address: dict.CONTACT_DETAILS?.address || CONTACT_DETAILS.address,
  };
  const businessHours = dict.ContactPage?.businessHours || {
    line1: "Monday - Friday: 9:00 AM - 6:00 PM",
    line2: "Saturday: 10:00 AM - 4:00 PM",
    line3: "Sunday: Closed"
  };


  return (
    <div className="container mx-auto px-4 py-12 md:py-16 animate-in fade-in duration-500">
      <SectionTitle 
        as="h1" // Use h1 for the main page title
        title={t?.title || "Get In Touch"}
        subtitle={t?.subtitle || "We're here to help you find the perfect tiles for your project."}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="animate-in fade-in slide-in-from-left-8 duration-700">
          <Card className="shadow-xl h-full">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">{t?.formTitle || "Send Us a Message"}</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm /> {/* ContactForm will need internal translations for labels/placeholders */}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">{t?.contactInfoTitle || "Contact Information"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-6 w-6 mr-3 mt-1 text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground/90">{t?.emailUs || "Email Us"}</h4>
                  <a href={`mailto:${contactDetails.email}`} className="text-foreground/80 hover:text-accent transition-colors">
                    {contactDetails.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 mr-3 mt-1 text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground/90">{t?.callUs || "Call Us"}</h4>
                  <a href={`tel:${contactDetails.phone.replace(/\D/g, '')}`} className="text-foreground/80 hover:text-accent transition-colors">
                    {contactDetails.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 mr-3 mt-1 text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground/90">{t?.visitUs || "Visit Us"}</h4>
                  <p className="text-foreground/80">{contactDetails.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

           <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">{t?.businessHoursTitle || "Business Hours"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">{businessHours.line1}</p>
              <p className="text-foreground/80">{businessHours.line2}</p>
              <p className="text-foreground/80">{businessHours.line3}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
