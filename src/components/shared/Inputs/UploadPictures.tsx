import { useState } from "react";
import * as SolarIconSet from "solar-icon-set";

export default function UploadPictures() {
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
    )
}