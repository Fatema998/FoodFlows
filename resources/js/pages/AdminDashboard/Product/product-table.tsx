import Badge from '@/components/ui/badge/Badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { destroy } from '@/routes/admin/product';
import { Product } from '@/types/product';
import { Link } from '@inertiajs/react';
import React from 'react';
import DeleteButton from '../components/DeleteButton';
import ImageLoader from '../components/ImageLoader';

interface ProductTableProps {
    products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
    console.log(products)
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
                        className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Code
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
                        Total Stock
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        Purchase Price
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase dark:text-gray-400"
                    >
                        sell Price
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
                                <div className=" flex  items-center gap-1">
                                    <ImageLoader
                                        src={
                                            product.main_thumbnail
                                                ? product.main_thumbnail
                                                : '/images/no-image.png'
                                        }
                                        alt={product.title}
                                        className=" h-18 w-16 rounded border object-cover"
                                        fallback="/images/no-image.png"
                                    />{' '}
                                    <p>{product.title.slice(0, 20)}...</p>
                                </div>
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">
                                {product?.product_code || '-'}
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
                                {product.total_stock}
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">
                                ${product.purchase_price}
                            </TableCell>

                            <TableCell className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">
                                ${product.sell_price}
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

                            <TableCell className="px-4 py-2 text-center align-middle">
                                <div className="inline-flex flex-wrap items-center justify-center gap-2">
                                    <Link
                                        href={`/dashboard/products/edit/${product.id}`}
                                        className="inline-block rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-200"
                                    >
                                        Edit
                                    </Link>
                                    <DeleteButton
                                        id={product.id}
                                        name={product.title}
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
                            No products found.
                        </td>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default ProductTable;


// import React, { useState } from 'react';
// import Badge from '@/components/ui/badge/Badge';
// import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
// import { Link } from '@inertiajs/react';
// import DeleteButton from '../components/DeleteButton';
// import ImageLoader from '../components/ImageLoader';
// import { Product } from '@/types/product';
// import { destroy } from '@/routes/admin/product';

// interface ProductTableProps {
//     products: Product[];
// }

// const allFields = [
//     'title',
//     'product_code',
//     'brand',
//     'category',
//     'subcategory',
//     'quantity',
//     'sell_price',
//     'discount',
//     'is_flash_deal',
//     'is_active',
//     'created_at',
// ];

// const fieldLabels: Record<string, string> = {
//     title: 'Product',
//     product_code: 'Code',
//     brand: 'Brand',
//     category: 'Category',
//     subcategory: 'Sub Category',
//     quantity: 'Quantity',
//     sell_price: 'Price',
//     discount: 'Discount',
//     is_flash_deal: 'Flash Deal',
//     is_active: 'Status',
//     created_at: 'Date',
// };

// const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
//     // Default selected fields
//     const [selectedFields, setSelectedFields] = useState<string[]>(['title', 'product_code', 'brand', 'price']);

//     const toggleField = (field: string) => {
//         setSelectedFields((prev) =>
//             prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
//         );
//     };

//     return (
//         <div className="">
//             {/* Field Selector Dropdown */}
//             <div className=" top-0 right-0 flex items-center gap-2">
//                 <label className="font-medium">Select Fields:</label>
//                 <div className="relative">
//                     <button className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
//                         Fields
//                     </button>
//                     <div className="absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-lg dark:bg-gray-800 z-50">
//                         {allFields.map((field) => (
//                             <label key={field} className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedFields.includes(field)}
//                                     onChange={() => toggleField(field)}
//                                 />
//                                 <span className="text-sm">{fieldLabels[field]}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             <Table className="min-w-full mt-10 text-sm">
//                 <TableHeader className="border-b border-gray-200 bg-gray-100 dark:border-white/[0.05] dark:bg-gray-800">
//                     <TableRow>
//                         <TableCell isHeader className="px-3 py-3 text-center text-xs font-semibold uppercase">#</TableCell>
//                         {selectedFields.map((field) => (
//                             <TableCell
//                                 key={field}
//                                 isHeader
//                                 className="px-3 py-3 text-center text-xs font-semibold uppercase"
//                             >
//                                 {fieldLabels[field] || field}
//                             </TableCell>
//                         ))}
//                         <TableCell isHeader className="px-3 py-3 text-center text-xs font-semibold uppercase">Actions</TableCell>
//                     </TableRow>
//                 </TableHeader>

//                 <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
//                     {products.length > 0 ? (
//                         products.map((product, index) => (
//                             <TableRow key={product.id} className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800">
//                                 <TableCell className="px-3 py-2 text-center">{index + 1}</TableCell>
//                                 {selectedFields.map((field) => {
//                                     switch (field) {
//                                         case 'title':
//                                             return (
//                                                 <TableCell key={field} className="px-3 py-2 text-left flex items-center gap-2">
//                                                     <ImageLoader
//                                                         src={product.main_thumbnail || '/images/no-image.png'}
//                                                         alt={product.title}
//                                                         className="h-12 w-12 rounded border object-cover"
//                                                     />
//                                                     <span>{product.title}</span>
//                                                 </TableCell>
//                                             );
//                                         case 'product_code':
//                                             return <TableCell key={field} className="px-3 py-2 text-center">{product.product_code || '-'}</TableCell>;
//                                         case 'brand':
//                                             return <TableCell key={field} className="px-3 py-2 text-center">{product.brand?.name || '-'}</TableCell>;
//                                         case 'category':
//                                             return <TableCell key={field} className="px-3 py-2 text-center">{product.category?.name || '-'}</TableCell>;
//                                         case 'subcategory':
//                                             return <TableCell key={field} className="px-3 py-2 text-center">{product.subcategory?.name || '-'}</TableCell>;
//                                         case 'quantity':
//                                             return <TableCell key={field} className="px-3 py-2 text-center">{product.quantity}</TableCell>;
//                                         case 'sell_price':
//                                             return <TableCell key={field} className="px-3 py-2 text-center">${product.sell_price}</TableCell>;
//                                         case 'discount':
//                                             return <TableCell key={field} className="px-3 py-2 text-center">{product.discount > 0 ? `${product.discount}%` : '-'}</TableCell>;
//                                         case 'is_flash_deal':
//                                             return <TableCell key={field} className="px-3 py-2 text-center">
//                                                 {product.is_flash_deal ? <Badge size="sm" color="warning">Active</Badge> : <Badge size="sm" color="light">None</Badge>}
//                                             </TableCell>;
//                                         case 'is_active':
//                                             return <TableCell key={field} className="px-3 py-2 text-center">
//                                                 <Badge size="sm" color={product.is_active ? 'success' : 'error'}>
//                                                     {product.is_active ? 'Active' : 'Inactive'}
//                                                 </Badge>
//                                             </TableCell>;
//                                         case 'created_at':
//                                             return <TableCell key={field} className="px-3 py-2 text-center">{product.created_at}</TableCell>;
//                                         default:
//                                             return <TableCell key={field} className="px-3 py-2 text-center">-</TableCell>;
//                                     }
//                                 })}
//                                 <TableCell className="px-3 py-2 text-center">
//                                     <div className="inline-flex gap-2">
//                                         <Link href={`/dashboard/products/edit/${product.id}`} className="bg-blue-100 px-3 py-1 text-xs text-blue-600 rounded hover:bg-blue-200">Edit</Link>
//                                         <DeleteButton id={product.id} name={product.title} destroyRoute={destroy} />
//                                     </div>
//                                 </TableCell>
//                             </TableRow>
//                         ))
//                     ) : (
//                         <TableRow>
//                             <td colSpan={selectedFields.length + 2} className="py-6 text-center text-gray-500">No products found.</td>
//                         </TableRow>
//                     )}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// };

// export default ProductTable;
