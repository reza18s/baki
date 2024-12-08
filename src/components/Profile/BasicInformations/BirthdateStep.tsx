import { useForm } from 'react-hook-form';
import * as SolarIconSet from 'solar-icon-set';
import Button from '@/components/base/Button/Button';
import { useLocalStore, UserInfo } from '@/store/useLocalStore';
import { useEffect } from 'react';
import { months } from '@/constants';
import MonthPicker from '@/components/shared/Inputs/MonthPicker';
import { customToast } from '@/components/base/toast';

export default function BirthdateStep(props: {
  handleNextStep: (user?: Partial<UserInfo>) => void;
}) {
  const { control, watch, register, setValue } = useForm();

  const userInfo = useLocalStore((store) => store.userInfo);

  useEffect(() => {
    setValue('year', userInfo.birthdate?.split('/')[0]);
    setValue(
      'month',
      months.find((el) => el.key == +userInfo.birthdate?.split('/')[1]),
    );
  }, [userInfo.birthdate]);
  const handleSubmit = () => {
    if (watch('year') && watch('month')) {
      props.handleNextStep({
        birthdate: `${watch('year')}/${watch('month')?.key}`,
      });
    } else {
      customToast('لطفا یک گزینه را انتخاب کنید', 'error');
    }
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col items-center gap-4">
          <SolarIconSet.Calendar size={72} />
          <div className="flex flex-col items-center gap-2 p-2">
            <h1 className="text-[32px] font-bold text-brand-black">تولد</h1>
            <p className="text-sm font-medium leading-tight text-gray-500">
              سال و ماه تولد خود را انتخاب کنید.
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-3">
          <div>
            <h2 className="mr-1 text-sm font-bold text-gray-500">ماه</h2>
            <MonthPicker name="month" control={control} />
          </div>
          <div>
            <h2 className="mr-1 text-sm font-bold text-gray-500">سال</h2>
            <input
              {...register('year')}
              dir="ltr"
              type="tel"
              className="h-[48px] w-[67px] rounded-[12px] border-[1.5px] border-brand-black bg-white text-center text-base font-bold text-brand-black outline-none"
              maxLength={4}
              min={1320}
              placeholder="1380"
            />
          </div>
        </div>
      </div>
      {/* Footer */}
      <Button onClick={handleSubmit}>بعدی</Button>
    </div>
  );
}
