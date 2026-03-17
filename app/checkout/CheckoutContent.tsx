'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { WooBilling } from '@/types/woocommerce';

interface FormData extends WooBilling {
  notes: string;
}

const INITIAL_FORM: FormData = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address_1: '',
  address_2: '',
  city: '',
  state: 'Valparaíso',
  postcode: '',
  country: 'CL',
  notes: '',
};

export default function CheckoutContent() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!items.length) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black text-[#3D1F00] mb-4">No hay productos en el carrito</h1>
        <Button asChild>
          <Link href="/tienda">Ir a la tienda</Link>
        </Button>
      </div>
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billing: {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            phone: form.phone,
            address_1: form.address_1,
            address_2: form.address_2,
            city: form.city,
            state: form.state,
            postcode: form.postcode,
            country: form.country,
          },
          line_items: items.map((item) => ({
            product_id: item.product.id,
            quantity: item.quantity,
          })),
          customer_note: form.notes,
        }),
      });

      if (!res.ok) throw new Error('Error al crear la orden');

      const order = await res.json();
      clearCart();

      // Redirect to WooCommerce checkout for payment
      if (order.checkout_payment_url) {
        window.location.href = order.checkout_payment_url;
      } else {
        router.push(`/orden-confirmada?id=${order.id}`);
      }
    } catch (err) {
      setError('Hubo un error al procesar tu pedido. Por favor intenta de nuevo.');
      setLoading(false);
    }
  }

  const subtotal = total();
  const freeShipping = subtotal >= 15000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/carrito" className="flex items-center gap-2 text-[#3D1F00]/60 hover:text-orange-500 mb-8 text-sm transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Volver al carrito
      </Link>

      <h1 className="text-3xl font-black text-[#3D1F00] mb-8">Finalizar Compra</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-black text-[#3D1F00] mb-4">Información de contacto</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nombre" name="first_name" value={form.first_name} onChange={handleChange} required />
                <Field label="Apellido" name="last_name" value={form.last_name} onChange={handleChange} required />
                <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                <Field label="Teléfono" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+56 9 XXXX XXXX" />
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-black text-[#3D1F00] mb-4">Dirección de despacho</h2>
              <div className="space-y-4">
                <Field label="Dirección" name="address_1" value={form.address_1} onChange={handleChange} required placeholder="Calle, número, depto" />
                <Field label="Dirección 2 (opcional)" name="address_2" value={form.address_2 ?? ''} onChange={handleChange} placeholder="Villa, población, etc." />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Ciudad" name="city" value={form.city} onChange={handleChange} required />
                  <Field label="Código postal" name="postcode" value={form.postcode} onChange={handleChange} placeholder="Ej: 2340000" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3D1F00] mb-1">Región</label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-orange-100 focus:border-orange-400 px-3 py-2.5 text-[#3D1F00] bg-white outline-none text-sm"
                    required
                  >
                    {REGIONES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-black text-[#3D1F00] mb-4">Notas del pedido (opcional)</h2>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Instrucciones especiales para el despacho..."
                className="w-full rounded-xl border-2 border-orange-100 focus:border-orange-400 px-3 py-2.5 text-[#3D1F00] bg-white outline-none text-sm resize-none"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-600 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24 space-y-4">
              <h2 className="text-lg font-black text-[#3D1F00]">Resumen</h2>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-[#3D1F00]/70 line-clamp-1 flex-1 mr-2">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-[#3D1F00] font-medium shrink-0">
                      {formatPrice(Number(item.product.price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-orange-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-[#3D1F00]/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#3D1F00]/70">
                  <span>Despacho</span>
                  <span className={freeShipping ? 'text-green-600 font-semibold' : ''}>
                    {freeShipping ? 'Gratis' : 'A calcular'}
                  </span>
                </div>
                <div className="flex justify-between font-black text-base text-[#3D1F00] pt-2 border-t border-orange-100">
                  <span>Total</span>
                  <span className="text-orange-500">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  'Confirmar y pagar →'
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-[#3D1F00]/50">
                <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                Pago seguro via WooCommerce
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#3D1F00] mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border-2 border-orange-100 focus:border-orange-400 px-3 py-2.5 text-[#3D1F00] bg-white outline-none text-sm transition-colors"
      />
    </div>
  );
}

const REGIONES = [
  'Arica y Parinacota',
  'Tarapacá',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Valparaíso',
  'Región Metropolitana',
  "O'Higgins",
  'Maule',
  'Ñuble',
  'Biobío',
  'La Araucanía',
  'Los Ríos',
  'Los Lagos',
  'Aysén',
  'Magallanes',
];
