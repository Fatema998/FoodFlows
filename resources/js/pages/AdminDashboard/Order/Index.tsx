import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { useToastMessage } from '@/hooks/useToastMessage';
import TableHeader from '../components/table-header';
import Pagination from '../components/Pagination';
import OrderBulkActions from './components/OrderBulkActions';
import OrderFilter from './components/OrderFilter';
import StatusModal from './components/StatusModal';
import { create } from '@/routes/admin/order';
import { Order } from './order-types';
import OrderTable from './components/order-table';

interface OrdersPageProps {
    orders: {
        data: Order[];
        links: any;
        meta?: any;
    };
}

const OrdersPage: React.FC<OrdersPageProps> = ({ orders }) => {
    useToastMessage();

    const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false);

    const filteredOrders = orders.data.filter(order => {
        const matchesSearch = order.invoice_id?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter ? order.order_status === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    const openStatusModal = () => setIsStatusModalOpen(true);
    const closeStatusModal = () => setIsStatusModalOpen(false);

    const handleStatusChange = (newStatus: string) => {
        console.log('Change status for orders:', selectedOrders, 'to:', newStatus);

        closeStatusModal();
    };

    return (
        <AppLayout>
            <Head title="All Orders" />
            <div className="p-6">
                <PageBreadcrumb pageTitle="All Orders" />

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/[0.05] dark:bg-gray-900">
                    <div className="w-full overflow-x-auto">
                        <TableHeader title="Orders" subTitle="" url={create().url} />

                        <OrderFilter onSearch={setSearchTerm} onStatusChange={setStatusFilter} />

                        <OrderBulkActions
                            selectedOrders={selectedOrders}
                            onDelete={() => console.log('Delete:', selectedOrders)}
                            onPrint={() => console.log('Print:', selectedOrders)}
                            onChangeStatus={openStatusModal}
                        />

                        <OrderTable
                            orders={filteredOrders}
                            selectedOrders={selectedOrders}
                            setSelectedOrders={setSelectedOrders}
                        />

                        <Pagination links={orders.links} meta={orders.meta} pageTitle="All Orders" />
                    </div>
                </div>
            </div>

            {isStatusModalOpen && (
                <StatusModal
                    isOpen={isStatusModalOpen}
                    onClose={closeStatusModal}
                    onSubmit={handleStatusChange}
                />
            )}
        </AppLayout>
    );
};

export default OrdersPage;
