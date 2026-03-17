import Link from 'next/link';
import type { WooProduct } from '@/types/woocommerce';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  products: WooProduct[];
  title?: string;
  href?: string;
}

export default function FeaturedProducts({
  products,
  title = 'Productos destacados',
  href = '/tienda',
}: FeaturedProductsProps) {
  if (!products.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#3D1F00]">{title}</h2>
          <p className="text-[#3D1F00]/60 mt-1">Los favoritos de nuestros clientes</p>
        </div>
        <Button variant="outline" asChild>
          <Link href={href} className="hidden sm:flex items-center gap-2">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Button variant="outline" asChild>
          <Link href={href} className="flex items-center gap-2">
            Ver todos los productos <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
