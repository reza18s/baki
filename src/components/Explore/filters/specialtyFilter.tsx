import Button from '@/components/base/Button/Button';
import BottomSheetModal from '@/components/base/Modal/BottomSheetModal';
import { IcArrowLeft } from '@/components/icons/IcArrowLeft';
import { IcSearch } from '@/components/icons/IcSearch';
import { SpecialtyItems } from '@/lib/constants';
import React, { useState } from 'react';

export const SpecialtyFilter = ({
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
        انتخاب تخصص: <span className="text-red-500">(الزامی)</span>
      </h2>
      <Button
        variant="outline"
        className="flex h-10 w-full items-center justify-between bg-white px-3 py-0 font-medium"
        onClick={() => setIsOpen(true)}
      >
        {value && value.length > 0
          ? value.length >= 2
            ? `${value[0]},...`
            : `${value[0]}`
          : 'اضافه کردن فیلتر'}
        <IcArrowLeft></IcArrowLeft>
      </Button>
      <BottomSheetModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onCloseEnd={() => setIsOpen(false)}
        className="h-[90%] overflow-hidden px-6"
      >
        <h1 className="my-3 text-center text-lg font-bold">
          تخصص مدنظر را انتخاب کنید:
        </h1>
        <div className="mb-4 flex h-9 w-full items-center gap-2 rounded-xl border-2 border-brand-black bg-transparent px-2">
          <IcSearch></IcSearch>
          <input
            className="bg-transparent outline-none"
            placeholder="جستجو برای تخصص..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>

        <div className="flex h-[calc(100%-170px)] flex-col overflow-y-scroll">
          {SpecialtyItems.filter((el) => {
            if (
              el.subItems.filter((el) =>
                el.toLowerCase().includes(search.toLowerCase()),
              ).length > 0
            ) {
              return true;
            }
          }).map((item) => (
            <div key={item.title} className="flex flex-col gap-y-3">
              <h2 className="text-lg font-bold text-[#1a1d1e]">{item.title}</h2>
              <div className="flex flex-wrap gap-3">
                {item.subItems
                  .filter((el) =>
                    el.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((subItem) => (
                    <button
                      onClick={() => {
                        setValue(subItem);
                      }}
                      key={subItem}
                      className={`flex max-w-fit items-center gap-x-3 rounded-[32px] bg-[#F1F5F9] p-[12px] pl-4 ${value?.includes(subItem) ? 'bg-brand-yellow' : 'bg-[#F1F5F9]'}`}
                    >
                      <p className="text-sm text-[#1a1d1e]">{subItem}</p>
                    </button>
                  ))}
              </div>
            </div>
          ))}
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
