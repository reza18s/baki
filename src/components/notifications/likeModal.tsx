import React from 'react';
import Modal from '../base/Modal/Modal';
import { IcX } from '../icons/IcX';
import { AnimatePresence } from 'framer-motion';
import ExploreCard from '../Explore/exploreCard';
import Button from '../base/Button/Button';
import {
  Notification,
  useGetUserQuery,
} from '@/graphql/generated/graphql.codegen';
import { customToast } from '../base/toast';
import { CircleSpinner } from '../base/Loader/Loader';
import { getSearchTypeLabel } from '@/utils';

export const LikeModal = ({
  isOpen,
  setClose,
  notification,
}: {
  notification: Notification;
  isOpen: boolean;
  setClose: () => void;
}) => {
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
      isOpen={isOpen && !!user}
      onRequestClose={() => {
        setClose();
      }}
      className="relative flex h-full max-h-[95dvh] w-[95%] flex-col gap-4 p-2"
    >
      <div
        className="absolute right-5 top-5 z-20"
        onClick={() => {
          setClose();
        }}
      >
        <IcX className="size-5 rounded-full bg-white"></IcX>
      </div>
      <div className="h-[calc(100%-56px)]">
        <AnimatePresence>
          <ExploreCard
            className="h-[calc(100%-72px)]"
            handleSwipe={() => {}}
            inView={true}
            searchMethod={
              getSearchTypeLabel(notification.searchType) || 'تصادفی'
            }
            user={user}
          ></ExploreCard>
        </AnimatePresence>
      </div>
      <div className="flex w-full items-center gap-2">
        <Button className="h-10 w-full p-0 text-sm">لایک کردن</Button>
        <Button
          variant="white"
          className="h-10 w-full p-0 text-sm"
          onClick={() => {
            setClose();
          }}
        >
          بعدی
        </Button>
      </div>
    </Modal>
  );
};
