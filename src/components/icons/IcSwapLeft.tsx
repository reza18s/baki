import React, { FC } from 'react';
import { IconProps } from './icons.types';

export const IcSwapLeft: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="57"
      height="68"
      viewBox="0 0 57 68"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M14.18 38.0846C12.9877 36.0182 10.3452 35.3097 8.27884 36.5034C6.21244 37.6958 5.50402 40.3382 6.69778 42.4046L13.8978 54.875C19.8623 65.2055 33.0728 68.7465 43.4034 62.7806C53.7339 56.8161 57.2749 43.6055 51.309 33.275L45.549 23.2986C44.3566 21.2322 41.7142 20.5238 39.6478 21.7175C37.5814 22.9098 36.8744 25.5522 38.0667 27.6186L36.6267 25.1246C35.4344 23.0582 32.792 22.3497 30.7256 23.5434C28.6592 24.7358 27.9508 27.3782 29.1445 29.4446L27.7045 26.9505C26.5122 24.8841 23.8698 24.1756 21.8034 25.3694C19.737 26.5617 19.0285 29.2041 20.2222 31.2705L10.1422 13.8119C8.94989 11.7455 6.30755 11.037 4.24115 12.2308C2.17475 13.4231 1.46623 16.0655 2.65999 18.1319L19.22 46.8153L14.18 38.0846Z"
        stroke="#1A1D1E"
        strokeWidth="3.9375"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.3281 7.21193C27.2297 1.13657 42.1698 3.07913 52.1288 13.0382"
        stroke="#1A1D1E"
        strokeWidth="2.8125"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.3286 2.31982V8.07982L21.0886 9.51983"
        stroke="#1A1D1E"
        strokeWidth="2.8125"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
