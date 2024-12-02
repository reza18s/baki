import React, { FC } from 'react';
import { IconProps } from './icons.types';

export const IcProfileTap: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="#94A3B8"
      className={className}
      {...props}
    >
      <circle cx="15" cy="7.5" r="5" strokeWidth="1.5" />
      <ellipse cx="15" cy="21.25" rx="8.75" ry="5" />
    </svg>
  );
};
