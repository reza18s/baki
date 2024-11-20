import React, { FC } from 'react';
import { IconProps } from './icons.types';
export const IcSendMessage: FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.8332 8.99984C16.8332 13.6022 13.1022 17.3332 8.49984 17.3332C7.16677 17.3332 5.90681 17.0202 4.78944 16.4636C4.49251 16.3157 4.15311 16.2665 3.83266 16.3522L1.97763 16.8486C1.17235 17.064 0.435632 16.3273 0.651096 15.522L1.14744 13.667C1.23318 13.3466 1.18395 13.0072 1.03605 12.7102C0.479517 11.5929 0.166504 10.3329 0.166504 8.99984C0.166504 4.39746 3.89746 0.666504 8.49984 0.666504C13.1022 0.666504 16.8332 4.39746 16.8332 8.99984ZM4.74984 8.25685C4.74984 9.39719 5.84887 10.5937 6.85698 11.4513C7.54354 12.0354 7.88682 12.3274 8.49984 12.3274C9.11287 12.3274 9.45614 12.0354 10.1427 11.4513C11.1508 10.5937 12.2498 9.39721 12.2498 8.25684C12.2498 6.02587 10.1873 5.19293 8.49984 6.91634C6.8124 5.19293 4.74984 6.02587 4.74984 8.25685Z"
        fill="#1A1D1E"
      />
    </svg>
  );
};
