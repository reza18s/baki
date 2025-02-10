import React, { FC } from 'react';
import { IconProps } from './icons.types';

export const IcPlay: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M29.0447 12.4695C31.8739 14.008 31.874 17.9907 29.0447 19.5292L11.9621 28.8187C9.21245 30.314 5.83331 28.3678 5.83331 25.2888L5.83331 6.70988C5.83331 3.63093 9.21245 1.68471 11.9621 3.17998L29.0447 12.4695Z"
        fill="#1A1D1E"
      />
    </svg>
  );
};
