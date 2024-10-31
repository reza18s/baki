import { useForm } from "react-hook-form";
import RadioButton from "../../../shared/Buttons/RadioButton";
import * as SolarIconSet from 'solar-icon-set';
import Button from "../../../base/Button/Button";

export default function SpiritStep(props: {
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
             <SolarIconSet.MaskHapply size={72} />
              <div className="flex flex-col gap-y-[16px] items-center">
                  <h1 className="text-[32px] font-bold text-brand-black">
                  روحیه
                  </h1>
                  <p className="text-sm font-medium leading-tight text-[#64748B]">
                      یکی از گزینه‌های زیر را انتخاب کنید.
                  </p>
              </div>
            </div>
             <RadioButton control={control} items={[
                { label: "درون‌گرا", value: "introvert" }, 
                { label: "برون‌گرا", value: "extroverted" },
                ]} name="SpiritStep" />
           </div>
            {/* Footer */}
           <Button onClick={props.handleNextStep}>
            پایان
           </Button>
        </div>
    );
}
