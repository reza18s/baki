import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export const Popup = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Popover open={isOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        side="top"
        className="flex w-fit flex-col items-start justify-center border-none bg-transparent p-0 shadow-none"
      >
        <div className="flex items-center rounded-xl bg-black p-2 text-center text-xs text-white">
          این بخش رو تکمیل کنید
        </div>
        <svg
          width="12"
          height="6"
          viewBox="0 0 12 6"
          fill="none"
          className="mr-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 6L0 0H12L6 6Z" fill="#1A1D1E" />
        </svg>
      </PopoverContent>
    </Popover>
  );
};
