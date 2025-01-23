import { cn } from '@/lib/utils';
import { FC } from 'react';

interface BaseProps {
  icon?: React.ReactNode;
  multiline?: boolean;
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
  multiline,
  ...props
}) => {
  const hasValue = (props.value?.toString()?.length || 0) > 0;

  const baseClass =
    'flex w-full items-center gap-x-2 rounded-xl font-iransans border-[1.5px] py-3 pl-6 pr-2  transition-all duration-200 ease-in-out';
  const activeClass = hasValue ? 'shadow-[0px_3px_#000]' : '';
  const inputClass =
    'w-full appearance-none border-none font-iransans bg-white text-sm outline-none';

  return (
    <div className={cn(baseClass, 'border-black', activeClass, className)}>
      {icon && <span>{icon}</span>}
      {multiline ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={cn(inputClass, 'resize-none')}
        />
      ) : (
        <input
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          className={inputClass}
        />
      )}
    </div>
  );
};
