import React, { useState } from 'react';
import * as SolarIconSet from 'solar-icon-set';
import UploadPictures from '../../shared/Inputs/UploadPictures';
import { useLocalStore } from '../../../store/useLocalStore';

export default function GetPictures(props: { control: any; name: string }) {
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const hideHelp = () => {
    setShowHelp(false);
  };

  const handleNextStep = useLocalStore((store) => store.handleNextStep);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  return (
    <div className="flex h-[calc(100%)] w-full flex-col justify-between">
      <div className="flex flex-col gap-y-4">
        <h1 className="text-[32px] font-bold text-brand-black">تصاویر من</h1>
        <p className="text-sm font-medium leading-tight text-gray-500">
          در صورت تمایل تصویر دلخواه خود را اپلود کنید.
        </p>
        <UploadPictures />
      </div>
      <div className="flex w-full min-w-fit items-center justify-between">
        <div className="flex min-w-fit items-center justify-between gap-x-[8px]">
          <SolarIconSet.Gallery size={24} />
          <div className="text-xs font-medium leading-none text-[#1a1d1e]">
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
        <button
          disabled={props.name?.length < 1}
          onClick={() => {
            // updateUserInfo({ residenceCity: select });
            handleNextStep();
          }}
          className={`px-5 py-4 ${props.name?.length > 1 ? 'bg-brand-yellow' : 'bg-slate-100'} rounded-[12px] font-bold leading-none text-slate-400`}
        >
          بعدی
        </button>
      </div>
      {/* Help */}
      {showHelp && (
        <div className="absolute left-0 right-0 top-0 z-50 mx-auto flex h-[94vh] w-[100vw] items-end justify-center overflow-hidden bg-black bg-opacity-70 px-6 pb-5">
          <div className="rounded-6 flex min-h-fit w-full flex-col items-center justify-center bg-white px-6 py-3 text-sm text-brand-black">
            {/* Head */}
            <div className="w-full max-w-fit rounded-full p-6 text-brand-yellow">
              <SolarIconSet.GalleryCheck size={64} />
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
            <button
              onClick={hideHelp}
              className="mt-[22px] w-full rounded-[12px] bg-brand-yellow py-4 font-bold text-brand-black"
            >
              فهمیدم !
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
