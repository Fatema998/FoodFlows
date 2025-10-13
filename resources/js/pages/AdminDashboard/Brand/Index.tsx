import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AppLayout from '@/layouts/AppLayout';
import type { Brand } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';
import BrandTable from './brand-table';

interface PaginatedBrands {
    data: Brand[];
    // current_page: number;
    // last_page: number;
    // per_page: number;
    // total: number;
}

interface Props {
    brands: PaginatedBrands;
}

const Index: React.FC<Props> = ({ brands }) => {
    return (
        <AppLayout>
            <Head title="Brands" />
            <div className="p-6">
                <PageBreadcrumb pageTitle="All Brands" />
                <BrandTable brands={brands.data} />
            </div>
        </AppLayout>
    );
};

export default Index;
