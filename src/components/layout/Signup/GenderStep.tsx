import { Controller, FieldValues } from "react-hook-form";
import * as SolarIconSet from "solar-icon-set";
import { IoEye } from "react-icons/io5";

export default function GenderStep(props: {
  control: any,
  name: string,
  handleSignup: () => void,
}) {
  return (
    <div className="flex flex-col gap-y-[40px] w-full">
      <div className="flex flex-col gap-y-[16px]">
        <h1 className="text-[32px] font-bold text-brand-black">
          جنسیت
        </h1>
        <p className="text-sm font-medium leading-tight text-[#64748B]">
          از بین گزینه های زیر یکی را انتخاب کنید .
        </p>
      </div>
      <div className="flex flex-col gap-y-3">
        <p className={`rounded-[12px] flex items-center justify-between py-[16px] pr-[16px] pl-[12px] bg-slate-100 ${props.name?.length !== 0 ? "bg-brand-yellow" : ""}`}>
          مرد
        </p>
        <p className={`rounded-[12px] flex items-center justify-between py-[16px] pr-[16px] pl-[12px] bg-slate-100 ${props.name?.length !== 0 ? "bg-brand-yellow" : ""}`}>
          زن
        </p>
      </div>
      {/* Footer */}
      <div className="absolute bottom-[24px] flex items-center justify-between gap-x-[16px] min-w-fit w-[90%] px-2">
        <div className="flex items-center gap-x-[8px] min-w-fit justify-between">
          <IoEye size={24} />
          <p
            className="text-[#1a1d1e] text-xs font-medium leading-none w-[200px] pl-[29px]"
          >
            این نام در پروفایل شما نمایش داده خواهد شد .
          </p>
        </div>
        <button
          disabled={props.name?.length < 1}
          onClick={props.handleSignup}
          className={`px-[20px] py-[16px] ${props.name?.length > 1
            ? 'bg-[#ffcc4e]'
            : 'bg-slate-100'
            } rounded-[12px] text-slate-400 font-bold leading-none`}
        >
          بعدی
        </button>
      </div>
    </div>
  )
}