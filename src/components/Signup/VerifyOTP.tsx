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
    if (enteredOtp.length === 6) {
      handleSubmit();
    }
  };

  const [verifyOtp] = useVerifyOtpMutation();
  const handleSubmit = async () => {
    const validate = await trigger('token');
    if (validate) {
      verifyOtp({
        variables: {
          phoneNumber: props.phone,
          otp: watch('token'),
        },
        onCompleted: (data) => {
          updateUserInfo({
            ...(data.verifyOtp?.user as UserInfo),
            verified: true,
          });
          localStorage.setItem('token', data.verifyOtp?.accessToken as string);
          props.onSuccess?.();
          if (props.path === 'signup') {
            if (checkUserInfo(data.verifyOtp)) {
              hs.push(paths.main.explore);
            } else {
              handleNextStep();
            }
          }
        },
      });
    }
  };

  useEffect(() => {
    setTimer(60);
    const timeInterval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timeInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [step]);

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
              onClick={() => {
                props.editPhone();
              }}
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
            numInputs={6}
            renderSeparator={<span className="w-1"></span>}
            renderInput={(props: any) => (
              <input
                {...props}
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
              fontSize: '12pt',
              borderRadius: '12px',
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
          <MdTimer />
          {timer === 0 ? (
            <p className="text-xs font-bold text-brand-black underline">
              ارسال مجدد کد تایید
            </p>
          ) : (
            <p className="text-xs text-brand-black">
              کد تایید نهایتا تا {timer} ثانیه دیگر بدست شما میرسه!
            </p>
          )}
        </div>
        <button
          onClick={props.resendOtp}
          disabled={timer !== 0}
          className={`rounded-[12px] bg-slate-100 ${
            timer === 0 ? 'bg-[#FFCC4E]' : 'text-brand-black'
          } px-5 py-4 font-bold`}
        >
          تایید
        </button>
      </div>
    </div>
  );
}
const checkUserInfo = (VerifyOtp: VerifyOtpMutation['verifyOtp']) => {
  return (
    VerifyOtp?.user?.name &&
    VerifyOtp?.user?.gender &&
    VerifyOtp?.user.birthday &&
    VerifyOtp?.user.province &&
    (VerifyOtp?.user.travelInterests?.length || 0) >= 5 &&
    (VerifyOtp?.user.personalInterests?.length || 0) >= 5 &&
    (VerifyOtp?.user.mySpecialty?.length || 0) >= 1
  );
};
