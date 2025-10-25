export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  position?: number;
  parent_id?: number | null;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  is_active?: boolean;
}

export interface CategoryFormProps {
  category?: Category;
  categories?: { data: Category[] };
  options?: { value: string; label: string }[];
  isShowParentField?:boolean
}
