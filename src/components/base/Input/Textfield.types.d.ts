import { ReactNode } from 'react';

export type InputVarient = 'white' | 'gray';

export type TextfieldType = {
  label?: string;
  hint?: string;
  varient?: InputVarient;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  dateFormat?: string;
  inputClassName?: string;
  mode?: 'text' | 'date';
  dropdown?: ReactNode;
  errorEnabled?: boolean;
  hintEnabled?: boolean;
};

export type InputLayoutType = {
  id: string;
  label?: string;
  hint?: string;
  className?: string;
  hintEnabled?: boolean; //اگه فعال باشه کامپوننت تکسش رو رندر میکنه حتی وقتی هینت خالی باشه
  errorEnabled?: boolean; //اگه فعال باشه کامپوننت تکسش رو رندر میکنه حتی وقتی ارور خالی باشه
  customLabel?: ReactNode;
  dropdown?: ReactNode;
  orientation?: 'vertical' | 'horizontal';
  meta: FieldMetaProps<string>;
};
