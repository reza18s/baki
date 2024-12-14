import { Link } from 'react-router-dom';

interface CustomCardProps {
  icon: JSX.Element;
  status: boolean;
  title: string;
  description: string;
  url: string;
}

const CustomCard = ({
  icon,
  status,
  title,
  description,
  url,
}: CustomCardProps) => {
  return (
    <Link
      to={url}
      className="inline-flex h-[180px] w-full flex-col items-center justify-start gap-4 rounded-xl border border-slate-300 py-6"
    >
      <div
        className={`inline-flex items-center justify-center gap-2 rounded-[40px] p-4 text-brand-black ${
          status ? 'bg-brand-green text-white' : 'bg-brand-yellow text-brand-black'
        }`}
      >
        {icon}
      </div>
      <div className="flex flex-col items-center justify-start gap-2">
        <div className="text-center font-['IRANSansXFaNum'] text-base font-bold leading-normal text-brand-black">
          {title}
        </div>
        <div className="text-center font-['IRANSansXFaNum'] text-sm font-medium leading-tight text-brand-black">
          {description}
        </div>
      </div>
    </Link>
  );
};

export default CustomCard;
