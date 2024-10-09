import React, { useState } from "react";
import * as SolarIconSet from "solar-icon-set";
import { Button } from 'antd';

export default function PicturesStep(props: {
    control: any,
    name: string,
    handleSignup: () => void,
}) {
    const [showHelp, setShowHelp] = useState<boolean>(false);
    const hideHelp = () => {
        setShowHelp(false);
    };

    const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
    const [secondaryImagePreviews, setSecondaryImagePreviews] = useState<(string | null)[]>([null, null, null]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number | 'main') => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (index === 'main') {
                    setMainImagePreview(reader.result as string);
                } else {
                    setSecondaryImagePreviews(prev => {
                        const newPreviews = [...prev];
                        newPreviews[index] = reader.result as string;
                        return newPreviews;
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col gap-y-[40px] w-full">
            <div className="flex flex-col gap-y-[16px]">
                <h1 className="text-[32px] font-bold text-brand-black">
                    تصاویر من
                </h1>
                <p className="text-sm font-medium leading-tight text-[#64748B]">
                    در صورت تمایل تصویر دلخواه خود را اپلود کنید.
                </p>
            </div>
            {/* Body */}
            <div className="max-w-fit flex flex-col items-center justify-center mx-auto gap-y-[9px]">
                <div className="bg-[#F1F5F9] p-[132px] rounded-[16px] relative">
                    <p className="bg-brand-yellow px-[8px] py-[4px] rounded-[16px] text-xs absolute top-[16.15px] right-[15.83px] z-10">
                        تصویر اصلی
                    </p>
                    <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 'main')}
                        className="absolute inset-0 opacity-0 cursor-pointer z-20"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        {mainImagePreview ? (
                            <img src={mainImagePreview} alt="Main Preview" className="w-full h-full object-cover rounded-[16px]" />
                        ) : (
                            <SolarIconSet.AddCircle size={64} />
                        )}
                    </div>
                </div>
                <div className="w-full flex items-center justify-between">
                    {[4, 3, 2].map((num, index) => (
                        <div key={index} className="bg-[#F1F5F9] p-[40px] rounded-[16px] relative">
                            <p className="bg-brand-yellow px-[8px] py-[4px] rounded-[16px] text-xs absolute top-[16.15px] right-[15.83px] z-10">
                                {num}
                            </p>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, index)}
                                className="absolute inset-0 opacity-0 cursor-pointer z-20"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                {secondaryImagePreviews[index] ? (
                                    <img src={secondaryImagePreviews[index] || ''} alt={`Preview ${num}`} className="w-full h-full object-cover rounded-[16px]" />
                                ) : (
                                    <SolarIconSet.AddCircle size={24} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Footer */}
            <div className="absolute bottom-[24px] flex items-center justify-between gap-x-[16px] min-w-fit w-[90%] px-2">
                <div className="flex items-center gap-x-[8px] min-w-fit justify-between">
                    <SolarIconSet.Gallery size={24} />
                    <div className="text-[#1a1d1e] text-xs font-medium leading-none">
                        <p className="font-bold">
                            نمی دونی چی آپلود کنی ؟<span onClick={() => setShowHelp(true)} className="underline font-bold mx-1">مشاهده راهنما</span>
                        </p>
                    </div>
                </div>
                <button
                    disabled={props.name?.length < 1}
                    onClick={props.handleSignup}
                    className={`px-[20px] py-[16px] ${props.name?.length > 1 ? 'bg-[#ffcc4e]' : 'bg-slate-100'} rounded-[12px] text-slate-400 font-bold leading-none`}
                >
                    بعدی
                </button>
            </div>
            {/* Help */}
            {
                showHelp &&
                <div className="absolute w-[100vw] overflow-hidden h-[94vh] top-0 flex items-end justify-center px-[24px] pb-5 bg-black bg-opacity-70 z-50 mx-auto left-0 right-0">
                    <div className="bg-white min-h-fit w-full rounded-[24px] flex flex-col items-center justify-center py-3 px-[24px] text-brand-black text-sm">
                        {/* Head */}
                        <div className="w-full text-brand-yellow rounded-full p-[16px] max-w-fit">
                            <SolarIconSet.GalleryCheck size={64} />
                        </div>
                        {/* Body */}
                        <div className="w-full h-full max-w-full max-h-[80%] text-[##64748B] flex flex-col items-center gap-y-4">
                            <h1 className="text-2xl font-bold text-center w-full">
                                راهنمای آپلود تصاویر
                            </h1>
                            <div className="flex flex-col gap-y-3 w-full">
                                <div className="flex items-center gap-x-2">
                                    <SolarIconSet.CheckCircle size={24} className="bg-brand-yellow text-white rounded-full" />
                                    <p>
                                        فقط خودت توی تصویر باش!
                                    </p>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <SolarIconSet.CheckCircle size={24} className="bg-brand-yellow text-white rounded-full" />
                                    <p>
                                        لبخند بزن!
                                    </p>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <SolarIconSet.CheckCircle size={24} className="bg-brand-yellow text-white rounded-full" />
                                    <p>
                                        تار نباشه!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button onClick={hideHelp} className="text-brand-black bg-brand-yellow rounded-[12px] w-full py-[16px] font-bold mt-[22px]">
                            فهمیدم !
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}
