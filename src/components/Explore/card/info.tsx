import { allIcon } from '@/constants';
import { clsx } from 'clsx';
import React from 'react';

export function Info({
  title,
  className,
  items,
  edit,
}: {
  title: string;
  items?: string[];
  className?: string;
  edit?: React.ReactNode;
}) {
  return (
    <div>
      <h1 className={clsx('my-2 flex gap-2 text-sm text-gray-500')}>
        {title}
        <>{edit}</>
      </h1>
      <div className="flex flex-wrap gap-2">
        {items?.map((val, index) => {
          const item = allIcon.find((val2) => val2.title === val);
          return (
            <div
              key={index}
              className={`${className} flex h-6 items-center justify-center gap-1 rounded-2xl px-2 text-sm font-medium text-brand-black`}
            >
              {item?.icon && (
                <img src={item.icon} alt={val} className="h-4 w-4" />
              )}
              {item?.flag && <span>{item?.flag}</span>}
              {val}
            </div>
          );
        })}
      </div>
    </div>
  );
}
