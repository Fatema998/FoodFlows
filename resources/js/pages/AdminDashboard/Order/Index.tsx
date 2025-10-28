import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { useToastMessage } from '@/hooks/useToastMessage';
import AppLayout from '@/layouts/AppLayout';
import { create } from '@/routes/admin/order';
import type { Color } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';
import TableHeader from '../components/table-header';
import OrderTable from './components/order-table';
import Pagination from '../components/Pagination';

interface Props {
    colors: Color[];
}

const ColorPage: React.FC<Props> = ({ orders }) => {
    useToastMessage();
    console.log(orders);
    return (
        <AppLayout>
            <Head title="All Orders" />
            <div className="p-6">
                <PageBreadcrumb pageTitle="All Orders" />
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/[0.05] dark:bg-gray-900">
                    <div className="w-full overflow-x-auto">
                        <TableHeader
                            title="Orders"
                            subTitle=""
                            url={create().url}
                        />
                        <OrderTable orders={orders.data} />
                        <Pagination
                            links={orders.links}
                            meta={orders?.meta}
                            pageTitle="All Orders"
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ColorPage;
