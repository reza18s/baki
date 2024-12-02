import Button from '@/components/base/Button/Button';
import BottomSheetModal from '@/components/base/Modal/BottomSheetModal';
import { IcArrowLeft } from '@/components/icons/IcArrowLeft';
import { IcSearch } from '@/components/icons/IcSearch';
import { IcXCircle } from '@/components/icons/IcXCircle';
import { allIcon, iranProvinces } from '@/constants';
import React, { useState } from 'react';

export const ProvincesFilter = ({
  value,
  setValue,
}: {
  value?: string[];
  setValue: (val: string) => void;
}) => {
  const [search, setSearch] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <h2 className="my-2 text-sm text-gray-500">
        انتخاب استان: <span className="text-red-500">(الزامی)</span>
      </h2>
      <Button
        variant="outline"
        className="flex h-10 w-full items-center justify-between bg-white px-3 py-0 font-medium"
        onClick={() => setIsOpen(true)}
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
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onCloseEnd={() => setIsOpen(false)}
        className="h-[70%] overflow-hidden px-6"
      >
        <h1 className="my-3 text-center text-lg font-bold">
          استان مدنظر را انتخاب کنید:
        </h1>
        <div className="mb-4 flex h-9 w-full items-center gap-2 rounded-xl border-2 border-brand-black bg-transparent px-2">
          <IcSearch></IcSearch>
          <input
            className="bg-transparent outline-none"
            placeholder="جستجو برای استان..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>

        <div className="flex h-[calc(100%-170px)] flex-col gap-4">
          <div
            className={'flex h-fit max-h-40 flex-wrap gap-2 overflow-y-scroll'}
          >
            {value?.map((val) => {
              const item = allIcon.find((val2) => val2.title === val);
              return (
                <div
                  key={val}
                  className="flex h-8 items-center gap-1 rounded-[36px] bg-warning-100 px-3 text-sm"
                  onClick={() => {
                    setValue(val);
                  }}
                >
                  {item?.icon && (
                    <img src={item.icon} alt={val} className="h-4 w-4" />
                  )}
                  {item?.flag && <span>{item?.flag}</span>}
                  {val}
                  <IcXCircle className="stroke-black"></IcXCircle>
                </div>
              );
            })}
          </div>
          <div className="flex flex-1 flex-col overflow-y-scroll">
            {iranProvinces
              .filter((el) =>
                el.key.toLowerCase().includes(search.toLowerCase()),
              )
              .map((el) => (
                <div
                  key={el.label}
                  className="flex items-center gap-2 border-t py-4 text-sm"
                  onClick={() => {
                    setValue(el.label);
                  }}
                >
                  <input
                    checked={!!value?.includes(el.label)}
                    readOnly
                    type="checkbox"
                    className="custom-checkbox h-5 w-5 appearance-none rounded border-2 border-brand-black bg-white transition-colors duration-200 checked:border-brand-yellow checked:bg-brand-yellow focus:outline-none focus:ring-0"
                  />
                  {el.label}
                </div>
              ))}
          </div>
        </div>
        <Button
          className="h-10 w-[calc(100%)] p-0"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          تایید
        </Button>
      </BottomSheetModal>
    </div>
  );
};
