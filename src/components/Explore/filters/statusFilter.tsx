import Button from '@/components/base/Button/Button';
import Checkbox from '@/components/base/Input/checkboxSection/checkbox';
import BottomSheetModal from '@/components/base/Modal/BottomSheetModal';
import { IcArrowLeft } from '@/components/icons/IcArrowLeft';
import React, { useState } from 'react';
const status = [
  { label: 'آنلاین', value: 'online' },
  { label: 'فعال در 10 روز گذشته', value: 'LessThen10Days' },
  { label: 'فعال در 3 روز گذشته', value: 'LessThen3Days' },
  { label: 'فعال در بیش از 10 روز گذشته', value: 'MoreThen10Days' },
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
        <div className="flex-1 overflow-hidden text-nowrap text-start">
          {value && value.length > 0
            ? value.length > 4
              ? `${value[0]},${value[1]},${value[2]},...`
              : `${value[0]}${value[1] ? ',' + value[1] : ''} ${value[2] ? ',' + value[2] : ''}`
            : 'اضافه کردن فیلتر'}
        </div>
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
              key={el.value}
              className="flex items-center gap-2 border-t py-4 text-sm"
              onClick={() => {
                setValue(el.value);
              }}
            >
              {' '}
              <Checkbox
                checked={!!value?.includes(el.value)}
                className="border-black"
                readOnly
              ></Checkbox>
              {el.label}
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
