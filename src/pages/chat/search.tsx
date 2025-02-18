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
import { paths } from '@/routes/paths';
import { useIonRouter } from '@ionic/react';
import React, { useState } from 'react';

export const Search = () => {
  const { data, loading: contactLoading } = useGetChatsQuery();
  const [search, setSearch] = useState<string>('');
  const hs = useIonRouter();
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
          <Button
            variant="text"
            className="font-iransans text-brand-red"
            onClick={() => hs.goBack()}
          >
            بازگشت
          </Button>
        </div>
      }
      contentClassName="p-6 pt-20 h-full bg-gray-50 min-h-full"
      className=""
      isLoading={contactLoading}
    >
      {(data?.getChats?.filter((el) =>
        el.participants?.[0]?.name?.includes(search),
      ).length || 0) > 0 && search.length !== 0 ? (
        <div className="flex flex-col rounded-xl border border-gray-300 bg-white px-3 py-2">
          {data?.getChats
            ?.filter((el) => el.participants?.[0]?.name?.includes(search))
            .map((chat, i) => (
              <Contact
                last={data.getChats.length - 1 === i}
                key={chat?.id}
                onClick={() =>
                  hs.push(
                    paths.chat.contact.exactPath(
                      chat.participants?.find(
                        (user) => user?.id !== me?.getMe.id,
                      )?.id || '',
                    ),
                  )
                }
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
