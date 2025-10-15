import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AppLayout from '@/layouts/AppLayout';
import { Brand, Category } from '@/types';
import { PaginatedResponse, Product } from '@/types/product';
import { Head } from '@inertiajs/react';
import React from 'react';
import ProductPagination from '../components/ProductPagination';
import ProductTable from './product-table';
import ProductFilter from './ProductFilter';
import TableHeader from '../components/table-header';

interface BrandsData {
    data: Brand[];
}
interface CategoryData {
    data: Category[];
}

interface Props {
    products: PaginatedResponse<Product>;
    brands: BrandsData;
    categories: CategoryData;
    filters: Record<string, any>;
}

const GetAllProducts: React.FC<Props> = ({
    products,
    brands,
    categories,
    filters,
}) => {
    return (
        <AppLayout>
            <Head title="Products" />
            <div className="space-y-6">
                <PageBreadcrumb pageTitle="All Products" />

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/[0.05] dark:bg-gray-900">
                    <div className="w-full overflow-x-auto">

                        {/* Product table header */}
                        <TableHeader
                            title="Product"
                            subTitle=""
                            url={'#'}
                            exportLink="#"
                        />

                        {/* Product Filter */}
                        <ProductFilter
                            filters={filters}
                            brands={brands}
                            categories={categories}
                        />
                        {/* Product Table */}
                        <ProductTable products={products.data} />

                        {/* Pagination */}
                        <ProductPagination
                            filters={filters}
                            links={products.links}
                            meta={products.meta}
                            pageTitle="All Products"
                        />

                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default GetAllProducts;
