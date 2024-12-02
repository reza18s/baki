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
  useCreateCompanionRequestMutation,
  useCreateHostingInvitationMutation,
  useGetUserQuery,
} from '@/graphql/generated/graphql.codegen';
import { customToast } from '../base/toast';
import { useStore } from '@/store/useStore';

export const CommunicationModal = ({
  isOpen,
  setClose,
  notification,
}: {
  notification: Notification;
  isOpen: boolean;
  setClose: () => void;
}) => {
  const [createHostingInvitation, { loading: HostingLoading }] =
    useCreateHostingInvitationMutation();
  const [createCompanionRequest, { loading: companionLoading }] =
    useCreateCompanionRequestMutation();
  const { searchType } = useStore((store) => store);
  const { data, loading } = useGetUserQuery({
    variables: { id: notification.actionId },
    onError() {
      customToast('کاربر موجود نیست', 'error');
      setClose();
    },
  });

  const user = data?.getUser;
  if (loading || !user) {
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
          <IcXCircle className="size-5 stroke-black"></IcXCircle>
          <div className="flex items-center justify-center">
            <IcExclamationMarkInCircle></IcExclamationMarkInCircle>
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
                <img src={CardImage}></img>
              </div>
              <div className="absolute bottom-0 left-[calc(50%-32px)] z-10 flex size-16 items-center justify-center rounded-full bg-white">
                <IcTick className="size-7"></IcTick>
              </div>
              <div className="aspect-square size-32 -rotate-[15deg] overflow-hidden rounded-[27px] border-4 border-white">
                <img src={CardImage}></img>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center pt-6">
          <div className="h-[2px] flex-1 bg-white"></div>
          <IcStars></IcStars>
          <div className="h-[2px] flex-1 bg-white"></div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 pb-4 pt-6">
          <Button
            variant="outline"
            className="flex h-10 w-full items-center justify-center gap-1 border-gray-300 p-0 text-sm font-medium"
            onClick={() => {
              createCompanionRequest({
                variables: { receiverId: user.id, searchType: searchType },
                onCompleted: () => {
                  customToast('دعودت با موفقیت ارسال شد', 'success');
                },
                onError: () => {
                  customToast('مشکلی پیش امد لطفا دوباره امتحان کنید', 'error');
                },
              });
            }}
            loading={companionLoading}
          >
            <IcCase></IcCase>
            ارسال درخواست همسفری
          </Button>
          <Button
            variant="outline"
            className="flex h-10 w-full items-center justify-center gap-1 border-gray-300 p-0 text-sm font-medium"
            onClick={() => {
              createHostingInvitation({
                variables: { guestId: user.id, searchType: searchType },
                onCompleted: () => {
                  customToast('دعودت با موفقیت ارسال شد', 'success');
                },
                onError: () => {
                  customToast('مشکلی پیش امد لطفا دوباره امتحان کنید', 'error');
                },
              });
            }}
            loading={HostingLoading}
          >
            <IcChair></IcChair>ارسال دعوت میزبانی
          </Button>
        </div>
      </div>
      <div className="flex w-full items-center gap-2">
        <Button className="h-10 w-full p-0 text-sm">رفتن به صفحه چت</Button>
        <Button variant="white" className="h-10 w-full p-0 text-sm">
          بعدی
        </Button>
      </div>
    </Modal>
  );
};
