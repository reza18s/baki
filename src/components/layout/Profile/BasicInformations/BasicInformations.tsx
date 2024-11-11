import * as SolarIconSet from "solar-icon-set";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import GenderStep from "./GenderStep";
import BirthdateStep from "./BirthdateStep";
import MaritalStatusStep from "./MaritalStatusStep";
import CigarettesStep from "./CigarettesStep";
import SportStep from "./SportStep";
import WakeUpEarlyStep from "./WakeUpEarlyStep";
import SpiritStep from "./SpiritStep";
import { useLocalStore } from "@/store/useLocalStore";

type StepsNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface SignupForm {
  phoneNumber: string;
  name: string;
  gender: string;
  birthdate: string;
  residenceCity: string;
  pictures: string[];
}

const HeadStep = ({
  stepNum,
  activeStep,
}: {
  stepNum: StepsNumber;
  activeStep: StepsNumber;
}) => {
  return (
    <div
      className={`w-[27.16px] h-[3.62px] ${activeStep === stepNum ? "bg-[#ffcc4e]" : "bg-slate-100"
        } rounded-xl`}
    />
  );
};

export default function BasicInformations() {
  const { register, watch, control } = useForm<SignupForm>({});

  const [step, setStep] = useState<StepsNumber>(5);

  const handleSignup = () => {
  
  };

  const handleNextStep = () => {
    setStep((prevStep: StepsNumber) => {
      if (prevStep < 6) {
        return (prevStep + 1) as StepsNumber;
      } else {
        return prevStep;
      }
    });
  };


  return (
    <div
      className="text-black p-[24px] pt-0 relative h-full max-w-[100vw] overflow-auto"
      dir="rtl"
    >
      {/* Head */}
      <div className="w-full flex flex-col items-center justify-between gap-y-6">
        <Link
          to="/profile/complate_profile"
          className="w-full flex items-center py-4 px-6 justify-between shadow-md shadow-zinc-50 text-brand-black"
        >
          <SolarIconSet.AltArrowRight size={24} />
          <h1 className="text-lg font-bold my-auto">اطلاعات اولیه</h1>
          <div></div>
        </Link>
        <div className="flex items-center justify-between gap-x-[7px] w-full">
          {/* Progress bar */}
          <div className="flex justify-around gap-x-[1.81px] w-full">
            {/* Steps */}
            {[...Array(7)].map((_, i) => (
              <HeadStep key={i} stepNum={i as StepsNumber} activeStep={step} />
            ))}
          </div>
        </div>
      </div>
      {/* Body */}
      {step === 0 && (
        <GenderStep
          handleNextStep={handleNextStep}
        />
      )}
      {step === 1 && (
        <BirthdateStep
          handleNextStep={handleNextStep}
        />
      )}
      {step === 2 && (
        <MaritalStatusStep
          handleNextStep={handleNextStep}
        />
      )}
      {step === 3 && (
        <CigarettesStep
          handleNextStep={handleNextStep}
        />
      )}
      {step === 4 && (
        <SportStep
          handleNextStep={handleNextStep}
        />
      )}
      {step === 5 && (
        <WakeUpEarlyStep
          handleNextStep={handleNextStep}
        />
      )}
      {step === 6 && (
        <SpiritStep
          control={control}
          handleSignup={handleSignup}
          handleNextStep={handleNextStep}
          name={watch("name")}
        />
      )}
    </div>
  );
}
