import OtpInput from "react-otp-input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { MdTimer } from "react-icons/md";
import { useSignupVerifyOtpMutation } from "../../../graphql/generated/graphql.codegen";
import { useLocalStore } from "../../../store/useLocalStore";

export default function VerifyOTP(props: {
  control: any;
  phone: string;
  resendOtp(): void;
  onSuccess?(): void;
}) {
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState("");
  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const handlePrevStep = useLocalStore((store) => store.handlePrevStep);
  const step = useLocalStore((store) => store.step);

  const { setValue, trigger, watch } = useForm();

  const handleChange = (enteredOtp: string) => {
    setOtp(enteredOtp);
    setValue("token", enteredOtp);
    if (enteredOtp.length === 6) {
      handleSubmit();
    }
  };

  const [verifyOtp] = useSignupVerifyOtpMutation();
  const handleSubmit = async () => {
    const validate = await trigger("token");
    if (validate) {
      verifyOtp({
        variables: {
          phoneNumber: props.phone,
          otp: watch("token"),
        },
        onCompleted: (data) => {
          localStorage.setItem("token", data.verifyOtp?.accessToken as string);
          props.onSuccess?.();
          handleNextStep();
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
    <div className="flex h-[calc(100%-32px)] w-full flex-col items-center justify-between">
      <div className="flex flex-col items-center gap-y-[40px]">
        {/* Head */}
        <div className="flex flex-col">
          <h1 className="text-[32px] font-bold text-slate-950">
            تایید شماره موبایل
          </h1>
          <p className="text-black/50">
            لطفا کدی که به شماره
            <span className="px-1 text-[#1a1d1e]">{props.phone}</span>
            ارسال کردیم را وارد کنید.
            <span
              onClick={handlePrevStep}
              className="cursor-pointer px-1 font-bold text-[#1a1d1e] underline"
            >
              تغییر شماره
            </span>
          </p>
        </div>
        {/* Body */}
        <div className="mb-[5vh] flex flex-col items-center justify-center space-y-[30px] text-black">
          <OtpInput
            value={otp}
            onChange={handleChange}
            shouldAutoFocus
            numInputs={6}
            renderSeparator={<span className="w-1"></span>}
            renderInput={(props: any) => <input {...props} />}
            inputStyle={{
              width: "38px",
              height: "48px",
              margin: "0 4px",
              fontSize: "12pt",
              borderRadius: "12px",
              textAlign: "center",
              backgroundColor: "#F1F5F9",
            }}
            containerStyle="flex flex-row-reverse justify-center"
          />
        </div>
      </div>
      {/* Resend */}
      <div className="mb-5 flex w-full items-center justify-between">
        <div className="flex items-center gap-x-3">
          <MdTimer />
          {timer === 0 ? (
            <p className="w-[200px] text-xs font-bold text-[#1a1d1e] underline">
              ارسال مجدد کد تایید
            </p>
          ) : (
            <p className="w-[200px] text-xs text-[#1a1d1e]">
              کد تایید نهایتا تا {timer} ثانیه دیگر بدست شما میرسه!
            </p>
          )}
        </div>
        <button
          onClick={props.resendOtp}
          disabled={timer !== 0}
          className={`rounded-[12px] bg-slate-100 ${
            timer === 0 ? "bg-[#FFCC4E]" : "text-slate-400"
          } px-5 py-4 font-bold`}
        >
          تایید
        </button>
      </div>
    </div>
  );
}
