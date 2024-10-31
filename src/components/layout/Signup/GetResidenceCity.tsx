import * as SolarIconSet from "solar-icon-set";
import { Button } from 'antd';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

export default function GetResidenceCity(props: {
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
                    محل زندگی
                </h1>
                <p className="text-sm font-medium leading-tight text-[#64748B]">
                    با توجه به محل زندگی شما پیشنهادات بهتری دریافت خواهید کرد.
                </p>
            </div>
            {/* Body */}
            <div className="w-full flex items-center justify-center">
                <Dropdown menu={{ items }} trigger={['click']} className="w-full">
                    <Button onClick={(e) => e.preventDefault()} className="rounded-[12px] cursor-pointer border-[1.5px] border-[#1a1d1e] text-slate-400 text-base font-bold w-full h-[48px] flex items-center
                     justify-start">
                        <SolarIconSet.Magnifer size={24} />
                        <p>
                            استان محل زندگی خود را انتخاب کنید...
                        </p>
                    </Button>
                </Dropdown>
            </div>
            {/* Footer */}
            <div className="absolute bottom-[24px] flex items-center justify-between gap-x-[16px] min-w-fit w-[90%] px-2">
                <div className="flex items-center gap-x-[8px] min-w-fit justify-between">
                    <SolarIconSet.LockKeyholeUnlocked size={24} />
                    <p
                        className="text-[#1a1d1e] text-xs font-medium leading-none w-[200px] pl-[29px]"
                    >
                        شما میتوانید این بخش را در آینده تغییر دهید.
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
