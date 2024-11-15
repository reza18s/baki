import Button from '@/components/base/Button/Button';
import { AgeFilter } from '@/components/Explore/filter/ageFilter';
import { InterestFilter } from '@/components/Explore/filter/interestFilter';
import { LanguageFilter } from '@/components/Explore/filter/languageFilter';
import { ProvincesFilter } from '@/components/Explore/filter/provincesFilter';
import { SpecialtyFilter } from '@/components/Explore/filter/specialtyFilter';
import { StatusFilter } from '@/components/Explore/filter/statusFilter';
import { IcExclamationMarkInCircle } from '@/components/icons/IcExclamationMarkInCircle';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import { SearchTypes } from '@/lib';
import { IFilter, useStore } from '@/store/useStore';
import React, { useState } from 'react';

export const Filter = () => {
  const {
    searchType,
    filters: storeFilters,
    setFilters: setStoreFilters,
  } = useStore((store) => store);
  const [filters, setFilters] = useState<IFilter>(storeFilters);
  const SearchType = SearchTypes.find((val) => val.value === searchType);
  return (
    <Page
      contentClassName="p-6 bg-gray-100 flex gap-6 flex-col pb-24"
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
      {searchType === 'random' ? (
        <ProvincesFilter
          setValue={(val) =>
            setFilters((prev) => {
              if (prev.provinces?.includes(val)) {
                return {
                  ...prev,
                  provinces: prev.provinces?.filter((e) => e !== val) || [],
                };
              } else {
                return {
                  ...prev,
                  provinces: [...(prev.provinces || []), val],
                };
              }
            })
          }
          value={filters.provinces}
        ></ProvincesFilter>
      ) : searchType === 'famous' ? (
        <SpecialtyFilter
          setValue={(val) =>
            setFilters((prev) => {
              if (prev.specialty?.includes(val)) {
                return {
                  ...prev,
                  specialty: prev.specialty?.filter((e) => e !== val) || [],
                };
              } else {
                return {
                  ...prev,
                  specialty: [...(prev.specialty || []), val],
                };
              }
            })
          }
          value={filters.specialty}
        ></SpecialtyFilter>
      ) : searchType === 'baseOnInterest' ? (
        <InterestFilter
          setValue={(val) =>
            setFilters((prev) => {
              if (prev.status?.includes(val)) {
                return {
                  ...prev,
                  status: prev.status?.filter((e) => e !== val) || [],
                };
              } else {
                return {
                  ...prev,
                  status: [...(prev.status || []), val],
                };
              }
            })
          }
          value={filters.status}
        ></InterestFilter>
      ) : (
        ''
      )}
      <AgeFilter
        setValues={(val) => setFilters((prev) => ({ ...prev, age: val }))}
        values={filters.age}
      ></AgeFilter>
      <LanguageFilter
        setValue={(val) => setFilters((prev) => ({ ...prev, language: val }))}
        value={filters.language}
      ></LanguageFilter>
      <StatusFilter
        setValue={(val) =>
          setFilters((prev) => {
            if (prev.status?.includes(val)) {
              return {
                ...prev,
                status: prev.status?.filter((e) => e !== val) || [],
              };
            } else {
              return {
                ...prev,
                status: [...(prev.status || []), val],
              };
            }
          })
        }
        value={filters.status}
      ></StatusFilter>
      <Button
        className="fixed bottom-6 w-[calc(100%-48px)]"
        onClick={() => {
          setStoreFilters(filters);
        }}
      >
        ذخیره فیلترها
      </Button>
    </Page>
  );
};
