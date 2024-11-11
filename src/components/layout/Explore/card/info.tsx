import { clsx } from 'clsx';
import { allIcon } from '../../Signup/constants';
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
        {items.map((val) => (
          <div
            key={val}
            className={`${className} flex h-6 items-center gap-1 rounded-2xl px-2 text-sm font-medium text-brand-black`}
          >
            <img
              src={allIcon.find((val2) => val2.title === val)?.icon}
              alt={val}
              className="h-3 w-3"
            />
            {val}
          </div>
        ))}
      </div>
    </div>
  );
}
