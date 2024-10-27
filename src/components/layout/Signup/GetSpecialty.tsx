import { useState } from "react";

export default function GetSpecialty(props: {
    control: any,
    name: string,
    handleSignup: () => void,
}) {
    const interestsItems = [
        {
            title: "پزشکی و سلامت",
            subItems: [
                "پرستار",
                "متخصص طب سنتی",
                "پزشک عمومی",
                "سایر کادر درمان",
                "ماما",
                "پزشک متخصص",
                "کارشناس اتاق عمل",
            ]
        },
        {
            title: "مهندسی",
            subItems: [
                "مهندس عمران",
                "مهندس برق",
                "مهندس کامپیوتر",
                "مهندس مکانیک",
                "سایر رشته های مهندسی",
                "مهندسی شیمی",
                "مهندسی کشاورزی",
            ]
        },
        {
            title: "امور فنی",
            subItems: [
                "برقکار",
                "تاسیسات کار",
                "مکانیک",
                "تعمیر کار",
                "سایر مشاغل فنی",
            ]
        },
        {
            title: "هنر و رسانه",
            subItems: [
                "خبرنگار",
                "هنرمند",
                "موسیقیدان",
                "بازیگر",
                "فیلمساز",
            ]
        },
        {
            title: "امنیتی",
            subItems: [
                "پلیس",
                "آتش نشان",
                "نگهبان",
                "نظامی",
            ]
        },
        {
            title: "گردشگری و هتل داری",
            subItems: [
                "رستوران دار",
                "راهنمای تور",
                "صنایع دستی",
                "هتل دار",
            ]
        },
        {
            title: "آموزش و پرورش",
            subItems: [
                "معلم",
                "استاد",
                "محقق",
                "مترجم",
            ]
        },
        {
            title: "امور خدماتی",
            subItems: [
                "نظافتچی",
                "آژانس املاک",
                "آشپز",
                "آرایشگر",
                "سایر مشاغل خدماتی",
            ]
        },
        {
            title: "امور اداری و مالی",
            subItems: [
                "کارمند بانک",
                "کارمند بیمه",
                "کارمند دفتری",
                "حسابدار",
                "حسابرس",
                "کارمند اداری",
                "منشی",
            ]
        },
        {
            title: "فناوری اطلاعات",
            subItems: [
                "تحلیلگر سیستم",
                "متخصص شبکه",
                "سایر مشاغل IT",
                "برنامه نویس",
            ]
        },
        {
            title: "ورزش",
            subItems: [
                "مجری ورزشی",
                "مربی",
                "ورزشکار",
                "داور",
            ]
        },
        {
            title: "حمل و نقل",
            subItems: [
                "خلبان",
                "کاپیتان",
                "راننده",
            ]
        },
        {
            title: "تولیدی و کشاورزی",
            subItems: [
                "کشاورز",
                "کارگر",
                "تولید کننده",
            ]
        },
        {
            title: "مشاوران، روانشناسان و مددکاران",
            subItems: [
                "روانشناس",
                "تحلیل‌گر سیاسی",
                "جامعه شناس",
                "مشاور",
                "مددکار",
                "اقتصاددان",
            ]
        },
        {
            title: "امور فروشندگی و بازاریابی",
            subItems: [
                "فروشنده",
                "بازاریاب",
            ]
        },
        {
            title: "امور حقوقی",
            subItems: [
                "قاضی",
                "وکیل",
            ]
        },
    ]

    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const handleClickInterests = (selected: string) => {
        if (selectedInterests.includes(selected)) {
            setSelectedInterests((prevInterests: any) => prevInterests.filter((interest: any) => interest !== selected));
        } else {
            setSelectedInterests((prevInterests: any) => prevInterests.concat(selected));
        }
    }

    return (
        <div className="flex flex-col gap-y-[40px] w-full h-full min-h-fit pb-20">
            <div className="flex flex-col gap-y-[16px]">
                <h1 className="text-[32px] font-bold text-brand-black">
                    تخصص من
                </h1>
                <p className="text-sm font-medium leading-tight text-[#64748B]">
                    تخصص خود را از میان موارد زیر انتخاب کنید.
                </p>
            </div>
            {/* Body */}
            <div>
                {
                    interestsItems.map((item) => (
                        <div key={item.title} className="flex flex-col gap-y-3">
                            <h2 className="text-[#1a1d1e] text-lg font-bold">
                                {item.title}
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {
                                    item.subItems.map((subItem) => (
                                        <button onClick={() => { handleClickInterests(subItem) }} key={subItem} className={`rounded-[32px] bg-[#F1F5F9] p-[12px] pl-[16px] max-w-fit flex items-center gap-x-3 ${selectedInterests.includes(subItem) ? 'bg-brand-yellow' : 'bg-[#F1F5F9]'}`}>
                                            <p className="text-[#1a1d1e] text-sm">
                                                {subItem}
                                            </p>
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* Footer */}
            <div className={`bottom-0 flex items-center justify-end gap-x-[16px] min-w-fit w-[90%] px-2 bg-white py-3 sticky`}>
                <button
                    disabled={selectedInterests.length > 4}
                    onClick={props.handleSignup}
                    className={`px-[20px] py-[16px] ${selectedInterests.length > 4
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
