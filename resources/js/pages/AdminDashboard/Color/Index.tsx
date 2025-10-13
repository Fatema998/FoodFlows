import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AppLayout from '@/layouts/AppLayout';
import type { Color } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';
import ColorTable from './color-table';

interface PaginatedBrands {
    data: Color[];
 
}

interface Props {
    colors: PaginatedBrands;
}

const Index: React.FC<Props> = ({ colors }) => {
    return (
        <AppLayout>
            <Head title="Colors" />
            <div className="p-6">
                <PageBreadcrumb pageTitle="All Colors" />
                <ColorTable colors={colors.data} />
            </div>
        </AppLayout>
    );
};

export default Index;
