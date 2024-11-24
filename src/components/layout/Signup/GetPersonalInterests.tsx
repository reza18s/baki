import * as SolarIconSet from 'solar-icon-set';
import { useEffect, useState } from 'react';
import { PersonalInterestsItems } from '../../../lib/constants';
import { useLocalStore } from '../../../store/useLocalStore';
import Button from '@/components/base/Button/Button';
import { IcTickCircle } from '@/components/icons/IcTickCircle';
import toast from 'react-hot-toast';
import { Toast } from '@/components/base/toast/toast';

export default function GetPersonalInterests(props: {
  className?: string;
  handleSubmit?: () => void;
}) {
  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  const userInfo = useLocalStore((store) => store.userInfo);

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  useEffect(() => {
    setSelectedInterests(userInfo.personalInterests || []);
  }, [userInfo.personalInterests]);

  const handleClickInterests = (selected: string) => {
    if (selectedInterests.includes(selected)) {
      setSelectedInterests((prevInterests) =>
        prevInterests.filter((interest) => interest !== selected),
      );
    } else if (selectedInterests.length < 10) {
      setSelectedInterests((prevInterests) => [...prevInterests, selected]);
    } else {
      toast.custom(
        (t) => (
          <Toast t={t} type="error">
            شما نمی‌توانید بیشتر از 10 مورد انتخاب کنید!
          </Toast>
        ),
        { duration: 1500 },
      );
    }
  };

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
      className={`relative flex h-full w-full flex-col justify-between ${props.className}`}
    >
      <div className="flex flex-col gap-y-4 pt-10">
        <h1 className="text-[32px] font-bold text-brand-black">
          علایق شخصی من
        </h1>
        <p className="text-sm font-medium leading-tight text-gray-500">
          حداقل ۵ و حداکثر ۱۰ مورد از علاقه‌مندی‌های خود را انتخاب کنید.
        </p>
        <div className="mt-6 flex flex-col gap-6">
          {PersonalInterestsItems.map((item) => (
            <div key={item.title} className="flex flex-col gap-y-3">
              <h2 className="text-lg font-bold text-brand-black">
                {item.title}
              </h2>
              <div className="flex flex-wrap gap-3">
                {item.subItems.map((subItem) => (
                  <button
                    onClick={() => handleClickInterests(subItem.title)}
                    key={`${item.title}-${subItem.title}`}
                    className={`flex max-w-fit items-center gap-2 rounded-[32px] p-3 pl-4 ${
                      selectedInterests.includes(subItem.title)
                        ? 'bg-brand-yellow'
                        : 'bg-gray-100'
                    }`}
                  >
                    <img
                      src={subItem.icon}
                      alt={subItem.title}
                      className="h-5 w-5"
                    />
                    <p className="text-sm text-brand-black">{subItem.title}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 flex w-full items-center justify-between bg-white pb-6">
        <div className="flex items-center justify-between gap-x-[8px]">
          <IcTickCircle className="size-6 fill-black stroke-white" />
          <p className="pl-[29px] text-xs font-medium leading-none text-brand-black">
            {selectedInterests.length}/10 انتخاب شده
          </p>
        </div>
        <Button
          disabled={selectedInterests.length < 5}
          onClick={handleSubmit}
          className={`px-5 py-4 ${
            selectedInterests.length >= 5 ? 'bg-brand-yellow' : 'bg-slate-100'
          } font-bold leading-none text-brand-black`}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
