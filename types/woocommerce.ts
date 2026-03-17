export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: string;
  status: string;
  featured: boolean;
  short_description: string;
  description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  stock_quantity: number | null;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  manage_stock: boolean;
  categories: WooCategory[];
  tags: WooTag[];
  images: WooImage[];
  attributes: WooAttribute[];
  related_ids: number[];
  meta_data: WooMeta[];
  average_rating: string;
  rating_count: number;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  image: WooImage | null;
  count: number;
}

export interface WooImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface WooTag {
  id: number;
  name: string;
  slug: string;
}

export interface WooAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WooMeta {
  id: number;
  key: string;
  value: string;
}

export interface WooOrder {
  id?: number;
  status?: string;
  billing: WooBilling;
  shipping: WooShipping;
  line_items: WooLineItem[];
  payment_method?: string;
  payment_method_title?: string;
}

export interface WooBilling {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface WooShipping {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface WooLineItem {
  product_id: number;
  quantity: number;
  variation_id?: number;
}

export interface WooOrderResponse extends WooOrder {
  id: number;
  order_key: string;
  checkout_payment_url: string;
}

export interface ProductQueryParams {
  page?: number;
  per_page?: number;
  category?: number | string;
  search?: string;
  featured?: boolean;
  orderby?: 'date' | 'price' | 'popularity' | 'rating';
  order?: 'asc' | 'desc';
  min_price?: string;
  max_price?: string;
}
