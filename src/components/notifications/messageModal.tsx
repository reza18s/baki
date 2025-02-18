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
import { IcMessageRequest } from '../icons/IcMessageRequest';

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
              <IcMessageRequest></IcMessageRequest>
            )}
            <h1 className="text-sm font-bold">{notification.content}</h1>
          </div>
          <span className="text-nowrap text-xs font-medium">
            شما 24 ساعت زمان دارید تا به درخواست {user?.name} پاسخ دهید.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div
            className={cn(
              'w-fit max-w-[85%] rounded-xl rounded-br-sm bg-brand-yellow p-2 text-sm text-brand-black',
            )}
          >
            {request?.getRequest?.message}
          </div>
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
