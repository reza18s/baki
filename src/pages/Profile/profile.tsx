import { IcEdit } from '@/components/icons/IcEdit';
import { IcSetting } from '@/components/icons/IcSetting';
import { Page } from '@/components/layout/Page';
import {
  useGetMeQuery,
  User,
  useRecommendedUsersQuery,
} from '@/graphql/generated/graphql.codegen';
import React, { useEffect } from 'react';
import { MdVerified } from 'react-icons/md';
import Button from '@/components/base/Button/Button';
import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';
import { ProfileCard } from '@/components/Profile/profileCard';
import { CircleSpinner } from '@/components/base/Loader/Loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatLastSeen } from '@/utils/datetime';
import { IcArrowLeft } from '@/components/icons/IcArrowLeft';
import { useIonRouter } from '@ionic/react';
import BakiBanner from '../../assets/images/BakiBanner.png';

export const Profile = () => {
  const { data, loading, refetch } = useGetMeQuery();
  const me = data?.getMe;
  const hs = useIonRouter();
  const { data: recommendedUsers } = useRecommendedUsersQuery();
  useEffect(() => {
    refetch();
  }, []);
  return (
    <Page
      contentClassName="pt-20 p-4 flex flex-col gap-8 pb-20 items-center"
      header={
        <div className="flex w-full items-center justify-between px-6 py-3">
          <Link to={paths.profile.editProfile}>
            <IcEdit></IcEdit>
          </Link>
          {me?.username && (
            <h1 className="flex items-center justify-center text-lg font-bold">
              {me?.username}
              <span className="font-semibold">@</span>
            </h1>
          )}
          <Link to={paths.settings.main}>
            <IcSetting></IcSetting>
          </Link>
        </div>
      }
    >
      {loading && !data?.getMe ? (
        <CircleSpinner></CircleSpinner>
      ) : (
        <>
          <div className="flex w-full flex-col items-center gap-2">
            <Avatar className="size-[88px]">
              <AvatarImage src={me?.mainImage || ''} className="object-cover" />
              <AvatarFallback className="3xl">
                {me?.name?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1">
              <h1 className="flex items-center text-sm font-black">
                {me?.name} ، {me?.age}
              </h1>
              <MdVerified size={16} className="fill-brand-yellow" />
            </div>
            <div className="flex items-center gap-x-1 text-xs">
              {me?.province}, {me?.city}
            </div>
            <span className="text-xs text-gray-400">
              {formatLastSeen(me?.lastSeen)}
            </span>
            <Link to={paths.profile.editProfile} className="w-full">
              <Button className="w-full"> تکمیل پروفایل</Button>
            </Link>
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

          <div className="flex w-full items-center">
            <img src={BakiBanner} className="w-full" alt="BakiBanner" />
          </div>
          <ProfileCard user={me as User} me={true}></ProfileCard>
        </>
      )}
    </Page>
  );
};
