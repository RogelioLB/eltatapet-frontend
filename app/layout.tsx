import type { Metadata } from 'next';
import './globals.css';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'El Tata Pet — Tienda de mascotas en Limache',
    template: '%s | El Tata Pet',
  },
  description:
    'Tu tienda de mascotas en Limache, Valparaíso. Alimentos, accesorios y más para perros, gatos, aves y más. Despacho gratis sobre $15.000.',
  keywords: ['tienda mascotas', 'limache', 'valparaíso', 'perros', 'gatos', 'comida mascotas'],
  openGraph: {
    siteName: 'El Tata Pet',
    type: 'website',
    locale: 'es_CL',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen flex flex-col">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
