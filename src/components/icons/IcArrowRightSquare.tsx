import React, { FC } from 'react';
import { IconProps } from './icons.types';

export const IcArrowRightSquare: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M10.6667 16C16.9151 16 15.085 16 21.3334 16M21.3334 16L17.3334 12M21.3334 16L17.3334 20"
        stroke="#64748B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6667 16C16.9151 16 15.085 16 21.3334 16M21.3334 16L17.3334 12M21.3334 16L17.3334 20"
        stroke="black"
        strokeOpacity="0.2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.66669 16C2.66669 9.71457 2.66669 6.57187 4.61931 4.61925C6.57193 2.66663 9.71463 2.66663 16 2.66663C22.2854 2.66663 25.4281 2.66663 27.3807 4.61925C29.3334 6.57187 29.3334 9.71457 29.3334 16C29.3334 22.2854 29.3334 25.4281 27.3807 27.3807C25.4281 29.3333 22.2854 29.3333 16 29.3333C9.71463 29.3333 6.57193 29.3333 4.61931 27.3807C2.66669 25.4281 2.66669 22.2854 2.66669 16Z"
        stroke="#64748B"
        strokeWidth="1.5"
      />
      <path
        d="M2.66669 16C2.66669 9.71457 2.66669 6.57187 4.61931 4.61925C6.57193 2.66663 9.71463 2.66663 16 2.66663C22.2854 2.66663 25.4281 2.66663 27.3807 4.61925C29.3334 6.57187 29.3334 9.71457 29.3334 16C29.3334 22.2854 29.3334 25.4281 27.3807 27.3807C25.4281 29.3333 22.2854 29.3333 16 29.3333C9.71463 29.3333 6.57193 29.3333 4.61931 27.3807C2.66669 25.4281 2.66669 22.2854 2.66669 16Z"
        stroke="black"
        strokeOpacity="0.2"
        strokeWidth="1.5"
      />
    </svg>
  );
};
