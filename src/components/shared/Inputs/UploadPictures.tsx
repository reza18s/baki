import { customToast } from '@/components/base/toast';
import { client, refreshAccessToken } from '@/graphql/apollo/client';
import { useUpdateUserMutation } from '@/graphql/generated/graphql.codegen';
import { useLocalStore } from '@/store/useLocalStore';
import { useEffect, useState } from 'react';
import * as SolarIconSet from 'solar-icon-set';

export default function UploadPictures({
  setMainImage,
  setSecondaryImages,
  onChange = false,
}: {
  mainImage?: string | null;
  secondaryImages?: (string | null)[];
  setMainImage?: (images: string | null) => void;
  setSecondaryImages?: (images: (string | null)[]) => void;
  onChange?: boolean;
}) {
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [secondaryImagePreviews, setSecondaryImagePreviews] = useState<
    (string | null)[]
  >([null, null, null]);
  const {
    userInfo: { mainImage, images },
    updateUserInfo,
  } = useLocalStore((s) => s);
  const [updateUser, { loading }] = useUpdateUserMutation();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number | 'main',
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (index === 'main') {
          setMainImagePreview(reader.result as string);
          setMainImage?.(reader.result as string);
          if (onChange) {
            try {
              const mainFormData = new FormData();
              if (reader.result) {
                const file = await fetch(reader.result as string).then((res) =>
                  res.blob(),
                );

                mainFormData.append('files', file, 'mainImage.jpg');
              }
              const response = await fetch(
                `${import.meta.env.VITE_APP_BASE}/upload/upload-images`,
                {
                  method: 'POST',
                  body: mainFormData,
                  redirect: 'follow',
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                },
              );
              if (response.ok) {
                customToast('عکس اصلی با موفقیت اپلود شد', 'success');
                const image = (await response.json())?.files[0]?.original;
                updateUserInfo({
                  mainImage: image,
                });
                updateUser({ variables: { mainImage: image } });
              } else {
                if ((await response.json()).code === 'INVALID_TOKEN') {
                  refreshAccessToken(client);
                }
                customToast('مشکلی در اپلود عکس های اصلی پیش امد', 'error');
              }
            } catch (error) {
              console.log(error);
              customToast('مشکلی در اپلود عکس های اصلی پیش امد', 'error');
            }
          }
        } else {
          setSecondaryImagePreviews((prev) => {
            const newPreviews = [...prev];
            newPreviews[index] = reader.result as string;
            return newPreviews;
          });
          if (onChange) {
            try {
              const formData = new FormData();
              if (reader.result) {
                const file = await fetch(reader.result as string).then((res) =>
                  res.blob(),
                );
                formData.append('files', file, 'Image.jpg');
              }
              const response = await fetch(
                `${import.meta.env.VITE_APP_BASE}/upload/upload-images`,
                {
                  method: 'POST',
                  body: formData,
                  redirect: 'follow',
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                },
              );
              if (response.ok) {
                customToast('عکس اضافی با موفقیت اپلود شد', 'success');
                const imagesUrl = [...images];
                imagesUrl[index] = (await response.json())?.files[0]?.original;
                updateUserInfo({
                  images: imagesUrl,
                });
                updateUser({
                  variables: {
                    images: imagesUrl,
                  },
                });
              } else {
                if ((await response.json()).code === 'INVALID_TOKEN') {
                  refreshAccessToken(client);
                }
                customToast('مشکلی در اپلود عکس های اضافی پیش امد', 'error');
              }
            } catch (error) {
              console.log(error);
              customToast('مشکلی در اپلود عکس های اضافی پیش امد', 'error');
            }
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    setSecondaryImages?.(secondaryImagePreviews);
  }, [secondaryImagePreviews]);
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
          {mainImagePreview || mainImage ? (
            <img
              src={mainImagePreview || mainImage}
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
            <p className="absolute right-[8px] top-[8px] z-10 rounded-2xl bg-brand-yellow px-[8px] py-[4px] text-xs">
              {num}
            </p>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, index)}
              className="absolute inset-0 z-20 cursor-pointer opacity-0"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {secondaryImagePreviews[index] || images[index] ? (
                <img
                  src={secondaryImagePreviews[index] || images[index]}
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
