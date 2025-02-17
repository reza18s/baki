import { Control, Controller } from 'react-hook-form';
import * as SolarIconSet from 'solar-icon-set';
import Button from '../base/Button/Button';
import { IcLock } from '../icons/IcLock';
import { Input } from '../shared/Inputs/input';

export default function GetPhoneNumber(props: {
  control: Control<
    {
      phoneNumber: string;
    },
    any
  >;
  phoneNumber: string;
  handleSignup: () => void;
  loading: boolean;
  error?: string;
}) {
  return (
    <div className="flex h-[calc(100%)] flex-col justify-between gap-y-[40px]">
      <div className="flex flex-col gap-4 pt-10">
        <h1 className="text-[32px] font-bold text-brand-black">شماره موبایل</h1>
        <p className="text-sm font-medium leading-tight text-gray-500">
          ما با اطمینان از واقعی بودن همه افرادی که در باکی هستند از کاربران خود
          محافظت می کنیم.
        </p>
        <Controller
          name="phoneNumber"
          control={props.control}
          render={({ field }) => (
            <Input
              {...field}
              type="tel"
              className="pl-2"
              icon={
                <SolarIconSet.Phone
                  size={20}
                  color={props.error ? 'red' : ''}
                />
              }
              placeholder="09111111111"
              maxLength={11}
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
      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-end gap-x-[8px]">
          <span>
            <IcLock className="size-6" />
          </span>

          <p className="pl-9 pr-1 font-iransans text-xs font-medium leading-none text-brand-black">
            شماره موبایل شما در پروفایل شما نمایش داده نخواهد شد.
          </p>
        </div>
        <Button
          loading={props.loading}
          disabled={props.phoneNumber?.length !== 11}
          onClick={props.handleSignup}
          className={`h-12 px-5 py-4 ${
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
