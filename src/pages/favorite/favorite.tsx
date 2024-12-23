import { Contact } from '@/components/chat/contact';
import { IcStar } from '@/components/icons/IcStar';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import {
  Chat,
  useGetFavoriteQuery,
  useGetMeQuery,
  User,
} from '@/graphql/generated/graphql.codegen';
import React from 'react';

export const Favorite = () => {
  const { data, loading } = useGetFavoriteQuery();
  const { data: me } = useGetMeQuery({
    onError(err) {
      if (err.message === 'Failed to fetch') {
        return;
      }
    },
  });
  return (
    <Page
      header={<AppBar title="علاقه‌مندی‌ها"></AppBar>}
      contentClassName="p-6 pt-20 bg-gray-50 min-h-full h-full"
      isLoading={loading}
    >
      {(data?.getFavorite.chats?.length || 0) > 0 ? (
        <div className="flex flex-col rounded-xl border border-gray-300 bg-white px-3 py-2">
          {data?.getFavorite.chats?.map((chat) => (
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
            <IcStar className="size-8"></IcStar>
          </div>
          <h1 className="text-center text-base font-bold">
            هنوز کسی رو اضافه نکردی!
          </h1>
          <span className="text-center text-sm text-gray-500">
            با نگه داشتن روی مخاطبانت میتونی اون‌هارو به لیست علاقه‌مندی‌ها
            اضافه کنی.
          </span>
        </div>
      )}
    </Page>
  );
};
