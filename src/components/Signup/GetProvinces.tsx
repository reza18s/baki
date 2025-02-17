import * as SolarIconSet from 'solar-icon-set';
import { Dropdown } from 'antd';
import { useEffect, useState } from 'react';
import { useLocalStore } from '../../store/useLocalStore';
import { iranProvinces } from '@/constants';
import { customToast } from '../base/toast';
import { cities } from '@/constants/iranProvinces';
import Button from '../base/Button/Button';
import { IcLockOpen } from '../icons/IcLockOpen';
import { Input } from '../shared/Inputs/input';
import { IcSearch } from '../icons/IcSearch';
import { IcTick } from '../icons/IcTick';

export default function GetProvinces(props: {
  textAction?: string;
  className?: string;
  handleSubmit?: (data: { city?: string; province?: string }) => void;
}) {
  const [search, setSearch] = useState<string | undefined>();
  const [select, setSelect] = useState<string>();
  const [selectCity, setSelectCity] = useState<string>();
  const [searchCity, setSearchCity] = useState<string | undefined>();
  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);

  const userInfo = useLocalStore((store) => store.userInfo);

  useEffect(() => {
    setSelect(userInfo.province);
    setSelectCity(userInfo.city);
    setSearch(userInfo.province);
    setSearchCity(userInfo.city);
  }, [userInfo.province]);

  const handleSubmit = () => {
    if (!select || !searchCity) {
      return customToast('لطفا استان و شهر خود را انتخاب کنید', 'error');
    }
    updateUserInfo({
      province: select,
      city: selectCity,
    });
    if (props?.handleSubmit) {
      props.handleSubmit({
        province: select,
        city: selectCity,
      });
    } else {
      handleNextStep();
    }
  };
  console.log(selectCity, select);

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
          <Dropdown
            menu={{
              items: iranProvinces
                .filter((e) => e.label.includes(search || ''))
                .map((val) => ({
                  label: (
                    <div
                      onClick={() => {
                        setSelect(val.label);
                        setSearch(val.label);
                        setSelectCity('');
                        setSearchCity('');
                      }}
                      className="w-full border-b p-2 font-iransans font-semibold"
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
            className="w-[90vw]"
            rootClassName="border-2 rounded-lg border-black"
          >
            <Input
              icon={
                select ? (
                  <IcTick className="size-5 rounded-full bg-brand-yellow fill-white p-1"></IcTick>
                ) : (
                  <IcSearch></IcSearch>
                )
              }
              onClick={(e) => e.preventDefault()}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (iranProvinces.find((ob) => ob.label === e.target.value)) {
                  setSelect(
                    iranProvinces.find((ob) => ob.label === e.target.value)
                      ?.label,
                  );
                  setSelectCity('');
                } else {
                  setSelect('');
                  setSelectCity('');
                }
              }}
              className="flex h-[48px] w-[90vw] cursor-pointer items-center justify-start rounded-[12px] border-[1.5px] border-brand-black bg-white p-2 text-base font-bold"
              placeholder="استان محل زندگی خود را انتخاب کنید..."
            />
          </Dropdown>
          {select && (
            <Dropdown
              menu={{
                items: cities
                  .filter(
                    (e) =>
                      e.province_id ===
                      +iranProvinces.find((el) => el.label === select)!.key,
                  )
                  .filter((e) => e.name.includes(searchCity || ''))
                  .map((val) => ({
                    label: (
                      <div
                        onClick={() => {
                          setSelectCity(val.name);
                          setSearchCity(val.name);
                        }}
                        className="w-full border-b p-2 font-iransans font-semibold"
                      >
                        {val.name}
                      </div>
                    ),
                    key: val.name,
                  })),
                style: {
                  maxHeight: '30vh', // Limit the height of the dropdown
                  overflowY: 'auto', // Enable scrolling
                },
              }}
              trigger={['click']}
              className="w-[90vw]"
              rootClassName="border-2 rounded-lg border-black"
            >
              <Input
                icon={
                  selectCity ? (
                    <IcTick className="size-5 rounded-full bg-brand-yellow fill-white p-1"></IcTick>
                  ) : (
                    <IcSearch></IcSearch>
                  )
                }
                onClick={(e) => e.preventDefault()}
                value={searchCity}
                onChange={(e) => {
                  setSearchCity(e.target.value);
                  if (
                    cities
                      .filter(
                        (e) =>
                          e.province_id ===
                          +iranProvinces.find((el) => el.label === select)!.key,
                      )
                      .find((ob) => ob.name === e.target.value)
                  ) {
                    setSelectCity(
                      cities
                        .filter(
                          (e) =>
                            e.province_id ===
                            +iranProvinces.find((el) => el.label === select)!
                              .key,
                        )
                        .find((ob) => ob.name === e.target.value)?.name,
                    );
                  } else {
                    setSelectCity('');
                  }
                }}
                className="flex h-[48px] w-full cursor-pointer items-center justify-start rounded-[12px] border-[1.5px] border-brand-black bg-white p-2 text-base font-bold"
                placeholder="شهر محل زندگی خود را انتخاب کنید..."
              />
            </Dropdown>
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center justify-between gap-x-[8px]">
          <IcLockOpen />
          <p className="text-xs font-medium leading-none text-brand-black">
            شما میتوانید این بخش را در آینده تغییر دهید.
          </p>
        </div>
        <Button
          disabled={!select || !selectCity}
          onClick={handleSubmit}
          className={`h-12 text-nowrap rounded-[12px] px-5 py-4 text-base font-bold leading-none text-brand-black`}
        >
          {props.textAction || 'بعدی'}
        </Button>
      </div>
    </div>
  );
}
