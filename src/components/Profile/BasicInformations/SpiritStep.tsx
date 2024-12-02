import { useForm } from 'react-hook-form';
import RadioButton from '@/components/shared/Buttons/RadioButton';
import * as SolarIconSet from 'solar-icon-set';
import Button from '@/components/base/Button/Button';
import { useLocalStore } from '@/store/useLocalStore';
import { useHistory } from 'react-router';
import { useUpdateUserMutation } from '@/graphql/generated/graphql.codegen';
import { useEffect } from 'react';
import { convertJalaliToGregorian } from '@/utils/datetime';
import { customToast } from '@/components/base/toast';

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
    if (watch('spiritStatus')) {
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
          customToast('اطلاعات شما با موفقیت ثبت شد', 'success');
          setTimeout(() => {
            hs.goBack();
          }, 1000);
        },
        onError: () => {
          customToast('مشکلی پیش آمده است لطفا دوباره امتحان کنید', 'error');
        },
      });
    } else {
      customToast('لطفا یک گزینه را انتخاب کنید', 'error');
    }
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
