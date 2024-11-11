import { useForm } from "react-hook-form";
import RadioButton from "../../../shared/Buttons/RadioButton";
import * as SolarIconSet from "solar-icon-set";
import Button from "../../../base/Button/Button";
import { useLocalStore } from "@/store/useLocalStore";
import { useEffect } from "react";

export default function MaritalStatusStep(props: {
  handleNextStep: () => void;
}) {
  const { control, watch, setValue } = useForm();

  const userInfo = useLocalStore((store) => store.userInfo);

  useEffect(() => {
    setValue("maritalStatus", userInfo.maritalStatus);
  }, [userInfo.maritalStatus]);

  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  
  const handleSubmit = () => {
    updateUserInfo({
      maritalStatus: watch("maritalStatus"),
    });
    props.handleNextStep()
  }

  return (
    <div className="flex flex-col gap-y-[40px] w-full mx-auto pt-10 h-[90%] justify-between">
      <div className="flex flex-col gap-y-[60px]">
        <div className="flex flex-col items-center">
          <SolarIconSet.Heart size={72} />
          <div className="flex flex-col gap-y-[16px] items-center">
            <h1 className="text-[32px] font-bold text-brand-black">
              وضعیت تاهل
            </h1>
            <p className="text-sm font-medium leading-tight text-[#64748B]">
              یکی از گزینه‌های زیر را انتخاب کنید.
            </p>
          </div>
        </div>
        <RadioButton
          control={control}
          items={[
            { label: "متاهل", value: "married" },
            { label: "مجرد", value: "single" },
          ]}
          name="maritalStatus"
        />
      </div>
      {/* Footer */}
      <Button onClick={handleSubmit}>بعدی</Button>
    </div>
  );
}
