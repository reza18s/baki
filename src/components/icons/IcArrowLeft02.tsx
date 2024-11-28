import React, { FC } from 'react';
import { IconProps } from './icons.types';

const IcArrowLeft02: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}
      stroke="currentColor"
    >
      <path
        d="M3.33313 8L13.3331 7.99984"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.99984 4.6665L3.37361 7.29273C3.04028 7.62606 2.87361 7.79273 2.87361 7.99984C2.87361 8.20694 3.04028 8.37361 3.37361 8.70694L5.99984 11.3332"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IcArrowLeft02;
