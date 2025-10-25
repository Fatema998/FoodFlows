import { toast } from 'react-toastify';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export const useToastMessage = () => {
  const { props } = usePage<{ flash?: { success?: string; error?: string;warning?:string } }>();
console.log(props)
  useEffect(() => {
    if (props.flash?.success) toast.success(props.flash.success);
    if (props.flash?.error) toast.error(props.flash.error);
    if (props.flash?.warning) toast.warning(props.flash.warning);

  }, [props.flash]);
};
