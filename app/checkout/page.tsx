import type { Metadata } from 'next';
import CheckoutContent from './CheckoutContent';

export const metadata: Metadata = {
  title: 'Finalizar Compra',
  description: 'Completa tu pedido en El Tata Pet.',
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
