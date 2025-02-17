import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { IcTickCircle } from '../icons/IcTickCircle';
import { IcStarCircle } from '../icons/IcStarCircle';
import { IcUserHeard } from '../icons/IcUserHeard';
import { IcClockCircle } from '../icons/IcClockCircle';
import { IcUndo } from '../icons/IcUndo';
import { IcDialog2 } from '../icons/IcDialog2';
const Items = [
  {
    icon: (
      <svg
        width="33"
        height="32"
        viewBox="0 0 33 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.83317 10.332C6.70356 10.332 4.1665 12.8691 4.1665 15.9987C4.1665 19.1283 6.70356 21.6654 9.83317 21.6654C10.629 21.6654 11.2265 21.5223 11.7089 21.2872C12.1921 21.0517 12.6145 20.6974 13.0239 20.198C13.7439 19.3197 14.3348 18.1221 15.1134 16.544C15.2691 16.2285 15.4322 15.8978 15.6054 15.5515C15.7605 15.2413 15.9118 14.9338 16.0608 14.6308C16.835 13.057 17.5496 11.6042 18.4291 10.5314C18.9762 9.86402 19.6154 9.30175 20.4148 8.91224C21.215 8.52229 22.1214 8.33203 23.1665 8.33203C27.4007 8.33203 30.8332 11.7645 30.8332 15.9987C30.8332 20.2329 27.4007 23.6654 23.1665 23.6654C21.4414 23.6654 19.8472 23.0941 18.5659 22.1316C18.1243 21.7999 18.0353 21.173 18.367 20.7314C18.6987 20.2898 19.3255 20.2008 19.7671 20.5325C20.7143 21.244 21.8898 21.6654 23.1665 21.6654C26.2961 21.6654 28.8332 19.1283 28.8332 15.9987C28.8332 12.8691 26.2961 10.332 23.1665 10.332C22.3706 10.332 21.7732 10.4751 21.2908 10.7102C20.8075 10.9456 20.3851 11.3 19.9758 11.7993C19.2558 12.6777 18.6649 13.8753 17.8862 15.4534C17.7306 15.7689 17.5674 16.0995 17.3943 16.4459C17.2392 16.7561 17.0879 17.0636 16.9389 17.3666C16.1647 18.9404 15.4501 20.3932 14.5706 21.466C14.0235 22.1334 13.3843 22.6956 12.5849 23.0852C11.7846 23.4751 10.8783 23.6654 9.83317 23.6654C5.59899 23.6654 2.1665 20.2329 2.1665 15.9987C2.1665 11.7645 5.59899 8.33203 9.83317 8.33203C11.5583 8.33203 13.1529 8.90301 14.4345 9.86587C14.876 10.1976 14.9651 10.8245 14.6333 11.266C14.3016 11.7076 13.6747 11.7966 13.2331 11.4649C12.2861 10.7533 11.1103 10.332 9.83317 10.332Z"
          fill="#1A1D1E"
        />
      </svg>
    ),
    title: 'بی‌نهایت همسفر',
    description: 'با تهیه اشتراک ویژه، هیچ محدودیتی در پیدا کردن همسفر ندارید.',
  },
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
          // bulletClass: 'swiper-pagination-bullet bg-black',
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
