
'use client';

import Image from 'next/image';
import type { CatalogItem } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadCloud } from 'lucide-react';
import { useState } from 'react';
import { CatalogDownloadDialog } from './CatalogDownloadDialog';
import type { Dictionary } from '@/lib/getDictionary'; // Import Dictionary type

interface CatalogCardProps {
  catalog: CatalogItem;
  viewButtonText: string;
  dictionary: Dictionary; // Add dictionary prop
}

export function CatalogCard({ catalog, viewButtonText, dictionary }: CatalogCardProps) {
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardHeader className="p-0">
          <div className="aspect-[3/4.24] relative w-full bg-muted">
            <Image
              src={catalog.coverImageUrl}
              alt={`Cover for ${catalog.name}`}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={catalog.dataAiHint}
              priority
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="font-headline text-xl mb-2 text-primary">{catalog.name}</CardTitle>
          <CardDescription className="text-foreground/75 mb-4 text-sm line-clamp-3">{catalog.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-6 pt-0 mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full group"
            onClick={() => setIsDownloadDialogOpen(true)}
          >
            {viewButtonText} <DownloadCloud className="ml-2 h-4 w-4 group-hover:animate-bounce" />
          </Button>
        </CardFooter>
      </Card>
      <CatalogDownloadDialog 
        isOpen={isDownloadDialogOpen} 
        onOpenChange={setIsDownloadDialogOpen}
        catalog={catalog}
        dictionary={dictionary} 
      />
    </>
  );
}
