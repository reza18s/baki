import { FieldValues, useForm } from "react-hook-form";
import { IoEye } from "react-icons/io5";
import RadioButton from "../../../shared/Buttons/RadioButton";
import * as SolarIconSet from 'solar-icon-set';
import Button from "../../../base/Button/Button";

export default function GenderStep(props: {
    control: any,
    name: string,
    handleSignup: () => void,
}) {
    const {
        control
    } = useForm()

    return (
        <div className="flex flex-col gap-y-[40px] w-full mx-auto pt-10 h-[90%] justify-between">
           <div className="flex flex-col items-center justify-between">
            <SolarIconSet.UserId size={72} />
             <div className="flex flex-col gap-y-[16px] items-center">
                 <h1 className="text-[32px] font-bold text-brand-black">
                     جنسیت
                 </h1>
                 <p className="text-sm font-medium leading-tight text-[#64748B]">
                     یکی از گزینه‌های زیر را انتخاب کنید.
                 </p>
             </div>
           </div>
            <RadioButton control={control} items={[{ label: "زن", value: "femail" }, { label: "مرد", value: "mail" }]} name="gender" />
            {/* Footer */}
           <Button>
            بعدی
           </Button>
        </div>
    );
}
