import { IcDotsMenu } from '@/components/icons/IcDotsMenu';
import { IcSearch } from '@/components/icons/IcSearch';
import { IcStar } from '@/components/icons/IcStar';
import { IcUserBlackList } from '@/components/icons/IcUserBlackList';
import { Page } from '@/components/layout/Page';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React, { useState } from 'react';
const items = [
  { value: 'all', title: 'همه' },
  { value: 'random', title: 'تصادفی' },
  { value: 'baseOnInterest', title: 'علاقه‌مندی' },
  { value: 'famous', title: 'مشهور' },
];
const mainMenu = [
  {
    url: '',
    icon: <IcStar className="siz5"></IcStar>,
    title: 'لیست علاقه‌مندی‌ها',
  },
  {
    url: '',
    icon: <IcUserBlackList className="siz5"></IcUserBlackList>,
    title: 'لیست سیاه',
  },
];
export const Chat = () => {
  const [filter, setFilter] = useState('all');
  return (
    <Page
      headerClassName="py-3 px-6 h-[88px]"
      contentClassName="h-full px-6 pb-20 pt-28 "
      header={
        <div className="flex w-full flex-col justify-center gap-3">
          <div className="flex w-full justify-between">
            <IcSearch className="size-6"></IcSearch>
            <h1 className="text-center text-lg font-bold">پیام‌ها</h1>
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger>
                <IcDotsMenu></IcDotsMenu>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="ml-6 divide-y rounded-xl px-3 py-1">
                {mainMenu.map((val) => (
                  <DropdownMenuItem
                    key={val.title}
                    className="flex items-center gap-2 p-0 py-2"
                  >
                    {val.icon}
                    <h1 className="text-sm">{val.title}</h1>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="scrollbar-hide flex items-center gap-2 overflow-scroll pl-2">
            {items.map((val, i) => (
              <div
                key={i}
                className={`${filter === val.value ? 'border border-brand-yellow bg-brand-yellow fill-brand-black text-brand-black' : 'border border-gray-300 text-gray-500'} flex h-7 items-center rounded-lg px-4 text-sm font-bold transition-all duration-300 ease-in-out`} // اضافه کردن transition
                onClick={() => setFilter(val.value)}
              >
                {val.title}
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-base font-bold">درخواست‌های جدید</h1>
        <div className="flex w-full gap-4 overflow-x-scroll"></div>
      </div>
    </Page>
  );
};
