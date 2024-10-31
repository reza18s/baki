import React, { ForwardedRef, forwardRef } from 'react';
import style from './Button.module.scss';
import clsx from 'clsx';
import { ButtonProps } from './Button.type';
import { DotesLoading } from '../Loader/Loader';

const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const {
    variant = 'secondary',
    children,
    rounded = 'rounded-xl',
    className,
    ...rest
  } = props;

  return (
    <button
      ref={ref}
      className={clsx(style.button, style[variant], rounded, className)}
      {...rest}
    >
      {props.loading ? <ButtonLoader /> : children}
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
      className={clsx(
        'py-3 w-full min-h-[54px] text-base',
        className,
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};

const ButtonLoader = () => {
  return <DotesLoading className="bg-white" size="w-2 h-2" />;
};

export default Button;
