import React, { useEffect, useState } from 'react';
import { FaCirclePlay } from 'react-icons/fa6';
import { MdVerified } from 'react-icons/md';
import { RiMapPin2Fill } from 'react-icons/ri';
import { Bio, Info } from '../Explore/card';
import Button from '../base/Button/Button';
import { IcTick } from '../icons/IcTick';
import { IcX } from '../icons/IcX';
import { User } from '@/graphql/generated/graphql.codegen';
import CardAvatar from '../../assets/male/Memoji1.png';
import clsx from 'clsx';
import { getBaseInfo } from '@/utils/getBaseInfo';
import { SendMessageModal } from '../Explore/sendMessageModal';
import ViolationReportModal from '../Explore/violationReportModal';
import { optionTexts } from '@/utils';
import { cn } from '@/lib/utils';
import { IcNoImage } from '../icons/IcNoImage';
import { allAvatars } from '@/constants';
import Modal from '../base/Modal/Modal';
import { IcXCircle } from '../icons/IcXCircle';

export const ProfileCard = ({
  user,
  className,
  me = false,
}: {
  me?: boolean;
  user: User;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState<
    'sendMessage' | 'violationReport' | 'avatar' | 'record'
  >();
  const [audio, setAudio] = useState(
    user.record ? new Audio(user.record) : undefined,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const playAudio = () => {
    setIsOpen('record');
    audio?.play();
    setIsPlaying(true);
  };
  const pauseAudio = () => {
    setIsOpen(undefined);
    audio?.pause();
    setIsPlaying(false);
  };
  useEffect(() => {
    if (user.record) {
      setAudio(new Audio(user.record));
    }
  }, [user.record]);
  useEffect(() => {
    const handleAudioEnd = () => {
      setIsOpen(undefined);
      setIsPlaying(false);
    };
    audio?.addEventListener('ended', handleAudioEnd);
    return () => {
      audio?.removeEventListener('ended', handleAudioEnd);
    };
  }, [audio]);
  return (
    <div
      className={clsx(
        'flex flex-col overflow-hidden rounded-2xl bg-warning-50',
        className,
      )}
    >
      {/* Image */}
      <div
        className={cn(
          `relative flex min-h-[60dvh] flex-col justify-end bg-cover bg-center p-4`,
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
        <div className="flex items-center justify-between">
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
              {user?.province} , {user?.city}
            </div>
            <div className="flex items-center gap-x-1">
              <div className="flex h-[12px] w-[12px] items-center justify-center rounded-full bg-white">
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
            <div className="size-10 max-h-fit max-w-fit items-center justify-center rounded-full bg-brand-yellow">
              <img
                src={
                  allAvatars.find((a) => a.path === user.avatar)?.avatar ||
                  CardAvatar
                }
                onClick={() => setIsOpen('avatar')}
                alt="CardAvatar"
                className="size-10 rounded-full"
              />
            </div>
            <div
              className="max-h-fit max-w-fit rounded-full bg-brand-yellow p-[8px]"
              onClick={() => {
                playAudio();
              }}
            >
              <FaCirclePlay fill="#000" size={24} />
            </div>
          </div>
        </div>
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
        <Info
          className="bg-warning-100"
          items={user?.mySpecialty as string[] | undefined}
          title="تخصص"
        ></Info>
        <Info
          className="bg-warning-100"
          items={user?.personalInterests as string[] | undefined}
          title="علایق شخصی من"
        ></Info>
        <Info
          className="bg-warning-100"
          items={user?.languages as string[] | undefined}
          title="زبان هایی که میدانم "
        ></Info>
        <Info
          className="bg-warning-100"
          items={user?.traveledToPlaces as string[] | undefined}
          title="مکان‌هایی که سفر کرده‌ام"
        ></Info>
        <Info
          className="bg-warning-100"
          items={user?.livedInPlaces as string[] | undefined}
          title="مکان‌هایی که زندگی کرده‌ام"
        ></Info>
      </div>
      {user?.images?.map((image) => (
        <div
          key={image}
          className="flex items-center justify-center bg-brand-black"
        >
          <img src={image} className="max-h-96"></img>
        </div>
      ))}
      {!me && (
        <>
          <div className="my-4 flex justify-between px-8">
            <div className="flex size-20 items-center justify-center rounded-full bg-brand-yellow">
              <IcTick></IcTick>
            </div>
            <div className="flex size-20 items-center justify-center rounded-full bg-brand-yellow">
              <IcX></IcX>
            </div>
          </div>
          <Button
            className="mx-8 my-4 py-4"
            onClick={() => setIsOpen('sendMessage')}
          >
            ارسال پیام
          </Button>

          <Button
            variant="white"
            className="py-4 text-sm"
            onClick={() => {
              setIsOpen('violationReport');
            }}
          >
            گزارش تخلف کاربر
          </Button>
        </>
      )}

      <Modal
        isOpen={isOpen === 'avatar'}
        onRequestClose={() => setIsOpen(undefined)}
      >
        <div className="relative flex size-64 items-center justify-center rounded-full bg-gray-100">
          <div
            className="absolute right-0 top-0"
            onClick={() => setIsOpen(undefined)}
          >
            <IcXCircle className="size-5 stroke-1"></IcXCircle>
          </div>
          <img
            src={
              allAvatars.find((a) => a.path === user.avatar)?.avatar ||
              CardAvatar
            }
            className="size-48"
          ></img>
        </div>
      </Modal>
      <Modal isOpen={isOpen === 'record'} onRequestClose={() => pauseAudio()}>
        <div className="relative flex size-64 items-center justify-center rounded-full bg-gray-100">
          <div className="absolute right-0 top-0" onClick={() => pauseAudio()}>
            <IcXCircle className="size-5 stroke-1"></IcXCircle>
          </div>
          <img
            src={
              allAvatars.find((a) => a.path === user.avatar)?.avatar ||
              CardAvatar
            }
            className="size-48"
          ></img>
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
    </div>
  );
};
