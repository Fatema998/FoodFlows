import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import AppLayout from '@/layouts/AppLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import OrderForm from './components/order-form'

const CreateOrderPage = ({ products, shippingCharge }) => {
    console.log(products)
    console.log(shippingCharge)
    return (
        <AppLayout>
            <Head title='Create Order'/>
            <div className="p-6">
                <PageBreadcrumb pageTitle="Create Order" />
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/[0.05] dark:bg-gray-900">
                    <OrderForm products={products.data} shippingCharge={shippingCharge}/>
                </div>
            </div>
        </AppLayout>
    )
}

export default CreateOrderPage