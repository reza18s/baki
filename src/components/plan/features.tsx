import { IcExclamationMarkInCircle } from '@/components/icons/IcExclamationMarkInCircle';
import { IcTick } from '@/components/icons/IcTick';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const Items = [
  {
    title: 'بی‌نهایت همسفر',
    description: 'با تهیه اشتراک ویژه، هیچ محدودیتی در پیدا کردن همسفر ندارید.',
  },
  {
    title: 'عینک سحرآمیز',
    description: 'درصد تطبیق پروفایل شما با مخاطب در اولین مشاهده مشخص می‌شود.',
  },
  {
    title: 'خاصیت آهنربا',
    description:
      'به مدت 24 ساعت یکی از پروفایل های برتر کشور خواهید بود. این باعث می‌شود که بیشتر دیده شوید!',
  },
  {
    title: 'فاش شدن لایک‌های مخفی',
    description:
      'دریافت نوتیفیکیشن هنگام لایک شدن و مشاهده لیست افرادی که شما را لایک کرده اند!',
  },
  {
    title: 'چت بدون محدودیت',
    description: 'محدودیتی در پاسخگویی به درخواست‌های گفتگو و چت وجود ندارد',
  },
  {
    title: 'رفع محدودیت زمانی',
    description: 'محدودیت زمانی در پاسخگویی به درخواست‌ها وجود ندارد.',
  },
  {
    title: 'قابلیت عقب‌گرد',
    description: 'با گزینه عقب‌گرد می‌تونی همسفر قبلی رو دوباره ببینی!',
  },
];
export const Features = () => {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-gray-300 bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-bold">امکانات و ویژگی‌ها:</h1>
        <h2 className="text-xs font-bold text-gray-500">اشتراک پریمیوم</h2>
      </div>
      <div className="flex flex-col gap-4">
        {Items.map(({ title, description }) => (
          <div className="flex items-center justify-between" key={title}>
            <h1 className="flex items-center text-sm font-medium">
              {title}
              <Popover>
                <PopoverTrigger>
                  <IcExclamationMarkInCircle className="fill-gray-300"></IcExclamationMarkInCircle>
                </PopoverTrigger>
                <PopoverContent
                  side="top"
                  className="flex flex-col items-center justify-center border-none bg-transparent p-0 shadow-none"
                >
                  <div className="flex items-center rounded-xl bg-black p-2 text-center text-xs text-white">
                    {description}
                  </div>
                  <svg
                    width="12"
                    height="6"
                    viewBox="0 0 12 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 6L0 0H12L6 6Z" fill="#1A1D1E" />
                  </svg>
                </PopoverContent>
              </Popover>
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
