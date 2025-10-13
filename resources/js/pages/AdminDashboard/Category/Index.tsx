import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AppLayout from '@/layouts/AppLayout';
import { Category } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';
import Pagination from '../components/Pagination';
import CategoryTable from './category-table';

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
    return (
        <AppLayout>
            <Head title="Categories" />
            <div className="p-6">
                <PageBreadcrumb pageTitle="All Categories" />
                <CategoryTable categories={categories.data} />
                <Pagination links={categories.links} meta={categories.meta}  pageTitle="All Categories"/>
            </div>
        </AppLayout>
    );
};

export default GetAllCategories;
