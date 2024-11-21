import * as SolarIconSet from 'solar-icon-set';
import { useEffect, useState } from 'react';
import { useLocalStore } from '../../../store/useLocalStore';
import { TravelInterestsItems } from '../../../lib/constants';
import { Button } from 'antd';

export default function GetTravelInterests(props: {
  className?: string;
  handleSubmit?: () => void;
}) {
  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  const [showAll, setShowAll] = useState<boolean>(false);
  const setShowAllTrue = () => {
    setShowAll(true);
  };
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

  const userInfo = useLocalStore((store) => store.userInfo);
  useEffect(() => {
    setSelectedInterests(userInfo.travelsInterests);
  }, [userInfo.travelsInterests]);

  const handleSubmit = () => {
    updateUserInfo({
      travelsInterests: selectedInterests,
    });
    if (props?.handleSubmit) {
      props.handleSubmit();
    } else {
      handleNextStep();
    }
  };

  return (
    <div
      className={`relative flex h-full max-h-full w-full flex-col justify-between ${props.className}`}
    >
      <div className="flex flex-col gap-y-4">
        <h1 className="text-[32px] font-bold text-brand-black">
          علایق عمومی من در سفر
        </h1>
        <p className="text-sm font-medium leading-tight text-gray-500">
          حداقل ۵ و حداکثر ۱۰ مورد از علاقه‌مندی‌های خود را انتخاب کنید. این
          کمکمون میکنه افراد با علاقه‌مندی‌های مشابه رو بهتون پیشنهاد بدیم!
        </p>
        <div className="mb-10 flex min-h-fit w-full flex-col items-start justify-around gap-y-3">
          {TravelInterestsItems.map((item, index) => {
            const nextIndex =
              TravelInterestsItems.length + 1 >= index && (showAll || index < 9)
                ? index + 1
                : 0;
            const nextItem =
              nextIndex > 0 ? TravelInterestsItems[nextIndex] : null;
            if (index % 2 === 0) {
              return (
                <div className="flex items-center gap-x-2" key={item.title}>
                  {(showAll || index < 9) && (
                    <button
                      onClick={() => {
                        handleClickInterests(item.title);
                      }}
                      key={index}
                      className={`flex max-w-fit items-center gap-x-3 rounded-[32px] p-[12px] ${selectedInterests.includes(item.title) ? 'bg-brand-yellow' : 'bg-[#F1F5F9]'}`}
                    >
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="h-5 w-5"
                      />
                      <p className="text-sm text-[#1a1d1e]">{item.title}</p>
                    </button>
                  )}
                  {nextIndex > 0 && nextItem && (
                    <button
                      onClick={() => {
                        handleClickInterests(nextItem.title);
                      }}
                      key={nextIndex}
                      className={`flex max-w-fit items-center gap-x-3 rounded-[32px] bg-[#F1F5F9] p-[12px] ${selectedInterests.includes(nextItem.title) ? 'bg-brand-yellow' : 'bg-[#F1F5F9]'}`}
                    >
                      <img
                        src={nextItem.icon}
                        alt={nextItem.title}
                        className="h-5 w-5"
                      />
                      <p className="text-sm text-[#1a1d1e]">{nextItem.title}</p>
                    </button>
                  )}
                </div>
              );
            }
          })}
          <button
            onClick={setShowAllTrue}
            className={`${showAll ? 'hidden' : 'flex'} -mt-16 w-full items-center justify-center gap-x-2`}
          >
            <SolarIconSet.AltArrowDown size={16} />
            <p className="text-sm font-bold text-[#1a1d1e]">مشاهده همه</p>
          </button>
        </div>
      </div>
      <div
        className={`sticky bottom-0 flex w-full items-center justify-between bg-white ${showAll ? 'pb-6 pt-3' : ''}`}
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
          disabled={selectedInterests.length < 4}
          onClick={handleSubmit}
          className={`px-5 py-4 ${
            selectedInterests.length > 4 ? 'bg-brand-yellow' : 'bg-slate-100'
          } rounded-[12px] border-0 font-bold leading-none text-slate-400`}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
