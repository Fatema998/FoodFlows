import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import AppLayout from '@/layouts/AppLayout'
import { Head } from '@inertiajs/react'
import ColorForm from './components/color-form'


interface ColorFormProps {
    color?: {
        id: number;
        name: string;
        code: string;
        position?: number;
        is_active: boolean;
    };
}

const EditColorPage:React.FC<ColorFormProps> = ({color}) => {
  return (
    <AppLayout>
      <Head title="Edit Color" />
            <div className="p-6">
                <PageBreadcrumb pageTitle="Edit Color" />
                <div className="overflow-hidden rounded-xl  p-6 border border-gray-200 bg-white shadow-sm dark:border-white/[0.05] dark:bg-gray-900">
                    <ColorForm color={color}/>
                </div>
            </div>
    </AppLayout>
  )
}

export default EditColorPage
