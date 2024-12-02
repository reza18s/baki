import React, { FC } from 'react';
import { IconProps } from './icons.types';

export const IcChatTap: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="#94A3B8"
      className={className}
      {...props}
    >
      <path d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 16.9996 2.96952 18.8895 3.80433 20.5656C4.02617 21.011 4.10001 21.5201 3.9714 22.0008L3.22689 24.7833C2.90369 25.9912 4.00877 27.0963 5.21668 26.7731L7.99923 26.0286C8.47992 25.9 8.98901 25.9738 9.43441 26.1957C11.1105 27.0305 13.0004 27.5 15 27.5Z" />
    </svg>
  );
};
