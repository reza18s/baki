import { IcHeardTap } from '@/components/icons/IcHeardTap';
import { Page } from '@/components/layout/Page';
import React, { useState } from 'react';
import CardImage from '../../assets/images/image.png';
import BgChat from '../../assets/images/bg-chat.png';
import Button from '@/components/base/Button/Button';
import { IcChatPage } from '@/components/icons/IcChatPage';
import Modal from '@/components/base/Modal/Modal';
import { IcXCircle } from '@/components/icons/IcXCircle';
import { IcExclamationMarkInCircle } from '@/components/icons/IcExclamationMarkInCircle';
import { IcTick } from '@/components/icons/IcTick';
import { IcCase } from '@/components/icons/IcCase';
import { IcChair } from '@/components/icons/IcChair';
import { IcStars } from '@/components/icons/IcStars';
const items = [
  { value: 'all', title: 'همه' },
  { value: 'liked', icon: <IcHeardTap className="size-5"></IcHeardTap> },
  { value: 'random', title: 'تصادفی' },
  { value: 'baseOnInterest', title: 'علاقه‌مندی' },
  { value: 'famous', title: 'مشهور' },
];
export const Notifications = () => {
  const [filter, setFilter] = useState('');
  const [noti, setNoti] = useState([]);
  const [isOpen, setIsOpen] = useState<string>('..');
  return (
    <Page
      headerClassName="py-3 px-4 h-[88px]"
      contentClassName="h-full px-6 pb-20 pt-24 "
      header={
        <div className="flex w-full flex-col justify-center gap-3">
          <h1 className="w-full text-center text-lg font-bold">اعلان ها</h1>
          <div className="scrollbar-hide flex items-center gap-2 overflow-scroll">
            {items.map((val, i) => (
              <div
                key={i}
                className={`${filter === val.value ? 'border-none bg-brand-yellow fill-brand-black text-brand-black' : 'border border-gray-300 text-gray-500'} flex h-8 items-center rounded-lg px-4 text-sm font-bold`}
                onClick={() => setFilter(val.value)}
              >
                {val.title}
                {val.icon}
              </div>
            ))}
          </div>
        </div>
      }
    >
      {noti.length <= 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <IcChatPage></IcChatPage>
          <h1 className="text-center text-base font-bold">
            اعلان‌های شما اینجا نمایش داده می‌شود.
          </h1>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold">جدید</h1>
            <div className="flex flex-1 flex-col gap-2">
              {noti.map((i) => (
                <div key={i} className="flex gap-2">
                  <div className="relative">
                    <div className="aspect-square size-12 overflow-hidden rounded-xl">
                      <img src={CardImage}></img>
                    </div>
                    <div
                      className={`absolute -left-2 bottom-3 size-[14px] rounded-full border-[2.5px] border-white ${false ? 'bg-brand-green' : 'bg-gray-400'}`}
                    ></div>
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-2 border-b border-gray-100 pb-2">
                    <div>
                      <h2 className="text-[14px] font-medium">
                        مونا شمس، درخواست همسفری ارسال کرد.
                      </h2>
                      <span className="text-[10px] text-gray-400">
                        1 ساعت پیش
                      </span>
                    </div>
                    <Button
                      className="flex h-8 items-center px-4"
                      rounded=" rounded-lg"
                    >
                      مشاهده
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex flex-col gap-4 pt-6">
            <div className="absolute h-full w-full bg-white/50"></div>
            <h1 className="text-lg font-bold">منقضی شده</h1>
            <div className="flex flex-1 flex-col gap-2">
              {noti.map((i) => (
                <div key={i} className="flex gap-2">
                  <div className="size-12 overflow-hidden rounded-xl align-super">
                    <img src={CardImage}></img>
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-2 border-b border-gray-100 pb-2">
                    <div>
                      <h2 className="text-[14px] font-medium">
                        مونا شمس، درخواست همسفری ارسال کرد.
                      </h2>
                      <span className="text-[10px] text-gray-400">
                        1 ساعت پیش
                      </span>
                    </div>
                    <Button
                      rounded=" rounded-lg"
                      className="flex h-8 items-center px-4"
                      disabled={true}
                    >
                      مشاهده
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {/* <Modal
        isOpen={!!isOpen}
        onRequestClose={() => {
          setIsOpen(undefined);
        }}
        className="flex w-[90%] flex-col gap-4"
      >
        <div className="flex flex-col gap-4 rounded-2xl bg-brand-yellow p-4">
          <div className="flex w-full items-center justify-between">
            <IcXCircle className="size-5 stroke-black"></IcXCircle>
            <div className="flex items-center justify-center">
              <IcExclamationMarkInCircle className="size-5 fill-black"></IcExclamationMarkInCircle>
              راهنما
            </div>
          </div>
          <div className="flex flex-col gap-6 pt-4">
            <div className="flex w-full flex-col items-center justify-center gap-6 text-base font-bold">
              ارتباط جدیدی ایجاد شد!
              <div className="relative flex">
                <IcStars className="absolute -top-8 left-[calc(50%-24px)] size-12 fill-white/50"></IcStars>
                <IcStars className="absolute -left-8 top-[50%] size-12 -rotate-[15deg] fill-white/50"></IcStars>
                <IcStars className="absolute -right-10 top-[20%] size-12 rotate-[15deg] fill-white/50"></IcStars>
                <div className="-ml-4 aspect-square size-32 rotate-[15deg] overflow-hidden rounded-[27px] border-4 border-white">
                  <img src={CardImage}></img>
                </div>
                <div className="absolute bottom-0 left-[calc(50%-32px)] z-10 flex size-16 items-center justify-center rounded-full bg-white">
                  <IcTick className="size-7"></IcTick>
                </div>
                <div className="aspect-square size-32 -rotate-[15deg] overflow-hidden rounded-[27px] border-4 border-white">
                  <img src={CardImage}></img>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center pt-6">
            <div className="h-[2px] flex-1 bg-white"></div>
            <IcStars></IcStars>
            <div className="h-[2px] flex-1 bg-white"></div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2 pb-4 pt-6">
            <Button
              variant="white"
              className="flex h-10 w-full items-center justify-center gap-1 border-gray-300 p-0 text-sm font-medium"
            >
              <IcCase></IcCase>
              ارسال درخواست همسفری
            </Button>
            <Button
              variant="white"
              className="flex h-10 w-full items-center justify-center gap-1 border-gray-300 p-0 text-sm font-medium"
            >
              <IcChair></IcChair>ارسال دعوت میزبانی
            </Button>
          </div>
        </div>
        <div className="flex w-full items-center gap-2">
          <Button className="h-10 w-full p-0 text-sm">رفتن به صفحه چت</Button>
          <Button variant="white" className="h-10 w-full p-0 text-sm">
            بعدی
          </Button>
        </div>
      </Modal> */}
      <Modal
        isOpen={!!isOpen}
        onRequestClose={() => {
          setIsOpen(undefined);
        }}
        className="flex h-[90dvh] w-[90%] flex-col gap-4"
      >
        <div
          className={`relative flex h-full flex-col justify-between gap-4 overflow-y-scroll rounded-2xl bg-white p-4`}
          style={{
            backgroundImage: `url(${BgChat})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute right-3 top-3">
            <IcXCircle className="size-5 stroke-black"></IcXCircle>
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            <div className="size-20 overflow-hidden rounded-full">
              <img src={CardImage}></img>
            </div>
            <h1 className="flex flex-col items-center text-sm font-bold">
              مونا شمس
              <span className="text-xs text-gray-400">
                آخرین بازدید 2 ساعت پیش
              </span>
            </h1>
            <Button rounded="rounded-3xl" className="h-8 p-0 px-6 text-sm">
              مشاهده پروفایل
            </Button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-4">
              <IcCase className="size-12"></IcCase>
              <h1 className="text-sm font-bold">
                سحر درخواست همسفری ارسال کرده است.
              </h1>
            </div>
            <span className="text-nowrap text-xs font-medium">
              شما 24 ساعت زمان دارید تا به درخواست مونا پاسخ دهید.
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="mr-auto w-fit rounded-xl rounded-bl-sm bg-black p-2 text-sm text-white">
              من تمایل دارم با شما همسفر شوم!
            </div>
          </div>
        </div>
        <div className="flex w-full items-center gap-2">
          <Button className="h-10 w-full p-0 text-sm">رفتن به صفحه چت</Button>
          <Button variant="white" className="h-10 w-full p-0 text-sm">
            بعدی
          </Button>
        </div>
      </Modal>
    </Page>
  );
};
