import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
import CategoryForm from './components/category-form';

const CreateCategoriesPage = () => {
  return (
    <AppLayout>
      <Head title="Create Category" />
      <div className="p-6">
        <PageBreadcrumb pageTitle="Create Category" />
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/[0.05] dark:bg-gray-900">
          <CategoryForm options={[]} />
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateCategoriesPage;
