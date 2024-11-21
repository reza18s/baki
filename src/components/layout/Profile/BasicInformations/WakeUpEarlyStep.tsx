import { useForm } from 'react-hook-form';
import RadioButton from '../../../shared/Buttons/RadioButton';
import * as SolarIconSet from 'solar-icon-set';
import Button from '../../../base/Button/Button';
import { useLocalStore } from '@/store/useLocalStore';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Toast } from '@/components/base/toast/toast';

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
      toast.custom(
        (t) => (
          <Toast t={t} type="error">
            لطفا یک گزینه را انتخاب کنید
          </Toast>
        ),
        { duration: 1500 },
      );
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
