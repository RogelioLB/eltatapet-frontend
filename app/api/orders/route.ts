import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/woocommerce';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const order = await createOrder({
      billing: body.billing,
      shipping: body.billing, // Use billing as shipping by default
      line_items: body.line_items,
      payment_method: 'webpay',
      payment_method_title: 'WebPay / Tarjeta de crédito',
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Error al crear la orden' },
      { status: 500 }
    );
  }
}
