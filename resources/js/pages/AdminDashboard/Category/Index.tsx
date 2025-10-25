import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AppLayout from '@/layouts/AppLayout';
import { create } from '@/routes/admin/category';
import { Category } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';
import Pagination from '../components/Pagination';
import TableHeader from '../components/table-header';
import CategoryTable from './components/category-table';
import { useToastMessage } from '@/hooks/useToastMessage';

interface PaginatedCategories {
    data: Category[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
}

interface Props {
    categories: PaginatedCategories;
}

const GetAllCategories: React.FC<Props> = ({ categories }) => {
    useToastMessage()
    
    return (
        <AppLayout>
            <Head title="Categories" />
            <div className="p-6">
                <PageBreadcrumb pageTitle="All Categories" />
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/[0.05] dark:bg-gray-900">
                    <div className="max-w-full overflow-x-auto">
                        <TableHeader title="Category" url={create().url} />
                        <CategoryTable categories={categories.data} />
                        <Pagination
                            links={categories.links}
                            meta={categories.meta}
                            pageTitle="All Categories"
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default GetAllCategories;
