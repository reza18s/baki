import { useForm } from "react-hook-form";
import RadioButton from "../../../shared/Buttons/RadioButton";
import Button from "../../../base/Button/Button";
import { LiaSmokingSolid } from "react-icons/lia";
import { useLocalStore } from "@/store/useLocalStore";

export default function CigarettesStep(props: {
  handleNextStep: () => void;
}) {
  const { control, watch } = useForm();

  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  
  const handleSubmit = () => {
    updateUserInfo({
      smokeStatus: watch("smokeStatus"),
    });
    props.handleNextStep()
  }

  return (
    <div className="flex flex-col gap-y-[40px] w-full mx-auto pt-10 h-[90%] justify-between">
      <div className="flex flex-col gap-y-[60px]">
        <div className="flex flex-col items-center">
          <LiaSmokingSolid className="rotate-12" size={72} />
          <div className="flex flex-col gap-y-[16px] items-center">
            <h1 className="text-[32px] font-bold text-brand-black">سیگار</h1>
            <p className="text-sm font-medium leading-tight text-[#64748B]">
              یکی از گزینه‌های زیر را انتخاب کنید.
            </p>
          </div>
        </div>
        <RadioButton
          control={control}
          items={[
            { label: "به طور منظم", value: "regularly" },
            { label: "بعضی‌وقت‌ها", value: "sometimes" },
            { label: "هرگز", value: "never" },
          ]}
          name="smokeStatus"
        />
      </div>
      {/* Footer */}
      <Button onClick={handleSubmit}>بعدی</Button>
    </div>
  );
}
