import { IcExclamationMarkInCircle } from '@/components/icons/IcExclamationMarkInCircle';
import { IcTick } from '@/components/icons/IcTick';
import React from 'react';

const Items = [
  'بی‌نهایت همسفر',
  'عینک سحرآمیز',
  'خاصیت آهنربا',
  'فاش شدن لایک‌های مخفی',
  'چت بدون محدودیت',
  'رفع محدودیت زمانی',
  'قابلیت عقب‌گرد',
];
export const Features = () => {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-gray-300 bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-bold">امکانات و ویژگی‌ها:</h1>
        <h2 className="text-xs font-bold text-gray-500">اشتراک پریمیوم</h2>
      </div>
      <div className="flex flex-col gap-4">
        {Items.map((title) => (
          <div className="flex items-center justify-between" key={title}>
            <h1 className="flex items-center text-sm font-medium">
              {title}
              <IcExclamationMarkInCircle className="fill-gray-300"></IcExclamationMarkInCircle>
            </h1>
            <div className="flex w-16 items-center justify-center">
              <IcTick className="size-3 fill-brand-green"></IcTick>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
