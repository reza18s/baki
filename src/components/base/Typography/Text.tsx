import clsx from 'clsx';
import { getDisplayTagBySize } from './Typography.helper';
import { TextProps } from './Typography.types';
import styles from './Typography.module.scss';
import React from 'react';

export const Text: React.FC<TextProps> = ({
  type = 'body',
  size = 'md',
  color = 'text-gray-800',
  weight = 'font-normal',
  decoration = 'no-underline',
  className = undefined,
  font = undefined,
  as = undefined,
  children,
}) => {
  const Component =
    as ?? (type === 'display' ? getDisplayTagBySize(size) : 'p');
  return (
    <Component
      className={clsx(
        type === 'body' ? styles.body : styles.display,
        styles[size],
        color !== 'inherit' && color,
        weight,
        decoration,
        type === 'body' ? 'font-body' : 'font-display',
        font,
        className,
      )}
    >
      {children}
    </Component>
  );
};
