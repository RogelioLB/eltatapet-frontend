import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Star, Package, ShieldCheck } from 'lucide-react';
import { getProduct, getRelatedProducts } from '@/lib/woocommerce';
import { formatPrice, stripHtml } from '@/lib/utils';
import ProductGallery from '@/components/products/ProductGallery';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import AddToCartButton from './AddToCartButton';

interface ProductoProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductoProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProduct(slug);
    return {
      title: product.name,
      description: stripHtml(product.short_description || product.description).slice(0, 160),
      openGraph: {
        images: product.images?.[0]?.src ? [product.images[0].src] : [],
      },
    };
  } catch {
    return { title: 'Producto no encontrado' };
  }
}

export default async function ProductoPage({ params }: ProductoProps) {
  const { slug } = await params;

  let product;
  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.related_ids).catch(() => []);

  const isOnSale = product.on_sale && product.sale_price;
  const discount =
    isOnSale && product.regular_price && product.sale_price
      ? Math.round(
          ((Number(product.regular_price) - Number(product.sale_price)) /
            Number(product.regular_price)) *
            100
        )
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#3D1F00]/60 mb-6 flex-wrap">
        <Link href="/" className="hover:text-orange-500 transition-colors">Inicio</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/tienda" className="hover:text-orange-500 transition-colors">Tienda</Link>
        {product.categories?.[0] && (
          <>
            <ChevronRight className="h-4 w-4" />
            <Link
              href={`/categoria/${product.categories[0].slug}`}
              className="hover:text-orange-500 transition-colors"
            >
              {product.categories[0].name}
            </Link>
          </>
        )}
        <ChevronRight className="h-4 w-4" />
        <span className="text-[#3D1F00] font-medium line-clamp-1 max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Product Layout */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Gallery */}
        <div>
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Info */}
        <div className="space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {product.categories?.map((cat) => (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                className="text-xs font-semibold text-orange-600 uppercase tracking-wide hover:underline"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Name */}
          <h1 className="text-2xl sm:text-3xl font-black text-[#3D1F00] leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          {Number(product.average_rating) > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(Number(product.average_rating))
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-[#3D1F00]/60">
                {product.average_rating} ({product.rating_count} reseñas)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-orange-500">
              {formatPrice(product.price)}
            </span>
            {isOnSale && product.regular_price && (
              <>
                <span className="text-xl text-[#3D1F00]/40 line-through">
                  {formatPrice(product.regular_price)}
                </span>
                <span className="bg-red-500 text-white text-sm font-bold px-2 py-0.5 rounded-full">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 text-sm">
            <div
              className={`w-2 h-2 rounded-full ${
                product.stock_status === 'instock' ? 'bg-green-500' : 'bg-red-400'
              }`}
            />
            <span className="text-[#3D1F00]/70">
              {product.stock_status === 'instock'
                ? product.stock_quantity
                  ? `${product.stock_quantity} en stock`
                  : 'Disponible'
                : 'Sin stock'}
            </span>
          </div>

          {/* Short description */}
          {product.short_description && (
            <div
              className="text-[#3D1F00]/70 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}

          {/* Add to Cart */}
          <AddToCartButton product={product} />

          {/* Perks */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-orange-100">
            <div className="flex items-center gap-2 text-sm text-[#3D1F00]/70">
              <Package className="h-4 w-4 text-orange-500" />
              Despacho gratis +$15K
            </div>
            <div className="flex items-center gap-2 text-sm text-[#3D1F00]/70">
              <ShieldCheck className="h-4 w-4 text-orange-500" />
              Compra protegida
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <section className="mb-16">
          <h2 className="text-2xl font-black text-[#3D1F00] mb-6">Descripción</h2>
          <div
            className="text-[#3D1F00]/70 leading-relaxed prose prose-lg max-w-none prose-headings:text-[#3D1F00] prose-a:text-orange-500"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <FeaturedProducts
          products={relatedProducts}
          title="Productos relacionados"
          href="/tienda"
        />
      )}
    </div>
  );
}
