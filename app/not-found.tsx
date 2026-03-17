import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🐾</div>
        <h1 className="text-6xl font-black text-orange-500 mb-2">404</h1>
        <h2 className="text-2xl font-black text-[#3D1F00] mb-4">
          Página no encontrada
        </h2>
        <p className="text-[#3D1F00]/60 mb-8 leading-relaxed">
          ¡Ups! Parece que tu mascota se comió esta página. No encontramos
          lo que estás buscando.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/tienda">
              <ShoppingBag className="h-4 w-4" />
              Ir a la tienda
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
