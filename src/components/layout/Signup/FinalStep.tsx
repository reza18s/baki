import BakiLogo from "../../../assets/img/signup/BakiLogo.svg";

export default function FinalStep(props: {
  control: any;
  name: string;
  handleSignup: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-between gap-y-[40px] w-full h-full min-h-fit pb- relative">
      <div className="flex flex-col gap-y-[16px] w-full items-center">
        <h1 className="text-[32px] font-bold text-brand-black">پایان!</h1>
        <p className="text-sm font-medium leading-tight text-[#64748B]">
          وارد اپلیکیشن شوید و لذتشو ببرین!
        </p>
      </div>
      {/* Body */}
      <div className="flex flex-col items-center justify-start pt-[10vh] h-full">
        <img src={BakiLogo} alt="Baki Logo" className="text-black max-w-fit" />
        <p>راه حلی برای سفر های از دست رفته !</p>
      </div>
      {/* Footer */}
      <button
        onClick={props.handleSignup}
        className={`absolute bottom-6 px-[20px] py-[16px] bg-brand-yellow rounded-[12px] text-brand-black font-bold leading-none w-full`}
      >
        ورود به اپلیکیشن
      </button>
    </div>
  );
}
