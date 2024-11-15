import Button from '@/components/base/Button/Button';
import BottomSheetModal from '@/components/base/Modal/BottomSheetModal';
import { IcArrowLeft } from '@/components/icons/IcArrowLeft';
import { IcSearch } from '@/components/icons/IcSearch';
import { languages } from '@/lib/constants';
import React, { useState } from 'react';

export const LanguageFilter = ({
  isOpen,
  setIsOpen,
}: {
  isOpen?: string | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const [search, setSearch] = useState<string>('');
  return (
    <div>
      <h2 className="my-2 text-sm text-gray-500">زبانی که بداند:</h2>
      <Button
        variant="outline"
        className="flex h-10 w-full items-center justify-between bg-white px-3 py-0 font-medium"
        onClick={() => setIsOpen('Language')}
      >
        اضافه کردن فیلتر
        <IcArrowLeft></IcArrowLeft>
      </Button>
      <BottomSheetModal
        isOpen={isOpen === 'Language'}
        onRequestClose={() => setIsOpen(undefined)}
        onCloseEnd={() => setIsOpen(undefined)}
        className="h-[70%] overflow-hidden px-6"
      >
        <h1 className="my-3 text-center text-lg font-bold">
          زبان مدنظر را انتخاب کنید:
        </h1>
        <div className="mb-4 flex h-9 w-full items-center gap-2 rounded-xl border-2 border-brand-black bg-transparent px-2">
          <IcSearch></IcSearch>
          <input
            className="bg-transparent outline-none"
            placeholder="جستجو برای زبان..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>

        <div className="flex h-[73%] flex-col overflow-y-scroll">
          {languages
            .filter((el) => el.language.includes(search))
            .map((el) => (
              <div
                key={el.language}
                className="flex items-center gap-2 border-t py-6 text-sm"
                // onClick={() => {
                //   set(el.value);
                // }}
              >
                <input
                  type="checkbox"
                  className="custom-checkbox h-5 w-5 appearance-none rounded border-2 border-brand-black bg-white transition-colors duration-200 checked:border-brand-yellow checked:bg-brand-yellow focus:outline-none focus:ring-0"
                />
                {el.language}
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
