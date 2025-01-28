import React, { FC } from 'react';
import { IconProps } from './icons.types';

export const IcExploreTap: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="#94A3B8"
      className={className}
      {...props}
    >
      <circle
        cx="15"
        cy="15"
        r="12.5"
        strokeWidth="1.875"
        className="bg-transparent"
      />
      <path
        d="M6.95452 17.1755C6.66885 16.1191 6.59405 15.0168 6.73439 13.9315C6.87474 12.8461 7.22747 11.7991 7.77246 10.8501C8.31745 9.90113 9.04402 9.06878 9.91069 8.40058C10.7774 7.73239 11.7672 7.24144 12.8236 6.95577"
        stroke="white"
        strokeWidth="1.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1382 6.94523C18.196 7.22603 19.188 7.71242 20.0577 8.37661C20.9275 9.04081 21.6579 9.86981 22.2072 10.8163C22.7566 11.7627 23.1141 12.8082 23.2595 13.8928C23.4048 14.9775 23.3351 16.0801 23.0543 17.1378"
        stroke="white"
        strokeWidth="1.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.9072 20.8788C20.1352 21.6544 19.218 22.2703 18.2079 22.6914C17.1978 23.1126 16.1147 23.3306 15.0203 23.3331C13.926 23.3356 12.8419 23.1226 11.8298 22.7061C10.8178 22.2897 9.89777 21.678 9.12217 20.9059"
        stroke="white"
        strokeWidth="1.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
