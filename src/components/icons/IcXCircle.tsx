import React, { FC } from 'react';
import { IconProps } from './icons.types';
export const IcXCircle: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="#FE4A49"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_736_41688)">
        <circle cx="8.00016" cy="7.99992" r="6.66667" strokeWidth="1.5" />
        <path
          d="M9.66682 6.33327L6.3335 9.66659M6.33348 6.33325L9.6668 9.66657"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_736_41688">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
