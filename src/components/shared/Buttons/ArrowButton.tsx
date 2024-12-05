import Button from '@/components/base/Button/Button';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import * as SolarIconSet from 'solar-icon-set';

export default function ArrowButton({
  text,
  arrowText,
  isArrowText = false,
  className,
  icon,
  onClick,
  url,
}: {
  text: any;
  onClick?: () => void;
  className?: string;
  icon?: any;
  arrowText?: string;
  isArrowText?: boolean;
  url?: string;
}) {
  return url ? (
    <Link
      to={url || '/profile'}
      className={cn(
        'flex w-full items-center justify-between rounded-[12px] border border-slate-300 bg-white px-4 py-[12px] text-brand-black',
        className,
      )}
    >
      <div className="flex items-center gap-x-2 text-sm">
        {icon}
        <p className="flex items-center text-sm font-medium">{text}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <p
          className={cn(
            'text-sm font-bold',
            arrowText ? 'text-brand-black' : 'text-gray-500',
          )}
        >
          {isArrowText && (arrowText ? arrowText : 'افزودن')}
        </p>
        <SolarIconSet.AltArrowLeft size={24} />
      </div>
    </Link>
  ) : (
    <Button
      variant="outline"
      className={cn(
        'flex w-full items-center justify-between rounded-[12px] border border-slate-300 bg-white px-4 py-[12px] text-brand-black',
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-x-2 text-sm">
        {icon}
        <p className="flex items-center text-sm font-medium">{text}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <p
          className={clsx(
            'text-sm font-bold',
            arrowText ? 'text-brand-black' : 'text-gray-500',
          )}
        >
          {isArrowText && (arrowText ? arrowText : 'افزودن')}
        </p>
        <SolarIconSet.AltArrowLeft size={24} />
      </div>
    </Button>
  );
}
