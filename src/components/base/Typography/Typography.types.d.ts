import { MainVarient } from "../Types/varient";

import { PropsWithChildren } from "react";

interface TextProps extends PropsWithChildren {
  type?: "body" | "display";
  size?: TextSize;
  weight?: string;
  decoration?: "underline" | "overline" | "line-through" | "no-underline";
  className?: string;
  font?: string;
  color?: string | "inherit";
  as?: React.ElementType;
}

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2x";
