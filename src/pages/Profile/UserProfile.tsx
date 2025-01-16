import { IcEdit } from '@/components/icons/IcEdit';
import { IcSetting } from '@/components/icons/IcSetting';
import { Page } from '@/components/layout/Page';
import {
  useAddToBlackListMutation,
  useAddToFavoriteMutation,
  useGetUserQuery,
  User,
} from '@/graphql/generated/graphql.codegen';
import React, { useEffect, useState } from 'react';
import CardImage from '../../assets/images/image.png';
import { MdVerified } from 'react-icons/md';
import Button from '@/components/base/Button/Button';
import { Link, useParams } from 'react-router-dom';
import { paths } from '@/routes/paths';
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

export const UserProfile = () => {
  const { id }: { id: string } = useParams();
  const { data, loading, refetch } = useGetUserQuery({ variables: { id: id } });
  const [isOpen, setIsOpen] = useState<'sendMessage' | 'violationReport'>();
  const [addToFavorite] = useAddToFavoriteMutation();
  const [addToBlackList] = useAddToBlackListMutation();
  const user = data?.getUser;
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
          <h1 className="flex items-center justify-center text-lg font-bold">
            {user?.username}
            <span className="font-semibold">@</span>
          </h1>{' '}
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
                      customToast(res.addToBlackList.message, 'success');
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
      {loading ? (
        <CircleSpinner></CircleSpinner>
      ) : (
        <>
          <div className="flex w-full flex-col items-center gap-2">
            <div className="size-[88px] overflow-hidden rounded-full">
              <img
                src={user?.mainImage || CardImage}
                className="h-full w-full object-cover"
              ></img>
            </div>
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
              آخرین بازدید 2 ساعت پیش
            </span>
            <Link to={paths.profile.editProfile} className="w-full">
              <Button className="w-full"> تکمیل پروفایل</Button>
            </Link>
          </div>
          <ProfileCard user={user as User}></ProfileCard>
        </>
      )}
      <ViolationReportModal
        onReportSubmit={() => {}}
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
