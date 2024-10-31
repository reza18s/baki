import { useForm } from "react-hook-form";
import * as SolarIconSet from 'solar-icon-set';
import Button from "../../../base/Button/Button";
import MonthPicker from "../../../shared/Inputs/MonthPicker";

export default function BirthdateStep(props: {
    control: any,
    name: string,
    handleNextStep: () => void,
    handleSignup: () => void,
}) {
    const {
        control
    } = useForm()

    return (
        <div className="flex flex-col gap-y-[40px] w-full mx-auto pt-10 h-[90%] justify-between">
            <div className="flex flex-col gap-y-[60px]">
                <div className="flex flex-col items-center">
                    <SolarIconSet.Calendar size={72} />
                    <div className="flex flex-col gap-y-[16px] items-center">
                        <h1 className="text-[32px] font-bold text-brand-black">
                            تولد
                        </h1>
                        <p className="text-sm font-medium leading-tight text-[#64748B]">
                            سال و ماه تولد خود را انتخاب کنید.
                        </p>
                    </div>
                </div>
                <div className="w-full flex items-center justify-center gap-x-3">
                    <div>
                        <h2 className="text-[##64748B] text-sm font-bold mr-1">
                            ماه
                        </h2>
                        <MonthPicker name="month" control={control} />
                    </div>
                    <div>
                        <h2 className="text-[##64748B] text-sm font-bold mr-1">
                            سال
                        </h2>
                        <input dir="ltr" type="tel" className="border-[1.5px] border-[#1a1d1e] rounded-[12px] text-base font-bold text-[#1a1d1e] outline-none bg-white w-[67px] h-[48px] text-center" maxLength={4} min={1320} placeholder="1380" />
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Button onClick={props.handleNextStep}>
                بعدی
            </Button>
        </div>
    );
}
