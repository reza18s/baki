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
import { useLocalStore, UserInfo } from '@/store/useLocalStore';
import { useUpdateUserMutation } from '@/graphql/generated/graphql.codegen';
import { customToast } from '@/components/base/toast';

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

export default function BasicInformations({ all = false }: { all?: boolean }) {
  const { setBasicInformationsStep, basicInformationsStep } = useStore(
    (s) => s,
  );
  const [updateUser, { loading }] = useUpdateUserMutation();
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  const hs = useHistory();
  const handleNextStep = (user?: Partial<UserInfo>) => {
    updateUserInfo({ ...user });
    updateUser({
      variables: {
        ...user,
      },
      onCompleted: () => {
        customToast('اطلاعات شما با موفقیت ثبت شد', 'success');
        if (!all) {
          setTimeout(() => {
            hs.goBack();
          }, 1000);
        }
      },
      onError: () => {
        customToast('مشکلی پیش آمده است لطفا دوباره امتحان کنید', 'error');
      },
    });
    if (all) {
      setBasicInformationsStep((prevStep: IBasicInformationsStep) => {
        if (prevStep < 6) {
          return (prevStep + 1) as IBasicInformationsStep;
        } else {
          hs.goBack();
          return prevStep;
        }
      });
    }
  };

  return (
    <Page
      className="flex h-full w-full flex-col items-center"
      contentClassName="p-6 flex flex-col gap-6 pt-24 h-[100dvh]"
      header={
        <AppBar
          title="اطلاعات اولیه"
          onBack={() => {
            hs.goBack();
          }}
        ></AppBar>
      }
    >
      {basicInformationsStep === 0 && (
        <GenderStep handleNextStep={handleNextStep} loading={loading} />
      )}
      {basicInformationsStep === 1 && (
        <BirthdateStep handleNextStep={handleNextStep} loading={loading} />
      )}
      {basicInformationsStep === 2 && (
        <MaritalStatusStep handleNextStep={handleNextStep} loading={loading} />
      )}
      {basicInformationsStep === 3 && (
        <CigarettesStep handleNextStep={handleNextStep} loading={loading} />
      )}
      {basicInformationsStep === 4 && (
        <SportStep handleNextStep={handleNextStep} loading={loading} />
      )}
      {basicInformationsStep === 5 && (
        <WakeUpEarlyStep handleNextStep={handleNextStep} loading={loading} />
      )}
      {basicInformationsStep === 6 && (
        <SpiritStep handleNextStep={handleNextStep} loading={loading} />
      )}
    </Page>
  );
}
