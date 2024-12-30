import React, { useState } from 'react';
import { FaCirclePlay } from 'react-icons/fa6';
import { MdVerified } from 'react-icons/md';
import { RiMapPin2Fill } from 'react-icons/ri';
import { Bio, Info } from '../Explore/card';
import Button from '../base/Button/Button';
import { IcSendMessageHeart } from '../icons/IcSendMessageHeart';
import { IcTick } from '../icons/IcTick';
import { IcX } from '../icons/IcX';
import { User } from '@/graphql/generated/graphql.codegen';
import CardImage from '../../assets/images/image.png';
import CardAvatar from '../../assets/images/avatar.png';
import clsx from 'clsx';
import { getBaseInfo } from '@/utils/getBaseInfo';
import { SendMessageModal } from '../Explore/sendMessageModal';
import ViolationReportModal from '../Explore/violationReportModal';
import { optionTexts } from '@/utils';

export const ProfileCard = ({
  user,
  className,
  me = false,
}: {
  me?: boolean;
  user: User;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState<'sendMessage' | 'violationReport'>();
  return (
    <div
      className={clsx(
        'flex flex-col overflow-hidden rounded-2xl bg-warning-50',
        className,
      )}
    >
      {/* Image */}
      <div
        className={`flex min-h-[60dvh] flex-col justify-end bg-cover bg-center p-4`}
        style={{
          backgroundImage: `url(${CardImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="text-sm text-white">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white">
                {user?.name} ، {user?.age}
              </h1>
              <MdVerified size={24} className="fill-brand-yellow" />
            </div>
            <div className="flex items-center gap-x-1 text-white">
              <RiMapPin2Fill size={16} fill="#fff" className="-mr-[2px]" />
              {user?.province} , {user?.city}
            </div>
            <div className="flex items-center gap-x-1 text-white">
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
        {!me && (
          <>
            <div className="flex justify-between px-8">
              <div className="flex size-20 items-center justify-center rounded-full bg-brand-yellow">
                <IcTick></IcTick>
              </div>
              <div className="flex size-20 items-center justify-center rounded-full bg-brand-yellow">
                <IcX></IcX>
              </div>
            </div>
            <Button
              className="mx-8 py-4"
              onClick={() => setIsOpen('sendMessage')}
            >
              ارسال پیام
            </Button>
          </>
        )}
      </div>
      <SendMessageModal
        isOpen={isOpen === 'sendMessage'}
        user={user}
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
    </div>
  );
};
