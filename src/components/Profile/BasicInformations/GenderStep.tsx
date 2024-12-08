import { useForm } from 'react-hook-form';
import RadioButton from '@/components/shared/Buttons/RadioButton';
import * as SolarIconSet from 'solar-icon-set';
import Button from '@/components/base/Button/Button';
import { useLocalStore, UserInfo } from '@/store/useLocalStore';
import { useEffect } from 'react';
import { customToast } from '@/components/base/toast';
import { Gender } from '@/graphql/generated/graphql.codegen';

export default function GenderStep(props: {
  handleNextStep: (user?: Partial<UserInfo>) => void;
}) {
  const { control, watch, setValue } = useForm<{ gender?: Gender }>();

  const userInfo = useLocalStore((store) => store.userInfo);

  useEffect(() => {
    setValue('gender', userInfo.gender);
  }, [userInfo.gender]);
  const handleSubmit = () => {
    if (watch('gender')) {
      props.handleNextStep({ gender: watch('gender') });
    } else {
      customToast('لطفا یک گزینه را انتخاب کنید', 'error');
    }
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col items-center gap-4">
          <SolarIconSet.UserId size={72} />
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-[32px] font-bold text-brand-black">جنسیت</h1>
            <p className="text-sm font-medium leading-tight text-gray-500">
              یکی از گزینه‌های زیر را انتخاب کنید.
            </p>
          </div>
        </div>
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
      <Button onClick={handleSubmit}>بعدی</Button>
    </div>
  );
}
