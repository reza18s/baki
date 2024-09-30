import * as SolarIconSet from "solar-icon-set";
import { SigninMutation } from "../graphql/mutation/signup";


import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import FirstStep from "../components/layout/Login/FirstStep";
import { useState } from "react";

export default function Login() {
  const {
    register,
    watch,
    control,
  } = useForm()
  const [step, setStep] = useState<0 | 1>(0)
  const [signup, { data, loading, error }] = useMutation(SigninMutation);

  const handleSignup = () => {
    signup({ variables: { phoneNumber: watch("phoneNumber") } })
  }

  return (
    <div className="text-black p-[24px] relative h-full" dir="rtl">
      {/* Head */}
      <div className="flex items-center justify-between gap-x-[7px] w-full">
        <SolarIconSet.SquareArrowRight size={32} />
        {/* Progress bar */}
        <div className="flex justify-around gap-x-[1.81px] w-full">
          {/* Active Step */}
          <div className={`w-[143.09px] h-[3.62px] ${step === 0 ? "bg-[#ffcc4e]" : "bg-slate-100"} rounded-xl`} />
          {/* Inactive Step */}
          <div className={`w-[143.09px] h-[3.62px] ${step === 1 ? "bg-[#ffcc4e]" : "bg-slate-100"} rounded-xl`} />
        </div>
      </div>
      {/* Body */}
      {step === 0 && <FirstStep control={control} />}
      {/* Footer */}
      <div className="absolute bottom-[24px] flex items-center justify-between gap-x-[16px]">
        <div className="flex items-center gap-x-[8px]">
          <SolarIconSet.LockKeyhole size={24} />
          <p className="text-[#1a1d1e] text-xs
 font-medium leading-none font-['IRANSansX']">
            شماره موبایل شما در پروفایل شما نمایش داده نخواهد شد.
          </p>
        </div>
        <button disabled={watch("phoneNumber")?.length !== 11} onClick={handleSignup} className={`px-[20px] py-[16px] ${watch("phoneNumber")?.length === 11 ? "bg-[#ffcc4e]" : "bg-slate-100"} rounded-[12px] text-slate-400 font-bold font-['IRANSansXFaNum'] leading-none`}>
          بعدی
        </button>
      </div>
    </div>
  )
}