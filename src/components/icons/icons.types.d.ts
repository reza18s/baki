import { BaseProps } from '../base/type/base';

export type IconProps = React.SVGProps<SVGSVGElement> &
  BaseProps & { stroke?: string };
