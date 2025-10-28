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
    console.log(orders);
    return (
        <Table className="min-w-full text-sm">
            <TableHeader className="border-b border-gray-200 bg-gray-100 dark:border-white/[0.05] dark:bg-gray-800">
                <TableRow>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        #
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Invoice
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Name
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Email
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Phone
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Amount
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Status
                    </TableCell>{' '}
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Date
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Actions
                    </TableCell>
                </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <TableRow
                            key={order.id}
                            className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            <TableCell className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">
                                {index + 1}
                            </TableCell>

                            <TableCell className="px-3 py-2 text-gray-700 dark:text-gray-300">
                                {order.invoice_id || '-'}
                            </TableCell>

                            <TableCell className="px-3 py-2 text-gray-700 dark:text-gray-300">
                                {order.shipping?.name || '-'}
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">
                                {order.shipping?.email || '-'}
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">
                                {order.shipping?.phone || '-'}
                            </TableCell>
                            <TableCell className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">
                                {order.total_amount || '-'}$
                            </TableCell>
                            <TableCell className="px-3 py-2 text-center">
                                {order.status?.name || '-'}
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center whitespace-nowrap text-gray-700 dark:text-gray-300">
                                {order.created_at}
                            </TableCell>

                            <TableCell className="px-4 py-2 text-center align-middle">
                                <div className="inline-flex flex-wrap items-center justify-center gap-2">
                                    <Link
                                        href={edit.url(order.id)}
                                        className="inline-block rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-200"
                                    >
                                        Edit
                                    </Link>

                                    <Link
                                        href={invoice.url(order?.invoice_id)}
                                        className="inline-block rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-200"
                                    >
                                        view
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
                        <td
                            colSpan={12}
                            className="py-6 text-center text-gray-500 dark:text-gray-400"
                        >
                            No orders found.
                        </td>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default OrderTable;
