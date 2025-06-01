import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { CONTACT_DETAILS } from '@/lib/data';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with The Home Ceramics Atelier for inquiries, quotes, or support regarding our luxury porcelain tiles.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 animate-in fade-in duration-500">
      <SectionTitle 
        as="h1" // Use h1 for the main page title
        title="Get In Touch"
        subtitle="We're here to help you find the perfect tiles for your project."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="animate-in fade-in slide-in-from-left-8 duration-700">
          <Card className="shadow-xl h-full">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-6 w-6 mr-3 mt-1 text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground/90">Email Us</h4>
                  <a href={`mailto:${CONTACT_DETAILS.email}`} className="text-foreground/80 hover:text-accent transition-colors">
                    {CONTACT_DETAILS.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 mr-3 mt-1 text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground/90">Call Us</h4>
                  <a href={`tel:${CONTACT_DETAILS.phone.replace(/\D/g, '')}`} className="text-foreground/80 hover:text-accent transition-colors">
                    {CONTACT_DETAILS.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 mr-3 mt-1 text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground/90">Visit Us</h4>
                  <p className="text-foreground/80">{CONTACT_DETAILS.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

           <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Business Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-foreground/80">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-foreground/80">Sunday: Closed</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
