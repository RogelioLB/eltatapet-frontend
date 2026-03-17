'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import type { WooProduct } from '@/types/woocommerce';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: WooProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openDrawer } = useCartStore();
  const img = product.images?.[0];
  const isOnSale = product.on_sale && product.sale_price;
  const discount =
    isOnSale && product.regular_price && product.sale_price
      ? Math.round(
          ((Number(product.regular_price) - Number(product.sale_price)) /
            Number(product.regular_price)) *
            100
        )
      : 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    openDrawer();
  }

  return (
    <Link href={`/producto/${product.slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-orange-50">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-orange-50">
          {img ? (
            <Image
              src={img.src}
              alt={img.alt || product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-orange-200">
              <ShoppingCart className="h-16 w-16" />
            </div>
          )}

          {/* Sale badge */}
          {isOnSale && discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}

          {/* Out of stock */}
          {product.stock_status === 'outofstock' && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="bg-white text-[#3D1F00] text-sm font-bold px-3 py-1.5 rounded-full">
                Sin stock
              </span>
            </div>
          )}

          {/* Quick add overlay */}
          {product.stock_status === 'instock' && (
            <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                onClick={handleAddToCart}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 px-4 rounded-full flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                Añadir al carrito
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          {/* Categories */}
          {product.categories?.[0] && (
            <p className="text-xs text-orange-400 font-medium uppercase tracking-wide mb-1">
              {product.categories[0].name}
            </p>
          )}

          {/* Name */}
          <h3 className="text-sm font-semibold text-[#3D1F00] leading-tight line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {Number(product.average_rating) > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-[#3D1F00]/60">
                {product.average_rating} ({product.rating_count})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-orange-500">
              {formatPrice(product.price)}
            </span>
            {isOnSale && product.regular_price && (
              <span className="text-xs text-[#3D1F00]/40 line-through">
                {formatPrice(product.regular_price)}
              </span>
            )}
          </div>

          {/* Mobile add to cart */}
          {product.stock_status === 'instock' && (
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="w-full mt-3 sm:hidden"
            >
              <ShoppingCart className="h-4 w-4" />
              Añadir
            </Button>
          )}
        </div>
      </article>
    </Link>
  );
}
