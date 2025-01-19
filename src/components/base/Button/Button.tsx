import React, { ForwardedRef, forwardRef } from 'react';
import style from './Button.module.scss';
import clsx from 'clsx';
import { ButtonProps } from './Button.type';
import { DotesLoading } from '../Loader/Loader';
import { cn } from '@/lib/utils';

const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const {
    variant = 'secondary',
    children,
    rounded = 'rounded-xl',
    className,
    loaderClassName,
    ...rest
  } = props;

  return (
    <button
      ref={ref}
      className={cn(style.button, style[variant], rounded, className)}
      {...rest}
    >
      {props.loading ? (
        <DotesLoading
          className={clsx('bg-black', loaderClassName)}
          size="w-2 h-2"
        />
      ) : (
        children
      )}
    </button>
  );
});

export const LargeButton: React.FC<ButtonProps> = ({
  variant = 'secondary',
  className,
  children,
  loading,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      loading={loading}
      className={cn('min-h-[54px] w-full text-base', className)}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default Button;
