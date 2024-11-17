import Button from '@/components/base/Button/Button';
import BottomSheetModal from '@/components/base/Modal/BottomSheetModal';
import { Toast } from '@/components/base/toast/toast';
import { IcArrowLeft } from '@/components/icons/IcArrowLeft';
import { IcSearch } from '@/components/icons/IcSearch';
import { PersonalInterestsItems, TravelInterestsItems } from '@/lib/constants';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export const InterestFilter = ({
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
        علاقه مندی: <span className="text-red-500">(الزامی)</span>
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
          علاقه مدنظر را انتخاب کنید:
        </h1>
        <div className="mb-4 flex h-9 w-full items-center gap-2 rounded-xl border-2 border-brand-black bg-transparent px-2">
          <IcSearch></IcSearch>
          <input
            className="bg-transparent outline-none"
            placeholder="جستجو برای علاقه مندی..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>

        <div className="flex h-[calc(100%-170px)] overflow-y-scroll">
          <div className="flex h-fit flex-wrap gap-3">
            {TravelInterestsItems.filter((el) =>
              el.title.toLowerCase().includes(search.toLowerCase()),
            ).map((item, index) => {
              return (
                <div className="flex items-center gap-x-2" key={item.title}>
                  <button
                    onClick={() => {
                      setValue(item.title);
                    }}
                    key={index}
                    className={`flex max-w-fit items-center gap-x-3 rounded-[32px] p-[12px] ${value?.includes(item.title) ? 'bg-brand-yellow' : 'bg-[#F1F5F9]'}`}
                  >
                    <img src={item.icon} alt={item.title} className="h-5 w-5" />
                    <p className="text-sm text-[#1a1d1e]">{item.title}</p>
                  </button>
                </div>
              );
            })}
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
