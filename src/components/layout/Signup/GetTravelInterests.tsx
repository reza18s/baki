import * as SolarIconSet from 'solar-icon-set';
import { useEffect, useState } from 'react';
import { useLocalStore } from '../../../store/useLocalStore';
import { TravelInterestsItems } from '../../../lib/constants';
import { IcTickCircle } from '@/components/icons/IcTickCircle';
import Button from '@/components/base/Button/Button';
import toast from 'react-hot-toast';
import { Toast } from '@/components/base/toast/toast';

export default function GetTravelInterests(props: {
  className?: string;
  handleSubmit?: () => void;
}) {
  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  const userInfo = useLocalStore((store) => store.userInfo);

  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Update selected interests from user info on component mount
  useEffect(() => {
    setSelectedInterests(userInfo.travelsInterests || []);
  }, [userInfo.travelsInterests]);

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
    updateUserInfo({ travelsInterests: selectedInterests });
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
      <div className="flex flex-col gap-y-4 pt-10">
        <h1 className="text-[32px] font-bold text-brand-black">
          علایق عمومی من در سفر
        </h1>
        <p className="text-sm font-medium leading-tight text-gray-500">
          حداقل ۵ و حداکثر ۱۰ مورد از علاقه‌مندی‌های خود را انتخاب کنید. این
          کمکمون میکنه افراد با علاقه‌مندی‌های مشابه رو بهتون پیشنهاد بدیم!
        </p>
        <div className="mt-6 flex w-full flex-row flex-wrap gap-2">
          {TravelInterestsItems.map((item, index) => (
            <div
              className="flex items-center gap-x-2"
              key={`${item.title}-${index}`}
            >
              {(showAll || index < 9) && (
                <button
                  onClick={() => handleClickInterests(item.title)}
                  className={`flex max-w-fit items-center gap-2 rounded-[32px] p-3 pl-4 ${
                    selectedInterests.includes(item.title)
                      ? 'bg-brand-yellow'
                      : 'bg-gray-100'
                  }`}
                >
                  <img src={item.icon} alt={item.title} className="h-5 w-5" />
                  <p className="text-sm text-brand-black">{item.title}</p>
                </button>
              )}
            </div>
          ))}
          {!showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="flex w-full items-center justify-center gap-x-2"
            >
              <SolarIconSet.AltArrowDown size={16} />
              <p className="text-sm font-bold text-brand-black">مشاهده همه</p>
            </button>
          )}
        </div>
      </div>
      <div
        className={`sticky bottom-0 flex w-full items-center justify-between bg-white ${
          showAll ? 'pb-6' : ''
        }`}
      >
        <div className="flex min-w-fit items-center justify-between gap-x-[8px]">
          <IcTickCircle className="size-6 fill-black stroke-white" />
          <p className="w-[200px] pl-[29px] text-xs font-medium leading-none text-brand-black">
            {selectedInterests.length}/10 انتخاب شده
          </p>
        </div>
        <Button
          disabled={selectedInterests.length < 5}
          onClick={handleSubmit}
          className={`px-5 py-4 ${
            selectedInterests.length >= 5 ? 'bg-brand-yellow' : 'bg-slate-100'
          } rounded-[12px] border-0 font-bold leading-none text-brand-black`}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
