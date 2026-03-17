'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity, total, itemCount } =
    useCartStore();

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [closeDrawer]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-[#FFF8F0] z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-orange-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-bold text-[#3D1F00]">
              Mi Carrito
              {itemCount() > 0 && (
                <span className="ml-2 text-sm text-orange-500">({itemCount()})</span>
              )}
            </h2>
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-full hover:bg-orange-100 transition-colors text-[#3D1F00]"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-[#3D1F00]/60">
              <ShoppingBag className="h-16 w-16 text-orange-200" />
              <p className="text-lg font-medium">Tu carrito está vacío</p>
              <Button onClick={closeDrawer} variant="outline" asChild>
                <Link href="/tienda">Ver tienda</Link>
              </Button>
            </div>
          ) : (
            items.map((item) => {
              const img = item.product.images?.[0];
              return (
                <div
                  key={item.product.id}
                  className="flex gap-4 bg-white rounded-2xl p-3 shadow-sm"
                >
                  {/* Image */}
                  <div className="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden bg-orange-50">
                    {img ? (
                      <Image
                        src={img.src}
                        alt={img.alt || item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-orange-200">
                        <ShoppingBag className="h-8 w-8" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#3D1F00] leading-tight line-clamp-2">
                      {item.product.name}
                    </p>
                    <p className="text-orange-500 font-bold text-sm mt-1">
                      {formatPrice(item.product.price)}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 transition-colors"
                      >
                        <Minus className="h-3 w-3 text-orange-700" />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center text-[#3D1F00]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 transition-colors"
                      >
                        <Plus className="h-3 w-3 text-orange-700" />
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-400 hover:text-red-600 transition-colors self-start mt-1"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-orange-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#3D1F00] font-medium">Subtotal</span>
              <span className="text-xl font-bold text-orange-500">{formatPrice(total())}</span>
            </div>
            <p className="text-xs text-[#3D1F00]/50 text-center">
              Envío calculado al finalizar la compra
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={closeDrawer} asChild>
                <Link href="/carrito">Ver carrito</Link>
              </Button>
              <Button asChild onClick={closeDrawer}>
                <Link href="/checkout">Finalizar compra</Link>
              </Button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
