import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  as?: 'h1' | 'h2'; // New prop to define the heading level
}

export function SectionTitle({ 
  title, 
  subtitle, 
  className, 
  titleClassName, 
  subtitleClassName, 
  as: HeadingTag = 'h2' // Default to h2
}: SectionTitleProps) {
  return (
    <div className={cn("mb-8 md:mb-12 text-center", className)}>
      <HeadingTag className={cn(
        HeadingTag === 'h1' ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl", // Different sizes for h1 vs h2
        "font-headline font-bold text-primary", 
        titleClassName
      )}>
        {title}
      </HeadingTag>
      {subtitle && (
        <p className={cn("mt-2 text-lg text-muted-foreground", subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
