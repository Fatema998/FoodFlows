import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AppLayout from '@/layouts/AppLayout';
import { create } from '@/routes/admin/color';
import type { Color } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';
import TableHeader from '../components/table-header';
import ColorTable from './components/color-table';
import { useToastMessage } from '@/hooks/useToastMessage';

interface Props {
    colors: Color[];
}

const ColorPage: React.FC<Props> = ({ colors }) => {
    useToastMessage()
    return (
        <AppLayout>
            <Head title="Colors" />
            <div className="p-6">
                <PageBreadcrumb pageTitle="All Colors" />
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/[0.05] dark:bg-gray-900">
                    <div className="w-full overflow-x-auto">
                        <TableHeader
                            title="Color"
                            subTitle=""
                            url={create().url}
                        />
                        <ColorTable colors={colors} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ColorPage;
