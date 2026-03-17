'use client';

import { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import type { WooProduct } from '@/types/woocommerce';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';

interface AddToCartButtonProps {
  product: WooProduct;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, openDrawer } = useCartStore();

  const isOutOfStock = product.stock_status === 'outofstock';

  function handleAdd() {
    addItem(product, quantity);
    openDrawer();
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Quantity */}
      <div className="flex items-center border-2 border-orange-200 rounded-full overflow-hidden w-fit">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-4 py-3 hover:bg-orange-100 transition-colors text-[#3D1F00] disabled:opacity-40"
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="px-6 py-3 font-bold text-[#3D1F00] min-w-[60px] text-center">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-4 py-3 hover:bg-orange-100 transition-colors text-[#3D1F00]"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Add to Cart */}
      <Button
        onClick={handleAdd}
        disabled={isOutOfStock}
        size="lg"
        className="flex-1 sm:flex-none"
      >
        <ShoppingCart className="h-5 w-5" />
        {isOutOfStock ? 'Sin stock' : 'Añadir al carrito'}
      </Button>
    </div>
  );
}
