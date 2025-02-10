import React, { FC } from 'react';
import { IconProps } from './icons.types';

export const IcSearchTypeIntrests: FC<IconProps> = ({
  className,
  ...props
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="9.99998" strokeWidth="1.5" />
      <path
        d="M16.7248 16.7029C16.1072 17.3234 15.3734 17.8162 14.5653 18.1531C13.7573 18.4899 12.8908 18.6644 12.0153 18.6664C11.1398 18.6684 10.2725 18.498 9.4629 18.1648C8.6533 17.8316 7.91724 17.3423 7.29676 16.7246"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
