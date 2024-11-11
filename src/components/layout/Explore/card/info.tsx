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
        {items.map((val) => (
          <div
            key={val}
            className={`${className} h-6 rounded-2xl px-2 text-sm font-medium text-brand-black`}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  );
}
