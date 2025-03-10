import { cn } from '@/lib/utils';
import { ClassAttributes, InputHTMLAttributes } from 'react';
import React from 'react';

const Checkbox = ({
  className,
  white,
  ...props
}: InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> & { white?: boolean }) => {
  return (
    <input
      type="checkbox"
      className={cn(
        `flex h-5 w-5 appearance-none items-center justify-center rounded border-2 border-gray-400 bg-white transition-colors duration-200 checked:border-brand-yellow checked:bg-brand-yellow focus:outline-none focus:ring-0`,
        white
          ? "checked:after:content-[url('../assets/images/tick-white.svg')]"
          : "checked:after:content-[url('../assets/images/tick.svg')]",
        className,
      )}
      {...props}
    />
  );
};

export default Checkbox;
