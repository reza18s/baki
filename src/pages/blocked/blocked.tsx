import { Contact } from '@/components/chat/contact';
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
  const { data } = useGetBlockListQuery();
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
      contentClassName="p-6 pt-20 bg-gray-50 min-h-full"
      className=""
    >
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
    </Page>
  );
};
