import React, { FC } from 'react';
import { IconProps } from './icons.types';
export const IcCase: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.552 1.25H12.448C11.5495 1.24997 10.8003 1.24995 10.2055 1.32991C9.57773 1.41432 9.01093 1.59999 8.55546 2.05546C8.09999 2.51093 7.91432 3.07773 7.82991 3.70552C7.74995 4.3003 7.74997 5.04951 7.75 5.94799V6.02572C7.57755 6.03136 7.41097 6.03824 7.25 6.04663V14.25L10.5345 14.25C10.7396 14.2499 10.9614 14.2498 11.1486 14.275C11.3679 14.3045 11.6481 14.3803 11.8839 14.6161C12.1197 14.8519 12.1955 15.1321 12.225 15.3514C12.2502 15.5387 12.2501 15.7605 12.25 15.9656V17.0345C12.2501 17.2396 12.2502 17.4614 12.225 17.6486C12.1955 17.8679 12.1197 18.1481 11.8839 18.3839C11.6481 18.6197 11.3679 18.6955 11.1486 18.725C10.9614 18.7502 10.7396 18.7501 10.5345 18.75L7.25 18.75V21.9534C8.14461 22 9.2124 22 10.5 22H14.5C15.7876 22 16.8554 22 17.75 21.9534V6.04663C17.589 6.03824 17.4225 6.03136 17.25 6.02572V5.94801C17.25 5.04954 17.2501 4.3003 17.1701 3.70552C17.0857 3.07773 16.9 2.51093 16.4445 2.05546C15.9891 1.59999 15.4223 1.41432 14.7945 1.32991C14.1997 1.24995 13.4505 1.24997 12.552 1.25ZM15.75 6.00189V6C15.75 5.03599 15.7484 4.38843 15.6835 3.9054C15.6214 3.44393 15.5142 3.24644 15.3839 3.11612C15.2536 2.9858 15.0561 2.87858 14.5946 2.81654C14.1116 2.7516 13.464 2.75 12.5 2.75C11.536 2.75 10.8884 2.7516 10.4054 2.81654C9.94393 2.87858 9.74644 2.9858 9.61612 3.11612C9.4858 3.24644 9.37858 3.44393 9.31654 3.9054C9.2516 4.38843 9.25 5.03599 9.25 6V6.00189C9.64203 6 10.0581 6 10.5 6H14.5C14.9419 6 15.358 6 15.75 6.00189Z"
        fill="#1A1D1E"
      />
      <path
        d="M21.3284 20.8284C20.8096 21.3473 20.1507 21.6363 19.25 21.7974V6.20261C20.1507 6.36366 20.8096 6.65273 21.3284 7.17157C22.5 8.34315 22.5 10.2288 22.5 14C22.5 17.7712 22.5 19.6569 21.3284 20.8284Z"
        fill="#1A1D1E"
      />
      <path
        d="M3.67157 7.17157C4.19042 6.65273 4.84931 6.36366 5.75 6.20261V14.2916C5.54984 14.3306 5.3169 14.4154 5.11613 14.6161C4.88033 14.8519 4.8045 15.1321 4.77501 15.3514C4.74984 15.5387 4.74993 15.7605 4.75001 15.9656V17.0345C4.74993 17.2396 4.74984 17.4614 4.77501 17.6486C4.8045 17.8679 4.88033 18.1481 5.11613 18.3839C5.3169 18.5847 5.54984 18.6695 5.75 18.7084V21.7974C4.84931 21.6363 4.19042 21.3473 3.67157 20.8284C2.5 19.6569 2.5 17.7712 2.5 14C2.5 10.2288 2.5 8.34315 3.67157 7.17157Z"
        fill="#1A1D1E"
      />
      <path
        d="M6.25117 15.7512C6.25005 15.8206 6.25002 15.9009 6.25002 16V17C6.25002 17.0991 6.25005 17.1794 6.25117 17.2489C6.32063 17.25 6.40094 17.25 6.50002 17.25H10.5C10.5991 17.25 10.6794 17.25 10.7489 17.2489C10.75 17.1794 10.75 17.0991 10.75 17V16C10.75 15.9009 10.75 15.8206 10.7489 15.7512C10.6794 15.7501 10.5991 15.75 10.5 15.75H6.50002C6.40094 15.75 6.32063 15.7501 6.25117 15.7512Z"
        fill="#1A1D1E"
      />
    </svg>
  );
};
