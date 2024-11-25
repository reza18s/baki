import { useForm } from 'react-hook-form';
import RadioButton from '@/components/shared/Buttons/RadioButton';
import Button from '@/components/base/Button/Button';
import { LiaSmokingSolid } from 'react-icons/lia';
import { useLocalStore } from '@/store/useLocalStore';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Toast } from '@/components/base/toast/toast';

export default function CigarettesStep(props: { handleNextStep: () => void }) {
  const { control, watch, setValue } = useForm();

  const userInfo = useLocalStore((store) => store.userInfo);

  useEffect(() => {
    setValue('smokeStatus', userInfo.smokeStatus);
  }, [userInfo.smokeStatus]);

  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);

  const handleSubmit = () => {
    if (watch('smokeStatus')) {
      updateUserInfo({
        smokeStatus: watch('smokeStatus'),
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
      <Button onClick={handleSubmit}>بعدی</Button>
    </div>
  );
}
