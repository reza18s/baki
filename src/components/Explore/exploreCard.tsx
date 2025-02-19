import { FaCirclePlay } from 'react-icons/fa6';
import CardAvatar from '../../assets/male/Memoji1.png';
import { MdVerified } from 'react-icons/md';
import { RiMapPin2Fill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Bio, Info } from './card';
import Button from '@/components/base/Button/Button';
import { IcX } from '@/components/icons/IcX';
import { IcTick } from '@/components/icons/IcTick';
import { RandomUser } from '@/graphql/generated/graphql.codegen';
import { getBaseInfo } from '@/utils/getBaseInfo';
import { IcSendMessageHeart } from '../icons/IcSendMessageHeart';
import { SendMessageModal } from './sendMessageModal';
import ViolationReportModal from './violationReportModal';
import { optionTexts } from '@/utils';
import { cn } from '@/lib/utils';
import { IcNoImage } from '../icons/IcNoImage';
import { allAvatars } from '@/constants';
import Modal from '../base/Modal/Modal';
import { Player } from '@lottiefiles/react-lottie-player';
import { IcXCircle } from '../icons/IcXCircle';
import RecordAnimation from '@/assets/recordA.json';
import { customToast } from '../base/toast';
export default function ExploreCard({
  user,
  drag = true,
  handleSwipe,
  inView,
  searchMethod,
  className,
}: {
  user: RandomUser;
  searchMethod: string;
  className?: string;
  inView: boolean;
  drag?: boolean;
  handleSwipe: (id: string, direction: 'left' | 'right') => void;
}) {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState<
    'sendMessage' | 'violationReport' | 'avatar' | 'record'
  >();

  const [audio, setAudio] = useState(
    user?.record ? new Audio(user?.record) : undefined,
  );
  const playAudio = () => {
    if (audio) {
      setIsOpen('record');
      audio?.play();
    } else {
      customToast('کاربر ریکورد نداد', 'error');
    }
  };
  const pauseAudio = () => {
    setIsOpen(undefined);
    audio?.pause();
  };
  useEffect(() => {
    if (user?.record) {
      setAudio(new Audio(user?.record));
    }
  }, [user?.record]);
  useEffect(() => {
    const handleAudioEnd = () => {
      setIsOpen(undefined);
    };
    audio?.addEventListener('ended', handleAudioEnd);
    return () => {
      audio?.removeEventListener('ended', handleAudioEnd);
    };
  }, [audio]);
  const [rotation, setRotation] = useState<number>(0);
  return (
    <>
      <motion.div
        className={cn(
          'absolute flex max-h-[calc(100%-32px)] w-[calc(100%-32px)] flex-col overflow-y-scroll rounded-2xl bg-warning-50',
          className,
        )}
        drag={drag && 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={(event, info) => {
          // Update rotation with clamped values to prevent extreme rotation
          const rotateValue = Math.max(-40, Math.min(40, info.offset.x / 20));
          setRotation(rotateValue);
        }}
        dragElastic={0.6}
        onDragEnd={(event, info) => {
          if (info.offset.x > 200) {
            setSwipeDirection('right');
            handleSwipe(user?.id, 'right'); // Swipe right logic
            setTimeout(() => {
              setRotation(0);
            }, 200);
          } else if (info.offset.x < -200) {
            setSwipeDirection('left');
            handleSwipe(user?.id, 'left'); // Swipe left logic
            setTimeout(() => {
              setRotation(0);
            }, 200);
          } else {
            // Reset rotation with animation when swipe is canceled
            setRotation(0);
          }
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: inView ? 1 : 0.98,
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
            className={cn(
              `relative flex min-h-[60dvh] flex-col justify-between bg-cover bg-center p-4`,
              !user?.mainImage && 'border-b border-brand-black',
            )}
            style={{
              backgroundImage: `url(${user?.mainImage || ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {!user?.mainImage && (
              <div className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-yellow">
                <IcNoImage></IcNoImage>
              </div>
            )}
            <p className="mr-auto max-w-fit rounded-2xl bg-brand-yellow px-[8px] py-[4px] text-xs font-medium">
              {searchMethod}
            </p>
            <div className="relative z-[1] flex items-center justify-between">
              <div className={cn('text-sm', user?.mainImage && 'text-white')}>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-black">
                    {user?.name} ، {user?.age}
                  </h1>
                  <MdVerified size={24} className="fill-brand-yellow" />
                </div>
                <div className="flex items-center gap-x-1">
                  <RiMapPin2Fill
                    size={16}
                    fill={!user?.mainImage ? '#000' : '#fff'}
                    className="-mr-[2px]"
                  />
                  {user?.province}, {user?.city}
                </div>
                <div className="flex items-center gap-x-1">
                  <div className="flex h-[12px] w-[12px] items-center justify-center rounded-full">
                    <div
                      className={`h-[8px] w-[8px] rounded-full ${
                        user?.isOnline ? 'bg-brand-green' : 'bg-red-500'
                      }`}
                    />
                  </div>
                  {user?.isOnline ? 'آنلاین' : 'آفلاین'}
                </div>
              </div>
              <div className="flex items-center gap-x-[8px]">
                {user?.avatar && (
                  <div
                    className="size-10 max-h-fit max-w-fit items-center justify-center rounded-full bg-brand-yellow"
                    onClick={() => setIsOpen('avatar')}
                  >
                    <img
                      src={
                        allAvatars.find((a) => a.path === user?.avatar)
                          ?.avatar || CardAvatar
                      }
                      alt="CardAvatar"
                      className="size-10 rounded-full"
                    />
                  </div>
                )}
                {user?.record && (
                  <div
                    className="max-h-fit max-w-fit rounded-full bg-brand-yellow p-[8px]"
                    onClick={() => {
                      playAudio();
                    }}
                  >
                    <FaCirclePlay fill="#000" size={24} />
                  </div>
                )}
              </div>
            </div>
            {user?.mainImage && (
              <div className="absolute bottom-0 left-0 z-0 h-[130px] w-full rounded-t-2xl bg-gradient-to-b from-transparent to-brand-black/70"></div>
            )}
          </div>
          {/* body */}
          <div className="flex flex-col gap-8 p-4">
            <div className="flex flex-col gap-4">
              <Bio bio={user?.bio || ''}></Bio>
              <Info
                className="bg-brand-yellow"
                items={getBaseInfo(user) as string[]}
                title="اطلاعات اولیه"
              ></Info>
            </div>
            <Button
              className="flex h-9 w-full items-center justify-center gap-1 p-0"
              rounded="rounded-3xl"
              onClick={() => setIsOpen('sendMessage')}
            >
              <IcSendMessageHeart></IcSendMessageHeart>
              ارسال پیام برای {user?.name}
            </Button>
            <Info
              className="bg-warning-100"
              items={user?.mySpecialty}
              title="تخصص"
            ></Info>
            <Info
              className="bg-warning-100"
              items={user?.personalInterests}
              title="علایق شخصی من"
            ></Info>
            <Info
              className="bg-warning-100"
              items={user?.languages}
              title="زبان هایی که میدانم "
            ></Info>
            <Info
              className="bg-warning-100"
              items={user?.traveledToPlaces}
              title="مکان‌هایی که سفر کرده‌ام"
            ></Info>
            <Info
              className="bg-warning-100"
              items={user?.livedInPlaces}
              title="مکان‌هایی که زندگی کرده‌ام"
            ></Info>
          </div>
          {user?.images?.map((image) => (
            <div
              key={image}
              className="flex items-center justify-center bg-brand-black"
            >
              <img src={image} className="bg-warning-100"></img>
            </div>
          ))}
          <div className="my-8 flex justify-between px-8">
            <div
              className="flex size-20 items-center justify-center rounded-full bg-brand-yellow"
              onClick={() => handleSwipe(user?.id, 'right')}
            >
              <IcTick></IcTick>
            </div>
            <div
              className="flex size-20 items-center justify-center rounded-full bg-brand-yellow"
              onClick={() => handleSwipe(user?.id, 'left')}
            >
              <IcX></IcX>
            </div>
          </div>
          <Button
            className="mx-8 mb-4 py-4"
            onClick={() => setIsOpen('sendMessage')}
          >
            ارسال پیام
          </Button>
        </div>
        <Button
          variant="white"
          className="py-4 text-sm"
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

      <Modal
        isOpen={isOpen === 'avatar'}
        onRequestClose={() => setIsOpen(undefined)}
      >
        <div className="relative flex size-64 items-center justify-center rounded-full bg-gray-100">
          <div
            className="absolute right-0 top-0 z-10"
            onClick={() => setIsOpen(undefined)}
          >
            <IcXCircle className="size-5 stroke-1"></IcXCircle>
          </div>
          <img
            src={
              allAvatars.find((a) => a.path === user?.avatar)?.avatar ||
              CardAvatar
            }
            className="size-48"
          ></img>
        </div>
      </Modal>
      <Modal isOpen={isOpen === 'record'} onRequestClose={() => pauseAudio()}>
        <div className="relative flex size-64 items-center justify-center rounded-full bg-gray-100">
          <div
            className="absolute right-0 top-0 z-10"
            onClick={() => pauseAudio()}
          >
            <IcXCircle className="size-5 stroke-1"></IcXCircle>
          </div>
          <Player
            autoplay
            loop
            src={RecordAnimation}
            style={{ height: '256px', width: '256px' }}
          ></Player>
        </div>
      </Modal>
      <SendMessageModal
        isOpen={isOpen === 'sendMessage'}
        user={user}
        setClose={() => {
          setIsOpen(undefined);
        }}
      ></SendMessageModal>
      <ViolationReportModal
        id={user?.id}
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
