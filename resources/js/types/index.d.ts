import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Brand {
    id: number;
    name: string;
    slug: string;
    image?: string | null;
    is_active: boolean;
    position: number;
    created_at: string;
    updated_at: string;
}

// Define TypeScript types
interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id: number | null;
    image?: string;
    description?: string;
    position?: number;
    is_active: boolean;
    items: number;
    products_count: number;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    created_at?: string;
    updated_at?: string;
    children?: Category[]; // Recursive type for subcategories
}

interface Color {
    id: number;
    name: string;
    code: string;
    items: number;
    is_active:boolean;
    position:number;
    created_at: string;
    updated_at: string;
}
