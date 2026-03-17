'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import CartDrawer from './CartDrawer';

const NAV_LINKS = [
  {
    label: 'Tienda',
    href: '/tienda',
    children: [
      { label: 'Perros', href: '/categoria/perros' },
      { label: 'Gatos', href: '/categoria/gatos' },
      { label: 'Aves', href: '/categoria/aves' },
      { label: 'Peces', href: '/categoria/peces' },
      { label: 'Roedores', href: '/categoria/roedores' },
    ],
  },
  { label: 'Categorías', href: '/tienda' },
  { label: 'Ofertas', href: '/tienda?orderby=price&order=asc' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [megaMenu, setMegaMenu] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { itemCount, openDrawer } = useCartStore();
  const count = itemCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tienda?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FFF8F0]/95 backdrop-blur-md shadow-md'
            : 'bg-[#FFF8F0]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow group-hover:scale-105 transition-transform">
                🐾
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-black text-[#3D1F00]">El Tata</span>
                <span className="text-xl font-black text-orange-500"> Pet</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setMegaMenu(link.label)}
                  onMouseLeave={() => setMegaMenu(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-4 py-2 rounded-full text-[#3D1F00] font-medium hover:bg-orange-100 hover:text-orange-600 transition-colors"
                  >
                    {link.label}
                    {link.children && <ChevronDown className="h-4 w-4 opacity-60" />}
                  </Link>

                  {/* Mega Menu */}
                  {link.children && megaMenu === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-orange-100 py-2 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex items-center gap-2 px-4 py-2 text-[#3D1F00] hover:bg-orange-50 hover:text-orange-600 transition-colors"
                          onClick={() => setMegaMenu(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Phone - desktop */}
              <a
                href="tel:+56927336644"
                className="hidden xl:flex items-center gap-1 text-sm text-[#3D1F00]/70 hover:text-orange-600 transition-colors"
              >
                <Phone className="h-4 w-4" />
                +56 9 27 33 66 44
              </a>

              {/* Search */}
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-48 sm:w-64 px-4 py-1.5 rounded-full border-2 border-orange-300 bg-white text-[#3D1F00] text-sm outline-none focus:border-orange-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="ml-2 p-2 rounded-full hover:bg-orange-100 transition-colors"
                  >
                    <X className="h-5 w-5 text-[#3D1F00]" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full hover:bg-orange-100 transition-colors text-[#3D1F00]"
                  aria-label="Buscar"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}

              {/* Cart */}
              <button
                onClick={openDrawer}
                className="relative p-2 rounded-full hover:bg-orange-100 transition-colors text-[#3D1F00]"
                aria-label={`Carrito (${count} productos)`}
              >
                <ShoppingBag className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-orange-100 transition-colors text-[#3D1F00]"
                aria-label="Menú"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-orange-100 px-4 py-4">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-[#3D1F00] font-medium hover:bg-orange-50 transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/tienda"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-[#3D1F00] font-medium hover:bg-orange-50 transition-colors"
              >
                Tienda
              </Link>
              <div className="pl-4 flex flex-col gap-1">
                {NAV_LINKS[0].children?.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 rounded-xl text-[#3D1F00]/70 hover:bg-orange-50 transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
              <a
                href="tel:+56927336644"
                className="px-4 py-3 rounded-xl text-[#3D1F00] font-medium hover:bg-orange-50 transition-colors flex items-center gap-2"
              >
                <Phone className="h-4 w-4 text-orange-500" />
                +56 9 27 33 66 44
              </a>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  );
}
