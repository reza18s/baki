import Button from '@/components/base/Button/Button';
import Checkbox from '@/components/base/Input/checkboxSection/checkbox';
import BottomSheetModal from '@/components/base/Modal/BottomSheetModal';
import { IcSearch } from '@/components/icons/IcSearch';
import { IcXCircle } from '@/components/icons/IcXCircle';
import { allIcon, countries } from '@/constants';
import React, { useState } from 'react';

export const LivedInPlacesModal = ({
  value,
  setValue,
  isOpen,
  setClose,
  handleClick,
}: {
  value?: string | string[];
  setValue: (val: string) => void;
  isOpen: boolean;
  setClose: () => void;
  handleClick?: () => void;
}) => {
  const [search, setSearch] = useState<string>('');
  return (
    <BottomSheetModal
      isOpen={isOpen}
      onRequestClose={() => setClose()}
      onCloseEnd={() => setClose()}
      className="h-[70%] overflow-hidden px-6"
    >
      <h1 className="my-3 text-center text-lg font-bold">
        مکان مدنظر را انتخاب کنید:
      </h1>
      <div className="flex">
        <div className="mb-4 flex h-9 w-full items-center gap-2 rounded-xl border-2 border-brand-black bg-transparent px-2">
          <IcSearch></IcSearch>
          <input
            className="bg-transparent outline-none"
            placeholder="جستجو برای زبان..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>
        {search.length > 0 && (
          <div className="p-2 text-red-500" onClick={() => setSearch('')}>
            لغو
          </div>
        )}
      </div>
      <div className="flex h-[calc(100%-170px)] flex-col gap-4">
        <div
          className={'flex h-fit max-h-40 flex-wrap gap-2 overflow-y-scroll'}
        >
          {value &&
            (typeof value === 'object' ? value : [value]).map((val) => {
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
          {countries
            .filter((el) =>
              el.country.toLowerCase().includes(search.toLowerCase()),
            )
            .map((el) => (
              <div
                key={el.country}
                className="flex items-center gap-2 border-t py-3 text-sm"
                onClick={() => {
                  setValue(el.country);
                }}
              >
                <Checkbox
                  checked={
                    typeof value === 'object'
                      ? value.includes(el.country)
                      : value === el.country
                  }
                  className="border-black"
                  readOnly
                ></Checkbox>
                {el.country}
              </div>
            ))}
        </div>
      </div>
      <Button
        className="h-10 w-[calc(100%)] p-0"
        onClick={() => {
          setClose();
          if (handleClick) {
            handleClick();
          }
        }}
      >
        تایید
      </Button>
    </BottomSheetModal>
  );
};
