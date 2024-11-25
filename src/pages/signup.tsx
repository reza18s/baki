import * as SolarIconSet from 'solar-icon-set';
import { useForm } from 'react-hook-form';
import { lazy, Suspense } from 'react';
import { useSignupMutation } from '../graphql/generated/graphql.codegen';
import { useLocalStore } from '../store/useLocalStore';
import { StepsNumber } from '../types';
import { Page } from '@/components/layout/Page';
import toast from 'react-hot-toast';
import { Toast } from '@/components/base/toast/toast';

const GetPhoneNumber = lazy(
  () => import('../components/Signup/GetPhoneNumber'),
);
const VerifyOTP = lazy(() => import('../components/Signup/VerifyOTP'));
const GetName = lazy(() => import('../components/Signup/GetName'));
const GetGender = lazy(() => import('../components/Signup/GetGender'));
const GetBirthdate = lazy(() => import('../components/Signup/GetBirthdate'));
const GetResidenceCity = lazy(
  () => import('../components/Signup/GetProvinces'),
);
const GetPictures = lazy(() => import('../components/Signup/GetPictures'));
const GetGeneralInterests = lazy(
  () => import('../components/Signup/GetTravelInterests'),
);
const GetPersonalInterests = lazy(
  () => import('../components/Signup/GetPersonalInterests'),
);
const GetSpecialty = lazy(() => import('../components/Signup/GetSpecialty'));
const FinalStep = lazy(() => import('../components/Signup/FinalStep'));

interface SignupForm {
  phoneNumber: string;
  name: string;
  gender: string;
  birthdate: string;
  province: string;
  images: string[];
  mySpecialty: string[];
  generalInterests: string[];
  personalInterests: string[];
}

const HeadStep = ({
  stepNum,
  activeStep,
}: {
  stepNum: StepsNumber;
  activeStep: StepsNumber;
}) => (
  <div
    className={`h-[3.62px] w-[27.16px] ${
      activeStep >= stepNum ? 'bg-brand-yellow' : 'bg-slate-100'
    } rounded-xl`}
  />
);

export default function Signup() {
  const userInfo = useLocalStore((store) => store.userInfo);
  const { control, watch } = useForm<SignupForm>({
    defaultValues: {
      name: userInfo.name || '',
      phoneNumber: '',
    },
  });
  const step = useLocalStore((store) => store.step);
  const setStep = useLocalStore((store) => store.setSteps);
  const [signup] = useSignupMutation();

  const handleSignup = () => {
    signup({
      variables: { phoneNumber: watch('phoneNumber') },
      onCompleted: () => setStep(1),
      onError: (error) => {
        toast.custom(
          (t) => (
            <Toast t={t} type="error">
              مشکلی پیش آمده است لطفا دوباره امتحان کنید
            </Toast>
          ),
          { duration: 1500 },
        );
      },
    });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <GetPhoneNumber
            control={control}
            handleSignup={handleSignup}
            phoneNumber={watch('phoneNumber')}
          />
        );
      case 1:
        return (
          <VerifyOTP
            path="signup"
            editPhone={() => setStep((prev) => (prev - 1) as StepsNumber)}
            phone={watch('phoneNumber')}
            resendOtp={handleSignup}
          />
        );
      case 2:
        return <GetName control={control} value={watch('name')} />;
      case 3:
        return <GetGender />;
      case 4:
        return <GetBirthdate />;
      case 5:
        return <GetResidenceCity />;
      case 6:
        return <GetPictures control={control} name={watch('name')} />;
      case 7:
        return <GetGeneralInterests />;
      case 8:
        return <GetPersonalInterests />;
      case 9:
        return <GetSpecialty />;
      case 10:
        return <FinalStep />;
      default:
        return null;
    }
  };

  return (
    <Page
      className="relative h-full max-w-[100vw] overflow-auto"
      contentClassName="h-full p-6"
      headerClassName="shadow-none"
      header={
        <div className="flex w-full items-center justify-between gap-2 p-6 pt-8">
          <SolarIconSet.SquareArrowRight
            className="text-gray-500"
            size={32}
            onClick={() =>
              setStep((prev) => (prev > 0 ? ((prev - 1) as StepsNumber) : prev))
            }
          />
          {/* Progress bar */}
          <div className="flex w-full justify-around gap-x-[1.81px]">
            {[...Array(11)].map((_, i) => (
              <HeadStep key={i} stepNum={i as StepsNumber} activeStep={step} />
            ))}
          </div>
        </div>
      }
    >
      <Suspense fallback={<div>Loading step...</div>}>
        <div className="h-full w-full">{renderStep()}</div>
      </Suspense>
    </Page>
  );
}
