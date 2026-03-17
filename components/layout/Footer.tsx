import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#3D1F00] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                🐾
              </div>
              <div>
                <span className="text-xl font-black">El Tata</span>
                <span className="text-xl font-black text-orange-400"> Pet</span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Tu tienda de mascotas de confianza en Limache, Valparaíso. Más de 10 años
              cuidando a tus peludos favoritos.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/eltatapet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com/eltatapet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-orange-400 mb-4">Tienda</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                { label: 'Todos los productos', href: '/tienda' },
                { label: 'Perros', href: '/categoria/perros' },
                { label: 'Gatos', href: '/categoria/gatos' },
                { label: 'Aves', href: '/categoria/aves' },
                { label: 'Peces', href: '/categoria/peces' },
                { label: 'Roedores', href: '/categoria/roedores' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-orange-400 mb-4">Información</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Carrito', href: '/carrito' },
                { label: 'Política de despacho', href: '/despacho' },
                { label: 'Cambios y devoluciones', href: '/devoluciones' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-orange-400 mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                <span>Av. Los Laureles, Sitio 14 poste 69, Limache, Valparaíso</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-400 shrink-0" />
                <a href="tel:+56927336644" className="hover:text-orange-400 transition-colors">
                  +56 9 27 33 66 44
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-400 shrink-0" />
                <a
                  href="mailto:contacto@eltatapet.cl"
                  className="hover:text-orange-400 transition-colors"
                >
                  contacto@eltatapet.cl
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-400 shrink-0" />
                <span>Lunes a Domingo 9:00 - 20:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} El Tata Pet. Todos los derechos reservados.</p>
          <p>Desarrollado con ❤️ en Limache, Chile</p>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/56927336644?text=Hola,%20me%20gustar%C3%ADa%20consultar%20sobre%20un%20producto"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-200"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </footer>
  );
}
