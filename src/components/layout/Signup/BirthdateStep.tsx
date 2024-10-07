import { Controller, FieldValues } from "react-hook-form";
import * as SolarIconSet from "solar-icon-set";
import { IoEye } from "react-icons/io5";
import { Button, Radio } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

export default function BirthdateStep(props: {
  control: any,
  name: string,
  handleSignup: () => void,
}) {
  const items: MenuProps['items'] = [
    {
      label: <p className="text-center">فروردین</p>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: <p className="text-center w-full">اردیبهشت</p>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <p className="text-center w-full">خرداد</p>,
      key: '3',
    },
    {
      type: 'divider',
    },
    {
      label: <p className="text-center w-full">تیر</p>,
      key: '3',
    },
    {
      type: 'divider',
    },
    {
      label: <p className="text-center w-full">مرداد</p>,
      key: '3',
    },
    {
      type: 'divider',
    },
    {
      label: <p className="text-center w-full">شهریور</p>,
      key: '3',
    },
    {
      type: 'divider',
    },
    {
      label: <p className="text-center w-full">مهر</p>,
      key: '3',
    },
    {
      type: 'divider',
    },
    {
      label: <p className="text-center w-full">آبان</p>,
      key: '3',
    },
    {
      type: 'divider',
    },
    {
      label: <p className="text-center w-full">آذر</p>,
      key: '3',
    },
    {
      type: 'divider',
    },
    {
      label: <p className="text-center w-full">دی</p>,
      key: '3',
    },
    {
      type: 'divider',
    },
    {
      label: <p className="text-center w-full">بهمن</p>,
      key: '3',
    },
    {
      type: 'divider',
    },
    {
      label: <p className="text-center w-full">اسفند</p>,
      key: '3',
    },
  ];
  
  return (
    <div className="flex flex-col gap-y-[40px] w-full">
      <div className="flex flex-col gap-y-[16px]">
        <h1 className="text-[32px] font-bold text-brand-black">
          ماه تولد
        </h1>
        <p className="text-sm font-medium leading-tight text-[#64748B]">
          نشان زودیاک شما با توجه به ماه تولد شما تعیین خواهد شد .
        </p>
      </div>
      {/* Body */}
      <div className="w-full flex items-center justify-center">
        <div>
          <h2 className="text-[##64748B] text-sm font-bold mr-1">
            ماه
          </h2>
          <Dropdown menu={{ items }} trigger={['click']} className="max-w-fit">
              <Button onClick={(e) => e.preventDefault()} className="rounded-[12px] cursor-pointer border-[1.5px] border-[#1a1d1e] max-w-fit text-slate-400 text-base font-bold w-[110px] h-[48px]">
                انتخاب کنید
              </Button>
          </Dropdown>
        </div>
        <div>
        <h2 className="text-[##64748B] text-sm font-bold mr-1">
            سال
          </h2>
          <input dir="ltr" type="tel" className="border-[1.5px] border-[#1a1d1e] rounded-[12px] text-base font-bold text-[#1a1d1e] outline-none bg-white w-[67px] h-[48px] text-center" maxLength={4} min={1320} placeholder="1380" />
        </div>
      </div>
      {/* Footer */}
      <div className="absolute bottom-[24px] flex items-center justify-between gap-x-[16px] min-w-fit w-[90%] px-2">
        <div className="flex items-center gap-x-[8px] min-w-fit justify-between">
          <IoEye size={24} />
          <p
            className="text-[#1a1d1e] text-xs font-medium leading-none w-[200px] pl-[29px]"
          >
            ما فقط سن شما را به کاربران نشان می دهیم و نه تاریخ تولد .
          </p>
        </div>
        <button
          disabled={props.name?.length < 1}
          onClick={props.handleSignup}
          className={`px-[20px] py-[16px] ${props.name?.length > 1
            ? 'bg-[#ffcc4e]'
            : 'bg-slate-100'
            } rounded-[12px] text-slate-400 font-bold leading-none`}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
