import { Link } from "react-router-dom";
import * as SolarIconSet from 'solar-icon-set';
import GetPhoneNumber from "../Signup/GetPhoneNumber";
import { useState } from "react";
import { useSignupMutation } from "../../../graphql/generated/graphql.codegen";
import { useForm } from "react-hook-form";
import VerifyOTP from "../Signup/VerifyOTP";


type StepsNumber = 0 | 1

export default function IdentityVerification() {
  const [step, setStep] = useState<0 | 1>(0)

  const {
    control,
    watch
  } = useForm()

  const [signup, { data, loading, error }] = useSignupMutation();

  const handleSignup = () => {
    signup({
      variables: { phoneNumber: watch('phoneNumber') },
      onCompleted: (data) => {
        setStep(1);
      },
      onError(error) {
        //
      },
    });
  };

  const handlePrevStep = () => {
    setStep((prevStep: StepsNumber) => {
      if (prevStep > 0) {
        return (prevStep - 1) as StepsNumber;
      } else {
        return prevStep;
      }
      });
  };

  const handleNextStep = () => {
    setStep((prevStep: StepsNumber) => {
      if (prevStep < 10) {
        return (prevStep + 1) as StepsNumber;
      } else {
        return prevStep;
      }
    });
  };

  return (
    <div className='w-full flex flex-col items-center gap-y-3 h-full pb-16 overflow-y-auto'>
      {/* Head */}
      <Link to="/profile/complate_profile" className='w-full flex items-center py-4 px-6 justify-between shadow-md shadow-zinc-50 text-brand-black'>
        <SolarIconSet.AltArrowRight size={24} />
        <h1 className='text-lg font-bold my-auto'>
          تایید هویت
        </h1>
        <div></div>
      </Link>
      {/* Body */}
      <div className="text-black p-[24px] relative h-full max-w-[100vw] overflow-auto" dir="rtl">
      {step === 0 &&
          <GetPhoneNumber control={control} handleSignup={handleSignup} phoneNumber={watch("phoneNumber")} />
        }
        {step === 1 &&
          <VerifyOTP activePage={step} control={control} phone={watch("phoneNumber")} resendOtp={handleSignup} handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />
        }
      </div>
    </div>
  );
}