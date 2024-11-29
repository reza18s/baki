import toast, { ToastOptions } from 'react-hot-toast';
import { Toast } from './toast';

export const customToast = (
  content: string,
  type: 'error' | 'success' | 'warning',
  option?: ToastOptions,
) =>
  toast.custom(
    (t) => (
      <Toast t={t} type={type}>
        {content}
      </Toast>
    ),
    { ...option },
  );
