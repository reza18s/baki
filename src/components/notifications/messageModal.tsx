import React, { useState } from 'react';
import Modal from '../base/Modal/Modal';
import { IcXCircle } from '../icons/IcXCircle';
import Button from '../base/Button/Button';
import { IcCase } from '../icons/IcCase';
import BgChat from '../../assets/images/bg-chat.png';
import {
  Notification,
  RequestType,
  useAcceptRequestMutation,
  useGetChatQuery,
  useGetRequestQuery,
  useGetUserQuery,
} from '@/graphql/generated/graphql.codegen';
import { customToast } from '../base/toast';
import { CircleSpinner } from '../base/Loader/Loader';
import { IcChair } from '../icons/IcChair';
import { LikeModal } from './likeModal';
import { formatLastSeen } from '@/utils/datetime';
import { cn } from '@/lib/utils';
import { paths } from '@/routes/paths';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useIonRouter } from '@ionic/react';

export const MessageModal = ({
  isOpen,
  setClose,
  notification,
}: {
  notification: Notification;
  isOpen: boolean;
  setClose: () => void;
}) => {
  const [isLikeOpen, setlikeIsOpen] = useState<'like'>();
  const { data, loading } = useGetUserQuery({
    variables: { id: notification.actionId },
    onError() {
      customToast('کاربر موجود نیست', 'error');
      setClose();
    },
  });
  const user = data?.getUser;
  const hs = useIonRouter();
  const { data: chat } = useGetChatQuery({
    variables: { participantId: notification.actionId },
  });
  const { data: request, refetch } = useGetRequestQuery({
    variables: {
      requesterId: notification.actionId,
      type: notification.type as RequestType,
    },
  });
  const [acceptRequest] = useAcceptRequestMutation();
  if (loading) {
    return (
      <Modal
        isOpen={!!isOpen}
        onRequestClose={() => {
          setClose();
        }}
        className="flex h-[90dvh] w-[90%] flex-col items-center justify-center gap-4"
      >
        <CircleSpinner></CircleSpinner>
      </Modal>
    );
  }
  return (
    <Modal
      isOpen={!!isOpen && !!user}
      onRequestClose={() => {
        setClose();
      }}
      className="flex h-[90dvh] w-[90%] flex-col gap-4"
    >
      <div
        className={`relative flex h-full flex-col justify-between gap-4 overflow-x-hidden overflow-y-scroll rounded-2xl bg-white p-4`}
        style={{
          backgroundImage: `url(${BgChat})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute right-3 top-3" onClick={() => setClose()}>
          <IcXCircle className="size-5 stroke-black"></IcXCircle>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <Avatar className="size-20">
            <AvatarImage src={user?.mainImage || ''} className="object-cover" />
            <AvatarFallback className="3xl">
              {user?.name?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="flex flex-col items-center text-sm font-bold">
            {user?.name}
            <span className="text-xs text-gray-400">
              آخرین بازدید{' '}
              {user?.isOnline ? 'انلاین' : formatLastSeen(user?.lastSeen)}
            </span>
          </h1>
          <Button
            rounded="rounded-3xl"
            className="h-8 p-0 px-6 text-sm"
            onClick={() => setlikeIsOpen('like')}
          >
            مشاهده پروفایل
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-4">
            {notification.type === 'companionRequest' && (
              <IcChair className="size-12"></IcChair>
            )}
            {notification.type === 'hostingInvitation' && (
              <IcCase className="size-12"></IcCase>
            )}
            {notification.type === 'message' && (
              <svg
                width="49"
                height="48"
                viewBox="0 0 49 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.6733 42.7754L27.7575 40.9437C28.5985 39.5229 29.0189 38.8125 29.6943 38.4197C30.3697 38.0269 31.2201 38.0122 32.9208 37.9829C35.4315 37.9396 37.0062 37.7858 38.3268 37.2388C40.7771 36.2239 42.7239 34.2771 43.7388 31.8268C44.5 29.9891 44.5 27.6594 44.5 23V21C44.5 20.2607 44.5 19.5631 44.4979 18.9037C44.4951 18.0491 43.4501 17.5661 42.6942 17.965C41.4418 18.6259 40.0146 19 38.5 19C33.5294 19 29.5 14.9706 29.5 10C29.5 8.48542 29.8741 7.05821 30.535 5.80577C30.9339 5.04989 30.4509 4.00487 29.5963 4.00212C28.9369 4 28.2393 4 27.5 4H21.5C14.9531 4 11.6797 4 9.27501 5.4736C7.92946 6.29816 6.79816 7.42946 5.9736 8.77501C4.5 11.1797 4.5 14.4531 4.5 21V23C4.5 27.6594 4.5 29.9891 5.2612 31.8268C6.27614 34.2771 8.22288 36.2239 10.6732 37.2388C11.9938 37.7858 13.5684 37.9396 16.0792 37.9829C17.7798 38.0122 18.6302 38.0269 19.3056 38.4197C19.981 38.8125 20.4015 39.5229 21.2424 40.9437L22.3266 42.7754C23.2929 44.408 25.707 44.408 26.6733 42.7754Z"
                  fill="#1A1D1E"
                />
                <circle cx="38.5" cy="10" r="6" fill="#1A1D1E" />
              </svg>
            )}
            <h1 className="text-sm font-bold">{notification.content}</h1>
          </div>
          <span className="text-nowrap text-xs font-medium">
            شما 24 ساعت زمان دارید تا به درخواست {user?.name} پاسخ دهید.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {chat?.getChat.Message?.map((message) => (
            <div
              key={message?.id}
              className={cn(
                'w-fit max-w-[85%] rounded-xl rounded-br-sm bg-brand-yellow p-2 text-sm text-brand-black',
                message?.senderId === user &&
                  'mr-auto rounded-bl-sm bg-black text-white',
              )}
            >
              {message?.content}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full items-center gap-2">
        <Button
          className="h-10 w-full p-0 text-sm"
          onClick={
            request?.getRequest?.status !== 'accept'
              ? () => {
                  acceptRequest({
                    variables: {
                      requesterId: user!.id,
                      searchType: notification.searchType,
                      type: notification.type as RequestType,
                    },
                    onCompleted() {
                      customToast('درخواست با موفقیت قبول شد', 'success');
                      refetch();
                    },
                    onError: () => {
                      customToast(
                        'مشکلی پیش امد لطفا دوباره امتحان کنید',
                        'error',
                      );
                    },
                  });
                }
              : () => {
                  if (chat?.getChat.id) {
                    hs.push(paths.chat.contact.exactPath(user!.id));
                  }
                }
          }
        >
          {request?.getRequest?.status == 'accept' ? 'رفتن به چت' : 'قبول کردن'}
        </Button>
        <Button
          variant="white"
          className="h-10 w-full p-0 text-sm"
          onClick={() => setClose()}
        >
          بعدی
        </Button>
      </div>{' '}
      {notification && (
        <LikeModal
          isOpen={isLikeOpen === 'like'}
          setClose={() => setlikeIsOpen(undefined)}
          notification={notification}
        ></LikeModal>
      )}
    </Modal>
  );
};
