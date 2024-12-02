import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import React from 'react';

export const Bills = () => {
  return (
    <Page
      contentClassName="pt-20 bg-gray-50 h-full p-6"
      header={<AppBar title="سوابق پرداختی"></AppBar>}
      scrollY
    >
      <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-4">
        <div className="flex w-full items-center justify-between border-b border-gray-300 pb-2">
          <h1 className="text-xs font-medium text-gray-500">خرید</h1>
          <p className="text-sm font-medium">اشتراک سه ماهه</p>
        </div>
        <div className="flex w-full items-center justify-between border-b border-gray-300 pb-2">
          <h1 className="text-xs font-medium text-gray-500">مبلغ</h1>
          <p className="text-sm font-medium">300,000 تومان</p>
        </div>
        <div className="flex w-full items-center justify-between border-b border-gray-300 pb-2">
          <h1 className="text-xs font-medium text-gray-500">تاریخ</h1>
          <p className="text-sm font-medium">1403/4/2</p>
        </div>
        <div className="flex w-full items-center justify-between border-b border-gray-300 pb-2">
          <h1 className="text-xs font-medium text-gray-500">وضعیت</h1>
          <p className="text-sm font-medium">موفق</p>
        </div>
        <div className="flex w-full items-center justify-between border-b border-gray-300 pb-2">
          <h1 className="text-xs font-medium text-gray-500">شناسه خرید</h1>
          <p className="text-sm font-medium">152697</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xs font-medium text-gray-500">تخفیف</h1>
          <p className="text-sm font-medium">70%</p>
        </div>
      </div>
    </Page>
  );
};
