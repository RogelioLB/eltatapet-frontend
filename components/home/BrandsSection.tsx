import Image from 'next/image';

const BRANDS = [
  { name: 'Monge', image: 'https://eltatapet.cl/wp-content/uploads/2025/11/marca-monge.webp' },
  { name: 'Master Dog', image: 'https://eltatapet.cl/wp-content/uploads/2025/11/master-dog-marca.webp' },
  { name: 'Bravery', image: 'https://eltatapet.cl/wp-content/uploads/2025/11/bravery-marca.webp' },
  { name: 'Cat Chow', image: 'https://eltatapet.cl/wp-content/uploads/2025/11/marca-cat-chow.webp' },
  { name: 'Champion', image: 'https://eltatapet.cl/wp-content/uploads/2025/11/marca-champion-god.webp' },
];

export default function BrandsSection() {
  return (
    <section className="bg-white py-10 border-y border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-[#3D1F00]/50 uppercase tracking-widest mb-8">
          Marcas disponibles
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="relative h-12 w-28 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain"
                sizes="112px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
