import { FC } from 'react';
import React from 'react';

import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: string;
  rounded?: string;
  color?: string;
  clip?: boolean;
  backgroundImage?: string;
}

const Card: FC<CardProps> = ({
  clip = true,
  backgroundImage,
  className,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(
        className,
        clip && 'overflow-clip',
        backgroundImage && 'bg-cover',
      )}
      style={{ backgroundImage: backgroundImage }}
    >
      {children}
    </div>
  );
};

export default Card;
