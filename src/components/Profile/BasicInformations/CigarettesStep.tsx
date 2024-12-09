import { useForm } from 'react-hook-form';
import RadioButton from '@/components/shared/Buttons/RadioButton';
import Button from '@/components/base/Button/Button';
import { LiaSmokingSolid } from 'react-icons/lia';
import { useLocalStore, UserInfo } from '@/store/useLocalStore';
import { useEffect } from 'react';
import { customToast } from '@/components/base/toast';

export default function CigarettesStep(props: {
  handleNextStep: (user?: Partial<UserInfo>) => void;
}) {
  const { control, watch, setValue } = useForm();

  const userInfo = useLocalStore((store) => store.userInfo);

  useEffect(() => {
    setValue('smokeStatus', userInfo.smokeStatus);
  }, [userInfo.smokeStatus]);
  const handleSubmit = () => {
    if (watch('smokeStatus')) {
      props.handleNextStep({
        smokeStatus: watch('smokeStatus'),
      });
    } else {
      customToast('لطفا یک گزینه را انتخاب کنید', 'error');
    }
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col items-center">
          <LiaSmokingSolid className="rotate-12" size={72} />
          <div className="flex flex-col items-center gap-y-4">
            <h1 className="text-[32px] font-bold text-brand-black">سیگار</h1>
            <p className="text-sm font-medium leading-tight text-gray-500">
              یکی از گزینه‌های زیر را انتخاب کنید.
            </p>
          </div>
        </div>
        <RadioButton
          control={control}
          items={[
            { label: 'به طور منظم', value: 'regularly' },
            { label: 'بعضی‌وقت‌ها', value: 'sometimes' },
            { label: 'هرگز', value: 'never' },
          ]}
          name="smokeStatus"
        />
      </div>
      <Button onClick={handleSubmit}>ذخیره و بستن</Button>
    </div>
  );
}
