import { IcEdit } from '@/components/icons/IcEdit';
import { IcSetting } from '@/components/icons/IcSetting';
import { Page } from '@/components/layout/Page';
import { useGetMeQuery, User } from '@/graphql/generated/graphql.codegen';
import React from 'react';
import CardImage from '../../assets/images/image.png';
import { MdVerified } from 'react-icons/md';
import Button from '@/components/base/Button/Button';
import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';
import { ProfileCard } from '@/components/Profile/profileCard';

export const Profile = () => {
  const { data } = useGetMeQuery();
  const me = data?.getMe;
  return (
    <Page
      contentClassName="pt-20 p-6 flex flex-col gap-8 pb-20"
      header={
        <div className="flex w-full items-center justify-between px-6 py-3">
          <Link to={paths.profile.editProfile}>
            <IcEdit></IcEdit>
          </Link>
          <h1 className="flex items-center justify-center text-lg font-bold">
            {me?.username}
            <span className="font-semibold">@</span>
          </h1>
          <Link to={paths.settings.main}>
            <IcSetting></IcSetting>
          </Link>
        </div>
      }
    >
      <div className="flex w-full flex-col items-center gap-2">
        <div className="size-[88px] overflow-hidden rounded-full">
          <img src={CardImage}></img>
        </div>
        <div className="flex items-center gap-1">
          <h1 className="flex items-center text-sm font-black">
            {me?.name} ، {me?.age}
          </h1>
          <MdVerified size={16} className="fill-brand-yellow" />
        </div>
        <div className="flex items-center gap-x-1 text-xs">{me?.province}</div>
        <span className="text-xs text-gray-400">آخرین بازدید 2 ساعت پیش</span>
        <Link to={paths.profile.editProfile} className="w-full">
          <Button className="w-full"> تکمیل پروفایل</Button>
        </Link>
      </div>
      <ProfileCard user={me as User}></ProfileCard>
    </Page>
  );
};
