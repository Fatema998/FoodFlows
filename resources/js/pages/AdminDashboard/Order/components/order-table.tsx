import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { destroy, edit, invoice } from '@/routes/admin/order';
import { Link } from '@inertiajs/react';
import DeleteButton from '../../components/DeleteButton';

const OrderTable = ({ orders }) => {
    const [selectedOrders, setSelectedOrders] = useState([]);

    // Toggle a single order selection
    const toggleOrder = (id) => {
        setSelectedOrders((prev) =>
            prev.includes(id)
                ? prev.filter((orderId) => orderId !== id)
                : [...prev, id]
        );
    };

    // Select all orders
    const toggleSelectAll = () => {
        if (selectedOrders.length === orders.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(orders.map((order) => order.id));
        }
    };

    // Check if all selected
    const allSelected = selectedOrders.length === orders.length && orders.length > 0;

    return (
        <Table className="min-w-full text-sm">
            <TableHeader className="border-b border-gray-200 bg-gray-100 dark:border-white/[0.05] dark:bg-gray-800">
                <TableRow>
                    <TableCell className="px-3 py-3 text-center">
                        <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={toggleSelectAll}
                        />
                    </TableCell>
                    <TableCell isHeader className="px-3 py-3 text-left">Invoice</TableCell>
                    <TableCell isHeader className="px-3 py-3 text-left">Name</TableCell>
                    <TableCell isHeader className="px-3 py-3 text-center">Email</TableCell>
                    <TableCell isHeader className="px-3 py-3 text-center">Phone</TableCell>
                    <TableCell isHeader className="px-3 py-3 text-center">Amount</TableCell>
                    <TableCell isHeader className="px-3 py-3 text-center">Status</TableCell>
                    <TableCell isHeader className="px-3 py-3 text-center">Date</TableCell>
                    <TableCell isHeader className="px-3 py-3 text-center">Actions</TableCell>
                </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <TableRow key={order.id} className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <TableCell className="px-3 py-2 text-center">
                                <input
                                    type="checkbox"
                                    checked={selectedOrders.includes(order.id)}
                                    onChange={() => toggleOrder(order.id)}
                                />
                            </TableCell>
                            <TableCell className="px-3 py-2">{order.invoice_id || '-'}</TableCell>
                            <TableCell className="px-3 py-2">{order.shipping?.name || '-'}</TableCell>
                            <TableCell className="px-3 py-2 text-center">{order.shipping?.email || '-'}</TableCell>
                            <TableCell className="px-3 py-2 text-center">{order.shipping?.phone || '-'}</TableCell>
                            <TableCell className="px-3 py-2 text-center">{order.total_amount || '-'}৳</TableCell>
                            <TableCell className="px-3 py-2 text-center">{order?.order_status || '-'}</TableCell>
                            <TableCell className="px-3 py-2 text-center">{order.created_at}</TableCell>
                            <TableCell className="px-4 py-2 text-center">
                                <div className="inline-flex flex-wrap items-center justify-center gap-2">
                                    <Link
                                        href={edit.url(order.id)}
                                        className="inline-block rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-200"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={invoice.url(order?.invoice_id)}
                                        className="inline-block rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-200"
                                    >
                                        View
                                    </Link>
                                    <DeleteButton
                                        id={order.id}
                                        name={order.invoice_id}
                                        destroyRoute={destroy}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <td colSpan={9} className="py-6 text-center text-gray-500 dark:text-gray-400">
                            No orders found.
                        </td>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default OrderTable;
