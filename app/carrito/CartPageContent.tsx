'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function CartPageContent() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();

  if (!items.length) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h1 className="text-2xl font-black text-[#3D1F00] mb-4">Tu carrito está vacío</h1>
        <p className="text-[#3D1F00]/60 mb-8">
          ¡Explora nuestra tienda y encuentra lo que tu mascota necesita!
        </p>
        <Button asChild size="lg">
          <Link href="/tienda">
            <ShoppingBag className="h-5 w-5" />
            Ir a la tienda
          </Link>
        </Button>
      </div>
    );
  }

  const subtotal = total();
  const freeShippingThreshold = 15000;
  const freeShipping = subtotal >= freeShippingThreshold;
  const remaining = freeShippingThreshold - subtotal;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-[#3D1F00]">Mi Carrito</h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-400 hover:text-red-600 transition-colors underline"
        >
          Vaciar carrito
        </button>
      </div>

      {/* Free shipping progress */}
      {!freeShipping && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6">
          <p className="text-sm text-[#3D1F00]">
            ¡Te faltan{' '}
            <strong className="text-orange-500">{formatPrice(remaining)}</strong>{' '}
            para obtener despacho gratis! 🚚
          </p>
          <div className="mt-2 h-2 bg-orange-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
            />
          </div>
        </div>
      )}
      {freeShipping && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 text-sm text-green-700 font-medium">
          🎉 ¡Felicidades! Tu pedido tiene despacho GRATIS.
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const img = item.product.images?.[0];
            return (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm"
              >
                {/* Image */}
                <Link href={`/producto/${item.product.slug}`}>
                  <div className="relative h-24 w-24 rounded-xl overflow-hidden bg-orange-50 shrink-0">
                    {img ? (
                      <Image
                        src={img.src}
                        alt={img.alt || item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🐾
                      </div>
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/producto/${item.product.slug}`}>
                    <h3 className="font-semibold text-[#3D1F00] hover:text-orange-600 transition-colors line-clamp-2">
                      {item.product.name}
                    </h3>
                  </Link>
                  {item.product.categories?.[0] && (
                    <p className="text-xs text-[#3D1F00]/50 mt-0.5">
                      {item.product.categories[0].name}
                    </p>
                  )}
                  <p className="text-orange-500 font-bold mt-1">
                    {formatPrice(item.product.price)}
                  </p>

                  {/* Quantity & Remove */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-orange-200 rounded-full">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1.5 hover:bg-orange-100 rounded-l-full transition-colors"
                      >
                        <Minus className="h-3 w-3 text-[#3D1F00]" />
                      </button>
                      <span className="px-4 py-1.5 text-sm font-bold text-[#3D1F00] min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1.5 hover:bg-orange-100 rounded-r-full transition-colors"
                      >
                        <Plus className="h-3 w-3 text-[#3D1F00]" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-bold text-[#3D1F00]">
                        {formatPrice(Number(item.product.price) * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-black text-[#3D1F00] mb-6">Resumen del pedido</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#3D1F00]/70">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} productos)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#3D1F00]/70">
                <span>Despacho</span>
                <span className={freeShipping ? 'text-green-600 font-semibold' : ''}>
                  {freeShipping ? 'Gratis' : 'A calcular'}
                </span>
              </div>
              <div className="border-t border-orange-100 pt-3 flex justify-between font-black text-lg text-[#3D1F00]">
                <span>Total</span>
                <span className="text-orange-500">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <Button asChild size="lg" className="w-full mt-6">
              <Link href="/checkout">
                Finalizar compra <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            <Button asChild variant="ghost" className="w-full mt-3">
              <Link href="/tienda">Seguir comprando</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
