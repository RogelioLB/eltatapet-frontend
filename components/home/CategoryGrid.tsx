import Link from 'next/link';
import Image from 'next/image';
import type { WooCategory } from '@/types/woocommerce';

interface CategoryGridProps {
  categories: WooCategory[];
}

const CATEGORY_EMOJIS: Record<string, string> = {
  perros: '🐕',
  gatos: '🐈',
  aves: '🦜',
  peces: '🐠',
  roedores: '🐹',
  reptiles: '🦎',
};

const CATEGORY_COLORS: Record<string, string> = {
  perros: 'from-orange-400 to-orange-600',
  gatos: 'from-amber-400 to-amber-600',
  aves: 'from-yellow-400 to-orange-400',
  peces: 'from-blue-400 to-cyan-500',
  roedores: 'from-amber-500 to-amber-700',
  reptiles: 'from-green-400 to-emerald-600',
};

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const topCategories = categories.filter((c) => c.parent === 0).slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl sm:text-3xl font-black text-[#3D1F00] mb-2">
        Compra por categoría
      </h2>
      <p className="text-[#3D1F00]/60 mb-8">Encuentra lo que tu mascota necesita</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {topCategories.map((cat) => {
          const emoji = CATEGORY_EMOJIS[cat.slug] ?? '🐾';
          const gradient = CATEGORY_COLORS[cat.slug] ?? 'from-orange-400 to-orange-600';

          return (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              className="group flex flex-col items-center gap-3"
            >
              <div
                className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 overflow-hidden relative`}
              >
                {cat.image ? (
                  <Image
                    src={cat.image.src}
                    alt={cat.image.alt || cat.name}
                    fill
                    className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-5xl">{emoji}</span>
                )}
              </div>
              <div className="text-center">
                <p className="font-bold text-[#3D1F00] group-hover:text-orange-600 transition-colors text-sm sm:text-base">
                  {cat.name}
                </p>
                <p className="text-xs text-[#3D1F00]/50">{cat.count} productos</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
