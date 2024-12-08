import { useEffect, useState } from 'react';
import { SpecialtyItems } from '../../constants';
import { useLocalStore } from '../../store/useLocalStore';
import Button from '../base/Button/Button';

export default function GetSpecialty(props: {
  textAction?: string;
  className?: string;
  handleSubmit?: (data: { mySpecialty?: string[] }) => void;
}) {
  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  const userInfo = useLocalStore((store) => store.userInfo);

  const [selectedSpecialty, setSelectedSpecialty] = useState<string[]>([]);

  // Enforce single-selection logic
  const handleClickSpecialty = (selected: string) => {
    setSelectedSpecialty((prev) => (prev.includes(selected) ? [] : [selected]));
  };

  useEffect(() => {
    if (userInfo.mySpecialty) {
      setSelectedSpecialty(userInfo.mySpecialty);
    }
  }, [userInfo.mySpecialty]);

  const handleSubmit = () => {
    updateUserInfo({
      mySpecialty: selectedSpecialty,
    });
    if (props?.handleSubmit) {
      props.handleSubmit({
        mySpecialty: selectedSpecialty,
      });
    } else {
      handleNextStep();
    }
  };

  return (
    <div
      className={`relative flex h-[calc(100%)] w-full flex-col justify-between ${props.className}`}
    >
      <div className="flex flex-col gap-y-4 pt-10">
        <h1 className="text-[32px] font-bold text-brand-black">تخصص من</h1>
        <p className="text-sm font-medium leading-tight text-gray-500">
          تخصص خود را از میان موارد زیر انتخاب کنید.
        </p>
      </div>

      {/* Body */}
      <div className="mt-6 flex flex-col gap-6">
        {SpecialtyItems.map((item) => (
          <div key={item.title} className="flex flex-col gap-y-3">
            <h2 className="text-lg font-bold text-brand-black">{item.title}</h2>
            <div className="flex flex-wrap gap-3">
              {item.subItems.map((subItem) => (
                <button
                  onClick={() => handleClickSpecialty(subItem)}
                  key={`${item.title}-${subItem}`}
                  className={`flex max-w-fit items-center gap-2 rounded-[32px] p-3 pl-4 ${
                    selectedSpecialty.includes(subItem)
                      ? 'bg-brand-yellow'
                      : 'bg-gray-100'
                  }`}
                >
                  <p className="text-sm text-brand-black">{subItem}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 flex w-full items-center justify-end bg-white pb-6">
        <Button
          disabled={selectedSpecialty.length === 0}
          onClick={handleSubmit}
          className={`text-nowrap rounded-[12px] px-5 py-4 font-bold leading-none text-brand-black`}
        >
          {props.textAction || 'بعدی'}
        </Button>
      </div>
    </div>
  );
}
