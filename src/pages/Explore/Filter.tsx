import Button from '@/components/base/Button/Button';
import Modal from '@/components/base/Modal/Modal';
import { Toast } from '@/components/base/toast/toast';
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
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';

export const Filter = () => {
  const {
    searchType,
    filters: storeFilters,
    setFilters: setStoreFilters,
  } = useStore((store) => store);
  const [filters, setFilters] = useState<IFilter>(storeFilters);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const SearchType = SearchTypes.find((val) => val.value === searchType);
  return (
    <Page
      contentClassName="p-6 bg-gray-100 flex gap-6 flex-col"
      header={
        <AppBar
          title="فیلتر جستجو"
          onBack={() => {
            if (JSON.stringify(filters) !== JSON.stringify(storeFilters)) {
              setIsOpen(true);
            } else {
              history.goBack();
            }
          }}
        ></AppBar>
      }
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
              if (prev.interest?.includes(val)) {
                return {
                  ...prev,
                  interest: prev.interest?.filter((e) => e !== val) || [],
                };
              } else {
                return {
                  ...prev,
                  interest: [...(prev.interest || []), val],
                };
              }
            })
          }
          value={filters.interest}
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
        className="sticky bottom-6 w-[calc(100%)]"
        onClick={() => {
          if (
            (searchType === 'random' &&
              (!filters.provinces || filters.provinces.length <= 0)) ||
            (searchType === 'baseOnInterest' &&
              (!filters.interest || filters.interest.length <= 0)) ||
            (searchType === 'famous' &&
              (!filters.specialty || filters.specialty.length <= 0))
          ) {
            toast.custom(
              <Toast type="error">
                حداقل یک{' '}
                {searchType === 'random'
                  ? 'استان'
                  : searchType === 'baseOnInterest'
                    ? 'علاقه مندی'
                    : searchType === 'famous'
                      ? 'تخصص'
                      : ''}{' '}
                را انتخاب کنید
              </Toast>,
              { duration: 1000 },
            );
            return;
          }
          setStoreFilters(filters);
          history.goBack();
        }}
      >
        ذخیره فیلترها
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onCloseEnd={() => setIsOpen(false)}
        className="flex w-[85%] flex-col gap-3 rounded-3xl bg-white px-5 py-3"
      >
        <div className="flex items-center justify-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-red-500">
            <IcExclamationMarkInCircle
              className="size-8 fill-none stroke-white"
              stroke="#fff"
            ></IcExclamationMarkInCircle>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-lg font-bold">
          شما تغییرات ذخیره نشده دارید!
          <span className="text-nowrap text-sm text-gray-500">
            آیا میخواهید قبل از خروج تغییرات را ذخیره کنید؟
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            className="h-10 w-full border-black p-0"
            onClick={() => {
              if (
                (searchType === 'random' &&
                  (!filters.provinces || filters.provinces.length <= 0)) ||
                (searchType === 'baseOnInterest' &&
                  (!filters.interest || filters.interest.length <= 0)) ||
                (searchType === 'famous' &&
                  (!filters.specialty || filters.specialty.length <= 0))
              ) {
                toast.custom(
                  <Toast type="error">
                    حداقل یک{' '}
                    {searchType === 'random'
                      ? 'استان'
                      : searchType === 'baseOnInterest'
                        ? 'علاقه مندی'
                        : searchType === 'famous'
                          ? 'تخصص'
                          : ''}{' '}
                    را انتخاب کنید
                  </Toast>,
                  { duration: 1000 },
                );
                setIsOpen(false);
                return;
              }
              setStoreFilters(filters);
              history.goBack();
            }}
          >
            ذخیره تغییرات
          </Button>
          <Button
            variant="outline"
            className="h-10 w-full border-black p-0"
            onClick={() => {
              setIsOpen(false);
              history.goBack();
            }}
          >
            خروج
          </Button>
        </div>
      </Modal>
    </Page>
  );
};
