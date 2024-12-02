import React, { FC } from 'react';
import { IconProps } from './icons.types';

export const IcHeardTap: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="#94A3B8"
      className={className}
      {...props}
    >
      <path d="M2.5 11.4207C2.5 17.4994 7.52428 20.7386 11.2022 23.6379C12.5 24.661 13.75 25.6243 15 25.6243C16.25 25.6243 17.5 24.661 18.7978 23.6379C22.4757 20.7386 27.5 17.4994 27.5 11.4207C27.5 5.34203 20.6248 1.03116 15 6.87512C9.3752 1.03116 2.5 5.34203 2.5 11.4207Z" />
    </svg>
  );
};
