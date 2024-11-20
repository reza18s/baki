import Button from '@/components/base/Button/Button';
import BottomSheetModal from '@/components/base/Modal/BottomSheetModal';
import { IcArrowLeft } from '@/components/icons/IcArrowLeft';
import React, { useState } from 'react';
const status = [
  'آنلاین',
  'فعال در 3 روز گذشته',
  'فعال در 10 روز گذشته',
  'فعال در بیش از 10 روز گذشته',
];
export const StatusFilter = ({
  value,
  setValue,
}: {
  value?: string[];
  setValue: (val: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<string>();
  return (
    <div>
      <h2 className="my-2 text-sm text-gray-500">وضعیت:</h2>
      <Button
        variant="outline"
        className="flex h-10 w-full items-center justify-between bg-white px-3 py-0 font-medium"
        onClick={() => setIsOpen('Status')}
      >
        {value && value.length > 0
          ? value.length >= 2
            ? `${value[0]},...`
            : `${value[0]}`
          : 'اضافه کردن فیلتر'}
        <IcArrowLeft></IcArrowLeft>
      </Button>
      <BottomSheetModal
        isOpen={isOpen === 'Status'}
        onRequestClose={() => setIsOpen(undefined)}
        onCloseEnd={() => setIsOpen(undefined)}
        className="overflow-hidden px-6 pb-4"
      >
        <h1 className="my-3 text-center text-lg font-bold">
          وضعیت مدنظر را انتخاب کنید:
        </h1>

        <div className="flex flex-col">
          {status.map((el) => (
            <div
              key={el}
              className="flex items-center gap-2 border-t py-4 text-sm"
              onClick={() => {
                setValue(el);
              }}
            >
              <input
                checked={!!value?.includes(el)}
                type="checkbox"
                readOnly
                className="custom-checkbox h-5 w-5 appearance-none rounded border-2 border-brand-black bg-white transition-colors duration-200 checked:border-brand-yellow checked:bg-brand-yellow focus:outline-none focus:ring-0"
              />
              {el}
            </div>
          ))}
        </div>
        <Button
          className="h-10 w-[calc(100%)] p-0"
          onClick={() => {
            setIsOpen(undefined);
          }}
        >
          تایید
        </Button>
      </BottomSheetModal>
    </div>
  );
};
