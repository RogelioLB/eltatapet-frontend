const BRANDS = [
  { name: 'Royal Canin', emoji: '👑' },
  { name: 'Purina', emoji: '⭐' },
  { name: 'Hills', emoji: '🏔️' },
  { name: 'Whiskas', emoji: '🐱' },
  { name: 'Pedigree', emoji: '🐕' },
  { name: 'Advance', emoji: '🚀' },
  { name: 'ProPlan', emoji: '💪' },
  { name: 'Eukanuba', emoji: '🌟' },
];

export default function BrandsSection() {
  return (
    <section className="bg-white py-10 border-y border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-[#3D1F00]/50 uppercase tracking-widest mb-8">
          Marcas disponibles
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center gap-2 text-[#3D1F00]/60 hover:text-orange-500 transition-colors group"
            >
              <span className="text-2xl">{brand.emoji}</span>
              <span className="font-semibold text-sm sm:text-base">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
