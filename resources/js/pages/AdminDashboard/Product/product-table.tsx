import Badge from '@/components/ui/badge/Badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Product } from '@/types/product'; // ✅ Reuse here
import { Link } from '@inertiajs/react';
import React from 'react';
import ImageLoader from '../components/ImageLoader';

interface ProductTableProps {
    products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
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
                        Product
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Image
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Brand
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Category
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Sub Category
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Quantity
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Price
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Discount
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Flash Deal
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Status
                    </TableCell>
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
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <TableRow
                            key={product.id}
                            className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            <TableCell className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">
                                {index + 1}
                            </TableCell>

                            <TableCell className="px-3 py-2 font-medium whitespace-nowrap text-gray-800 dark:text-gray-200">
                                {product.title.slice(0, 20)}...
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center">
                                <ImageLoader
                                    src={
                                        product.variants &&
                                        product.variants[0]?.image
                                            ? product.variants[0].image
                                            : '/images/no-image.png'
                                    }
                                    alt={product.title}
                                    className="mx-auto h-12 w-8 rounded border object-cover"
                                    fallback="/images/no-image.png"
                                />
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">
                                {product.brand?.name || '-'}
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">
                                {product.category?.name || '-'}
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">
                                {product.subcategory?.name || '-'}
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">
                                {product.quantity}
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">
                                ${product.sold_price}
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">
                                {product.discount > 0
                                    ? `${product.discount}%`
                                    : '-'}
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center">
                                {product.is_flash_deal ? (
                                    new Date(product.flash_deal_end || '') >
                                    new Date() ? (
                                        <Badge size="sm" color="warning">
                                            Active
                                        </Badge>
                                    ) : (
                                        <Badge size="sm" color="error">
                                            Expired
                                        </Badge>
                                    )
                                ) : (
                                    <Badge size="sm" color="light">
                                        None
                                    </Badge>
                                )}
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center">
                                <Badge
                                    size="sm"
                                    color={
                                        product.is_active ? 'success' : 'error'
                                    }
                                >
                                    {product.is_active ? 'Active' : 'Inactive'}
                                </Badge>
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center whitespace-nowrap text-gray-700 dark:text-gray-300">
                                {product.created_at}
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center whitespace-nowrap">
                                <Link
                                    href={`/products/${product.id}/edit`}
                                    className="inline-block rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-200"
                                >
                                    Edit
                                </Link>
                                <button className="ml-2 inline-block rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-200">
                                    Delete
                                </button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={12}
                            className="py-6 text-center text-gray-500 dark:text-gray-400"
                        >
                            No products found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default ProductTable;
