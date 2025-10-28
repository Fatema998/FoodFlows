import AppLayout from '@/layouts/AppLayout';
import { index } from '@/routes/admin/order';
import { Head, Link } from '@inertiajs/react';
import { useRef } from 'react';

export default function Invoice({ order }) {
    const invoiceRef = useRef();

    const printInvoice = () => {
        const printContent = invoiceRef.current.innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); // reload to restore React
    };

    const subTotal = order.orderdetails?.reduce(
        (sum: number, item: any) => sum + item.sale_price * item.qty,
        0,
    );
    const grandTotal =
        order?.total_amount + order?.shipping_charge - order?.discount || 0;

    return (
        <AppLayout>
            <Head title="Invoice" />
            <div className="mx-auto max-w-5xl p-6">
                <div className="mb-4 flex justify-between">
                    <Link
                        href={index.url()}
                        className="no-print font-semibold text-green-700"
                    >
                        &larr; Back To Orders
                    </Link>
                    <button
                        onClick={printInvoice}
                        className="no-print rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                    >
                        Print Invoice
                    </button>
                </div>

                <div
                    ref={invoiceRef}
                    className="rounded bg-white p-6 shadow-lg"
                >
                    {/* Invoice Header */}
                    <div className="mb-4 flex justify-between">
                        <div className="w-2/5">
                            <img
                                src="#"
                                alt="Logo"
                                className="mt-6 mb-4 w-48"
                            />
                            <p className="text-sm text-gray-800">
                                <strong>Payment Method:</strong>{' '}
                                <span className="uppercase">
                                    {order.payment?.payment_method || ''}
                                </span>
                            </p>
                        </div>
                        <div className="w-3/5 text-right">
                            <div className="inline-block skew-x-[38deg] transform bg-green-600 px-10 py-5">
                                <p className="-skew-x-[38deg] transform text-3xl font-bold text-white uppercase">
                                    Invoice
                                </p>
                            </div>
                            <div className="mt-2 inline-block w-3/4 skew-x-[36deg] transform bg-white px-8 py-3 text-right">
                                <p className="-skew-x-[36deg] transform font-bold text-gray-800">
                                    Invoice ID:{' '}
                                    <strong>#{order.invoice_id}</strong>
                                </p>
                                <p className="-skew-x-[36deg] transform font-bold text-gray-800">
                                    Invoice Date:{' '}
                                    <strong>
                                        {new Date(
                                            order.created_at,
                                        ).toLocaleDateString()}
                                    </strong>
                                </p>
                            </div>
                            <div className="mt-5 text-right">
                                <p className="font-semibold text-gray-800">
                                    Invoice To:
                                </p>
                                <p className="text-gray-800">
                                    {order.shipping?.name || ''}
                                </p>
                                <p className="text-gray-800">
                                    {order.shipping?.phone || ''}
                                </p>
                                <p className="text-gray-800">
                                    {order.shipping?.address || ''}
                                </p>
                                <p className="text-gray-800">
                                    {order.shipping?.area || ''}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Table */}
                    <table className="mt-6 w-full border border-gray-200 text-sm">
                        <thead className="bg-green-600 text-white">
                            <tr>
                                <th className="border px-3 py-2">SL</th>
                                <th className="border px-3 py-2">Product</th>
                                <th className="border px-3 py-2">Price</th>
                                <th className="border px-3 py-2">Qty</th>
                                <th className="border px-3 py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orderdetails?.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="border px-3 py-2">
                                        {index + 1}
                                    </td>
                                    <td className="border px-3 py-2">
                                        <span className="font-semibold">
                                            {' '}
                                            {item.product_name}
                                        </span>
                                        <br />
                                        {item.size && (
                                            <small>Size: {item.size}</small>
                                        )}{' '}
                                        {item.color && (
                                            <small>Color: {item.color}</small>
                                        )}
                                    </td>
                                    <td className="border px-3 py-2">
                                        ৳{item.sale_price}
                                    </td>
                                    <td className="border px-3 py-2">
                                        {item.qty}
                                    </td>
                                    <td className="border px-3 py-2">
                                        ৳{item.sale_price * item.qty}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Summary */}
                    <div className="mt-6 flex justify-end">
                        <table className="w-72 border border-gray-200 text-sm">
                            <tbody className="bg-gray-100">
                                <tr>
                                    <td className="border px-3 py-2 font-semibold">
                                        SubTotal
                                    </td>
                                    <td className="border px-3 py-2 font-semibold">
                                        ৳{subTotal}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border px-3 py-2 font-semibold">
                                        Shipping(+)
                                    </td>
                                    <td className="border px-3 py-2 font-semibold">
                                        ৳{order.shipping_charge}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border px-3 py-2 font-semibold">
                                        Discount(-)
                                    </td>
                                    <td className="border px-3 py-2 font-semibold">
                                        ৳{order.discount}
                                    </td>
                                </tr>
                                <tr className="bg-green-600 text-white">
                                    <td className="border px-3 py-2 font-bold">
                                        Final Total
                                    </td>
                                    <td className="border px-3 py-2 font-bold">
                                        ৳{grandTotal}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 border-t border-gray-300 pt-4 text-center">
                        <h5 className="italic">
                            <a href="#">Terms & Conditions</a>
                        </h5>
                        <p className="mt-2 text-sm italic">
                            * This is a computer generated invoice, does not
                            require any signature.
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
