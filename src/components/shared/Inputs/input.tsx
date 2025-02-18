import { cn } from '@/lib/utils';
import { FC } from 'react';

interface BaseProps {
  icon?: React.ReactNode;
  multiline?: boolean;
  error?: string;
  className?: string;
}

type InputProps =
  | (BaseProps &
      React.InputHTMLAttributes<HTMLInputElement> & { multiline?: false })
  | (BaseProps &
      React.TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true });

export const Input: FC<InputProps> = ({
  className,
  icon,
  error,
  multiline,
  ...props
}) => {
  const baseClass =
    'flex w-full items-center gap-x-2 rounded-xl font-iransans border-[1.5px] py-3 pl-6 pr-3  transition-all duration-200 ease-in-out focus-within:shadow-[0px_3px_#000]';
  const errorClass =
    error && 'border-brand-red bg-red-50 focus-within:shadow-[0px_3px_#fe4a49]';
  const inputClass =
    'w-full appearance-none border-none font-iransans bg-transparent  text-sm outline-none';

  return (
    <div className="w-full">
      <div className={cn(baseClass, 'border-black', errorClass, className)}>
        {icon && <>{icon}</>}
        {multiline ? (
          <textarea
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={cn(inputClass, 'resize-none placeholder:font-bold')}
          />
        ) : (
          <input
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            className={inputClass}
          />
        )}
      </div>
      {error && <span className="px-3 text-xs text-brand-red">{error}</span>}
    </div>
  );
};
