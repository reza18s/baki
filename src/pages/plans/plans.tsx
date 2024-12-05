import { Page } from '@/components/layout/Page';
import PlanBg from '../../assets/images/plan-bg.png';
import React, { useState } from 'react';
import { IcXCircle } from '@/components/icons/IcXCircle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { cn } from '@/lib/utils';
import { IcX } from '@/components/icons/IcX';
const Items = [
  {
    icon: '',
    title: 'سریع و دقیق',
    description: 'درصد تطبیق پروفایل شما با مخاطب در اولین مشاهده مشخص می‌شود.',
  },
  {
    icon: '',
    title: 'همسفر برتر',
    description:
      'به مدت 24 ساعت یکی از پروفایل های برتر کشور خواهید بود. این باعث می‌شود که بیشتر دیده شوید!',
  },
  {
    icon: '',
    title: 'مشاهده علاقه‌مندان',
    description:
      'دریافت نوتیفیکیشن هنگام لایک شدن و مشاهده لیست افرادی که شما را لایک کرده اند!',
  },
  {
    icon: '',
    title: 'چت بدون محدودیت',
    description: 'محدودیتی در پاسخگویی به درخواست‌های گفتگو و چت وجود ندارد.',
  },
  {
    icon: '',
    title: 'رفع محدودیت زمانی',
    description: 'محدودیت زمانی در پاسخگویی به درخواست‌ها وجود ندارد.',
  },
  {
    icon: '',
    title: 'قابلیت عقب‌گرد',
    description: 'با گزینه عقب‌گرد می‌تونی همسفر قبلی رو دوباره ببینی!',
  },
];
export const Plans = () => {
  const [select, setSelect] = useState();
  return (
    <Page contentClassName="bg-gray-50 h-full">
      <div
        className="relative -mt-11 flex h-[240px] w-full flex-col items-center justify-center gap-4"
        style={{
          backgroundImage: `url(${PlanBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute right-3 top-14" onClick={() => {}}>
          <IcXCircle className="size-5 stroke-black stroke-[1.1]"></IcXCircle>
        </div>
        <h1 className="mt-10 text-[32px] font-bold">باکی</h1>
        <h2 className="text-lg font-medium">راه‌حلی برای سفرهای از دست رفته</h2>
      </div>
      <div className="flex flex-col gap-8 p-6">
        <div>
          <Swiper
            pagination={{
              clickable: true,
            }}
            spaceBetween={8}
            modules={[Pagination]}
            dir="rtl"
          >
            {Items.map((val) => (
              <SwiperSlide
                className="flex h-auto flex-col items-center justify-center gap-4 rounded-2xl border border-gray-300 bg-white p-4 pb-8"
                key={val.title}
              >
                <div className="flex size-16 items-center justify-center rounded-full bg-brand-yellow">
                  lll
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <h1 className="text-base font-bold">{val.title}</h1>
                  <span className="text-center text-sm font-medium text-gray-500">
                    {val.description}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex w-full flex-col items-center">
          <div
            className={cn(
              'flex w-full justify-between rounded-2xl border border-gray-300 bg-white px-6 py-4',
              true &&
                'border-[1.5px] border-b-[3.5px] border-brand-black bg-brand-yellow',
            )}
          >
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">
                <span className="font-Yekan text-[32px]">12</span> ماهه
              </h1>
              <div
                className={cn(
                  'flex h-6 items-center justify-center rounded-2xl bg-brand-yellow px-3 text-xs font-bold',
                  true && 'bg-white',
                )}
              >
                %47 تخفیف
              </div>
            </div>
            <div className="font-Yekan flex items-center justify-center">
              <div className="font-Yekan flex h-6 items-center justify-center gap-1 text-base font-bold">
                190000
                <span className="font-iransans text-[10px] font-normal">
                  تومان
                </span>
              </div>
              <IcX className="size-7"></IcX>
              <div className="font-Yekan flex h-6 w-5 items-center justify-center rounded-sm border-[1px] border-brand-black text-base font-bold">
                12
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
