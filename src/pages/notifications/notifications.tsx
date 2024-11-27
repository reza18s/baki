import { IcHeardTap } from '@/components/icons/IcHeardTap';
import { Page } from '@/components/layout/Page';
import React, { useState } from 'react';
import CardImage from '../../assets/images/image.png';
import Button from '@/components/base/Button/Button';
import { IcChatPage } from '@/components/icons/IcChatPage';
import {
  Notification as INotification,
  useGetNotificationsQuery,
} from '@/graphql/generated/graphql.codegen';
import { LikeModal } from '@/components/notifications/likeModal';
import { Notification } from '@/components/notifications/notification';
import { MessageModal } from '@/components/notifications/messageModal';
import { calculateElapsedTime } from '@/utils/datetime';
import { LikeCard } from '@/components/notifications/likeCard';
const items = [
  { value: 'all', title: 'همه' },
  {
    value: 'liked',
    icon: ({ select }: { select: boolean }) => (
      <IcHeardTap
        className={`${select && 'fill-black stroke-black'} size-5`}
      ></IcHeardTap>
    ),
  },
  { value: 'random', title: 'تصادفی' },
  { value: 'baseOnInterest', title: 'علاقه‌مندی' },
  { value: 'famous', title: 'مشهور' },
];
export const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const [isOpen, setIsOpen] = useState<'like' | 'message'>();
  const [noti, setNoti] = useState<INotification>();
  const { data } = useGetNotificationsQuery();
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
                className={`${filter === val.value ? 'border border-brand-yellow bg-brand-yellow fill-brand-black text-brand-black' : 'border border-gray-300 text-gray-500'} flex h-8 items-center rounded-lg px-4 text-sm font-bold transition-all duration-300 ease-in-out`} // اضافه کردن transition
                onClick={() => setFilter(val.value)}
              >
                {val.title}
                {val.icon?.({ select: filter === val.value })}
              </div>
            ))}
          </div>
        </div>
      }
    >
      {(data?.getNotifications.filter(
        (val) =>
          filter === 'all' ||
          (filter === 'liked' && val.type === 'liked') ||
          val.searchType === filter,
      ).length || 0) <= 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <IcChatPage></IcChatPage>
          <h1 className="text-center text-base font-bold">
            اعلان‌های شما اینجا نمایش داده می‌شود.
          </h1>
        </div>
      ) : filter === 'liked' ? (
        <>
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold">جدید</h1>
            <div className="grid grid-cols-2 gap-4">
              {data?.getNotifications
                .filter(
                  (val) =>
                    val.type === 'liked' &&
                    +calculateElapsedTime(val.createdAt, false) < 24,
                )
                .map((notification) => (
                  <LikeCard
                    key={notification.id}
                    notification={notification}
                    onClick={() => {
                      if (notification.type === 'liked') {
                        setNoti(notification);
                        setIsOpen('like');
                      }
                    }}
                  ></LikeCard>
                ))}
            </div>
          </div>
          <div className="relative flex flex-col gap-4 pt-6">
            <h1 className="text-lg font-bold">منقضی شده</h1>
            <div className="relative grid grid-cols-2 gap-4">
              <div className="absolute z-10 h-full w-full bg-white/50"></div>
              {data?.getNotifications
                .filter(
                  (val) =>
                    val.type === 'liked' &&
                    +calculateElapsedTime(val.createdAt, false) >= 24,
                )
                .map((notification) => (
                  <LikeCard
                    key={notification.id}
                    notification={notification}
                    disabled
                  ></LikeCard>
                ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold">جدید</h1>
            <div className="flex flex-1 flex-col gap-2">
              {data?.getNotifications
                .filter(
                  (val) =>
                    (filter === 'all' || val.searchType === filter) &&
                    +calculateElapsedTime(val.createdAt, false) < 24,
                )
                .map((notification) => (
                  <Notification
                    key={notification.id}
                    notification={notification}
                    onClick={() => {
                      if (notification.type === 'liked') {
                        setNoti(notification);
                        setIsOpen('like');
                      }
                      if (
                        notification.type === 'hosting-invitation' ||
                        notification.type === 'companion-request'
                      ) {
                        setNoti(notification);
                        setIsOpen('message');
                      }
                    }}
                  ></Notification>
                ))}
            </div>
          </div>
          <div className="relative flex flex-col gap-4 pt-6">
            <h1 className="text-lg font-bold">منقضی شده</h1>
            <div className="flex flex-1 flex-col gap-2">
              <div className="absolute z-10 h-full w-full bg-white/50"></div>
              {data?.getNotifications
                .filter(
                  (val) =>
                    (filter === 'all' || val.searchType === filter) &&
                    +calculateElapsedTime(val.createdAt, false) >= 24,
                )
                .map((notification) => (
                  <Notification
                    key={notification.id}
                    notification={notification}
                    disabled
                  ></Notification>
                ))}
            </div>
          </div>
        </>
      )}
      {noti && (
        <LikeModal
          isOpen={isOpen === 'like'}
          setClose={() => setIsOpen(undefined)}
          notification={noti}
        ></LikeModal>
      )}
      {noti && (
        <MessageModal
          isOpen={isOpen === 'message'}
          setClose={() => setIsOpen(undefined)}
          notification={noti}
        ></MessageModal>
      )}
    </Page>
  );
};
