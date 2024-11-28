import { IcEdit } from '@/components/icons/IcEdit';
import { IcSetting } from '@/components/icons/IcSetting';
import { Page } from '@/components/layout/Page';
import { useGetMeQuery } from '@/graphql/generated/graphql.codegen';
import React from 'react';

export const Profile = () => {
  const { data } = useGetMeQuery();
  const me = data?.getMe;
  return (
    <Page
      header={
        <div className="flex w-full items-center justify-between px-6 py-3">
          <IcEdit></IcEdit>
          <h1 className="text-lg font-bold">
            {me?.username}
            <span className="font-semibold">@</span>
          </h1>
          <IcSetting></IcSetting>
        </div>
      }
    >
      jjjjjjj
    </Page>
  );
};
