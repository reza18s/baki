import React, { FC } from 'react';
import { IconProps } from './icons.types';
export const IcTickCircle: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="#149A6D"
      className={className}
      strokeWidth="1.5"
      {...props}
    >
      <g clipPath="url(#clip0_789_42903)">
        <circle cx="8.00016" cy="7.99992" r="6.66667" />
        <path
          d="M5.6665 8.33325L6.99984 9.66659L10.3332 6.33325"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_789_42903">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
