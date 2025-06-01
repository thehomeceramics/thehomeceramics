
'use client';

import Image from 'next/image';
import type { Product } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, Tag } from 'lucide-react'; // Changed ArrowRight to MessageCircle
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from 'react'; // Required for Autoplay plugin

interface ProductCardDictionaryTexts {
  materialLabel: string;
  finishLabel: string;
  sizeLabel: string;
  styleLabel: string;
  viewDetailsButton: string;
  whatsappInquiryPrefix: string; // New key for WhatsApp message
}

interface ProductCardProps {
  product: Product;
  dictionaryTexts?: ProductCardDictionaryTexts; // Make optional for non-localized pages
}

export function ProductCard({ product, dictionaryTexts }: ProductCardProps) {
  const { 
    materialLabel, 
    finishLabel, 
    sizeLabel, 
    styleLabel, 
    viewDetailsButton,
    whatsappInquiryPrefix
  } = dictionaryTexts || { 
    materialLabel: "Material:",
    finishLabel: "Finish:",
    sizeLabel: "Size:",
    styleLabel: "Style:",
    viewDetailsButton: "Contact us on WhatsApp", // Default button text updated
    whatsappInquiryPrefix: "Hello, I'm interested in:" // Default prefix
  };

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(`${whatsappInquiryPrefix} ${product.name}`);
    const whatsappUrl = `https://wa.me/34625052753?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="p-0">
        {product.images && product.images.length > 0 ? (
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000, 
                stopOnInteraction: true,
              }),
            ]}
            opts={{
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-video relative w-full">
                    <Image
                      src={image.url}
                      alt={`${product.name} - view ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={image.dataAiHint}
                      priority={index === 0} 
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="aspect-video relative w-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No image</p>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-2xl mb-2 text-primary">{product.name}</CardTitle>
        <CardDescription className="text-foreground/75 mb-4 text-sm">{product.description}</CardDescription>
        
        <div className="space-y-1 text-xs text-muted-foreground mb-3">
          <p><strong className="text-foreground/90">{materialLabel}</strong> {product.specifications.material}</p>
          <p><strong className="text-foreground/90">{finishLabel}</strong> {product.specifications.finish}</p>
          <p><strong className="text-foreground/90">{sizeLabel}</strong> {product.specifications.size}</p>
          <p><strong className="text-foreground/90">{styleLabel}</strong> <Badge variant="secondary">{product.specifications.style}</Badge></p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
        {product.price && (
          <div className="flex items-center text-lg font-semibold text-accent mr-4">
            <Tag className="h-5 w-5 mr-1" /> {product.price}
          </div>
        )}
        <Button variant="outline" size="sm" className="ml-auto group" onClick={handleWhatsAppInquiry}>
          {viewDetailsButton} <MessageCircle className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
}

    