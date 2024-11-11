import { useEffect, useState } from "react";
import { SpecialtyItems } from "./constants";
import { useLocalStore } from "../../../store/useLocalStore";

export default function GetSpecialty(props: {handleSubmit?: () => void}) {
  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string[]>([]);
  const handleClickInterests = (selected: string) => {
    if (selectedSpecialty.includes(selected)) {
      setSelectedSpecialty((prevInterests: any) =>
        prevInterests.filter((interest: any) => interest !== selected),
      );
    } else if (selectedSpecialty.length < 3) {
      setSelectedSpecialty((prevInterests: any) =>
        prevInterests.concat(selected),
      );
    }
  };
  const userInfo = useLocalStore((store) => store.userInfo);

  useEffect(() => {
    setSelectedSpecialty(userInfo.specialty);
  }, [userInfo.specialty]);

  const handleSubmit = () => {
    updateUserInfo({
      specialty: selectedSpecialty
    });
    if (props?.handleSubmit) {
      props.handleSubmit();
    } else {
      handleNextStep();
    }
  };

  return (
    <div className="flex h-full min-h-fit w-full flex-col">
      <div className="flex flex-col gap-y-[16px]">
        <h1 className="text-[32px] font-bold text-brand-black">تخصص من</h1>
        <p className="text-sm font-medium leading-tight text-[#64748B]">
          تخصص خود را از میان موارد زیر انتخاب کنید.
        </p>
      </div>
      {/* Body */}
      <div>
        {SpecialtyItems.map((item) => (
          <div key={item.title} className="flex flex-col gap-y-3">
            <h2 className="text-lg font-bold text-[#1a1d1e]">{item.title}</h2>
            <div className="flex flex-wrap gap-3">
              {item.subItems.map((subItem) => (
                <button
                  onClick={() => {
                    handleClickInterests(subItem);
                  }}
                  key={subItem}
                  className={`flex max-w-fit items-center gap-x-3 rounded-[32px] bg-[#F1F5F9] p-[12px] pl-[16px] ${selectedSpecialty.includes(subItem) ? "bg-brand-yellow" : "bg-[#F1F5F9]"}`}
                >
                  <p className="text-sm text-[#1a1d1e]">{subItem}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div
        className={`sticky bottom-0 flex w-full items-center justify-end bg-white px-2 py-3`}
      >
        <button
          disabled={selectedSpecialty.length < 0}
          onClick={handleSubmit}
          className={`px-[20px] py-[16px] ${
            selectedSpecialty.length > 0 ? "bg-[#ffcc4e]" : "bg-slate-100"
          } rounded-[12px] font-bold leading-none text-slate-400`}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
