export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t py-8 bg-secondary/50">
      <div className="container mx-auto px-4 text-center text-secondary-foreground">
        <p className="text-sm">
          &copy; {currentYear} The Home Ceramics Atelier. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Luxury Porcelain Tiles for Discerning Tastes.
        </p>
      </div>
    </footer>
  );
}
