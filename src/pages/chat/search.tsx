import Button from '@/components/base/Button/Button';
import { Contact } from '@/components/chat/contact';
import { IcSearch } from '@/components/icons/IcSearch';
import { Page } from '@/components/layout/Page';
import { Input } from '@/components/shared/Inputs/input';
import {
  Chat,
  useGetChatsQuery,
  useGetMeQuery,
  User,
} from '@/graphql/generated/graphql.codegen';
import React, { useState } from 'react';

export const Search = () => {
  const { data, loading: contactLoading } = useGetChatsQuery();
  const [search, setSearch] = useState<string>();
  const { data: me } = useGetMeQuery({
    onError(err) {
      if (err.message === 'Failed to fetch') {
        return;
      }
    },
  });
  return (
    <Page
      headerClassName="px-6 py-3"
      header={
        <div className="flex w-full items-center gap-4">
          <Input
            className="h-9 w-full text-sm"
            icon={<IcSearch></IcSearch>}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></Input>
          <Button variant="text" className="text-brand-red">
            بازگشت
          </Button>
        </div>
      }
      contentClassName="p-6 pt-20 h-full bg-gray-50 min-h-full"
      className=""
      isLoading={contactLoading}
    >
      {(data?.getChats?.length || 0) > 0 ? (
        <div className="flex flex-col rounded-xl border border-gray-300 bg-white px-3 py-2">
          {data?.getChats?.map((chat) => (
            <Contact
              key={chat?.id}
              className="flex w-full items-center gap-2 transition-all duration-300 ease-in-out active:bg-gray-100"
              chat={chat as Chat}
              me={me?.getMe as User}
            ></Contact>
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4"></div>
      )}
    </Page>
  );
};
