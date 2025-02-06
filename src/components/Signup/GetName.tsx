import * as SolarIconSet from 'solar-icon-set';
import { IoEye } from 'react-icons/io5';
import TextInput from '../shared/Inputs/TextInput';
import { useLocalStore } from '../../store/useLocalStore';
import Button from '../base/Button/Button';

export default function GetName(props: { control: any; value: string }) {
  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  return (
    <div className="flex h-[calc(100%)] w-full flex-col justify-between">
      <div className="flex flex-col gap-4 pt-10">
        <h1 className="text-[32px] font-bold text-brand-black">نام</h1>
        <p className="text-sm font-medium leading-tight text-gray-500">
          شما می توانید نام خود را در آینده تغییر دهید.
        </p>
        <TextInput
          className="mt-6"
          control={props.control}
          icon={<SolarIconSet.UserRounded size={30} />}
          name="name"
          value={props.value}
          placeholder="نام خود را وارد کنید"
        />
      </div>
      {/* Footer */}
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center justify-between gap-x-[8px]">
          <IoEye size={24} />
          <p className="text-xs font-medium text-brand-black">
            این نام در پروفایل شما نمایش داده خواهد شد.
          </p>
        </div>
        <Button
          disabled={props.value?.length < 1}
          onClick={() => {
            updateUserInfo({ name: props.value });
            handleNextStep();
          }}
          className={`h-12 rounded-[12px] px-5 py-4 text-sm font-bold leading-none text-brand-black`}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
