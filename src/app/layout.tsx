
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css'; // Import global styles here

export const metadata: Metadata = {
  metadataBase: new URL('https://www.thehomeceramics.com'),
  title: {
    default: 'TheHomeCeramics Atelier - Porcelánicos de Lujo', // Default title for non-locale pages like 404
    template: '%s | TheHomeCeramics Atelier',
  },
  description: 'Descubra porcelánicos de lujo en TheHomeCeramics. Elegancia, durabilidad y diseños únicos para suelos y paredes.', // Default description
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sura:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-background font-body antialiased flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
