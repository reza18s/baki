import * as SolarIconSet from "solar-icon-set";
import { useEffect, useState } from "react";
import { PersonalInterestsItems } from "./constants";
import { useLocalStore } from "../../../store/useLocalStore";

export default function GetPersonalInterests(props: { handleSubmit?: () => void }) {
  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  const userInfo = useLocalStore((store) => store.userInfo);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const handleClickInterests = (selected: string) => {
    if (selectedInterests.includes(selected)) {
      setSelectedInterests((prevInterests: any) =>
        prevInterests.filter((interest: any) => interest !== selected),
      );
    } else if (selectedInterests.length < 10) {
      setSelectedInterests((prevInterests: any) =>
        prevInterests.concat(selected),
      );
    }
  };

  useEffect(() => {
    setSelectedInterests(userInfo.personalInterests);
  }, [userInfo.personalInterests]);

  const handleSubmit = () => {
    updateUserInfo({
      personalInterests: selectedInterests,
    });
    if (props?.handleSubmit) {
      props.handleSubmit();
    } else {
      handleNextStep();
    }
  };

  return (
    <div className="flex h-[calc(100%-32px)] w-full flex-col gap-y-[40px] pb-20">
      <div className="flex flex-col gap-y-[16px]">
        <h1 className="text-[32px] font-bold text-brand-black">
          علایق شخصی من
        </h1>
        <p className="text-sm font-medium leading-tight text-[#64748B]">
          حداقل ۵ و حداکثر ۱۰ مورد از علاقه‌مندی‌های خود را انتخاب کنید.
        </p>
        <div>
          {PersonalInterestsItems.map((item) => (
            <div key={item.title} className="flex flex-col gap-y-3">
              <h2 className="text-lg font-bold text-[#1a1d1e]">{item.title}</h2>
              <div className="flex flex-wrap gap-3">
                {item.subItems.map((subItem) => (
                  <button
                    onClick={() => {
                      handleClickInterests(subItem.title);
                    }}
                    key={subItem.title}
                    className={`flex max-w-fit items-center gap-x-3 rounded-[32px] bg-[#F1F5F9] p-[12px] ${selectedInterests.includes(subItem.title) ? "bg-brand-yellow" : "bg-[#F1F5F9]"}`}
                  >
                    <img
                      src={subItem.icon}
                      alt={subItem.title}
                      className="h-5 w-5"
                    />
                    <p className="text-sm text-[#1a1d1e]">{subItem.title}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`sticky bottom-0 flex w-full min-w-fit items-center justify-between bg-white pb-5`}
      >
        <div className="flex min-w-fit items-center justify-between gap-x-[8px]">
          <SolarIconSet.CheckCircle
            size={24}
            className="rounded-full bg-[#1A1D1E] text-white"
          />
          <p className="w-[200px] pl-[29px] text-xs font-medium leading-none text-[#1a1d1e]">
            {selectedInterests.length}/5 انتخاب شده
          </p>
        </div>
        <button
          disabled={selectedInterests.length < 5}
          onClick={handleSubmit}
          className={`px-[20px] py-[16px] ${selectedInterests.length > 4 ? "bg-[#ffcc4e]" : "bg-slate-100"
            } rounded-[12px] font-bold leading-none text-slate-400`}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
