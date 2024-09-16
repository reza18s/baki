import { TextSize } from "./Typography.types";


const displaySizeToTag: { [key in TextSize]: string } = {
  "2x": "h1",
  xl: "h2",
  lg: "h3",
  md: "h4",
  sm: "h5",
  xs: "h6",
};

export const getDisplayTagBySize = (size: TextSize) => displaySizeToTag[size];
