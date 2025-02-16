import { IoEye } from 'react-icons/io5';
import MonthPicker from '../shared/Inputs/MonthPicker';
import { useLocalStore } from '../../store/useLocalStore';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { months } from '@/constants';
import toast from 'react-hot-toast';
import { Toast } from '@/components/base/toast/toast';
import Button from '../base/Button/Button';
import Modal from '../base/Modal/Modal';
import { calculateAgeFromJalali } from '@/utils/datetime';
import { IcLockOpen } from '../icons/IcLockOpen';
import { IcLock } from '../icons/IcLock';

export default function GetBirthdate() {
  const { control, watch, setValue } = useForm<{
    month?: { label: string; key: number };
    year: string;
  }>({
    defaultValues: {
      year: '',
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useLocalStore((store) => store.userInfo);

  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  useEffect(() => {
    setValue('year', userInfo.birthdate?.split('/')[0]);
    setValue(
      'month',
      months.find((el) => el.key == +userInfo.birthdate?.split('/')[1]),
    );
  }, [userInfo.birthdate]);

  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);

  return (
    <div className="flex h-[calc(100%)] w-full flex-col justify-between">
      <div className="flex flex-col gap-4 pt-10">
        <h1 className="text-[32px] font-bold text-brand-black">ماه تولد</h1>
        <p className="text-sm font-medium leading-tight text-gray-500">
          نشان زودیاک شما با توجه به ماه تولد شما تعیین خواهد شد .
        </p>
        <div className="mt-6 flex w-full items-center justify-center gap-x-3">
          <div>
            <h2 className="mr-1 text-sm font-bold text-gray-500">ماه</h2>
            <MonthPicker control={control} />
          </div>
          <div>
            <h2 className="mr-1 text-sm font-bold text-gray-500">سال</h2>
            <Controller
              name="year"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  dir="ltr"
                  type="tel"
                  className="h-[48px] w-[67px] rounded-[12px] border-[1.5px] border-brand-black bg-white text-center text-base font-bold text-brand-black outline-none"
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
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center justify-between gap-x-[8px]">
          <IcLock className="size-8" />
          <p className="pl-[29px] text-xs font-medium leading-none text-brand-black">
            ما فقط سن شما را به کاربران نشان می دهیم و نه تاریخ تولد.
          </p>
        </div>
        <Button
          disabled={!watch('year') || watch('year').length < 4}
          onClick={() => {
            if (watch('year') && watch('month')) {
              setIsOpen(true);
            } else {
              toast.custom(
                (t) => (
                  <Toast t={t} type="error">
                    لطفا روز تولد خود را وارد کنید
                  </Toast>
                ),
                { duration: 1500 },
              );
            }
          }}
          className={`h-12 px-5 py-4 ${
            watch('year')?.length === 4 ? 'bg-brand-yellow' : 'bg-slate-100'
          } rounded-[12px] font-bold leading-none text-brand-black`}
        >
          بعدی
        </Button>
      </div>
      <Modal
        className="flex w-[90%] flex-col gap-6 rounded-3xl bg-white px-6 pb-2 pt-6"
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
      >
        <h1 className="text-center text-2xl font-bold">
          شما{' '}
          {watch('year') &&
            watch('month') &&
            calculateAgeFromJalali(
              `${watch('year')}/${watch('month')?.key}`,
            )}{' '}
          سال دارید.
        </h1>
        <div className="flex flex-col">
          <Button
            className="h-12 text-sm"
            onClick={() => {
              if (watch('year') && watch('month')) {
                updateUserInfo({
                  birthdate: `${watch('year')}/${watch('month')?.key}`,
                });
                handleNextStep();
              } else {
                toast.custom(
                  (t) => (
                    <Toast t={t} type="error">
                      لطفا روز تولد خود را وارد کنید
                    </Toast>
                  ),
                  { duration: 1500 },
                );
              }
            }}
          >
            درسته!
          </Button>
          <Button
            variant="text"
            className="h-12 text-sm"
            onClick={() => setIsOpen(false)}
          >
            تغییر تاریخ تولد
          </Button>
        </div>
      </Modal>
    </div>
  );
}
