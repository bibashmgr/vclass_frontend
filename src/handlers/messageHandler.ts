import { toast } from 'react-toastify';

// icons
import {
  SuccessIcon,
  FailureIcon,
  InfoIcon,
  WarnIcon,
} from '../components/global/Icons';

export const showMessage = (title: string | string[], type: string) => {
  switch (type) {
    case 'success':
      if (Array.isArray(title)) {
        title.map((t) => {
          toast.success(t, {
            icon: SuccessIcon,
          });
        });
      } else {
        toast.success(title, {
          icon: SuccessIcon,
        });
      }
      break;

    case 'failure':
      if (Array.isArray(title)) {
        title.map((t) => {
          toast.error(t, {
            icon: FailureIcon,
          });
        });
      } else {
        toast.error(title, {
          icon: FailureIcon,
        });
      }
      break;

    case 'warn':
      if (Array.isArray(title)) {
        title.map((t) => {
          toast.warn(t, {
            icon: WarnIcon,
          });
        });
      } else {
        toast.warn(title, {
          icon: WarnIcon,
        });
      }
      break;

    default:
      if (Array.isArray(title)) {
        title.map((t) => {
          toast.info(t, {
            icon: InfoIcon,
          });
        });
      } else {
        toast.info(title, {
          icon: InfoIcon,
        });
      }
      break;
  }
};
