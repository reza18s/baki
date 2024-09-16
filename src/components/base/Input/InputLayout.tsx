import { PropsWithChildren } from 'react';

import { InputLayoutType } from './Textfield.types';
import clsx from 'clsx';
import React from 'react';
import { BodySmRegular } from '../Typography/Body';

const InputLayout = ({
  id,
  label,
  hint,
  className,
  customLabel,
  orientation = 'vertical',
  meta,
  dropdown,
  errorEnabled = true,
  hintEnabled = true,
  children,
}: InputLayoutType & PropsWithChildren) => {
  const error = meta.touched ? meta.error : undefined;
  

  return (
    <div>
      <div
        className={clsx(
          className,
          'flex',
          orientation === 'vertical' ? 'flex-col' : 'flex-row-reverse',
        )}
      >
        {customLabel ? (
          customLabel
        ) : label ? (
          <label
            htmlFor={id}
            className={clsx(
              'font-vazir font-bold text-[0.75rem] text-gray-800 mb-[0.5rem]', //! change text color if need
              orientation === 'vertical' ? 'mr-3' : 'mr-1',
            )}
          >
            {label}
          </label>
        ) : null}
        {children}
      </div>
      {errorEnabled ? (
        <InputError error={error} />
      ) : hintEnabled ? (
        <InputHint hint={hint??""} />
      ) : null}

      <div className="relative">{dropdown}</div>
    </div>
  );
};

export const InputError = ({ error }: { error: string }) => {
  return (
    <BodySmRegular color="errorColorHere" weight='font-bold' className="min-h-[1rem]">
      {error}
    </BodySmRegular>
  );
};

export const InputHint = ({ hint }: { hint: string }) => {
  return (
   <BodySmRegular color={"hintColorHere"} weight='font-bold' className="min-h-[1rem]">
      {hint}
    </BodySmRegular>
  );
};

export default InputLayout;
