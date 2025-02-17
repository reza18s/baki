import Button from '@/components/base/Button/Button';
import { IcNoInternet } from '@/components/icons/IcNoInternet';
import { Page } from '@/components/layout/Page';
import React from 'react';
import { useHistory } from 'react-router';

export default function NoInternet() {
  const hs = useHistory();
  return (
    <Page contentClassName="items-center flex flex-col justify-center gap-4 h-full">
      <div className="flex w-[85%] flex-col items-center justify-center gap-4 px-6">
        <div className="flex size-16 items-center justify-center rounded-full bg-brand-yellow">
          <IcNoInternet></IcNoInternet>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h1 className="text-base font-bold">صفحه مورد نظر یافت نشد!</h1>
          <span className="text-sm text-gray-500">
            لطفا تنظیمات اینترنت خود را بررسی کنید و دوباره تلاش کنید.
          </span>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Button
            className="h-10 w-full"
            onClick={() => {
              hs.go(0);
            }}
          >
            تلاش مجدد
          </Button>
          <Button
            variant="outline"
            className="h-10 w-full border-black"
            onClick={() => {
              hs.goBack();
            }}
          >
            بازگشت
          </Button>
        </div>
      </div>
    </Page>
  );
}
