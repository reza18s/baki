import { IoEye } from "react-icons/io5";
import RadioButton from "../../shared/Buttons/RadioButton";
import { useLocalStore } from "../../../store/useLocalStore";
import { Gender } from "@/graphql/generated/graphql.codegen";
export default function GetGender(props: { control: any; value: string }) {
  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);

  return (
    <div className="flex h-[calc(100%-32px)] w-full flex-col justify-between">
      <div className="flex flex-col gap-y-[16px]">
        <h1 className="text-[32px] font-bold text-brand-black">جنسیت</h1>
        <p className="mb-10 text-sm font-medium leading-tight text-[#64748B]">
          از بین گزینه های زیر یکی را انتخاب کنید .
        </p>
        <RadioButton
          control={props.control}
          items={[
            { label: "زن", value: "femail" },
            { label: "مرد", value: "mail" },
          ]}
          name="gender"
        />
      </div>
      {/* Footer */}
      <div className="mb-5 flex w-full items-center justify-between">
        <div className="flex min-w-fit items-center justify-between gap-x-[8px]">
          <IoEye size={24} />
          <p className="w-[200px] pl-[29px] text-xs font-medium leading-none text-[#1a1d1e]">
            این نام در پروفایل شما نمایش داده خواهد شد .
          </p>
        </div>
        <button
          disabled={props.value?.length < 1}
          onClick={() => {
            updateUserInfo({ gender: props.value as Gender });
            handleNextStep();
          }}
          className={`px-[20px] py-[16px] ${
            props.value?.length > 1 ? "bg-[#ffcc4e]" : "bg-slate-100"
          } rounded-[12px] font-bold leading-none text-slate-400`}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
