import React, { FC } from 'react';
import { IconProps } from './icons.types';

export const IcScorpio: FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M5.39045 3.68767C5.21795 3.47204 4.9033 3.43708 4.68767 3.60958C4.47204 3.78209 4.43708 4.09674 4.60958 4.31237L6.50002 6.67541V17H7.50002V6.6819L9.1222 4.74721C9.32243 4.5084 9.68995 4.50896 9.88945 4.74837L11.5 6.68104V17H12.5V6.68104L14.1159 4.74198C14.3158 4.5021 14.6842 4.5021 14.8841 4.74198L16.3841 6.54198C16.459 6.63183 16.5 6.7451 16.5 6.86207V14.4983L16.5 14.5V16.8486C16.5 17.3721 16.655 17.8838 16.9453 18.3194C17.4371 19.057 18.2649 19.5 19.1514 19.5H20V20.7586C20 20.8477 20.1077 20.8923 20.1707 20.8293L21.9293 19.0707C21.9684 19.0317 21.9684 18.9684 21.9293 18.9293L20.1707 17.1707C20.1077 17.1077 20 17.1523 20 17.2414V18.5H19.1514C18.5993 18.5 18.0836 18.2241 17.7774 17.7647C17.5965 17.4934 17.5 17.1747 17.5 16.8486L17.5 6.86207C17.5 6.51116 17.377 6.17136 17.1524 5.90179L15.6524 4.10179C15.0527 3.38216 13.9474 3.38216 13.3477 4.10179L12 5.71899L10.6577 4.10818C10.0592 3.38997 8.9566 3.3883 8.35592 4.1047L7.0091 5.71098L5.39045 3.68767Z"
        fill="#1A1D1E"
        stroke="#1A1D1E"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
