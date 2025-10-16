import Badge from '@/components/ui/badge/Badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { edit,destroy } from '@/routes/admin/category';
import { Category } from '@/types';
import { Link } from '@inertiajs/react';
import React from 'react';
import DeleteButton from '../../components/DeleteButton';
import ImageLoader from '../../components/ImageLoader';

interface CategoryTableProps {
    categories: Category[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categories }) => {
    // Recursive function to render category and its children
    const renderCategoryRow = (
        category: Category,
        index: number,
        parentIndex?: string,
        level: number = 0,
    ) => {
        const rowIndex = parentIndex
            ? `${parentIndex}.${index + 1}`
            : `${index + 1}`;

        // Set background or text color based on level
        const rowClasses = `transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800 ${
            level === 0 ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : ''
        }`;

        return (
            <React.Fragment key={category.id}>
                <TableRow className={rowClasses}>
                    {/* Index column */}
                    <TableCell className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                        <div
                            className="flex items-center"
                            style={{ paddingLeft: `${level * 20}px` }}
                        >
                            {level > 0 && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-1 text-green-400"
                                >
                                    <path d="m15 10 5 5-5 5" />
                                    <path d="M4 4v7a4 4 0 0 0 4 4h12" />
                                </svg>
                            )}
                            {rowIndex}
                        </div>
                    </TableCell>

                    {/* Name column */}
                    <TableCell
                        className={`px-4 py-2 text-sm ${level === 0 ? 'text-black dark:text-white' : 'text-gray-800 dark:text-gray-200'} font-medium`}
                    >
                        {category.name}
                    </TableCell>

                    {/* Image column */}
                    <TableCell className="px-4 py-2 text-center">
                        <ImageLoader
                            src={category.image || undefined}
                            alt={category.name}
                            className="mx-auto h-16 w-12 rounded border object-cover"
                            fallback="/images/no-image.png"
                        />
                    </TableCell>

                    {/* Product count */}
                    <TableCell className="px-4 py-2 text-center text-sm font-medium text-gray-800 dark:text-gray-200">
                        {category.items}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="px-4 py-2 text-center">
                        <Badge
                            size="sm"
                            color={category.is_active ? 'success' : 'error'}
                        >
                            {category.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                    </TableCell>

                    {/* Position */}
                    <TableCell className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                        {category.position}
                    </TableCell>

                    {/* Created date */}
                    <TableCell className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                        {category.created_at}
                    </TableCell>

                    {/* Actions */}
                    
                    <TableCell className="px-4 py-2 text-center align-middle">
                        <div className="inline-flex flex-wrap items-center justify-center gap-2">
                            <Link
                            href={edit(category.id).url}
                            className="inline-block rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-200"
                        >
                            Edit
                        </Link>
                        <DeleteButton
                            id={category.id}
                            name={category.name}
                            destroyRoute={destroy}
                        />
                        </div>
                    </TableCell>
                </TableRow>

                {/* Render children recursively with increased level */}
                {category.children &&
                    category.children.length > 0 &&
                    category.children.map((child, childIndex) =>
                        renderCategoryRow(
                            child,
                            childIndex,
                            rowIndex,
                            level + 1,
                        ),
                    )}
            </React.Fragment>
        );
    };

    return (
        <Table className="min-w-full">
            <TableHeader className="border-b border-gray-200 bg-gray-100 dark:border-white/[0.05] dark:bg-gray-800">
                <TableRow>
                    <TableCell
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
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
                        Product Count
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
                {categories.length > 0 ? (
                    categories.map((category, index) =>
                        renderCategoryRow(category, index),
                    )
                ) : (
                    <TableRow>
                        <td
                            colSpan={8}
                            className="py-6 text-center text-gray-500 dark:text-gray-400"
                        >
                            No categories found.
                        </td>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default CategoryTable;
