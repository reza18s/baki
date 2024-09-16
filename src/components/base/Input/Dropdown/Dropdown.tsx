import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { ClassAttributes, InputHTMLAttributes, PropsWithChildren } from 'react';
import InputLayout from '../InputLayout';
import Modal from '../../Modal/Modal';

import Button from '../../Button/Button';
import Card from '../../Card';



interface OutlineDropdownProps extends PropsWithChildren {
  label: string;
  hint?: string;
  options: string[];
}

const OutlineDropdown = ({
  label,
  hint = undefined,
  options,
  ...props
}: OutlineDropdownProps &
  InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const id = uuidv4();
  const [showOptions, setShowOptions] = React.useState(false);

  return (
    <InputLayout
      className={props.className}
      label={label}
      meta={meta}
      id={id}
      hint={hint}
    >
      <div
        {...field}
        id={id}
        onClick={() => setShowOptions(!showOptions)}
        className="w-full active:bg-gray-300 transition-colors relative font-vazir text-gray-800 flex items-center justify-between border-gray-200 bg-gray-50 px-2 min-h-[40px] outline-none border rounded-xl "
      >
        <p>{field.value}</p>
        {/* Arrrow down here */}
        {showOptions && (
          <Card className="absolute z-[9999] top-[40px] right-0 flex flex-col min-w-[80px] p-3">
            {options.map((option) => (
              <span
                key={option}
                onClick={() => {
                  field.onChange({
                    target: {
                      name: field.name,
                      value: option,
                    },
                  });

                  setShowOptions(false);
                }}
                className="text-right text-gray-800 p-2 border-b border-solid border-gray-200 last:border-transparent active:bg-gray-100"
              >
                {option}
              </span>
            ))}
          </Card>
        )}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </InputLayout>
  );
};

export default OutlineDropdown;
