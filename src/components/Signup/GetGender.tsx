import { IoEye } from 'react-icons/io5';
import RadioButton from '../shared/Buttons/RadioButton';
import { useLocalStore } from '../../store/useLocalStore';
import { Gender } from '@/graphql/generated/graphql.codegen';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Toast } from '@/components/base/toast/toast';
import Button from '../base/Button/Button';
import { IcLockOpen } from '../icons/IcLockOpen';
export default function GetGender() {
  const { control, watch, setValue } = useForm();
  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  const userInfo = useLocalStore((store) => store.userInfo);
  useEffect(() => {
    setValue('gender', userInfo.gender);
  }, [userInfo.gender]);
  return (
    <div className="flex h-[calc(100%)] w-full flex-col justify-between">
      <div className="flex flex-col gap-4 pt-10">
        <h1 className="text-[32px] font-bold text-brand-black">جنسیت</h1>
        <p className="mb-6 text-sm font-medium leading-tight text-gray-500">
          از بین گزینه های زیر یکی را انتخاب کنید.
        </p>
        <RadioButton
          control={control}
          items={[
            { label: 'زن', value: 'female' },
            { label: 'مرد', value: 'male' },
          ]}
          name="gender"
        />
      </div>
      {/* Footer */}
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center justify-between gap-x-[8px]">
          <IcLockOpen />
          <p className="text-xs font-medium leading-none text-brand-black">
            {'شما میتوانید این بخش را در آینده تغییر دهید.'}
          </p>
        </div>
        <Button
          disabled={watch('gender')?.length < 0}
          onClick={() => {
            if (watch('gender')) {
              updateUserInfo({ gender: watch('gender') as Gender });
              handleNextStep();
            } else {
              toast.custom(
                (t) => (
                  <Toast t={t} type="error">
                    لطفا یک گزینه را انتخاب کنید
                  </Toast>
                ),
                { duration: 1500 },
              );
            }
          }}
          className={`h-12 rounded-[12px] px-5 py-4 text-sm font-bold leading-none text-brand-black`}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
