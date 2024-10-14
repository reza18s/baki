import * as SolarIconSet from 'solar-icon-set';

import { useForm } from 'react-hook-form';
import FirstStep from '../components/layout/Signup/FirstStep';
import { useState } from 'react';
import { useSignupMutation } from '../graphql/generated/graphql.codegen';
import OTPStep from '../components/layout/Signup/OTPStep';
import NameStep from '../components/layout/Signup/NameStep';
import GenderStep from '../components/layout/Signup/GenderStep';
import BirthdateStep from '../components/layout/Signup/BirthdateStep';
import ResidenceCityStep from '../components/layout/Signup/ResidenceCityStep';
import PicturesStep from '../components/layout/Signup/PicturesStep';
import GeneralInterestsStep from '../components/layout/Signup/GeneralInterestsStep';
import PersonalInterestsStep from '../components/layout/Signup/PersonalInterestsStep';
import SpecialtyStep from '../components/layout/Signup/SpecialtyStep';
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
        <FirstStep control={control} handleSignup={handleSignup} phoneNumber={watch("phoneNumber")} />
      }
      {step === 1 &&
        <OTPStep activePage={step} control={control} phone={watch("phoneNumber")} resendOtp={handleSignup} handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />
      }
      {step === 2 &&
        <NameStep control={control} handleSignup={handleSignup} name={watch("name")} />
      }
      {step === 3 &&
        <GenderStep control={control} handleSignup={handleSignup} name={watch("name")} />
      }
      {step === 4 &&
        <BirthdateStep control={control} handleSignup={handleSignup} name={watch("name")} />
      }
      {step === 5 &&
        <ResidenceCityStep control={control} handleSignup={handleSignup} name={watch("name")} />
      }
      {step === 6 &&
        <PicturesStep control={control} handleSignup={handleSignup} name={watch("name")} />
      }
      {step === 7 &&
        <GeneralInterestsStep control={control} handleSignup={handleSignup} name={watch("name")} />
      }
      {step === 8 &&
        <PersonalInterestsStep control={control} handleSignup={handleSignup} name={watch("name")} />
      }
      {step === 9 &&
        <SpecialtyStep control={control} handleSignup={handleSignup} name={watch("name")} />
      }
      {step === 10 &&
        <FinalStep control={control} handleSignup={handleSignup} name={watch("name")} />
      }
    </div>
  );
}
