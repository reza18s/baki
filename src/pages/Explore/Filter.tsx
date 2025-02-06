import React, { useState } from 'react';
import { useHistory } from 'react-router';
import toast from 'react-hot-toast';
import Button from '@/components/base/Button/Button';
import Modal from '@/components/base/Modal/Modal';
import { Toast } from '@/components/base/toast/toast';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import {
  AgeFilter,
  InterestFilter,
  LanguageFilter,
  ProvincesFilter,
  SpecialtyFilter,
  StatusFilter,
} from '@/components/Explore/filters';
import { IcExclamationMarkInCircle } from '@/components/icons/IcExclamationMarkInCircle';
import { SearchTypes } from '@/lib';
import { IFilter, useStore } from '@/store/useStore';
import { IcExclamationMarkInCircleFill } from '@/components/icons/IcExclamationMarkInCircleFill';
import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';
import { customToast } from '@/components/base/toast';

export default function Filter() {
  const {
    searchType,
    filters: storeFilters,
    setFilters: setStoreFilters,
    setSearchStart,
  } = useStore((store) => store);
  const [filters, setFilters] = useState<IFilter>(storeFilters);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const SearchType = SearchTypes.find((val) => val.value === searchType);

  const handleFilterChange = (key: keyof IFilter, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[key] as string[];
      return {
        ...prev,
        [key]: currentValues?.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...(currentValues || []), value],
      };
    });
  };

  const validateFilters = () => {
    if (
      (searchType === 'random' &&
        (!filters.provinces || filters.provinces.length === 0)) ||
      (searchType === 'baseOnInterest' &&
        (!filters.interest || filters.interest.length === 0)) ||
      (searchType === 'famous' &&
        (!filters.mySpecialty || filters.mySpecialty.length === 0))
    ) {
      const missingType =
        searchType === 'random'
          ? 'استان'
          : searchType === 'baseOnInterest'
            ? 'علاقه مندی'
            : 'تخصص';
      customToast(`حداقل یک ${missingType} را انتخاب کنید`, 'error');
      return false;
    }
    return true;
  };

  const handleSaveFilters = () => {
    if (validateFilters()) {
      setStoreFilters(filters);
      console.log('llll');
      setSearchStart(true);
      history.goBack();
    }
  };

  return (
    <Page
      contentClassName="p-6 bg-gray-100 flex gap-5 flex-col h-full"
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
        />
      }
    >
      {/* Subscription Section */}
      <div className="mt-3 flex flex-col items-center gap-2 rounded-xl border border-gray-300 bg-white p-3">
        <h1 className="flex items-center gap-1 text-sm font-bold text-black">
          <IcExclamationMarkInCircleFill className="rounded-full fill-brand-yellow" />
          {SearchType?.label}
        </h1>
        <span className="text-center text-xs text-gray-500">
          در حالت رایگان هر 24 ساعت می‌توانید{' '}
          {SearchType?.value === 'random' ? '3 بار' : 'یکبار'} از “
          {SearchType?.label}” استفاده کنید.
        </span>
        <Link to={paths.plans.main}>
          <Button className="h-10 w-[90px] p-0 px-2 text-sm">
            تهیه اشتراک
          </Button>
        </Link>
      </div>

      {/* Dynamic Filters */}
      {searchType === 'random' && (
        <ProvincesFilter
          value={filters.provinces}
          setValue={(val) => handleFilterChange('provinces', val)}
        />
      )}
      {searchType === 'famous' && (
        <SpecialtyFilter
          value={filters.mySpecialty}
          setValue={(val) => handleFilterChange('mySpecialty', val)}
        />
      )}
      {searchType === 'baseOnInterest' && (
        <InterestFilter
          value={filters.interest}
          setValue={(val) => handleFilterChange('interest', val)}
        />
      )}

      {/* Static Filters */}
      <AgeFilter
        values={filters.age}
        setValues={(val) => setFilters((prev) => ({ ...prev, age: val }))}
      />
      <LanguageFilter
        value={filters.language}
        setValue={(val) => setFilters((prev) => ({ ...prev, language: val }))}
      />
      <StatusFilter
        value={filters.status}
        setValue={(val) => handleFilterChange('status', val)}
      />

      {/* Save Button */}
      <Button
        className="sticky bottom-6 w-[calc(100%)]"
        onClick={handleSaveFilters}
      >
        ذخیره فیلترها و جستجو
      </Button>

      {/* Unsaved Changes Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onCloseEnd={() => setIsOpen(false)}
        className="flex w-[85%] flex-col gap-3 rounded-3xl bg-white px-5 py-3"
      >
        <div className="flex items-center justify-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-red-500">
            <IcExclamationMarkInCircle className="size-8 fill-white" />
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
            onClick={handleSaveFilters}
          >
            ذخیره تغییرات
          </Button>
          <Button
            variant="outline"
            className="h-10 w-full border-black p-0"
            onClick={() => history.goBack()}
          >
            خروج
          </Button>
        </div>
      </Modal>
    </Page>
  );
}
