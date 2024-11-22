import * as SolarIconSet from 'solar-icon-set';
import { Dropdown } from 'antd';
import { useEffect, useState } from 'react';
import { useLocalStore } from '../../../store/useLocalStore';
import { iranProvinces } from '@/lib/constants';

export default function GetProvinces(props: {
  className?: string;
  handleSubmit?: () => void;
}) {
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState<string>();
  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);

  const userInfo = useLocalStore((store) => store.userInfo);

  useEffect(() => {
    setSelect(userInfo.residenceCity);
  }, [userInfo.residenceCity]);

  const handleSubmit = () => {
    updateUserInfo({
      residenceCity: select,
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
      <div className="flex flex-col gap-4 pt-10">
        <h1 className="text-[32px] font-bold text-brand-black">محل زندگی</h1>
        <p className="text-sm font-medium leading-tight text-gray-500">
          با توجه به محل زندگی شما پیشنهادات بهتری دریافت خواهید کرد.
        </p>
        <div className="mt-6 flex w-full flex-col items-center justify-center gap-2">
          {select && (
            <div className="flex h-[48px] w-full cursor-pointer items-center justify-start rounded-[12px] border-[1.5px] border-brand-black bg-white p-2 text-base font-bold">
              {select}
            </div>
          )}
          <Dropdown
            menu={{
              items: iranProvinces
                .filter((e) => e.label.includes(search))
                .map((val) => ({
                  label: (
                    <div
                      onClick={() => {
                        setSelect(val.label);
                      }}
                      className="w-full border-b p-2 font-semibold font-iransans"
                    >
                      {val.label}
                    </div>
                  ),
                  key: val.key,
                })),
              style: {
                maxHeight: '30vh', // Limit the height of the dropdown
                overflowY: 'auto', // Enable scrolling
              },
            }}
            trigger={['click']}
            className="w-full"
            rootClassName="border-2 rounded-lg border-black"
          >
            <input
              onClick={(e) => e.preventDefault()}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex h-[48px] w-full cursor-pointer items-center justify-start rounded-[12px] border-[1.5px] border-brand-black bg-white p-2 text-base font-bold"
              placeholder="استان محل زندگی خود را انتخاب کنید..."
            />
          </Dropdown>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex min-w-fit items-center justify-between gap-x-[8px]">
          <SolarIconSet.LockKeyholeUnlocked size={24} />
          <p className="w-[200px] pl-[29px] text-xs font-medium leading-none text-brand-black">
            شما میتوانید این بخش را در آینده تغییر دهید.
          </p>
        </div>
        <button
          disabled={!select}
          onClick={handleSubmit}
          className={`px-5 py-4 ${
            select ? 'bg-brand-yellow' : 'bg-slate-100'
          } rounded-[12px] font-bold leading-none text-brand-black`}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
