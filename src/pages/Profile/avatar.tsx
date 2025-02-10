import Button from '@/components/base/Button/Button';
import { customToast } from '@/components/base/toast';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import { FemaleAvatar } from '@/constants/femaleAvatar';
import { MaleAvatar } from '@/constants/maleAvatar';
import { Gender } from '@/graphql/generated/graphql.codegen';
import { useUpdateUserMutation } from '@/graphql/generated/graphql.codegen.socket';
import { cn } from '@/lib/utils';
import { useLocalStore } from '@/store/useLocalStore';
import React, { useEffect, useState } from 'react';

export const Avatar = () => {
  const [select, setSelect] = useState<string>();
  const { userInfo, updateUserInfo } = useLocalStore((s) => s);
  const [updateUser, { loading }] = useUpdateUserMutation();
  const avatars =
    userInfo?.gender === ('female' as Gender) ? FemaleAvatar : MaleAvatar;
  useEffect(() => {
    setSelect(userInfo.avatar);
  }, [userInfo]);
  return (
    <Page
      contentClassName="p-6"
      header={<AppBar title="انتخاب آواتار"></AppBar>}
    >
      <div className="flex flex-col items-center gap-4 pt-10">
        <h1 className="w-full text-[32px] font-bold text-brand-black">
          آواتار من
        </h1>
        <p className="w-full text-sm font-medium leading-tight text-gray-500">
          از بین لیست پایین آواتار مد نظر خودتون رو انتخاب کنید.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-10 flex size-40 items-center justify-center rounded-full bg-gray-100">
          <img
            src={
              select
                ? avatars.find((ob) => ob.path == select)?.avatar
                : avatars[0].avatar
            }
          ></img>
        </div>
        <div className="my-4 grid w-full grid-cols-5 gap-2 gap-y-3">
          {avatars.map((avatar) => (
            <div
              key={avatar.path}
              className="relative"
              onClick={() => setSelect(avatar.path)}
            >
              <img
                src={avatar.avatar}
                className={cn(select !== avatar.path && 'opacity-50')}
              ></img>
            </div>
          ))}
        </div>
      </div>
      <Button
        loading={loading}
        className="sticky bottom-5 h-12 w-full"
        onClick={() => {
          updateUserInfo({ avatar: select });
          updateUser({
            variables: {
              avatar: select,
            },
            onCompleted: () => {
              customToast('اواتار با موفیقت ثبت سد', 'success');
            },
          });
        }}
      >
        انتخاب آواتار
      </Button>
    </Page>
  );
};
