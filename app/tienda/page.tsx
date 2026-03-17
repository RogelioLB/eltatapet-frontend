import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getProducts, getCategories } from '@/lib/woocommerce';
import ProductGrid, { ProductGridSkeleton } from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';

export const metadata: Metadata = {
  title: 'Tienda',
  description: 'Explora todos los productos de El Tata Pet. Alimentos, accesorios y más para tu mascota.',
};

interface TiendaProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    orderby?: string;
    order?: string;
    min_price?: string;
    max_price?: string;
  }>;
}

async function ProductsContent({ searchParams }: { searchParams: Awaited<TiendaProps['searchParams']> }) {
  const page = Number(searchParams.page ?? 1);

  const products = await getProducts({
    page,
    per_page: 24,
    search: searchParams.search,
    category: searchParams.category,
    orderby: searchParams.orderby as 'date' | 'price' | 'popularity' | 'rating' | undefined,
    order: searchParams.order as 'asc' | 'desc' | undefined,
    min_price: searchParams.min_price,
    max_price: searchParams.max_price,
  });

  return <ProductGrid products={products} />;
}

export default async function TiendaPage({ searchParams }: TiendaProps) {
  const params = await searchParams;
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#3D1F00]">Tienda</h1>
        {params.search && (
          <p className="text-[#3D1F00]/60 mt-2">
            Resultados para: <strong>&quot;{params.search}&quot;</strong>
          </p>
        )}
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <ProductFilters
              categories={categories}
              currentCategory={params.category}
              currentSearch={params.search}
            />
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          <Suspense
            key={JSON.stringify(params)}
            fallback={<ProductGridSkeleton count={24} />}
          >
            <ProductsContent searchParams={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
