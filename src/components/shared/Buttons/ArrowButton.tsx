import { Link } from 'react-router-dom';
import * as SolarIconSet from 'solar-icon-set';

export default function ArrowButton(props: {
  text: any;
  onClick?: () => void;
  className?: string;
  icon?: any;
  arrowText?: string;
  url?: string;
}) {
  return (
    <Link
      to={props.url || '/profile'}
      className={`flex w-full items-center justify-between rounded-[12px] border border-slate-300 px-6 py-[12px] text-brand-black ${props.className}`}
      onClick={props.onClick}
    >
      <div className="flex items-center gap-x-2">
        {props.icon}
        <p className="text-sm font-medium">{props.text}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-bold text-[#94A3B8]">{props.arrowText}</p>
        <SolarIconSet.AltArrowLeft size={24} />
      </div>
    </Link>
  );
}
