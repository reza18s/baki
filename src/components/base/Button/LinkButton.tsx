import { Link } from 'react-router-dom';
import { LinkButtonProps } from './Button.type';
import React from 'react';
import style from './Button.module.scss';
import clsx from 'clsx';

const LinkButton: React.FC<LinkButtonProps> = ({
  variant = 'white',
  className,
  children,
  rounded = "rounded-xl", 
  ...rest
}) => {
  return (
    <Link
      className={clsx(style.button, style[variant], rounded, className)}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
