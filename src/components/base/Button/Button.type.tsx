import { ButtonHTMLAttributes } from 'react';
import { LinkProps } from 'react-router-dom';

//? declere all button styles name here
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'brand'
  | 'secondaryOutline'
  | 'white'
  | 'gray'
  | 'outline'
  | 'text'
  | 'danger'
  | 'danger-outline'
  | 'success'
  | 'premium';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  loaderClassName?: string;
  rounded?: string;
}

export interface LinkButtonProps extends LinkProps {
  variant?: ButtonVariant;
  rounded?: string;
}
