import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { IcTickCircle } from '../icons/IcTickCircle';
import { IcStarCircle } from '../icons/IcStarCircle';
import { IcUserHeard } from '../icons/IcUserHeard';
import { IcChat } from '../icons/IcChat';
import { IcClockCircle } from '../icons/IcClockCircle';
import { IcUndo } from '../icons/IcUndo';
import { IcDialog2 } from '../icons/IcDialog2';
const Items = [
  {
    icon: (
      <IcTickCircle className="size-8 stroke-black stroke-[1px]"></IcTickCircle>
    ),
    title: 'سریع و دقیق',
    description: 'درصد تطبیق پروفایل شما با مخاطب در اولین مشاهده مشخص می‌شود.',
  },
  {
    icon: <IcStarCircle></IcStarCircle>,
    title: 'همسفر برتر',
    description:
      'به مدت 24 ساعت یکی از پروفایل های برتر کشور خواهید بود. این باعث می‌شود که بیشتر دیده شوید!',
  },
  {
    icon: <IcUserHeard></IcUserHeard>,
    title: 'مشاهده علاقه‌مندان',
    description:
      'دریافت نوتیفیکیشن هنگام لایک شدن و مشاهده لیست افرادی که شما را لایک کرده اند!',
  },
  {
    icon: <IcDialog2></IcDialog2>,
    title: 'چت بدون محدودیت',
    description: 'محدودیتی در پاسخگویی به درخواست‌های گفتگو و چت وجود ندارد.',
  },
  {
    icon: <IcClockCircle></IcClockCircle>,
    title: 'رفع محدودیت زمانی',
    description: 'محدودیت زمانی در پاسخگویی به درخواست‌ها وجود ندارد.',
  },
  {
    icon: <IcUndo className="size-8"></IcUndo>,
    title: 'قابلیت عقب‌گرد',
    description: 'با گزینه عقب‌گرد می‌تونی همسفر قبلی رو دوباره ببینی!',
  },
];
export const FeaturesCarousel = () => {
  return (
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
              {val.icon}
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
  );
};
