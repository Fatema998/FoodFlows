import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AppLayout from '@/layouts/AppLayout';
import { create } from '@/routes/admin/brand';
import type { Brand } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';
import TableHeader from '../components/table-header';
import BrandTable from './components/brand-table';
import { useToastMessage } from '@/hooks/useToastMessage';

interface PaginatedBrands {
    data: Brand[];
}

interface Props {
    brands: PaginatedBrands;
}

const BrandPage: React.FC<Props> = ({ brands }) => {
    useToastMessage();
    
    return (
        <AppLayout>
            <Head title="Brands" />
            <div className="p-6">
                <PageBreadcrumb pageTitle="All Brands" />
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/[0.05] dark:bg-gray-900">
                    <div className="max-w-full overflow-x-auto">
                        <TableHeader
                            title="Brand"
                            subTitle=""
                            url={create().url}
                        />
                        <BrandTable brands={brands.data} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default BrandPage;
