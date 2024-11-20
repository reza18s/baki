import { Link } from "react-router-dom";
import * as SolarIconSet from "solar-icon-set";
import GetPhoneNumber from "../Signup/GetPhoneNumber";
import { useState } from "react";
import { useSignupMutation } from "../../../graphql/generated/graphql.codegen";
import { useForm } from "react-hook-form";
import VerifyOTP from "../Signup/VerifyOTP";
import toast from "react-hot-toast";
import { Toast } from "@/components/base/toast/toast";

export default function IdentityVerification() {
  const [step, setStep] = useState<0 | 1>(0);

  const { control, watch } = useForm();

  const [signup, { data, loading, error }] = useSignupMutation();

  const handleSignup = () => {
    signup({
      variables: { phoneNumber: watch("phoneNumber") },
      onCompleted: (data) => {
        setStep(1);
      },
      onError(error) {
        //
      },
    });
  };

  const onOTPSuccess = () => {
  toast.custom(
    (t) => (
      <Toast t={t} type="success">
        تایید هویت با موفقیت انجام شد
      </Toast>
    ),
    { duration: 1500 },
  );
   window.location.replace("/profile/complate_profile")
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-y-3 overflow-y-auto pb-16">
      {/* Head */}
      <Link
        to="/profile/complate_profile"
        className="flex w-full items-center justify-between px-6 py-4 text-brand-black shadow-md shadow-zinc-50"
      >
        <SolarIconSet.AltArrowRight size={24} />
        <h1 className="my-auto text-lg font-bold">تایید هویت</h1>
        <div></div>
      </Link>
      {/* Body */}
      <div
        className="relative h-full max-w-[100vw] overflow-auto p-[24px] text-black"
        dir="rtl"
      >
        {step === 0 && (
          <GetPhoneNumber
            control={control}
            handleSignup={handleSignup}
            phoneNumber={watch("phoneNumber")}
          />
        )}
        {step === 1 && (
          <VerifyOTP
            control={control}
            phone={watch("phoneNumber")}
            resendOtp={handleSignup}
            onSuccess={onOTPSuccess}
          />
        )}
      </div>
    </div>
  );
}
