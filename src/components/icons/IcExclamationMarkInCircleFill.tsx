import React, { FC } from 'react';
import { IconProps } from './icons.types';
export const IcExclamationMarkInCircleFill: FC<IconProps> = ({
  className,
  ...props
}) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="#1A1D1E"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6668 8.22428C14.6668 11.9062 11.6821 14.891 8.00016 14.891C4.31826 14.891 1.3335 11.9062 1.3335 8.22428C1.3335 4.54239 4.31826 1.55762 8.00016 1.55762C11.6821 1.55762 14.6668 4.54239 14.6668 8.22428ZM8.00016 12.0576C8.27631 12.0576 8.50016 11.8338 8.50016 11.5576V7.55762C8.50016 7.28148 8.27631 7.05762 8.00016 7.05762C7.72402 7.05762 7.50016 7.28148 7.50016 7.55762V11.5576C7.50016 11.8338 7.72402 12.0576 8.00016 12.0576ZM8.00016 4.89095C8.36835 4.89095 8.66683 5.18943 8.66683 5.55762C8.66683 5.92581 8.36835 6.22428 8.00016 6.22428C7.63197 6.22428 7.3335 5.92581 7.3335 5.55762C7.3335 5.18943 7.63197 4.89095 8.00016 4.89095Z"
      />
    </svg>
  );
};
