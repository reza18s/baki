import { FaCirclePlay } from 'react-icons/fa6';
import CardAvatar from './image.png';
import { MdVerified } from 'react-icons/md';
import { RiMapPin2Fill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Bio, Info } from './card';
import Button from '@/components/base/Button/Button';
import { IcX } from '@/components/icons/IcX';
import { IcTick } from '@/components/icons/IcTick';
const profileDetails = {
  specialization: ['مهندسی صنعتی'],
  interests: [
    'موسیقی پاپ',
    'تیراندازی',
    'سنجاب',
    'آبجو',
    'فیلم کمدی',
    'تبادل فرهنگی',
  ],
  languagesKnown: ['ترکی', 'لری', 'گیلکی', 'فارسی', 'انگلیسی'],
  placesVisited: [
    'اسپانیا',
    'برزیل',
    'تبریز',
    'گرگان',
    'تهران',
    'اصفهان',
    'شیراز',
  ],
  placesLived: ['شیراز', 'گرگان', 'اسپانیا'],
  info: ['زن', 'مجرد', 'سحر خیز', 'درون گر'],
};
export default function ExploreCard(props: {
  id: number;
  image: string;
  name: string;
  age: number;
  isOnline: boolean;
  location: string;
  searchMethod: string;
  inView: boolean;
  handleSwipe: (id: number) => void;
}) {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(
    null,
  );
  const [rotation, setRotation] = useState<number>(0);

  return (
    <>
      <motion.div
        className="absolute flex max-h-[calc(100%-8px)] w-[calc(100%-16px)] flex-col overflow-y-scroll rounded-2xl bg-warning-50"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={(event, info) => {
          // Update rotation with clamped values to prevent extreme rotation
          const rotateValue = Math.max(-40, Math.min(40, info.offset.x / 20));
          setRotation(rotateValue);
        }}
        onDragEnd={(event, info) => {
          if (info.offset.x > 200) {
            setSwipeDirection('right');
            props.handleSwipe(props.id); // Swipe right logic
          } else if (info.offset.x < -200) {
            setSwipeDirection('left');
            props.handleSwipe(props.id); // Swipe left logic
          } else {
            // Reset rotation with animation when swipe is canceled
            setRotation(0);
          }
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: props.inView ? 1 : 0.98,
          rotate: rotation,
        }} // Dynamic rotation reset with animation
        initial={{ scale: 0.98 }} // Initial scale state
        transition={{ duration: 0.2 }} // Apply duration only for animate
        exit={{
          x: swipeDirection === 'left' ? -500 : 500,
          opacity: 0,
          rotate: rotation,
          transition: { duration: 0.7 }, // Different duration for exit
        }}
      >
        {/* Image */}
        <div
          className={`flex min-h-[60dvh] flex-col justify-between rounded-t-2xl bg-cover bg-center p-4`}
          style={{ backgroundImage: `url(${CardAvatar})` }}
        >
          <p className="max-w-fit rounded-[16px] bg-brand-yellow px-[8px] py-[4px] text-xs font-medium">
            {props.searchMethod}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-sm text-white">
              <div className="flex items-center gap-x-2">
                <h1 className="text-lg font-black">
                  {props.name} ، {props.age}
                </h1>
                <MdVerified size={24} className="mt-3 text-brand-yellow" />
              </div>
              <div className="flex items-center gap-x-1">
                <RiMapPin2Fill size={16} />
                <p>{props.location}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <div className="flex h-[12px] w-[12px] items-center justify-center rounded-full bg-white">
                  <div
                    className={`h-[8px] w-[8px] rounded-full ${
                      props.isOnline ? 'bg-brand-green' : 'bg-red-500'
                    }`}
                  />
                </div>
                <p>{props.isOnline ? 'آنلاین' : 'آفلاین'}</p>
              </div>
            </div>
            <div className="flex items-center gap-x-[8px]">
              <div className="max-h-fit max-w-fit rounded-full bg-brand-yellow p-[8px]">
                <FaCirclePlay size={24} />
              </div>
              <div className="size-10 max-h-fit max-w-fit items-center justify-center rounded-full bg-brand-yellow p-1">
                <img
                  src={CardAvatar}
                  alt="CardAvatar"
                  className="size-7 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
        {/* body */}
        <div className="p-4">
          <Bio
            bio={
              'دختر جوون، اهل عشق و حال، رفیق باز، ولخرج، فریلنسر، آرزوم اینه که تو فرانسه مزون داشته باشم!'
            }
          ></Bio>
          <Info
            className="bg-brand-yellow"
            items={profileDetails.info}
            title="اطلاعات اولیه"
          ></Info>
          <Button className="my-8 h-9 w-full rounded-3xl p-0">
            ارسال پیام برای سحر
          </Button>
          <Info
            className="bg-warning-100"
            items={profileDetails.specialization}
            title="اطلاعات اولیه"
          ></Info>
          <Info
            className="bg-warning-100"
            items={profileDetails.interests}
            title="اطلاعات اولیه"
          ></Info>
          <Info
            className="bg-warning-100"
            items={profileDetails.languagesKnown}
            title="اطلاعات اولیه"
          ></Info>
          <Info
            className="bg-warning-100"
            items={profileDetails.placesVisited}
            title="اطلاعات اولیه"
          ></Info>
          <Info
            className="bg-warning-100"
            items={profileDetails.placesLived}
            title="اطلاعات اولیه"
          ></Info>
        </div>
      </motion.div>
      <div
        className="fixed left-[calc(50vw-48px)] top-[calc(45dvh-48px)] flex size-24 items-center justify-center rounded-full bg-white text-brand-black"
        style={{ pointerEvents: 'none', opacity: Math.abs(rotation / 10) }}
      >
        {rotation > 0 ? <IcTick></IcTick> : <IcX></IcX>}
      </div>
    </>
  );
}
