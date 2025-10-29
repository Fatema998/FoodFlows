import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
import ProductForm from './components/product-form';

const EditProductPage = ({
    product,
    brands,
    categories,
    productTypes,
    sizes,
    colors,
    sizeGuides,
}) => {
    // console.log(product,brands, categories, productTypes, sizes, colors);
console.log(product,'product')


    const brandOptions =
        brands?.data?.map((item) => ({
            value: String(item.id),
            label: item.name,
        })) ?? [];

    const categoryOptions =
        categories?.data?.map((item) => ({
            value: String(item.id),
            label: item.name,
            children: item.children.map((subitem) => ({
                value: String(subitem.id),
                label: subitem.name,
            })) ?? [],
        })) ?? [];

    const productTypeOptions =
        productTypes?.map((item) => ({
            value: String(item.id),
            label: item.name,
        })) ?? [];

    const sizeOptions =
        sizes?.map((item) => ({
            value: String(item.id),
            label: item.name,
        })) ?? [];

    const colorOptions =
        colors?.map((item) => ({
            value: String(item.id),
            label: item.name,
        })) ?? [];
    
    const sizeGuidesOptions = sizeGuides.map((item)=>({
        value:String(item.id),
        label:`Product Type:${item.product_type}, Title:${item.title}. Gender:${item.gender}`
    }))

    console.log(sizeGuidesOptions,'sizeGuidesOptions')

    return (
        <AppLayout>
            <Head title="Edit Product" />
            <div className="p-6">
                <PageBreadcrumb pageTitle="Edit Product" />
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/[0.05] dark:bg-gray-900">
                    <ProductForm
                        product={product}
                        brandOptions={brandOptions}
                        categoryOptions={categoryOptions}
                        productTypeOptions={productTypeOptions}
                        sizeOptions={sizeOptions}
                        colorOptions={colorOptions}
                        sizeGuidesOptions={sizeGuidesOptions}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default EditProductPage;
