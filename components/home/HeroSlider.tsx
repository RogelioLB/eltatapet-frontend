'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SLIDES = [
  {
    id: 1,
    title: 'Despacho GRATIS',
    subtitle: 'En compras sobre $15.000 CLP a todo Chile. ¡Tu pedido llega a domicilio!',
    cta: 'Comprar ahora',
    href: '/tienda',
    image: 'https://eltatapet.cl/wp-content/uploads/2026/01/bannerperrito-envio-gratis.webp',
  },
  {
    id: 2,
    title: 'Para todas las especies',
    subtitle: 'Explora nuestra sección de mascotas pequeñas y encuentra todo lo que necesitas.',
    cta: 'Ver productos',
    href: '/tienda',
    image: 'https://eltatapet.cl/wp-content/uploads/2026/01/variedad-de-productos-mascotas-pequenas.webp',
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <section className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4" style={{ minHeight: '400px' }}>
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={i === 0}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Content */}
          <div className="relative z-10 h-full flex items-center px-8 sm:px-16 py-16">
            <div className={`text-white transition-all duration-500 ${isAnimating && i === current ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <h1 className="text-3xl sm:text-5xl font-black mb-4 leading-tight drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-white/90 text-base sm:text-lg mb-8 max-w-lg leading-relaxed drop-shadow">
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
      ))}

      {/* Controls */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full p-2 transition-all z-20"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full p-2 transition-all z-20"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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
