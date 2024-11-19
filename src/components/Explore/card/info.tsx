import { allIcon } from '@/lib/constants';
import { clsx } from 'clsx';

export function Info({
  title,
  className,
  items,
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  return (
    <div>
      <h1 className={clsx('my-2 text-sm text-gray-500')}>{title}</h1>
      <div className="flex flex-wrap gap-2">
        {items.map((val, index) => {
          const item = allIcon.find((val2) => val2.title === val);
          return (
            <div
              key={index}
              className={`${className} flex h-6 items-center gap-2 rounded-2xl px-2 text-sm font-medium text-brand-black`}
            >
              {item?.icon && (
                <img src={item.icon} alt={val} className="h-3 w-3" />
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
