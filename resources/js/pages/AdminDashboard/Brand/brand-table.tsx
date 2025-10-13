import { Brand } from '@/types';
import { Link } from '@inertiajs/react';
import React from 'react';
import Badge from '@/components/ui/badge/Badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import ImageLoader from '../components/ImageLoader';

interface BrandTableProps {
    brands: Brand[];
}

const BrandTable: React.FC<BrandTableProps> = ({ brands }) => {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/[0.05] dark:bg-gray-900">
            <div className="max-w-full overflow-x-auto">
                <Table className="min-w-full">
                    <TableHeader className="border-b border-gray-200 bg-gray-100 dark:border-white/[0.05] dark:bg-gray-800">
                        <TableRow>
                            <TableCell
                                className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                                isHeader
                            >
                                #
                            </TableCell>
                            <TableCell
                                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                                isHeader
                            >
                                Name
                            </TableCell>
                            <TableCell
                                className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                                isHeader
                            >
                                Image
                            </TableCell>
                            <TableCell
                                className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                                isHeader
                            >
                                Status
                            </TableCell>
                            <TableCell
                                className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                                isHeader
                            >
                                Position
                            </TableCell>

                            <TableCell
                                className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                                isHeader
                            >
                                Date
                            </TableCell>
                            <TableCell
                                className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                                isHeader
                            >
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {brands.length > 0 ? (
                            brands.map((brand, index) => (
                                <TableRow
                                    key={brand.id}
                                    className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    <TableCell className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                                        {brand.name}
                                    </TableCell>
                                    <TableCell className="px-4 py-2 text-center">
                                        <ImageLoader
                                            src={
                                                brand.image
                                                    ? brand.image
                                                    : undefined
                                            }
                                            alt={brand.name}
                                            className="mx-auto h-12 w-24 rounded border object-cover"
                                            fallback="/images/no-image.png"
                                        />
                                    </TableCell>
                                    <TableCell className="px-4 py-2 text-center">
                                        <Badge
                                            size="sm"
                                            color={
                                                brand.is_active
                                                    ? 'success'
                                                    : 'error'
                                            }
                                        >
                                            {brand.is_active
                                                ? 'Active'
                                                : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                        {brand.position}
                                    </TableCell>
                                    <TableCell className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                        {brand.created_at}
                                    </TableCell>
                                    <TableCell className="space-x-2 px-4 py-2 text-center">
                                        <Link className="inline-block rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-200">
                                            Edit
                                        </Link>
                                        <button className="inline-block rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-200">
                                            Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="py-6 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No brands found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default BrandTable;
