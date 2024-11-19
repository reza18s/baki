import { useForm } from 'react-hook-form';
import RadioButton from '../../../shared/Buttons/RadioButton';
import * as SolarIconSet from 'solar-icon-set';
import Button from '../../../base/Button/Button';
import { useLocalStore } from '@/store/useLocalStore';
import { useHistory } from 'react-router';
import { useUpdateUserMutation } from '@/graphql/generated/graphql.codegen';
import SweetAlertToast from '@/components/shared/Toasts/SweetAlertToast';

export default function SpiritStep() {
  const { control, watch } = useForm();
  const [updateUser, { loading }] = useUpdateUserMutation();
  const hs = useHistory();
  const userInfo = useLocalStore((store) => store.userInfo);

  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);

  const handleSubmit = () => {
    updateUser({
      variables: {
        gender: userInfo.gender,
        maritalStatus: userInfo.maritalStatus,
        birthday: userInfo.birthdate,
        smokeStatus: userInfo.smokeStatus,
        sportsStatus: userInfo.sportsStatus,
        amountOfEarlyRising: userInfo.AmountOfEarlyRising,
      },
      onCompleted: (data) => {
        SweetAlertToast.fire({
          icon: 'success',
          title: 'اطلاعات شما با موفقیت ثبت شد',
        });
        setTimeout(() => {
          hs.push('/profile/complate_profile');
        }, 1000);
      },
      onError: (err) => {
        SweetAlertToast.fire({
          icon: 'error',
          title: 'خطا',
          text: 'مشکلی پیش آمده است لطفا دوباره امتحان کنید',
        });
      },
    });
  };

  return (
    <div className="mx-auto flex h-[90%] w-full flex-col justify-between gap-y-[40px] pt-10">
      <div className="flex flex-col gap-y-[60px]">
        <div className="flex flex-col items-center">
          <SolarIconSet.MaskHapply size={72} />
          <div className="flex flex-col items-center gap-y-[16px]">
            <h1 className="text-[32px] font-bold text-brand-black">روحیه</h1>
            <p className="text-sm font-medium leading-tight text-[#64748B]">
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
          name="SpiritStep"
        />
      </div>
      {/* Footer */}
      <Button onClick={handleSubmit}>پایان</Button>
    </div>
  );
}
