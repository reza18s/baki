import React, { useState } from 'react';
import * as SolarIconSet from 'solar-icon-set';
import UploadPictures from '../shared/Inputs/UploadPictures';
import { useLocalStore } from '../../store/useLocalStore';
import Modal from '@/components/base/Modal/Modal';
import Button from '../base/Button/Button';
import { customToast } from '../base/toast';
import { client, refreshAccessToken } from '@/graphql/apollo/client';

export default function GetPictures(props: { control: any; name: string }) {
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [secondaryImage, setSecondaryImage] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);
  const { updateUserInfo } = useLocalStore((s) => s);
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);
  const uploadImages = async () => {
    if (!mainImage || secondaryImage.length !== 3) {
      customToast('لطفا اطلاعات خواسته شده را وارد کنید', 'error');
      return;
    }
    const mainFormData = new FormData();
    const secondaryFormData = new FormData();
    if (mainImage) {
      const file = await fetch(mainImage).then((res) => res.blob());
      mainFormData.append('files', file, 'mainImage.jpg');
    }
    for (let i = 0; i < secondaryImage.length; i++) {
      if (secondaryImage[i]) {
        const file = await fetch(secondaryImage[i]!).then((res) => res.blob());
        secondaryFormData.append('files', file, `secondaryImage${i + 1}.jpg`);
      }
    }
    try {
      setUploadStatus(true);
      const response = await fetch(
        `http://localhost:4000/upload/upload-images`,
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
        updateUserInfo({
          mainImage: (await response.json())?.files[0]?.original,
        });
        const secondaryResponse = await fetch(
          `http://localhost:4000/upload/upload-images`,
          {
            method: 'POST',
            body: secondaryFormData,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        if (secondaryResponse.ok) {
          updateUserInfo({
            images: (await secondaryResponse.json())?.files.map(
              (ob: { original: string }) => ob.original,
            ),
          });
          customToast('عکس های اضافی با موفقیت اپلود شد', 'success');
          setTimeout(() => {
            handleNextStep();
          }, 500);
        } else {
          if ((await secondaryResponse.json()).code === 'INVALID_TOKEN') {
            refreshAccessToken(client);
          }
          setUploadStatus(false);
          customToast('مشکلی در اپلود عکس های اضافی  پیش امد', 'error');
        }
      } else {
        if ((await response.json()).code === 'INVALID_TOKEN') {
          refreshAccessToken(client);
        }
        setUploadStatus(false);
        customToast('مشکلی در اپلود عکس های اصلی پیش امد', 'error');
      }
    } catch (err) {
      setUploadStatus(false);
      customToast('مشکلی در سرور پیش امد', 'error');
    }
  };
  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  return (
    <div className="flex h-[calc(100%)] w-full flex-col justify-between">
      <div className="flex flex-col gap-4 pt-10">
        <h1 className="text-[32px] font-bold text-brand-black">تصاویر من</h1>
        <p className="mb-6 text-sm font-medium leading-tight text-gray-500">
          در صورت تمایل تصویر دلخواه خود را اپلود کنید.
        </p>
        <UploadPictures
          setMainImage={(image) => setMainImage(image)}
          setSecondaryImages={(images) => setSecondaryImage(images)}
        />
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center justify-between gap-x-[8px]">
          <SolarIconSet.Gallery size={24} />
          <div className="text-xs font-medium leading-none text-brand-black">
            <p className="font-bold">
              نمی دونی چی آپلود کنی ؟
              <span
                onClick={() => setShowHelp(true)}
                className="mx-1 font-bold underline"
              >
                مشاهده راهنما
              </span>
            </p>
          </div>
        </div>
        <Button
          disabled={!mainImage && !(secondaryImage.length == 3) && uploadStatus}
          loading={uploadStatus}
          onClick={async () => {
            await uploadImages();
          }}
          className={`rounded-[12px] px-5 py-4 font-bold leading-none text-brand-black`}
        >
          بعدی
        </Button>
      </div>
      {/* Help */}
      <Modal
        isOpen={showHelp}
        onRequestClose={() => setShowHelp(false)}
        onCloseEnd={() => setShowHelp(false)}
        className="mt-[55dvh] flex w-[90%] flex-col gap-4 rounded-2xl bg-white p-4"
      >
        <div className="flex items-center justify-center rounded-full">
          <svg
            width="65"
            height="65"
            viewBox="0 0 65 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M59.166 34.3609C59.162 38.2797 59.1322 41.6106 58.9095 44.3437C58.6511 47.5153 58.1215 50.1655 56.9363 52.3665C56.4135 53.3374 55.7711 54.2067 54.9889 54.9889C52.7693 57.2086 49.9413 58.2141 46.3575 58.6959C42.8561 59.1667 38.3686 59.1666 32.6423 59.1666H32.3577C26.6314 59.1666 22.1439 59.1667 18.6425 58.6959C15.0587 58.2141 12.2307 57.2086 10.011 54.9889C8.04319 53.0211 7.02698 50.5718 6.48659 47.5336C5.95573 44.5489 5.85862 40.8356 5.83845 36.2245C5.83331 35.0516 5.83331 33.8111 5.83331 32.5024V32.3576C5.83328 26.6314 5.83326 22.1438 6.304 18.6424C6.78584 15.0586 7.79133 12.2306 10.011 10.011C12.2307 7.79127 15.0587 6.78578 18.6425 6.30394C21.7563 5.88531 25.7626 5.83898 30.6387 5.83388C31.6662 5.83281 32.5 6.66621 32.5 7.69371C32.5 8.72122 31.6659 9.55378 30.6383 9.55487C25.6933 9.56009 22.0133 9.60516 19.1383 9.99169C15.9671 10.4181 14.0552 11.229 12.6421 12.6421C11.229 14.0552 10.4181 15.967 9.99175 19.1383C9.5582 22.363 9.55424 26.6004 9.55424 32.4999C9.55424 33.2204 9.55425 33.9171 9.55509 34.5917L12.0385 32.4187C14.299 30.4408 17.706 30.5542 19.8299 32.6782L30.4711 43.3193C32.1758 45.0241 34.8594 45.2565 36.8319 43.8703L37.5716 43.3504C40.41 41.3556 44.2503 41.5868 46.8289 43.9076L53.8504 50.2269C54.5571 48.7426 54.9767 46.7925 55.2009 44.0416C55.4121 41.4495 55.4411 38.3012 55.4451 34.3609C55.4461 33.3334 56.2787 32.4999 57.3062 32.4999C58.3337 32.4999 59.1671 33.3333 59.166 34.3609Z"
              fill="#FFCC4E"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M47.1666 29.8333C41.5098 29.8333 38.6814 29.8333 36.924 28.0759C35.1666 26.3185 35.1666 23.4901 35.1666 17.8333C35.1666 12.1764 35.1666 9.34797 36.924 7.59061C38.6814 5.83325 41.5098 5.83325 47.1666 5.83325C52.8235 5.83325 55.6519 5.83325 57.4093 7.59061C59.1666 9.34797 59.1666 12.1764 59.1666 17.8333C59.1666 23.4901 59.1666 26.3185 57.4093 28.0759C55.6519 29.8333 52.8235 29.8333 47.1666 29.8333ZM53.9142 15.2475C54.6952 14.4664 54.6952 13.2001 53.9142 12.419C53.1331 11.638 51.8668 11.638 51.0858 12.419L44.5 19.0048L43.2475 17.7524C42.4665 16.9713 41.2001 16.9713 40.4191 17.7524C39.6381 18.5334 39.6381 19.7998 40.4191 20.5808L43.0858 23.2475C43.8668 24.0285 45.1331 24.0285 45.9142 23.2475L53.9142 15.2475Z"
              fill="#FFCC4E"
            />
          </svg>
        </div>
        {/* Body */}
        <div className="flex h-full max-h-[80%] w-full max-w-full flex-col items-center gap-y-4 text-[##64748B]">
          <h1 className="w-full text-center text-2xl font-bold">
            راهنمای آپلود تصاویر
          </h1>
          <div className="flex w-full flex-col gap-y-3">
            <div className="flex items-center gap-x-2">
              <SolarIconSet.CheckCircle
                size={24}
                className="rounded-full bg-brand-yellow text-white"
              />
              <p>فقط خودت توی تصویر باش!</p>
            </div>
            <div className="flex items-center gap-x-2">
              <SolarIconSet.CheckCircle
                size={24}
                className="rounded-full bg-brand-yellow text-white"
              />
              <p>لبخند بزن!</p>
            </div>
            <div className="flex items-center gap-x-2">
              <SolarIconSet.CheckCircle
                size={24}
                className="rounded-full bg-brand-yellow text-white"
              />
              <p>تار نباشه!</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
