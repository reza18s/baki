import { Contact } from '@/components/chat/contact';
import { IcUserBlackList } from '@/components/icons/IcUserBlackList';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import {
  Chat,
  useGetBlockListQuery,
  useGetMeQuery,
  User,
} from '@/graphql/generated/graphql.codegen';
import React from 'react';

export const Blocked = () => {
  const { data, loading } = useGetBlockListQuery();
  const { data: me } = useGetMeQuery({
    onError(err) {
      if (err.message === 'Failed to fetch') {
        return;
      }
    },
  });
  return (
    <Page
      header={<AppBar title="لیست سیاه"></AppBar>}
      contentClassName="p-6 pt-20 h-full bg-gray-50 min-h-full"
      className=""
      isLoading={loading}
    >
      {(data?.getBlockList.chats?.length || 0) > 0 ? (
        <div className="flex flex-col rounded-xl border border-gray-300 bg-white px-3 py-2">
          {data?.getBlockList.chats?.map((chat) => (
            <Contact
              key={chat?.id}
              className="flex w-full items-center gap-2 transition-all duration-300 ease-in-out active:bg-gray-100"
              chat={chat as Chat}
              me={me?.getMe as User}
            ></Contact>
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-brand-yellow">
            <IcUserBlackList className="size-8"></IcUserBlackList>
          </div>
          <h1 className="text-center text-base font-bold">
            هنوز کسی رو اضافه نکردی!
          </h1>
          <span className="text-center text-sm text-gray-500">
            با نگه داشتن روی مخاطبانت میتونی اون‌هارو به لیست سیاه اضافه کنی.{' '}
            <br></br>
            کاربران مسدود شده نمیتونن پیامی برات ارسال کنند.
          </span>
        </div>
      )}
    </Page>
  );
};
