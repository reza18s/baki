import { useState } from 'react';
import * as SolarIconSet from 'solar-icon-set';

export default function UploadPictures() {
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [secondaryImagePreviews, setSecondaryImagePreviews] = useState<
    (string | null)[]
  >([null, null, null]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number | 'main',
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (index === 'main') {
          setMainImagePreview(reader.result as string);
        } else {
          setSecondaryImagePreviews((prev) => {
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
    <div className="mx-auto flex w-full flex-col items-center justify-center gap-2">
      <div className="relative h-[40dvh] w-full rounded-2xl bg-gray-100">
        <p className="absolute right-[15.83px] top-[16.15px] z-10 rounded-2xl bg-brand-yellow px-[8px] py-[4px] text-xs">
          تصویر اصلی
        </p>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, 'main')}
          className="absolute inset-0 z-20 cursor-pointer opacity-0"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {mainImagePreview ? (
            <img
              src={mainImagePreview}
              alt="Main Preview"
              className="h-full w-full rounded-2xl object-cover"
            />
          ) : (
            <SolarIconSet.AddCircle size={64} />
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        {[4, 3, 2].map((num, index) => (
          <div
            key={index}
            className="relative aspect-square w-full rounded-2xl bg-gray-100"
          >
            <p className="absolute right-[15.83px] top-[16.15px] z-10 rounded-2xl bg-brand-yellow px-[8px] py-[4px] text-xs">
              {num}
            </p>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, index)}
              className="absolute inset-0 z-20 cursor-pointer opacity-0"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {secondaryImagePreviews[index] ? (
                <img
                  src={secondaryImagePreviews[index] || ''}
                  alt={`Preview ${num}`}
                  className="h-full w-full rounded-2xl object-cover"
                />
              ) : (
                <SolarIconSet.AddCircle size={24} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
