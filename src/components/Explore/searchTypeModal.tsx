import React from 'react';
import BottomSheetModal from '../base/Modal/BottomSheetModal';
import { SearchTypes } from '@/lib';
import Button from '../base/Button/Button';
import { useStore } from '@/store/useStore';
import { IcExclamationMarkInCircle } from '../icons/IcExclamationMarkInCircle';
import toast from 'react-hot-toast';

export const SearchTypeModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { searchType, setSearchType } = useStore((store) => store);
  return (
    <BottomSheetModal
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      onCloseEnd={() => {
        setIsOpen(false);
        setSearchType(searchType);
        toast.custom(
          () => (
            <div className="flex h-10 flex-nowrap items-center gap-2 text-nowrap rounded-xl border-2 border-brand-yellow bg-white p-3 px-7 text-base font-bold">
              <IcExclamationMarkInCircle className="fill-none"></IcExclamationMarkInCircle>
              شما وارد حالت جستجوی تصادفی شدید!
            </div>
          ),
          { duration: 1000 },
        );
      }}
      className="flex items-center justify-center p-4"
    >
      <div className="h-full w-full px-6 pb-2">
        <h1 className="my-3 text-center text-lg font-bold">
          یکی از حالت‌های زیر را انتخاب کنید
        </h1>
        <div className="flex flex-col">
          {SearchTypes.map((el) => (
            <div
              key={el.value}
              className="flex h-16 items-center gap-2 border-t text-sm"
              onClick={() => {
                setSearchType(el.value);
              }}
            >
              <div
                className={`size-6 rounded-full ${el.value === searchType ? 'border-[6px] border-brand-yellow' : 'border-2'}`}
              ></div>
              {el.label}
            </div>
          ))}
        </div>
        <Button
          className="h-10 w-full p-0"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          تایید
        </Button>
      </div>
    </BottomSheetModal>
  );
};
