import { useForm } from 'react-hook-form';
import RadioButton from '@/components/shared/Buttons/RadioButton';
import * as SolarIconSet from 'solar-icon-set';
import Button from '@/components/base/Button/Button';
import { useLocalStore, UserInfo } from '@/store/useLocalStore';
import { useEffect } from 'react';
import { customToast } from '@/components/base/toast';

export default function MaritalStatusStep(props: {
  handleNextStep: (user?: Partial<UserInfo>) => void;
}) {
  const { control, watch, setValue } = useForm();

  const userInfo = useLocalStore((store) => store.userInfo);

  useEffect(() => {
    setValue('maritalStatus', userInfo.maritalStatus);
  }, [userInfo.maritalStatus]);

  const handleSubmit = () => {
    if (watch('maritalStatus')) {
      props.handleNextStep({ maritalStatus: watch('maritalStatus') });
    } else {
      customToast('لطفا یک گزینه را انتخاب کنید', 'error');
    }
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col items-center">
          <SolarIconSet.Heart size={72} />
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-[32px] font-bold text-brand-black">
              وضعیت تاهل
            </h1>
            <p className="text-sm font-medium leading-tight text-gray-500">
              یکی از گزینه‌های زیر را انتخاب کنید.
            </p>
          </div>
        </div>
        <RadioButton
          control={control}
          items={[
            { label: 'متاهل', value: 'married' },
            { label: 'مجرد', value: 'single' },
          ]}
          name="maritalStatus"
        />
      </div>
      {/* Footer */}
      <Button onClick={handleSubmit}>ذخیره و بستن</Button>
    </div>
  );
}
