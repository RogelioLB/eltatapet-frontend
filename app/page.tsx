import { Suspense } from 'react';
import { getProducts, getCategories } from '@/lib/woocommerce';
import HeroSlider from '@/components/home/HeroSlider';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BrandsSection from '@/components/home/BrandsSection';
import { ProductGridSkeleton } from '@/components/products/ProductGrid';
import { Truck, Clock, Shield, Phone } from 'lucide-react';

const PERKS = [
  {
    icon: Truck,
    title: 'Despacho GRATIS',
    desc: 'En compras sobre $15.000 CLP a todo Chile',
  },
  {
    icon: Clock,
    title: 'Lun - Dom 9:00-20:00',
    desc: 'Atención todos los días del año',
  },
  {
    icon: Shield,
    title: 'Compra segura',
    desc: 'Pagos protegidos y devoluciones fáciles',
  },
  {
    icon: Phone,
    title: '+56 9 27 33 66 44',
    desc: 'Atención por WhatsApp y teléfono',
  },
];

async function FeaturedSection() {
  try {
    const products = await getProducts({ featured: true, per_page: 8 });
    if (!products.length) {
      const all = await getProducts({ orderby: 'popularity', per_page: 8 });
      return <FeaturedProducts products={all} />;
    }
    return <FeaturedProducts products={products} />;
  } catch {
    return null;
  }
}

async function CategorySection() {
  try {
    const categories = await getCategories();
    return <CategoryGrid categories={categories} />;
  } catch {
    return null;
  }
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <HeroSlider />

      {/* Perks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PERKS.map((perk) => (
            <div
              key={perk.title}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 bg-white rounded-2xl p-4 shadow-sm"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                <perk.icon className="h-5 w-5 text-orange-500" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-bold text-[#3D1F00] text-sm">{perk.title}</p>
                <p className="text-xs text-[#3D1F00]/60 mt-0.5">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <Suspense fallback={null}>
        <CategorySection />
      </Suspense>

      {/* Featured Products */}
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ProductGridSkeleton count={8} />
        </div>
      }>
        <FeaturedSection />
      </Suspense>

      {/* Brands */}
      <BrandsSection />

      {/* Delivery Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-4xl mb-4">🚚</p>
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Despacho Express a Limache y alrededores
          </h2>
          <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto">
            Recibe tu pedido en el día para compras realizadas antes de las 16:00 hrs.
            Cobertura en Limache, Olmué y localidades cercanas.
          </p>
        </div>
      </section>
    </div>
  );
}
