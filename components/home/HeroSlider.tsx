'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SLIDES = [
  {
    id: 1,
    title: 'Todo para tu mascota',
    subtitle: 'La mejor selección de alimentos, accesorios y más para tus peludos favoritos',
    cta: 'Ver tienda',
    href: '/tienda',
    bg: 'from-orange-500 to-amber-600',
    emoji: '🐕',
  },
  {
    id: 2,
    title: 'Despacho GRATIS',
    subtitle: 'En compras sobre $15.000 CLP a todo Chile. ¡Tu pedido llega a domicilio!',
    cta: 'Comprar ahora',
    href: '/tienda',
    bg: 'from-amber-700 to-amber-900',
    emoji: '🚚',
  },
  {
    id: 3,
    title: 'Alimentos premium',
    subtitle: 'Las mejores marcas de alimento para perros y gatos. Nutrición que se nota.',
    cta: 'Ver alimentos',
    href: '/categoria/perros',
    bg: 'from-orange-400 to-orange-600',
    emoji: '🐱',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  function go(index: number) {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 500);
  }

  function goNext() {
    go((current + 1) % SLIDES.length);
  }

  function goPrev() {
    go((current - 1 + SLIDES.length) % SLIDES.length);
  }

  const slide = SLIDES[current];

  return (
    <section className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4">
      <div
        className={`bg-gradient-to-br ${slide.bg} transition-all duration-500 ease-in-out`}
        style={{ minHeight: '400px' }}
      >
        <div className="max-w-7xl mx-auto px-8 py-16 sm:py-24 flex items-center">
          <div
            className={`flex-1 text-white transition-all duration-500 ${
              isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <p className="text-5xl sm:text-7xl mb-6">{slide.emoji}</p>
            <h1 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
              {slide.title}
            </h1>
            <p className="text-white/85 text-base sm:text-lg mb-8 max-w-lg leading-relaxed">
              {slide.subtitle}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 shadow-xl font-bold"
            >
              <Link href={slide.href}>{slide.cta} →</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full p-2 transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full p-2 transition-all"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'bg-white w-6 h-2' : 'bg-white/40 w-2 h-2'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
