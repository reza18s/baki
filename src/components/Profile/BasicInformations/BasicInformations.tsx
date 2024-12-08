import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import GenderStep from './GenderStep';
import BirthdateStep from './BirthdateStep';
import MaritalStatusStep from './MaritalStatusStep';
import CigarettesStep from './CigarettesStep';
import SportStep from './SportStep';
import WakeUpEarlyStep from './WakeUpEarlyStep';
import SpiritStep from './SpiritStep';
import { Page } from '@/components/layout/Page';
import AppBar from '@/components/layout/Header/AppBar';
import { IBasicInformationsStep, useStore } from '@/store/useStore';

const HeadStep = ({
  stepNum,
  activeStep,
}: {
  stepNum: IBasicInformationsStep;
  activeStep: IBasicInformationsStep;
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
  const { setBasicInformationsStep, basicInformationsStep } = useStore(
    (s) => s,
  );
  const hs = useHistory();
  const handleNextStep = () => {
    setBasicInformationsStep((prevStep: IBasicInformationsStep) => {
      if (prevStep < 6) {
        return (prevStep + 1) as IBasicInformationsStep;
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
            if (basicInformationsStep === 0) {
              hs.goBack();
            } else {
              setBasicInformationsStep(
                (prev) => (prev - 1) as IBasicInformationsStep,
              );
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
            <HeadStep
              key={i}
              stepNum={i as IBasicInformationsStep}
              activeStep={basicInformationsStep}
            />
          ))}
        </div>
      </div>
      {basicInformationsStep === 0 && (
        <GenderStep handleNextStep={handleNextStep} />
      )}
      {basicInformationsStep === 1 && (
        <BirthdateStep handleNextStep={handleNextStep} />
      )}
      {basicInformationsStep === 2 && (
        <MaritalStatusStep handleNextStep={handleNextStep} />
      )}
      {basicInformationsStep === 3 && (
        <CigarettesStep handleNextStep={handleNextStep} />
      )}
      {basicInformationsStep === 4 && (
        <SportStep handleNextStep={handleNextStep} />
      )}
      {basicInformationsStep === 5 && (
        <WakeUpEarlyStep handleNextStep={handleNextStep} />
      )}
      {basicInformationsStep === 6 && <SpiritStep />}
    </Page>
  );
}
