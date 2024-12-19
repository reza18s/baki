import React, { FC } from 'react';
import { IconProps } from './icons.types';

export const IcSend: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M16.14 2.96004L7.11 5.96004C1.04 7.99004 1.04 11.3 7.11 13.32L9.79 14.21L10.68 16.89C12.7 22.96 16.02 22.96 18.04 16.89L21.05 7.87004C22.39 3.82004 20.19 1.61004 16.14 2.96004ZM16.46 8.34004L12.66 12.16C12.51 12.31 12.32 12.38 12.13 12.38C11.94 12.38 11.75 12.31 11.6 12.16C11.31 11.87 11.31 11.39 11.6 11.1L15.4 7.28004C15.69 6.99004 16.17 6.99004 16.46 7.28004C16.75 7.57004 16.75 8.05004 16.46 8.34004Z"
        fill="#FCC050"
      />
    </svg>
  );
};
