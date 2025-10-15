
 export interface BrandFormProps {
  brand?: {
    id: number;
    name: string;
    slug: string;
    image?: string;
    position?: number;
    is_active: boolean;
  };
}
