import React from 'react';
import Sidebar from '../base/sidebar/sidebar';
import toast from 'react-hot-toast';
import { useStore } from '@/store/useStore';
import { SearchTypes } from '@/lib';
import { Toast } from '../base/toast/toast';

export const SearchTypeSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  changeHandler,
}: {
  isSidebarOpen: boolean;
  changeHandler?: () => void;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { searchType, setSearchType } = useStore((store) => store);
  const SearchType = SearchTypes.find((val) => val.value === searchType);
  return (
    <Sidebar
      isOpen={isSidebarOpen}
      onRequestClose={() => {
        setIsSidebarOpen(false);
      }}
      onCloseEnd={() => {
        setIsSidebarOpen(false);
      }}
      className="flex w-[80%] items-center justify-center"
    >
      <div className="h-full w-full">
        <h1 className="my-5 text-sm">یک حالت را انتخاب کنید:</h1>
        <div className="flex flex-col gap-2">
          {SearchTypes.map((el, index) => (
            <div
              key={el.value}
              className={`flex items-center justify-between rounded-xl px-2 py-3 text-sm ${searchType === el.value && 'bg-warning-50'}`}
              onClick={() => {
                setSearchType(el.value);
                setIsSidebarOpen(false);
                changeHandler?.();
                toast.custom(
                  (t) => (
                    <Toast t={t} type="warning">
                      شما وارد حالت جستجوی {el?.label || ''} شدید!
                    </Toast>
                  ),
                  { duration: 1500 },
                );
              }}
            >
              <div className="flex max-w-[calc(100%-24px)] items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`${index === 1 ? 'rotate-[-120deg]' : index === 2 ? 'rotate-[120deg]' : ''} size-6`}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9.99998"
                    fill={searchType === el.value ? '#ffcc4e' : '#94A3B8'}
                    stroke={searchType === el.value ? '#ffcc4e' : '#94A3B8'}
                    strokeWidth="1.5"
                  />
                  <path
                    d="M16.7248 16.7029C16.1072 17.3234 15.3734 17.8162 14.5653 18.1531C13.7573 18.4899 12.8908 18.6644 12.0153 18.6664C11.1398 18.6684 10.2725 18.498 9.4629 18.1648C8.6533 17.8316 7.91724 17.3423 7.29676 16.7246"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="max-w-[calc(100%-28px)]">
                  <h2 className="text-nowrap text-base font-bold">
                    {el.label}
                  </h2>
                  <span className="text-xs text-gray-500">
                    {el.description}
                  </span>
                </div>
              </div>
              <div
                className={`size-5 rounded-full ${el.value === searchType ? 'border-[6px] border-brand-yellow' : 'border-2'}`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </Sidebar>
  );
};
