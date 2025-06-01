import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  // In a real scenario, you might fetch this from es.json
  return {
    title: 'Función Eliminada',
    description: 'La función de Asesor de Estilo de Azulejos IA ya no está disponible.',
  };
}

export default function AiAdvisorRemovedPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 text-center animate-in fade-in duration-500">
      <h1 className="text-3xl font-headline font-bold text-primary mb-6">
        Asesor de Estilo de Azulejos IA Eliminado
      </h1>
      <p className="text-lg text-foreground/80 mb-8">
        Esta función ya no está disponible.
      </p>
      <Link href="/es" className="text-accent hover:underline">
        Volver a la Página de Inicio
      </Link>
    </div>
  );
}
