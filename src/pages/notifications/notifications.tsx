import { IcHeardTap } from '@/components/icons/IcHeardTap';
import { Page } from '@/components/layout/Page';
import React, { useState } from 'react';
const items = [
  { value: 'all', title: 'همه' },
  { value: 'liked', icon: <IcHeardTap className="size-5"></IcHeardTap> },
  { value: 'random', title: 'تصادفی' },
  { value: 'baseOnInterest', title: 'علاقه‌مندی' },
  { value: 'famous', title: 'مشهور' },
];
export const Notifications = () => {
  const [filter, setFilter] = useState('');
  return (
    <Page
      headerClassName="py-3 px-4 h-[88px]"
      header={
        <div className="flex w-full flex-col justify-center gap-3">
          <h1 className="w-full text-center text-lg font-bold">اعلان ها</h1>
          <div className="scrollbar-hide flex items-center gap-2 overflow-scroll">
            {items.map((val, i) => (
              <div
                key={i}
                className={`${filter === val.value ? 'border-none bg-brand-yellow fill-brand-black text-brand-black' : 'border border-gray-300 text-gray-500'} flex h-6 items-center rounded-lg px-4 text-sm font-bold`}
                onClick={() => setFilter(val.value)}
              >
                {val.title}
                {val.icon}
              </div>
            ))}
          </div>
        </div>
      }
    >
      Notifications
    </Page>
  );
};
