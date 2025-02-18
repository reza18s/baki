import { IcHeardTap } from '@/components/icons/IcHeardTap';
import { Page } from '@/components/layout/Page';
import React, { useEffect, useState } from 'react';
import { IcChatPage } from '@/components/icons/IcChatPage';
import {
  Notification as INotification,
  useGetMeQuery,
  useGetNotificationsQuery,
  useGetUsersLazyQuery,
  User,
} from '@/graphql/generated/graphql.codegen';
import { LikeModal } from '@/components/notifications/likeModal';
import { Notification } from '@/components/notifications/notification';
import { MessageModal } from '@/components/notifications/messageModal';
import { calculateElapsedTime } from '@/utils/datetime';
import { LikeCard } from '@/components/notifications/likeCard';
import { cn } from '@/lib/utils';
import { CommunicationModal } from '@/components/notifications/communicationModal';
import { IcCrownStar } from '@/components/icons/IcCrownStar';
import Button from '@/components/base/Button/Button';
import { paths } from '@/routes/paths';
import { useIonRouter } from '@ionic/react';
const items = [
  { value: 'all', title: 'همه' },
  {
    value: 'liked',
    icon: ({ select }: { select: boolean }) => (
      <IcHeardTap
        className={cn(
          'size-5 fill-none stroke-gray-500',
          select && 'fill-black stroke-black',
        )}
      ></IcHeardTap>
    ),
  },
  { value: 'random', title: 'تصادفی' },
  { value: 'baseOnInterest', title: 'علاقه‌مندی' },
  { value: 'famous', title: 'مشهور' },
];
export const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const [isOpen, setIsOpen] = useState<'like' | 'message' | 'likeBack'>();
  const [noti, setNoti] = useState<INotification>();
  const { data, loading } = useGetNotificationsQuery();
  const hs = useIonRouter();
  const { data: me } = useGetMeQuery({
    onError(err) {
      if (err.message === 'Failed to fetch') {
        return;
      }
    },
  });
  const [getUsers, { data: users, loading: usersLoading }] =
    useGetUsersLazyQuery();
  useEffect(() => {
    if (data?.getNotifications) {
      getUsers({
        variables: { ids: data?.getNotifications.map((n) => n.actionId) },
      });
    }
  }, [data?.getNotifications]);
  return (
    <Page
      headerClassName="py-3  h-[88px]"
      contentClassName="relative h-full px-6 pb-20 pt-24 "
      header={
        <div className="flex w-full flex-col justify-center gap-3">
          <h1 className="w-full text-center font-iransans text-lg font-bold">
            اعلان ها
          </h1>
          <div className="scrollbar-hide flex items-center gap-2 overflow-scroll pl-2">
            <div className="w-2" />
            {items.map((val, i) => (
              <div
                key={i}
                className={`${filter === val.value ? 'border border-brand-yellow bg-brand-yellow fill-brand-black text-brand-black' : 'border border-gray-300 text-gray-500'} flex h-7 items-center rounded-lg px-4 font-iransans text-sm font-bold transition-all duration-300 ease-in-out`} // اضافه کردن transition
                onClick={() => setFilter(val.value)}
              >
                {val.title}
                {val.icon?.({ select: filter === val.value })}
              </div>
            ))}
            <div className="w-2" />
          </div>
        </div>
      }
      isLoading={!users || usersLoading || !data?.getNotifications || loading}
      scrollY
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
          {!me?.getMe.plan && (
            <div className="absolute z-[1] h-[calc(100vh-48px)] w-[calc(100%-48px)]">
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-white px-6 py-4">
                  <div className="flex items-center justify-center rounded-full bg-brand-yellow p-4">
                    <IcCrownStar className="size-8 fill-none stroke-black"></IcCrownStar>
                  </div>

                  <h1 className="text-center text-base font-bold">
                    برای مشاهده لیست کسانی که شما رو لایک کردند، نیاز به تهیه
                    اشتراک ویژه دارید.
                  </h1>
                  <Button
                    className="w-full"
                    onClick={() => hs.push(paths.plans.main)}
                  >
                    مشاهده اشتراک‌های ویژه
                  </Button>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold">جدید</h1>
            <div className="grid grid-cols-2 gap-4">
              {data?.getNotifications
                .filter(
                  (val) =>
                    me?.getMe.plan ||
                    (val.type === 'liked' &&
                      +calculateElapsedTime(val.createdAt, false) < 24),
                )
                .map((notification) => (
                  <LikeCard
                    key={notification.id}
                    onClick={() => {
                      if (notification.type === 'liked') {
                        setNoti(notification);
                        setIsOpen('like');
                      }
                    }}
                    user={
                      users?.getUsers.find(
                        (user) => user.id === notification.actionId,
                      ) as User
                    }
                    showInfo={!!me?.getMe?.plan}
                    className="blur-sm"
                  ></LikeCard>
                ))}
            </div>
          </div>
          {!me?.getMe.plan && (
            <div className="relative flex flex-col gap-4 pt-6 opacity-50">
              <h1 className="text-lg font-bold">منقضی شده</h1>
              <div className="relative grid grid-cols-2 gap-4">
                {data?.getNotifications
                  .filter(
                    (val) =>
                      val.type === 'liked' &&
                      +calculateElapsedTime(val.createdAt, false) >= 24,
                  )
                  .map((notification) => (
                    <LikeCard
                      user={
                        users?.getUsers.find(
                          (user) => user.id === notification.actionId,
                        ) as User
                      }
                      key={notification.id}
                      disabled
                      showInfo={!!me?.getMe?.plan}
                    ></LikeCard>
                  ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold">جدید</h1>
            <div className="flex flex-1 flex-col gap-2">
              {data?.getNotifications
                .filter(
                  (val) =>
                    me?.getMe.plan ||
                    ((filter === 'all' || val.searchType === filter) &&
                      +calculateElapsedTime(val.createdAt, false) < 24),
                )
                .map((notification) => (
                  <Notification
                    user={
                      users?.getUsers.find(
                        (user) => user.id === notification.actionId,
                      ) as User
                    }
                    key={notification.id}
                    notification={notification}
                    onClick={() => {
                      if (notification.type === 'liked') {
                        setNoti(notification);
                        setIsOpen('like');
                      }
                      if (notification.type === 'likedBack') {
                        setNoti(notification);
                        setIsOpen('likeBack');
                      }
                      if (
                        notification.type.includes('hostingInvitation') ||
                        notification.type.includes('companionRequest') ||
                        notification.type.includes('message')
                      ) {
                        setNoti(notification);
                        setIsOpen('message');
                      }
                    }}
                  ></Notification>
                ))}
            </div>
          </div>
          {!me?.getMe.plan && (
            <div className="relative flex flex-col gap-4 pt-6 opacity-50">
              <h1 className="text-lg font-bold">منقضی شده</h1>
              <div className="flex flex-1 flex-col gap-2">
                {data?.getNotifications
                  .filter(
                    (val) =>
                      (filter === 'all' || val.searchType === filter) &&
                      +calculateElapsedTime(val.createdAt, false) >= 24,
                  )
                  .map((notification) => (
                    <Notification
                      user={
                        users?.getUsers.find(
                          (user) => user.id === notification.actionId,
                        ) as User
                      }
                      key={notification.id}
                      notification={notification}
                      disabled
                    ></Notification>
                  ))}
              </div>
            </div>
          )}
        </>
      )}
      {noti && (
        <LikeModal
          isOpen={isOpen === 'like'}
          setClose={() => setIsOpen(undefined)}
          notification={noti}
        ></LikeModal>
      )}
      {noti && isOpen === 'message' && (
        <MessageModal
          isOpen={isOpen === 'message'}
          setClose={() => setIsOpen(undefined)}
          notification={noti}
        ></MessageModal>
      )}
      {noti && (
        <CommunicationModal
          isOpen={isOpen === 'likeBack'}
          setClose={() => setIsOpen(undefined)}
          notification={noti}
        ></CommunicationModal>
      )}
    </Page>
  );
};
