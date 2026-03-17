import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProducts, getCategories, getCategoryBySlug } from '@/lib/woocommerce';
import ProductGrid, { ProductGridSkeleton } from '@/components/products/ProductGrid';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface CategoriaProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoriaProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: 'Categoría no encontrada' };
  return {
    title: category.name,
    description: `Productos de ${category.name} en El Tata Pet. ${category.count} productos disponibles.`,
  };
}

export default async function CategoriaPage({ params }: CategoriaProps) {
  const { slug } = await params;
  const [category, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
  ]);

  if (!category) notFound();

  const products = await getProducts({ category: category.id, per_page: 24 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#3D1F00]/60 mb-6">
        <Link href="/" className="hover:text-orange-500 transition-colors">Inicio</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/tienda" className="hover:text-orange-500 transition-colors">Tienda</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[#3D1F00] font-medium">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#3D1F00]">{category.name}</h1>
        <p className="text-[#3D1F00]/60 mt-1">{category.count} productos disponibles</p>
        {category.description && (
          <p className="text-[#3D1F00]/70 mt-3 max-w-2xl">{category.description}</p>
        )}
      </div>

      {/* Sub-categories */}
      {allCategories.filter((c) => c.parent === category.id).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {allCategories
            .filter((c) => c.parent === category.id)
            .map((sub) => (
              <Link
                key={sub.id}
                href={`/categoria/${sub.slug}`}
                className="px-4 py-2 rounded-full bg-white border border-orange-200 text-[#3D1F00] text-sm font-medium hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all"
              >
                {sub.name}
                <span className="ml-1 opacity-60">({sub.count})</span>
              </Link>
            ))}
        </div>
      )}

      {/* Products */}
      <ProductGrid products={products} />
    </div>
  );
}
