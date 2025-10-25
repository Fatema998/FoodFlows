import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
import BrandForm from './components/brand-form';
import { BrandFormProps } from './brand-type';

const EditBrandPage: React.FC<BrandFormProps> = ({ brand }) => {
    return (
        <AppLayout>
            <Head title="Edit Brand" />
            <div className="p-6">
                <PageBreadcrumb pageTitle="Edit Brand" />
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/[0.05] dark:bg-gray-900">
                    <BrandForm brand={brand} />
                </div>
            </div>
        </AppLayout>
    );
};

export default EditBrandPage;
