import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import AppLayout from '@/layouts/AppLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import ColorForm from './components/color-form'

const CreateColorPage = () => {
  return (
    <AppLayout>
      <Head title="Create Color" />
            <div className="p-6">
                <PageBreadcrumb pageTitle="Create Color" />
                <div className="overflow-hidden rounded-xl  p-6 border border-gray-200 bg-white shadow-sm dark:border-white/[0.05] dark:bg-gray-900">
                    <ColorForm/>
                </div>
            </div>
    </AppLayout>
  )
}

export default CreateColorPage
