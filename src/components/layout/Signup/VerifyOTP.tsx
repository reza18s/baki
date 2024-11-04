import OtpInput from 'react-otp-input';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { MdTimer } from 'react-icons/md';
import { useSignupVerifyOtpMutation } from '../../../graphql/generated/graphql.codegen';

export default function VerifyOTP(props: {
  control: any;
  phone: string;
  activePage: number;
  resendOtp(): void;
  handlePrevStep(): void;
  handleNextStep(): void;
}) {
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState('');

  const { setValue, trigger, watch } = useForm();

  const handleChange = (enteredOtp: string) => {
    setOtp(enteredOtp);
    setValue('token', enteredOtp);
    if (enteredOtp.length === 6) {
      handleSubmit();
    }
  };

  const [verifyOtp] = useSignupVerifyOtpMutation();
  const handleSubmit = async () => {
    const validate = await trigger('token');
    if (validate) {
      verifyOtp({
        variables: {
          phoneNumber: props.phone,
          otp: watch('token'),
        },
        onCompleted: (data) => {
          console.log(data);
          localStorage.setItem(
            'token',
            JSON.stringify(data.verifyOtp?.accessToken),
          );
          props.handleNextStep();
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
  }, [props.activePage]);

  return (
    <div className="w-full flex flex-col items-center justify-between pb-[24px] h-full">
      <div className="flex flex-col items-center gap-y-[40px]">
        {/* Head */}
        <div className="flex flex-col">
          <h1 className="text-slate-950 text-[32px] font-bold">
            تایید شماره موبایل
          </h1>
          <p className="text-black/50">
            لطفا کدی که به شماره
            <span className="text-[#1a1d1e] px-1">{props.phone}</span>
            ارسال کردیم را وارد کنید.
            <span
              onClick={props.handlePrevStep}
              className="text-[#1a1d1e] font-bold underline px-1 cursor-pointer"
            >
              تغییر شماره
            </span>
          </p>
        </div>
        {/* Body */}
        <div className="flex flex-col items-center justify-center space-y-[30px] mb-[5vh] text-black">
          <OtpInput
            value={otp}
            onChange={handleChange}
            shouldAutoFocus
            numInputs={6}
            renderSeparator={<span className="w-1"></span>}
            renderInput={(props: any) => <input {...props} />}
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
      <div className="flex items-center">
        <div className="flex items-center gap-x-3">
          <MdTimer />
          {timer === 0 ? (
            <p className="text-[#1a1d1e] text-xs w-[200px] underline font-bold">
              ارسال مجدد کد تایید
            </p>
          ) : (
            <p className="text-[#1a1d1e] text-xs w-[200px]">
              کد تایید نهایتا تا {timer} ثانیه دیگر بدست شما میرسه!
            </p>
          )}
        </div>
        <button
          onClick={props.resendOtp}
          disabled={timer !== 0}
          className={`rounded-[12px] bg-slate-100 ${
            timer === 0 ? 'bg-[#FFCC4E]' : 'text-slate-400'
          } font-bold px-5 py-4`}
        >
          تایید
        </button>
      </div>
    </div>
  );
}
