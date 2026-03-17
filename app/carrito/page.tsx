import type { Metadata } from 'next';
import CartPageContent from './CartPageContent';

export const metadata: Metadata = {
  title: 'Mi Carrito',
  description: 'Revisa los productos en tu carrito de compras.',
};

export default function CarritoPage() {
  return <CartPageContent />;
}
