import React, { FC } from 'react';
import { IconProps } from './icons.types';
export const IcExclamationMarkInCircle: FC<IconProps> = ({
  className: classname,
}) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className={classname}>
      <g clipPath="url(#clip0_5071_15412)">
        <circle
          cx="8.00016"
          cy="8.00016"
          r="6.66667"
          stroke="#FFCC4E"
          strokeWidth="1.5"
        />
        <path
          d="M8 11.3335V7.3335"
          stroke="#FFCC4E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="0.666667"
          cy="0.666667"
          r="0.666667"
          transform="matrix(1 0 0 -1 7.3335 6)"
          fill="#FFCC4E"
        />
      </g>
      <defs>
        <clipPath id="clip0_5071_15412">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
