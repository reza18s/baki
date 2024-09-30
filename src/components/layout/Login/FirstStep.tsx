import {  Controller, FieldValues } from "react-hook-form";
import * as SolarIconSet from "solar-icon-set";

export default function FirstStep(props: {
    control: any
}) {
    return (
        <div className="flex flex-col gap-y-[40px]">
            <div className="flex flex-col gap-y-[16px]">
                <h1 className="font-['IRANSansX'] text-[32px] font-bold">
                    شماره موبایل
                </h1>
                <p className="text-sm font-medium font-['IRANSansXFaNum'] leading-tight text-[#64748B]">
                    ما با اطمینان از واقعی بودن همه افرادی که در باکی هستند از کاربران خود محافظت می کنیم.
                </p>
            </div>
            <div className="rounded-[12px] border-[1.5px] border-black flex items-center justify-between py-[16px] pr-[16px] pl-[12px]">
                <SolarIconSet.Phone size={30} />
                <Controller
                    name="phoneNumber"
                    control={props.control}
                    defaultValue={null}
                    render={() => (
                        <input
                            type="text"
                            dir="ltr"
                            placeholder="09111111111"
                            className="bg-white border-none outline-none w-full"
                        />
                    )}
                />
            </div>
        </div>
    )
}