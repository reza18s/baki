import { useState } from "react";

export function useHelperText(
  helper: string,
  onF?: React.FocusEventHandler<HTMLInputElement>,
  onB?: React.FocusEventHandler<HTMLInputElement>
) {
  const [helperText, setHelperText] = useState(" ");

  return {
    helperText: helperText,
    onFocus: (e: React.FocusEvent<HTMLInputElement, Element>) => {
      if (onF) {
        onF(e);
      }
      setHelperText(helper);
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => {
      if (onB) {
        onB(e);
      }
      setHelperText(" ");
    },
  };
}
