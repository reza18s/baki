import * as SolarIconSet from 'solar-icon-set';
import { useEffect, useState } from 'react';
import { PersonalInterestsItems } from '../../../lib/constants';
import { useLocalStore } from '../../../store/useLocalStore';
import Button from '@/components/base/Button/Button';

export default function GetPersonalInterests(props: {
  className?: string;
  handleSubmit?: () => void;
}) {
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
    <div
      className={`relative flex h-[calc(100%)] w-full flex-col justify-between ${props.className}`}
    >
      <div className="flex flex-col gap-y-4">
        <h1 className="text-[32px] font-bold text-brand-black">
          علایق شخصی من
        </h1>
        <p className="text-sm font-medium leading-tight text-gray-500">
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
                    className={`flex max-w-fit items-center gap-x-3 rounded-[32px] bg-[#F1F5F9] p-[12px] ${selectedInterests.includes(subItem.title) ? 'bg-brand-yellow' : 'bg-[#F1F5F9]'}`}
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
        className={`sticky bottom-0 flex w-full items-center justify-between bg-white pb-6`}
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
        <Button
          disabled={selectedInterests.length < 5}
          onClick={handleSubmit}
          className={`px-5 py-4 ${
            selectedInterests.length > 4 ? 'bg-brand-yellow' : 'bg-slate-100'
          } font-bold leading-none text-brand-black`}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
