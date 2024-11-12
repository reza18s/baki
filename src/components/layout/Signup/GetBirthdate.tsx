import { IoEye } from 'react-icons/io5';
import MonthPicker from '../../shared/Inputs/MonthPicker';
import { useLocalStore } from '../../../store/useLocalStore';
import { Controller, useForm } from 'react-hook-form';

export default function GetBirthdate() {
  const { control, watch } = useForm<{
    month?: { label: string; key: number };
    year: string;
  }>({
    defaultValues: {
      year: '',
    },
  });

  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);

  return (
    <div className="flex h-[calc(100%)] w-full flex-col justify-between">
      <div className="flex flex-col gap-y-[16px]">
        <h1 className="text-[32px] font-bold text-brand-black">ماه تولد</h1>
        <p className="mb-10 text-sm font-medium leading-tight text-[#64748B]">
          نشان زودیاک شما با توجه به ماه تولد شما تعیین خواهد شد .
        </p>
        <div className="flex w-full items-center justify-center gap-x-3">
          <div>
            <h2 className="mr-1 text-sm font-bold text-[#64748B]">ماه</h2>
            <MonthPicker name="month" control={control} />
          </div>
          <div>
            <h2 className="mr-1 text-sm font-bold text-[#64748B]">سال</h2>
            <Controller
              name="year"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  dir="ltr"
                  type="tel"
                  className="h-[48px] w-[67px] rounded-[12px] border-[1.5px] border-[#1a1d1e] bg-white text-center text-base font-bold text-[#1a1d1e] outline-none"
                  maxLength={4}
                  min={1320}
                  placeholder="1380"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="mb-5 flex w-full items-center justify-between">
        <div className="flex min-w-fit items-center justify-between gap-x-[8px]">
          <IoEye size={24} />
          <p className="w-[200px] pl-[29px] text-xs font-medium leading-none text-[#1a1d1e]">
            ما فقط سن شما را به کاربران نشان می دهیم و نه تاریخ تولد .
          </p>
        </div>
        <button
          disabled={!watch('year') || watch('year').length < 4}
          onClick={() => {
            updateUserInfo({
              birthdate: `${watch('year')}-${watch('month')?.key}`,
            });
            handleNextStep();
          }}
          className={`px-[20px] py-[16px] ${
            watch('year').length === 4 ? 'bg-[#ffcc4e]' : 'bg-slate-100'
          } rounded-[12px] font-bold leading-none text-slate-400`}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
