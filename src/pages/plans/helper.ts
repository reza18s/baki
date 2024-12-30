import { customToast } from '@/components/base/toast';

export const onBazarPaymentException = (e: any) => {
  switch (e?.message) {
    case 'CONNECTION_FAILED':
      customToast(
        'خطا در اتصال به بازار. از نصب و بروز بودن بازار خود اطمینان حاصل کرده و دوباره تلاش کنید',
        'error',
      );
      break;
    case 'PAYMENT_FAILED':
      customToast('خرید ناموفق بود', 'error');
      break;
  }
  console.log('BazarPlugin.onPaymentException e:', e);
};
