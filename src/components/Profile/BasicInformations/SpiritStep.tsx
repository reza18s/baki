import { useForm } from 'react-hook-form';
import RadioButton from '@/components/shared/Buttons/RadioButton';
import * as SolarIconSet from 'solar-icon-set';
import Button from '@/components/base/Button/Button';
import { useLocalStore } from '@/store/useLocalStore';
import { useHistory } from 'react-router';
import { useUpdateUserMutation } from '@/graphql/generated/graphql.codegen';
import toast from 'react-hot-toast';
import { Toast } from '@/components/base/toast/toast';
import { useEffect } from 'react';
import { convertJalaliToGregorian } from '@/utils/datetime';

export default function SpiritStep() {
  const { control, setValue, watch } = useForm();
  const [updateUser] = useUpdateUserMutation();
  const userInfo = useLocalStore((store) => store.userInfo);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  useEffect(() => {
    setValue('spiritStatus', userInfo.spiritStatus);
  }, [userInfo.spiritStatus]);
  const hs = useHistory();
  const handleSubmit = () => {
    updateUserInfo({ spiritStatus: watch('spiritStatus') });
    updateUser({
      variables: {
        gender: userInfo.gender,
        maritalStatus: userInfo.maritalStatus,
        birthday: convertJalaliToGregorian(userInfo.birthdate),
        smokeStatus: userInfo.smokeStatus,
        sportsStatus: userInfo.sportsStatus,
        spiritStatus: watch('spiritStatus'),
        amountOfEarlyRising: userInfo.AmountOfEarlyRising,
      },
      onCompleted: () => {
        toast.custom(
          (t) => (
            <Toast t={t} type="success">
              اطلاعات شما با موفقیت ثبت شد
            </Toast>
          ),
          { duration: 1500 },
        );
        setTimeout(() => {
          hs.push('/profile/complete_profile');
        }, 1000);
      },
      onError: (err) => {
        console.log(err);
        toast.custom(
          (t) => (
            <Toast t={t} type="error">
              مشکلی پیش آمده است لطفا دوباره امتحان کنید
            </Toast>
          ),
          { duration: 1500 },
        );
      },
    });
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col items-center">
          <SolarIconSet.MaskHapply size={72} />
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-[32px] font-bold text-brand-black">روحیه</h1>
            <p className="text-sm font-medium leading-tight text-gray-500">
              یکی از گزینه‌های زیر را انتخاب کنید.
            </p>
          </div>
        </div>
        <RadioButton
          control={control}
          items={[
            { label: 'درون‌گرا', value: 'introvert' },
            { label: 'برون‌گرا', value: 'extroverted' },
          ]}
          name="spiritStatus"
        />
      </div>
      <Button onClick={handleSubmit}>پایان</Button>
    </div>
  );
}
