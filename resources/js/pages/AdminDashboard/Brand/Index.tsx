import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AppLayout from '@/layouts/AppLayout';
import type { Brand } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';
import BrandTable from './components/brand-table';
import TableHeader from '../components/table-header';

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
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/[0.05] dark:bg-gray-900">
                    <div className="max-w-full overflow-x-auto">
                         <TableHeader
                            title="Brand"
                            subTitle=""
                            // url={create().url}
                        />
                        <BrandTable brands={brands.data} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
