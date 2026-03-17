import type {
  WooProduct,
  WooCategory,
  WooOrder,
  WooOrderResponse,
  ProductQueryParams,
} from '@/types/woocommerce';

const WC_URL = process.env.NEXT_PUBLIC_WC_URL || 'https://eltatapet.cl';
const WC_KEY = process.env.WC_CONSUMER_KEY || '';
const WC_SECRET = process.env.WC_CONSUMER_SECRET || '';

const AUTH_HEADER = `Basic ${Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64')}`;

async function wooFetch<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<T> {
  const url = new URL(`${WC_URL}/wp-json/wc/v3/${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: AUTH_HEADER },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`WooCommerce API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

async function wooPost<T>(endpoint: string, body: unknown): Promise<T> {
  const url = new URL(`${WC_URL}/wp-json/wc/v3/${endpoint}`);

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTH_HEADER,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`WooCommerce API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function getProducts(params: ProductQueryParams = {}): Promise<WooProduct[]> {
  const queryParams: Record<string, string | number | boolean> = {
    per_page: params.per_page ?? 24,
    page: params.page ?? 1,
  };

  if (params.category) queryParams.category = params.category;
  if (params.search) queryParams.search = params.search;
  if (params.featured !== undefined) queryParams.featured = params.featured;
  if (params.orderby) queryParams.orderby = params.orderby;
  if (params.order) queryParams.order = params.order;
  if (params.min_price) queryParams.min_price = params.min_price;
  if (params.max_price) queryParams.max_price = params.max_price;

  return wooFetch<WooProduct[]>('products', queryParams);
}

export async function getProduct(idOrSlug: string | number): Promise<WooProduct> {
  if (typeof idOrSlug === 'number') {
    return wooFetch<WooProduct>(`products/${idOrSlug}`);
  }
  const products = await wooFetch<WooProduct[]>('products', { slug: idOrSlug });
  if (!products.length) throw new Error(`Product not found: ${idOrSlug}`);
  return products[0];
}

export async function getCategories(parentId?: number): Promise<WooCategory[]> {
  const params: Record<string, string | number | boolean> = {
    per_page: 100,
    hide_empty: true,
  };
  if (parentId !== undefined) params.parent = parentId;
  return wooFetch<WooCategory[]>('products/categories', params);
}

export async function getCategoryBySlug(slug: string): Promise<WooCategory | null> {
  const categories = await wooFetch<WooCategory[]>('products/categories', { slug });
  return categories[0] ?? null;
}

export async function createOrder(order: WooOrder): Promise<WooOrderResponse> {
  return wooPost<WooOrderResponse>('orders', order);
}

export async function getRelatedProducts(ids: number[]): Promise<WooProduct[]> {
  if (!ids.length) return [];
  const idsStr = ids.slice(0, 6).join(',');
  return wooFetch<WooProduct[]>('products', { include: idsStr });
}
