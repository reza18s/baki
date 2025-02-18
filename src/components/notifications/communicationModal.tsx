import React from 'react';
import Modal from '../base/Modal/Modal';
import { IcXCircle } from '../icons/IcXCircle';
import { IcExclamationMarkInCircle } from '../icons/IcExclamationMarkInCircle';
import { IcStars } from '../icons/IcStars';
import { IcTick } from '../icons/IcTick';
import Button from '../base/Button/Button';
import { IcCase } from '../icons/IcCase';
import { IcChair } from '../icons/IcChair';
import CardImage from '../../assets/images/image.png';
import { CircleSpinner } from '../base/Loader/Loader';
import {
  Notification,
  RequestType,
  useCreateRequestMutation,
  useGetMeQuery,
  useGetRequestsQuery,
  useGetUserQuery,
  User,
} from '@/graphql/generated/graphql.codegen';
import { customToast } from '../base/toast';
import { useStore } from '@/store/useStore';
import { paths } from '@/routes/paths';
import { useIonRouter } from '@ionic/react';
import { IcExclamationMarkInCircleFill } from '../icons/IcExclamationMarkInCircleFill';

export const CommunicationModal = ({
  isOpen,
  setClose,
  notification,
}: {
  notification: Notification;
  isOpen: boolean;
  setClose: () => void;
}) => {
  const { data: me } = useGetMeQuery();
  const { data: requests } = useGetRequestsQuery({ variables: { me: true } });
  const request = requests?.getRequests.find(
    (r) =>
      r.requesterId === me?.getMe.id && r.receiverId === notification.actionId,
  );
  const [createRequest, { loading: requestLoading }] =
    useCreateRequestMutation();
  const [createRequest2, { loading: requestLoading2 }] =
    useCreateRequestMutation();
  const { searchType } = useStore((store) => store);
  const { data, loading } = useGetUserQuery({
    variables: { id: notification.actionId },
    onError() {
      customToast('کاربر موجود نیست', 'error');
      setClose();
    },
  });
  const hs = useIonRouter();
  const user = data?.getUser;
  if (!!loading || !user) {
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
      isOpen={!!isOpen}
      onRequestClose={() => {
        setClose();
      }}
      className="flex w-[90%] flex-col gap-4"
    >
      <div className="flex flex-col gap-4 rounded-2xl bg-brand-yellow p-4">
        <div className="flex w-full items-center justify-between">
          <IcXCircle
            className="size-5 stroke-black"
            onClick={() => setClose()}
          ></IcXCircle>
          <div
            className="flex items-center justify-center"
            onClick={() => hs.push(paths.settings.guide)}
          >
            <IcExclamationMarkInCircleFill className="fill-black"></IcExclamationMarkInCircleFill>
            راهنما
          </div>
        </div>
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex w-full flex-col items-center justify-center gap-6 text-base font-bold">
            ارتباط جدیدی ایجاد شد!
            <div className="relative flex">
              <IcStars className="absolute -top-8 left-[calc(50%-24px)] size-12 fill-white/50"></IcStars>
              <IcStars className="absolute -left-8 top-[50%] size-12 -rotate-[15deg] fill-white/50"></IcStars>
              <IcStars className="absolute -right-10 top-[20%] size-12 rotate-[15deg] fill-white/50"></IcStars>
              <div className="-ml-4 aspect-square size-32 rotate-[15deg] overflow-hidden rounded-[27px] border-4 border-white">
                <img
                  src={me?.getMe.mainImage || CardImage}
                  className="h-full w-full object-cover"
                ></img>
              </div>
              <div className="absolute bottom-0 left-[calc(50%-32px)] z-10 flex size-16 items-center justify-center rounded-full bg-white text-center">
                {me?.getMe.plan ? (
                  <>
                    {
                      //@ts-expect-error the

                      <h1>{similarity(me.getMe, user)}% شباهت</h1>
                    }
                  </>
                ) : (
                  <IcTick className="size-7"></IcTick>
                )}
              </div>
              <div className="aspect-square size-32 -rotate-[15deg] overflow-hidden rounded-[27px] border-4 border-white">
                <img
                  src={user.mainImage || CardImage}
                  className="h-full w-full object-cover"
                ></img>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center pt-6">
          <div className="h-[2px] flex-1 bg-white"></div>
          <IcStars></IcStars>
          <div className="h-[2px] flex-1 bg-white"></div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          {request ? (
            <div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-4">
              {request.type === 'companionRequest' && (
                <IcChair className="size-12"></IcChair>
              )}
              {request.type === 'hostingInvitation' && (
                <IcCase className="size-12"></IcCase>
              )}
              <h1 className="text-sm font-bold">
                {request.type === 'companionRequest'
                  ? 'درخواست همسفری شما ارسال شد.'
                  : request.type === 'hostingInvitation'
                    ? 'درخواست میزبانی شما ارسال شد.'
                    : 'درخواست شما ارسال شد.'}
              </h1>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                className="flex h-10 w-full items-center justify-center gap-1 border-gray-300 bg-white p-0 text-sm font-medium"
                onClick={() => {
                  createRequest({
                    variables: {
                      receiverId: notification.actionId,
                      searchType: notification.searchType || 'random',
                      type: 'companionRequest' as RequestType,
                      message: 'دوست دارین با هم بریم سفر؟',
                    },
                    onCompleted: () => {
                      customToast('دعوت با موفقیت ارسال شد', 'success');
                    },
                    onError: () => {
                      customToast(
                        'مشکلی پیش امد لطفا دوباره امتحان کنید',
                        'error',
                      );
                    },
                  });
                }}
                loading={requestLoading}
              >
                <IcCase></IcCase>
                ارسال درخواست همسفری
              </Button>
              <Button
                variant="outline"
                className="flex h-10 w-full items-center justify-center gap-1 border-gray-300 bg-white p-0 text-sm font-medium"
                onClick={() => {
                  createRequest2({
                    variables: {
                      receiverId: notification.actionId,
                      searchType: notification.searchType || 'random',
                      type: 'hostingInvitation' as RequestType,
                      message:
                        'مایلم میزبان شما باشم.خیلی خوشحال می‌شم اگه بیای?',
                    },
                    onCompleted: () => {
                      customToast('دعوت با موفقیت ارسال شد', 'success');
                    },
                    onError: (err) => {
                      customToast(err.message, 'error');
                    },
                  });
                }}
                loading={requestLoading2}
              >
                <IcChair></IcChair>ارسال دعوت میزبانی
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex w-full items-center gap-2">
        <Button
          className="h-10 w-full p-0 text-sm"
          onClick={() => {
            hs.push(paths.chat.contact.exactPath(notification.actionId));
          }}
        >
          رفتن به صفحه چت
        </Button>
        <Button
          variant="white"
          className="h-10 w-full p-0 text-sm"
          onClick={() => setClose()}
        >
          بعدی
        </Button>
      </div>
    </Modal>
  );
};
const similarity = (user1: User, user2: User) => {
  let similarityPercent = 0;
  if (user1?.birthdate?.split('/')[1] === user2?.birthdate?.split('/')[1]) {
    similarityPercent += 10;
  }
  if (user1?.smokeStatus == user2?.smokeStatus) {
    similarityPercent += 5;
  }
  if (user1?.sportsStatus == user2?.sportsStatus) {
    similarityPercent += 10;
  }
  if (user1?.AmountOfEarlyRising == user2?.AmountOfEarlyRising) {
    similarityPercent += 5;
  }
  if (user1?.spiritStatus == user2?.spiritStatus) {
    similarityPercent += 40;
  }
  if (
    user1?.personalInterests?.every((item) =>
      user2?.personalInterests?.includes(item),
    )
  ) {
    similarityPercent += 15;
  }
  if (
    user1?.travelInterests?.every((item) =>
      user2?.travelInterests?.includes(item),
    )
  ) {
    similarityPercent += 15;
  }
  return similarityPercent;
};
