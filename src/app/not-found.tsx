
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4 py-12 animate-in fade-in duration-500">
      <AlertTriangle className="h-24 w-24 text-destructive mb-8" />
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
        404 - Página No Encontrada
      </h1>
      <p className="text-lg md:text-xl text-foreground/80 max-w-md mx-auto mb-8">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Button asChild size="lg" className="shadow-lg hover:scale-105 transition-transform duration-200">
        <Link href="/">
          <Home className="mr-2 h-5 w-5" />
          Volver a la Página de Inicio
        </Link>
      </Button>
      <p className="mt-12 text-sm text-muted-foreground">
        Si crees que esto es un error, por favor contacta con nosotros.
      </p>
    </div>
  );
}
