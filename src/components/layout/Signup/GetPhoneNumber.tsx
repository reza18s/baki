import { Controller } from 'react-hook-form';
import * as SolarIconSet from 'solar-icon-set';
import { IoMdLock } from "react-icons/io";

export default function GetPhoneNumber(props: {
  control: any;
  phoneNumber: string;
  handleSignup: () => void;
}) {
  return (
    <div className="flex h-[calc(100%)] flex-col justify-between gap-y-[40px]">
      <div className="flex flex-col gap-y-[16px]">
        <h1 className="text-[32px] font-bold text-brand-black">شماره موبایل</h1>
        <p className="text-sm font-medium leading-tight text-[#64748B]">
          ما با اطمینان از واقعی بودن همه افرادی که در باکی هستند از کاربران خود
          محافظت می کنیم.
        </p>
        <div
          className={`flex items-center justify-between rounded-[12px] border-[1.5px] border-black h-[48px] py-[16px] pl-[12px] pr-[16px] mt-[24px] ${props.phoneNumber?.length !== 0 ? 'border-b-[4px]' : ''}`}
        >
          <SolarIconSet.Phone size={30} />
          <Controller
            name="phoneNumber"
            control={props.control}
            defaultValue={null}
            render={({ field }) => (
              <input
                {...field}
                type="tel"
                dir="ltr"
                placeholder="09111111111"
                maxLength={11}
                className="w-full border-none bg-white outline-none"
                onKeyDown={(e) => {
                  if (!/^\d$/.test(e.key) && e.key !== 'Backspace') {
                    e.preventDefault(); // Prevent invalid characters
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ''); // Filter non-numeric input
                  field.onChange(value);
                }}
              />
            )}
          />
        </div>
      </div>
      {/* Footer */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-x-[8px]">
          {/* <SolarIconSet.LockKeyhole size={24} /> */}
          <IoMdLock size={30} className='w-[24px] h-[24px]' />
          <p className="text-xs font-medium font-['IRANSansXFaNum'] leading-none text-[#1a1d1e] pr-1 pl-9">
            شماره موبایل شما در پروفایل شما نمایش داده نخواهد شد.
          </p>
        </div>
        <button
          disabled={props.phoneNumber?.length !== 11}
          onClick={props.handleSignup}
          className={`px-[20px] py-[16px] ${props.phoneNumber?.length === 11 ? 'bg-[#ffcc4e] text-black' : 'bg-slate-100 text-slate-400'
            } rounded-[12px] font-bold leading-none`}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
