import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import AppLayout from '@/layouts/AppLayout'
import { Head } from '@inertiajs/react'
import BrandForm from './components/brand-form'

const CreateBrandPage = () => {
  return (
    <AppLayout>
      <Head title="Create Brand" />
            <div className="p-6">
                <PageBreadcrumb pageTitle="Create Brand" />
                <div className="overflow-hidden rounded-xl  p-6 border border-gray-200 bg-white shadow-sm dark:border-white/[0.05] dark:bg-gray-900">
                <BrandForm/>
                </div>
            </div>
    </AppLayout>
  )
}

export default CreateBrandPage
