import * as SolarIconSet from 'solar-icon-set';
import { IoEye } from 'react-icons/io5';
import TextInput from '../../shared/Inputs/TextInput';
import { useLocalStore } from '../../../store/useLocalStore';

export default function GetName(props: { control: any; value: string }) {
  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  return (
    <div className="flex h-[calc(100%)] w-full flex-col justify-between">
      <div className="flex flex-col gap-y-[16px]">
        <h1 className="text-[32px] font-bold text-brand-black">نام</h1>
        <p className="mb-10 text-sm font-medium leading-tight text-[#64748B]">
          شما می توانید نام خود را در آینده تغییر دهید .
        </p>
        <TextInput
          control={props.control}
          icon={<SolarIconSet.UserRounded size={30} />}
          name="name"
          value={props.value}
          placeholder="نام خود را وارد کنید"
        />
      </div>
      {/* Footer */}
      <div className="mb-5 flex w-full items-center justify-between">
        <div className="flex min-w-fit items-center justify-between gap-x-[8px]">
          <IoEye size={24} />
          <p className="text-xs font-medium leading-none text-[#1a1d1e]">
            این نام در پروفایل شما نمایش داده خواهد شد .
          </p>
        </div>
        <button
          disabled={props.value?.length < 1}
          onClick={() => {
            updateUserInfo({ name: props.value });
            handleNextStep();
          }}
          className={`px-[20px] py-[16px] ${
            props.value?.length > 1 ? 'bg-[#ffcc4e]' : 'bg-slate-100'
          } rounded-[12px] font-bold leading-none text-slate-400`}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
