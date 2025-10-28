export interface Color {
  id: number;
  name: string;
  code: string;
}

export interface Variant {
  id: number;
  color: Color;
  image: string;
}

export interface Size {
  id: number;
  name: string;
}

export interface BrandCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  main_thumbnail:string;
  price: number;
  discount: number;
  sale_price: number;
  quantity: number;
  is_trending: boolean;
  is_limited: boolean;
  is_active: boolean;
  is_todays_pick: boolean;
  is_new_arrival: boolean;
  is_featured: boolean;
  is_flash_deal: boolean;
  flash_deal_start: string | null;
  flash_deal_end: string | null;
  sizes: Size[];
  variants?: Variant[];
  brand?: BrandCategory | null;
  category?: BrandCategory | null;
  subcategory?: BrandCategory | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
}
