import { cn } from '@/lib/utils';
import { ClassAttributes, InputHTMLAttributes } from 'react';
import React from 'react';

const Checkbox = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement>) => {
  return (
    <input
      type="checkbox"
      className={cn(
        'custom-checkbox h-5 w-5 appearance-none rounded border-2 border-gray-400 bg-white transition-colors duration-200 checked:border-brand-yellow checked:bg-brand-yellow focus:outline-none focus:ring-0',
        className,
      )}
      {...props}
    />
  );
};

export default Checkbox;
