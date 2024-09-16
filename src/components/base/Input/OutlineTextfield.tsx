import { FieldHookConfig, useField } from 'formik';
import { ClassAttributes, InputHTMLAttributes, useState } from 'react';
import style from './OutlineTextfield.module.scss';
import clsx from 'clsx';
import { TextfieldType } from './Textfield.types';

import { v4 as uuidv4 } from 'uuid';
import InputLayout from './InputLayout';


import Modal from '../Modal/Modal';
import Datepicker from '../Datepicker/Datepicker';

const OutlineTextfield = ({
  label,
  hint = undefined,
  varient = 'white',
  startIcon = null,
  endIcon = null,
  mode = 'text',
  id,
  inputClassName,
  errorEnabled = true,
  hintEnabled = true,
  dropdown,
  dateFormat = 'jYYYY/jMM/jDD',
  ...props
}: TextfieldType &
  InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const [datePicker, showDatepicker] = useState(false);

  const theId = id ?? uuidv4();
  const isError = (mode === 'date' || meta.touched) && meta.error;
  return (
    <InputLayout
      id={theId}
      hint={hint}
      meta={meta}
      label={label}
      errorEnabled={errorEnabled}
      hintEnabled={hintEnabled}
      dropdown={dropdown}
      className={clsx(props.className, style.textfield)}
    >
      <div className="relative box-content min-w-full">
        <input
          {...field}
          {...props}
          readOnly={mode === 'date'}
          onClick={(e) => {
            e.preventDefault();
            props.onClick?.(e);
            if (mode === 'date') {
              showDatepicker(!datePicker);
            }
          }}
          className={clsx(
            style.input,
            style[varient],
            startIcon && style.startIcon,
            endIcon && style.endIcon,
            isError && style.error,
            inputClassName,
          )}
          id={theId}
        />
        {startIcon && (
          <span className={clsx(style.icon_container, style.startIcon)}>
            {startIcon}
          </span>
        )}
        {endIcon && (
          <span className={clsx(style.icon_container, style.endIcon)}>
            {endIcon}
          </span>
        )}
      </div>

      <Modal isOpen={datePicker} onRequestClose={() => showDatepicker(false)}>
        <Datepicker
          onSelect={(date) => {
            showDatepicker(false);

            field.onChange({
              target: {
                value: date.format(dateFormat),
                name: field.name,
              },
            });
          }}
        />
      </Modal>
    </InputLayout>
  );
};

export default OutlineTextfield;
