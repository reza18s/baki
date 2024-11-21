import * as SolarIconSet from 'solar-icon-set';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import GenderStep from './GenderStep';
import BirthdateStep from './BirthdateStep';
import MaritalStatusStep from './MaritalStatusStep';
import CigarettesStep from './CigarettesStep';
import SportStep from './SportStep';
import WakeUpEarlyStep from './WakeUpEarlyStep';
import SpiritStep from './SpiritStep';
import { Page } from '../../Page';
import AppBar from '../../Header/AppBar';

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
  const hs = useHistory();
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
      contentClassName="p-6 flex flex-col gap-6 pt-24 h-[100dvh]"
      header={
        <AppBar
          title="اطلاعات اولیه"
          onBack={() => {
            if (step === 0) {
              hs.goBack();
            } else {
              setStep((prev) => (prev - 1) as StepsNumber);
            }
          }}
        ></AppBar>
      }
    >
      <div className="flex w-full items-center justify-between gap-x-[7px]">
        {/* Progress bar */}
        <div className="flex w-full justify-around gap-[1px]">
          {/* Steps */}
          {[...Array(7)].map((_, i) => (
            <HeadStep key={i} stepNum={i as StepsNumber} activeStep={step} />
          ))}
        </div>
      </div>
      {step === 0 && <GenderStep handleNextStep={handleNextStep} />}
      {step === 1 && <BirthdateStep handleNextStep={handleNextStep} />}
      {step === 2 && <MaritalStatusStep handleNextStep={handleNextStep} />}
      {step === 3 && <CigarettesStep handleNextStep={handleNextStep} />}
      {step === 4 && <SportStep handleNextStep={handleNextStep} />}
      {step === 5 && <WakeUpEarlyStep handleNextStep={handleNextStep} />}
      {step === 6 && <SpiritStep />}
    </Page>
  );
}
