import React from 'react';
import BottomSheetModal from '../base/Modal/BottomSheetModal';
import { SearchTypes } from '@/lib';
import Button from '../base/Button/Button';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';
import { Toast } from '../base/toast/toast';

export const SearchTypeModal = ({
  isOpen,
  setClose,
}: {
  isOpen: boolean;
  setClose: () => void;
}) => {
  const { searchType, setSearchType } = useStore((store) => store);
  const SearchType = SearchTypes.find((val) => val.value === searchType);
  return (
    <BottomSheetModal
      isOpen={isOpen}
      onRequestClose={() => {
        setClose();
      }}
      onCloseEnd={() => {
        setSearchType(searchType);
        toast.custom(
          () => (
            <Toast type="warning">
              شما وارد حالت جستجوی {SearchType?.label || ''} شدید!
            </Toast>
          ),
          { duration: 1000 },
        );
        setClose();
      }}
      className="p-4"
    >
      <div className="h-full w-full px-3 pb-2">
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
            setClose();
          }}
        >
          تایید
        </Button>
      </div>
    </BottomSheetModal>
  );
};
