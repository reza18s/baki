import { Page } from '@/components/layout/Page';
import {
  useAddToBlackListMutation,
  useAddToFavoriteMutation,
  useGetLikesQuery,
  useGetUserQuery,
  useLikeMutation,
  User,
  useRecommendedUsersQuery,
} from '@/graphql/generated/graphql.codegen';
import React, { useEffect, useState } from 'react';
import { MdVerified } from 'react-icons/md';
import Button from '@/components/base/Button/Button';
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom';
import { ProfileCard } from '@/components/Profile/profileCard';
import { CircleSpinner } from '@/components/base/Loader/Loader';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IcDotsMenu } from '@/components/icons/IcDotsMenu';
import { IcShear } from '@/components/icons/IcShear';
import { IcStar } from '@/components/icons/IcStar';
import { customToast } from '@/components/base/toast';
import { IcUserBlackList } from '@/components/icons/IcUserBlackList';
import { IcFlag } from '@/components/icons/IcFlag';
import ViolationReportModal from '@/components/Explore/violationReportModal';
import { optionTexts } from '@/utils';
import { IcArrowRight } from '@/components/icons/IcArrowRight';
import { formatLastSeen } from '@/utils/datetime';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIonRouter } from '@ionic/react';
import { paths } from '@/routes/paths';
import { IcArrowLeft } from '@/components/icons/IcArrowLeft';

type IUserProfile = RouteComponentProps<{
  id: string;
}> & { recommended?: boolean };
export const UserProfile = ({ match, recommended = false }: IUserProfile) => {
  const id = match.params.id;
  const hs = useIonRouter();
  const { data, loading, refetch } = useGetUserQuery({
    variables: { id: id, recommended: recommended },
    onError(error) {
      customToast(error.message, 'error');
      hs.goBack();
    },
  });
  const { data: recommendedUsers } = useRecommendedUsersQuery();
  const { data: likes, refetch: refetchLikes } = useGetLikesQuery();
  const [isOpen, setIsOpen] = useState<'sendMessage' | 'violationReport'>();
  const [like] = useLikeMutation();
  const [addToBlackList] = useAddToBlackListMutation();
  const [addToFavorite] = useAddToFavoriteMutation();
  const user = data?.getUser;
  useEffect(() => {
    refetch();
  }, []);
  const liked = !!likes?.getLikes.find((l) => l?.LikedUserId === id);

  return (
    <Page
      contentClassName="pt-20 p-4 flex flex-col gap-8 pb-20 items-center"
      header={
        <div className="flex w-full items-center justify-between px-6 py-3">
          <IcArrowRight onClick={() => hs.goBack()}></IcArrowRight>
          {user?.username && (
            <h1 className="flex items-center justify-center text-lg font-bold">
              {user?.username}
              <span className="font-semibold">@</span>
            </h1>
          )}
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger>
              <IcDotsMenu></IcDotsMenu>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-6 origin-top-right scale-95 transform divide-y rounded-xl px-3 py-1 transition-transform duration-300 ease-in-out">
              <DropdownMenuItem className="flex items-center gap-2 p-0 py-2">
                <IcShear className="siz5"></IcShear>
                <h1 className="text-sm">به اشتراک گذاری</h1>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 p-0 py-2"
                onClick={() => {
                  addToFavorite({
                    variables: {
                      favoriteIds: user!.id,
                    },
                    onCompleted: (res) => {
                      customToast(res.addToFavorite.message, 'success');
                    },
                    onError: (err) => {
                      customToast(err.message, 'error');
                    },
                  });
                }}
              >
                <IcStar className="siz5"></IcStar>
                <h1 className="text-sm">افزودن به علاقه‌مندی‌ها</h1>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 p-0 py-2"
                onClick={() => {
                  addToBlackList({
                    variables: {
                      blockedId: user!.id,
                    },
                    onCompleted: (res) => {
                      customToast(res.addToBlackList || '', 'success');
                    },
                    onError: (err) => {
                      customToast(err.message, 'error');
                    },
                  });
                }}
              >
                <IcUserBlackList className="siz5"></IcUserBlackList>
                <h1 className="text-sm">افزودن به لیست سیاه</h1>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 p-0 py-2"
                onClick={() => setIsOpen('violationReport')}
              >
                <IcFlag fill="#000"></IcFlag>
                <h1 className="text-sm">گزارش تخلف</h1>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      }
    >
      {loading && !data?.getUser ? (
        <CircleSpinner></CircleSpinner>
      ) : (
        <>
          <div className="flex w-full flex-col items-center gap-2">
            <Avatar className="size-[88px]">
              <AvatarImage
                src={user?.mainImage || ''}
                className="object-cover"
              />
              <AvatarFallback className="3xl">
                {user?.name?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1">
              <h1 className="flex items-center text-sm font-black">
                {user?.name} ، {user?.age}
              </h1>
              <MdVerified size={16} className="fill-brand-yellow" />
            </div>
            <div className="flex items-center gap-x-1 text-xs">
              {user?.province}, {user?.city}
            </div>
            <span className="text-xs text-gray-400">
              {formatLastSeen(user?.lastSeen)}
            </span>
            <div className="flex w-full gap-2">
              <Button
                disabled={liked}
                className="w-full"
                onClick={() =>
                  like({
                    variables: { likedUserId: id, searchType: 'random' },
                    onCompleted: (res) => {
                      refetchLikes();
                    },
                    onError: (err) => {
                      customToast(err.message, 'error');
                    },
                  })
                }
              >
                {liked ? 'لایک شده' : 'لایک کردن'}
              </Button>
              <Button
                className="w-full border-brand-black"
                variant="outline"
                onClick={() => {
                  hs.push(paths.chat.contact.exactPath(id));
                }}
              >
                ارسال پیام
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full justify-between">
              <h1 className="px-2 text-xs font-bold text-gray-500">
                همسفران پیشنهادی
              </h1>
              <span
                className="flex text-xs"
                onClick={() => hs.push(paths.recommendedUsers.main)}
              >
                مشاهده همه<IcArrowLeft className="size-4"></IcArrowLeft>
              </span>
            </div>
            <div className="-mx-4 flex items-center gap-2 overflow-x-scroll px-4">
              {recommendedUsers?.recommendedUsers
                .slice(0, 7)
                .map((recommendedUser) => (
                  <div
                    key={recommendedUser.id}
                    className="flex w-[130px] flex-col gap-2 rounded-xl border border-gray-300 p-2"
                  >
                    <div className="flex w-full flex-col items-center justify-center gap-2">
                      <Avatar className="size-[64px]">
                        <AvatarImage
                          src={recommendedUser?.mainImage || ''}
                          className="object-cover"
                        />
                        <AvatarFallback className="3xl">
                          {recommendedUser?.name?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <h1 className="text-nowrap text-sm font-medium">
                        {recommendedUser.name},{recommendedUser.age}
                      </h1>
                    </div>
                    <Button
                      className="w-full text-nowrap px-2 text-xs"
                      onClick={() => {
                        hs.push(
                          paths.profile.userProfile.exactPath(
                            recommendedUser.id,
                          ),
                        );
                      }}
                    >
                      مشاهده پروفایل
                    </Button>
                  </div>
                ))}
            </div>
          </div>
          <ProfileCard user={user as User}></ProfileCard>
        </>
      )}
      <ViolationReportModal
        id={id}
        loading={false}
        title="گزارش تخلف"
        options={optionTexts}
        setClose={() => {
          setIsOpen(undefined);
        }}
        isOpen={isOpen === 'violationReport'}
      ></ViolationReportModal>
    </Page>
  );
};
