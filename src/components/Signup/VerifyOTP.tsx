import OtpInput from 'react-otp-input';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { MdTimer } from 'react-icons/md';
import { useLocalStore, UserInfo } from '../../store/useLocalStore';
import {
  useVerifyOtpMutation,
  VerifyOtpMutation,
} from '@/graphql/generated/graphql.codegen';
import { useHistory } from 'react-router';
import { paths } from '@/routes/paths';
import Button from '../base/Button/Button';
import { customToast } from '../base/toast';

export default function VerifyOTP(props: {
  path: 'signup' | 'profile';
  editPhone: () => void;
  phone: string;
  resendOtp(): void;
  onSuccess?(): void;
}) {
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState('');
  const hs = useHistory();
  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const step = useLocalStore((store) => store.step);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  const { setValue, trigger, watch } = useForm();

  const handleChange = (enteredOtp: string) => {
    const numericOtp = enteredOtp.replace(/\D/g, ''); // Remove non-numeric characters
    setOtp(numericOtp);
    setValue('token', enteredOtp);
    if (enteredOtp.length === 4) {
      handleSubmit();
    }
  };

  const [verifyOtp, { loading }] = useVerifyOtpMutation();

  const handleSubmit = async () => {
    const validate = await trigger('token');
    if (validate) {
      verifyOtp({
        variables: {
          phoneNumber: props.phone,
          otp: watch('token'),
          deviceToken: localStorage.getItem('deviceToken'),
        },
        onCompleted: (data) => {
          updateUserInfo({
            ...(data.verifyOtp?.user as UserInfo),
            verified: true,
          });
          localStorage.setItem('token', data.verifyOtp?.accessToken as string);
          props.onSuccess?.();
          if (props.path === 'signup') {
            // if (checkUserInfo(data.verifyOtp)) {
            //   window.location.replace(paths.main.explore);
            //   // hs.push();
            // } else {
            handleNextStep();
            // }
          }
        },
        onError: () => {
          customToast('لطفا کد را به درستی وارد کنید', 'error');
        },
      });
    }
  };

  useEffect(() => {
    let timeInterval: NodeJS.Timeout;

    if (timer > 0) {
      timeInterval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timeInterval);
  }, [timer]);

  const handleResendOtp = () => {
    setTimer(60); // Reset the timer to 60 seconds
    props.resendOtp(); // Call the resendOtp function passed from props
    customToast('کد تاییذ برای شما ارسال شد', 'success');
  };

  return (
    <div className="flex h-[calc(100%)] w-full flex-col items-center justify-between">
      <div className="mt-10 flex flex-col items-center gap-4">
        {/* Head */}
        <div className="flex flex-col gap-4">
          <h1 className="text-[32px] font-bold text-slate-950">
            تایید شماره موبایل
          </h1>
          <p className="text-black/50">
            لطفا کدی که به شماره
            <span className="px-1 text-brand-black">{props.phone}</span>
            ارسال کردیم را وارد کنید.
            <span
              onClick={props.editPhone}
              className="cursor-pointer px-1 font-bold text-brand-black underline"
            >
              تغییر شماره
            </span>
          </p>
        </div>
        {/* Body */}
        <div className="mt-6 flex flex-col items-center justify-center space-y-[30px] text-black">
          <OtpInput
            value={otp}
            onChange={handleChange}
            shouldAutoFocus
            numInputs={4}
            renderSeparator={<span className="w-1"></span>}
            renderInput={(props: any) => (
              <input
                {...props}
                className="appearance-none rounded-xl border-[1.9px] outline-none focus:border-black focus:bg-white focus:shadow-[0px_2px_#000]"
                type="tel" // Ensures numeric input
                inputMode="numeric" // Provides numeric keyboard on mobile devices
                pattern="[0-9]*" // Enforces numeric input
                onKeyDown={(e) => {
                  if (!/^\d$/.test(e.key) && e.key !== 'Backspace') {
                    e.preventDefault(); // Block invalid input
                  }
                }}
              />
            )}
            inputStyle={{
              width: '38px',
              height: '48px',
              margin: '0 4px',
              textAlign: 'center',
              backgroundColor: '#F1F5F9',
            }}
            containerStyle="flex flex-row-reverse justify-center"
          />
        </div>
      </div>
      {/* Resend */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-x-3">
          <MdTimer className="size-6" />
          {timer === 0 ? (
            <div className="flex text-xs">
              کدی دریافت نکردید؟
              <p
                className="text-xs font-bold text-brand-black underline"
                onClick={handleResendOtp}
              >
                ارسال مجدد
              </p>
            </div>
          ) : (
            <p className="text-xs text-brand-black">
              کد تایید نهایتا تا {timer} ثانیه دیگر بدست شما میرسه!
            </p>
          )}
        </div>
        <Button
          loading={loading}
          onClick={handleResendOtp}
          disabled={true}
          className={`h-12 rounded-[12px] bg-slate-100 px-5 py-4 font-bold`}
        >
          تایید
        </Button>
      </div>
    </div>
  );
}

const checkUserInfo = (VerifyOtp: VerifyOtpMutation['verifyOtp']) => {
  return (
    VerifyOtp?.user?.name &&
    VerifyOtp?.user?.gender &&
    VerifyOtp?.user.birthdate &&
    VerifyOtp?.user.province &&
    VerifyOtp?.user.mainImage &&
    VerifyOtp?.user.images?.length == 3 &&
    (VerifyOtp?.user.travelInterests?.length || 0) >= 5 &&
    (VerifyOtp?.user.personalInterests?.length || 0) >= 5 &&
    (VerifyOtp?.user.mySpecialty?.length || 0) >= 1
  );
};
