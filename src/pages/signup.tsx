import * as SolarIconSet from 'solar-icon-set';

import { useForm } from 'react-hook-form';
import GetPhoneNumber from '../components/layout/Signup/GetPhoneNumber';
import { useState } from 'react';
import { useSignupMutation } from '../graphql/generated/graphql.codegen';
import VerifyOTP from '../components/layout/Signup/VerifyOTP';
import GetName from '../components/layout/Signup/GetName';
import GetGender from '../components/layout/Signup/GetGender';
import GetBirthdate from '../components/layout/Signup/GetBirthdate';
import GetResidenceCity from '../components/layout/Signup/GetResidenceCity';
import GetPictures from '../components/layout/Signup/GetPictures';
import GetGeneralInterests from '../components/layout/Signup/GetGeneralInterests';
import GetPersonalInterests from '../components/layout/Signup/GetPersonalInterests';
import GetSpecialty from '../components/layout/Signup/GetSpecialty';
import FinalStep from '../components/layout/Signup/FinalStep';

type StepsNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

interface SignupForm {
  phoneNumber: string;
  name: string;
  gender: string;
  birthdate: string;
  residenceCity: string;
  pictures: string[];
}

const HeadStep = ({ stepNum, activeStep }: { stepNum: StepsNumber, activeStep: StepsNumber }) => {
  return (
    <div
      className={`w-[27.16px] h-[3.62px] ${activeStep === stepNum ? 'bg-[#ffcc4e]' : 'bg-slate-100'
        } rounded-xl`}
    />
  )
}

export default function Signup() {
  const { register, watch, control } = useForm<SignupForm>(
    {
      // defaultValues: {
      //   phoneNumber: '09395608390'}
      }
  );

  const [step, setStep] = useState<StepsNumber>(0);

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
    <div className="text-black p-[24px] relative h-full max-w-[100vw] overflow-auto" dir="rtl">
      {/* Head */}
      <div className="flex items-center justify-between gap-x-[7px] w-full">
        <SolarIconSet.SquareArrowRight size={32} />
        {/* Progress bar */}
        <div className="flex justify-around gap-x-[1.81px] w-full">
          {/* Steps */}
          {[...Array(11)].map((_, i) => (
            <HeadStep key={i} stepNum={i as StepsNumber} activeStep={step} />
          ))}
        </div>
      </div>
      {/* Body */}
      {step === 0 &&
        <GetPhoneNumber control={control} handleSignup={handleSignup} phoneNumber={watch("phoneNumber")} />
      }
      {step === 1 &&
        <VerifyOTP activePage={step} control={control} phone={watch("phoneNumber")} resendOtp={handleSignup} handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />
      }
      {step === 2 &&
        <GetName control={control} handleSignup={handleSignup} name={watch("name")} />
      }
      {step === 3 &&
        <GetGender control={control} handleSignup={handleSignup} name={watch("name")} />
      }
      {step === 4 &&
        <GetBirthdate control={control} handleSignup={handleSignup} name={watch("name")} />
      }
      {step === 5 &&
        <GetResidenceCity control={control} handleSignup={handleSignup} name={watch("name")} />
      }
      {step === 6 &&
        <GetPictures control={control} handleSignup={handleSignup} name={watch("name")} />
      }
      {step === 7 &&
        <GetGeneralInterests control={control} handleSignup={handleSignup} name={watch("name")} />
      }
      {step === 8 &&
        <GetPersonalInterests control={control} handleSignup={handleSignup} name={watch("name")} />
      }
      {step === 9 &&
        <GetSpecialty control={control} handleSignup={handleSignup} name={watch("name")} />
      }
      {step === 10 &&
        <FinalStep control={control} handleSignup={handleSignup} name={watch("name")} />
      }
    </div>
  );
}
