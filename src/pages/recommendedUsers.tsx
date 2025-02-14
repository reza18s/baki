import Button from '@/components/base/Button/Button';
import Modal from '@/components/base/Modal/Modal';
import { IcCrownStar } from '@/components/icons/IcCrownStar';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import { LikeCard } from '@/components/notifications/likeCard';
import {
  useGetMeQuery,
  useRecommendedUsersQuery,
} from '@/graphql/generated/graphql.codegen';
import { paths } from '@/routes/paths';
import { isNotToday } from '@/utils/datetime';
import { useIonRouter } from '@ionic/react';
import React, { useState } from 'react';

export const RecommendedUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useRecommendedUsersQuery();
  const hs = useIonRouter();
  const { data: me } = useGetMeQuery();
  const planUse: {
    updateAt?: string;
    random?: number;
    baseOnInterest?: number;
    famous?: number;
    recommendedUser?: string[];
  } =
    me?.getMe.planUse?.updateAt &&
    !isNotToday(new Date(me?.getMe.planUse.updateAt))
      ? me?.getMe.planUse
      : {
          random: 0,
          baseOnInterest: 0,
          famous: 0,
          recommendedUser: [],
        };
  return (
    <Page
      header={<AppBar title="همسفران پیشنهادی" backButt={false}></AppBar>}
      contentClassName="p-6 pt-16"
    >
      <div className="relative grid grid-cols-2 gap-4">
        {data?.recommendedUsers.map((recommendedUser) => (
          <LikeCard
            key={recommendedUser.id}
            user={recommendedUser}
            onClick={() => {
              if ((planUse.recommendedUser?.length || 0) < 3) {
                hs.push(
                  paths.recommendedUsers.profile.exactPath(recommendedUser.id),
                );
              } else {
                setIsOpen(true);
              }
            }}
          ></LikeCard>
        ))}
      </div>
      <Modal
        className="flex w-[85%] flex-col items-center justify-center gap-4 rounded-3xl bg-white px-6 py-4"
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <div className="flex items-center justify-center rounded-full bg-brand-yellow p-4">
          <IcCrownStar className="size-8 fill-none stroke-black"></IcCrownStar>
        </div>

        <h1 className="text-center text-lg font-bold">
          هنوز اشتراک تهیه نکردی؟
        </h1>
        <span className="text-center text-sm text-gray-500">
          در حالت رایگان هر 24 ساعت فقط می‌تونی پروفایل سه نفر از همسفران
          پیشنهادی رو مشاهده کنی!
        </span>
        <div className="flex w-full gap-2">
          <Button
            className="h-10 w-full"
            onClick={() => hs.push(paths.plans.main)}
          >
            ادامه
          </Button>
          <Button
            variant="outline"
            className="h-10 w-full border-black"
            onClick={() => setIsOpen(false)}
          >
            بازگشت
          </Button>
        </div>
      </Modal>
    </Page>
  );
};
