import { Controller, FieldValues } from "react-hook-form";
import * as SolarIconSet from "solar-icon-set";

export default function FirstStep(props: {
    control: any,
    phoneNumber: string,
    handleSignup: () => void,
}) {
    return (
        <div className="flex flex-col gap-y-[40px]">
            <div className="flex flex-col gap-y-[16px]">
                <h1 className="text-[32px] font-bold text-brand-black">
                    شماره موبایل
                </h1>
                <p className="text-sm font-medium leading-tight text-[#64748B]">
                    ما با اطمینان از واقعی بودن همه افرادی که در باکی هستند از کاربران خود محافظت می کنیم.
                </p>
            </div>
            <div className={`rounded-[12px] border-[1.5px] border-black flex items-center justify-between py-[16px] pr-[16px] pl-[12px] ${ props.phoneNumber?.length !== 0 ? "border-b-[4px]" : ""}`}>
            <SolarIconSet.Phone size={30} />
                <Controller
                    name="phoneNumber"
                    control={props.control}
                    defaultValue={null}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="text"
                            dir="ltr"
                            placeholder="09111111111"
                            className="bg-white border-none outline-none w-full"
                        />
                    )}
                />
            </div>
              {/* Footer */}
      <div className="absolute bottom-[24px] flex items-center justify-between gap-x-[16px]">
        <div className="flex items-center gap-x-[8px]">
          <SolarIconSet.LockKeyhole size={24} />
          <p
            className="text-[#1a1d1e] text-xs
 font-medium leading-none"
          >
            شماره موبایل شما در پروفایل شما نمایش داده نخواهد شد.
          </p>
        </div>
        <button
          disabled={props.phoneNumber?.length !== 11}
          onClick={props.handleSignup}
          className={`px-[20px] py-[16px] ${props.phoneNumber?.length === 11
            ? 'bg-[#ffcc4e]'
            : 'bg-slate-100'
            } rounded-[12px] text-slate-400 font-bold leading-none`}
        >
          بعدی
        </button>
      </div>
        </div>
    )
}