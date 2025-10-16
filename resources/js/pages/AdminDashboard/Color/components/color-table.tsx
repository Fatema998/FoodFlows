import Badge from '@/components/ui/badge/Badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { destroy, edit } from '@/routes/admin/color';
import { Color } from '@/types';
import { Link } from '@inertiajs/react';
import React from 'react';
import DeleteButton from '../../components/DeleteButton';

interface ColorTableProps {
    colors: Color[];
}

const ColorTable: React.FC<ColorTableProps> = ({ colors }) => {
    return (
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
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                        isHeader
                    >
                        Code
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
                        Position
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
                {colors.length > 0 ? (
                    colors.map((color, index) => (
                        <TableRow
                            key={color.id}
                            className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            <TableCell className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                {index + 1}
                            </TableCell>
                            <TableCell className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                                {color.name}
                            </TableCell>

                            <TableCell className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                                <span
                                    className="rounded-lg px-2 py-1"
                                    style={{
                                        backgroundColor: color.code,
                                    }}
                                >
                                    {' '}
                                    {color.code}
                                </span>
                            </TableCell>

                            <TableCell className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                {color.products_count}
                            </TableCell>
                            <TableCell className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                {color.position}
                            </TableCell>
                            <TableCell className="px-4 py-2 text-center">
                                <Badge
                                    size="sm"
                                    color={
                                        color.is_active ? 'success' : 'error'
                                    }
                                >
                                    {color.is_active ? 'Active' : 'Inactive'}
                                </Badge>
                            </TableCell>

                            <TableCell className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                {new Date(
                                    color.created_at,
                                ).toLocaleDateString()}
                            </TableCell>

                            <TableCell className="px-4 py-2 text-center align-middle">
                                <div className="inline-flex flex-wrap items-center justify-center gap-2">
                                    <Link
                                        href={edit(color.id).url}
                                        className="inline-block rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-200"
                                    >
                                        Edit
                                    </Link>
                                    <DeleteButton
                                        id={color.id}
                                        name={color.name}
                                        destroyRoute={destroy}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <td
                            colSpan={6}
                            className="py-6 text-center text-gray-500 dark:text-gray-400"
                        >
                            No Colors found.
                        </td>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default ColorTable;
