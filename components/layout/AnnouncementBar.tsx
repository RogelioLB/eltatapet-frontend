'use client';

import { Truck } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-amber-900 text-white text-sm py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <Truck className="h-4 w-4 shrink-0" />
        <span className="font-medium">
          Despacho GRATIS por compras sobre $15.000 CLP
        </span>
        <span className="hidden sm:inline text-amber-200">
          · Envío a todo Chile
        </span>
      </div>
    </div>
  );
}
