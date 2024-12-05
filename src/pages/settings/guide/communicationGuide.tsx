import Button from '@/components/base/Button/Button';
import { IcCommunication } from '@/components/icons/IcCommunication';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import React from 'react';

export const CommunicationGuide = () => {
  return (
    <Page
      contentClassName="flex min-h-full flex-col gap-4 bg-gray-50 p-6 pt-20 pb-20"
      header={<AppBar title="انواع جستجو"></AppBar>}
    >
      <div className="flex flex-col gap-8 rounded-xl border border-gray-300 bg-white px-4 py-3">
        <div className="flex w-full flex-col items-center justify-center gap-4 text-lg font-bold text-black">
          <div className="flex size-16 items-center justify-center rounded-full border-4 border-white bg-brand-green shadow-[0px_5px_#000]">
            <IcCommunication></IcCommunication>
          </div>
          روش‌های ارتباطی
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-sm font-bold">ایجاد ارتباط</h1>
            <span className="text-sm text-gray-500">
              پیدا کردن یک همسفر خوب که با سلیقه و سبک سفر شما سازگار باشد،
              می‌تواند چالش‌برانگیز باشد. اما نگران نباشید! اپلیکیشن «باکی»
              می‌تواند همسفر ایده‌آلتان را پیدا کند.
            </span>
          </div>{' '}
          <div className="flex flex-col gap-2">
            <h1 className="text-sm font-bold">لایک کردن</h1>
            <span className="text-sm text-gray-500">
              پیدا کردن یک همسفر خوب که با سلیقه و سبک سفر شما سازگار باشد،
              می‌تواند چالش‌برانگیز باشد. اما نگران نباشید! اپلیکیشن «باکی»
              می‌تواند همسفر ایده‌آلتان را پیدا کند.
            </span>
          </div>{' '}
          <div className="flex flex-col gap-2">
            <h1 className="text-sm font-bold">درخواست ها</h1>
            <span className="text-sm text-gray-500">
              پیدا کردن یک همسفر خوب که با سلیقه و سبک سفر شما سازگار باشد،
              می‌تواند چالش‌برانگیز باشد. اما نگران نباشید! اپلیکیشن «باکی»
              می‌تواند همسفر ایده‌آلتان را پیدا کند.
            </span>
          </div>{' '}
          <div className="flex flex-col gap-2">
            <h1 className="text-sm font-bold">پیام پیشنهادی</h1>
            <span className="text-sm text-gray-500">
              پیدا کردن یک همسفر خوب که با سلیقه و سبک سفر شما سازگار باشد،
              می‌تواند چالش‌برانگیز باشد. اما نگران نباشید! اپلیکیشن «باکی»
              می‌تواند همسفر ایده‌آلتان را پیدا کند.
            </span>
          </div>
        </div>
      </div>
      <Button className="fixed bottom-6 z-10 w-[calc(100%-48px)]">
        ارتباط با پشتیبانی
      </Button>
    </Page>
  );
};
