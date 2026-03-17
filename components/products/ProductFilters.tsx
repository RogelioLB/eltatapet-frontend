'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import type { WooCategory } from '@/types/woocommerce';
import { Button } from '@/components/ui/button';

interface ProductFiltersProps {
  categories: WooCategory[];
  currentCategory?: string;
  currentSearch?: string;
}

const PRICE_RANGES = [
  { label: 'Todos los precios', min: '', max: '' },
  { label: 'Hasta $5.000', min: '', max: '5000' },
  { label: '$5.000 - $15.000', min: '5000', max: '15000' },
  { label: '$15.000 - $30.000', min: '15000', max: '30000' },
  { label: 'Más de $30.000', min: '30000', max: '' },
];

const SORT_OPTIONS = [
  { label: 'Más recientes', value: 'date-desc' },
  { label: 'Precio: Menor a Mayor', value: 'price-asc' },
  { label: 'Precio: Mayor a Menor', value: 'price-desc' },
  { label: 'Más valorados', value: 'rating-desc' },
  { label: 'Más populares', value: 'popularity-desc' },
];

export default function ProductFilters({
  categories,
  currentCategory,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [priceOpen, setPriceOpen] = useState(true);
  const [catOpen, setCatOpen] = useState(true);

  const currentSort = searchParams.get('orderby')
    ? `${searchParams.get('orderby')}-${searchParams.get('order') ?? 'desc'}`
    : 'date-desc';

  const currentMin = searchParams.get('min_price') ?? '';
  const currentMax = searchParams.get('max_price') ?? '';

  function updateParams(params: Record<string, string>) {
    const current = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([k, v]) => {
      if (v) current.set(k, v);
      else current.delete(k);
    });
    startTransition(() => {
      router.push(`/tienda?${current.toString()}`);
    });
  }

  function handleSort(value: string) {
    const [orderby, order] = value.split('-');
    updateParams({ orderby, order });
  }

  function handlePrice(min: string, max: string) {
    updateParams({ min_price: min, max_price: max });
  }

  function handleClear() {
    startTransition(() => router.push('/tienda'));
  }

  const hasFilters =
    searchParams.get('min_price') ||
    searchParams.get('max_price') ||
    searchParams.get('category') ||
    searchParams.get('orderby');

  return (
    <aside className={`space-y-6 ${isPending ? 'opacity-60 pointer-events-none' : ''}`}>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-[#3D1F00] flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-orange-500" />
          Filtros
        </h2>
        {hasFilters && (
          <button
            onClick={handleClear}
            className="text-xs text-orange-500 hover:text-orange-700 underline"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-semibold text-[#3D1F00] mb-2">Ordenar por</label>
        <select
          value={currentSort}
          onChange={(e) => handleSort(e.target.value)}
          className="w-full rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm text-[#3D1F00] focus:outline-none focus:border-orange-400"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div>
        <button
          onClick={() => setCatOpen(!catOpen)}
          className="w-full flex items-center justify-between text-sm font-semibold text-[#3D1F00] mb-2"
        >
          Categorías
          {catOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {catOpen && (
          <div className="space-y-1">
            <Button
              variant={!currentCategory ? 'default' : 'ghost'}
              size="sm"
              className="w-full justify-start"
              onClick={() => updateParams({ category: '' })}
            >
              Todas las categorías
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={currentCategory === cat.slug ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start"
                onClick={() => router.push(`/categoria/${cat.slug}`)}
              >
                {cat.name}
                <span className="ml-auto text-xs opacity-60">({cat.count})</span>
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => setPriceOpen(!priceOpen)}
          className="w-full flex items-center justify-between text-sm font-semibold text-[#3D1F00] mb-2"
        >
          Precio
          {priceOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {priceOpen && (
          <div className="space-y-1">
            {PRICE_RANGES.map((range) => {
              const isActive = currentMin === range.min && currentMax === range.max;
              return (
                <Button
                  key={range.label}
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handlePrice(range.min, range.max)}
                >
                  {range.label}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
