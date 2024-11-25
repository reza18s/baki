import GetPhoneNumber from '../Signup/GetPhoneNumber';
import { useState } from 'react';
import { useSignupMutation } from '../../../graphql/generated/graphql.codegen';
import { useForm } from 'react-hook-form';
import VerifyOTP from '../Signup/VerifyOTP';
import toast from 'react-hot-toast';
import { Toast } from '@/components/base/toast/toast';
import { Page } from '../Page';
import AppBar from '../Header/AppBar';

export default function IdentityVerification() {
  const [step, setStep] = useState<0 | 1>(0);

  const { control, watch } = useForm();

  const [signup] = useSignupMutation();

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

  const onOTPSuccess = () => {
    toast.custom(
      (t) => (
        <Toast t={t} type="success">
          تایید هویت با موفقیت انجام شد
        </Toast>
      ),
      { duration: 1500 },
    );
    window.location.replace('/profile/complete_profile');
  };

  return (
    <Page
      className="flex h-full w-full flex-col items-center"
      contentClassName="h-[100dvh]"
      header={<AppBar title="تایید هویت"></AppBar>}
    >
      <div className="relative h-full max-w-[100vw] overflow-auto p-6 text-black">
        {step === 0 && (
          <GetPhoneNumber
            control={control}
            handleSignup={handleSignup}
            phoneNumber={watch('phoneNumber')}
          />
        )}
        {step === 1 && (
          <VerifyOTP
            path="profile"
            editPhone={() => setStep((prev) => (prev - 1) as 0 | 1)}
            phone={watch('phoneNumber')}
            resendOtp={handleSignup}
            onSuccess={onOTPSuccess}
          />
        )}
      </div>
    </Page>
  );
}
