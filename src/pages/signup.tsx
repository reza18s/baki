import * as SolarIconSet from 'solar-icon-set';
import { useForm } from 'react-hook-form';
import { lazy, Suspense } from 'react';
import { useSignupMutation } from '../graphql/generated/graphql.codegen';
import { useLocalStore } from '../store/useLocalStore';
import { StepsNumber } from '../types';
import SweetAlertToast from '@/components/shared/Toasts/SweetAlertToast';
import { Page } from '@/components/layout/Page';

const GetPhoneNumber = lazy(
  () => import('../components/layout/Signup/GetPhoneNumber'),
);
const VerifyOTP = lazy(() => import('../components/layout/Signup/VerifyOTP'));
const GetName = lazy(() => import('../components/layout/Signup/GetName'));
const GetGender = lazy(() => import('../components/layout/Signup/GetGender'));
const GetBirthdate = lazy(
  () => import('../components/layout/Signup/GetBirthdate'),
);
const GetResidenceCity = lazy(
  () => import('../components/layout/Signup/GetResidenceCity'),
);
const GetPictures = lazy(
  () => import('../components/layout/Signup/GetPictures'),
);
const GetGeneralInterests = lazy(
  () => import('../components/layout/Signup/GetTravelInterests'),
);
const GetPersonalInterests = lazy(
  () => import('../components/layout/Signup/GetPersonalInterests'),
);
const GetSpecialty = lazy(
  () => import('../components/layout/Signup/GetSpecialty'),
);
const FinalStep = lazy(() => import('../components/layout/Signup/FinalStep'));

interface SignupForm {
  phoneNumber: string;
  name: string;
  gender: string;
  birthdate: string;
  residenceCity: string;
  pictures: string[];
  specialty: string[];
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
      activeStep === stepNum ? 'bg-[#ffcc4e]' : 'bg-slate-100'
    } rounded-xl`}
  />
);

export default function Signup() {
  const userInfo = useLocalStore((store) => store.userInfo);
  const { control, watch } = useForm<SignupForm>({
    defaultValues: {
      name: userInfo.name || '',
      gender: userInfo.gender || '',
    },
  });
  const step = useLocalStore((store) => store.step);
  const setStep = useLocalStore((store) => store.setSteps);
  const [signup, { loading, error }] = useSignupMutation();

  const handleSignup = () => {
    signup({
      variables: { phoneNumber: watch('phoneNumber') },
      onCompleted: () => setStep(1),
      onError: (error) => {
        console.error('Signup error:', error);
        SweetAlertToast.fire({
          icon: 'error',
          title: 'خطا',
          text: 'مشکلی پیش آمده است لطفا دوباره امتحان کنید',
        });
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
            control={control}
            phone={watch('phoneNumber')}
            resendOtp={handleSignup}
          />
        );
      case 2:
        return <GetName control={control} value={watch('name')} />;
      case 3:
        return <GetGender control={control} value={watch('gender')} />;
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
      contentClassName="h-full px-6"
      headerClassName="shadow-none"
      header={
        <div className="flex w-full items-center justify-between gap-x-[7px] p-6">
          <SolarIconSet.SquareArrowRight
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
      <Suspense fallback={<div>Loading step...</div>}>{renderStep()}</Suspense>
      {error && <div className="mt-2 text-red-500">Error: {error.message}</div>}
      {loading && <div className="mt-2 text-blue-500">Processing...</div>}
    </Page>
  );
}
