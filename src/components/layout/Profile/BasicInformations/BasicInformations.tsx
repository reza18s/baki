import * as SolarIconSet from 'solar-icon-set';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import GenderStep from './GenderStep';
import BirthdateStep from './BirthdateStep';
import MaritalStatusStep from './MaritalStatusStep';
import CigarettesStep from './CigarettesStep';
import SportStep from './SportStep';
import WakeUpEarlyStep from './WakeUpEarlyStep';
import SpiritStep from './SpiritStep';
import { useLocalStore } from '@/store/useLocalStore';

type StepsNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
const HeadStep = ({
  stepNum,
  activeStep,
}: {
  stepNum: StepsNumber;
  activeStep: StepsNumber;
}) => {
  return (
    <div
      className={`h-[3.62px] w-full ${
        activeStep >= stepNum ? 'bg-brand-yellow' : 'bg-slate-100'
      } rounded-xl`}
    />
  );
};

export default function BasicInformations() {
  const [step, setStep] = useState<StepsNumber>(0);

  const handleSignup = () => {};

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
    <Page
      className="flex h-full w-full flex-col items-center"
      contentClassName="h-[100dvh]"
    >
      <div
        className="relative h-full max-w-[100vw] overflow-auto p-[24px] pt-0 text-black"
        dir="rtl"
      >
        {/* Head */}
        <div className="flex w-full flex-col items-center justify-between gap-y-6">
          <Link
            to="/profile/complate_profile"
            className="flex w-full items-center justify-between px-6 py-4 text-brand-black shadow-md shadow-zinc-50"
          >
            <SolarIconSet.AltArrowRight size={24} />
            <h1 className="my-auto text-lg font-bold">اطلاعات اولیه</h1>
            <div></div>
          </Link>
          <div className="flex w-full items-center justify-between gap-x-[7px]">
            {/* Progress bar */}
            <div className="flex w-full justify-around gap-x-[1.81px]">
              {/* Steps */}
              {[...Array(7)].map((_, i) => (
                <HeadStep
                  key={i}
                  stepNum={i as StepsNumber}
                  activeStep={step}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Body */}
        {step === 0 && <GenderStep handleNextStep={handleNextStep} />}
        {step === 1 && <BirthdateStep handleNextStep={handleNextStep} />}
        {step === 2 && <MaritalStatusStep handleNextStep={handleNextStep} />}
        {step === 3 && <CigarettesStep handleNextStep={handleNextStep} />}
        {step === 4 && <SportStep handleNextStep={handleNextStep} />}
        {step === 5 && <WakeUpEarlyStep handleNextStep={handleNextStep} />}
        {step === 6 && <SpiritStep />}
      </div>
    </Page>
  );
}
