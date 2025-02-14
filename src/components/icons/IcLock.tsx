import React, { FC } from 'react';
import { IconProps } from './icons.types';

export const IcLock: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.75 10.0546V8C5.75 4.27208 8.77208 1.25 12.5 1.25C16.2279 1.25 19.25 4.27208 19.25 8V10.0546C20.3648 10.1379 21.0907 10.348 21.6213 10.8787C22.5 11.7574 22.5 13.1716 22.5 16C22.5 18.8284 22.5 20.2426 21.6213 21.1213C20.7426 22 19.3284 22 16.5 22H8.5C5.67157 22 4.25736 22 3.37868 21.1213C2.5 20.2426 2.5 18.8284 2.5 16C2.5 13.1716 2.5 11.7574 3.37868 10.8787C3.90931 10.348 4.63525 10.1379 5.75 10.0546ZM7.25 8C7.25 5.10051 9.60051 2.75 12.5 2.75C15.3995 2.75 17.75 5.10051 17.75 8V10.0036C17.367 10 16.9515 10 16.5 10H8.5C8.04849 10 7.63301 10 7.25 10.0036V8ZM14.5 16C14.5 17.1046 13.6046 18 12.5 18C11.3954 18 10.5 17.1046 10.5 16C10.5 14.8954 11.3954 14 12.5 14C13.6046 14 14.5 14.8954 14.5 16Z"
        fill="#1A1D1E"
      />
    </svg>
  );
};
