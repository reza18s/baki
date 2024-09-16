import { FieldHookConfig, useField } from "formik";
import { ClassAttributes, InputHTMLAttributes } from "react";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import InputLayout from "../InputLayout";
import style from "./OutlineCheckbox.module.scss";
import clsx from "clsx";

interface OutlineCheckboxProps {
  id?: string;
  varient?: "filled" | "outline";
  label?: string;
  customLabel?: React.ReactNode;
  errorEnabled?: boolean;
  hintEnabled?: boolean;
  hint?: string;
}

const OutlineCheckbox = ({
  id,
  label,
  varient = "outline",
  customLabel,
  errorEnabled = true,
  hintEnabled = true,
  hint = undefined,
  ...props
}: OutlineCheckboxProps &
  InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  id ??= uuidv4();
  return (
    <InputLayout
      className={props.className}
      label={label}
      meta={meta}
      id={id}
      errorEnabled={errorEnabled}
      hintEnabled={hintEnabled}
      customLabel={customLabel}
      orientation="horizontal"
      hint={hint}
    >
      <input
        {...field}
        {...props}
        id={id}
        checked={props.checked}
        type="checkbox"
        className={clsx(style.checkbox, style[varient])}
      />
      <label htmlFor={id} className={style.label} />
    </InputLayout>
  );
};

export default OutlineCheckbox;
