import { Controller } from 'react-hook-form';
import * as SolarIconSet from 'solar-icon-set';
import { IoMdLock } from 'react-icons/io';
import Button from '../base/Button/Button';

export default function GetPhoneNumber(props: {
  control: any;
  phoneNumber: string;
  handleSignup: () => void;
  loading: boolean;
}) {
  return (
    <div className="flex h-[calc(100%)] flex-col justify-between gap-y-[40px]">
      <div className="flex flex-col gap-4 pt-10">
        <h1 className="text-[32px] font-bold text-brand-black">شماره موبایل</h1>
        <p className="text-sm font-medium leading-tight text-gray-500">
          ما با اطمینان از واقعی بودن همه افرادی که در باکی هستند از کاربران خود
          محافظت می کنیم.
        </p>
        <div
          className={`mt-6 flex h-12 items-center justify-between rounded-xl border-[1.5px] border-black py-4 pl-3 pr-4 ${props.phoneNumber?.length !== 0 ? 'border-b-4' : ''}`}
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-[8px]">
          {/* <SolarIconSet.LockKeyhole size={24} /> */}
          <IoMdLock size={30} className="h-6 w-6" />
          <p className="pl-9 pr-1 font-iransans text-xs font-medium leading-none text-brand-black">
            شماره موبایل شما در پروفایل شما نمایش داده نخواهد شد.
          </p>
        </div>
        <Button
          loading={props.loading}
          disabled={props.phoneNumber?.length !== 11}
          onClick={props.handleSignup}
          className={`px-5 py-4 ${
            props.phoneNumber?.length === 11
              ? 'bg-brand-yellow text-black'
              : 'bg-slate-100 text-brand-black'
          } rounded-[12px] font-bold leading-none`}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
