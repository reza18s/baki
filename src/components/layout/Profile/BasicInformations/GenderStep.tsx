import { useForm } from "react-hook-form";
import RadioButton from "../../../shared/Buttons/RadioButton";
import * as SolarIconSet from "solar-icon-set";
import Button from "../../../base/Button/Button";
import { useLocalStore } from "@/store/useLocalStore";
import { useEffect } from "react";

export default function GenderStep(props: {
  handleNextStep: () => void;
}) {
  const {
    control,
    watch,
    setValue,
  } = useForm();

  const userInfo = useLocalStore((store) => store.userInfo);

  useEffect(() => {
    setValue("gender", userInfo.gender);
  }, [userInfo.gender]);

  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);

  const handleSubmit = () => {
    updateUserInfo({
      gender: watch("gender"),
    });
    props.handleNextStep()
  }

  return (
    <div className="flex flex-col gap-y-[40px] w-full mx-auto pt-10 h-[90%] justify-between">
      <div className="flex flex-col gap-y-[60px]">
        <div className="flex flex-col items-center">
          <SolarIconSet.UserId size={72} />
          <div className="flex flex-col gap-y-[16px] items-center">
            <h1 className="text-[32px] font-bold text-brand-black">جنسیت</h1>
            <p className="text-sm font-medium leading-tight text-[#64748B]">
              یکی از گزینه‌های زیر را انتخاب کنید.
            </p>
          </div>
        </div>
        <RadioButton
          control={control}
          items={[
            { label: "زن", value: "femail" },
            { label: "مرد", value: "mail" },
          ]}
          name="gender"
        />
      </div>
      {/* Footer */}
      <Button onClick={handleSubmit}>بعدی</Button>
    </div>
  );
}
