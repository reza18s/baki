import { useForm } from 'react-hook-form';
import * as SolarIconSet from 'solar-icon-set';
import { useLocalStore } from '@/store/useLocalStore';
import { useEffect } from 'react';
import Button from '@/components/base/Button/Button';
import RadioButton from '@/components/shared/Buttons/RadioButton';
import { customToast } from '@/components/base/toast';

export default function WakeUpEarlyStep(props: { handleNextStep: () => void }) {
  const { control, watch, setValue } = useForm();

  const userInfo = useLocalStore((store) => store.userInfo);

  useEffect(() => {
    setValue('AmountOfEarlyRising', userInfo.AmountOfEarlyRising);
  }, [userInfo.AmountOfEarlyRising]);

  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);

  const handleSubmit = () => {
    if (watch('AmountOfEarlyRising')) {
      updateUserInfo({
        AmountOfEarlyRising: watch('AmountOfEarlyRising'),
      });
      props.handleNextStep();
    } else {
      customToast('لطفا یک گزینه را انتخاب کنید', 'error');
    }
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col items-center">
          <SolarIconSet.SunFog size={72} />
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-[32px] font-bold text-brand-black">سحرخیزی</h1>
            <p className="text-sm font-medium leading-tight text-gray-500">
              یکی از گزینه‌های زیر را انتخاب کنید.
            </p>
          </div>
        </div>
        <RadioButton
          control={control}
          items={[
            { label: 'سحرخیز', value: 'wakeUpEarly' },
            { label: 'خواب‌آلود', value: 'sleepy' },
            { label: 'آن‌تایم', value: 'onTime' },
          ]}
          name="AmountOfEarlyRising"
        />
      </div>
      {/* Footer */}
      <Button onClick={handleSubmit}>بعدی</Button>
    </div>
  );
}
