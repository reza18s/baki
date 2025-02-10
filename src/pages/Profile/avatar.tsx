import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import React from 'react';

export const Avatar = () => {
  return (
    <Page
      contentClassName="p-6"
      header={<AppBar title="انتخاب آواتار"></AppBar>}
    >
      <div className="flex flex-col items-center gap-4 pt-10">
        <h1 className="w-full text-[32px] font-bold text-brand-black">
          آواتار من
        </h1>
        <p className="w-full text-sm font-medium leading-tight text-gray-500">
          از بین لیست پایین آواتار مد نظر خودتون رو انتخاب کنید.
        </p>
      </div>
      <div className='bg'></div>
    </Page>
  );
};
