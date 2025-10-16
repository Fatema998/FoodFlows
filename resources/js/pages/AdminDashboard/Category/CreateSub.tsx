import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { CategoryFormProps } from './category-type';
import CategoryForm from './components/category-form';

const CreateSubCategoryPage: React.FC<CategoryFormProps> = ({ categories }) => {
  const options =
    categories?.data?.map((item) => ({
      value: String(item.id),
      label: item.name,
    })) ?? [];

  return (
    <AppLayout>
      <Head title="Create Sub Category" />
      <div className="p-6">
        <PageBreadcrumb pageTitle="Create Sub Category" />
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/[0.05] dark:bg-gray-900">
          <CategoryForm  options={options} isShowParentField={true}/>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateSubCategoryPage;
