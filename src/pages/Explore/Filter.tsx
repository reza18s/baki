import Button from '@/components/base/Button/Button';
import { AgeFilter } from '@/components/Explore/filter/ageFilter';
import { LanguageFilter } from '@/components/Explore/filter/languageFilter';
import { ProvincesFilter } from '@/components/Explore/filter/provincesFilter';
import { StatusFilter } from '@/components/Explore/filter/statusFilter';
import { IcExclamationMarkInCircle } from '@/components/icons/IcExclamationMarkInCircle';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import { SearchTypes } from '@/lib';
import { useStore } from '@/store/useStore';
import React, { useState } from 'react';

export const Filter = () => {
  const { searchType } = useStore((store) => store);
  const SearchType = SearchTypes.find((val) => val.value === searchType);
  const [isOpen, setIsOpen] = useState<string>();
  return (
    <Page
      contentClassName="p-6 bg-gray-100 flex gap-6 flex-col"
      header={<AppBar title="فیلتر جستجو"></AppBar>}
    >
      <div className="mt-3 flex flex-col items-center gap-2 rounded-xl border border-gray-300 bg-white p-3">
        <h1 className="flex items-center gap-1 text-sm font-bold text-black">
          <IcExclamationMarkInCircle
            className="fill-brand-yellow stroke-white"
            stroke="#fff"
          ></IcExclamationMarkInCircle>
          {SearchType?.label}
        </h1>
        <span className="text-center text-xs text-gray-500">
          در حالت رایگان هر 24 ساعت می‌توانید یکبار از “همسفر مشهور” استفاده
          کنید.
        </span>
        <Button className="h-10 w-[90px] p-0 px-2 text-sm">تهیه اشتراک</Button>
      </div>
      <ProvincesFilter isOpen={isOpen} setIsOpen={setIsOpen}></ProvincesFilter>
      <AgeFilter></AgeFilter>
      <LanguageFilter isOpen={isOpen} setIsOpen={setIsOpen}></LanguageFilter>
      <StatusFilter isOpen={isOpen} setIsOpen={setIsOpen}></StatusFilter>
      <Button className="fixed bottom-6 w-[calc(100%-48px)]">
        ذخیره فیلترها و جستجو
      </Button>
    </Page>
  );
};
