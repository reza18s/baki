import { Link } from "react-router-dom";
import * as SolarIconSet from 'solar-icon-set';

export default function IdentityVerification() {
  return (
    <div className='w-full flex flex-col items-center gap-y-3 h-full pb-16 overflow-y-auto'>
      {/* Head */}
      <Link to="/profile" className='w-full flex items-center py-4 px-6 justify-between shadow-md shadow-zinc-50 text-brand-black'>
        <SolarIconSet.AltArrowRight size={24} />
        <h1 className='text-lg font-bold my-auto'>
          ویرایش پروفایل
        </h1>
        <div></div>
      </Link>
      {/* Body */}
      <div className='w-full px-6 flex flex-col items-center gap-y-3'>
      </div>
    </div>
  );
}