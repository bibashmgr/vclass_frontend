import { toast } from 'react-toastify';

// icons
import { SuccessIcon, FailureIcon, InfoIcon, WarnIcon } from '../components/global/Icons';

export const showMessage = (title: string, type: string) => {
    switch (type) {
        case 'success':
            toast.success(title, {
                icon: SuccessIcon
            });
            break;
    
        case 'failure':
            toast.error(title,{
                icon: FailureIcon
            });
            break;

        case 'warn':
            toast.warn(title,{
                icon: WarnIcon
            });
            break;

        default: 
            toast.info(title,{
                icon: InfoIcon
            });
            break;
    }
}