import React, { FC } from 'react';
import { IconProps } from './icons.types';

export const IcSwapRight: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="65"
      height="69"
      viewBox="0 0 65 69"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M33.1714 25.8045C34.3637 23.7381 33.6567 21.0956 31.5903 19.9033C29.5239 18.711 26.8815 19.4181 25.6892 21.4845L18.4892 33.9548C12.5247 44.2854 16.0642 57.496 26.3948 63.4604C36.7253 69.4249 49.9359 65.8854 55.9004 55.5548L61.6604 45.5785C62.8527 43.5121 62.1457 40.8697 60.0793 39.6774C58.0129 38.4851 55.3705 39.1921 54.1781 41.2585L55.6181 38.7644C56.8105 36.698 56.1034 34.0557 54.037 32.8633C51.9706 31.671 49.3282 32.3781 48.1359 34.4444L49.5759 31.9504C50.7682 29.884 50.0612 27.2416 47.9948 26.0493C45.9284 24.8569 43.286 25.564 42.0937 27.6304L52.1737 10.1718C53.366 8.10541 52.659 5.46301 50.5926 4.27069C48.5262 3.07837 45.8837 3.78541 44.6914 5.85181L28.1314 34.5352L33.1714 25.8045Z"
        stroke="#1A1D1E"
        strokeWidth="3.9375"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.6805 7.20988C24.8776 1.69612 11.5719 2.78764 1.75977 10.483"
        stroke="#1A1D1E"
        strokeWidth="2.8125"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.3196 2.31982V8.07982L30.5596 9.51983"
        stroke="#1A1D1E"
        strokeWidth="2.8125"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
