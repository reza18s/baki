import { FaCirclePlay } from 'react-icons/fa6';
import CardImage from '../../assets/images/image.png';
import CardAvatar from '../../assets/images/avatar.png';
import { MdVerified } from 'react-icons/md';
import { RiMapPin2Fill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Bio, Info } from './card';
import Button from '@/components/base/Button/Button';
import { IcX } from '@/components/icons/IcX';
import { IcTick } from '@/components/icons/IcTick';
import { RandomUser } from '@/graphql/generated/graphql.codegen';
import { getBaseInfo } from '@/utils/getBaseInfo';
import { IcSendMessageHeart } from '../icons/IcSendMessageHeart';
import { SendMessageModal } from './sendMessageModal';
import ViolationReportModal from './violationReportModal';
import { IcFakeProfile } from '../icons/IcFakeProfile';
import { IcImmoralContent } from '../icons/IcImmoralContent';
import { IcAnInsult } from '../icons/IcAnInsult';
import { IcFraud } from '../icons/IcFraud';
import { IcAdvertisingContent } from '../icons/IcAdvertisingContent';
import { clsx } from 'clsx';
const optionTexts: {
  label: string;
  icon?: ((select: boolean) => React.ReactNode) | React.ReactNode;
}[] = [
  {
    label: 'پروفایل جعلی',
    icon: (select) => (
      <IcFakeProfile
        className={select ? 'fill-brand-yellow' : ''}
      ></IcFakeProfile>
    ),
  },
  {
    label: 'محتوای غیراخلاقی',
    icon: (select) => (
      <IcImmoralContent
        className={select ? 'fill-brand-yellow' : ''}
      ></IcImmoralContent>
    ),
  },
  {
    label: 'توهین',
    icon: (select) => (
      <IcAnInsult className={select ? 'fill-brand-yellow' : ''}></IcAnInsult>
    ),
  },
  {
    label: 'کلاه‌برداری',
    icon: (select) => (
      <IcFraud className={select ? 'fill-brand-yellow' : ''}></IcFraud>
    ),
  },
  {
    label: 'محتوای تبلیغاتی',
    icon: (select) => (
      <IcAdvertisingContent
        className={select ? 'fill-brand-yellow' : ''}
      ></IcAdvertisingContent>
    ),
  },
];

export default function ExploreCard(props: {
  user: RandomUser;
  searchMethod: string;
  className?: string;
  inView: boolean;
  handleSwipe: (id: string, direction: 'left' | 'right') => void;
}) {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState<'sendMessage' | 'violationReport'>();
  const [rotation, setRotation] = useState<number>(0);
  return (
    <>
      <motion.div
        className={clsx(
          'absolute flex max-h-[calc(100%-8px)] w-[calc(100%-16px)] flex-col overflow-y-scroll rounded-2xl',
          props.className,
        )}
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
            props.handleSwipe(props.user.id, 'right'); // Swipe right logic
          } else if (info.offset.x < -200) {
            setSwipeDirection('left');
            props.handleSwipe(props.user.id, 'left'); // Swipe left logic
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
        <div className="flex flex-col rounded-2xl bg-warning-50">
          {/* Image */}
          <div
            className={`flex min-h-[60dvh] flex-col justify-between bg-cover bg-center p-4`}
            style={{
              backgroundImage: `url(${CardImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <p className="mr-auto max-w-fit rounded-2xl bg-brand-yellow px-[8px] py-[4px] text-xs font-medium">
              {props.searchMethod}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-white">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-black text-white">
                    {props.user.name} ، {props.user.age}
                  </h1>
                  <MdVerified size={24} className="fill-brand-yellow" />
                </div>
                <div className="flex items-center gap-x-1 text-white">
                  <RiMapPin2Fill size={16} fill="#fff" className="-mr-[2px]" />
                  {props.user.province}
                </div>
                <div className="flex items-center gap-x-1 text-white">
                  <div className="flex h-[12px] w-[12px] items-center justify-center rounded-full bg-white">
                    <div
                      className={`h-[8px] w-[8px] rounded-full ${
                        props.user ? 'bg-brand-green' : 'bg-red-500'
                      }`}
                    />
                  </div>
                  {props.user ? 'آنلاین' : 'آفلاین'}
                </div>
              </div>
              <div className="flex items-center gap-x-[8px]">
                <div className="size-10 max-h-fit max-w-fit items-center justify-center rounded-full bg-brand-yellow">
                  <img
                    src={CardAvatar}
                    alt="CardAvatar"
                    className="size-10 rounded-full"
                  />
                </div>
                <div className="max-h-fit max-w-fit rounded-full bg-brand-yellow p-[8px]">
                  <FaCirclePlay fill="#000" size={24} />
                </div>
              </div>
            </div>
          </div>
          {/* body */}
          <div className="flex flex-col gap-8 p-4">
            <div className="flex flex-col gap-4">
              <Bio bio={props.user.bio || ''}></Bio>
              <Info
                className="bg-brand-yellow"
                items={getBaseInfo(props.user)}
                title="اطلاعات اولیه"
              ></Info>
            </div>
            <Button
              className="flex h-9 w-full items-center justify-center gap-1 p-0"
              rounded="rounded-3xl"
              onClick={() => setIsOpen('sendMessage')}
            >
              <IcSendMessageHeart></IcSendMessageHeart>
              ارسال پیام برای {props.user.name}
            </Button>
            <Info
              className="bg-warning-100"
              items={props.user.mySpecialty}
              title="تخصص"
            ></Info>
            <Info
              className="bg-warning-100"
              items={props.user.personalInterests}
              title="علایق شخصی من"
            ></Info>
            <Info
              className="bg-warning-100"
              items={props.user.languages}
              title="زبان هایی که میدانم "
            ></Info>
            <Info
              className="bg-warning-100"
              items={props.user.traveledToPlaces}
              title="مکان‌هایی که سفر کرده‌ام"
            ></Info>
            <Info
              className="bg-warning-100"
              items={props.user.livedInPlaces}
              title="مکان‌هایی که زندگی کرده‌ام"
            ></Info>
            <div className="flex justify-between px-8">
              <div className="flex size-20 items-center justify-center rounded-full bg-brand-yellow">
                <IcTick></IcTick>
              </div>
              <div className="flex size-20 items-center justify-center rounded-full bg-brand-yellow">
                <IcX></IcX>
              </div>
            </div>
            <Button className="mx-8" onClick={() => setIsOpen('sendMessage')}>
              ارسال پیام
            </Button>
          </div>
        </div>
        <Button
          variant="white"
          className="text-sm"
          onClick={() => {
            setIsOpen('violationReport');
          }}
        >
          گزارش تخلف کاربر
        </Button>
      </motion.div>
      <div
        className="fixed left-[calc(50vw-48px)] top-[calc(45dvh-48px)] flex size-24 items-center justify-center rounded-full bg-white text-brand-black"
        style={{ pointerEvents: 'none', opacity: Math.abs(rotation / 10) }}
      >
        {rotation > 0 ? <IcTick></IcTick> : <IcX></IcX>}
      </div>
      <SendMessageModal
        isOpen={isOpen === 'sendMessage'}
        user={props.user}
        setClose={() => {
          setIsOpen(undefined);
        }}
      ></SendMessageModal>
      <ViolationReportModal
        onReportSubmit={() => {}}
        loading={false}
        title="گزارش تخلف"
        options={optionTexts}
        setClose={() => {
          setIsOpen(undefined);
        }}
        isOpen={isOpen === 'violationReport'}
      ></ViolationReportModal>
    </>
  );
}
