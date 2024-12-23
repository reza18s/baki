import React, { FC } from 'react';
import { IconProps } from './icons.types';
export const IcSendMessage: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="#1A1D1E"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 13.5997 2.87562 15.1116 3.54346 16.4525C3.72094 16.8088 3.78001 17.2161 3.67712 17.6006L3.08151 19.8267C2.82295 20.793 3.70701 21.677 4.67335 21.4185L6.89939 20.8229C7.28393 20.72 7.69121 20.7791 8.04753 20.9565C9.38837 21.6244 10.9003 22 12.5 22ZM8.5 13.25C8.08579 13.25 7.75 13.5858 7.75 14C7.75 14.4142 8.08579 14.75 8.5 14.75H14C14.4142 14.75 14.75 14.4142 14.75 14C14.75 13.5858 14.4142 13.25 14 13.25H8.5ZM7.75 10.5C7.75 10.0858 8.08579 9.75 8.5 9.75H16.5C16.9142 9.75 17.25 10.0858 17.25 10.5C17.25 10.9142 16.9142 11.25 16.5 11.25H8.5C8.08579 11.25 7.75 10.9142 7.75 10.5Z"
      />
    </svg>
  );
};
