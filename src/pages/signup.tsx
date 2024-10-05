import * as SolarIconSet from 'solar-icon-set';

import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import FirstStep from '../components/layout/Login/FirstStep';
import { useState } from 'react';
import { useSignupMutation } from '../graphql/generated/graphql.codegen';
import OTPStep from '../components/layout/Login/OTPStep';

type StepsNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

const HeadStep = ({ stepNum, activeStep }: { stepNum: StepsNumber, activeStep: StepsNumber }) => {
  return (
    <div
      className={`w-[27.16px] h-[3.62px] ${activeStep === stepNum ? 'bg-[#ffcc4e]' : 'bg-slate-100'
        } rounded-xl`}
    />
  )
}

export default function Login() {
  const { register, watch, control } = useForm();
  const [step, setStep] = useState<StepsNumber>(1);
  const [signup, { data, loading, error }] = useSignupMutation();

  const handleSignup = () => {
    signup({
      variables: { phoneNumber: watch('phoneNumber') },
      onCompleted: (data) => {
        console.log('data', data);
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

  return (
    <div className="text-black p-[24px] relative h-full" dir="rtl">
      {/* Head */}
      <div className="flex items-center justify-between gap-x-[7px] w-full">
        <SolarIconSet.SquareArrowRight size={32} />
        {/* Progress bar */}
        <div className="flex justify-around gap-x-[1.81px] w-full">
          {/* Steps */}
          {[...Array(10)].map((_, i) => (
            <HeadStep key={i} stepNum={i as StepsNumber} activeStep={step} />
          ))}
        </div>
      </div>
      {/* Body */}
      {step === 0 &&
        <FirstStep control={control} handleSignup={handleSignup} phoneNumber={watch("phoneNumber")} />
      }
      {step === 1 &&
        <OTPStep activePage={step} control={control} phone={watch("phoneNumber")} handlePrevStep={handlePrevStep} />
      }
    
    </div>
  );
}
