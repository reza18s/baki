import { useForm } from 'react-hook-form';
import RadioButton from '@/components/shared/Buttons/RadioButton';
import * as SolarIconSet from 'solar-icon-set';
import Button from '@/components/base/Button/Button';
import { useLocalStore, UserInfo } from '@/store/useLocalStore';
import { useEffect } from 'react';
import { customToast } from '@/components/base/toast';

export default function SpiritStep(props: {
  handleNextStep: (user?: Partial<UserInfo>) => void;
  loading: boolean;
}) {
  const { control, setValue, watch } = useForm<{
    spiritStatus?: 'extroverted' | 'introvert';
  }>();
  const userInfo = useLocalStore((store) => store.userInfo);
  useEffect(() => {
    setValue('spiritStatus', userInfo.spiritStatus);
  }, [userInfo.spiritStatus]);
  const handleSubmit = () => {
    if (watch('spiritStatus')) {
      props.handleNextStep({ spiritStatus: watch('spiritStatus') });
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
      <Button className="h-12" loading={props.loading} onClick={handleSubmit}>
        ذخیره و بستن
      </Button>
    </div>
  );
}
